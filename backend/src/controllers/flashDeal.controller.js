const FlashDeal = require('../models/flashDeal.model');
const mongoose = require('mongoose');

// @desc    Get all active flash deals (public)
// @route   GET /api/flash-deals
const getActiveFlashDeals = async (req, res) => {
  try {
    console.log('GET /flash-deals called with query:', req.query);
    
    const { category, sort = 'displayOrder', limit = 20, page = 1 } = req.query;

    // Validate pagination params
    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.max(1, Math.min(100, parseInt(limit) || 20));
    const sortBy = sort === 'discount' ? { discountPercentage: -1 } : { displayOrder: 1, endDate: 1 };

    // Build query - only show active, ongoing deals
    let query = {
      isActive: true,
      startDate: { $lte: new Date() },
      endDate: { $gt: new Date() }
    };

    // Filter by category if provided and not 'All'
    if (category && category !== 'All' && category.trim() !== '') {
      query.category = category;
    }

    console.log('Query:', query);

    // Get total count for pagination
    const total = await FlashDeal.countDocuments(query).catch(e => {
      console.error('Count error:', e);
      return 0;
    });

    console.log('Total deals found:', total);

    // Execute query with pagination
    const deals = await FlashDeal.find(query)
      .sort(sortBy)
      .limit(limitNum)
      .skip((pageNum - 1) * limitNum)
      .lean() // Use lean() for faster reads
      .exec()
      .catch(e => {
        console.error('Find error:', e);
        return [];
      });

    console.log('Deals returned:', deals.length);

    // Ensure total is at least 0
    const totalCount = Math.max(0, total);
    const pageCount = Math.max(1, Math.ceil(totalCount / limitNum));

    res.status(200).json({
      success: true,
      count: deals.length,
      total: totalCount,
      page: pageNum,
      pages: pageCount,
      data: deals
    });
  } catch (error) {
    console.error('Error fetching flash deals:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error fetching flash deals'
    });
  }
};

// @desc    Get single flash deal details
// @route   GET /api/flash-deals/:id
const getFlashDealById = async (req, res) => {
  try {
    const deal = await FlashDeal.findById(req.params.id);

    if (!deal) {
      return res.status(404).json({
        success: false,
        error: 'Flash deal not found'
      });
    }

    res.status(200).json({
      success: true,
      data: deal
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get all flash deals (admin view)
// @route   GET /api/flash-deals/admin/list
const getFlashDealsAdmin = async (req, res) => {
  try {
    const { status = 'all', category, sort = 'recent' } = req.query;

    let query = {};

    // Filter by status
    if (status === 'active') {
      query.isActive = true;
      query.startDate = { $lte: new Date() };
      query.endDate = { $gt: new Date() };
    } else if (status === 'expired') {
      query.endDate = { $lte: new Date() };
    } else if (status === 'upcoming') {
      query.startDate = { $gt: new Date() };
    }

    // Filter by category
    if (category && category !== 'All') {
      query.category = category;
    }

    // Execute query with sorting
    let sortObj = {};
    switch (sort) {
      case 'recent':
        sortObj = { createdAt: -1 };
        break;
      case 'discount':
        sortObj = { discountPercentage: -1 };
        break;
      case 'expiring':
        sortObj = { endDate: 1 };
        break;
      default:
        sortObj = { displayOrder: 1 };
    }

    const deals = await FlashDeal.find(query)
      .populate('productId', 'name image')
      .populate('createdBy', 'name email')
      .sort(sortObj)
      .exec();

    res.status(200).json({
      success: true,
      count: deals.length,
      data: deals
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Create new flash deal
// @route   POST /api/flash-deals
const createFlashDeal = async (req, res) => {
  try {
    const { productName, brand, productImage, productId, discountPercentage, originalPrice, flashPrice, startDate, endDate, expiryDate, category, stock, description } = req.body;

    // Validate required fields
    if (!productName || !brand || (!productImage && !req.file) || !discountPercentage || !originalPrice || !flashPrice || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        error: 'Please provide all required fields (productName, brand, productImage, discountPercentage, originalPrice, flashPrice, startDate, endDate)'
      });
    }

    // Validate dates
    if (new Date(endDate) <= new Date(startDate)) {
      return res.status(400).json({
        success: false,
        error: 'End date must be after start date'
      });
    }

    // Validate prices
    if (flashPrice >= originalPrice) {
      return res.status(400).json({
        success: false,
        error: 'Flash price must be less than original price'
      });
    }

    // If an image file was uploaded, use it; otherwise fall back to provided URL
    let productImageUrl = productImage;
    if (req.file) {
      productImageUrl = `/uploads/flash-deals/${req.file.filename}`;
    }

    if (!productImageUrl) {
      return res.status(400).json({
        success: false,
        error: 'Please add a product image URL'
      });
    }

    // Ensure productId is never null to avoid unique index conflicts in MongoDB
    const resolvedProductId = productId && mongoose.Types.ObjectId.isValid(productId)
      ? new mongoose.Types.ObjectId(productId)
      : new mongoose.Types.ObjectId();

    // Create flash deal
    const deal = await FlashDeal.create({
      productId: resolvedProductId,
      productName,
      brand,
      productImage: productImageUrl,
      discountPercentage,
      originalPrice,
      flashPrice,
      startDate,
      endDate,
      expiryDate: expiryDate || null,
      category: category || 'Limited Stock',
      stock: stock || 0,
      description,
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Flash deal created successfully',
      data: deal
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update flash deal
// @route   PUT /api/flash-deals/:id
const updateFlashDeal = async (req, res) => {
  try {
    const { productName, brand, productId, discountPercentage, originalPrice, flashPrice, startDate, endDate, expiryDate, category, stock, description, isActive } = req.body;

    let deal = await FlashDeal.findById(req.params.id);
    if (!deal) {
      return res.status(404).json({
        success: false,
        error: 'Flash deal not found'
      });
    }

    // Validate dates if provided
    const newEndDate = endDate || deal.endDate;
    const newStartDate = startDate || deal.startDate;
    if (new Date(newEndDate) <= new Date(newStartDate)) {
      return res.status(400).json({
        success: false,
        error: 'End date must be after start date'
      });
    }

    // Handle file upload if present
    let productImage = deal.productImage;
    if (req.file) {
      // If new file was uploaded, create URL path
      productImage = `/uploads/flash-deals/${req.file.filename}`;
    } else if (req.body.productImage && typeof req.body.productImage === 'string' && req.body.productImage !== 'undefined' && !req.body.productImage.startsWith('data:')) {
      // If productImage is provided as URL string, use it
      productImage = req.body.productImage;
    }

    const resolvedProductId = productId && mongoose.Types.ObjectId.isValid(productId)
      ? new mongoose.Types.ObjectId(productId)
      : deal.productId;

    // Update fields
    deal = await FlashDeal.findByIdAndUpdate(
      req.params.id,
      {
        productId: resolvedProductId,
        productName: productName || deal.productName,
        brand: brand || deal.brand,
        productImage: productImage,
        discountPercentage: discountPercentage || deal.discountPercentage,
        originalPrice: originalPrice || deal.originalPrice,
        flashPrice: flashPrice || deal.flashPrice,
        startDate: startDate || deal.startDate,
        endDate: endDate || deal.endDate,
        expiryDate: expiryDate || deal.expiryDate,
        category: category || deal.category,
        stock: stock !== undefined ? stock : deal.stock,
        description: description || deal.description,
        isActive: isActive !== undefined ? isActive : deal.isActive
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Flash deal updated successfully',
      data: deal
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete flash deal
// @route   DELETE /api/flash-deals/:id
const deleteFlashDeal = async (req, res) => {
  try {
    const deal = await FlashDeal.findByIdAndDelete(req.params.id);

    if (!deal) {
      return res.status(404).json({
        success: false,
        error: 'Flash deal not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Flash deal deleted successfully',
      data: deal
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get flash deal categories
// @route   GET /api/flash-deals/categories
const getCategories = async (req, res) => {
  try {
    const categories = ['New Product', 'Expiring Soon', 'Limited Stock', 'Seasonal Sale'];
    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  getActiveFlashDeals,
  getFlashDealById,
  getFlashDealsAdmin,
  createFlashDeal,
  updateFlashDeal,
  deleteFlashDeal,
  getCategories
};

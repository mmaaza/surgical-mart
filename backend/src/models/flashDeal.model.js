const mongoose = require('mongoose');

const flashDealSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    default: null // Optional - can create flash deals without linking to products
  },
  productName: {
    type: String,
    required: [true, 'Please add a product name']
  },
  brand: {
    type: String,
    required: [true, 'Please add a brand name']
  },
  productImage: {
    type: String,
    required: [true, 'Please add a product image URL']
  },
  discountPercentage: {
    type: Number,
    required: [true, 'Please add a discount percentage'],
    min: [1, 'Discount must be at least 1%'],
    max: [100, 'Discount cannot exceed 100%']
  },
  originalPrice: {
    type: Number,
    required: [true, 'Please add original price']
  },
  flashPrice: {
    type: Number,
    required: [true, 'Please add flash sale price']
  },
  startDate: {
    type: Date,
    required: [true, 'Please add start date'],
    default: Date.now
  },
  endDate: {
    type: Date,
    required: [true, 'Please add end date']
  },
  expiryDate: {
    type: Date,
    default: null // Optional - when the product expires
  },
  category: {
    type: String,
    enum: ['New Product', 'Limited Stock', 'Seasonal Sale'],
    default: 'Limited Stock'
  },
  displayOrder: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  stock: {
    type: Number,
    default: 0,
    min: [0, 'Stock cannot be negative']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient querying
flashDealSchema.index({ endDate: 1, isActive: 1 });
flashDealSchema.index({ displayOrder: 1 });
flashDealSchema.index({ category: 1, isActive: 1 });

// Pre-save hook to validate dates
flashDealSchema.pre('save', function(next) {
  if (this.endDate <= this.startDate) {
    throw new Error('End date must be after start date');
  }
  this.updatedAt = Date.now();
  next();
});

// Method to check if deal is expired
flashDealSchema.methods.isExpired = function() {
  return new Date() > this.endDate;
};

// Method to get time remaining in milliseconds
flashDealSchema.methods.getTimeRemaining = function() {
  const now = new Date();
  return this.endDate - now;
};

// Static method to get active deals
flashDealSchema.statics.getActiveDealswithProducts = async function() {
  return await this.find({
    isActive: true,
    startDate: { $lte: new Date() },
    endDate: { $gt: new Date() }
  })
  .populate('productId', 'name description image category slug')
  .sort({ displayOrder: 1, endDate: 1 })
  .exec();
};

module.exports = mongoose.model('FlashDeal', flashDealSchema);

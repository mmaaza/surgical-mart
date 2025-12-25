const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const flashDealController = require('../controllers/flashDeal.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

// Setup multer for file uploads
const uploadDir = path.join(__dirname, '../../public/uploads/flash-deals');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'flash-deal-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// ====== PUBLIC ROUTES ======
// Get all active flash deals (with pagination and filters)
router.get('/', flashDealController.getActiveFlashDeals);

// Get flash deal categories
router.get('/categories', flashDealController.getCategories);

// Get single flash deal details
router.get('/:id', flashDealController.getFlashDealById);

// ====== ADMIN ROUTES ======
// Admin listing (all deals with filters)
router.get('/admin/list', protect, authorize('admin'), flashDealController.getFlashDealsAdmin);

// Create flash deal with file upload
router.post('/', protect, authorize('admin'), upload.single('productImage'), flashDealController.createFlashDeal);

// Update flash deal with file upload
router.put('/:id', protect, authorize('admin'), upload.single('productImage'), flashDealController.updateFlashDeal);

// Delete flash deal
router.delete('/:id', protect, authorize('admin'), flashDealController.deleteFlashDeal);

module.exports = router;

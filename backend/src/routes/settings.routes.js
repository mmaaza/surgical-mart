const express = require('express');
const router = express.Router();
const { 
  getPublicHomepageSettings,
  getPublicSeoSettings,
  getPublicContactSettings,
  getPublicSocialSettings,
} = require('../controllers/settings.controller');

// Public routes
router.route('/homepage')
  .get(getPublicHomepageSettings);

// Public SEO settings
router.route('/seo')
  .get(getPublicSeoSettings);

// Public contact settings
router.route('/contact')
  .get(getPublicContactSettings);

// Public social settings
router.route('/social')
  .get(getPublicSocialSettings);

module.exports = router;

const express = require('express');
const { handleGenerateNewShortURL, handleGetAnalytics } = require('../controllers/url');
const router = express.Router();

router.post('/', handleGenerateNewShortURL);
router.get('/analytics/:id', handleGetAnalytics);  // Ensure this matches the requested URL

module.exports = router;

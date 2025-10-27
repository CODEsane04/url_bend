const express = require('express');
const router = express.Router();
const {handleGenerateNewShortUrl, handleGoToRedirectedUrl, handleLoadAllLinks} = require('../controllers/urlController');
const { restrictLoggedInUserOnly } = require('../middleware/authMiddleware');

//handling the post request
router.post('/', restrictLoggedInUserOnly, handleGenerateNewShortUrl);

//handling the get request to load all the urls related to a user
router.get('/links', restrictLoggedInUserOnly, handleLoadAllLinks);

//handling the get request to redirect to the url
router.get('/:id', handleGoToRedirectedUrl);

module.exports = router;
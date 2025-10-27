const express = require('express');
const router = express.Router();

const { handleUserSignUp, handleUserLogin, handleCheckAuth } = require('../controllers/userController')

router.post('/signup', handleUserSignUp);

router.post('/login', handleUserLogin);

router.get('/check-auth', handleCheckAuth);

module.exports = router;
const express = require('express');
const router = express.Router();
const { setupUser, loginUser } = require('../controller/UserController.js');

// Route for setting up user (initial setup)
router.post('/setup', setupUser);

// Route for logging in a user
router.post('/login', loginUser);

module.exports = router;

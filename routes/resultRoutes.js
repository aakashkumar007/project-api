const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authMiddleWare');
const paginationMiddleware = require('../middleware/paginationMiddleWare');
const {
    createResult,
    getResults,
    getResultById,
    updateResult,
    deleteResult
} = require('../controller/ResultController.js');

// Create a new result (Protected route)
router.post('/post-results', authenticateUser, createResult);

// Get all results (Public route, with pagination)
router.get('/get-results', paginationMiddleware, getResults);

// Get a single result by ID (Public route)
router.get('/get-result/:id', getResultById);

// Update a result by ID (Protected route)
router.put('/update-result/:id', authenticateUser, updateResult);

// Delete a result by ID (Protected route)
router.delete('/delete-result/:id', authenticateUser, deleteResult);

module.exports = router;

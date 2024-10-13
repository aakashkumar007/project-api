const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authMiddleWare');
const paginationMiddleware = require('../middleware/paginationMiddleWare');

const {
    createJob,
    getJobs,
    getJobById,
    deleteJob,
    updateJob
} = require('../controller/JobsController.js');

// Create a new job (Protected route)
router.post('/post-jobs', authenticateUser, createJob);

// Get all jobs (Public route, supports pagination)
router.get('/get-jobs', paginationMiddleware, getJobs);

// Get a single job by ID (Public route)
router.get('/get-job/:id', getJobById);

// Delete a job by ID (Protected route)
router.delete('/delete-job/:id', authenticateUser, deleteJob);

// Update a job by ID (Protected route)
router.put('/update-job/:id', authenticateUser, updateJob);

module.exports = router;

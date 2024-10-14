const Job = require('../models/Jobs.model.js');

// Helper function for handling errors
const handleError = (res, error, message = 'Server error', status = 500) => {
    console.error(message, error);
    return res.status(status).json({ message });
};

// Create a new job
const createJob = async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: "Job title and description are required" });
    }

    try {
        const job = new Job({ title, description });
        const savedJob = await job.save();
        res.status(201).json(savedJob);
    } catch (err) {
        return handleError(res, err, 'Error creating job');
    }
};

// Get all jobs (with pagination)
const getJobs = async (req, res) => {
    const { limit = 10, page = 1 } = req.query;
    const skip = (page - 1) * limit;

    try {
        const jobs = await Job.find().sort({ createdAt: -1 }).limit(Number(limit)).skip(skip);
        const totalJobs = await Job.countDocuments();
        const totalPages = Math.ceil(totalJobs / limit);

        res.json({
            jobs,
            totalJobs,
            totalPages,
            currentPage: Number(page)
        });
    } catch (err) {
        return handleError(res, err, 'Error fetching job listings');
    }
};

// Get a single job by ID
const getJobById = async (req, res) => {
    const jobId = req.params.id;


    try {
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json(job);
    } catch (err) {
        return handleError(res, err, 'Error fetching job');
    }
};

// Delete a job by ID
const deleteJob = async (req, res) => {
    const jobId = req.params.id;

    try {
        const job = await Job.findByIdAndDelete(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json({ message: `Job with ID ${jobId} deleted successfully` });
    } catch (err) {
        return handleError(res, err, 'Error deleting job');
    }
};

// Update a job by ID
const updateJob = async (req, res) => {
    const jobId = req.params.id;
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: "Job title and description are required" });
    }

    try {
        const updatedJob = await Job.findByIdAndUpdate(jobId, { title, description }, { new: true });
        if (!updatedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json({
            message: `Job with ID ${jobId} updated successfully`,
            updatedJob
        });
    } catch (err) {
        return handleError(res, err, 'Error updating job');
    }
};

module.exports = {
    createJob,
    getJobs,
    getJobById,
    deleteJob,
    updateJob
};

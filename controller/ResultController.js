const Result = require('../models/Result.model.js');

// Helper function to handle errors
const handleError = (res, error, message = 'Server error', status = 500) => {
    console.error(message, error);
    return res.status(status).json({ message });
};

// Create a new result
const createResult = async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({
            message: 'Result title and description are required'
        });
    }

    try {
        const result = new Result({ title, description });
        const savedResult = await result.save();
        res.status(201).json(savedResult);
    } catch (err) {
        return handleError(res, err, 'Error inserting result listing');
    }
};

// Get all results with pagination
const getResults = async (req, res) => {
    const { limit = 10, page = 1 } = req.query;
    const skip = (page - 1) * limit;

    try {
        const results = await Result.find().sort({ createdAt: -1 }).limit(Number(limit)).skip(Number(skip));
        const totalResults = await Result.countDocuments();
        const totalPages = Math.ceil(totalResults / limit);

        res.json({
            results,
            totalResults,
            totalPages,
            currentPage: Number(page)
        });
    } catch (err) {
        return handleError(res, err, 'Error fetching result listings');
    }
};

// Get a single result by ID
const getResultById = async (req, res) => {
    const resultId = req.params.id;

    try {
        const result = await Result.findById(resultId);

        if (!result) {
            return res.status(404).json({ message: 'Result not found' });
        }

        res.json(result);
    } catch (err) {
        return handleError(res, err, 'Error fetching result listing');
    }
};

// Update a result by ID
const updateResult = async (req, res) => {
    const resultId = req.params.id;
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: 'Result title and description are required' });
    }

    try {
        const updatedResult = await Result.findByIdAndUpdate(resultId, { title, description }, { new: true });

        if (!updatedResult) {
            return res.status(404).json({ message: 'Result not found' });
        }

        res.json({
            message: `Result with ID ${resultId} updated successfully`,
            updatedResult
        });
    } catch (err) {
        return handleError(res, err, 'Error updating result listing');
    }
};

// Delete a result by ID
const deleteResult = async (req, res) => {
    const resultId = req.params.id;

    try {
        const result = await Result.findByIdAndDelete(resultId);

        if (!result) {
            return res.status(404).json({ message: 'Result not found' });
        }

        res.json({
            message: `Result with ID ${resultId} deleted successfully`
        });
    } catch (err) {
        return handleError(res, err, 'Error deleting result listing');
    }
};

module.exports = {
    createResult,
    getResults,
    getResultById,
    updateResult,
    deleteResult
};

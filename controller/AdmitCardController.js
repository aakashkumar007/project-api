const AdmitCard = require('../models/AdmitCard.model.js');

// Helper function for sending errors
const handleError = (res, error, message = 'Server error', status = 500) => {
    console.error(message, error);
    return res.status(status).json({ message });
};

// Create a new Admit Card
const createAdmitCard = async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description required' });
    }

    try {
        const admitCard = new AdmitCard({ title, description });
        const savedAdmitCard = await admitCard.save();
        res.status(201).json(savedAdmitCard);
    } catch (err) {
        return handleError(res, err, 'Error inserting admit card');
    }
};

// Get all Admit Cards
const getAllAdmitCards = async (req, res) => {
    try {
        const admitCards = await AdmitCard.find();
        res.json(admitCards);
    } catch (err) {
        return handleError(res, err, 'Error fetching admit cards');
    }
};

// Get a single Admit Card by ID
const getAdmitCardById = async (req, res) => {
    const admitCardId = req.params.id;

    try {
        const admitCard = await AdmitCard.findById(admitCardId);

        if (!admitCard) {
            return res.status(404).json({ message: 'Admit card not found' });
        }

        res.json(admitCard);
    } catch (err) {
        return handleError(res, err, 'Error fetching admit card');
    }
};

// Delete an Admit Card by ID
const deleteAdmitCard = async (req, res) => {
    const admitCardId = req.params.id;

    try {
        const admitCard = await AdmitCard.findByIdAndDelete(admitCardId);

        if (!admitCard) {
            return res.status(404).json({ message: 'Admit card not found' });
        }

        res.json({ message: `Admit card with ID ${admitCardId} deleted successfully` });
    } catch (err) {
        return handleError(res, err, 'Error deleting admit card');
    }
};

// Update an Admit Card by ID
const updateAdmitCard = async (req, res) => {
    const admitCardId = req.params.id;
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
    }

    try {
        const updatedAdmitCard = await AdmitCard.findByIdAndUpdate(admitCardId, { title, description }, { new: true });

        if (!updatedAdmitCard) {
            return res.status(404).json({ message: 'Admit card not found' });
        }

        res.json({
            message: `Admit card with ID ${admitCardId} updated successfully`,
            updatedAdmitCard
        });
    } catch (err) {
        return handleError(res, err, 'Error updating admit card');
    }
};

module.exports = {
    createAdmitCard,
    getAllAdmitCards,
    getAdmitCardById,
    deleteAdmitCard,
    updateAdmitCard
};

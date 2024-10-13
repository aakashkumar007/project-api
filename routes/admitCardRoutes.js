const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authMiddleWare'); // Import the middleware

const {
    createAdmitCard,
    getAllAdmitCards,
    getAdmitCardById,
    deleteAdmitCard,
    updateAdmitCard
} = require('../controller/AdmitCardController.js'); // Import controller methods

// POST Admit Cards - Protected
router.post('/post-admit-cards', authenticateUser, createAdmitCard);

// GET all Admit Cards - Public
router.get('/get-admit-cards', getAllAdmitCards);

// GET single Admit Card - Public
router.get('/get-admit-card/:id', getAdmitCardById);

// DELETE Admit Card - Protected
router.delete('/delete-admit-card/:id', authenticateUser, deleteAdmitCard);

// UPDATE Admit Card - Protected
router.put('/update-admit-card/:id', authenticateUser, updateAdmitCard);

module.exports = router;

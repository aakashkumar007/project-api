const User = require('../models/User.model.JS');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// Set up user (initial setup)
const setupUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User with this email already exists');
        }

        // Create a new user and save to database
        const user = new User({ email, password });
        await user.save();

        res.status(201).send('User setup successfully');
    } catch (err) {
        console.error('Error setting up user:', err);
        res.status(500).send('Server error');
    }
};

// Authenticate user (Login)
const loginUser = async (req, res) => {
    const { email, password } = req.body;


    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send('Invalid email or password');
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid email or password');
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: '3d' }  // Token expiration set to 3 days
        );

        // Set token in an HTTP-only cookie with secure settings
        res.cookie('token', token, {
            httpOnly: true,  // Prevent JavaScript access to cookies
            secure: process.env.NODE_ENV === 'development',  // Enable HTTPS only in production
            maxAge: 72 * 60 * 60 * 1000  // Cookie expires in 3 days
        });

        // Send user data to store in frontend's local state (not localStorage)
        res.json({
            message: 'Login successful',
            user: { email: user.email, id: user._id },
            token
        });
    } catch (err) {
        console.error('Error logging in user:', err);
        res.status(500).send('Server error');
    }
};

module.exports = {
    setupUser,
    loginUser
};

const jwt = require('jsonwebtoken');
const User = require('../models/User.model.js'); // Assuming you have a User model in MongoDB

// Middleware to verify if the user is authenticated
const authenticateUser = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Get token from the Authorization header

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        // Verify the token with the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Optional: Fetch the user from MongoDB for additional validation (if needed)
        const user = await User.findById(decoded.id);  // Find the user by the id stored in the token

        if (!user) {
            return res.status(401).json({ message: "Invalid token. User not found." });
        }

        // Attach user info to the request object for access in other routes
        req.user = user;
        next(); // Proceed to the next middleware/route handler
    } catch (err) {
        console.error("Token verification error:", err);
        return res.status(401).json({ message: "Invalid token." });
    }
};

module.exports = authenticateUser;

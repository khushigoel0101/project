const express = require('express');
const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/authMiddleware'); // Import the protect middleware
const Users = require('../models/Users'); // Ensure this is the correct path to your User model


const router = express.Router();

// route POST /api/users/register
// desc Register a new user
// access Public
router.post('/register', async (req, res) => {
      const { name, email, password } = req.body;

      try {
        
        let user = await Users.findOne({ email})

        if(user) return res.status(400).json({ message: 'User already exists' });

        user = new User({name, email, password});
        await user.save();

        const payload = {user: { id: user._id, role: user.role } };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "40h"}, (err, token) => {
            if (err) throw err;

            res.status(201).json({
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                token,
            })
        })
      } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }

})

// route POST /api/users/login
// desc Login user
// access Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {

        let user = await Users.findOne({email})

        if(!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await user.matchPassword(password);

        if(!isMatch) return res.status(400).json({ message: 'Invalid credentials' });


        const payload = {user: { id: user._id, role: user.role } };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "40h"}, (err, token) => {
            if (err) throw err;

            res.json({
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                token,
            })
        })

    } catch(error) {
        console.error(error);
        res.status(500).send("Server error");
    }
})


// route GET /api/users/profile
// desc Get user profile(Protected route)
// access Private

router.get('/profile', protect, async (req, res) => {
    res.json(req.user);

})


module.exports = router;
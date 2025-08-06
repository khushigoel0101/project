const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');



//route POST /API/subscribe
//desc Handle newsletter subscription
//access Public
router.post('/subscribe', async (req, res) => {
    const { email } = req.body;

    if(!email) {
        return res.status(400).json({ message: "Email is required"});
    }

    try {
        let subscribe = await Subscriber.findOne({ email })

        if(Subscriber) {
            return res.status(400).json({ message: "Email already exists" })
        }

        Subscriber = new Subscriber({ email })
        await Subscriber.save()

        res
         .status(201)
         .json({ message: "Subscriber added successfully" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
})

module.exports = router;
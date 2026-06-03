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
        const subscribe = await Subscriber.findOne({ email })

        if(subscribe) {
            return res.status(400).json({ message: "Email already exists" })
        }

        const newSubscriber = new Subscriber({ email })
        await newSubscriber.save()

        res
         .status(201)
         .json({ message: "Subscriber added successfully" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
})

module.exports = router;

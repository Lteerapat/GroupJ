const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {getUserDataFromReq} = require('../utilities/utils');

//get user profile
router.get('/', async (req, res) => {
    const {token} = req.cookies;
    if (token) {
        try {
            const userData = await getUserDataFromReq(req);
            const {first_name, last_name, email, profile_image_url, location,user_line_id, _id} = await User.findById(userData.id);
            res.json({first_name, last_name, email, profile_image_url, location,user_line_id, _id});
        } catch (err) {
            res.json(null);
        }
    } else {
        res.json(null);
    }
});

//check if old password is correct 
router.post('/validate-password', async (req, res) => {
    try {
        const userData = await getUserDataFromReq(req);
        const userDoc = await User.findById(userData.id);
        const { password } = req.body;
        const correctPass = bcrypt.compareSync(password, userDoc.password);
        res.json({correctPass});
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// update user profile
router.put('/', async (req, res) => {
    try {
        const userData = await getUserDataFromReq(req);
        const {id} = userData;
        const { first_name, last_name, email, location } = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, { first_name, last_name, email, location }, { new: true })
        if (updatedUser) {
            res.json('Profile updated successfully')
        } else {
            res.status(400).json({ error: 'Failed to update profile' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


  
module.exports = router;



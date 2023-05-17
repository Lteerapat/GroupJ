const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'asjdgbhflijasdhripasdhf';

// signup new user
router.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'This email already registered' });
        }
        
        const userDoc = await User.create({
            first_name: firstName,
            last_name: lastName,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        
        res.json(userDoc);
    } catch (err) {
        console.log(err)
        res.status(500).json('Internal Server Error');
    }
});
  


// check login
router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const userDoc = await User.findOne({email});
    if (userDoc) {
        const correctPass = bcrypt.compareSync(password, userDoc.password);
        if (correctPass) {
            jwt.sign({
                email:userDoc.email,
                id:userDoc._id,
            }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc);
            });
        } else {
            res.status(422).json({ user: null, error: 'Wrong password' })
        }
    } else {
        res.status(404).json({ user: null, error: 'User not found' });
    }
});

module.exports = router;
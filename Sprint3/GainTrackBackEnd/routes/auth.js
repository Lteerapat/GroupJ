const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const bcryptSalt = bcrypt.genSaltSync(+process.env.SALTROUND);
const jwtSecret = process.env.JWTSECRET;

// signup new user
router.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password,lineId } = req.body;
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
            user_line_id:lineId
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
                const cookieOptions = {
                    // httpOnly: true, // set the cookie as HTTP only
                    // secure: true, //only set the cookie over HTTPS
                    // sameSite: 'none', // allow cross-site cookies
                    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
                }
                res.cookie('token', token, cookieOptions).json(userDoc);
            });
        } else {
            res.status(422).json({ user: null, error: 'Email or Password is incorrect' });
        }
    } else {
        res.status(404).json({ user: null, error: 'Email or Password is incorrect' });
    } 
});

module.exports = router;
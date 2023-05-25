const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {getUserDataFromReq} = require('../utilities/utils');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/'); // Save temporary files
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use the original filename
    },
});

const upload = multer({
    storage: storage,
});

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
router.put('/', upload.single('profile_image'), async (req, res) => {
    try {
        const userData = await getUserDataFromReq(req);
        const {id} = userData;
        const { first_name, last_name, email, location } = req.body;

        const userDoc = await User.findById(id)

        let newProfileImageUrl  = userDoc.profile_image_url; // set new to original to prevent null overwrite the picture in db

        // check if a file was uploaded
        if (req.file) {
            if (req.file.size > 500000) {
                res.status(400).json({error: 'File size exceeds the limit (500 KB)'});
                return;
            }
            
            //delete the old profile photo if it exists
            if (newProfileImageUrl) {
                const public_id = newProfileImageUrl.split('/').slice(-1)[0].split('.')[0];
                const checkupload = await cloudinary.uploader.destroy('GainTrackUserImg/'+public_id, {folder: 'GainTrackUserImg'})
            }
            const filePath = req.file.path;
            //upload new photo to cloudinary
            const result = await cloudinary.uploader.upload(filePath, {
                folder: 'GainTrackUserImg',
            });
            newProfileImageUrl = result.secure_url; // Get the URL of the uploaded image
      
            // Delete the temporary file
            fs.unlinkSync(filePath);
        }

        const updatedUser = await User.findByIdAndUpdate(
            id, 
            { first_name, last_name, email, location, profile_image_url:newProfileImageUrl }, 
            { new: true }
        )
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



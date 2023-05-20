const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWTSECRET;

//add activity
router.post('/add', (req, res) => {
    const {token} = req.cookies;
    const {nameActivity, activity, date, duration, distance, note} =  req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if(err) throw err;
        const activityDoc = await Activity.create({
            user_id: userData.id,  
            title:nameActivity, 
            activity_type:activity, 
            date, duration, distance, note,
        });
        res.json(activityDoc);
    });
});

//get all activities of user
router.get('/user-activities', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const {id} = userData;
        res.json( await Activity.find({user_id:id}));
    });
});


//get activity in edit page
router.get('/edit/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const activity = await Activity.findById(id)
        if (activity) {
            res.json(activity);
        } else {
            res.status(404).json('Activity not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal Server Error');
    }
});

//update activity from edit page
router.put('/edit', async (req, res, next) => {
    const {token} = req.cookies;
    const {id, nameActivity, activity, date, duration, distance, note} =  req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const activityDoc = await Activity.findById(id);
        if (userData.id === activityDoc.user_id.toString()) {
            activityDoc.set({title:nameActivity, activity_type:activity, date, duration, distance, note});
            activityDoc.updated_at = new Date();
            await activityDoc.save();
            res.json('successfully edited');
        } else {
            res.status(401).json('Unauthorized');
        }
    });
});

//delete activity
router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const deleteActivity = await Activity.findByIdAndDelete(id);
        if (deleteActivity) {
            res.sendStatus(204);
        } else {
            res.status(404).json('Activity not found');
        }
    } catch (err) {
        res.status(500).json('Internal Server Error');
    }
});



module.exports = router;
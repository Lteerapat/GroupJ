const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');
const jwt = require('jsonwebtoken');

const jwtSecret = 'asjdgbhflijasdhripasdhf';

router.post('/add', (req, res) => {
    const {token} = req.cookies;
    const {nameActivity, activity, date, duration, distance, note} =  req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if(err) throw err;
        const activityDoc = await Activity.create({
            user_id: userData.id,
            title:nameActivity, activity_type:activity, date, duration, distance, note,
        });
        res.json(activityDoc);
    });
});

//get activities of user
router.get('/user', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const {id} = userData;
        res.json( await Activity.find({user_id:id}));
    });
});



router.get('/:id', async (req, res, next) => {
    const {id} = req.params;
    res.json(await Activity.findById(id));
});

router.put('/', async (req, res, next) => {
    const {id, nameActivity, activity, date, duration, distance, note} =  req.body;
    const activityDoc = await Activity.findById(id);
    if (id === activityDoc.user_id.toString()) {
        activityDoc.set({title:nameActivity, activity_type:activity, date, duration, distance, note});
        await activityDoc.save();
        res.json('successfully edited');
    }
});

module.exports = router;
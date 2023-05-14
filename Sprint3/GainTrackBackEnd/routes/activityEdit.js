const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');

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
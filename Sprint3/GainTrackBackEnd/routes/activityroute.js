const express = require('express');
const ActivityModel = require('../models/Activity');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newActivity = new ActivityModel(req.body);
        const validateResult = newActivity.validateSync();
        if (validateResult) {
            return res.status(400).send(validateResult);
        }
        await newActivity.save();
        return res.send(newActivity.toJSON());
    } catch (err) {
        console.error('Error Creating Activity', err);
        res.status(500).send('Internet Server Error');
    }
});

module.exports = router;
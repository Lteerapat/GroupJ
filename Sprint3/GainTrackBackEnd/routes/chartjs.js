const express = require ('express');
const router = express.Router();
const Activity = require('../models/Activity');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWTSECRET;



router.get('/numOfActivity', async (req, res) => {
    try {
        const {token} = req.cookies;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const {id} = userData;
            const activities = await Activity.find({user_id:id});
            const walkingActivities = activities.filter((activity) => activity.activity_type === 'walking').length;
            const runningActivities = activities.filter((activity) => activity.activity_type === 'running').length;
            const swimmingActivities = activities.filter((activity) => activity.activity_type === 'swimming').length;
            const bikingActivities = activities.filter((activity) => activity.activity_type === 'biking').length;
            const hikingActivities = activities.filter((activity) => activity.activity_type === 'hiking').length;
            

            const allActivitiesForChartJs = {
                walkingActivities,
                runningActivities,
                swimmingActivities,
                bikingActivities,
                hikingActivities
            };

            res.status(200).json(allActivitiesForChartJs);

        })
    } catch (err) {
        res.status(500).json('Internal Server Error');
    }
});

router.get('/dura-dis', async (req, res) => {
    try {
        const {token} = req.cookies;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const {id} = userData;
            const activities = await Activity.find({user_id:id});

            const walkingActivitiesDuration = 
                activities
                    .filter((activity) => activity.activity_type === 'walking')
                    .reduce((total, activity) => total + activity.duration,0);
            const runningActivitiesDuration = 
                activities
                    .filter((activity) => activity.activity_type === 'running')
                    .reduce((total, activity) => total + activity.duration,0);
            const swimmingActivitiesDuration = 
                activities
                    .filter((activity) => activity.activity_type === 'swimming')
                    .reduce((total, activity) => total + activity.duration,0);
            const bikingActivitiesDuration = 
                activities
                    .filter((activity) => activity.activity_type === 'biking')
                    .reduce((total, activity) => total + activity.duration,0);
            const hikingActivitiesDuration = 
                activities
                    .filter((activity) => activity.activity_type === 'hiking')
                    .reduce((total, activity) => total + activity.duration,0);

            const allActivitiesDurationForChartJs = {
                walkingActivitiesDuration,
                runningActivitiesDuration,
                swimmingActivitiesDuration,
                bikingActivitiesDuration,
                hikingActivitiesDuration
            };
            res.status(200).json(allActivitiesDurationForChartJs);


        })
    } catch (err) {
        res.status(500).json('Internal Server Error');
    }
});

module.exports = router;
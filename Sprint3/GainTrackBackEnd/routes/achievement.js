const express = require ('express');
const router = express.Router();
const Activity = require('../models/Activity');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWTSECRET;

// get user's completed achievements
router.get('/', async (req, res) => {
    try {
        const {token} = req.cookies;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const {id} = userData;
            const activities = await Activity.find({user_id:id});
            const user = await User.find({_id:id})
            const completedAchievements = [];

            // check for each achievement condition
            const isLineConnected = user[0].user_line_id;
            const isFirstActivityCreated = activities.length > 0;
            const is90MinsActivityDuration = activities.some((activity) => (activity.duration >= 90));
            const is10000mACtivityDistance = activities.some((activity) => (activity.distance >= 10000));
            const is9000MinsAllActivityDuration = activities.reduce((total, activity) => total + activity.duration,0 ) >= 9000;
            // const hasDoneAllKindOfActivities = activities.
            const isWalkingMoreThan5Times = activities.filter((activity) => (activity.activity_type === 'walking'));
            const isRunningMoreThan5Times = activities.filter((activity) => (activity.activity_type === 'running'));
            const isSwimmingMoreThan5Times = activities.filter((activity) => (activity.activity_type === 'swimming'));
            const isBikingMoreThan5Times = activities.filter((activity) => (activity.activity_type === 'biking'));
            const isHikingMoreThan5Times = activities.filter((activity) => (activity.activity_type === 'hiking'));
            const hasDoneMoreThan5Activities = activities.length >= 5;
            const hasDoneMoreThan10Activities = activities.length >= 10;

            // add completed to array
            if (isLineConnected) completedAchievements.push({title:'Ready To Fight'});
            if (isFirstActivityCreated) completedAchievements.push({title:'The Beginner'});
            if (is90MinsActivityDuration) completedAchievements.push({title:'Extraordinary'});
            if (is10000mACtivityDistance) completedAchievements.push({title:'Warrior Reborn'});
            if (is9000MinsAllActivityDuration) completedAchievements.push({title:'Legendary Player'});
            if (isWalkingMoreThan5Times.length >= 5) completedAchievements.push({title:'The Golden Legs'});
            if (isRunningMoreThan5Times.length >= 5) completedAchievements.push({title:'The Flash'});
            if (isSwimmingMoreThan5Times.length >= 5) completedAchievements.push({title:'Aquaman'});
            if (isBikingMoreThan5Times.length >= 5) completedAchievements.push({title:'Ride The Legend'});
            if (isHikingMoreThan5Times.length >= 5) completedAchievements.push({title:'The Conqueror'});
            if (hasDoneMoreThan5Activities) completedAchievements.push({title:'A Healthy Person'});
            if (hasDoneMoreThan10Activities) completedAchievements.push({title:'Unstoppable'});
            


            res.json(completedAchievements);
        });
    } catch (err) {
        res.status(500).json('Internal Server Error');
    }
});

module.exports = router;
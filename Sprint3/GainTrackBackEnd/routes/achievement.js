const express = require ('express');
const router = express.Router();
const Activity = require('../models/Activity');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const jwtSecret = 'asjdgbhflijasdhripasdhf';

// get user's completed achievements
router.get('/', async (req, res) => {
    try {
        const {token} = req.cookies;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const {id} = userData;
            const activities = await Activity.find({user_id:id});
            const completedAchievements = [];

            // check for each achievement condition
            // const isLineConnected = await User.find({user_line_id});
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
            // if (isLineConnected) completedAchievements.push({title:'Ready To Fight', completed: true});
            if (isFirstActivityCreated) completedAchievements.push({title:'The Beginner', completed: true});
            if (is90MinsActivityDuration) completedAchievements.push({title:'Extraordinary', completed: true});
            if (is10000mACtivityDistance) completedAchievements.push({title:'Warrior Reborn', completed: true});
            if (is9000MinsAllActivityDuration) completedAchievements.push({title:'Legendary Player', completed: true});
            if (isWalkingMoreThan5Times.length >= 5) completedAchievements.push({title:'The Golden Legs', completed: true});
            if (isRunningMoreThan5Times.length >= 5) completedAchievements.push({title:'The Flash', completed: true});
            if (isSwimmingMoreThan5Times.length >= 5) completedAchievements.push({title:'Aquaman', completed: true});
            if (isBikingMoreThan5Times.length >= 5) completedAchievements.push({title:'Ride The Legend', completed: true});
            if (isHikingMoreThan5Times.length >= 5) completedAchievements.push({title:'The Conqueror', completed: true});
            if (hasDoneMoreThan5Activities) completedAchievements.push({title:'A Healthy Person', completed: true});
            if (hasDoneMoreThan10Activities) completedAchievements.push({title:'Unstoppable', completed: true});
            


            res.json(completedAchievements);
        });
    } catch (err) {
        res.status(500).json('Internal Server Error');
    }
});

module.exports = router;
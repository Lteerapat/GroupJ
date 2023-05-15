const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {getUserDataFromReq} = require('../utilities/utils');

// const jwtSecret = 'asjdgbhflijasdhripasdhf';

// const getUserDataFromReq = (req) => {
//     return new Promise((resolve, reject) => {
//         jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
//         if (err) throw err;
//         resolve(userData);
//         });
//     });
// };

router.get('/', async (req, res) => {
    const {token} = req.cookies;
    if (token) {
        try {
            const userData = await getUserDataFromReq(req);
            const {first_name, email, _id} = await User.findById(userData.id);
            res.json({first_name, email, _id});
        } catch (err) {
            res.json(null);
        }
    } else {
        res.json(null);
    }
});
// router.get('/', async (req, res) => {
//     const { token } = req.cookies;
//     if (token) {
//     try {
//         const userData = await getUserDataFromReq(req);
//         if (userData) {
//         const { first_name, email, _id } = await User.findById(userData.id);
//         if (first_name && email && _id) {
//             res.json({ user: { first_name, email, _id } });
//         } else {
//             res.json(null);
//         }
//         } else {
//         res.json(null);
//         }
//     } catch (err) {
//         res.json(null);
//     }
//     } else {
//     res.json(null);
//     }
// });
  
module.exports = router;



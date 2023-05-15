const jwt = require('jsonwebtoken');

const jwtSecret = 'asjdgbhflijasdhripasdhf';

const getUserDataFromReq = (req) => {
    return new Promise((resolve, reject) => {
        //userData = decoded payload eg. {email:test@mail.com, password:123, id:12} 
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        resolve(userData);
        });
    });
};

module.exports = {
    getUserDataFromReq,
};
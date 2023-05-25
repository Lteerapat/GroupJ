const express = require('express');
const connectDB = require('./database/connect');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const Activity = require('./models/Activity');
const cookieParser = require('cookie-parser');

require('dotenv').config();
const app = express();

// Routes
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const logoutRouter = require('./routes/logout');
const activitiesRouter = require('./routes/activities');
const achievementsRouter = require('./routes/achievement');
const chartjsRouter = require('./routes/chartjs');

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));


// check if server is ok
app.get('/', (req, res) => {
    res.json('test ok');
});

// Use Routes
app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.use('/logout', logoutRouter);
app.use('/activities', activitiesRouter);
app.use('/achievements', achievementsRouter);
app.use('/chartjs', chartjsRouter);


//connect to db
const port = process.env.PORT || 3002
const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:%d`, port);
        });
    } catch (err) {
        console.log(err);
    }
};

// start the server
start();


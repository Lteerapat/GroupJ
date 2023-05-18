const express = require('express');
const connectDB = require('./database/connect');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const Activity = require('./models/Activity');
const LineUser = require('./models/LineUser');
const cookieParser = require('cookie-parser');
const activityRoute = require('./routes/activityRoute');

require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

app.get('/', (req, res) => {
    res.json('test ok');
});

app.use("/activity-add", activityRoute);

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

start();


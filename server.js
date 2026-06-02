require('dotenv').config();
console.log(process.env.JWT_SECRET);

const express = require('express');

const app = express();

const taskRoutes = require('./routes/taskRoute');

app.use(express.json());

app.use(taskRoutes);

app.listen(3000, () => {
    console.log('Server Jalan Euy');
});
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = mongoose.connection;
require('dotenv').config();
const session = require('express-session');

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cohortsort';
const PORT = process.env.PORT || 3000;

db.on('error', err => console.log(err.message + ' is Mongod not running?'));
db.on('disconnected', () => console.log('mongo disconnected'));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static('public'));

const usersController = require('./controllers/usersController.js');
app.use('/users', usersController);

const sessionsController = require('./controllers/sessionsController.js');
app.use('/sessions', sessionsController);

const boardsController = require('./controllers/boardsController.js');
app.use('/boards', boardsController);

const listsController = require('./controllers/listsController.js');
app.use('/lists', listsController);

const tasksController = require('./controllers/tasksController.js');
app.use('/tasks', tasksController);

app.listen(PORT, () => {
  console.log(`...listening on port ${PORT}`);
});
mongoose.connect(mongoURI, {useNewUrlParser:true}, () => {
  console.log('MongoDB connection established');
});

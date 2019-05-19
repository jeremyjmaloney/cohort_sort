const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = Schema({
    taskDescription: {type: String, required: true},
    belongsToList: String
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

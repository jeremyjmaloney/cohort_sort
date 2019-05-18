const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = Schema({
    title: {type: String, required: true},
    belongsTo: Array
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;

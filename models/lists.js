const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = Schema({
    title: {type: String, required: true},
    belongsTo: Array
});

const List = mongoose.model('List', listSchema);

module.exports = List;

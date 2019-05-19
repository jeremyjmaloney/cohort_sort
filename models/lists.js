const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = Schema({
    listTitle: {type: String, required: true},
    belongsToBoard: String
});

const List = mongoose.model('List', listSchema);

module.exports = List;

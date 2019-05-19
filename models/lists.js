const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = Schema({
    listTitle: {type: String, required: true},
    belongsTo: String
});

const List = mongoose.model('List', listSchema);

module.exports = List;

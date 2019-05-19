const express = require('express');
const router = express.Router();
const List = require('../models/lists.js');

router.post('/', (req, res) => {
    List.create(req.body, (err, createdList) => {
        res.json(createdList);
    });
});

router.get('/:id', (req, res) => {
    console.log(this.currentBoard);
    List.find({belongsTo: req.params.id}, (error, foundLists) => {
        res.json(foundLists);
    });
});

module.exports = router;

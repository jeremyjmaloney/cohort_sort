const express = require('express');
const router = express.Router();
const List = require('../models/lists.js');

router.post('/', (req, res) => {
    List.create(req.body, (err, createdList) => {
        res.json({
            list: createdList
        });
    });
});

router.get('/:id', (req, res) => {
    List.find({belongsToBoard: req.params.id}, (error, foundLists) => {
        res.json(foundLists);
    });
});

router.put('/:id', (req, res) => {
    List.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, foundList) => {
        res.json(foundList);
    });
});

module.exports = router;

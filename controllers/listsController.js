const express = require('express');
const router = express.Router();
const List = require('../models/lists.js');
const Task = require('../models/tasks.js');

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

router.delete('/:listID', (req, res) => {
  List.findByIdAndRemove(req.params.listID, (error, deletedList) => {
    Task.deleteMany({belongsToList: req.params.listID}, (error, deletedTasks) =>{
      res.status(201).json({
        status:201,
        message: "list & tasks deleted"
      });
    });
  });
});

router.put('/:id', (req, res) => {
    List.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, foundList) => {
        res.json(foundList);
    });
});

module.exports = router;

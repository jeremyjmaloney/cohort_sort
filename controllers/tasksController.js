const express = require('express');
const router = express.Router();
const Task = require('../models/tasks.js');

router.post('/', (req, res) => {
  Task.create(req.body, (err, createdTask) => {
    res.status(201).json({
      status:201,
      message: "task created",
      task: createdTask
    });
  });
});

router.get('/:id', (req, res) => {
  Task.find({belongsToBoard: req.params.id}, (error, foundTasks) => {
    res.json(foundTasks);
  });
});

router.put('/:taskID/:listID', (req, res) => {
    Task.findByIdAndUpdate(req.params.taskID, {belongsToList: req.params.listID}, (error, foundTask) => {
        res.json(foundTask);
    });
});


module.exports = router;

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
    console.log(req.params.listID);
    Task.findByIdAndUpdate(req.params.taskID, {belongsToList: req.params.listID}, {new:true}, (error, foundTask) => {
        console.log(foundTask);
        console.log(req.body);
        res.json(foundTask);
    });
});

router.delete('/:taskID', (req, res) => {
  Task.findByIdAndRemove(req.params.taskID, (error, deletedTask) => {
    console.log(deletedTask);
    res.json(deletedTask);
  })
})

router.put('/:id', (req, res) => {
    Task.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedTask) => {
        res.json(updatedTask);
    });
});


module.exports = router;

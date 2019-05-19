const express = require('express');
const router = express.Router();
const Board = require('../models/boards.js');

router.post('/', (req, res) => {
    Board.create(req.body, (err, createdBoard) => {
        console.log(req.body);
        console.log(createdBoard);
        console.log(req.session.currentUser);
        res.status(201).json({
            status:201,
            message: "board created"
        });
    });
});

router.get('/', (req, res) => {
  Board.find({}, (err, foundBoards) => {
    console.log(foundBoards);
    res.json(foundBoards);
  })
})

module.exports = router;

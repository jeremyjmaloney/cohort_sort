const express = require('express');
const router = express.Router();
const Board = require('../models/boards.js');

router.post('/', (req, res) => {
    Board.create(req.body, (err, createdBoard) => {
        res.status(201).json({
            status:201,
            message: "board created",
            board: createdBoard
        });
    });
});

router.get('/', (req, res) => {
  Board.find({}, (err, foundBoards) => {
    console.log(foundBoards);
    res.json({
      boards: foundBoards
    });
  })
})

module.exports = router;

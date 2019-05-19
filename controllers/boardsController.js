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
  });
});

router.get('/:id', (req, res)=>{
  Board.findById(req.params.id, (error, foundBoard)=>{
    res.json(foundBoard);
  });
});

module.exports = router;

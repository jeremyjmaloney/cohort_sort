const express = require('express');
const router = express.Router();
const Board = require('../models/boards.js');
const User = require('../models/users.js');

router.post('/', (req, res) => {
    Board.create(req.body, (err, createdBoard) => {
        res.status(201).json({
            status:201,
            message: "board created",
            board: createdBoard
        });
    });
});

router.get('/:id', (req, res) => {
  Board.find({belongsTo: req.params.id}, (err, foundBoards) => {
    console.log(foundBoards);
    res.json({
      boards: foundBoards
    });
  });
});

router.get('/board/:id', (req, res)=>{
  Board.findById(req.params.id, (error, foundBoard)=>{
    res.json(foundBoard);
  });
});

router.put('/:boardID/:searchedUser', (req, res) => {
  User.find({username: req.params.searchedUser}, (error, foundUser) => {
      console.log(foundUser);
    if (foundUser.length > 0) {
        console.log(foundUser);
        Board.findByIdAndUpdate(req.params.boardID, {$push: {belongsTo: (foundUser[0]._id).toString()}}, (error, foundBoard) => {
          // console.log(foundBoard);
          res.json(foundBoard);
        });
    } else {
        res.json({message: 'invalid user'})
    }
  });
});

router.put('/:id', (req, res) => {
    Board.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, foundBoard) => {
        res.json(foundBoard);
    });
});

module.exports = router;

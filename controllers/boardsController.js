const express = require('express');
const router = express.Router();
const Board = require('../models/boards.js');

router.post('/', (req, res) => {
    Board.create(req.body, (err, createdBoard) => {
        console.log(req.body);
        console.log(createdBoard);
        res.status(201).json({
            status:201,
            message: "board created"
        });
    });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Board = require('../models/boards.js');
const bcrypt = require('bcrypt');

router.post('/', (req, res) => {
    Board.create(req.body, (err, createdBoard) => {
        res.status(201).json({
            status:201,
            message: "board created" + createdBoard
        });
    });
});

module.exports = router;

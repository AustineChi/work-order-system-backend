"use strict";

const express = require('express');

const router = express.Router()


var teamsController = require('../controller/teams');

router.get('/', teamsController.index);
router.post('/add', teamsController.add);
router.get('/view/:id', teamsController.view);
router.post('/update/:id', teamsController.update);
router.delete('/delete/:id', teamsController.delete);


module.exports = router;
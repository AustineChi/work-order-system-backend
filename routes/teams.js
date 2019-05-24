"use strict";

const express = require('express');

const router = express.Router()


var teamsController = require('../controller/teams');

router.get('/', teamsController.index);
router.post('/add', teamsController.add);
// router.post('/submit', workOrdersController.submit);
// router.get('/view/:id', workOrdersController.view);
// router.post('/update/:id', workOrdersController.update);
 

module.exports = router;
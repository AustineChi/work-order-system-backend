"use strict";

const express = require('express');
const router = express.Router();
var visitorController = require('../controller/visitorsLog');

router.get('/', visitorController.index);
router.post('/add', visitorController.add);
router.get('/view/:id', visitorController.view);
router.put('/update/:id', visitorController.update);

module.exports = router;
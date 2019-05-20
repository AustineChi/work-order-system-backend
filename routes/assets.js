"use strict";

const express = require('express');
const router = express.Router();
var assetsController = require('../controller/assets');

router.get('/', assetsController.index);
// router.post('/save', assetsController.save);
// router.post('/submit', assetsController.submit);
// router.get('/view/:id', assetsController.view);
// router.post('/update/:id', assetsController.update);
 

module.exports = router;
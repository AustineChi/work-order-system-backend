"use strict";

const express = require('express');
const router = express.Router();
var assetsController = require('../controllers/asset');
// var userController = require('../controller/user');

// router.get('/', userController.loginRequired, assetsController.index);
router.get('/', assetsController.index);
router.post('/add',  assetsController.add);
router.get('/view/:id', assetsController.view);
router.post('/filtered/view', assetsController.filteredView);
router.put('/update/:id', assetsController.update);
router.delete('/delete/:id', assetsController.delete);


module.exports = router;


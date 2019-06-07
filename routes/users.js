"use strict";

const express = require('express');
const router = express.Router();
var userController = require('../controller/users');

router.get('/', userController.index);
router.post('/add', userController.add);
// router.get('/view/:id', userController.view);
// router.put('/update/:id', userController.update);
// router.delete('/delete/:id', userController.delete);


module.exports = router;
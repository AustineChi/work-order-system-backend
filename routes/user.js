"use strict";

const express = require('express');
const router = express.Router();
var userController = require('../controller/user');

//router.get('/', userController.index);
router.post('/register', userController.register);
router.post('/login', userController.login);

// router.get('/view/:id', userController.view);
// router.put('/update/:id', userController.update);
// router.delete('/delete/:id', userController.delete);


module.exports = router;
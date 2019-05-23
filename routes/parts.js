"use strict";

const express = require('express');
const router = express.Router();
var partsController = require('../controller/parts');

router.get('/', partsController.index);
router.post('/add', partsController.add);
router.get('/view/:id', partsController.view);
router.put('/update/:id', partsController.update);
router.delete('/delete/:id', partsController.delete);


module.exports = router;
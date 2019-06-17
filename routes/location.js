"use strict";

const express = require('express');
const router = express.Router();
var locationController = require('../controllers/location');

router.get('/', locationController.index);
router.post('/add', locationController.add);
router.get('/view/:id', locationController.view);
router.put('/update/:id', locationController.update);
router.delete('/delete/:id', locationController.delete);


module.exports = router;
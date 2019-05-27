"use strict";

const express = require('express');

const router = express.Router()


var workOrdersController = require('../controller/workOrders');

router.get('/', workOrdersController.index);
router.post('/add', workOrdersController.add);
router.get('/view/:id', workOrdersController.view);
router.put('/update/:id', workOrdersController.update);
router.delete('/delete/:id', workOrdersController.delete);

module.exports = router;
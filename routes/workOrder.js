"use strict";

const express = require('express');

const router = express.Router()


var workOrdersController = require('../controller/workOrder');

router.get('/', workOrdersController.index);
router.post('/add', workOrdersController.add);
router.get('/view/:id', workOrdersController.view);
router.post('/filtered/view', workOrdersController.filteredView);
router.put('/update/:id', workOrdersController.update);
router.put('/update/parts/:id', workOrdersController.updateParts);
router.delete('/delete/:id', workOrdersController.delete);

module.exports = router;
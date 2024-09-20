
const express = require('express');
const router = express.Router(); 
const routeController = require('../fonts/controller');


router.get('/', routeController.getAllAnimais);

module.exports = router;


const express = require('express');
const router = express.Router(); 
const routeController = require('../fonts/controller');


router.get('/', routeController.GETAllAnimais);

router.post('/', routeController.POSTAnimaisADD);

router.put('/:id', routeController.UpdateAnimaisPUT);

router.patch('/:id', routeController.updateAnimaisPATCH);

router.delete('/:id', routeController.DELETEAnimais);

module.exports = router;

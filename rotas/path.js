
const express = require('express');
const router = express.Router(); 
const routeController = require('../fonts/controller');

//TABELA ANIMAIS 
router.get('/', routeController.GETAllAnimais);

router.post('/', routeController.POSTAnimaisADD);

router.put('/:id', routeController.UpdateAnimaisPUT);

router.patch('/:id', routeController.updateAnimaisPATCH);

router.delete('/:id', routeController.DELETEAnimais);

//TABELA ANIMAIS 

/////////////////////

// TABELA CLIENTES
router.get('/', routeController.GETAllClientes);

router.post('/', routeController.POSTClientesADD);

router.put('/:id', routeController.UpdateClientesPUT);

router.patch('/:id', routeController.updateClientesPATCH);

router.delete('/:id', routeController.DELETEClientes);

//TABELA CLIENTES
module.exports = router;

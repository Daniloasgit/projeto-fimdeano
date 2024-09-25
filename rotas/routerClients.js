const express = require('express');
const router = express.Router(); 
const routeController = require('../fonts/controller');

router.get('/', routeController.GETAllClientes);

router.post('/registro', routeController.POSTClientesADD);

router.put('/:id', routeController.UpdateClientesPUT);

router.patch('/:id', routeController.updateClientesPATCH);

router.delete('/:id', routeController.DELETEClientes);

//TABELA CLIENTES

module.exports = router;
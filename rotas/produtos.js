const express = require('express');
const router = express.Router(); 
const routeController = require('../fonts/controller');

router.get('/', routeController.GETAllProdutos);

router.post('/', routeController.POSTProdutosADD);

router.put('/:id', routeController.UpdateProdutosPUT);

router.patch('/:id', routeController.updateProdutosPATCH);

router.delete('/:id', routeController.DELETEProdutos);


module.exports = router;
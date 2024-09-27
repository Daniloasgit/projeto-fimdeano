// Importa o framework Express
const express = require('express');
// Cria um novo roteador usando o Express
const router = express.Router(); 
// Importa o controlador que contém a lógica das rotas
const routeController = require('../fonts/controller');

// Rota para obter todos os produtos (GET)
router.get('/', routeController.GETAllProdutos);

// Rota para adicionar um novo produto (POST)
router.post('/', routeController.POSTProdutosADD);

// Rota para atualizar um produto existente (PUT) pelo ID
router.put('/:id', routeController.UpdateProdutosPUT);

// Rota para atualizar parcialmente um produto (PATCH) pelo ID
router.patch('/:id', routeController.updateProdutosPATCH);

// Rota para deletar um produto pelo ID (DELETE)
router.delete('/:id', routeController.DELETEProdutos);

// Exporta o roteador para ser usado em outras partes da aplicação
module.exports = router;

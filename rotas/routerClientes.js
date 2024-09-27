// Importa o framework Express
const express = require('express');
// Cria um novo roteador usando o Express
const router = express.Router(); 
// Importa o controlador que contém a lógica das rotas
const routeController = require('../fonts/controller');

// TABELA CLIENTES

// Rota para obter todos os clientes (GET)
router.get('/', routeController.GETAllClientes);

// Rota para adicionar um novo cliente (POST)
router.post('/', routeController.POSTClientesADD);

// Rota para atualizar um cliente existente (PUT) pelo ID
router.put('/:id', routeController.UpdateClientesPUT);

// Rota para atualizar parcialmente um cliente (PATCH) pelo ID
router.patch('/:id', routeController.updateClientesPATCH);

// Rota para deletar um cliente pelo ID (DELETE)
router.delete('/:id', routeController.DELETEClientes);

// Exporta o roteador para ser usado em outras partes da aplicação
module.exports = router;

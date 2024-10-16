

// Importa o framework Express
const express = require('express');
// Cria um novo roteador usando o Express
const router = express.Router(); 
// Importa o controlador que contém a lógica das rotas
const routeController = require('../fonts/controller');

const pathMiddleware = require('../middleware/pathmiddleware');

// TABELA ANIMAIS 

// Rota para obter todos os clientes (GET)
router.get('/', pathMiddleware.GETAllClientes);

// Rota para adicionar um novo cliente (POST)
router.post('/', pathMiddleware.POSTClientesADD);

// Rota para atualizar um cliente existente (PUT) pelo ID
router.put('/:id', pathMiddleware.UpdateClientesPUT);

// Rota para atualizar parcialmente um cliente (PATCH) pelo ID
router.patch('/:id', pathMiddleware.updateClientesPATCH);

// Rota para deletar um cliente pelo ID (DELETE)
router.delete('/:id', pathMiddleware.DELETEClientes);



// Exporta o roteador para ser usado em outras partes da aplicação
module.exports = router;

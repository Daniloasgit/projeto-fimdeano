// Importa o framework Express
const express = require('express');
// Cria um novo roteador usando o Express
const router = express.Router(); 
// Importa o controlador que contém a lógica das rotas
const routeController = require('../fonts-controll/controller');

// TABELA ANIMAIS 

// Rota para obter todos os animais (GET)
router.get('/', routeController.GETAllAnimais);

// Rota para adicionar um novo animal (POST)
router.post('/', routeController.POSTAnimaisADD);

// Rota para atualizar um animal existente (PUT) pelo ID
router.put('/:id', routeController.UpdateAnimaisPUT);

// Rota para atualizar parcialmente um animal (PATCH) pelo ID
router.patch('/:id', routeController.updateAnimaisPATCH);

// Rota para deletar um animal pelo ID (DELETE)
router.delete('/:id', routeController.DELETEAnimais);

// TABELA ANIMAIS 


// Exporta o roteador para ser usado em outras partes da aplicação
module.exports = router;

const express = require('express'); // Importa o framework Express 
const router = express.Router(); // Cria um novo roteador 
const tokenController = require('../fonts/tokenController'); // Importa o controlador de autenticação 

// Rota para registro de usuário 
router.post('/register', tokenController.registerUser); 
// Rota para login de usuário 
router.post('/login', tokenController.loginUser); 

// Define uma rota POST para '/request-password-reset', que chama a função 'requestPasswordReset' do 'tokenController' para iniciar o processo de redefinição de senha.
router.post('/request-password-reset', tokenController.requestPasswordReset);

// Define uma rota POST para '/reset-password', que chama a função 'resetPassword' do 'authController' para redefinir a senha do usuário.
router.post('/reset-password', tokenController.resetPassword);


module.exports = router; // Exporta o roteador
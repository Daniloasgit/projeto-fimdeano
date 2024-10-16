const express = require ('express'); // Importa o framework Express 
const router = express.Router(); // Cria um novo roteador 
// const pathController = require ('../fonts/tokenController'); // Importa o controlador de autenticação  

router.post('register, tokenController.registerUser')

router.post('/login, tokenController.loginUser')

module.exports = router;

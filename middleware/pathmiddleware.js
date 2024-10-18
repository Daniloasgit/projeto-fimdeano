// Importa o módulo jsonwebtoken, que permite trabalhar com tokens JWT (JSON Web Tokens)
const jwt = require('jsonwebtoken');

// Define um middleware chamado 'pathmiddleware' que recebe as requisições (req), respostas (res) e a próxima função (next)
const pathmiddleware = (req, res, next) => {
    // Tenta obter o token do cabeçalho 'Authorization' e remove a palavra 'Bearer' do início
    const token = req.header('Authorization').replace('Bearer', '');

    // Verifica se o token não foi fornecido
    if (!token) {
        // Retorna uma resposta 401 (não autorizado) se nenhum token foi encontrado
        return res.status(401).send('Acesso negado. Nenhum token fornecido.');
    }

    // Tenta verificar o token utilizando a chave secreta definida nas variáveis de ambiente
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Se o token for válido, armazena os dados decodificados no objeto req.user
        req.user = decoded;
        // Chama a próxima função no middleware
        next(); 
    } catch (err) {
        // Se houver um erro na verificação do token, retorna uma resposta 400 (bad request)
        res.status(400).send('Token inválido');
    }
};

// Exporta o middleware para que possa ser utilizado em outras partes da aplicação
module.exports = pathmiddleware;

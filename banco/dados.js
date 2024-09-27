// Importa o módulo mysql2 para interação com o banco de dados MySQL
const mysql = require('mysql2');

// Cria uma conexão com o banco de dados usando variáveis de ambiente
const bd = mysql.createConnection({
    host: process.env.DB_HOST,     // Endereço do host do banco de dados
    user: process.env.DB_USER,     // Nome do usuário do banco de dados
    password: process.env.DB_PASS,  // Senha do usuário do banco de dados
    database: process.env.DB_NAME   // Nome do banco de dados a ser usado
});

// Estabelece a conexão com o banco de dados
bd.connect((err) => {
    if (err) {
        // Se ocorrer um erro, loga a mensagem de erro
        console.error('Erro ao se conectar ao banco de dados', err);
        return;
    }
    // Caso a conexão seja bem-sucedida, loga uma mensagem de sucesso
    console.log('Conectado ao banco de dados MYSQL');
});

// Exporta a conexão para que possa ser utilizada em outras partes da aplicação
module.exports = bd;

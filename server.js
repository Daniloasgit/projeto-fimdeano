// Importa as bibliotecas necessárias
const express = require('express'); // Framework para criar o servidor
const cors = require('cors'); // Middleware para habilitar CORS
const bodyParser = require('body-parser'); // Middleware para analisar o corpo das requisições
const dotenv = require('dotenv'); // Carrega variáveis de ambiente do arquivo .env
const tokenPath = require ('./rotas/tokenPath')
// Carrega as variáveis de ambiente
dotenv.config();

// Importa a base de dados (presumivelmente para manipulação de dados)
const bd = require('./banco/dados');

// Cria uma instância do aplicativo Express
const app = express();

// Habilita o CORS para permitir requisições de diferentes origens
app.use(cors());



// Configura o body-parser para interpretar requisições JSON
app.use(bodyParser.json());

// Importa as rotas específicas
const pathRoutes = require('./rotas/path');
const routerClientes = require('./rotas/routerClientes');
const produtosRoutes = require('./rotas/produtos');

// Define as rotas principais da API
app.use('api/tokenPath',pathRoutes)
app.use('/api/animais', pathRoutes);
app.use('/api/clientes', routerClientes);
app.use('/api/produtos', produtosRoutes);

// Rota padrão que responde com uma mensagem de que o servidor está ativo
app.get('/', (req, res) => {
    res.send('Servidor ativo');
});

// Define a porta que o servidor vai escutar
const PORT = process.env.PORT || 3000;

// Inicia o servidor e exibe uma mensagem no console
app.listen(PORT, () => {
    console.log(`O servidor está rodando na porta ${PORT}`);
});


//

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');


dotenv.config();

const bd = require('./banco/dados');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const pathRoutes = require ('./rotas/path');
const routerClientes = require('./rotas/routerClientes');
const produtosRoutes = require('./rotas/produtos');

app.use('/api/animais', pathRoutes);
app.use('/api/clientes',routerClientes);
app.use('/api/produtos', produtosRoutes);


app.get('/', (req, res) => {
    res.send('Servidor ativo');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`O servidor está rodando na porta ${PORT}`);
});

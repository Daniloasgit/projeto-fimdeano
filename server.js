
//

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');


dotenv.config();

const bd = require('./banco/dados');
const router = require('./rotas/path');
const routerClientes = require('./rotas/routerClients');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/animais',router);


app.get('/', (req, res) => {
    res.send('Servidor ativo');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`O servidor está rodando na porta ${PORT}`);
});

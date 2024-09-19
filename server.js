 const express = require('express');
 const dotenv = require('dotenv');
  const cors = require('cors');
  const bodyparser = require ('body-parser')

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyparser.json());

app.get('/', (req,res) =>{
    res.send ('servidor ativo');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
   console.log(`o servidor está rodando na porta ${PORT}`) 
});
const crypto = require('crypto');
const bd = require('../banco/dados');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//registrar novo usuario
const registerUser = async (req,res) => {
    const{ nome, email, senha, telefone, cpf } = req.body;

    //verificar se usuario ja existe 
    try {
        const [exisUser] = await bd.promise().query('SELECT * FROM clientes WHERE email = ?',
        [email]);
        if(exisUser.length > 0) {
            return res.status(400).send('usuario já registrado')
        }
        //criptografar senha
        const hashedSenha = await bcrypt.hash(senha,10);
        
        await bd.promise().query(
            'INSERT INTO clientes (nome, email, senha, telefone, cpf ) VALUES (?,?,?,?,?)'
            [nome, email, senha, telefone, cpf ]
        );

        res.status(201).send('Usuario registrado com sucesso!');
    } catch(err) {
        console.error('Erro ao registrar usuario',err);
        res.status(500).send('Erro ao registrar usuario!');
    }
};

// função de autenticar
const loginUser = async(req,res) => {
    const {email,senha} = req.body;
    // Desestrutura os dados do corpo da requisição

     // Verificar se o usuário existe no banco de dados 
     try{
        const[user] = await bd.promise().query('SELECT * FROM clientes WHERE ?',[email]);
        if(user.length === 0 ) {
            return res.status(400).send ('credenciais incorretas');
        }

         // Comparar a senha fornecida com a senha criptografada no banco de dados 
        const comp = await bcrypt.compare(senha,nome[0].senha);
        if(!comp) {
            return res.status(400).send('credenciais incorretas!');
        }

           // Gerar um token JWT 
           const token = jwt.sign({nomeID: nome[0].id},process.env.JWT_SECRET,{expiresIn: '1h'});
           res.json({token});
     }  catch (err) {
        console.error('Erro ao autenticar usuario',err);
        return res.status(400).send('Erro ao autenticar usuario');
     }
};

module.exports ={
    registerUser,
    loginUser
};
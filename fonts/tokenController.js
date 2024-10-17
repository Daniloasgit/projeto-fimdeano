const crypto = require('crypto');
const bd = require('../banco/dados');
const bcrypt = require('bcrypt');
const sendEmail =require('../email-service/eService').sendEmail;
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
            'INSERT INTO clientes (nome, email, senha, telefone, cpf ) VALUES (?,?,?,?,?)',
            [nome, email, hashedSenha, telefone, cpf ]
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

const requestPasswordReset = async (req,res) => {
    const{email} =req.body;

    try { 
        const [user] = await bd.promise().query('SELECT * FROM clientes WHERE email = ?', [email]);

        if (user.length === 0) { 
            return res.status(404).send('Usuário não encontrado'); 
          }

          const token = crypto.randomBytes(20).toString('hex'); // Gera um token aleatório 
          const expireDate = new Date(Date.now() + 3600000); // 1 hora para expiração 
       
          await db.promise().query('UPDATE users SET reset_password_token = ?, reset_password_expires = ? WHERE email = ?', [token, expireDate, email]);       
          const resetLink = `http://localhost:3000/reset-password/${token}`; // Link para redefinição de senha 
      
          sendEmail(email, 'Recuperação de Senha', `Por favor, clique no link para redefinir sua 
      senha: ${resetLink}`); 
       
          res.send('E-mail de recuperação de senha enviado'); 
        } catch (err) { 
          console.error('Erro ao solicitar redefinição de senha:', err); 
          res.status(500).send('Erro ao solicitar redefinição de senha'); 
        } 
      };


      // Função para redefinir a senha 
const resetPassword = async (req, res) => { 
    const { token, newSenha } = req.body; 
   
    try { 
      const [user] = await db.promise().query('SELECT * FROM users WHERE  reset_password_token = ? AND reset_password_expires > NOW()', [token]); 
   
      if (user.length === 0) { 
        return res.status(400).send('Token inválido ou expirado'); 
      } 
   
      const hashedSenha = await bcrypt.hash(newSenha, 10); // Criptografa a nova senha 
   
      await db.promise().query('UPDATE users SET password = ?, reset_password_token = NULL,  reset_password_expires = NULL WHERE id = ?', [hashedSenha, user[0].id]); 
   
      res.send('Senha redefinida com sucesso'); 
    } catch (err) { 
      console.error('Erro ao redefinir senha:', err); 
      res.status(500).send('Erro ao redefinir senha'); 
    } 
  }; 
module.exports ={
    registerUser,
    loginUser,
    requestPasswordReset, 
    resetPassword
};
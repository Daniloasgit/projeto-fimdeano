// Importa módulos necessários
const crypto = require('crypto'); // Para gerar tokens aleatórios
const bd = require('../banco/dados'); // Conexão com o banco de dados
const bcrypt = require('bcrypt'); // Para criptografar senhas
const sendEmail = require('../email-service/eService').sendEmail; // Serviço para enviar e-mails
const jwt = require('jsonwebtoken'); // Para gerar tokens JWT

// Função para registrar um novo usuário
const registerUser = async (req, res) => {
    // Desestrutura os dados do corpo da requisição
    const { nome, email, senha, telefone, cpf } = req.body;

    // Verificar se o usuário já existe
    try {
        const [exisUser] = await bd.promise().query('SELECT * FROM clientes WHERE email = ?', [email]);
        
        // Se o usuário já estiver registrado, retorna erro
        if (exisUser.length > 0) {
            return res.status(400).send('Usuário já registrado');
        }
        
        // Criptografa a senha antes de armazená-la
        const hashedSenha = await bcrypt.hash(senha, 10);
        
        // Insere o novo usuário no banco de dados
        await bd.promise().query(
            'INSERT INTO clientes (nome, email, senha, telefone, cpf) VALUES (?, ?, ?, ?, ?)',
            [nome, email, hashedSenha, telefone, cpf]
        );

        // Retorna sucesso na resposta
        res.status(201).send('Usuário registrado com sucesso!');
    } catch (err) {
        // Se ocorrer um erro, loga o erro e retorna uma mensagem
        console.error('Erro ao registrar usuário', err);
        res.status(500).send('Erro ao registrar usuário!');
    }
};

// Função para autenticar um usuário
const loginUser = async (req, res) => {
    // Desestrutura os dados do corpo da requisição
    const { email, senha } = req.body;

    // Verificar se o usuário existe no banco de dados
    try {
        const [user] = await bd.promise().query('SELECT * FROM clientes WHERE email = ?', [email]);
        
        // Se o usuário não for encontrado, retorna erro
        if (user.length === 0) {
            return res.status(400).send('Credenciais incorretas');
        }

        // Compara a senha fornecida com a senha criptografada no banco de dados
        const comp = await bcrypt.compare(senha, user[0].senha);
        
        // Se as credenciais não corresponderem, retorna erro
        if (!comp) {
            return res.status(400).send('Credenciais incorretas!');
        }

        // Gera um token JWT para o usuário autenticado
        const token = jwt.sign({ nomeID: user[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        // Retorna o token na resposta
        res.json({ token });
    } catch (err) {
        // Se ocorrer um erro, loga o erro e retorna uma mensagem
        console.error('Erro ao autenticar usuário', err);
        return res.status(400).send('Erro ao autenticar usuário');
    }
  
};

// Função para solicitar redefinição de senha
const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        // Verifica se o usuário existe
        const [user] = await bd.promise().query('SELECT * FROM clientes WHERE email = ?', [email]);

        // Se o usuário não for encontrado, retorna erro
        if (user.length === 0) {
            return res.status(404).send('Usuário não encontrado');
        }

        // Gera um token aleatório e define a data de expiração
        const token = crypto.randomBytes(20).toString('hex');
        const expireDate = new Date(Date.now() + 3600000); // 1 hora de expiração
        
        // Atualiza o banco de dados com o token e a data de expiração
        await bd.promise().query('UPDATE clientes SET reset_password_token = ?, reset_password_expires = ? WHERE email = ?', [token, expireDate, email]);

        // Cria um link para redefinição de senha
        const resetLink = `http://localhost:3000/reset-password/${token}`;
        
        // Envia o e-mail com o link para redefinição de senha
        sendEmail(email, 'Recuperação de Senha', `Por favor, clique no link para redefinir sua senha: ${resetLink}`);
        
        // Retorna confirmação de que o e-mail foi enviado
        res.send('E-mail de recuperação de senha enviado');
    } catch (err) {
        // Se ocorrer um erro, loga o erro e retorna uma mensagem
        console.error('Erro ao solicitar redefinição de senha:', err);
        res.status(500).send('Erro ao solicitar redefinição de senha');
    }
};

// Função para redefinir a senha
const resetPassword = async (req, res) => {
    const { token, newSenha } = req.body;

    try {
        // Verifica se o token é válido e não expirou
        const [user] = await bd.promise().query('SELECT * FROM clientes WHERE reset_password_token = ? AND reset_password_expires > NOW()', [token]);

        // Se o token não for encontrado ou expirou, retorna erro
        if (user.length === 0) {
            return res.status(400).send('Token inválido ou expirado');
        }

        // Criptografa a nova senha
        const hashedSenha = await bcrypt.hash(newSenha, 10);

        // Atualiza a senha no banco de dados e limpa o token de redefinição
        await bd.promise().query('UPDATE clientes SET senha = ?, reset_password_token = NULL, reset_password_expires = NULL WHERE id = ?', [hashedSenha, user[0].id]);

        // Retorna confirmação de que a senha foi redefinida com sucesso
        res.send('Senha redefinida com sucesso');
    } catch (err) {
        // Se ocorrer um erro, loga o erro e retorna uma mensagem
        console.error('Erro ao redefinir senha:', err);
        res.status(500).send('Erro ao redefinir senha');
    }
};

// Exporta as funções para que possam ser usadas em outras partes da aplicação
module.exports = {
    registerUser,
    loginUser,
    requestPasswordReset,
    resetPassword
};

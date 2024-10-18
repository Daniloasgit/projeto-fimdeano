
// Importa a conexão com o banco de dados
const bd = require('../banco/dados');

// TABELA ANIMAIS

// Função para obter todos os animais
const GETAllAnimais = (req, res) => {
    bd.query('SELECT * FROM animais', (err, result) => {
        if (err) {
            console.error('ERRO AO OBTER animais', err);
            res.status(500).send('ERRO AO OBTER animais');
            return;
        }
        res.json(result); // Retorna a lista de animais em formato JSON
    });
};

// Função para adicionar um novo animal
const POSTAnimaisADD = (req, res) => {
    const { Animal, especie, chip_iden } = req.body;

    // Verifica se o animal já está cadastrado
    bd.query(
        'SELECT * FROM animais WHERE Animal=? AND especie=? AND chip_iden=?',
        [Animal, especie, chip_iden],
        (err, result) => {
            if (err) {
                console.error('ERRO AO VERIFICAR Animal', err);
                res.status(500).send('ERRO AO VERIFICAR Animal');
                return;
            }
            if (result.length > 0) {
                res.status(400).send('Animal já cadastrado');
                return;
            }

            // Insere um novo animal
            bd.query(
                'INSERT INTO animais (Animal, especie, chip_iden) VALUES (?, ?, ?)',
                [Animal, especie, chip_iden],
                (err, result) => {
                    if (err) {
                        console.error('ERRO AO ADICIONAR Animal', err);
                        res.status(500).send('ERRO AO ADICIONAR Animal');
                        return;
                    }
                    res.status(201).send('Animal adicionado com sucesso'); // Retorna sucesso
                }
            );
        }
    );
};

// Função para atualizar um animal existente (PUT)
const UpdateAnimaisPUT = (req, res) => {
    const { id } = req.params;
    const { Animal, especie, chip_iden } = req.body;
    
    bd.query(
        'UPDATE animais SET Animal = ?, especie = ?, chip_iden = ? WHERE id = ?',
        [Animal, especie, chip_iden, id],
        (err, results) => {
            if (err) {
                console.error('ERRO AO ATUALIZAR animaL', err);
                res.status(500).send('ERRO AO ATUALIZAR animaL');
                return;
            }
            if (results.affectedRows === 0) {
                res.status(404).send('Animal não encontrado');
                return;
            }
            res.send('Animal atualizado com sucesso');
        }
    );
};

// Função para atualizar parcialmente um animal (PATCH)
const updateAnimaisPATCH = (req, res) => {
    const { id } = req.params;
    const fields = req.body;
    const query = [];
    const values = [];

    // Monta a query com os campos que devem ser atualizados
    for (const [key, value] of Object.entries(fields)) {
        query.push(`${key} = ?`);
        values.push(value);
    }
    values.push(id); // Adiciona o ID do animal

    bd.query(
        `UPDATE animais SET ${query.join(',')} WHERE id = ?`,
        values,
        (err, result) => {
            if (err) {
                console.error('ERRO AO ATUALIZAR animaL', err);
                res.status(500).send('ERRO AO ATUALIZAR animaL');
                return;
            }
            if (result.affectedRows === 0) {
                res.status(404).send('Animal NÃO ENCONTRADO');
                return;
            }
            res.send('Animal ATUALIZADO COM SUCESSO');
        }
    );
};

// Função para deletar um animal
const DELETEAnimais = (req, res) => {
    const { id } = req.params;
    bd.query('DELETE FROM animais WHERE ID = ?', [id], (err, result) => {
        if (err) {
            console.error('ERRO AO DELETAR animais', err);
            res.status(500).send('ERRO AO DELETAR animais');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('Animal não encontrado');
            return;
        }
        res.send('Animal deletado com sucesso');
    });
};

// TABELA CLIENTES

// Função para obter todos os clientes
const GETAllClientes = (req, res) => {
    bd.query('SELECT * FROM clientes', (err, result) => {
        if (err) {
            console.error('ERRO AO OBTER clientes', err);
            res.status(500).send('ERRO AO OBTER clientes');
            return;
        }
        res.json(result); // Retorna a lista de clientes em formato JSON
    });
};

// Função para adicionar um novo cliente
const POSTClientesADD = (req, res) => {
    const { nome, email, senha, telefone, cpf } = req.body;

    // Verifica se o cliente já está cadastrado
    bd.query(
        'SELECT * FROM clientes WHERE nome = ? AND email = ? AND senha = ? AND telefone = ? AND cpf = ?',
        [nome, email, senha, telefone, cpf],
        (err, result) => {
            if (err) {
                console.error('ERRO AO VERIFICAR clientes', err);
                res.status(500).send('ERRO AO VERIFICAR clientes');
                return;
            }
            if (result.length > 0) {
                res.status(400).send('Cliente já cadastrado');
                return;
            }

            // Insere um novo cliente
            bd.query(
                'INSERT INTO clientes (nome, email, senha, telefone, cpf) VALUES (?, ?, ?, ?, ?)',
                [nome, email, senha, telefone, cpf],
                (err, result) => {
                    if (err) {
                        console.error('ERRO AO ADICIONAR cliente', err);
                        res.status(500).send('ERRO AO ADICIONAR cliente');
                        return;
                    }
                    res.status(201).send('Cliente adicionado com sucesso'); // Retorna sucesso
                }
            );
        }
    );
};

// Função para atualizar um cliente existente (PUT)
const UpdateClientesPUT = (req, res) => {
    const { id } = req.params;
    const { nome, email, senha, telefone, cpf } = req.body;

    bd.query(
        'UPDATE clientes SET nome = ?, email = ?, senha = ?, telefone = ?, cpf = ? WHERE id = ?',
        [nome, email, senha, telefone, cpf, id],
        (err, results) => {
            if (err) {
                console.error('ERRO AO ATUALIZAR cliente', err);
                res.status(500).send('ERRO AO ATUALIZAR cliente');
                return;
            }
            if (results.affectedRows === 0) {
                res.status(404).send('Cliente não encontrado');
                return;
            }
            res.send('Cliente atualizado com sucesso');
        }
    );
};

// Função para atualizar parcialmente um cliente (PATCH)
const updateClientesPATCH = (req, res) => {
    const { id } = req.params;
    const fields = req.body;
    const query = [];
    const values = [];

    // Monta a query com os campos que devem ser atualizados
    for (const [key, value] of Object.entries(fields)) {
        query.push(`${key} = ?`);
        values.push(value);
    }
    values.push(id); // Adiciona o ID do cliente

    bd.query(
        `UPDATE clientes SET ${query.join(',')} WHERE id = ?`,
        values,
        (err, result) => {
            if (err) {
                console.error('ERRO AO ATUALIZAR clientes', err);
                res.status(500).send('ERRO AO ATUALIZAR clientes');
                return;
            }
            if (result.affectedRows === 0) {
                res.status(404).send('Cliente NÃO ENCONTRADO');
                return;
            }
            res.send('Cliente ATUALIZADO COM SUCESSO');
        }
    );
};

// Função para deletar um cliente
const DELETEClientes = (req, res) => {
    const { id } = req.params;
    bd.query('DELETE FROM clientes WHERE ID = ?', [id], (err, result) => {
        if (err) {
            console.error('ERRO AO DELETAR cliente', err);
            res.status(500).send('ERRO AO DELETAR cliente');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('Cliente não encontrado');
            return;
        }
        res.send('Cliente deletado com sucesso');
    });
};

// TABELA PRODUTOS

// Função para obter todos os produtos
const GETAllProdutos = (req, res) => {
    bd.query('SELECT * FROM produtos', (err, result) => {
        if (err) {
            console.error('ERRO AO OBTER produto', err);
            res.status(500).send('ERRO AO OBTER produto');
            return;
        }
        res.json(result); // Retorna a lista de produtos em formato JSON
    });
};

// Função para adicionar um novo produto
const POSTProdutosADD = (req, res) => {
    const { nome, data_vali, preco } = req.body;

    // Insere um novo produto
    bd.query(
        'INSERT INTO produtos (nome, data_vali, preco) VALUES (?, ?, ?)',
        [nome, data_vali, preco],
        (err, result) => {
            if (err) {
                console.error('ERRO AO ADICIONAR produto', err);
                res.status(500).send('ERRO AO ADICIONAR produto');
                return;
            }
            res.status(201).send('Produto adicionado com sucesso'); // Retorna sucesso
        }
    );
};

// Função para atualizar um produto existente (PUT)
const UpdateProdutosPUT = (req, res) => {
    const { id } = req.params;
    const { nome, data_vali, preco } = req.body;

    bd.query(
        'UPDATE produtos SET nome = ?, data_vali = ?, preco = ? WHERE id = ?',
        [nome, data_vali, preco, id],
        (err, results) => {
            if (err) {
                console.error('ERRO AO ATUALIZAR produto', err);
                res.status(500).send('ERRO AO ATUALIZAR produto');
                return;
            }
            if (results.affectedRows === 0) {
                res.status(404).send('Produto não encontrado');
                return;
            }
            res.send('Produto atualizado com sucesso');
        }
    );
};

// Função para atualizar parcialmente um produto (PATCH)
const updateProdutosPATCH = (req, res) => {
    const { id } = req.params;
    const fields = req.body;
    const query = [];
    const values = [];

    // Monta a query com os campos que devem ser atualizados
    for (const [key, value] of Object.entries(fields)) {
        query.push(`${key} = ?`);
        values.push(value);
    }
    values.push(id); // Adiciona o ID do produto

    bd.query(
        `UPDATE produtos SET ${query.join(',')} WHERE id = ?`,
        values,
        (err, result) => {
            if (err) {
                console.error('ERRO AO ATUALIZAR produto', err);
                res.status(500).send('ERRO AO ATUALIZAR produto');
                return;
            }
            if (result.affectedRows === 0) {
                res.status(404).send('Produto NÃO ENCONTRADO');
                return;
            }
            res.send('Produto ATUALIZADO COM SUCESSO');
        }
    );
};

// Função para deletar um produto
const DELETEProdutos = (req, res) => {
    const { id } = req.params;
    bd.query('DELETE FROM produtos WHERE ID = ?', [id], (err, result) => {
        if (err) {
            console.error('ERRO AO DELETAR produto', err);
            res.status(500).send('ERRO AO DELETAR produto');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('Produto não encontrado');
            return;
        }
        res.send('Produto deletado com sucesso');
    });
};

// EXPORTA AS FUNÇÕES
module.exports = {
    // Tabela Animais
    GETAllAnimais,
    POSTAnimaisADD,
    UpdateAnimaisPUT,
    updateAnimaisPATCH,
    DELETEAnimais,

    // Tabela Clientes
    GETAllClientes,
    POSTClientesADD,
    UpdateClientesPUT,
    updateClientesPATCH,
    DELETEClientes,

    // Tabela Produtos
    GETAllProdutos,
    POSTProdutosADD,
    UpdateProdutosPUT,
    updateProdutosPATCH,
    DELETEProdutos
};

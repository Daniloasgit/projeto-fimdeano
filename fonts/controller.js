const bd = require('../banco/dados');

// TABELA ANIMAIS

const GETAllAnimais = (req,res) =>{
    bd.query('SELECT * FROM animais',(err,result)=>{
        if (err) {
            console.error('ERRO AO OBTER animais', err);

            res.status(500).send('ERRO AO OBTER animais');
            return;
        }
        res.json(result);
    });

};

const POSTAnimaisADD = (req,res) => {
    const {Animal, especie, chip_iden} = req.body;

bd.query (
    'SELECT * FROM animais WHERE Animal=? AND especie=? AND chip_iden=?',
    
    [Animal, especie, chip_iden],
    (err,result) => {
        if(err) {
            console.error('ERRO AO VERIFICAR Animal', err);
            res.status(500).send('ERRO AO VERIFICAR Animal');
            return;
        }
        if(result.length > 0) {
            res.status(400).send('Animal já cadastrado');
            return;
        }

    bd.query(
        'INSERT INTO animais (Animal,especie,chip_iden) VALUES (?, ?, ?)',
    [ Animal, especie, chip_iden],
    (err,result)=> {
    
        if (err) {
            console.error('ERRO AO ADICIONAR Animal', err);
            res.status(500).send('ERRO AO ADICIONAR Animal');
            return;
        }

    res.status(201).send('Animal adicionado com sucesso');

                }
            );
        }
    );
};

const UpdateAnimaisPUT = (req,res) => {
    const{id} = req.params;
    const {Animal, especie, chip_iden} = req.body;
    bd.query(
        'UPDATE animais SET Animal = ?, especie = ?, chip_iden = ? WHERE id = ?',
[Animal, especie, chip_iden, id],
(err,results) => {
    if(err) {
        console.error('ERRO AO ATUALIZAR animaL', err);
        res.status(500).send('ERRO AO ATUALIZAR animaL');
        return;
    }
if(results.effectedRows===0){
    res.status(404).send('Animal não encontrado');
    return;
}
res.send('Animal atualizado com sucesso')
}
    );
};

const updateAnimaisPATCH = (req,res) =>{
    const {id} = req.params;
    const fields = req.body;
    const query = [];
    const values = [];

    for (const[key,value] of Object.entries (fields)) {
        query.push ( `${key} = ?`);
        values.push(value)

    }
    values.push(id)

    bd.query(
        `UPDATE animais SET ${query.join(',')} where id = ?`,
        values,
        (err,result) => {
            if(err) {
                console.error('ERRO AO ATUALIZAR animaL', err);
                res.status(500).send('ERRO AO ATUALIZAR animaL');
                return;
        }
        if(res.affectedRows===0) {
            res.status(404).send('Animal NÃO ENCONTRADO');
            return;
        }
        res.send('Animal ATUALIZADO COM SUCESSO');
        } 
    );
};


const DELETEAnimais = (req,res) => {
    const {id} = req.params;
    bd.query( 'DELETE FROM animais WHERE ID = ?', [id],
        (err,result) => {
            if(err) {
                console.error('ERRO AO DELETAR animais', err);
                res.status(500).send('ERRO AO DELETAR animais');
                return;
            }
            if(res.affectedRows===0){
                res.status(404).send('Animal não encontrado');
                return;
            }
            res.send('Animal deletado com sucesso');
        }
    );
};

// TABELA ANIMAIS
///////////////////////////
// TABELA CLIENTES

const GETAllClientes = (req,res) =>{
    bd.query('SELECT * FROM clientes',(err,result)=>{
        if (err) {
            console.error('ERRO AO OBTER clientes', err);

            res.status(500).send('ERRO AO OBTER clientes');
            return;
        }
        res.json(result);
    });

};

const POSTClientesADD = (req,res) => {
    const {nome, email, senha, telefone,cpf} = req.body;


    bd.query (
        'SELECT * FROM clientes WHERE nome = ? AND email = ? AND senha = ? AND telefone = ? AND cpf = ?',
        
        [nome, email, senha, telefone,cpf],
        (err,result) => {
            if(err) {
                console.error('ERRO AO VERIFICAR clientes', err);
                res.status(500).send('ERRO AO VERIFICAR clientes');
                return;
            }
            if(result.length > 0) {
                res.status(400).send('cliente já cadastrado');
                return;
            }
    
        bd.query(
            'INSERT INTO clientes (nome, email, senha, telefone,cpf) VALUES (?, ?, ?,?,?)',
        [nome, email, senha, telefone,cpf],
        (err,result)=> {
        
            if (err) {
                console.error('ERRO AO ADICIONAR cliente', err);
                res.status(500).send('ERRO AO ADICIONAR cliente');
                return;
            }
    
        res.status(201).send('cliente adicionado com sucesso');
    
                    }
                );
            }
        );
    };

//completo
const UpdateClientesPUT = (req,res) => {
    const{id} = req.params;
    const {nome, email, senha, telefone,cpf} = req.body;
    bd.query(
        'UPDATE clientes SET nome = ?, email = ?, senha = ?, telefone = ?, cpf = ? WHERE id = ?',
[nome, email, senha, telefone,cpf,id],
(err,results) => {
    if(err) {
        console.error('ERRO AO ATUALIZAR cliente', err);
        res.status(500).send('ERRO AO ATUALIZAR cliente');
        return;
    }
if(results.effectedRows===0){
    res.status(404).send('cliente não encontrado');
    return;
}
res.send('cliente atualizado com sucesso')
}
    );
};

const updateClientesPATCH = (req,res) =>{
    const {id} = req.params;
    const fields = req.body;
    const query = [];
    const values = [];

    for (const[key,value] of Object.entries (fields)) {
        query.push ( `${key} = ?`);
        values.push(value)

    }
    values.push(id)

    bd.query(
        `UPDATE clientes SET ${query.join(',')} where id = ?`,
        values,
        (err,result) => {
            if(err) {
                console.error('ERRO AO ATUALIZAR clientes', err);
                res.status(500).send('ERRO AO ATUALIZAR clientes');
                return;
        }
        if(res.affectedRows===0) {
            res.status(404).send('cliente NÃO ENCONTRADO');
            return;
        }
        res.send('cliente ATUALIZADO COM SUCESSO');
        } 
    );
};


const DELETEClientes = (req,res) => {
    const {id} = req.params;
    bd.query( 'DELETE FROM clientes WHERE ID = ?', [id],
        (err,result) => {
            if(err) {
                console.error('ERRO AO DELETAR cliente', err);
                res.status(500).send('ERRO AO DELETAR cliente');
                return;
            }
            if(res.affectedRows===0){
                res.status(404).send('cliente não encontrado');
                return;
            }
            res.send('cliente deletado com sucesso');
        }
    );
};
//TABELA CLIENTES

/////////////////

//TABELA PRODUTOS
const GETAllProdutos = (req,res) =>{
    bd.query('SELECT * FROM produtos',(err,result)=>{
        if (err) {
            console.error('ERRO AO OBTER produto', err);

            res.status(500).send('ERRO AO OBTER produto');
            return;
        }
        res.json(result);
    });

};

const POSTProdutosADD = (req,res) => {
    const {nome, data_vali, preco} = req.body;

        bd.query(
            'INSERT INTO produtos (nome, data_vali, preco) VALUES (?, ?, ?)',
        [nome, data_vali, preco],
        (err,result)=> {
        
            if (err) {
                console.error('ERRO AO ADICIONAR produto', err);
                res.status(500).send('ERRO AO ADICIONAR produto');
                return;
            }
    
        res.status(201).send('produto adicionado com sucesso');
    
                    }
                );
            }
    ''


//completo
const UpdateProdutosPUT = (req,res) => {
    const{id} = req.params;
    const {nome, data_vali, preco} = req.body;
    bd.query(
        'UPDATE produtos SET nome = ?, data_vali = ?, preco = ? WHERE id = ?',
[nome, data_vali, preco,id],
(err,results) => {
    if(err) {
        console.error('ERRO AO ATUALIZAR produto', err);
        res.status(500).send('ERRO AO ATUALIZAR produto');
        return;
    }
if(results.effectedRows===0){
    res.status(404).send('produto não encontrado');
    return;
}
res.send('produto atualizado com sucesso')
}
    );
};

const updateProdutosPATCH = (req,res) =>{
    const {id} = req.params;
    const fields = req.body;
    const query = [];
    const values = [];

    for (const[key,value] of Object.entries (fields)) {
        query.push ( `${key} = ?`);
        values.push(value)

    }
    values.push(id)

    bd.query(
        `UPDATE produtos SET ${query.join(',')} where id = ?`,
        values,
        (err,result) => {
            if(err) {
                console.error('ERRO AO ATUALIZAR produto', err);
                res.status(500).send('ERRO AO ATUALIZAR produto');
                return;
        }
        if(res.affectedRows===0) {
            res.status(404).send('produto NÃO ENCONTRADO');
            return;
        }
        res.send('produto ATUALIZADO COM SUCESSO');
        } 
    );
};


const DELETEProdutos = (req,res) => {
    const {id} = req.params;
    bd.query( 'DELETE FROM produtos WHERE ID = ?', [id],
        (err,result) => {
            if(err) {
                console.error('ERRO AO DELETAR produto', err);
                res.status(500).send('ERRO AO DELETAR produto');
                return;
            }
            if(res.affectedRows===0){
                res.status(404).send('produto não encontrado');
                return;
            }
            res.send('produto deletado com sucesso');
        }
    );
};

//TABELA PRODUTOS

    module.exports = {
        //tabela animais
        GETAllAnimais,
        POSTAnimaisADD,
        UpdateAnimaisPUT,
        updateAnimaisPATCH,
        DELETEAnimais,
//tabela animais

//tabela clientes
GETAllClientes,
POSTClientesADD,
UpdateClientesPUT,
updateClientesPATCH,
DELETEClientes,
//tabela clientes

//tabela produtos
        GETAllProdutos,
        POSTProdutosADD,
        UpdateProdutosPUT,
        updateProdutosPATCH,
        DELETEProdutos
    //tabela produtos
    };
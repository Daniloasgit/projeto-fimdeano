const bd = require('../banco/dados');

const GETAllAnimais = (req,res) =>{
    bd.query('SELECT * FROM animais',(err,res)=>{
        if (err) {
            console.error('ERRO AO OBTER animais', err);

            res.status(500).send('ERRO AO OBTER animais');
            return;
        }
        res.josn(res);
    })

}

const POSTAnimaisADD = (req,res) => {
    const {animal, especie, chip_id} = req.body;

bd.query (
    'SELECT * FROM animais WHERE animal=?, AND especie=?, AND chip_id=?',
    [animal, especie, chip_id],
    (err,result) => {
        if(err) {
            console.error('ERRO AO VERIFICAR animais', err);
            res.status(500).send('ERRO AO VERIFICAR animais');
            return;
        }
        if(res.length > 0) {
            res.status(409).send('Animal já cadastrado');
            return;
        }

    bd.query(
        'INSERT INTO animais (animal,especie,chip_id) VALUES (?, ?, ?)',
    [ animal, especie, chip_id],
    (err,res)=> {
    
        if (err) {
            console.error('ERRO AO ADICIONAR animais', err);
            res.status(500).send('ERRO AO ADICIONAR animais');
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
    const {animal, especie, chip_id} = req.body;
    bd.query(
        'UPDATE animais SET animal = ?, especie = ?, chip_id = ? WHERE = id',
[animal,especie,chip_id],
(err,res) => {
    if(err) {
        console.error('ERRO AO ATUALIZAR animais', err);
        res.status(500).send('ERRO AO ATUALIZAR animais');
        return;
    }
if(res.effectedRows===0){
    res.status(404).send('animal não encontrado');
    return;
}
res.send('animal atualizado com sucesso')
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
        (err,res) => {
            if(err) {
                console.error('ERRO AO ATUALIZAR animais', err);
                res.status(500).send('ERRO AO ATUALIZAR animais');
                return;
        }
        if(res.affectedRows===0) {
            res.status(404).send('animal NÃO ENCONTRADO');
            return;
        }
        res.send('animal ATUALIZADO COM SUCESSO');
        } 
    );
};


const DELETEAnimais = (req,res) => {
    const {id} = req.params;
    bd.query( 'DELETE FROM animais WHERE ID = ?', [id],
        (err,res) => {
            if(err) {
                console.error('ERRO AO DELETAR animais', err);
                res.status(500).send('ERRO AO DELETAR animais');
                return;
            }
            if(res.affectedRows===0){
                res.status(404).send('animal não encontrado');
                return;
            }
            res.send('animal deletado com sucesso');
        }
    );
};
    module.exports = {
        GETAllAnimais,
        POSTAnimaisADD,
        UpdateAnimaisPUT,
        updateAnimaisPATCH,
        DELETEAnimais
    };
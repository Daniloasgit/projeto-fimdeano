const bd = require('../banco/dados');

const getAllAnimais = (req,res) =>{
    bd.query('SELECT * FROM animais',(err,res)=>{
        if (err) {
            console.error('ERRO AO OBTER animais', err);

            res.status(500).send('ERRO AO OBTER animais');
            return;
        }
        res.josn(res);
    })

}
    module.exports = {
        getAllAnimais
    };
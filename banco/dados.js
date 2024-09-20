const mysql = require('mysql2')


const bd = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME

});

bd.connect((err)=>{
    if (err) {
        console.error('erro ao se conectar ao banco de dados', err);
        return;
    }
    console.log('conectando ao banco de dados MYSQL');
});

module.exports = bd;
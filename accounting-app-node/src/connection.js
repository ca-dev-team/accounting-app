const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'prueba',
    port: '3306'
})

connection.connect((err) =>{
        if (err){
            throw err
        }else{
            console.log('Conected MySql');
        }
})

module.exports = {
    connection
}
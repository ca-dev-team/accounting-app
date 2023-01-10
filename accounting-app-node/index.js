const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
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

var post  = {nombre: 'Isaac'};
var query = connection.query('INSERT INTO persona SET ?', post, function (error, results, fields) {
if (error) throw error;
});
console.log(query.sql); 
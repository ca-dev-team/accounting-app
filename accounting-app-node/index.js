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

// var post  = {idPersona: 2, nombre: 'Hello from node', edad: 50};
// var query = connection.query('INSERT INTO persona SET ?', post, function (error, results, fields) {
// if (error) throw error;
// });
// console.log(query.sql); 
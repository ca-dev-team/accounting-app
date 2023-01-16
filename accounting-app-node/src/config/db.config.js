const Sequelize =  require("sequelize");

const UserModel = require('../models/usuario.js');

const sequelize = new Sequelize('accounting_app', 'root', 'root', {
    HOST: 'localhost',
    dialect: 'mysql'
});

const User = UserModel(sequelize, Sequelize);

sequelize.sync({ force: false})
    .then(()=>{
        console.log("tablas sincronizadas");
    })

module.exports = {
    User
}


// module.exports = {
//     HOST: "localhost",
//     USER: "root",
//     PASSWORD: "12345678",
//     DB: "testdb",
//     dialect: "mysql", 
//     pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//     }
// };
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
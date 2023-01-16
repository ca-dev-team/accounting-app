module.exports = (sequelize, type ) =>{
    return sequelize.define('usuario', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user: type.STRING,
        rol: type.INTEGER,
        password: type.STRING,

    });
}
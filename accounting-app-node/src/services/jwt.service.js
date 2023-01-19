
//IMPORTS
const moment = require("moment");
const jwt = require("jwt-simple");

exports.createToken = (user) =>{
    const payload = {
        usuarioId: user.id,
        usuario: user.user,
        rol: user.rol,
        iat: moment().unix(),
        exp: moment().day(10, 'days').unix()
    }
    return jwt.encode(payload, process.env.SECRET_PASSWORD);
}

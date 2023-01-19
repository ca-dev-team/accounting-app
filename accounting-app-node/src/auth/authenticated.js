'use strict'

require("dotenv").config();
const jwt = require('jwt-simple');
const moment = require('moment');

exports.ensureAuth = function (req, res, next){
    if(!req.headers.authorization) return res.status(401).send({ mensaje: 'La petición no tiene la cabecera de autorización' });
    
    var token = req.headers.authorization.replace(/['"']+/g,'');

    try{
        var payload = jwt.decode(token, process.env.SECRET_PASSWORD);

        if(payload.exp <= moment().unix()){
            return res.status(401).send({ 
                mensaje: 'El token ha expirado'
            });
        }
    }catch(error){
        return res.status(404).send({ 
            mensaje: 'El token no es válido' 
        });
    }

    req.user = payload;
    next();
}
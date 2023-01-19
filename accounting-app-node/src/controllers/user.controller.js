'use strict'

const { User } = require('../config/db.config');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const jwt = require("../services/jwt.service");

async function userRegister (req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });  
    } 

    const userExists = await User.findOne({ where: {user: req.body.user} });
    if (userExists) return res.status(500).json({ message: `El usuario '${req.body.user}' ya está en uso. Ingrese uno diferente` });

    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const user = await User.create(req.body);
    res.json(user);
}

async function login (req, res){
    const user = await User.findOne({ where: { user: req.body.user} });
    if (user){
        bcrypt.compare(req.body.password, user.password, (err, areEquals) => {
            if (areEquals) {
                return res.status(200).send({ message: "Usuario logueado correctamente", token: jwt.createToken(user)});
            }else{
                return res.status(500).send({ message: "Usuario y/o contraseña incorrecta" });
            }
        })
    }else{
        return res.status(500).send({ message: `El usuario '${req.body.user}' no existe en el sistema.` });
    }
}

async function update (req, res){
    await User.update(req.body, {
        where: { id: req.params.idUser }
    });
    res.json({ message: `Se ha modificado el usuario ${ req.params.idUser}` });
}

async function deleteUser (req,res){
    await User.destroy({
        where: { id: req.params.idUser }
    });
    res.json({ message: `Se ha eliminado el usuario ${ req.params.idUser}` });
}

module.exports = {
    userRegister,
    login,
    update,
    deleteUser
}
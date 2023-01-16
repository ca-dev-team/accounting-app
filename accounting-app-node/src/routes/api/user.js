require("dotenv").config();
const router = require('express').Router();
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const moment = require("moment");
const jwt = require("jwt-simple");
const authenticated = require("../../middlewares/authenticated");

const { User } = require('../../config/db.config');

router.get('/', authenticated.ensureAuth, async (req, res)=> {
    const users = await User.findAll();
    res.json(users);
});

router.post('/',[
    check("user", 'Please enter a username').not().isEmpty(), 
    check("rol", 'Please select a rol').not().isEmpty(),
    check("password", 'You need a password to login, idiot!').not().isEmpty()
],async (req, res)=> {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });  
    } 

    const userExists = await User.findOne({ where: {user: req.body.user} });
    if (userExists) return res.status(500).json({ message: `El usuario "${req.body.user}" ya está en uso. Ingrese uno diferente` });

    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const user = await User.create(req.body);
    res.json(user);
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({ where: { user: req.body.user} });
    if (user){
        bcrypt.compare(req.body.password, user.password, (err, areEquals) => {
            if (areEquals) {
                return res.status(200).send({ message: "Usuario logueado correctamente", token: createToken(user)});
            }else{
                return res.status(500).send({ message: "Usuario y/o contraseña incorrecta" });
            }
        })
    }else{
        return res.status(500).send({ message: `El usuario ${res.body.user} no existe en el sistema.` });
    }
});

const createToken = (user) =>{
    const payload = {
        usuarioId: user.id,
        usuario: user.user,
        rol: user.rol,
        iat: moment().unix(),
        exp: moment().day(10, 'days').unix()
    }
    
    return jwt.encode(payload, process.env.SECRET_PASSWORD);
}

router.put('/:idUser', authenticated.ensureAuth, async (req, res)=> {
    await User.update(req.body, {
        where: { id: req.params.idUser }
    });
    res.json({ message: `Se ha modificado el usuario ${ req.params.idUser}` });
});

router.delete('/:idUser', authenticated.ensureAuth, async (req, res)=> {
    await User.destroy({
        where: { id: req.params.idUser }
    });
    res.json({ message: `Se ha eliminado el usuario ${ req.params.idUser}` });
});

module.exports = router;
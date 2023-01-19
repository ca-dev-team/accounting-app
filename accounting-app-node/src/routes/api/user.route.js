require("dotenv").config();
const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const authenticated = require("../../auth/authenticated");
const userController = require('../../controllers/user.controller');

const { User } = require('../../config/db.config');

router.get('/', authenticated.ensureAuth, async (req, res)=> {
    const users = await User.findAll();
    res.json(users);
});

router.post('/register',[
    check("user", 'Please enter a username').not().isEmpty(), 
    check("rol", 'Please select a rol').not().isEmpty(),
    check("password", 'You need a password to login, idiot!').not().isEmpty()
], userController.userRegister);

router.post('/login', userController.login);

router.put('/:idUser', authenticated.ensureAuth, userController.update);

router.delete('/:idUser', authenticated.ensureAuth, userController.deleteUser);

module.exports = router;
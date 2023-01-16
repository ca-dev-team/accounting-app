const router = require('express').Router();

const apiUserRouter = require('./api/user');
const authenticated = require("../middlewares/authenticated");

router.use('/user', apiUserRouter);

module.exports = router;
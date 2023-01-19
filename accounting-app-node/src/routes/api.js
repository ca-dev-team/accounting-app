const router = require('express').Router();

const apiUserRouter = require('./api/user.route');
const authenticated = require("../auth/authenticated");

router.use('/user', apiUserRouter);

module.exports = router;
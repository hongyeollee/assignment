const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const patientRouter = require('./patientRouter');

router.use('/api/v1/user', userRouter.router);
router.use('/api/v1', patientRouter.router);

module.exports = router;

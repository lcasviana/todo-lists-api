const express = require('express');
const router = express.Router();

const accountController = require('../controllers/account.controller');

router.post('/sign-in', accountController.signin);
router.post('/sign-up', accountController.signup);
router.put('/:email', accountController.put);

module.exports = router;
const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.get('/:email', userController.get);
router.post('/:email', userController.post);
router.put('/:email', userController.put);

module.exports = router;
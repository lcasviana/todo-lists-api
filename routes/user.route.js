const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.get('/:email', userController.get);
router.post('/:email', userController.post);
router.patch('/:email', userController.patch);

module.exports = router;
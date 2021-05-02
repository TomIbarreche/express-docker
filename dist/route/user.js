'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const Validator = require('../middleware/validate-request-schema');
const Schema = require('../schema/user-schema');

router.post('/', Schema.validationBodyRules, Validator.checkRules, userController.createUser);

router.put('/:id', Schema.validationBodyRules, Validator.checkRules, userController.updateUser);

router.get('/', userController.getAllUsers), router.get('/:id', userController.getUserById);

router.delete('/:id', userController.deleteUserById);

module.exports = router;
//# sourceMappingURL=user.js.map
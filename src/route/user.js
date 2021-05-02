const express =  require('express');
const router = express.Router();
const userController = require('../controllers/user');
const Validator = require('../middleware/validate-request-schema');
const Schema = require('../schema/user-schema');
const protect = require('../middleware/authMiddleware');

router.post(
    '/signUp',
    Schema.signUpValidation,
    Validator.checkRules,
    userController.signUp
);

router.post(
    '/postTest',
    protect,
    userController.createPost
)

router.post(
    '/signIn',
    Schema.signInValidation,
    Validator.checkRules,
    userController.signIn
)

router.put(
    '/:id',
    userController.updateUser
)

router.get(
    '/',
    userController.getAllUsers
),

router.get(
    '/:id',
    userController.getUserById
)

router.delete(
    '/:id',
    userController.deleteUserById
)

module.exports=router;
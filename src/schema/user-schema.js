const { body}  = require('express-validator');

const signUpValidation = [
    body('email').isEmail().withMessage('email must contain a valid email adress'),
    body('first_name').exists({checkFalsy: true}).withMessage('name is required'),
    body('age').exists({checkFalsy: true}).withMessage('age should be mentionned'),
    body('password').exists({checkFalsy: true}).withMessage('password should exist')
]

const signInValidation = [
    body('email').exists({checkFalsy: true}).withMessage('email is required'),
    body('password').exists({checkFalsy: true}).withMessage('password is required')
]
module.exports = { signUpValidation: signUpValidation, signInValidation: signInValidation};
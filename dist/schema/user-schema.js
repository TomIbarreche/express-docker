'use strict';

const { body } = require('express-validator');

const validationBodyRules = [body('email').isEmail().withMessage('email must contain a valid email adress'), body('firstName').exists({ checkFalsy: true }).withMessage('name is required'), body('age').exists().withMessage('age should be mentionned')];

module.exports = { validationBodyRules: validationBodyRules };
//# sourceMappingURL=user-schema.js.map
const ApiError = require('../error/ApiError');
const { json } = require('express');
const authDAO = require('../dao/auth');
const userDAO = require('../dao/user');

const bcrypt = require('bcryptjs');

class AuthController {
    async signUp(req, res, next) {
        try {
            const {first_name, email, age, password} = req.body;
            const hashPassword = await bcrypt.hash(password, 12);
            const newUser = await authDAO.signUp(first_name, email,age, hashPassword);
            req.session.user = newUser;
            res.status(201).json(newUser);
        } catch(err) {
            console.log(err);
            next(ApiError.internalServerError("Oups! Something went wrong"));
        }
    }

    async signIn(req, res, next) {
        const {email, password} = req.body;
        try {
            const user = await userDAO.getUserByEmail(email);
            if (!user){
                next(ApiError.routeNotFound("Email incorrect"));
                return
            }
            const isCorrect = await bcrypt.compare(password, user.password);
            if(!isCorrect){
                next(ApiError.wrongLogin("Password incorrect"));
            }else{
                delete user.password;
                req.session.user = user;
                res.status(201).json(user);
            }
            
        } catch (error) {
            console.log(error);
            next(ApiError.internalServerError("Oups! Something went wrong"));
        }
    }
}

module.exports = new AuthController();
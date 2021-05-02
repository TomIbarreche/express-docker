const ApiError = require('../error/ApiError');
const { json } = require('express');
const userDAO = require('../dao/user');
const bcrypt = require('bcryptjs');

class UserController {
    async signUp(req, res, next) {
        try {
            const {firstName, email, age, password} = req.body;
            const hashPassword = await bcrypt.hash(password, 12);
            const newUser = await userDAO.signUp(firstName, email,age, hashPassword);
            req.session.user = newUser.user;
            res.status(201).json(newUser.user);
        } catch(err) {
            console.log(err);
            next(ApiError.internalServerError("Oups! Something went wrong"));
        }
    }

    async signIn(req, res, next) {
        const {firstName, password} = req.body;
        try {
            const user = await userDAO.getUserByName(firstName);
            console.log("after",user)
            if (!user){
                next(ApiError.routeNotFound("FirstName incorrect"));
                return
            }
            const isCorrect = await bcrypt.compare(password, user.password);
            if(!isCorrect){
                next(ApiError.wrongLogin("Password incorrect"));
            }else{
                console.log(req.session.user);
                req.session.user = user;
                res.status(201).json(user);
            }
            
        } catch (error) {
            console.log(error);
            next(ApiError.internalServerError("Oups! Something went wrong"));
        }
    }

    async createPost(req, res, next){
        try {
            const post = await userDAO.createPost();
            res.status(201).json(post);
        } catch (error) {
            console.log(error)
        }
    }

    async getAllUsers(req, res, next){
        try{
            const users = await userDAO.getAllUsers();
            res.status(201).json(users);
        }catch(err) {
            next(ApiError.internalServerError("Oups! Something went wrong"));
        }
    }

    async getUserById(req, res, next) {
        try{
            const userId = req.params.id
            const user = await userDAO.getUserById(userId);
            if (!user){
                next(ApiError.routeNotFound("Can't find this user"));
                return
            }
            res.status(201).json(user);
        }catch(err) {
            next(ApiError.internalServerError("Oups! Something went wrong"));
        }
    }

    async updateUser(req, res, next) {
        try{
            const userId = req.params.id;
            const updatedUser = await userDAO.updateUser(userId, req.body);
            if (!updatedUser[0]){
                next(ApiError.routeNotFound("Can't find this user"));
                return
            }
            res.status(201).json(updatedUser);
        }catch(err) {
            next(ApiError.internalServerError("Oups! Something went wrong"));
        }
    }

    async deleteUserById(req, res, next) {
        try{
            const userId = req.params.id;
            const deletedUser = await userDAO.deleteUserById(userId);
            if (!deletedUser){
                next(ApiError.routeNotFound("Can't find this user"));
                return
            }
            res.status(201).json(deletedUser);
        }catch(err){
            next(ApiError.internalServerError("Oups! Something went wrong"));
        }
    }
}

module.exports = new UserController();
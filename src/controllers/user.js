const ApiError = require('../error/ApiError');
const { json } = require('express');
const userDAO = require('../dao/user');
const bcrypt = require('bcryptjs');

class UserController {
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
            res.status(201).json(updatedUser[0]);
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
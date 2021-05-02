'use strict';

const ApiError = require('../error/ApiError');
const { json } = require('express');
const { reporters } = require('mocha');
const userDAO = require('../dao/user');

class UserController {
    async createUser(req, res, next) {
        try {
            const { firstName, email, age } = req.body;
            const id = await userDAO.createUser(firstName, email, age);
            res.status(201).json(id);
        } catch (err) {
            next(ApiError.internalServerError("Oups! Something went wrong"));
        }
    }

    async getAllUsers(req, res, next) {
        try {
            const users = await userDAO.getAllUsers();
            res.status(201).json(users);
        } catch (err) {
            console.log(err);
            res.status(500);
        }
    }

    async getUserById(req, res, next) {
        try {
            const userId = req.params.id;
            const user = await userDAO.getUserById(userId);
            if (!user) {
                next(ApiError.routeNotFound("Can't find this user"));
                return;
            }
            res.status(201).json(user);
        } catch (err) {
            next(ApiError.internalServerError("Oups! Something went wrong"));
        }
    }

    async updateUser(req, res, next) {
        try {
            const userId = req.params.id;
            const updatedUser = await userDAO.updateUser(userId, req.body);
            if (!updatedUser[0]) {
                next(ApiError.routeNotFound("Can't find this user"));
                return;
            }
            res.status(201).json(updatedUser);
        } catch (err) {
            next(ApiError.internalServerError("Oups! Something went wrong"));
        }
    }

    async deleteUserById(req, res, next) {
        try {
            const userId = req.params.id;
            const deletedUser = await userDAO.deleteUserById(userId);
            if (!deletedUser) {
                next(ApiError.routeNotFound("Can't find this user"));
                return;
            }
            res.status(201).json(deletedUser);
        } catch (err) {
            next(ApiError.internalServerError("Oups! Something went wrong"));
        }
    }
}

module.exports = new UserController();
//# sourceMappingURL=user.js.map
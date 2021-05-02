'use strict';

const config = require('../db/db');
class UserDao {
    async createUser(firstName, email, age) {
        try {
            const [user] = await config('users').insert({
                first_name: firstName,
                email: email,
                age: age
            }).returning(['id', 'first_name', 'email', 'age']);
            return { "user": user };
        } catch (err) {
            next(ApiError.internalServerError("Oups! Something went wrong"));
        }
    }
    async getAllUsers() {
        let users = [];
        return config('users').select('*').then(res => {
            res.forEach(element => {
                users.push(element);
            });
            return users;
        });
    }

    async getUserById(userId) {
        return config('users').where('id', userId).then(res => {
            return res[0];
        });
    }

    async updateUser(userId, body) {

        const userToUpdate = await config('users').where('id', userId).returning(['id', 'first_name', 'email', 'age']);
        for (const [key, value] of Object.entries(body)) {
            userToUpdate[key] = value;
        }
        return config('users').where('id', userId).update({
            first_name: userToUpdate.firstName,
            email: userToUpdate.email,
            age: userToUpdate.age
        }, ['id', 'first_name', 'email', 'age']);
    }

    async deleteUserById(userId) {
        const deletedUser = await config('users').where('id', userId).del(['id']);
        return deletedUser[0];
    }
}

module.exports = new UserDao();
//# sourceMappingURL=user.js.map
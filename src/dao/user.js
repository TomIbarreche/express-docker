const db =require('../db/db');
const ApiError = require('../error/ApiError');
class UserDao {

    async createPost() {
        const post = await db('posts').insert({
            id: 1
        }).returning(['id']);
        return post;
    }

    async getAllUsers() {
        let users= await db.column("id","first_name","email","age").select().from("users");
        return users;
    }

    async getUserById(userId) {
        let user = await db.column("id","first_name","email","age").select().from("users").where('id', userId);
        return user[0];
    }

    async getUserByEmail(email){
        let user = await db.column("id","first_name","email","age","password").select().from("users").where('email', email);
        return user[0];
    }

    async updateUser(userId, body) {
        const userToUpdate = await db.column("id","first_name","email","age").select().from('users').where('id', userId);
        if (userToUpdate.length == 0){
            throw ApiError.routeNotFound(`Can't find this user`);
        }
        for (const [key, value] of Object.entries(body)){
            if((key in userToUpdate[0])){
                if(value == ""){
                    throw ApiError.badRequest(`${key} can't be empty`);
                }
                userToUpdate[key] = value;
            }else{
               throw ApiError.badRequest(`${key} is not a valid field`);
            }
        }
        return db('users').where('id', userId).update({
            first_name: userToUpdate.first_name,
            email: userToUpdate.email,
            age: userToUpdate.age,
        }, ['id', 'first_name', 'email', 'age'])
    }

    async deleteUserById(userId) {
        const deletedUser = await db('users').where('id', userId).del(['id']);
        return deletedUser[0]; 
    }
}

module.exports = new UserDao();
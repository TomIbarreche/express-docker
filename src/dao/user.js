const db =require('../db/db');
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
        let user = db.column("id","first_name","email","age").select().from("users").where('id', userId);
        return user;
    }

    async getUserByEmail(email){
        let user = await db.column("id","first_name","email","age","password").select().from("users").where('email', email);
        return user[0];
    }

    async updateUser(userId, body) {

        const userToUpdate = await db('users').where('id', userId).returning(['id', 'first_name','email', 'age', 'password']);
        for (const [key, value] of Object.entries(body)){
            userToUpdate[key] = value;
        }
        return db('users').where('id', userId).update({
            first_name: userToUpdate.firstName,
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
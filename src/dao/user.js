const db =require('../db/db');
class UserDao {
    async signUp(firstName, email, age, password) {
        try {
            const [user] = await db('users').insert({
                first_name: firstName,
                email: email,
                age: age,
                password: password
            }).returning(['id', 'first_name','email', 'age']);
            return {"user": user};
        } catch (err) {
            console.log(err);
            next(ApiError.internalServerError("Oups! Something went wrong"));
        }
        
    }

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

    async getUserByName(firstName){
        return db('users').where('first_name', firstName)
        .then((res) => {
            return res[0]
        })
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
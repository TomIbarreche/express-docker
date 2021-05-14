const db =require('../db/db');
class AuthDAO {
    async signUp(first_name, email, age, password) {
       
        const user = await db('users').insert({
            first_name: first_name,
            email: email,
            age: age,
            password: password
        }).returning(['id', 'first_name','email', 'age']);
        return user;
        
    }
}

module.exports = new AuthDAO();
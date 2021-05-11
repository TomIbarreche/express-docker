const db =require('../db/db');
class AuthDAO {
    async signUp(firstName, email, age, password) {
       
        const user = await db('users').insert({
            first_name: firstName,
            email: email,
            age: age,
            password: password
        }).returning(['id', 'first_name','email', 'age']);
        return user;
        
    }
}

module.exports = new AuthDAO();
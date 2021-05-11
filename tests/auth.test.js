const server = require('../index');
const request = require('supertest');
const {expect} = require('chai');
const knex = require('../src/db/db');

let insertedUser;
describe('Test for authentification',()=>{
    before((done) => {
        knex('users').del().then(() => {
            done();
        })
    });

    after((done) => {
        knex('users').del().then(() => {
            done();
        })
    })

    describe('Successfull signUp', () => {
        it("should sign up a new user", async() => {
            let user = {
                firstName: "Bob",
                email: "bob@bob.fr",
                age: 25,
                password: "Bob"
            };
            insertedUser=  await request(server.app).post('/api/v1/signUp/').send(user);
            expect(insertedUser.status).to.equal(201);
            expect(insertedUser.body).to.be.an.instanceof(Array);
            expect(insertedUser.body.length).to.equal(1);
            expect(insertedUser.body[0].first_name).to.equal(user.firstName);
            expect(insertedUser.body[0].email).to.equal(user.email);
            expect(insertedUser.body[0].age).to.equal(user.age);
        })

        it("should hash the user's password", async () => {
            let user = await knex('users').where('first_name', "Bob");
            expect(user[0].password).to.not.equal(insertedUser.password);
        })
    })

    describe('Successfull signIn', () => {
        it("should be a successfull sign in", async() => {
            let user = {
                email: "bob@bob.fr",
                password: "Bob"
            };
            let signInUser = await request(server.app).post('/api/v1/signIn/').send(user);
            expect(signInUser.status).to.equal(201);
        })
    })

    describe('Failed SignUp', ()=> {
        it('should failed cause user email already exists', async() => {
            let user = {
                firstName: "Tom",
                email: "bob@bob.fr",
                age: 25,
                password: "Tom"
            };
            const response = await request(server.app).post('/api/v1/signUp/').send(user);
            expect(response.status).to.equal(500);
            expect(response.text).to.equal('"Oups! Something went wrong"');
        })

        it('should fail due to a malform request', async() => {
            let user = {
                firstName: "",
                email: "bob@bob.fr",
                age: 25,
                password: "Tom"
            };
            const response = await request(server.app).post('/api/v1/signUp/').send(user);
            expect(response.status).to.equal(400);
            expect(response.text).to.equal('"name is required"');
        })
    })

    describe('Failed SignIn', () => {
        it('should fail due to a malform request even if good credentials', async()=> {
            let user = {
                emai: "bob@bob.fr",
                password: "Bob"
            };
            const response = await request(server.app).post('/api/v1/signIn/').send(user);
            expect(response.status).to.equal(400);
            expect(response.text).to.equal('"email is required"');
        })

        it('should fail due to bad credentials', async()=> {
            let user = {
                email: "bob@bob.fr",
                password: "Bobob"
            };
            const response = await request(server.app).post('/api/v1/signIn/').send(user);
            expect(response.status).to.equal(401);
            expect(response.text).to.equal('"Password incorrect"');
        })

        it('should fail cause bad email', async()=> {
            let user = {
                email: "bob@bad.fr",
                password: "Bobob"
            };
            const response = await request(server.app).post('/api/v1/signIn/').send(user);
            expect(response.status).to.equal(404);
            expect(response.text).to.equal('"Email incorrect"');
        })
    })
})
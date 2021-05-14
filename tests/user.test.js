const server = require('../index');
const request = require('supertest');
const {expect} = require('chai');
const knex = require('../src/db/db');

let insertedUserTwo;
describe('Test for user API',()=>{
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
    
    describe('Success action',()=>{
        it("Retrieve 0 user but it's ok",async()=>{
            const response= await request(server.app).get('/api/v1/users/');
            expect(response.status).to.equal(201)
            expect(response.body).to.be.an.instanceof(Array);
            expect(response.body.length).to.equal(0);
        })

        it("Retrieve two users", async() => {
            let userOne = {
                first_name: "Bob",
                email: "bob@bob.fr",
                age: 25,
                password: "Bob"
            };
            let userTwo = {
                first_name: "Max",
                email: "max@max.fr",
                age: 25,
                password: "Max"
            };
            let insertedUserOne =  await request(server.app).post('/api/v1/signUp/').send(userOne);
            insertedUserTwo =  await request(server.app).post('/api/v1/signUp/').send(userTwo);
            const response= await request(server.app).get('/api/v1/users/');
            expect(response.status).to.equal(201)
            expect(response.body).to.be.an.instanceof(Array);
            expect(response.body.length).to.equal(2);
        })

        it('should get a user by his Id', async() => {
            let response =  await request(server.app).get(`/api/v1/users/${insertedUserTwo.body[0].id}`);
            expect(response.status).to.equal(201)
            expect(response.body.email).to.equal(insertedUserTwo.body[0].email);
        })

        it('should update the chosen user', async() => {
            let userToUpdate = {
                first_name: "Maxime"
            };
            let response = await request(server.app).put(`/api/v1/users/${insertedUserTwo.body[0].id}`).send(userToUpdate);
            expect(response.status).to.equal(201);
            expect(response.body.first_name).to.equal(userToUpdate.first_name);
        })

        it('should delete the chosen user', async() => {
            let response = await request(server.app).delete(`/api/v1/users/${insertedUserTwo.body[0].id}`);
            expect(response.status).to.equal(201);
            const userList= await request(server.app).get('/api/v1/users/');
            expect(userList.body.length).to.equal(1);
        })
    })

    describe('Failed action', ()=> {
        it('')
    })
    
})
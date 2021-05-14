const server = require('../index');
const request = require('supertest');
const {expect} = require('chai');
const knex = require('../src/db/db');

let insertedUserTwo, insertedUserOne;
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
        it("shoumd GET 0 user but it's ok",async()=>{
            const response= await request(server.app).get('/api/v1/users/');
            expect(response.status).to.equal(201)
            expect(response.body).to.be.an.instanceof(Array);
            expect(response.body.length).to.equal(0);
        })

        it("should GET two users", async() => {
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
            insertedUserOne =  await request(server.app).post('/api/v1/signUp/').send(userOne);
            insertedUserTwo =  await request(server.app).post('/api/v1/signUp/').send(userTwo);
            const response= await request(server.app).get('/api/v1/users/');
            expect(response.status).to.equal(201)
            expect(response.body).to.be.an.instanceof(Array);
            expect(response.body.length).to.equal(2);
        })

        it('should GET a user by his Id', async() => {
            let response =  await request(server.app).get(`/api/v1/users/${insertedUserTwo.body[0].id}`);
            expect(response.status).to.equal(201)
            expect(response.body.email).to.equal(insertedUserTwo.body[0].email);
        })

        it('should UPDATE the chosen user', async() => {
            let userToUpdate = {
                first_name: "Maxime"
            };
            let response = await request(server.app).put(`/api/v1/users/${insertedUserTwo.body[0].id}`).send(userToUpdate);
            expect(response.status).to.equal(201);
            expect(response.body.first_name).to.equal(userToUpdate.first_name);
        })

        it('should DELETE the chosen user', async() => {
            let response = await request(server.app).delete(`/api/v1/users/${insertedUserTwo.body[0].id}`);
            expect(response.status).to.equal(201);
            const userList= await request(server.app).get('/api/v1/users/');
            expect(userList.body.length).to.equal(1);
        })
    })

    describe('Failed action', ()=> {
        it('should failed to GET user by id cause there is no user user with this ID', async() => {
            let response =  await request(server.app).get(`/api/v1/users/440`);
            expect(response.status).to.equal(404);
            expect(response.text).to.equal('"Can\'t find this user"');
        })

        it('should failed to GET user by id cause the Id is not in the correct form', async() => {
            let response =  await request(server.app).get(`/api/v1/users/wrongTypeId`);
            expect(response.status).to.equal(500);
            expect(response.text).to.equal('"Oups! Something went wrong"');
        })

        it('should failed to UPDATE a user cause there the request is wrong', async() => {
            let userToUpdate = {
                first_nname: "de"
            };
            let response = await request(server.app).put(`/api/v1/users/${insertedUserOne.body[0].id}`).send(userToUpdate);
            expect(response.status).to.equal(400);
            expect(response.text).to.equal('"first_nname is not a valid field"');
        })

        it('should failed to UPDATE a user cause not nullable field is missing', async() => {
            let userToUpdate = {
                first_name: "de",
                email: ""
            };
            let response = await request(server.app).put(`/api/v1/users/${insertedUserOne.body[0].id}`).send(userToUpdate);
            expect(response.status).to.equal(400);
            expect(response.text).to.equal('"email can\'t be empty"');
        })

        it('should failed to UPDATE cause there is no user with this Id', async() => {
            let userToUpdate = {
                first_name: "de",
                email: "yolo"
            };
            let response = await request(server.app).put(`/api/v1/users/100000000`).send(userToUpdate);
            expect(response.status).to.equal(404);
            expect(response.text).to.equal('"Can\'t find this user"');
        })

        it('should failed to UPDATE cause the Id is not in the correct form', async() => {
            let userToUpdate = {
                first_name: "de",
                email: "yolo"
            };
            let response = await request(server.app).put(`/api/v1/users/wrongIdType`).send(userToUpdate);
            expect(response.status).to.equal(500);
            expect(response.text).to.equal('"Oups! Something went wrong"');
        })

        it('should failed to DELETE cause there is no user with this Id', async() => {
            let response = await request(server.app).delete(`/api/v1/users/10000000`);
            expect(response.status).to.equal(404);
            expect(response.text).to.equal('"Can\'t find this user"');
        })

        it('should failed to DELETE cause the Id is not in the correct form', async() => {
            let response = await request(server.app).delete(`/api/v1/users/wrongTypeId`);
            expect(response.status).to.equal(500);
            expect(response.text).to.equal('"Oups! Something went wrong"');
        })
    })
    
})
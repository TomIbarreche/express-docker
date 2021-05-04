const server = require('../index');
const request = require('supertest');
const {expect} = require('chai');
const knex = require('../src/db/db');
const path = require('path');
const db =require('../src/db/db');


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
    
    it("Retrieve 0 user but it's ok",async()=>{
        const response= await request(server).get('/api/v1/users/');
        expect(response.status).to.equal(201)
        expect(response.body).to.be.an.instanceof(Array);
        expect(response.body.length).to.equal(0);
    })

    it("Post a new user and it's ok",async()=>{

        let user = {
            firstName: "Bob",
            email: "coin@coin.fr",
            age: 25,
            password: "Bob"
        };
        const response=  await request(server).post('/api/v1/users/signUp/').send(user);
        expect(response.status).to.equal(201)
        expect(response.body).to.be.an.instanceof(Object);
    })

    it('Should fail coz no password mentionned', async () => {

        let user = {
            firstName: "Bob",
            email: "coin@coin.fr",
            age: 25
        };
        const response = await request(server).post('/api/v1/users/signUp/').send(user);
        expect(response.status).to.equal(400);
        expect(response.text).to.equal('"password should exist"');
    })
})
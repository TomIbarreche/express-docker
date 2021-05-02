const server = require('../index');
const request = require('supertest');
const {expect} = require('chai');
const knex = require('../src/db/db');
const path = require('path');


const migrationConfig = {
    directory: path.join(__dirname, '../src/db/Testmigrations')
}

console.info('Running migrations in: ' + migrationConfig.directory);

describe('USER API TEST',()=>{
    console.log("UN")
    
        
        
        before((done) => {
            let user = {
                firstName: "Bob",
                email: "bob@bob.fr",
                age: 25
            };
            const response=  request(server).post('/users').send(user).then(()=> {
                done()
            });
          });

       after((done) => {
            knex('users').del().then(() => {
                done();
            })
        })
    
        it('GET users',async()=>{
            console.log("PREMIER TEST")
            const response= await request(server).get('/users');
            expect(response.status).to.equal(201)
            expect(response.body).to.be.an.instanceof(Array);
            expect(response.body.length).to.equal(1);
        })
        it('POST user',async()=>{
            console.log("2 TEST")
    
            let user = {
                firstName: "Bob",
                email: "coin@coin.fr",
                age: 25
            };
            const response=  await request(server).post('/users').send(user);
            expect(response.status).to.equal(201)
            expect(response.body).to.be.an.instanceof(Object);
        })
        it('Should fail',  () => {

            let user = {
                firstName: "Bob",
                email: "coin@coin.fr",
                age: 25
            };
            return request(server).post('/users').send(user).then((res) =>{
                expect(res.status).to.equal(500);
                expect(res.text).to.equal('"Oups! Something went wrong"');

            });
                
         
          
        })
})
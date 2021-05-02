const {expect} = require('chai');
const config = require('../src/config/config');
const server = require('../index');

describe('Server', ()=>{
    it('tests that server is running current port', async()=>{
        expect(server.port.toString()).to.equal(config.port)
    })
});
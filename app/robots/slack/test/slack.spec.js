const robot = require('../robot')(disconnect=true);
const expect = require('chai').expect;

describe('Slack tests', ()=> {
  before(() => {
    require('dotenv').config()
  })

  it('should send message', ()=>{
    expect(robot.sendMessage('ola')).to.be.undefined
  })

})
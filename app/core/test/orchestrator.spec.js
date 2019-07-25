const expect = require('chai').expect;
const schemas = [
  require('../../robots/slack/schema'),
  require('../../robots/spotfy/schema')
]
const orchestrator = require('../orchestrator')(schemas);

describe('Orchestrator Tests', () => {
  it('should return structure for command found', () => {
    const commandFound = orchestrator.findRobot('@zeus!! spotfy volume_percent 20');
    expect(commandFound)
      .to.have.property('regex')
      .to.be.equal('@zeus!! spotfy volume_percent 20')
    expect(commandFound)
      .to.have.property('triggers')
    expect(commandFound)
      .to.have.property('handler')
  })

  it('should return empty object for comand not found', () => {
    const commandFound = orchestrator.findRobot('asdasdasd');
    expect(commandFound)
      .to.be.eql({})
  })

  it('should hable command', () => {
    const commandFound = orchestrator.findRobot('@zeus!! spotfy volume_percent 20')
    const result = orchestrator.handleRobot(commandFound)
    expect(result).to.be.equal(true)
  })
})

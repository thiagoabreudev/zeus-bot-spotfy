const _ = require('lodash');
const EventEmitter = require('events');

class Orchestrator extends EventEmitter {
  constructor(schemas) {
    super();
    this.schemas = schemas;
    this.on('message', this.onMessage);
  }

  onMessage(data) {
    const commandFound = this.findRobot(data)
    if (!_.isEmpty(commandFound)) {
      console.log('[orchestrator request handler]')
      commandFound.handler()
    }
  }

  findRobot(commandRequested) {
    for (let schema of this.schemas) {
      for (let command of Object.keys(schema.structure)) {
        if ((schema.structure[command]).regex == commandRequested) {
          return schema.structure[command]
        }
      }
    }
    return {}
  }

  handleRobot(schemaToExecute) {
    return schemaToExecute.handler()
  }
}


module.exports = (schemas) => {
  return new Orchestrator(schemas)
}
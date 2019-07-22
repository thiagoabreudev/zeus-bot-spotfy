const EventEmitter = require('events');

class ExecutionMachine {
  constructor(robotsToLoad) {
    this.robotsToLoad = robotsToLoad;
    this.robots = {};
    this.engineEvent = new EventEmitter();
    this.startEngine();
    this.loadSchemas();
    this.startRobot();
  }

  loadSchemas() {
    for (let robot of this.robotsToLoad) {
      const robotObj = {}
      robotObj[robot] = {
        instance: require(`./${robot}/${robot}`)(this.engineEvent),
        schema: require(`./${robot}/${robot}-schema`),
      }
      Object.assign(this.robots, robotObj);
    }
  }

  startRobot() {
    for (let key of Object.keys(this.robots)) {
      this.robots[key].instance.start()
    }
  }

  extractRobot(message) {
    return message.split('!!')[1].trim().split(' ')[0]
  }

  extractCommand(message) {
    return message.split('!!')[1].trim().split(' ')[1]
  }

  extractParams(message) {
    return message.split('!!')[1].trim().split(' ')[1]
  }

  startEngine() {
    this.engineEvent.on('call-command', (message) => {
      console.log('[engine chamada] ', message)
      try {
        const robot = this.extractRobot(message);
        const param = this.extractParams(message)
        const schema = this.getSchema(robot, param)
        console.log(schema)
        this.handleRobot(robot, schema)
      } catch (error) {
        console.log('[ERROR]', error)
      }
    })
  }

  getSchema(robot, param) {
    return this.robots[robot].schema.structure[param]
  }

  handleRobot(robot, schema) {
    this.robots[robot].instance.handler({}, schema);
  }
}

module.exports = (robotsToLoad) => {
  return new ExecutionMachine(robotsToLoad);
}
const robot = require('./robot');
const schema = {
  name: 'slack',
  structure: {
    send_mensage_to_chanel: {
      regex: '@zeus!! slack send_mensage_to_chanel geral teste de mensagem',
      handler: robot.sendMessage,
      triggers: [
        'aumente o volume em'
      ]
    }
  }
}

module.exports = schema;
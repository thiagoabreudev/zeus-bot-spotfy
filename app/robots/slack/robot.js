const SlackBot = require('slackbots');
const enviroments = require('../../../config/enviroments');

class Robot {
  constructor(orchestrator, disconnect) {
    this.orchestrator = orchestrator;
    this.bot = new SlackBot({
      token: enviroments.SLACK_TOKEN,
      name: enviroments.SLACK_BOT_NAME,
      disconnect: disconnect,
    })

    this.onMessage();
    console.log('[slack] online...')
  }

  _isMessageForMe(message) {
    try {
      if (message) {
        return message.indexOf(`<@${this.bot.self.id}>` != -1)
      }
    } catch (error) {
      console.error(error)
    }
    return false;
  }

  sendMessage(message) {
    const params = { as_user: true, link_names: true }
    this.bot.postMessageToChannel('geral', message, params)
  }

  onMessage() {
    this.bot.on('message', (data) => {
      if (data.type == 'message' & this._isMessageForMe(data.text)) {
        this.orchestrator.emit('message', data.text)
      }
    })
  }

}

module.exports = (orchestrator, disconnect = false) => {
  return new Robot(orchestrator, disconnect)
}
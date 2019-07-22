const SlackBot = require('slackbots');
const enviroments = require('../../config/enviroments');

class Robot {
  constructor(engineEvent) {
    this.engineEvent = engineEvent;
    this.bot = new SlackBot({
      token: enviroments.SLACK_TOKEN,
      name: enviroments.SLACK_BOT_NAME
    })
  }

  start() {
    this.startSlackBot();
    this.startListningMessages();
  }

  startSlackBot() {
    this.bot.on('start', () => {
      this.bot.postMessageToChannel('geral', 'Estou online', { as_user: true })
    })
  }

  startListningMessages() {
    this.bot.on('message', async data => {
      if (data.type == 'message' & this.isMessageForMe(data.text)) {
        // const user = await this.bot.getUserById(data.user);
        this.engineEvent.emit('call-command', data.text)
      }
    })
  }

  isMessageForMe(message) {
    if (message) {
      return message.indexOf(`<@${this.bot.self.id}>` != -1)
    }
    return false;
  }

  sendMessage(message) {
    const params = { as_user: true, link_names: true }
    this.bot.postMessageToChannel('geral', message, params)
  }
}

module.exports = (engineEvent) => {
  return new Robot(engineEvent);
};
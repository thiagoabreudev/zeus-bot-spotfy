const SlackBot = require('slackbots');
const axios = require('axios');
const enviroments = require('./config/enviroments');

const bot = new SlackBot({
  token: enviroments.SLACK_TOKEN,
  name: enviroments.SLACK_BOT_NAME
})

bot.on('start', () => {
  postMessage('Olá, eu sou Zeus o bot fodão!');
})

bot.on('message', async data => {
  if (data.type == 'message' && data.text.indexOf(`<@${bot.self.id}>`) != -1) {
    const user = await bot.getUserById(data.user)
    postMessage(`Sim e você @${user.name}`)
  }
})


function postMessage(message) {
  const params = { as_user: true, link_names: true }
  bot.postMessageToChannel('geral', message, params)
}
require('dotenv').config();

module.exports = {
  API_HOST: process.env.API_HOST,
  SLACK_TOKEN: process.env.SLACK_TOKEN,
  SLACK_BOT_NAME: 'zeus',
  SPOTFY_CLIENT_ID: process.env.SPOTFY_CLIENT_ID,
  SPOTFY_CLIENT_SCRET: process.env.SPOTFY_CLIENT_SECRET,
  SPOTFY_REDIRECT_URI: process.env.SPOTFY_CLIENT_URI,
  SPOTFY_SCOPE: 'user-read-private user-read-email user-read-playback-state user-read-recently-played user-modify-playback-state'
}
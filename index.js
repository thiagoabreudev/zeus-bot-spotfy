require('dotenv').config()
const robotsToLoad = ['slack', 'spotfy']

async function start() {
  require('./robots/execution-machine')(robotsToLoad)
}

start();
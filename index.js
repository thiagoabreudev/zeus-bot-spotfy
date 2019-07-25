const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
app.use(cors())
  .use(cookieParser());

const schemas = [
  require('./app/robots/slack/schema'),
  require('./app/robots/spotfy/schema')
]
const start = (schemas) => {
  const orchestrator = require('./app/core/orchestrator')(schemas);
  return {
    slack: require('./app/robots/slack/robot')(orchestrator),
    spotfy: require('./app/robots/spotfy/robot')(orchestrator, app)
  }
}

start(schemas);
app.get('/', (req, resp) => {
  resp.json({
    zeus: 'online'
  })
})

app.listen(3000, () => {
  console.log('Zeus online...')
})
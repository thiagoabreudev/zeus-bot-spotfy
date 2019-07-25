const api = require('./api');
const schema = {
  name: 'spotfy',
  structure: {
    volume_percent: {
      regex: '@zeus!! spotfy volume_percent 20',
      handler: api.changeVolume,
      triggers: [
        'aumente o volume em'
      ]
    }
  }
}

module.exports = schema;
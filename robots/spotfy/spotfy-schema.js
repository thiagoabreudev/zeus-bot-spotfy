const schema = {
  name: 'spotfy',
  structure: {
    volume_percent :{
      url: 'https://api.spotify.com/v1/me/player/volume',
      method: 'PUT',
      query: {
        volume_percent: ''
      }
    }
  }
}

module.exports = schema;
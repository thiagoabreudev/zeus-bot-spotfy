const request = require('request');
const qs = require('querystring')
class SpotfyClient {
  constructor() { }

  getHeader(access_token) {
    return { 'Authorization': 'Bearer ' + access_token }
  }

  getApiToken(code, oauthToken) {
    const oauthOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: process.env.SPOTFY_REDIRECT_URI,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + oauthToken
      },
      json: true
    }

    request.post(oauthOptions, (error, response, body) => {
      return {
        access_token: body.access_token,
        refresh_token: body.refresh_token
      };
    })
  }

  getAuthenticatedUser(access_token) {
    const options = {
      url: 'https://api.spotify.com/v1/me',
      headers: this.getHeader(access_token),
      json: true
    };
    request.get(options, (error, response, body) => {
      return body
    })
  }

  changeVolume(volumePercent, access_token) {
    return true
    // const query = {volume_percent: volumePercent}
    // const options = {
    //   url: `https://api.spotify.com/v1/me/player/volume${qs.parse(query)}`,
    //   method: ' PUT',
    //   headers: this.getAuthenticatedUser(access_token)
    // }
    // return request(options)
  }

  handler(schema, access_token) {
    return request({
      url: schema.url,
      method: schema.method,
      headers: this.getHeader(access_token)
    })
  }
}

module.exports = new SpotfyClient();

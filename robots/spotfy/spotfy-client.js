const request = require('request');

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

  handler(schema, access_token) {
    return request({
      url: schema.url,
      method: schema.method,
      headers: this.getHeader(access_token)
    })
  }
}

module.exports = new SpotfyClient();

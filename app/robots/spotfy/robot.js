const querystring = require('querystring');
const api = require('./api');

class Robot {
  constructor(orchestrator, app) {
    this.orchestrator = orchestrator;
    this.app = app;
    this.stateKey = 'spotify_auth_state';
    this.access_token = null;
    this.refresh_token = null;
    app.get('/login', this.loginWithoauthSpotfy);
    app.get('/callback', this.callback);
    console.log('[spotfy] online...');
  }

  generateRandomString(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  getOauthToken() {
    return new Buffer.from(`${process.env.SPOTFY_CLIENT_ID}:${process.env.SPOTFY_CLIENT_SECRET}`)
      .toString('base64')
  }

  loginWithoauthSpotfy(req, res) {
    const state = this.generateRandomString(16);
    res.cookie(this.stateKey, state);
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: process.env.SPOTFY_CLIENT_ID,
        scope: process.env.SPOTFY_SCOPE,
        redirect_uri: process.env.SPOTFY_REDIRECT_URI,
        state: state
      })
    );
  }

  callback(req, res) {
    const code = req.query.code || null;
    const oauthToken = this.getOauthToken();
    res.clearCookie(this.stateKey);
    constApiToken = api.getApiToken(code, oauthToken);
    this.access_token = constApiToken.access_token;
    this.refresh_token = constApiToken.refresh_token;
    res.send('ok')
  }

  getUrlToAuthenticate() {
    return process.env.HOST + '/login'
  }

 // Todo: Terminar o handler

  handler(parentSchema, schema) {
    console.log(schema)
    console.log(api.handler(schema))
  }

  // handler(params) {
  //   if (!this.access_token) {
  //     return this.getUrlToAuthenticate();
  //   }

  //   const options4 = { url: 'https://api.spotify.com/v1/me/player/volume?' + params, headers: { 'Authorization': `Bearer ${this.access_token}` } }
  //   request.put(options4, (error, response, body) => {
  //     console.error(body)
  //   })
  // }
}

module.exports = (orchestrator, app) => {
  return new Robot(orchestrator, app);
};
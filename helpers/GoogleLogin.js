/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 * ./helpers/GoogleLogin.js
 */

const NodeGoogleLogin = require('node-google-login');

const config = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectURL: process.env.GOOGLE_CALLBACK_URL,
    defaultScope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
    ]
}

const googleLogin = new NodeGoogleLogin(config);

module.exports = googleLogin;

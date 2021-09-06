/**
 * GALHARDO APP | https://galhardoapp.com
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 *
 * ./helpers/URL.js
 */


const queryString = require('query-string');
const googleLogin = require('./GoogleLogin');
const facebookLogin = require('node-fb-login');



class URL {
    
    static getGitHubURL() {
        const params = queryString.stringify({
            client_id: process.env.GITHUB_CLIENT_ID,
            redirect_uri: process.env.GITHUB_CALLBACK_URL,
            scope: ['read:user', 'user:email'].join(' '),
            allow_signup: true,
        });

        return `https://github.com/login/oauth/authorize?${params}`;
    }

    static getGoogleURL() {
        const googleLoginURL = googleLogin.generateAuthUrl()
        return googleLoginURL
    }

    static async getFacebookURL () {
        try {
            const facebookLoginURL = await facebookLogin.generateAuthURL({
              fbAppID: process.env.FACEBOOK_CLIENT_ID,
              redirectURI: process.env.FACEBOOK_CALLBACK_URL,
              scopes:["public_profile", "email"]
            })
            return facebookLoginURL
        }
        catch(error){
            throw new Error(error)
        }
    }
};

module.exports = URL;

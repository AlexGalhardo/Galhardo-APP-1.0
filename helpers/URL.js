const queryString = require('query-string');
const googleLogin = require('./GoogleLogin');
const facebookLogin = require('node-fb-login');

class URL {
    
    static getGitHubURL() {
        const params = queryString.stringify({
            client_id: process.env.GITHUB_CLIENT_ID,
            redirect_uri: 'http://localhost:3000/github/callback',
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

            console.log(facebookLoginURL)
            return facebookLoginURL
        }
        catch(error){
            console.log(error)
        }
    }
};

module.exports = URL;
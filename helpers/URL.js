const queryString = require('query-string');

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
        const stringifiedParams = queryString.stringify({
            client_id: process.env.GOOGLE_CLIENT_ID,
            redirect_uri: 'http://localhost:3000/google/callback',
            scope: [
                'https://www.googleapis.com/auth/userinfo.email',
                'https://www.googleapis.com/auth/userinfo.profile',
            ].join(' '), // space seperated string
            response_type: 'code',
            access_type: 'offline',
            prompt: 'consent',
        });

        return `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
    }

    static getFacebookURL () {
        const stringifiedParams = queryString.stringify({
            client_id: process.env.FACEBOOK_CLIENT_ID,
            redirect_uri: process.env.FACEBOOK_CALLBACK_URL,
            scope: ['email', 'user_friends'].join(','),
            response_type: 'code',
            auth_type: 'rerequest',
            display: 'popup',
        });

        return `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;
    }
};

module.exports = URL;
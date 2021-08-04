const queryString = require('query-string');

const URL = {
    getGitHubURL: () => {
        const params = queryString.stringify({
            client_id: process.env.GITHUB_CLIENT_ID,
            redirect_uri: 'http://localhost:3000/github/callback',
            scope: ['read:user', 'user:email'].join(' '), // space seperated string
            allow_signup: true,
        });

        return GitHubLoginURL = `https://github.com/login/oauth/authorize?${params}`;
    },

    getGoogleURL: () => {
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

        return googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
    },

    getFacebookURL: () => {
        const stringifiedParams = queryString.stringify({
            client_id: process.env.FACEBOOK_CLIENT_ID,
            redirect_uri: process.env.FACEBOOK_CALLBACK_URL,
            scope: ['email', 'user_friends'].join(','), // comma seperated string
            response_type: 'code',
            auth_type: 'rerequest',
            display: 'popup',
        });

        return FacebookLoginURL = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;
    }
};

module.exports = URL;
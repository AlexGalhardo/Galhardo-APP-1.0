/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * ./server.js
 */


// GLOBALS
const path = require('path');
global.APP_ROOT_PATH = path.resolve(__dirname);
global.SESSION_USER = null;

// MONGODB
if(process.env.NODE_ENV === 'development') require('./config/mongodb')()


// START HTTP SERVER 
const app = require("./app");
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT}`)
});

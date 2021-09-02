/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * ./server.js
 */


// START HTTP SERVER 
const app = require("./app");

app.listen(process.env.PORT || 3000, (error) => {
    if(error) throw new Error(error)
    console.log(`GalhardoAPP running on port ${process.env.PORT}`)
});

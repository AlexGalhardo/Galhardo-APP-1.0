const fs = require('fs-extra')

const json_database = JSON.parse(fs.readFileSync('./database.json'));

module.exports = json_database

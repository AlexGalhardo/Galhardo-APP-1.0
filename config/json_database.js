const fs = require('fs-extra')

const json_database = JSON.parse(fs.readFileSync(process.env.JSON_DATABASE_FILE));

module.exports = json_database
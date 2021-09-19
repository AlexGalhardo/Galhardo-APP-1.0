import fs from 'fs-extra'

const json_database = JSON.parse(fs.readFileSync('./database.json'));

export default json_database

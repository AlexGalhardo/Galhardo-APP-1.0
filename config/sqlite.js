const sqlite = require('knex')({
  client: 'sqlite3',
  connection: () => ({
    filename: process.env.SQLITE_FILENAME
  })
});

module.exports = sqlite;
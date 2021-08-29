module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './galhardoapp.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
        directory: "./models/SQLITE/migrations"
    },
    seeds: {
        directory: "./models/SQLITE/seeds"
    }
  }
};

const mysql2 = require('mysql2');

const MySQL = mysql2.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    // waitForConnections: true,
    // connectionLimit: 10,
    // queueLimit: 0
});

module.exports = MySQL.promise();
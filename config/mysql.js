const mysql2 = require('mysql2');

try {
    if(process.env.APP_DATABASE === 'MYSQL'){
        const connection = mysql2.createPool({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USERNAME,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
        const MYSQL = connection.promise()
        module.exports = MYSQL
    }
}
catch(error){
    return console.log(`MYSQL CONNECTION ERROR: `, error)
}



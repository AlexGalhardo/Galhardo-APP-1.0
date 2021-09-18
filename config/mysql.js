const mysql2 = require('mysql2');

try {
    if(process.env.GALHARDO_APP_DATABASE === 'MYSQL'){
        const mysql = mysql2.createPool({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USERNAME,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        });
        module.exports = mysql.promise();
    }
}
catch(error){
    return console.log(`MYSQL CONNECTION ERROR: `, error)
}



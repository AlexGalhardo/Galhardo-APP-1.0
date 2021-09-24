import dotenv from 'dotenv'; dotenv.config()
import mysql2 from 'mysql2';

let mysql = null

try {
    if(process.env.APP_DATABASE === 'MYSQL'){
        mysql = mysql2.createPool({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USERNAME,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        });
    }
}
catch(error){
    throw new Error(error)
}

export default mysql.promise()




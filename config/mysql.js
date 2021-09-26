import dotenv from 'dotenv'; dotenv.config()
import mysql2 from 'mysql2';


let connection = null
try {
    if(process.env.APP_DATABASE === 'MYSQL'){
        connection = mysql2.createPool({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USERNAME,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }
}
catch(error){
    throw new Error(error)
}

let MYSQL = connection.promise()

export default MYSQL

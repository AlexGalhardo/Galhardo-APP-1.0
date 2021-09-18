const { Sequelize } = require('sequelize');

try {

    if(process.env.GALHARDO_APP_DATABASE === 'POSTGRES'){

        // FOR POSTGRE AS A SERVICE
        if(process.env.PG_URL) { const sequelize = new Sequelize(`${process.env.PG_URL}`) }

        // USING LOCAL / DOCKER
        else {
            const sequelize = new Sequelize(
                process.env.PG_DB,
                process.env.PG_USER,
                process.env.PG_PASSWORD,
                {
                    host: process.env.PG_HOST, // localhost OR DOCKER IPv4_ADDRESS HERE
                    dialect: 'postgres',
                    port: parseInt(process.env.PG_PORT)
                }
            );
        }
    }
}
catch(error){
    return console.log(`POSTGRES CONNECTION ERROR: `, error)
}


module.exports = sequelize;

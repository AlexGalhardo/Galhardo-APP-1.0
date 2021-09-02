const { connect } = require('mongoose');

const mongoConnect = async () => {
    try {
        await connect(process.env.MONGO_LOCALHOST_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`CONNECTED TO MONGODB URL: ${process.env.MONGO_LOCALHOST_URL}`)
    }
    catch(error){
        return console.log(`MONGODB Connection ${process.env.MONGO_LOCALHOST_URL} ERROR!`, error)
    }
}

module.exports = mongoConnect;

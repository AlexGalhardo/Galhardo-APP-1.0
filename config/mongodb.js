const { connect } = require('mongoose');

const mongoConnect = async () => {
  try {
    console.log('Connecting to MONGODB...')
    await connect(process.env.MONGO_LOCALHOST_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log(`CONNECTED TO MONGODB URL: ${process.env.MONGO_LOCALHOST_URL}`)
  }
  catch(error){
    console.log("MONGODB Connection ERROR!", error)
  }
}

module.exports = mongoConnect;
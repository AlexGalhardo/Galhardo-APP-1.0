const { connect } = require('mongoose');

const mongoConnect = async () => {
  try {
    console.log('connecting to mongodb...')
    await connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Connect to MONGODB Success!')
  }
  catch(error){
    console.log("MONGODB Connection ERROR!", error)
  }
}

module.exports = mongoConnect;
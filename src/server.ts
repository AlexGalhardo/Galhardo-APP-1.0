import app from './app.js'
// import dotenv from 'dotenv'; dotenv.config()

app.listen(process.env.PORT || 3333, (error) => {
  if (error) throw new Error(error)
  console.log(`GalhardoAPP TYPESCRIPT running on port ${process.env.PORT || 3333}`)
})

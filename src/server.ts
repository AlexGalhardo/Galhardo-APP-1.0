import express from 'express'
import '@controllers/UsersController'

const app = express()

app.get('/', (request, response) => {
  return response.json({ message: 'Galhardo APP TypeScript Version - In Development' })
})

app.listen(process.env.PORT || 3333, (error) => {
  if (error) throw new Error(error)
  console.log(`GalhardoAPP TYPESCRIPT running on port ${process.env.PORT || 3333}`)
})

import express from 'express'
import '@controllers/UsersController'

const app = express()

app.get('/', (request, response) => {
  return response.json({ message: 'Galhardo APP TypeScript Version - In Development' })
})

export default app
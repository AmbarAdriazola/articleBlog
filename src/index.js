require('dotenv').config()

const app = require('./app')

process.env.DATABASE_URL

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})

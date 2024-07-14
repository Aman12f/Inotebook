const connectToMongo = require('./db')
connectToMongo();

const express = require('express')
var cors = require('cors')
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())
// Available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
app.get('/aman', (req, res) => { 
  res.send('hello aman hope you are consistend until you get internship ')
})

app.listen(port, () => {
  console.log(`Inotebook Backend listening on port http://localhost:${port}`)
})
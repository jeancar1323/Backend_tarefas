const express = require('express')
const server = express()
server.use(express.json())
const TaskRoutes = require('./routes/TaskRouts')

server.get('/', (req,res) =>{
  res.send('Hello Word')
})

server.use('/', TaskRoutes)

server.listen(3000)
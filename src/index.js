const express = require('express')
const server = express()
server.use(express.json)


server.get('/teste', (req,res) =>{
  res.send('Hello Word')
})

server.listen(3000, _=>{
  console.log('entrou carai')
})
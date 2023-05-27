const express = require('express')
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')

const app = express()
// app.use(cors())
app.use(express.json())

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],  
        credentials: true,
    }
})

app.get('/',(req,res)=>res.send('Working'))

io.on('connection', (socket) => {
    socket.on('move', (msg) => {
      let rid = JSON.parse(msg).rid
      socket.to(rid).emit('move-log', msg);
    });
  });

io.on('connection',socket=>{
  socket.on('change',data=>{
    let rid = JSON.parse(data).rid
    socket.to(rid).emit('change-board',data)
  })
})

io.on('connection',socket=>{
  socket.on('joinRoom',(rid)=>{
    socket.join(rid)
  })
})

server.listen(3000)
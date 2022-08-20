const express = require('express')
const app = express()

const http = require('http')
const server = http.createServer(app)

const Server = require('socket.io')
 
const io = Server(server)

app.use(express.static(__dirname + "/../client"))

const playerController = require("../controls/playerController")


server.on("error",(err)=>{
    console.log(err)
})

server.listen(8000, ()=>{
    console.log("Server is running in port 8000")
})


setInterval(()=>{
    io.sockets.emit("game:data",playerController.getAllPlayers())
    playerController.frames()
},1000/20) 

io.on('connection', (socket)=>{
    
    console.log('A new connection',socket.id)
    
    
    socket.on("chat:features",(data)=>{
        io.sockets.emit("chat:features",data)
    })
    
    socket.on("player:create",(player)=>{
        playerController.addPlayer(player)
    })
    
    socket.on("player:update",(data)=>{
        playerController.update(data,socket.id)
    }) 
    socket.on("player:skill",(data)=>{
        playerController.skill(data,socket.id)
    })
    socket.on("disconnect",()=>{
        console.log("Se a desconectado")
        playerController.removePlayer(socket.id)
    })        
})


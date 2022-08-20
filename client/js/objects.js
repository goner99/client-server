class Player{
    constructor(config){
        this.id = ""
        this.user = ""
        this.message = ""
        this.x  = config.x
        this.y  = config.y//Math.floor(Math.random()*500)
        this.color = `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)} ,${Math.floor(Math.random()*256)})`
        this.direction
        this.width = 50
        this.height = 80
        this.xMap = 0
        this.yMap = 0
        this.speed = 3
    }
    render(ctx){
        ctx.restore()
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.fillRect(this.x,this.y,this.width,this.height)
        ctx.font = "bold 15px Hubballi"
        ctx.fillText(this.user,this.x,this.y-5)
        ctx.closePath()
        ctx.fill()
    }
    update(input,socket){
        if(input.right){
            this.direction = "walkRight"
            socket.emit("player:update",this.direction)
        }else if(input.left){
            this.direction = "walkLeft"
            socket.emit("player:update",this.direction)
        }
        if(input.up){
            this.direction = "walkUp"
            socket.emit("player:update",this.direction)

        }else if(input.down){
            this.direction = "walkDown"
            socket.emit("player:update",this.direction)

        }
    }
   
}


class InputHandler{
    constructor(){
        this.up = false
        this.down = false
        this.right = false
        this.left = false

        this.skill1 = false
        this.skill2 = false
        this.skill3 = false

        window.addEventListener("keydown",(e)=>{
            if(e.code === "KeyW")this.up = true
            if(e.code === "KeyS")this.down = true
            if(e.code === "KeyD")this.right = true
            if(e.code === "KeyA")this.left = true

            //skills
            if(e.code === "KeyJ")this.skill1 = true
            if(e.code === "KeyK")this.skill2 = true
            if(e.code === "KeyL")this.skill3 = true
        })
        window.addEventListener("keyup",(e)=>{
            if(e.code === "KeyW") this.up = false
            if(e.code === "KeyS") this.down = false
            if(e.code === "KeyD") this.right = false
            if(e.code === "KeyA") this.left = false
        })
    }
}

var renderPlayer = (ctx,worldMap,players)=>{
  
    ctx.restore()
    ctx.beginPath()
    ctx.fillStyle = players.color
    ctx.fillRect(worldMap.x+players.xMap,worldMap.y+players.yMap,players.width,players.height)
    ctx.font = "bolder 15px Hubballi"
    ctx.fillText(players.user,(worldMap.x+players.xMap),(worldMap.y+players.yMap-5))
    ctx.closePath()
    ctx.fill()
}

var updatePlayer = (input,player)=>{
    if(input.right){
        player.x -= 3
    }else if(input.left){
        player.x += 3
    }
    if(input.up){
        player.y += 3
    }else if(input.down){
        player.y -= 3
    }
}
class WorldMap{
    constructor(){
        this.x = 0,
        this.y = 0,
        this.width = 800
        this.height = 500
        //this.image = new Image()
        //this.image.src = "./assets/firstmap.png"
        
    }
    render(context){
        //context.drawImage(this.image,this.x,this.y,this.width,this.height)
        context.strokeRect(this.x,this.y,this.width,this.height)
        context.stroke() 
    }
    update(input, player,socket){
        //OBTENER X E Y EN MAP
        player.xMap = player.x-this.x
        player.yMap = player.y-this.y

        if(input.right){
            if(player.xMap +player.width > this.width){
                this.x -= 0
            }else{
                //Caninar
                this.x -= 3
                //Position in Map


            }
            socket.emit("player:map",{x:player.xMap,y:player.yMap})

        }else if(input.left){
            if(player.xMap <0){
                this.x -= 0
            }else{
                this.x += 3
        
            }
            socket.emit("player:map",{x:player.xMap,y:player.yMap})


        }
        if(input.up){
            
            if(player.yMap < 0){
                this.y -= 0
            }else{
                this.y += 3
        
            }
            socket.emit("player:map",{x:player.xMap,y:player.yMap})

            
        }else 
        
        if(input.down){
            if(player.yMap +player.height > this.height){
                this.y -= 0
            }else{
                this.y -= 3
            }
            socket.emit("player:map",{x:player.xMap,y:player.yMap})


        }

    }
}

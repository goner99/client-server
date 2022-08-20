class Player{
    constructor(){
        this.id = ""
        this.user = ""
        this.message = ""
        this.x  = Math.floor(Math.random()*500)
        this.y  = Math.floor(Math.random()*500)
        this.direction
        this.width = 50
        this.height = 80
        this.xMap = 0
        this.yMap = 0
        this.speed = 3
    }
    render(ctx){
        ctx.fillRect(this.x,this.y,this.width,this.height)
        ctx.font = "bold 15px Hubballi"
        ctx.fillText(this.user,this.x,this.y-5)
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

module.exports = {
    Player,
}
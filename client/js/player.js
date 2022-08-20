class Player{
    constructor(config){
        this.id = ""
        this.user = ""
        this.message = ""
        this.x  = config.x
        this.y  = config.y
        this.color = `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)} ,${Math.floor(Math.random()*256)})`
        this.direction
        this.width = 50
        this.height = 80
        this.xMap = 0
        this.yMap = 0
        this.speed = 3

      
        this.sprite = Sprites.Players.F_CHARACTER_3
        this.animation = "walkDown"
        this.indiceAnimation = 0
        this.velocityAnimation = 8

        this.skill_1 = new Skill({
            width:60,
            height:60,
            throwable:0
        })
     
        this.isAttacking = false
        this.auxAtt = 0
    }
    render(ctx){
        ctx.restore()
        ctx.beginPath()
        /* ctx.fillStyle = this.color
        ctx.fillRect(this.x,this.y,this.width,this.height) */ 
        ctx.drawImage(
            spriteCharacters,
            this.sprite[this.animation].animations[this.indiceAnimation].x,this.sprite[this.animation].animations[this.indiceAnimation].y,
            48,80,
            this.x,this.y,
            48,80)
        ctx.font = "bold 15px Hubballi"
        ctx.fillText(this.user,this.x,this.y-5)
        ctx.closePath()
        ctx.fill()

        if (this.isAttacking) {
            ctx.save()
            ctx.fillStyle = "red"
            ctx.fillRect(this.x, this.y,60,40)
            ctx.fill()
            ctx.restore()
        }
    }
    update(input,socket,gameFrame,ctx,worldMap,collision){
        //OBTENER X E Y EN MAP
        this.xMap = this.x-worldMap.x
        this.yMap = this.y-worldMap.y


        //------PLAYER WALK-------
        if(input.right){
            //---------ANIMATION---------
            this.animation = "walkRight"
            if(gameFrame%this.velocityAnimation == 0) {
                this.indiceAnimation++
                if(this.indiceAnimation>2) this.indiceAnimation=0
            }
            //---------WALK--------------
            if(this.xMap +this.width > worldMap.width || this.collision({...collision,position:{x:collision.position.x - 3 , y:collision.position.y}})){
                worldMap.x -= 0
            }else{
                worldMap.x -= 3
            }
            socket.emit("player:update",{
                xMap:this.xMap,
                yMap:this.yMap,
                indiceAnimation:this.indiceAnimation,
                animation:this.animation
            })
        }else if(input.left){
            //------ANIMATION---------
            this.animation = "walkLeft"
            if(gameFrame%this.velocityAnimation == 0) {
                this.indiceAnimation++
                if(this.indiceAnimation>2) this.indiceAnimation=0
            }
            //---------WALK--------------
            if(this.xMap <0 || this.collision({...collision,position:{x:collision.position.x + 3 , y:collision.position.y}})){
                worldMap.x += 0
            }else{
                worldMap.x += 3
            }
            socket.emit("player:update",{
                xMap:this.xMap,
                yMap:this.yMap,
                indiceAnimation:this.indiceAnimation,
                animation:this.animation
            })
        }
        if(input.up){
            //---------ANIMATION----------
            this.animation = "walkUp"
            if(gameFrame%this.velocityAnimation == 0) {
                this.indiceAnimation++
                if(this.indiceAnimation>2) this.indiceAnimation=0
            }
            //----------WALK--------------
            if(this.yMap < 0 || this.collision({...collision,position:{x:collision.position.x , y:collision.position.y + 3}})){
                worldMap.y += 0
            }else{
                worldMap.y += 3
            }
        
            socket.emit("player:update",{
                xMap:this.xMap,
                yMap:this.yMap,
                indiceAnimation:this.indiceAnimation,
                animation:this.animation
            })

        }else if(input.down){
            //---------ANIMATION------------
            this.animation = "walkDown"
            if(gameFrame%this.velocityAnimation == 0) {
                this.indiceAnimation++
                if(this.indiceAnimation>2) this.indiceAnimation=0
            }
            //----------WALK---------------
            if(this.yMap +this.height > worldMap.height || this.collision({...collision,position:{x:collision.position.x  , y:collision.position.y -3}})){
                worldMap.y -= 0
            }else{
                worldMap.y -= 3
            }
    
            socket.emit("player:update",{
                xMap:this.xMap,
                yMap:this.yMap,
                indiceAnimation:this.indiceAnimation,
                animation:this.animation
            })
        }

        if(input.attack){
            this.auxAtt++
            console.log(this.auxAtt)
            if(this.auxAtt == 1){
                this.isAttacking = true
                console.log("click")
                setTimeout(() => {
                    this.isAttacking = false
                    input.attack =false
                    this.auxAtt = 0
                }, 300);
            }
        }
        
        //------PLAYER  SKILLS----------
        if(input.skill_1){
          

            if(this.skill_1.direction.length < 1){
                this.skill_1.direction.push(this.animation)
            }
            if(this.skill_1.xMap.length < 1){
                this.skill_1.xMap.push(this.xMap)
                this.skill_1.x = this.skill_1.xMap[0]
                if(this.skill_1.direction[0] == "walkRight") this.skill_1.x += this.width
                if(this.skill_1.direction[0] == "walkLeft") this.skill_1.x -= this.width
            }
            if(this.skill_1.yMap.length < 1){
                this.skill_1.yMap.push(this.yMap)
                this.skill_1.y = this.skill_1.yMap[0]
                if(this.skill_1.direction[0] == "walkDown") this.skill_1.y += this.height
                if(this.skill_1.direction[0] == "walkUp") this.skill_1.y -= this.height
            }
            this.skill_1.update(input,gameFrame)
            this.skill_1.render(ctx,worldMap)

            socket.emit("player:skill",{
                isactive:this.skill_1.isactive,
                x:this.skill_1.x,
                y:this.skill_1.y,
                indice:this.skill_1.indice
            })
           
        }else{
            this.skill_1.xMap = []
            this.skill_1.yMap = []
            this.skill_1.direction = []
        }
    }
   
    collision(collision){
        return (this.xMap + this.width >= collision.position.x &&
                this.xMap < collision.position.x + collision.width &&
                this.yMap + this.height >= collision.position.y &&
                this.yMap < collision.position.y + collision.height)
                ?true
                :false
    }
   
}
;(function(){
    
    var socket = io()
    var canvas = document.getElementById("canvas")
    var ctx = canvas.getContext("2d")
    dimensions.init()
    canvas.width = dimensions.width
    canvas.height = dimensions.height
    /* window.onload = function(){ */

        var input = new InputHandler()
        var worldMap = new WorldMap()
        
        var myPlayer  = new Player({x:canvas.width/2,y:canvas.height/2})
        var othersPlayer = []
        var collisionsMap = []
        var boundaries = []
        var gameFrame = 0
        var lastRegister = 0
        var fps = 0

        
        /* USER */
        var userInterface = document.getElementById("user-interface")
        var btnUser = document.getElementById("btn-user")
        var user = document.getElementById("user")
        var character = document.getElementById("choose-character")
        var formUser = document.getElementById("form-user")
        var sprite = Sprites.Players.M_CHARACTER
        selectCharacter()
    
        /* CHAT */
        var chatContainer = document.getElementById("chat-container")
        var message = document.getElementById("message")
        var formChat = document.getElementById("form-chat")
        var btnChat = document.getElementById("btn-chat")
        var chatInput = document.getElementById("input")
        var chatMessage= document.getElementById("chat-message")
        btnUser.addEventListener("click",(e)=>{
            myPlayer.user = user.value
            myPlayer.sprite = sprite
            userInterface.style.display = "none"
            chatContainer.style.display = "block"
            
            socket.emit("player:create",myPlayer)
            gameLoop()
        })
        formUser.addEventListener("submit",(e)=>{
            e.preventDefault()
            myPlayer.user = user.value
            myPlayer.sprite = sprite
            userInterface.style.display = "none"
            chatContainer.style.display = "block"
            
            socket.emit("player:create",myPlayer)
            gameLoop()
        })
        formChat.addEventListener("submit",(e)=>{
            /*  if(message.value != ""){
                
            } */
            e.preventDefault()
            myPlayer.message = message.value
            socket.emit("chat:features",{user:myPlayer.user,message:myPlayer.message})
            message.value = ""
        })
        btnChat.addEventListener("click",(e)=>{
            /*  if(message.value != ""){
                
            } */
            e.preventDefault()
            myPlayer.message = message.value
             socket.emit("chat:features",{user:myPlayer.user,message:myPlayer.message})
             message.value = ""
            })
        socket.on("chat:features",(data)=>{
            console.log(socket)
            chatInput.innerHTML += `<p><strong>${data.user}</strong>: ${data.message}</p>`
            /*   var newChat = document.getElementById("input")
            console.log(newChat.scrollHeight)
            chatMessage.scrollTop = newChat.scrollHeight */
        })
    
            
        socket.on("connect",()=>{
            console.log("id: "+ socket.id)
            myPlayer.id = socket.id
        })
    
        socket.on("game:data",(data)=>{
            othersPlayer = []
            data.forEach(element => {
                if(myPlayer.id == element.id){
                    myPlayer.x = element.x,
                    myPlayer.y = element.y
                  
                }else{
                    othersPlayer.push(element);
                }
            });
            gameFrame++

        })

        var boundary = new Boundary({position:{x:400,y:400}})
       
        /* GAME LOOP */
        /* function gameLoop(tempRegister){
            
            ctx.clearRect(0,0,canvas.width,canvas.height)

            worldMap.render(ctx)
            
            boundary.render(ctx,worldMap)

            othersPlayer.forEach((player)=>{
                renderPlayer(ctx,worldMap,player)
                renderSkill(ctx,worldMap,player)
            })
            
            myPlayer.update(input,socket,gameFrame,ctx,worldMap,boundary)
            myPlayer.render(ctx)
    
            if(tempRegister - lastRegister > 999){
                lastRegister = tempRegister
                console.log("FPS : " + fps)
                fps = 0
            }
            fps++
          
            requestAnimationFrame(gameLoop)
        } */
        function gameLoop(){
            setInterval(()=>{
                ctx.clearRect(0,0,canvas.width,canvas.height)
    
                worldMap.render(ctx)
                
                boundary.render(ctx,worldMap)
    
                othersPlayer.forEach((player)=>{
                    renderPlayer(ctx,worldMap,player)
                    renderSkill(ctx,worldMap,player)
                })
                
                myPlayer.update(input,socket,gameFrame,ctx,worldMap,boundary)
                myPlayer.render(ctx)
            },1000/20)
        }
      
        var renderPlayer = (ctx,worldMap,player)=>{
            ctx.restore()
            ctx.beginPath()
            /* ctx.fillStyle = player.color
            ctx.fillRect(worldMap.x+player.xMap,worldMap.y+player.yMap,player.width,player.height) */
            ctx.drawImage(
                spriteCharacters,
                player.sprite[player.animation].animations[player.indiceAnimation].x,player.sprite[player.animation].animations[player.indiceAnimation].y,
                48,80,
                (worldMap.x + player.xMap),(worldMap.y + player.yMap),
                48,80)
            ctx.font = "bolder 15px Hubballi"
            ctx.fillText(player.user,(worldMap.x+player.xMap),(worldMap.y+player.yMap))
            ctx.closePath()
            ctx.fill()
        }
        var renderSkill = (ctx,worldMap,player)=>{
            if(player.skill_1.isactive){
                ctx.save()
                ctx.drawImage(
                    spriteSkills,
                    player.skill_1.skill[player.skill_1.indice].x,player.skill_1.skill[player.skill_1.indice].y,
                    32,32, 
                    worldMap.x+player.skill_1.x, worldMap.y+player.skill_1.y,
                    player.skill_1.width,player.skill_1.height
                )
                ctx.restore()
            }
        }
        function selectCharacter(){
            const position = [
                {x:-98,y:0,sprite:Sprites.Players.M_CHARACTER},
                {x:-384,y:0,sprite:Sprites.Players.F_CHARACTER},
                {x:-672,y:0,sprite:Sprites.Players.M_CHARACTER_1},
                {x:-960,y:0,sprite:Sprites.Players.F_CHARACTER_1},
                {x:-98,y:-640,sprite:Sprites.Players.M_CHARACTER_2},
                {x:-384,y:-640,sprite:Sprites.Players.F_CHARACTER_2},
                {x:-672,y:-640,sprite:Sprites.Players.M_CHARACTER_3},
                {x:-960,y:-640,sprite:Sprites.Players.F_CHARACTER_3},
            ]
            var indice = 0
            var btnLeft = document.getElementById("btn-left")
            var btnRigt = document.getElementById("btn-right")
            btnLeft.onclick = ()=>{
                if(indice != 0){
                    indice--
                }
                character.style.backgroundPosition = `${position[indice].x}px ${position[indice].y}px`
                sprite = position[indice].sprite       
    
            }
            btnRigt.onclick = ()=>{
                if(indice < position.length-1){
                    indice++
                }
                character.style.backgroundPosition = `${position[indice].x}px ${position[indice].y}px`
                sprite = position[indice].sprite       
            }
        }
        
        
}())
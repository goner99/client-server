/* const {Player} = require("./player") */

var  allPlayers = []
var frames = 0
module.exports = {
    addPlayer(player){
        if(!this.existingPlayer(player.id)){
            allPlayers.push({
                id:player.id,
                user:player.user,
                message:"",
                width:player.width,
                height:player.height,
                color:player.color,
                x:player.x,
                y:player.y,
                speed:3,
                xMap:0,
                yMap:0,
                indiceAnimation:0,
                animation:"walkDown",
                sprite:player.sprite,
                skill_1:player.skill_1,
               
            })
        }
    },
    update(data,id){
        let player = this.getPLayer(id)
        player.xMap = data.xMap
        player.yMap = data.yMap
        player.indiceAnimation = data.indiceAnimation
        player.animation = data.animation

       
    },
    skill(data,id){
        let player = this.getPLayer(id)
        player.skill_1.isactive = data.isactive
        player.skill_1.x = data.x
        player.skill_1.y = data.y
        player.skill_1.indice = data.indice

    },
    getPLayer(id){
        let player;
        allPlayers.forEach(((element, index, array) => {
          if (element.id == id) {
            player = array[index];
          }
        }));
        return player;
       
    },
    existingPlayer(id){
        let exits = false
        allPlayers.forEach((e)=>{
            if(e.id == id){
                exits = true
            }
        })
        return exits
    },
    getAllPlayers(){
        return allPlayers
    },
    removePlayer(id){
        allPlayers.splice(allPlayers.indexOf(id),1)
    },
    frames(){
        frames++
    }
}


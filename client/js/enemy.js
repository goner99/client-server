class Enemy{
    constructor(config){
        this.x = config.x,
        this.y = config.y,
        this.width = config.width,
        this.height = config.height,
        this.health = config.health,
        this.color = config.color
    }
    render(ctx,worldMap){
        ctx.fillStyle = this.color
        ctx.fillRect(worldMap.x + this.x,worldMap.y + this.y,this.width,this.height)
        ctx.fill()
    }
    update(){

    }
}
class GroupEnemy{
    constructor(config){
        this.amount = config.amount
        this.color = config.color
        this.boos = new Enemy({
            x:0,
            y:0,
            width:80,
            height:100,
            health:100,
            color: this.color
        })
        this.enemies = []
    }
    render(ctx,worldMap){
        this.boos.render(ctx,worldMap)
        this.enemies.forEach((e)=>{
            e.render(ctx,worldMap)
        })
    }
    addEnemies(){
        for (let i = 0; i < this.amount; i++) {
            this.enemies.push(new Enemy({
                x:i*50,
                y:i*50,
                width:50,
                height:70,
                health:30,
                color: this.color
            }))
        }
    }
}
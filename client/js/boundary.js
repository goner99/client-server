class Boundary {
    constructor({position}){
        this.position = position
        this.width = 64
        this.height = 64
    }
    render(ctx,worldMap){
        ctx.fillRect(worldMap.x+this.position.x,worldMap.y+this.position.y,this.width,this.height)
        ctx.fill()
    }
}
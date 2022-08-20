class WorldMap{
    constructor(){
        this.x = 0,
        this.y = 0,
        this.width = 832
        this.height = 512
        /* this.image = new Image()
        this.image.src = "./assets/worldMap.png" */
        
    }
    render(context){
        //context.drawImage(this.image,this.x,this.y,this.width,this.height)
        context.strokeRect(this.x,this.y,this.width,this.height)
        context.stroke() 
    }
   
}

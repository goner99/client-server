class Skill{
    constructor(config){
        this.x = 0
        this.y = 0
        this.isactive = false
        this.width = config.width
        this.height = config.height
      
        this.throwable =config.throwable
        this.skill = Sprites.Skills.FIRE
        this.indice = 0;
        this.velocity = 3;

        this.xMap = []
        this.yMap = []
        this.direction = []

    }
    render(ctx,worldMap){
        if(this.isactive){
            ctx.drawImage(
                spriteSkills,
                this.skill[this.indice].x,this.skill[this.indice].y,
                32,32, 
                worldMap.x + this.x,worldMap.y + this.y,
                this.width,this.height
            )
        }
    }
    update(input,g){
        this.isactive = true
        if(this.indice > 28) {
            this.indice = 0
            this.isactive = false
            input.skill_1  =false
        }
        if(g % this.velocity  == 0) this.indice++        
    }
}
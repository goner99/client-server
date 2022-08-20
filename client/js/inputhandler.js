class InputHandler{
    constructor(){
        this.up = false
        this.down = false
        this.right = false
        this.left = false

        this.skill_1 = false
        this.skill_2 = false
        this.skill_3 = false

        this.attack = false

        window.addEventListener("keydown",(e)=>{
            if(e.code === "KeyW")this.up = true
            if(e.code === "KeyS")this.down = true
            if(e.code === "KeyD")this.right = true
            if(e.code === "KeyA")this.left = true

            //skills
            if(e.code === "KeyJ")this.skill_1 = true
            if(e.code === "KeyK")this.skill_2 = true
            if(e.code === "KeyL")this.skill_3 = true
        })
        window.addEventListener("keyup",(e)=>{
            if(e.code === "KeyW") this.up = false
            if(e.code === "KeyS") this.down = false
            if(e.code === "KeyD") this.right = false
            if(e.code === "KeyA") this.left = false
        })
        document.addEventListener("click",(e)=>{
            this.attack = true
        })
    }
}
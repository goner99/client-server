var dimensions = {
    width : window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height : window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
    init: function(){
        window.addEventListener("resize",function(e){
            dimensions.width =window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            dimensions.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
            console.log("Width : " + dimensions.width+ " Height : "+ dimensions.height)
        })
    }
}

var COLISIONS = [
    {x:100,y:200,w:200,h:200},
    {x:10,y:10,w:50,h:60}
]
/* 
var cont = 0
const images = [
    "../assets/acc/Crown1.png",
    "../assets/acc/Crown2.png",
    "../assets/acc/Headband.png",
    "../assets/acc/Helmet.png",
    "../assets/hair/1.png",
    "../assets/hair/2.png",
    "../assets/hair/3.png",
    "../assets/hair/4.png",
    "../assets/hair/5.png",
    "../assets/hair/6.png",
    "../assets/hair/7.png",
    "../assets/hair/8.png",
    "../assets/hair/9.png",
    "../assets/hair/10.png",
    "../assets/hair/11.png",
    "../assets/hair/12.png",
    "../assets/hair/13.png",
    "../assets/hair/14.png",
    "../assets/hair/15.png",
    "../assets/hair/16.png",
    "../assets/hair/17.png",
    "../assets/hair/18.png",
    "../assets/hair/19.png",
    "../assets/hair/20.png",
    "../assets/hair/21.png",
    "../assets/hair/22.png",
    "../assets/hair/23.png",
    "../assets/hair/24.png",
    "../assets/hair/25.png",
    "../assets/hair/26.png",
    "../assets/hair/27.png",

]
var imagesload = []
for (let i = 0; i < images.length; i++) {
    var image = new Image()
    image.addEventListener("load",((e)=>{
        cont++
        imagesload.push(image.src)
    }))
    image.src = images[i]
}
console.log(imagesload)
/* function loadImage(e){
    cont++
    console.log(cont,e.src)
}
 */
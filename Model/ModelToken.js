// class ModelToken{
//
//     static radius;
//     static space;
//
//     x;
//     y;
//
//     static isAnim;
//
//
//     constructor(radius, space) {
//         ModelToken.radius = radius;
//         ModelToken.space = space;
//         ModelToken.isAnim = false;
//     }
//
//     getRadius(){
//         return ModelToken.radius;
//     }
//
//     getSpace(){
//         return ModelToken.space;
//     }
//
//     static setIsAnim(bool){
//         ModelToken.isAnim = bool;
//     }
//
//     setPosition(x, y){
//         this.x = x;
//         this.y = y;
//     }
//
//     static draw(x, y, canvas, color){
//         let ctx = canvas.getContext("2d");
//         ctx.globalCompositeOperation = "source-over";
//         ctx.beginPath();
//         ctx.arc(this.radius + this.space + (this.radius * 2 + this.space) * x, this.radius + this.space + (this.radius * 2 + this.space) * y, this.radius, 0, 2 * Math.PI);
//         ctx.closePath();
//         ctx.fillStyle = color;
//         ctx.fill();
//     }
//
//     static drawAnime(x, y, canvas, color){
//         let ctx = canvas.getContext("2d");
//         ctx.globalCompositeOperation = "source-over";
//         ctx.beginPath();
//         ctx.arc(this.radius + this.space + (this.radius * 2 + this.space) * x, y, this.radius, 0, 2 * Math.PI);
//         ctx.closePath();
//         ctx.fillStyle = color;
//         ctx.fill();
//     }
// }

class ModelToken{

    radius;
    space;

    constructor(radius, space) {
        this.radius = radius;
        this.space = space;
    }

    getRadius(){
        return this.radius;
    }

    getSpace(){
        return this.space;
    }

    getSize(){
        return this.radius + this.space + (this.radius * 2 + this.space);
    }
}

export default ModelToken;

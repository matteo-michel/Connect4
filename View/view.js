import ControllerGrid from "../Controller/ControllerGrid.js";

class View {

    controller;
    canvas;
    animCanvas;
    onGoingAnim;

    gameStart;

    constructor(controller) {
        this.controller = controller;
        this.onGoingAnim = false;
        this.toggleRadio();
        this.createGrid();
        this.changeStartPlayer();
    }

    createGrid(){
        let canvas = this.controller.getCanvas();
        let game = document.getElementById('Game');
        this.canvas = canvas[0];
        this.animCanvas = canvas[1];
        game.appendChild(this.canvas);

        this.canvas.addEventListener('click', (e) => {
            let rect = e.target.getBoundingClientRect();
            let x = e.clientX - rect.left;

            if (!this.onGoingAnim) {
                this.setToken(this.controller.getPosition(x));
            }
        });

        this.canvas.addEventListener('mousemove', (e) => {
            let ctx = this.animCanvas.getContext('2d');
            ctx.clearRect(0,0, this.animCanvas.width, this.animCanvas.height);

            let rect = e.target.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let t = this.controller.getPosition(x, true);
            if (t !== undefined) this.drawToken(t[0], t[1], t[2], false, true);
        });

        game.appendChild(this.animCanvas);
    }

    animToken(x, line, color){
        let ctx = this.animCanvas.getContext('2d');

        let y = 40;
        let vy = 1;
        let bool = false;

        let radius = this.controller.getTokenRadius();
        let space = this.controller.getTokenSpace();

        function draw() {
            let animCanvas = this.animCanvas;
            ctx.clearRect(0,0, animCanvas.width, animCanvas.height);
            this.drawToken(x, y, color, true);

            let lim = animCanvas.height - (radius + space + (radius * 2 + space) * (5-line));

            if (y + vy >= lim){
                bool = true;
                vy = -vy;
            }

            y += vy;
            vy *= 0.99;
            vy += .2;

            if ((y + vy >= lim) && bool) {
                ctx.clearRect(0,0, animCanvas.width, animCanvas.height);
                this.drawToken(x, line, color, false)
                if (this.controller.checkWin(x, line)) this.displayModal();
                this.onGoingAnim = false;
                this.playAI();
            } else window.requestAnimationFrame(draw.bind(this));
        }
        window.requestAnimationFrame(draw.bind(this));
    }

    playAI(){
        if (this.controller.isAITour()) {
            this.setToken(this.controller.getAIPosition());
            this.controller.addTour();
        }
    }

    drawToken(x, y, color, isAnim, preview = false){
        let canvas = (!isAnim&&!preview)? this.canvas : this.animCanvas;
        let ctx = canvas.getContext("2d");
        let radius = this.controller.getTokenRadius();
        let space = this.controller.getTokenSpace();
        ctx.globalCompositeOperation = "source-over";

        let tokenY = (isAnim&&!preview)? y : radius + space + (radius * 2 + space) * y;

        ctx.beginPath();
        ctx.arc(radius + space + (radius * 2 + space) * x, tokenY , radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
    }

    setToken(arrayPositions){
        this.toggleRadio();
        this.onGoingAnim = true;
        console.log(arrayPositions);
        this.animToken(arrayPositions[0], arrayPositions[1], arrayPositions[2], false);
    }

    changeStartPlayer(){
        document.getElementById('playerA').addEventListener('change', function() {
            if (!this.controller.isGameStart()) this.controller.changeStartPlayer();
        }.bind(this));

        document.getElementById('playerB').addEventListener('change', function() {
            if (!this.controller.isGameStart()) this.controller.changeStartPlayer();
        }.bind(this));

        document.getElementById('AI').addEventListener('click', function () {
            console.log('click');
            if (!this.controller.isGameStart()) this.controller.toggleAI();
        }.bind(this));
    }

    toggleRadio(){
        document.getElementById('playerA').disabled = this.controller.isGameStart();
        document.getElementById('playerB').disabled = this.controller.isGameStart();
    }

    displayModal(){
        let gagnant = this.controller.getGagnant();
        document.getElementById('Winner').innerHTML = gagnant;
        document.querySelector('.modal').style.display = 'block';
    }
}

new View(new ControllerGrid());

let delay = 0.2;
let square = document.getElementsByClassName("lettersquare");
for (let i = 0; i < square.length; i++) {
    let lett = document.getElementById("letter" + i);
    lett.style.animationDelay = delay + "s";
    delay = delay + 0.2;
}



function resetBody(){
    // reset innerHTML
    document.getElementById('Game').innerHTML = "";
}

function include(file){
    let script  = document.createElement('script');
    script.src  = file;
    script.type = 'text/javascript';
    script.defer = true;

    document.getElementsByTagName('head').item(0).appendChild(script);
}

// Init
function init(){
    resetBody();
    includeAll();
    let body = document.getElementById('Game');
    let startButton = document.createElement("BUTTON");
    startButton.innerHTML = "Démarrer le jeux !";
    startButton.addEventListener('click', initGame)
    body.appendChild(startButton);
}

function includeAll(){
    include("../Controller/ControllerGrid.js");
    include("../Model/ModelGrid.js");
    include("../Model/ModelToken.js");
}

// Init game
function initGame(){
    resetBody();
    controllerGrid.createGrid();
    // document.body.appendChild(controllerGrid.createGrid());
}

init();

// let btn = document.getElementById("myBtn");
//
// let span = document.getElementsByClassName("close")[0];
//
// btn.onclick = function() {
//     modal.style.display = "block";
// }
//
// span.onclick = function() {
//     modal.style.display = "none";
// }
//
// window.onclick = function(event) {
//     if (event.target === modal) {
//         modal.style.display = "none";
//     }
// }

function animToken(x, ligne, color){
    ModelToken.setIsAnim(true);
    let animCanvas = document.getElementById("animCanvas");
    let ctx = animCanvas.getContext('2d');

    let y = 40;
    let vy = 1;
    let bool = false;

    function draw() {
        ctx.clearRect(0,0, animCanvas.width, animCanvas.height);
        ModelToken.drawAnime(x, y, animCanvas, color);
        let lim = animCanvas.height - (ModelToken.radius + ModelToken.space + (ModelToken.radius * 2 + ModelToken.space) * (5-ligne));
        console.log(ligne);

        if (y + vy >= lim){
            bool = true;
            vy = -vy;
        }

        y += vy;
        vy *= .99;
        vy += .05;

        if ((y + vy >= lim) && bool) {
            ctx.clearRect(0,0, animCanvas.width, animCanvas.height);
            ModelToken.draw(x, ligne, document.getElementById('mainCanvas'), color)
            ModelToken.setIsAnim(false);
            console.log('stop');
        } else window.requestAnimationFrame(draw);
    }

    draw();
}





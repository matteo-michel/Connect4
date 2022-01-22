class ModelGrid {

    colorPlayerA;
    colorPlayerB;

    tour;
    grid;
    colonne;
    ligne;

    radius;
    space;

    canvas;
    animCanvas;

    anim;

    constructor(length, height, token) {
        this.tour = 0;

        this.radius = token.getRadius();
        this.space = token.getSpace();

        this.setColorPlayer('A', "red");
        this.setColorPlayer('B', "yellow");

        this.colonne = length;
        this.ligne = height;

        this.grid = [];
        for (let i = 0; i < length; i++) {
            this.grid[i] = [];
            for (let j = 0; j < height; j++) {
                this.grid[i][j] = 0;
            }
        }
    }

    setColorPlayer(player, color) {
        if (player === 'A') this.colorPlayerA = color;
        else this.colorPlayerB = color;
    }

    getColorPlayer() {
        return (this.tour % 2 === 0) ? this.colorPlayerA : this.colorPlayerB;
    }

    makeGrid() {
        // Square
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'mainCanvas';
        this.canvas.width = (this.radius * 2 + this.space) * this.colonne + this.space;
        this.canvas.height = (this.radius * 2 + this.space) * this.ligne + this.space;

        this.animCanvas = document.createElement('canvas');
        this.animCanvas.id = 'animCanvas';
        this.animCanvas.width = (this.radius * 2 + this.space) * this.colonne + this.space;
        this.animCanvas.height = (this.radius * 2 + this.space) * this.ligne + this.space;

        // Ctx
        let ctx = this.canvas.getContext("2d");
        ctx.fillStyle = "blue";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.globalCompositeOperation = "destination-out";
        for (let colonne = 0; colonne < this.colonne; colonne++) {
            for (let ligne = 0; ligne < this.ligne; ligne++) {
                ctx.beginPath();
                ctx.arc(this.radius + this.space + (this.radius * 2 + this.space) * colonne, this.radius + this.space + (this.radius * 2 + this.space) * ligne, this.radius, 0, 2 * Math.PI);
                ctx.fill();
            }
        }

        this.canvas.addEventListener('click', (e) => {
            let rect = e.target.getBoundingClientRect();
            let x = e.clientX - rect.left;
            controllerGrid.addToken(Math.floor((x - (this.space / 2)) / (this.radius * 2 + this.space)));
        });

        //Return
        document.body.appendChild(this.canvas);
        document.body.appendChild(this.animCanvas);
    }

    addToken(idCol) {
        if (ModelToken.isAnim === false) {
            console.log('addToken');
            for (let ligne = this.ligne - 1; ligne >= 0; ligne--) {
                if (this.grid[idCol][ligne] === 0) {
                    this.grid[idCol][ligne] = this.tour % 2 + 1;
                    animToken(idCol, ligne, this.getColorPlayer());
                    this.tour++;
                    break;
                }
            }
        }
    }

    checkWin(x, y) {
        let line = this.getLine(x, y);
        let col = this.getColumn(x, y);
        let diag = this.getDiag(x, y);

        return (line || col || diag);
    }

    getLine(x, y) {
        let compteur = 1;
        let person = this.grid[x][y];

        let xCol = x;
        while (++xCol < this.colonne && this.grid[xCol][y] === person) compteur++;
        while (--x > 0 && this.grid[x][y] === person) compteur++;

        if (compteur >= 4) while (++x < this.colonne && this.grid[x][y] === person) this.glow(x, y);

        return compteur >= 4;
    }

    getColumn(x, y) {
        let compteur = 1;
        let person = this.grid[x][y];

        let yCol = y;
        while (++yCol < this.ligne && this.grid[x][yCol] === person) compteur++;
        while (--y > 0 && this.grid[x][y] === person) compteur++;

        if (compteur >= 4) while (++y < this.colonne && this.grid[x][y] === person) this.glow(x, y);

        return compteur >= 4;
    }

    getDiag(x, y) {
        let compteur = 1;
        let person = this.grid[x][y];

        let xDiag = x;
        let yDiag = y
        while (++xDiag < this.colonne && ++yDiag < this.ligne && this.grid[xDiag][yDiag] === person) compteur++;

        while (--x < this.colonne && --y < this.ligne && this.grid[x][y] === person) compteur++;

        if (compteur >= 4) while (++x < this.colonne && ++y < this.ligne && this.grid[x][y] === person) this.glow(x, y);

        return compteur >= 4;
    }

    glow(x, y){
        ModelToken.draw(x, y, this.canvas, 'green');
        document.getElementById("Winner").innerHTML = (this.tour%2===0)? 'Player B' : 'Player A';
        document.getElementById("Win").style.display = 'block';
    }
}

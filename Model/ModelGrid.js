import ModelToken from "./ModelToken.js";
import controllerGrid from "../Controller/ControllerGrid.js";

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

    isGameStart;

    constructor(length, height, token) {
        this.tour = 0;

        this.radius = token.getRadius();
        this.space = token.getSpace();

        this.setColorPlayer('A', "red");
        this.setColorPlayer('B', "yellow");

        this.colonne = length;
        this.ligne = height;

        this.isGameStart = false;

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

    addTour(){
        this.tour++;
    }

    getIsGameStart(){
        return this.isGameStart;
    }

    getGagnant(){
        this.isIAPlay = false;
        return ((this.tour-1)%2===0)? 'Player A' : (this.isIAPlay)? 'IA' : 'PLayer B';
    }

    makeGrid() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'mainCanvas';
        this.canvas.width = (this.radius * 2 + this.space) * this.colonne + this.space;
        this.canvas.height = (this.radius * 2 + this.space) * this.ligne + this.space;

        this.animCanvas = document.createElement('canvas');
        this.animCanvas.id = 'animCanvas';
        this.animCanvas.width = this.canvas.width;
        this.animCanvas.height = this.canvas.height;

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

        return [this.canvas, this.animCanvas];
    }

    addToken(idCol, preview) {
        if ((idCol >= 0)&&(idCol < this.colonne)){
            if (!preview) this.isGameStart = true;
            for (let ligne = this.ligne - 1; ligne >= 0; ligne--) {
                if (this.grid[idCol][ligne] === 0) {
                    if (!preview) this.grid[idCol][ligne] = this.tour % 2 + 1;
                    let colorPlayer = this.getColorPlayer();
                    if (!preview) this.tour++;
                    return [idCol, ligne, colorPlayer];
                }
            }
        }
    }

    checkWin(x, y) {
        let line = this.getLine(x, y);
        let col = this.getColumn(x, y);
        let diagR = this.getDiagRight(x, y);
        let diagL = this.getDiagLeft(x, y);

        return (line || col || diagR || diagL);
    }

    getLine(x, y) {
        let compteur = 1;
        let person = this.grid[x][y];

        let xCol = x;
        while (++xCol < this.colonne && this.grid[xCol][y] === person) compteur++;
        while (--x >= 0 && this.grid[x][y] === person) compteur++;

        if (compteur < 4) return false;
        else {
            this.isGameStart = false;
            let arrayPosition = [];
            while (++x < this.colonne && this.grid[x][y] === person) arrayPosition.push([x, y]);
            return arrayPosition;
        }
    }

    getColumn(x, y) {
        let compteur = 1;
        let person = this.grid[x][y];

        let yCol = y;
        while (++yCol < this.ligne && this.grid[x][yCol] === person) compteur++;
        while (--y >= 0 && this.grid[x][y] === person) compteur++;

        if (compteur < 4) return false;
        else {
            this.isGameStart = false;
            let arrayPosition = [];
            while (++y < this.colonne && this.grid[x][y] === person) arrayPosition.push([x, y]);
            return arrayPosition;
        }
    }

    getDiagRight(x, y) {
        let compteur = 1;
        let person = this.grid[x][y];

        let xDiag = x;
        let yDiag = y

        while (++xDiag < this.colonne && ++yDiag < this.ligne && this.grid[xDiag][yDiag] === person) compteur++;
        while (--x >= 0 && --y > 0 && this.grid[x][y] === person) compteur++;

        if (compteur < 4) return false;
        else {
            this.isGameStart = false;
            let arrayPosition = [];
            while (++x < this.colonne && ++y < this.ligne && this.grid[x][y] === person) arrayPosition.push([x, y]);
            return arrayPosition;
        }
    }

    getDiagLeft(x, y) {
        let compteur = 1;
        let person = this.grid[x][y];

        let xDiag = x;
        let yDiag = y

        while (++xDiag < this.colonne && --yDiag >= 0 && this.grid[xDiag][yDiag] === person) compteur++;
        while (--x >= 0 && ++y < this.ligne && this.grid[x][y] === person) compteur++;

        if (compteur < 4) return false;
        else {
            this.isGameStart = false;
            let arrayPosition = [];
            while (++x < this.colonne && --y >= 0 && this.grid[x][y] === person) arrayPosition.push([x, y]);
            return arrayPosition;
        }
    }
}

export default ModelGrid;

import ModelGrid from "../Model/ModelGrid.js";
import ModelToken from "../Model/ModelToken.js";
import ControllerAI from "./ControllerAI.js";

class ControllerGrid{

    modelGrid;
    modelToken;

    controllerAI;

    constructor(){
        this.modelToken = new ModelToken(40, 10);
        this.modelGrid = new ModelGrid(7, 6, this.modelToken);

        this.controllerAI = new ControllerAI(this.modelGrid);
    }

    getCanvas(){
        return this.modelGrid.makeGrid();
    }

    getPosition(x, preview = false){
        return this.modelGrid.addToken(Math.floor((x - (this.modelToken.getSpace() / 2)) / (this.modelToken.getRadius() * 2 + this.modelToken.getSpace())), preview);
    }

    getTokenSize(){
        return this.modelToken.getSize();
    }

    getTokenRadius(){
        return this.modelToken.getRadius();
    }

    getTokenSpace(){
        return this.modelToken.getSpace();
    }

    changeStartPlayer(){
        this.modelGrid.addTour();
    }

    checkWin(x, y){
        return this.modelGrid.checkWin(x, y);
    }

    isGameStart(){
        return this.modelGrid.getIsGameStart();
    }

    getGagnant() {
        return this.modelGrid.getGagnant();
    }

    toggleAI(){
        this.modelGrid.toggleAI();
    }

    isAITour(){
        return this.modelGrid.isAITour();
    }

    getAIPosition(){
        let p = this.controllerAI.getPosition();
        this.modelGrid.setPosition(p[0], p[1]);

        let color = this.modelGrid.getColorPlayer();
        return [p[0], p[1], color];
    }

    addTour(){
        this.modelGrid.addTour();
    }
}

export default ControllerGrid;

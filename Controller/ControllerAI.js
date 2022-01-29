import ModelAI from "../Model/ModelAI.js";

class ControllerAI{

    modelAi;

    constructor(modelGrid) {
        this.modelAi = new ModelAI(modelGrid);
    }

    getPosition(){
        return this.modelAi.smartPlay();
    }
}

export default ControllerAI;

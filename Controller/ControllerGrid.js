class controllerGrid{

    static modelGrid;
    static modelToken;

    static createGrid(){
        this.modelToken = new ModelToken(30, 10);
        this.modelGrid = new ModelGrid(7, 6, this.modelToken);
        this.modelGrid.makeGrid();
    }

    static addToken(x){
        this.modelGrid.addToken(x);
    }
}

class ModelAI {

    constructor(modelGrid) {
        this.modelGrid = modelGrid;
    }

    update_score(streak, player) {
        let new_score = 0

        if (streak >= 3) new_score += (player === 2) ? 10000 : -10000;

        else if (streak === 2) new_score += (player === 2) ? 5 : -5;

        else if (streak === 1) new_score += (player === 2) ? 2 : -2;

        return new_score;
    }

    evaluation(board, player) {
        var score = 0;
        // Range of 2 :
        for (var i = 0; i < 6; i++) {
            // row
            for (var j = 0; j < 6; j++) {
                // column
                if (board[i][j] !== 0 && board[i][j] === board[i][j + 1]) {
                    score = board[i][j] === player ? score + 3 : score - 3;
                }
            }
        }
        for (var i = 0; i < 5; i++) {
            // row
            for (var j = 0; j < 7; j++) {
                // column
                if (board[i][j] !== 0 && board[i][j] === board[i + 1][j]) {
                    score = board[i][j] === player ? score + 3 : score - 3;
                }
            }
        }
        for (var i = 0; i < 5; i++) {
            // row
            for (var j = 0; j < 6; j++) {
                // column
                if (board[i][j] !== 0 && board[i][j] === board[i + 1][j + 1]) {
                    score = board[i][j] === player ? score + 3 : score - 3;
                }
            }
        }

        for (var i = 1; i < 6; i++) {
            // row
            for (var j = 0; j < 6; j++) {
                // column
                if (board[i][j] !== 0 && board[i][j] === board[i - 1][j + 1]) {
                    score = board[i][j] === player ? score + 3 : score - 3;
                }
            }
        }

        // Range of 3 :
        for (var i = 0; i < 6; i++) {
            // row
            for (var j = 0; j < 5; j++) {
                // column
                if (
                    board[i][j] !== 0 &&
                    board[i][j] === board[i][j + 1] &&
                    board[i][j] === board[i][j + 2]
                ) {
                    score = board[i][j] === player ? score + 10 : score - 10;
                }
            }
        }
        for (var i = 0; i < 4; i++) {
            // row
            for (var j = 0; j < 7; j++) {
                // column
                if (
                    board[i][j] !== 0 &&
                    board[i][j] === board[i + 1][j] &&
                    board[i][j] === board[i + 2][j]
                ) {
                    score = board[i][j] === player ? score + 10 : score - 10;
                }
            }
        }
        for (var i = 0; i < 4; i++) {
            // row
            for (var j = 0; j < 5; j++) {
                // column
                if (
                    board[i][j] !== 0 &&
                    board[i][j] === board[i + 1][j + 1] &&
                    board[i][j] === board[i + 2][j + 2]
                ) {
                    score = board[i][j] === player ? score + 10 : score - 10;
                }
            }
        }
        for (var i = 2; i < 6; i++) {
            // row
            for (var j = 0; j < 5; j++) {
                // column
                if (
                    board[i][j] !== 0 &&
                    board[i][j] === board[i - 1][j + 1] &&
                    board[i][j] === board[i - 2][j + 2]
                ) {
                    score = board[i][j] === player ? score + 10 : score - 10;
                }
            }
        }

        // Range of 4 :
        for (var i = 0; i < 6; i++) {
            // row
            for (var j = 0; j < 4; j++) {
                // column
                if (
                    board[i][j] !== 0 &&
                    board[i][j] === board[i][j + 1] &&
                    board[i][j] === board[i][j + 2] &&
                    board[i][j] === board[i][j + 3]
                ) {
                    score = board[i][j] === player ? score + 50 : score - 150;
                }
            }
        }
        for (var i = 0; i < 3; i++) {
            // row
            for (var j = 0; j < 7; j++) {
                // column
                if (
                    board[i][j] !== 0 &&
                    board[i][j] === board[i + 1][j] &&
                    board[i][j] === board[i + 2][j] &&
                    board[i][j] === board[i + 3][j]
                ) {
                    score = board[i][j] === player ? score + 50 : score - 150;
                }
            }
        }
        for (var i = 0; i < 3; i++) {
            // row
            for (var j = 0; j < 4; j++) {
                // column
                if (
                    board[i][j] !== 0 &&
                    board[i][j] === board[i + 1][j + 1] &&
                    board[i][j] === board[i + 2][j + 2] &&
                    board[i][j] === board[i + 3][j + 3]
                ) {
                    score = board[i][j] === player ? score + 50 : score - 150;
                }
            }
        }
        for (var i = 3; i < 6; i++) {
            // row
            for (var j = 0; j < 4; j++) {
                // column
                if (
                    board[i][j] !== 0 &&
                    board[i][j] === board[i - 1][j + 1] &&
                    board[i][j] === board[i - 2][j + 2] &&
                    board[i][j] === board[i - 3][j + 3]
                ) {
                    score = board[i][j] === player ? score + 50 : score - 150;
                }
            }
        }
        return score;
    }

    getChilds(grid) {

        let childs = [];

        for (let c = 0; c < 7; c++) {
            for (let r = 5; r >= 0; r--) {
                if (grid[c][r] === 0) {
                    childs.push([c, r]);
                    break;
                }
            }
        }

        return childs;
    }

    minimax(x, y, grid, depth, alpha, beta, player) {
        console.log("minimax grid : ", grid);
        let grid_minimax = JSON.parse(JSON.stringify(grid));

        grid_minimax[x][y] = player;

        if (depth === 0 || this.evaluation(grid_minimax, player) >= 1000) {
            return this.evaluation(grid_minimax, player);
        }

        if (player === 2) {
            let maxEval = -50000;

            for (let child of this.getChilds(grid_minimax)) {
                let x = child[0];
                let y = child[1];

                player = player % 2 + 1
                let eva = this.minimax(x, y, grid_minimax, --depth, alpha, beta, player);
                maxEval = Math.max(maxEval, eva);
                console.log("Max eval = ", maxEval);
                return maxEval;
            }
        }

        else {
            let minEval = 50000;

            for (let child of this.getChilds(grid_minimax)) {
                let x = child[0];
                let y = child[1];

                player = player % 2 + 1
                let eva = this.minimax(x, y, grid_minimax, --depth, alpha, beta, player);
                minEval = Math.min(minEval, eva);
                console.log("min eval = ", minEval);
                return minEval;
            }
        }
    }

    // getBestMove(board, depth, model) {
    //     let position; // Copy the board
    //     var maxEval = -Infinity; // The best evalution
    //     var bestMove = 0; // The best move
    //
    //     for (let child of this.getChilds(position)) {
    //         position = JSON.parse(JSON.stringify(board)); // Copy the board
    //         position[]
    //         var evalScore = this.minimax()
    //     }
    //
    //     for (let i = 0; i < 7; i++) {
    //         // For each possible move
    //         position =
    //         var evalScore = this.minimax(
    //             model.getStateByMove(position, i, this.number),
    //             depth,
    //             false,
    //             -Infinity,
    //             +Infinity,
    //             model
    //         ); // Evaluate the move
    //         if (evalScore > maxEval && model.isValidMove(position, i)) {
    //             // If the move is better than the best one
    //             maxEval = evalScore;
    //             bestMove = i;
    //         }
    //     }
    //     return bestMove; // Return the best move
    // }

    // Fonction MINAMAX
    // minimax(board, depth, isMaximizing, alpha, beta, model) {
    //     let position = JSON.parse(JSON.stringify(board));
    //     if (depth <= 0 || model.getWinner(position) != 0) {
    //         return this.evalution(position, this.number);
    //     }
    //     var evalScore = 0;
    //     if (isMaximizing) {
    //         var maxEval = -Infinity;
    //         for (let i = 0; i < 7; i++) {
    //             // The best move we can do
    //             if (model.isValidMove(position, i)) {
    //                 evalScore = this.minimax(
    //                     model.getStateByMove(position, i, this.number),
    //                     depth - 1,
    //                     false,
    //                     alpha,
    //                     beta,
    //                     model
    //                 );
    //                 maxEval = Math.max(maxEval, evalScore);
    //                 alpha = Math.max(alpha, evalScore);
    //                 if (beta <= alpha) {
    //                     break;
    //                 }
    //             }
    //         }
    //         return maxEval;
    //     } else {
    //         var minEval = Infinity;
    //         for (let i = 0; i < 7; i++) {
    //             // The worst move the opponent can do
    //             if (model.isValidMove(position, i)) {
    //                 evalScore = this.minimax(
    //                     model.getStateByMove(position, i, this.number == 1 ? 2 : 1),
    //                     depth - 1,
    //                     true,
    //                     alpha,
    //                     beta,
    //                     model
    //                 );
    //                 minEval = Math.min(minEval, evalScore);
    //                 beta = Math.min(beta, evalScore);
    //                 if (beta <= alpha) {
    //                     break;
    //                 }
    //             }
    //         }
    //         return minEval;
    //     }
    // }

    smartPlay() {

        // Joue à gauche
        let bestMove;
        let bestScore = -50000;
        let score = 0;
        let depth = 3;
        let alpha = 50000;
        let beta = -50000;
        let grid_copy = JSON.parse(JSON.stringify(this.modelGrid.grid));
        let itergrid;

        console.log("grid_copy : ", grid_copy);

        for (let child of this.getChilds(grid_copy)) {
            console.log("child : ", child)
            itergrid = JSON.parse(JSON.stringify(grid_copy));
            score = this.minimax(child[0], child[1], itergrid, depth,
                alpha, beta, 2);

            if (score > bestScore) {
                bestScore = Math.max(score, bestScore);
                bestMove = child;
            }
        }
        console.log("Best move = ", bestMove);
        return bestMove;
    }
}

export default ModelAI;

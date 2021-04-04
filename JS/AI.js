import Game from "./Game.js";

export default class AI {
    static color = "yellow";
    static value = "O";

    static init(){
        console.log("Init");
    }

    static Move(board, cells) {
        let bestVal = -1000;
        let bestMove = [-1, -1];
        var AllScores = [];
        let Randomize = true;
        var Moves = this.GetPossibleMoves(board);
        let x;
        let y;

        for(var i = 0; i < Moves.length; i++){
            var column = Moves[i][0];
            var row = Moves[i][1];
            board[column][row] = "O";

            var moveVal = this.minimax(board, 0, false);
            AllScores.push(moveVal);
            //console.table([column, row, moveVal]);
            board[column][row] = "";

            if(moveVal > bestVal){
                bestMove = [column, row];
                bestVal = moveVal;
            }
        }

        for(var i = 0; i < AllScores.length-1; i++){
            if(AllScores[i] != AllScores[i+1]){
                Randomize = false;
            }
        }
        
        if(!Randomize){
            x = bestMove[0];
            y = bestMove[1];
        } else{
            var index = Math.floor(Math.random() * Moves.length);
            console.log(Moves[index]);
            console.log("Index: " + index);
            x = Moves[index][0];
            
            console.log(x);
            y = Moves[index][1];
        }

        
        Game.board[x][y] = this.value;
        var target = cells[x].children;
        for(var j = 0; j <= y; j++){
            this.Animate(j, target);
        }

        Game.CanMove = true;

        // return bestMove;
    }

    static Animate(index, cells){
        setTimeout(() => {
            cells[index].style.backgroundColor = this.color;
            cells[index].style.color = this.color;
            cells[index].innerText = this.value;
            if (index > 0) {
                cells[index - 1].style.backgroundColor = "white";
                cells[index - 1].innerText = "";
            }
        }, 50 * index)
    }

    static GetPossibleMoves(board){
        let AvailSpaces = [];
        for (var i = 0; i < 7; i++) {
            for (var j = 0; j < 6; j++) {
                if(board[i][j] != "" && j > 0 && board[i][j-1] == ""){
                    AvailSpaces.push([i,j - 1]);
                } else if (j == 5 && board[i][j] == ""){
                    AvailSpaces.push([i,j]);
                }
            }
        }
        return AvailSpaces;
    }

    static minimax(board, depth, isMax){
        var GameOver = Game.CheckForWinner(board);
        var OpenSpaces = Game.CheckForOpenSpaces(board);
        var PossibleMoves = this.GetPossibleMoves(board);
        
        var best = -1;

        if (GameOver && !isMax) {
            return 10;
        } else if (GameOver && isMax) {
            return -10;
        } else if (!OpenSpaces) {
            return 0;
        }

        if(depth < 7){
            if (isMax) {
                best = -1000;

                for (var i = 0; i < PossibleMoves.length; i++) {
                    var column = PossibleMoves[i][0];
                    var row = PossibleMoves[i][1];

                    board[column][row] = "O";

                    best = Math.max(best, this.minimax(board, depth + 1, !isMax));

                    board[column][row] = "";
                }
                return best;
            } else {
                best = 1000;

                for (var i = 0; i < PossibleMoves.length; i++) {
                    var column = PossibleMoves[i][0];
                    var row = PossibleMoves[i][1];

                    board[column][row] = "X";

                    best = Math.min(best, this.minimax(board, depth + 1, !isMax));

                    board[column][row] = "";
                }
                return best;
            }
        } else {
            return best;
        }
        
    }
}
import Player from "./Player.js";
import AI from "./AI.js";

export default class Game{
    constructor(GameMode, Style){
        this.CanMove = true;
        this.Player1 = new Player("red", "X");
        this.board = [
            ["", "", "", "", "", ""],
            ["", "", "", "", "", ""],
            ["", "", "", "", "", ""],
            ["", "", "", "", "", ""],
            ["", "", "", "", "", ""],
            ["", "", "", "", "", ""],
            ["", "", "", "", "", ""],
        ];

        if(GameMode == "TwoPlayer"){
            var style = (Style == "classic")? "black" : "yellow";
            this.Player2 = new Player(style, "O");
        } else{
            this.AI = new AI(Style, "O");
        }
    }

    
    static CanMove;
    
    
    static turn = true;
    

    static CheckForWinner(board) {
        
        //Checks Columns for Win
        for (var i = 0; i < 7; i++) {
            for (var j = board[i].length - 1; j > 0; j--) {
                if (board[i][j] != "") {
                    if (board[i][j] == board[i][j - 1] && board[i][j] == board[i][j - 2] && board[i][j] == board[i][j - 3]) {
                        return true;
                    }
                }
            }
        }
        //Checks Rows for Win
        for (var i = 0; i < 7; i++) {
            for (var j = board[i].length - 1; j > 0; j--) {
                if (board[i][j] != "") {
                    if (i <= 3) {
                        if (board[i][j] == board[i + 1][j] && board[i][j] == board[i + 2][j] && board[i][j] == board[i + 3][j]) {
                            return true;
                        }
                    }

                }
            }
        }
        //Checks Angles Going Up
        for (var i = 0; i < 7; i++) {
            for (var j = board[i].length - 1; j > 0; j--) {
                if (board[i][j] != "") {
                    //Up and Right
                    if (i < 4 && board[i][j] == board[i + 1][j - 1] && board[i][j] == board[i + 2][j - 2] && board[i][j] == board[i + 3][j - 3]) {
                        return true;
                    }
                    //Up and Left
                    if (i > 2 && board[i][j] == board[i - 1][j - 1] && board[i][j] == board[i - 2][j - 2] && board[i][j] == board[i - 3][j - 3]) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    static CheckForOpenSpaces(board){
        for(var i = 0; i < 6; i++){
            for(var j = 6; j >= 0; j--){
                if(board[i][j] != ""){
                    return true;
                }
            }
        }
        return false;
    }
}
import AI from "./AI.js";
import Player from "./Player.js";
import Game from "./Game.js";

window.addEventListener('DOMContentLoaded', () => {
    Game.CanMove = true;

    var columns = document.querySelectorAll('.column');

    //Listens for player to click
    columns.forEach(column => {
        column.addEventListener('click', () => {
            var cells = column.children;
            //Removes random text elements from cells list
            for (var i = 0; i < cells.length; i++) {
                if (!cells[i].classList.contains('cell')) {
                    cells.splice(i, 1);
                }
            }
            //Makes the bottom most cell red
            for (var i = cells.length - 1; i >= 0; i--) {
                if (cells[i].innerText == "") {
                    //If Player vs AI
                    if (Game.CanMove) {
                        Game.CanMove = false;
                        Game.Player1.Move(column.id, i, cells);

                        var GameOver = Game.CheckForWinner(Game.board);
                        if (GameOver) {
                            console.log("Game Over");
                            document.getElementById("result").innerText = "Game Over!";
                            Game.CanMove = false;
                        } else{
                            setTimeout(() => {
                                AI.Move(Game.board, columns);
                                var GameOver = Game.CheckForWinner(Game.board);
                                if (GameOver) {
                                    console.log("Game Over");
                                    document.getElementById("result").innerText = "Game Over!";
                                    Game.CanMove = false;
                                }
                            }, 1000);
                        }
                    }
                    i = -1;
                }
            }
            

            
        })
    });  
});
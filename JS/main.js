import Game from "./Game.js";

window.addEventListener('DOMContentLoaded', () => {
    console.log(window.location.pathname);
    // if local
    // if (window.location.pathname == "/game.html") {
    //     BeginGame();
    // }

    //Production
    if (window.location.pathname == "/ConnectFour/game") {
        BeginGame();
    }

    var play = document.getElementById("play");

    if (play != null) {
        play.addEventListener("click", () => {
            //Development
            //window.location.replace('/game.html');
            //Production
            window.location.replace('/ConnectFour/game.html');
        })
    }

    function BeginGame() {
        var columns = document.querySelectorAll('.column');
        let game = new Game(window.sessionStorage.GameMode, window.sessionStorage.style);

        if(window.sessionStorage.style == "classic"){
            document.querySelector(".parent").style.backgroundColor = "#fde933";
        } else{
             document.querySelector(".parent").style.backgroundColor = "#2424a3";
        }

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
                        if (game.CanMove) {
                            game.CanMove = false;
                            game.Player1.Move(column.id, i, cells, game);

                            var GameOver = Game.CheckForWinner(game.board);
                            if (GameOver) {
                                console.log("Game Over");
                                document.getElementById("result").innerText = "Game Over!";
                                game.CanMove = false;
                            } else {
                                setTimeout(() => {
                                    game.AI.Move(game.board, columns, game);
                                    var GameOver = Game.CheckForWinner(game.board);
                                    if (GameOver) {
                                        console.log("Game Over");
                                        document.getElementById("result").innerText = "Game Over!";
                                        game.CanMove = false;
                                    }
                                }, 1000);
                            }
                        }
                        i = -1;
                    }
                }
            })
        });

    }
});

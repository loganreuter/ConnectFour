import Game from "./Game.js";

export default class Player{
    constructor(color, value){
        this.color = color;
        this.value = value;
    }
    
    Move(i, j, cells){
        Game.CanMove = false;
        Game.board[i][j] = this.value;

        for (var x = 0; x <= j; x++) {
            this.Animate(x, cells);
        }
       
    }

    Animate(index, cells){
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
}
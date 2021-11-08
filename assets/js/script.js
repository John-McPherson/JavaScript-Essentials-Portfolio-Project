let control = document.getElementsByClassName('control');
for (let x = 0; x < control.length; x++) {
    control[x].addEventListener("click", wrongAns);
}
/**
*Called when the user enters an incorrect guess. 
*Turns the pressed key red and advances the hangman image by one
*/
function wrongAns(event) {
    event.preventDefault();
    event.target.classList.add("wrong");
}

/**
* The fuction run when user clicks on the start game button.
* It clears the game board and generates a new word to be guessed
*/
function startGame(event) {
    event.preventDefault();
    let newGameBtn = document.getElementById("new-game");
    newGameBtn.innerHTML = "New Game"
    clearGame();

}
/**
* Clears the wrong and right answers
*/
function clearGame(){
    for (let x = 0; x < control.length; x++) {
        control[x].classList.remove("wrong");
        control[x].classList.remove("right");
    }
}
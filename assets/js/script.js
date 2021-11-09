let control = document.getElementsByClassName('control');
for (let x = 0; x < control.length; x++) {
    control[x].addEventListener("click", checkGuess);
}
var wrong = 0;
/**
*Called when the user enters an incorrect guess. 
*Turns the pressed key red and advances the hangman image by one
*/
function wrongAns(event) {
    event.preventDefault();
    event.target.classList.add("wrong");
    let img = document.getElementById('hangman');
    wrong ++
    img.innerHTML =  `<img src="./assets/images/hangman${wrong}.png" alt="">`
}
function rightAns(event) {
    event.preventDefault();
    event.target.classList.add("right");
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
    newWord();
}
/**
* Clears the wrong and right answers
*/
function clearGame(){
    for (let x = 0; x < control.length; x++) {
        control[x].classList.remove("wrong");
        control[x].classList.remove("right");
    }
    let img = document.getElementById('hangman');
    img.innerHTML =  `<img src="./assets/images/hangman0.png" alt="">`
}

function newWord(){
    let word = ['test','check']
    let arr = word[1].split("")
    let html = ""
    for (let x of arr){
       html= html +`<span class="letter" data-letter="${x}">
            <p class="not-guessed">${x}</p>
        </span>`
    }
    let container = document.getElementById('word')
    container.innerHTML = html;
}

function checkGuess(event){
event.preventDefault();
let guess = this.getAttribute("data-key");
 let word = ['test','check'];
 let letter = "";
 let correct = false;
    let arr = word[1].split("")
for (let x of arr){
    if (x === guess){
        correct = true;
    }
} if (correct === true){
    rightAns(event)
    let span = document.getElementsByClassName('letter');
    for (let y of span){
            letter = y.getAttribute("data-letter");
        if (letter === guess){
        y.firstElementChild.classList.remove("not-guessed");  
        }
    }
}else {
 wrongAns(event)
}

}
let control = document.getElementsByClassName('control');
for (let x = 0; x < control.length; x++) {
    control[x].addEventListener("click", checkGuess);
}
let open = document.getElementsByClassName('open-modal');
for (let x = 0; x < open.length; x++) {
    open[x].addEventListener("click", openModal);
}
let close = document.getElementsByClassName('close-modal');
for (let x = 0; x < close.length; x++) {
    close[x].addEventListener("click", closeModal);
}
let diffSelect = document.getElementsByClassName('diff-select');
for (let x = 0; x < diffSelect.length; x++) {
    diffSelect[x].addEventListener("click", startGame);
}
window.addEventListener('keydown',keyControls);
var wrong = 0;
var right = 0;
var word = "start";
var difficulty = 'easy';
var easy = ['have', 'say', 'get', 'make', 'know', 'take', 'see', 'come', 'look', 'want', 'give', 'use', 'tell', 'ask', 'work', 'seem', 'feel', 'call']
var medium = ['think', 'leave', 'lonely', 'climb', 'interesting', 'skilful', 'modern', 'safety', 'people', 'weird', 'women', 'Saturday', 'health', 'forty', 'diary', 'lovely', 'design', 'issue']
var hard = ['jazz', 'conscience', 'audible', 'incidentally', 'diamond', 'industrial', 'buried', 'knowledge', 'argument', 'material', 'column', 'stomach', 'acquire', 'essential', 'courteous', 'mortgage', 'minutes', 'friends']
/**
 *Called when the user enters an incorrect guess. 
 *Turns the pressed key red and advances the hangman image by one
 */
function wrongAns(event) {
    event.preventDefault();
    event.target.classList.add("wrong");
    let img = document.getElementById('hangman');
    wrong++;
    img.innerHTML = `<img src="./assets/images/hangman${wrong}.png" alt="">`
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
    difficulty = this.getAttribute("data-diff");
    let newGameBtn = document.getElementById("new-game");
    newGameBtn.innerHTML = "New Game"
    clearGame();
    newWord();
    closeModal();
}
/**
 * Clears the wrong and right answers
 */
function clearGame() {
    for (let x = 0; x < control.length; x++) {
        control[x].classList.remove("wrong");
        control[x].classList.remove("right");
    }
    let img = document.getElementById('hangman');
    img.innerHTML = `<img src="./assets/images/hangman0.png" alt="">`
    right = 0;
    wrong = 0;
}

function newWord() {
    genWord();
    let arr = word.split("");
    let html = "";
    for (let x of arr) {
        html = html + `<span class="letter" data-letter="${x}">
            <p class="not-guessed">${x}</p>
        </span>`
    }
    let container = document.getElementById('word')
    container.innerHTML = html;
}

function checkGuess(event) {
    event.preventDefault();
    let guess = this.getAttribute("data-key");
    let letter = "";
    let correct = false;
    let arr = word.split("")
    for (let x of arr) {
        if (x === guess) {
            correct = true;
        }
    }
    if (correct === true) {
        rightAns(event)
        let span = document.getElementsByClassName('letter');
        for (let y of span) {
            letter = y.getAttribute("data-letter");
            if (letter === guess) {
                y.firstElementChild.classList.remove("not-guessed");
                let audio = document.getElementById('correct-sfx');
                audio.play();
                right++;
            }
        }
    } else {
        let audio = document.getElementById('wrong-sfx');
        audio.play();
        wrongAns(event)
    }
    checkEnd()
}


function checkEnd() {
    if (right === word.length) {
        let congrats = document.getElementById('congrats');
        let congratsText = document.getElementById('congrats-text');
        let html = `<p>The word was ${word}</p>`
        congratsText.innerHTML = html;
        congrats.classList.remove('modal-close');
    } else if (wrong === 11) {
        let gameOver = document.getElementById('game-over');
        let gameOverText = document.getElementById('game-over-text');
        let html = `<p>The word was ${word}</p>`
        gameOverText.innerHTML = html;
        gameOver.classList.remove('modal-close');
    }
}

function genWord() {
    if (difficulty === 'hard') {
        word = hard[Math.floor(Math.random() * hard.length)];
    } else if (difficulty === 'medium') {
        word = medium[Math.floor(Math.random() * medium.length)];
    } else {
        word = easy[Math.floor(Math.random() * easy.length)];
    }

}

/**
 * To open and close modals
 */
function openModal(event) {
    event.preventDefault();
    let type = this.getAttribute("data-start");
    if (type === "new-game") {
        closeModal();
        let open = document.getElementById('diff-select');
        open.classList.remove('modal-close');
    } else {
        let open = document.getElementById('how-to');
        open.classList.remove('modal-close');
    }
}

function closeModal() {
    let close =document.getElementsByClassName('modal');
    for (let x of close) {
        x.classList.add('modal-close');
    }

}
/**
 * allows the player to control the game through the keyboard 
 * 
 */
function keyControls(event){
    let key = event.key;
    let pressed = document.querySelectorAll(`[data-key='${key}']`);
    pressed[0].click();
}
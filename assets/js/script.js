let control = document.getElementsByClassName('control');
for (let x = 0; x < control.length; x++) {
    control[x].addEventListener("click", checkGuess);
}
let openPopup = document.getElementsByClassName('open-modal');
for (let x = 0; x < openPopup.length; x++) {
    openPopup[x].addEventListener("click", openModal);
}
let closePopup = document.getElementsByClassName('close-modal');
for (let x = 0; x < closePopup.length; x++) {
    closePopup[x].addEventListener("click", closeModal);
}
let diffSelect = document.getElementsByClassName('diff-select');
for (let x = 0; x < diffSelect.length; x++) {
    diffSelect[x].addEventListener("click", startGame);
}
window.addEventListener('keydown', keyControls);
document.getElementById('mute-button').addEventListener('change', muteSfx);
var wrong = 0;
var right = 0;
var word = "start";
var mute = true;
var gameStart = false;
var time = 10;
var difficulty = 'easy';
var easy = ['have', 'say', 'get', 'make', 'know', 'take', 'see', 'come', 'look', 'want', 'give', 'use', 'tell', 'ask', 'work', 'seem', 'feel', 'call'];
var medium = ['think', 'leave', 'lonely', 'climb', 'skilful', 'modern', 'safety', 'people', 'weird', 'women', 'Saturday', 'health', 'forty', 'diary', 'lovely', 'design', 'issue'];
var hard = ['jazz', 'conscience', 'audible', 'diamond', 'industrial', 'buried', 'knowledge', 'argument', 'material', 'column', 'stomach', 'acquire', 'essential', 'courteous', 'mortgage', 'minutes', 'friends'];
/**
 *Called when the user enters an incorrect guess. 
 *Turns the pressed key red and advances the hangman image by one
 */
function wrongAns(event) {
    event.preventDefault();
    event.target.classList.add("wrong");
    event.target.classList.add("guessed");
    let img = document.getElementById('hangman');
    wrong++;
    img.innerHTML = `<img src="./assets/images/hangman${wrong}.png" alt="an partly drawn image of a man hanging from a set of gallows drawn in the style of the childerns game hangman indicating that the players have ${10-wrong} guesses left">`;
}
/**
 *Called when the user enters an correct guess. 
 *Turns the pressed key green and updates the word to show all correct guesses"
 */
function rightAns(event) {
    event.preventDefault();
    event.target.classList.add("right");
    event.target.classList.add("guessed");
}
/**
 * The fuction run when user clicks on the start game button.
 * It clears the game board and generates a new word to be guessed
 */
function startGame(event) {
    event.preventDefault();
    difficulty = this.getAttribute("data-diff");
    let newGameBtn = document.getElementsByClassName('new-game');
    for (let x of newGameBtn) {
        let html = "New Game";
        x.innerHTML = html;
    }
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
        control[x].classList.remove("guessed");
    }
    let img = document.getElementById('hangman');
    img.innerHTML = `<img src="./assets/images/hangman0.png" alt="">`;
    resetTime();
    right = 0;
    wrong = 0;
    gameStart = true;
    let wordContainer = document.getElementById('word');
    wordContainer.classList.remove('long');
    wordContainer.classList.remove('really-long');
}
/**
 * updates the game interface with a new word 
 */
function newWord() {
    genWord();
    let arr = word.split("");
    let html = "";
    for (let x of arr) {
        html = html + `<p data-letter="${x}"><span class="letter not-guessed" data-letter="${x}">${x}</span></p>`;
    }
    let container = document.getElementById('word');
    container.innerHTML = html;
}
/**
 * checks the players input to see if the guess is correct
 */
function checkGuess(event) {
    event.preventDefault();
    if (event.target.classList.contains("guessed")) {
        // do nothing
    } else {
        resetTime();
        let guess = this.getAttribute("data-key");
        let correct = false;
        let arr = word.split("");
        for (let x of arr) {
            if (x === guess) {
                correct = true;
            }
        }
        if (correct === true) {
            rightAns(event);
            let span = document.getElementsByClassName('letter');
            for (let y of span) {
                let letter = y.getAttribute("data-letter");
                if (letter === guess) {
                    y.classList.remove("not-guessed");
                    if (mute === false) {
                        let audio = document.getElementById('correct-sfx');
                        audio.play();
                    }
                    right++;
                }
            }
        } else {
            let audio = document.getElementById('wrong-sfx');
            if (mute === false) {
                audio.play();
            }
            wrongAns(event);
        }
        checkEnd();
    }
}
/**
 * After the players guess has been checked it checks the game state to see if the win/loss condition has been met.
 */
function checkEnd() {
    if (right === word.length) {
        congrats();
    } else if (wrong === 10) {
        gameOver();
    }
}
/**
 * generatates a new word to be guessed
 */
function genWord() {
    if (difficulty === 'hard') {
        word = hard[Math.floor(Math.random() * hard.length)];
    } else if (difficulty === 'medium') {
        word = medium[Math.floor(Math.random() * medium.length)];
    } else {
        word = easy[Math.floor(Math.random() * easy.length)];
    }
    if (word.length > 7) {
        let wordContainer = document.getElementById('word');
        wordContainer.classList.add('long');
    } else if (word.length > 9) {
        let wordContainer = document.getElementById('word');
        wordContainer.classList.add('really-long');
    }

}
/**
 * To open the how to play and game start modals
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
/**
 * closes all modals
 */
function closeModal() {
    let close = document.getElementsByClassName('modal');
    for (let x of close) {
        x.classList.add('modal-close');
    }
}
/**
 * allows the player to control the game through the keyboard 
 * 
 */
function keyControls(event) {
    let key = event.key;
    if (key === 'Enter') {
        closeModal();
        let open = document.getElementById('diff-select');
        open.classList.remove('modal-close');
    } else if ((/[a-zA-Z]/).test(key)) {
        let pressed = document.querySelectorAll(`[data-key='${key}']`);
        if (Boolean(pressed[0])){
            pressed[0].click();
        }
    } else {
        // do nothing
    }
}
/**
 * allows the player to mute the games sfxs
 */
function muteSfx() {
    if (mute === false) {
        mute = true;
    } else {
        mute = false;
    }
}
/**
 * updates the timer and updates the fail condition if the timer reaches zero
 */
function updateTimer() {
    if (gameStart === true) {
        time--;
        let timer = document.getElementsByClassName('timer');
        timer[0].innerHTML = `<p>Time: ${time}</p>`;
        if (time <= 1) {
            let img = document.getElementById('hangman');
            wrong++;
            img.innerHTML = `<img src="./assets/images/hangman${wrong}.png" alt="">`;
            resetTime();
            checkEnd();
            if (mute === false) {
                let audio = document.getElementById('wrong-sfx');
                audio.play();
            }
        }
    }
}
/**
 * calls the updateTimer function every second
 */
window.setInterval(function () {
    updateTimer();
}, 1000);
/**
 * resets the timer
 */
function resetTime() {
    time = 11;
    let timer = document.getElementsByClassName('timer');
    timer[0].innerHTML = `<p>Time: 10</p>`;
}
/**
 * run when the player runs out of guesses 
 */
function gameOver() {
    for (let x = 0; x < control.length; x++) {
        control[x].classList.add("guessed");
    }
    let gameOver = document.getElementById('game-over');
    let gameOverText = document.getElementById('game-over-text');
    let html = `<p>The word was ${word}</p>`;
    gameOverText.innerHTML = html;
    gameOver.classList.remove('modal-close');
    gameStart = false;
}
/**
 * run when the player has correctly guessed the word.
 */
function congrats() {
    for (let x = 0; x < control.length; x++) {
        control[x].classList.add("guessed");
    }
    let congrats = document.getElementById('congrats');
    let congratsText = document.getElementById('congrats-text');
    let html = `<p>The word was ${word}</p>`;
    congratsText.innerHTML = html;
    congrats.classList.remove('modal-close');
    gameStart = false;
}
import { words } from './word.js'

const inputBox = document.querySelector('.form input');
const wordDiv = document.querySelector('.content .word span');
const scoreBox = document.querySelector('.content-footer .score span');
const timeBox = document.querySelector('.content-footer .time-left .time-value');
const errorMsg = document.querySelector('.content .game-over');
const resetBtn = document.querySelector('.content .game-over button');
const wrongWordMsg = document.querySelector('.form span')
let maxTime = 5;
let update;

inputBox.addEventListener('keypress', checkWord);

function checkWord(e) {
    let word = inputBox.value;
    if (e.code == 'Enter' && !errorMsg.classList.contains('active')) {
        clearInterval(update);
        updateTime();
        if (word == "") {
            console.log('Please enter something!!')
        }
        else if (word == wordDiv.textContent) {
            maxTime = 5;
            if (inputBox.classList.contains('wrongWord')) {
                inputBox.classList.remove('wrongWord');
                wrongWordMsg.classList.remove('active');
            }
            console.log('Word matched')
            updateScore();
        }
        else {
            inputBox.classList.add('wrongWord');
            wrongWordMsg.classList.add('active');
            console.log('Incorrect Word')
        }
    }

}

// Add random word to our wordDiv;
function displayWord() {
    let randWord = words[Math.floor(Math.random() * words.length)]

    wordDiv.innerHTML = randWord;
    inputBox.value = "";

}

//Funtion to updateScore after each correct word
function updateScore() {
    scoreBox.innerText = +scoreBox.textContent + 5;
    displayWord();
}

// function to updateTime after every second
function updateTime() {
    update = setInterval(() => {
        if (maxTime > 0) {
            --maxTime;
            timeBox.innerText = maxTime;
        }
        else {
            clearInterval(update);
            errorMsg.classList.add('active');
            inputBox.classList.add('disable');
            inputBox.setAttribute('disabled', '');
            // if (inputBox.classList.contains('wrongWord')) {
            //     inputBox.classList.remove('wrongWord');


            // }

            console.log('Interval cleared');
        }

    }, 1000);


}

// funtionality to Reset once it's hit Game Over state
resetBtn.addEventListener('click', resetAll);

function resetAll() {
    errorMsg.classList.remove('active');
    inputBox.classList.remove('disable');
    inputBox.removeAttribute('disabled');
    wrongWordMsg.classList.remove('active');
    inputBox.classList.remove('wrongWord');
    scoreBox.innerText = '0';
    timeBox.innerText = '5';
    inputBox.value = "";
    maxTime = 5
    displayWord();
}

//displaying Random words 
displayWord();
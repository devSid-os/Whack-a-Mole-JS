const moundsDiv = document.getElementsByClassName("mounds");
const startBtn = document.getElementById("startBtn");
const score = document.getElementById("score");
var currentScore = 0;
var gameInterval = null;

function incrementScore(num) {
    const str = moundsDiv[num].children[0].src;
    if (str.includes("mole")) {
        ++currentScore;
        score.textContent = "Score: " + currentScore;
    }
}

function hideMole(num) {
    moundsDiv[num].children[0].src = "./img/mound.png";
}

function showMole() {
    const randomNumber = Math.floor(Math.random() * moundsDiv.length);
    moundsDiv[randomNumber].children[0].src = "./img/mole.png";
    setTimeout(() => hideMole(randomNumber), 1100);
}

function gameOver() {
    clearInterval(gameInterval);
    score.classList.add("hidden");
    startBtn.classList.remove("hidden");
    score.textContent = "Score: 0";
    currentScore = 0;
}

function startGame() {
    currentScore = 0;
    gameInterval = setInterval(showMole, 1100);
    setTimeout(gameOver, 20000);
}

startBtn.addEventListener("click", function () {
    startBtn.classList.add("hidden");
    score.classList.remove("hidden");
    startGame();
});
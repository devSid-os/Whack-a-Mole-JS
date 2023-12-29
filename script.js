const moundsDiv = document.getElementsByClassName("mounds");
const startBtn = document.getElementById("startBtn");
const score = document.getElementById("score");
var currentScore = 0;
var gameInterval = null;

// Function to increment Score when game is in start mode
function incrementScore(num) {
    const str = moundsDiv[num].children[0].src;
    if (str.includes("mole")) {
        ++currentScore;
        score.textContent = "Score: " + currentScore;
    }
}

// Function to remove Mole
function hideMole(num) {
    moundsDiv[num].children[0].src = "./img/mound.png";
}
// Function to show mole
function showMole() {
    const randomNumber = Math.floor(Math.random() * moundsDiv.length);
    moundsDiv[randomNumber].children[0].src = "./img/mole.png";
    // Hide mole After every 1 second and 100 miliseconds
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
    // show mole after every 1 seconds and 100 miliseconds
    gameInterval = setInterval(showMole, 1100);
    // End game after 20 seconds
    setTimeout(gameOver, 20000);
}

startBtn.addEventListener("click", function () {
    startBtn.classList.add("hidden");
    score.classList.remove("hidden");
    startGame();
});
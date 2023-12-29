const moundsDiv = document.getElementsByClassName("mounds");
const startBtn = document.getElementById("startBtn");
const score = document.getElementById("score");
const overlay = document.getElementById("overlay");
const currentScoreDetailsDiv = document.getElementById("currentScoreDetails");
const retryBtn = document.getElementById("retry");
const userNameInput = document.getElementById("userName");
const localStorageScoreDetails = localStorage.getItem("scoreDetails") || new Array;
var currentScore = 0;
var gameInterval = null;

function saveScoreDetails() {
    var scoreObj = new Object;
    scoreObj.name = userNameInput.value;
    scoreObj.score = currentScore;
    localStorageScoreDetails.push(scoreObj);
    localStorage.setItem("scoreDetails", JSON.stringify(localStorageScoreDetails));
}

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
    overlay.classList.remove("hidden");
    currentScoreDetailsDiv.classList.remove("hidden");
    score.classList.add("hidden");
    startBtn.classList.remove("hidden");
    score.textContent = "Score: 0";
    userNameInput.value = "";
}

function startGame() {
    currentScore = 0;
    // show mole after every 1 seconds and 100 miliseconds
    gameInterval = setInterval(showMole, 1100);
    // End game after 20 seconds
    setTimeout(gameOver, 20000);
}

retryBtn.addEventListener("click", function () {
    overlay.classList.add("hidden");
    currentScoreDetailsDiv.classList.add("hidden");
    startBtn.classList.add("hidden");
    score.classList.remove("hidden");
    startGame();
});



startBtn.addEventListener("click", function () {
    startBtn.classList.add("hidden");
    score.classList.remove("hidden");
    startGame();
});

userNameInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        if (userNameInput.value.length) {
            saveScoreDetails();
        }
        else {
            currentScoreDetailsDiv.classList.add("hidden");
            overlay.classList.add("hidden");
        }
    }
})
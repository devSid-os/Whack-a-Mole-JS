const moundsDiv = document.getElementsByClassName("mounds");
const startBtn = document.getElementById("startBtn");
const score = document.getElementById("score");
const overlay = document.getElementById("overlay");
const currentScoreDetailsDiv = document.getElementById("currentScoreDetails");
const retryBtn = document.getElementById("retry");
const userNameInput = document.getElementById("userName");
const scoreTableDiv = document.getElementById("scoreTable");
var localStorageScoreDetails = JSON.parse(localStorage.getItem("scoreDetails")) || new Array;
var currentScore = 0;
var gameInterval = null;

function showScoreTable() {
    var tableIndex = 0;
    scoreTableDiv.classList.remove("hidden");
    // localStorageScoreDetails.sort((a, b) => {
    //     return b.score - a.score;
    // })
    localStorageScoreDetails.map(item => {
        ++tableIndex;
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        td1.classList.add("border", "border-black", "font-bold", "text-center", "text-2xl", "tracking-wider", "bg-white");
        td2.classList.add("border", "border-black", "font-bold", "text-center", "text-2xl", "tracking-wider", "bg-white");
        td3.classList.add("border", "border-black", "font-bold", "text-center", "text-2xl", "tracking-wider", "bg-white");
        td1.textContent = tableIndex;
        td2.textContent = item.name;
        td3.textContent = item.score;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        document.getElementById("scoreTableBody").appendChild(tr);
    });
}

function saveScoreDetails() {
    var obj = new Object;
    obj.name = userNameInput.value;
    obj.score = currentScore;
    if (localStorageScoreDetails.length < 8) {
        localStorageScoreDetails.push(obj);
    }
    else {
        var tempArr;
        tempArr = localStorageScoreDetails.filter(item => item.score >= currentScore);
        if (tempArr.length < 8) {
            tempArr.push(obj);
            var bottomScores = localStorageScoreDetails.filter(item => currentScore > item.score);
            bottomScores.pop();
            tempArr = tempArr.concat(bottomScores);
            localStorageScoreDetails = tempArr;
        }
    }
    localStorageScoreDetails.sort((a, b) => {
        return b.score - a.score;
    })
    localStorage.setItem("scoreDetails", JSON.stringify(localStorageScoreDetails));
    currentScoreDetailsDiv.classList.add("hidden");
    showScoreTable();
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
    setTimeout(gameOver, 10000);
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
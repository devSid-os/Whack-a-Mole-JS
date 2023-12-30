const moundsDiv = document.getElementsByClassName("mounds");
const startBtn = document.getElementById("startBtn");
const score = document.getElementById("score");
const overlay = document.getElementById("overlay");
const currentScoreDetailsDiv = document.getElementById("currentScoreDetails");
const retryBtn = document.getElementById("retry");
const userNameInput = document.getElementById("userName");
const scoreTableDiv = document.getElementById("scoreTable");
const scoreTableBody = document.getElementById("scoreTableBody");
const lvlBtn = document.getElementById("level");
var localStorageScoreDetails = JSON.parse(localStorage.getItem("scoreDetails")) || new Array;
var currentScore = 0;
var gameInterval = null;
var gameTime = 25000;
var moleSpeed = 1100;

lvlBtn.addEventListener("click", () => {
    if (lvlBtn.textContent.includes("EASY")) {
        lvlBtn.textContent = "HARD?";
        moleSpeed = 1100;
    }
    else {
        lvlBtn.textContent = "EASY?";
        moleSpeed = 550;
    }
});


// Function to close score table div
function closeScoreTableDiv() {
    // Hide overlay and score table on button click
    scoreTableDiv.classList.add("hidden");
    overlay.classList.add("hidden");
    // and empty table body
    while (scoreTableBody.firstChild) {
        scoreTableBody.removeChild(scoreTableBody.firstChild);
    }
}

// Function that shows score Table div
function showScoreTable() {
    // variable for table index
    var tableIndex = 0;
    // show score table
    scoreTableDiv.classList.remove("hidden");
    // Insert rows and show localstorage data
    localStorageScoreDetails.map(item => {
        ++tableIndex;
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        td1.classList.add("border", "border-black", "font-bold", "text-center", "py-2", "text-2xl", "tracking-wider", "bg-white");
        td2.classList.add("border", "border-black", "font-bold", "text-center", "py-2", "text-2xl", "tracking-wider", "bg-white");
        td3.classList.add("border", "border-black", "font-bold", "text-center", "py-2", "text-2xl", "tracking-wider", "bg-white");
        if (tableIndex === 1) {
            td1.id = "firstPlace";
            td1.classList.add("text-[#ffa500]");
        }
        else if (tableIndex === 2) {
            td1.id = "secondPlace";
            td1.classList.add("text-[#ccc]");
        }
        else if (tableIndex === 3) {
            td1.id = "thirdPlace";
            td1.classList.add("text-[brown]");
        }
        td1.textContent = tableIndex;
        td2.textContent = item.name;
        td3.textContent = item.score;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        document.getElementById("scoreTableBody").appendChild(tr);
    });
}
// Function to save user score and user name
function saveScoreDetails() {
    // save score and name in an object
    var obj = new Object;
    obj.name = userNameInput.value;
    obj.score = currentScore;
    // if there are less than 8 records than push
    // user score and name to localstorage 
    if (localStorageScoreDetails.length < 8) {
        localStorageScoreDetails.push(obj);
    }
    else {
        // if there are already 8 records than
        // filter all records and update the top 8 scores
        var topScores = localStorageScoreDetails.filter(item => item.score >= currentScore);
        if (topScores.length < 8) {
            topScores.push(obj);
            var bottomScores = localStorageScoreDetails.filter(item => currentScore > item.score);
            bottomScores.pop();
            topScores = topScores.concat(bottomScores);
            localStorageScoreDetails = topScores;
        }
    }
    localStorageScoreDetails.sort((a, b) => {
        return b.score - a.score;
    })
    localStorage.setItem("scoreDetails", JSON.stringify(localStorageScoreDetails));
    currentScoreDetailsDiv.classList.add("hidden");
    showScoreTable();
}

// Function to remove Mole
function hideMole(num) {
    moundsDiv[num].children[0].src = "./img/mound.png";
}
// Function to show mole
function showMole() {
    const randomNumber = Math.floor(Math.random() * moundsDiv.length);
    moundsDiv[randomNumber].children[0].src = "./img/mole.png";
    // Hide mole After every 1 second and 100 miliseconds (Default)
    setTimeout(() => hideMole(randomNumber), moleSpeed);
}

// Function to increment Score when game is in start mode
function incrementScore(num) {
    const str = moundsDiv[num].children[0].src;
    if (str.includes("mole")) {
        ++currentScore;
        score.textContent = "Score: " + currentScore;
    }
    hideMole(num);
}

function gameOver() {
    lvlBtn.classList.remove("hidden");
    clearInterval(gameInterval);
    overlay.classList.remove("hidden");
    currentScoreDetailsDiv.classList.remove("hidden");
    score.classList.add("hidden");
    startBtn.classList.remove("hidden");
    score.textContent = "Score: 0";
    userNameInput.value = "";
}

function startGame() {
    lvlBtn.classList.add("hidden");
    currentScore = 0;
    // show mole after every 1 seconds and 100 miliseconds (Default)
    gameInterval = setInterval(showMole, moleSpeed);
    // End game after 20 seconds
    setTimeout(gameOver, gameTime);
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
});
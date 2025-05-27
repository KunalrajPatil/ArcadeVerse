
window.onload = function () {
    setGame();
    document.getElementById("restart-btn").addEventListener("click", restartGame);
}

let highScore = localStorage.getItem("highScore") ? parseInt(localStorage.getItem("highScore")) : 0;
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("high-score").innerText = "High Score: " + highScore;
});

function setGame() {
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    setInterval(setMole, 1500);
    setInterval(setPlant, 2000);
}

let currentMoleTile;
let currentPlantTile;
let score = 0;
let gameOver = false;

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) return;
    if (currentMoleTile) currentMoleTile.innerHTML = "";

    let mole = document.createElement("img");
    mole.src = "./monty-mole.png";

    let num = getRandomTile();
    if (currentPlantTile && currentPlantTile.id == num) return;
    
    currentMoleTile = document.getElementById(num);
    currentMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) return;
    if (currentPlantTile) currentPlantTile.innerHTML = "";

    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png";

    let num = getRandomTile();
    if (currentMoleTile && currentMoleTile.id == num) return;
    
    currentPlantTile = document.getElementById(num);
    currentPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) return;
    
    if (this == currentMoleTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString();
    } else if (this == currentPlantTile) {
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
        }
        document.getElementById("high-score").innerText = "High Score: " + highScore;
        document.getElementById("score").innerText = "Game Over: " + score.toString();
        gameOver = true;
    }
}

function restartGame() {
    score = 0;
    gameOver = false;
    document.getElementById("score").innerText = score.toString();
    
    if (currentMoleTile) currentMoleTile.innerHTML = "";
    if (currentPlantTile) currentPlantTile.innerHTML = "";
    
    // Add button styling dynamically
    let restartBtn = document.getElementById("restart-btn");
    restartBtn.style.backgroundColor = "#ffcc00";
    restartBtn.style.border = "2px solid white";
    restartBtn.style.padding = "10px 20px";
    restartBtn.style.fontSize = "18px";
    restartBtn.style.cursor = "pointer";
    restartBtn.style.borderRadius = "10px";
    restartBtn.style.marginTop = "20px";
}

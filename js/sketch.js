let grid;
let grid_new;
let score = 0;
var scores = [];
var maxi=0;

function setup() {
    score = 0;
    createCanvas(400, 400);
    grid = blankGrid();
    grid_new = blankGrid();
    addNumber();
    addNumber();
    updateCanvas();

}

function lot() {
    let gamewon = isGameWon();
    let gameover = isGameOver();
    let flipped = false;
    let rotated = false;

    grid = flipGrid(grid);
    grid = transposeGrid(grid);
    grid = flipGrid(grid);

    flipped = true;

    played = true;

    if (played) {
        let past = copyGrid(grid);
        for (let i = 0; i < 4; i++) {
            grid[i] = operate(grid[i]);
        }
        let changed = compare(past, grid);
        if (flipped) {
            grid = flipGrid(grid);
        }
        if (rotated) {
            grid = transposeGrid(grid);
        }
        if (changed) {
            addNumber();
        }
        updateCanvas();

        let gameover = isGameOver();
        var i = 0;

        var scoresp = document.getElementById("scores");
        var tops = document.getElementById("top");

        if(scores[i]>maxi){
            maxi=scores[i];
            tops.innerHTML = "<h2>Top:<h2> "+maxi;
        }
        if (gameover) {
            scores[i] = score;
            console.log(scores);
            scoresp.innerHTML += "<h2>Last scores</h2>" + scores[i] +", ";
            console.log("GAME OVER");
            i++;
            setup();
        }
    
        let gamewon = isGameWon();
        if (gamewon) {
            console.log("GAME WON");
        }
    }
}

function updateCanvas() {
    background(255);
    drawGrid();
    select('#score').html(score);

}

function drawGrid() {
    let w = 100;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            noFill();
            strokeWeight(2);
            let val = grid[i][j];
            let s = val.toString();
            if (grid_new[i][j] === 1) {
                stroke(200, 0, 200);
                strokeWeight(16);
                grid_new[i][j] = 0;
            } else {
                strokeWeight(4);
                stroke(0);
            }

            if (val != 0) {
                fill(colorsSizes[s].color);
            } else {
                noFill();
            }
            rect(i * w, j * w, w, w, 30);
            if (val !== 0) {
                textAlign(CENTER, CENTER);
                noStroke();
                fill(0);
                textSize(colorsSizes[s].size);
                text(val, i * w + w / 2, j * w + w / 2);
            }
        }
    }
}
setInterval(lot, 100);

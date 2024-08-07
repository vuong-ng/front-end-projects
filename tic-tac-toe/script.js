var gameOver = true;
var user = {};
var computer = {};
const sideLength = 4;
var filledCellNumber = 0;

// variables:
// user, computer, gameOver, sideLength 
// start a game => choose sideLength => create board => user go first 

// create board
// reset user
// getUserChoice => record user choice and display the choice
// displayScore

// flow 
function reset() {
    user = {
        row_map : {},
        col_map : {},
        wins : 0,
        symbol:"O",
        name:"You"
    }
    computer = {
        row_map : {},
        col_map : {},
        wins : 0,
        symbol: "X",
        name:"Computer"
    }
}

function createBoard (sideLength) {
    const col_freq = {};
    const row_freq = {};
    const board = document.getElementsByClassName('board')[0];
    for (let r = 0; r < sideLength; r++){
        var col = `col${r}`;
        var row =`row${r}`;
        col_freq[col] = 0;
        row_freq[row] = 0;
        for (let c = 0; c < sideLength; c++){
            const cell = document.createElement('div');
            cell.setAttribute('class', `row${r} col${c}`);
            cell.setAttribute('id', `grid-cell`);
            cell.addEventListener("click", function() {
                if (cell.innerHTML == "") {
                    var attribute = this.getAttribute("class");
                    var position = attribute.split(" ");
                    recordChoice(user, position);
                    console.log("after clicked", user.row_map)
                    this.innerHTML = "O";
                    filledCellNumber +=1;
                    getComputerChoice();
                }
            })
            board.appendChild(cell);
        }
    }
    board.style.display = "grid";
    board.style.border ='2px solid #f0f0f0';
    board.style.gridTemplateColumns = `repeat(${sideLength}, ${100/4}%)`;
    // board.style.gridTemplateRows = `repeat(${sideLength}, 50px)`;

    // board.style.gridTemplateRows = `repeat{${sideLength}, 1fr}`;
    user.col_map = col_freq;
    user.row_map = row_freq;
    console.log(user.col_map, user.row_map);
    computer.col_map = col_freq;
    computer.row_map = row_freq;
    console.log(computer.row_map, computer.col_map);
}

function getComputerChoice() {
    while (true) {
        const col_num = Math.floor(Math.random() * (sideLength - 0));
        const row_num = Math.floor(Math.random() * (sideLength - 0));
        var position = `row${row_num} col${col_num}`;
        const cell = document.getElementsByClassName(position)[0];
        if (cell.innerHTML === "") {
            filledCellNumber +=1;
            cell.innerHTML = computer.symbol;
            recordChoice(computer, position);
            break;
        } 
    }
}

function recordChoice(player, position){
    // position is the cell's attribute string 
    const row = position[0];
    const col = position[1];
    player.row_map[row] += 1;
    player.col_map[col] += 1;
    if (player.row_map[row] === sideLength || player.col_map[col] === sideLength){
        player.wins +=1;
        gameOver = true;
        if(player.name == "You") {
            alert("You win!");
        }
        else{
            alert("You lose!!!");
        }
    }
}

function playRound() {
    if (gameOver) {
        reset();
        createBoard(4);
        gameOver = false;
    }
    if (filledCellNumber == sideLength*sideLength) {
        gameOver = true;
    }
    if (user.wins === 3 ) {
        gameOver = true;
        alert("You win!");
    }
    if (computer.wins === 3) {
        gameOver = true;
        alert("You lose!");
    }
}
playRound();

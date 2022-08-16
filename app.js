const player = document.getElementById("player");
const btn = document.getElementById("restart");
const boxs = document.querySelectorAll(".box");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame(){
    boxs.forEach(box => box.addEventListener("click", boxClicked));
    btn.addEventListener("click", restartGame);
    player.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function boxClicked(){
    const idx = this.getAttribute("idx");

    if(options[idx] != "" || !running){
        return;
    }

    updateBox(this, idx);
    checkWinner();
}

function updateBox(box, index){
    options[index] = currentPlayer;
    box.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    player.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const boxA = options[condition[0]];
        const boxB = options[condition[1]];
        const boxC = options[condition[2]];

        if(boxA == "" || boxB == "" || boxC == ""){
            continue;
        }
        if(boxA == boxB && boxB == boxC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        player.textContent = `${currentPlayer} Wins!`;
        running = false;
    }
    else if(!options.includes("")){
        player.textContent = `Draw!`;
        running = false;
    }
    else{
        changePlayer();
    }
    
}

function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    player.textContent = `${currentPlayer}'s turn`;
    boxs.forEach(box => box.textContent = "");
    running = true;
}


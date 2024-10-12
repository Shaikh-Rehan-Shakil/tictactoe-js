// Getting elements from DOM and storing them as constants to make them easier to access.
const cells = document.querySelectorAll(".cells"); 
const statusText = document.querySelector(".status");
const resetBtn = document.querySelector(".resetButton");

// Win conditions is a 2D array that will be used to check for a win. 
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

let options = ["","","","","","","","",""]; // Representing clickable cells.
let currentPlayer = "X"; // Active player.
let running = true; // Whether the game is running or not.

initializeGame(); // Initialize the game.

function initializeGame() {
    // Iterates over each cell and adds an event listener to each one, running the cellClicked function on click.
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    
    // Adds an event listener to the reset button.
    resetBtn.addEventListener("click", resetGame);

    // Displays the current player in the status text.
    statusText.textContent = `${currentPlayer}'s turn`;
}

function cellClicked(){
    // Gets the cellIndex attribute from the clicked cell and stores it in the index variable.
    const index = this.getAttribute("cellIndex");
    
    // Checks if the cell is already filled or if the game is not running.
    if (options[index] != "" || !running) {
        return;
    };
    
    // Calls the update function, passing the current cell and index as parameters.
    updateCell(this, index);
    
    // Calls the checkWinner function.
    checkWinner();
}

function updateCell(cell, index) {
    // Sets the element of the options array at the cell's index to the current player.
    options[index] = currentPlayer;

    // Sets the text content of the cell to the current player.
    cell.textContent = currentPlayer; 
}

function changePlayer(){
    // Uses a ternary operator to switch between players.
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`; // Updates status text.
}

function checkWinner(){
    let roundWon = false; // Stores whether a round has been won.

    // Iterates over the winConditions array to check for a win.
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i]; // Stores each win condition (an array of indices).

        // Retrieves the values of the options array at the indices specified in the win condition.
        const cellA = options[condition[0]]; 
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        // If any of the three cells in the condition are blank, skip this condition.
        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        // If all three cells are the same, a round is won
        else if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            break;
        }
    }

    // If a round is won, update the status text and stop the game.
    if (roundWon) {
        statusText.innerHTML = `${currentPlayer} Wins.`; // Displays the winner.
        running = false; // Stops the game.
    }
    // If all cells are filled but no one has won, it's a draw.
    else if (!options.includes("")) {
        statusText.textContent = "It's a draw."; // Displays a draw message.
        running = false; // Stops the game.
    }
    // If neither condition is true, switch to the other player.
    else {
        changePlayer();
    }
}

function resetGame(){
    // Resets the game state.
    currentPlayer = "X"; // Resets to player X.
    options = ["","","","","","","","",""]; // Clears the options array.
    statusText.textContent = `${currentPlayer}'s turn`; // Resets the status text.
    cells.forEach(cell => cell.textContent = ""); // Clears the cell content.
    running = true; // Sets the game as running again.
}

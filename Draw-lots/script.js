let totalSquares = 140; // Default number of squares
let jackpots = []; // Dynamically added jackpots
let prizePositions = []; // Array to store prize positions
let previousTextShown = null; // Variable to track the previous revealed text

function addJackpot() {
    const prizeInput = document.getElementById("prize-input");
    const prize = prizeInput.value.trim();
    
    if (prize) {
        jackpots.push(prize);
        displayJackpots();
        prizeInput.value = ''; // Clear the input
    } else {
        alert('Please enter a valid jackpot.');
    }
}

function displayJackpots() {
    const jackpotList = document.getElementById("jackpot-list");
    jackpotList.innerHTML = jackpots.map((jackpot, index) => `<li id="prize-${index}">${jackpot}</li>`).join('');
}

function deletePrizes() {
    jackpots = []; // Clear the prize array
    document.getElementById("jackpot-list").innerHTML = ''; // Clear the prize list
    document.getElementById("grid-container").innerHTML = ''; // Clear the grid
    alert('Prizes have been deleted. Add new ones to play.');
}

function initializeGame() {
    const squareInput = document.getElementById("square-input");
    totalSquares = parseInt(squareInput.value) || 140; // Get the number of squares or default to 140

    if (jackpots.length === 0) {
        alert('Please add some jackpots first.');
        return;
    }

    const gridContainer = document.getElementById("grid-container");
    gridContainer.innerHTML = ''; // Clear the grid
    prizePositions = [];

    // Randomly assign jackpots to some squares
    for (let i = 0; i < jackpots.length; i++) {
        let randomPosition;
        do {
            randomPosition = Math.floor(Math.random() * totalSquares);
        } while (prizePositions.includes(randomPosition)); // Avoid duplicates
        prizePositions.push(randomPosition);
    }

    // Create squares
    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.dataset.index = i;

        // Assign event listener to reveal prize
        square.addEventListener("click", function() {
            revealSquare(square);
        });

        gridContainer.appendChild(square);
    }
}

function revealSquare(square) {
    const index = square.dataset.index;

    // Hide the previous revealed text if any
    if (previousTextShown) {
        previousTextShown.classList.remove("show");
        previousTextShown.classList.add("hide");
    }

    const revealedTextElement = document.getElementById("revealed-text");

    // Check if the square contains a prize
    if (prizePositions.includes(parseInt(index))) {
        const prizeIndex = prizePositions.indexOf(parseInt(index));
        const prize = jackpots[prizeIndex];
        square.textContent = prize;
        square.classList.add("revealed-prize");

        // Mark prize as revealed in the prize list
        const prizeListItem = document.getElementById(`prize-${prizeIndex}`);
        prizeListItem.classList.add("revealed-prize");

        // Show the revealed prize in large text
        showRevealedText(prize);
    } else {
        square.textContent = "Try Again";
        square.classList.add("try-again");

        // Show "Try Again" in large text
        showRevealedText("Try Again");
    }

    // Trigger the fade-in effect for the square
    square.classList.add("revealed");

    // Disable further clicks
    square.removeEventListener("click", () => revealSquare(square));
}

function showRevealedText(text) {
    const revealedTextElement = document.getElementById("revealed-text");
    revealedTextElement.textContent = text;
    
    // Fade-in the current revealed text
    revealedTextElement.classList.remove("hide");
    revealedTextElement.classList.add("show");

    // Track the current revealed text for hiding it later
    previousTextShown = revealedTextElement;
}

// Variables 
let userScore = 0;
let computerScore = 0;
let rounds = 0;
let currentRound = 0;

// Function to switch views
function showPage(pageId) {
    document.querySelectorAll('section').forEach(section => section.classList.add('hidden'));
    document.getElementById(pageId).classList.remove('hidden');
}

// Main Menu Functions
function showPreviousScores() {
    alert(`User: ${userScore} points | Computer: ${computerScore} points`);
}

function quitGame() {
    alert("Thanks for playing!");
}

// Game Mode Selection
function startNewGame() {
    userScore = 0;
    computerScore = 0;
    showPage('round-selection');
}

function continueGame() {
    showPage('round-selection');
}

// Set Rounds
function setRounds() {
    const roundInput = document.getElementById('round-input').value;
    rounds = parseInt(roundInput) || 1;

    // Input validation
    if (rounds <= 0) {
        document.getElementById("warning-message").innerText = "Please enter a valid number of rounds.";
        return;
    } else {
        document.getElementById("warning-message").innerText = ""; // Clear warning message
    }

    currentRound = 0;
    showPage('game-play');
}

// Play Game Logic
function playerMove(playerChoice) {
    const computerChoice = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];
    
    // Check for tie situation
    if (playerChoice === computerChoice) {
        alert(`This round was a Tie! You both selected ${playerChoice}. Try again this round.`);
        return; // Stay in the same round
    }

    currentRound++;

    let result = '';
    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        userScore++;
        result = 'You win this round!';
    } else {
        computerScore++;
        result = 'Computer wins this round!';
    }

    // Show popup message for the round result
    alert(`Round Result: ${result} \nYou selected: ${playerChoice} \nComputer selected: ${computerChoice}`);

    document.getElementById('score-table').textContent = 
        `Current Round: ${currentRound} | User: ${userScore} points | Computer: ${computerScore} points`;

    // Check if game has ended
    if (currentRound >= rounds) {
        showPage('results');
        document.getElementById('final-result').textContent = 
            `Final Score - User: ${userScore} | Computer: ${computerScore}`;
    }
}
// Restart Game
function restartGame() {
    showPage('main-menu');
}

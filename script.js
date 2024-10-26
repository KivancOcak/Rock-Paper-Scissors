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
    currentRound = 0;
    showPage('game-play');
}

// Play Game Logic
function playerMove(playerChoice) {
    const computerChoice = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];
    currentRound++;

    let result = '';
    if (playerChoice === computerChoice) {
        result = "It's a draw!";
    } else if (
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

    document.getElementById('score-table').textContent = 
        `Current Round: ${currentRound} | User: ${userScore} points | Computer: ${computerScore} points`;

    if (currentRound >= rounds) {
        showPage('results');
        document.getElementById('final-result').textContent = 
            `Final Score - User: ${userScore} | Computer: ${computerScore}`;
    }
}
function askRounds() {
    const rounds = prompt("How many rounds do you wish to play?");
    
    // Check if the input is empty or not a number
    if (!rounds || isNaN(rounds) || rounds <= 0) {
        // Display warning message
        alert("Please enter a valid number of rounds."); // Change to use CSS instead
        document.getElementById("warning-message").innerText = "Please enter a valid number of rounds.";
        document.getElementById("warning-message").style.color = "red"; // Set warning message to red
        return;
    }
    
    roundsCount = parseInt(rounds);
    currentRound = 1;
    userScore = 0;
    computerScore = 0;
    playGame();
}
// Restart Game
function restartGame() {
    showPage('main-menu');
}
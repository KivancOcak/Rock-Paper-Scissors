let userScore = 0;
let computerScore = 0;
let currentRound = 0;
let rounds = 1;

function displayMessage(message, messageType) {
    const messageBox = document.getElementById('message-box');
    messageBox.innerText = message;

    // Clear previous color classes
    messageBox.classList.remove('winner', 'loser', 'tie');

    // Add the appropriate class based on the message type
    if (messageType === 'winner') {
        messageBox.classList.add('winner');
    } else if (messageType === 'loser') {
        messageBox.classList.add('loser');
    } else if (messageType === 'tie') {
        messageBox.classList.add('tie');
    }

    // Add visible class for animation
    messageBox.classList.add('visible');
}

function resetGame() {
    userScore = 0;
    computerScore = 0;
    currentRound = 0;
    displayMessage("");
    document.getElementById("score-table").textContent = 
        `Current Round: 0 | User: 0 points | Computer: 0 points`;
}

function showPage(pageId) {
    // Get all pages
    const pages = document.querySelectorAll('section');

    // Hide all pages and remove visible class
    pages.forEach(page => {
        page.classList.remove('visible');
        page.style.display = 'none'; // Initially hide to enable transition
    });

    // Show the selected page
    const selectedPage = document.getElementById(pageId);
    selectedPage.style.display = 'block'; // Make it visible for the transition
    requestAnimationFrame(() => {
        selectedPage.classList.add('visible'); // Add visible class to trigger transition
    });
}

function showPreviousScores() {
    displayMessage(`User: ${userScore} points | Computer: ${computerScore} points`);
}

function quitGame() {
    displayMessage("Thanks for playing!");
}

function startNewGame() {
    userScore = 0;
    computerScore = 0;
    currentRound = 0;
    rounds = 1;
    displayMessage(""); // Clear any existing messages
    showPage('round-selection'); // Go to round selection page
}

function continueGame() {
    if (userScore === 0 && computerScore === 0) {
        displayMessage("No game in progress. Start a new game.");
    } else {
        showPage('game-play'); // Go directly to gameplay if there’s an ongoing score
        displayMessage(`Continuing Game: Current Score - User: ${userScore}, Computer: ${computerScore}`);
    }
}

function setRounds() {
    const roundInput = document.getElementById('round-input').value;
    rounds = parseInt(roundInput) || 1;

    if (rounds <= 0) {
        document.getElementById("warning-message").innerText = "Please enter a valid number of rounds.";
        return;
    }
    document.getElementById("warning-message").innerText = "";

    resetGame();
    showPage('game-play');
}

// Play Game Logic
function playerMove(playerChoice) {
    // Clear previous messages as the player makes a new move
    const messageBox = document.getElementById('message-box');
    messageBox.innerText = ""; // Clear the message box before processing the move
    
    const computerChoice = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];
    
    // Check for tie situation
    if (playerChoice === computerChoice) {
        displayMessage(`This round was a Tie! You both selected ${playerChoice}. Try again this round.`, 'tie');
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
        displayMessage(result, 'winner');
    } else {
        computerScore++;
        result = 'Computer wins this round!';
        displayMessage(result, 'loser');
    }

    // Show message for the round result
    displayMessage(`Round Result: ${result} \nYou selected: ${playerChoice} \nComputer selected: ${computerChoice}`, result === 'You win this round!' ? 'winner' : 'loser');

    document.getElementById('score-table').textContent = 
        `Current Round: ${currentRound} | User: ${userScore} points | Computer: ${computerScore} points`;

    // Check if game has ended
    if (currentRound >= rounds) {
        showPage('results');
        document.getElementById('final-result').textContent = 
            `Final Score - User: ${userScore} | Computer: ${computerScore}`;
        displayMessage(""); // Clear the message box on the results page
    }
}

function restartGame() {
    showPage('main-menu');
    const messageBox = document.getElementById('message-box');
    messageBox.classList.remove('visible'); // Hide the message box
}

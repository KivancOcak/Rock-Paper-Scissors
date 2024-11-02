let userScore = 0;
let computerScore = 0;
let currentRound = 0;
let rounds = 1;

function displayMessage(message, messageType) {
    const messageBox = document.getElementById('message-box');
    messageBox.innerText = message;

    
    messageBox.classList.remove('winner', 'loser', 'tie');

    
    if (messageType === 'winner') {
        messageBox.classList.add('winner');
    } else if (messageType === 'loser') {
        messageBox.classList.add('loser');
    } else if (messageType === 'tie') {
        messageBox.classList.add('tie');
    }

    
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
    
    const pages = document.querySelectorAll('section');


    pages.forEach(page => {
        page.classList.remove('visible');
        page.style.display = 'none'; // Initially hide to enable transition
    });

    
    const selectedPage = document.getElementById(pageId);
    selectedPage.style.display = 'block'; 
    requestAnimationFrame(() => {
        selectedPage.classList.add('visible'); 
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
    showPage('round-selection'); 
}

function continueGame() {
    if (userScore === 0 && computerScore === 0) {
        displayMessage("No game in progress. Start a new game.");
    } else {
        showPage('game-play'); 
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


function playerMove(playerChoice) {
  
    const messageBox = document.getElementById('message-box');
    messageBox.innerText = ""; 
    
    const computerChoice = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];
    
   
    if (playerChoice === computerChoice) {
        displayMessage(`This round was a Tie! You both selected ${playerChoice}. Try again this round.`, 'tie');
        return; 
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

   
    displayMessage(`Round Result: ${result} \nYou selected: ${playerChoice} \nComputer selected: ${computerChoice}`, result === 'You win this round!' ? 'winner' : 'loser');

    document.getElementById('score-table').textContent = 
        `Current Round: ${currentRound} | User: ${userScore} points | Computer: ${computerScore} points`;

    
    if (currentRound >= rounds) {
        showPage('results');
        document.getElementById('final-result').textContent = 
            `Final Score - User: ${userScore} | Computer: ${computerScore}`;
        displayMessage(""); 
    }
}

function restartGame() {
    showPage('main-menu');
    const messageBox = document.getElementById('message-box');
    messageBox.classList.remove('visible');
}

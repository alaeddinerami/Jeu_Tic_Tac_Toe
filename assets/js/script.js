
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.bordContainer');
    const turnDisplay = document.getElementById('turn');
    const player1Name = document.getElementById('playerOneName');
    const player2Name = document.getElementById('playerTowName');
    const player1Score = document.getElementById('scorePlayerOne');
    const player2Score = document.getElementById('scorePlayerTow');
  
    const playerX = localStorage.getItem('playerOne');
    const playerO = localStorage.getItem('playerTow');
    
    
  
    let currentPlayer = 'X';
  
    for (let i = 0; i < 400; i++) {
      const box = document.createElement('div');
      box.classList.add('box');
      
      box.addEventListener('click', () => {
        if (box.textContent === '') {
          box.textContent = currentPlayer;
          
          
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateTurnDisplay();
        }
      });
  
      container.appendChild(box);
    }
    function updateTurnDisplay() {
      if (currentPlayer === 'X') {
        turnDisplay.textContent = `${playerX}'s Turn`;
      } else {
        turnDisplay.textContent = `${playerO}'s Turn`;
      }
    }
  
    function checkWin() {
      
    }
  
    function resetGame() {
      container.querySelectorAll('.box').forEach(box => {
        box.textContent = '';
      });
      currentPlayer = 'X';
      updateTurnDisplay();
    }
  
    
  
    document.getElementById('playAgain').addEventListener('click', resetGame);
    
  
    updateTurnDisplay();
  });
  




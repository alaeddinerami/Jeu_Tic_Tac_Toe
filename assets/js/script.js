  document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.bordContainer');
    const turnDisplay = document.getElementById('turn');
    const playerOne = document.querySelector("#playerOneName");
    const playerTwo = document.querySelector("#playerTowName"); 
    const player1Score = document.getElementById('scorePlayerOne');
    const player2Score = document.getElementById('scorePlayerTow'); 
    const playersData = JSON.parse(localStorage.getItem("playersScores")) || [];

    if (playersData.length > 0) {
      const playerX = playersData[playersData.length - 1].playerOneName;
      const playerO = playersData[playersData.length - 1].playerTwoName;

      playerOne.textContent = playerX;
      playerTwo.textContent = playerO;

      const scores = {
        [playerX]: playersData[playersData.length - 1].scorePlayerOne || 0,
        [playerO]: playersData[playersData.length - 1].scorePlayerTwo || 0,
      };

      player1Score.textContent = scores[playerX];
      player2Score.textContent = scores[playerO];

      let currentPlayer = 'X';

      for (let i = 0; i < 400; i++) {
        const box = document.createElement('div');
        box.classList.add('box');
        
        box.addEventListener('click', () => {
          if (box.textContent === '') {
            box.textContent = currentPlayer;
            
            const winner = checkWin(); 
            
            if (winner) {
              if (winner === 'X') {
                scores[playerX]++;
                player1Score.textContent = scores[playerX];
                alert(`${playerX} wins!`);
              } else {
                scores[playerO]++;
                player2Score.textContent = scores[playerO];
                alert(`${playerO} wins!`);
              }
              
              playersData[playersData.length - 1].scorePlayerOne = scores[playerX];
              playersData[playersData.length - 1].scorePlayerTwo = scores[playerO];
              localStorage.setItem("playersScores", JSON.stringify(playersData));

              resetGame();
            } else {
              currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
              updateTurnDisplay();
            }
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
    } else {
      console.log('No players data found in localStorage');
    }


    function checkWin() {
      const boxes = document.querySelectorAll('.box');
      const board = Array.from(boxes).map(box => box.textContent);
      const gridSize = 20;
      const winCondition = 5; 
    
      let grid = [];
      for (let i = 0; i < gridSize; i++) {
        grid.push(board.slice(i * gridSize, i * gridSize + gridSize));
      }
    
      for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
          if (grid[row][col] !== '') {
            if (checkDirection(grid, row, col, 1, 0, winCondition) || 
                checkDirection(grid, row, col, 0, 1, winCondition) || 
                checkDirection(grid, row, col, 1, 1, winCondition) || 
                checkDirection(grid, row, col, 1, -1, winCondition)) { 
              return grid[row][col]; 
            }
          }
        }
      }
      return null; 
    }
    
    function checkDirection(grid, row, col, rowIncrement, colIncrement, winCondition) {
      const symbol = grid[row][col];
      let count = 0;
    
      for (let i = 0; i < winCondition; i++) {
        const currentRow = row + i * rowIncrement;
        const currentCol = col + i * colIncrement;
    
        if (currentRow >= 0 && currentRow < grid.length && currentCol >= 0 && currentCol < grid[0].length) {
          if (grid[currentRow][currentCol] === symbol) {
            count++;
            if (count === winCondition) {
              return true;
            }
          } else {
            break ; 
          }
        } else {
          break; 
        }
      }
      return false;
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


  document.addEventListener('DOMContentLoaded', () => {
    const historyBtn = document.getElementById('history');
    const historyModal = document.getElementById('historyModal');
    const closeModal = document.querySelector('.close');
    const historyList = document.getElementById('historyList');
  
    historyBtn.addEventListener('click', () => {
      displayHistory();
      historyModal.style.display = 'block';
    });
  
    closeModal.addEventListener('click', () => {
      historyModal.style.display = 'none';
    });
  
    window.addEventListener('click', (event) => {
      if (event.target === historyModal) {
        historyModal.style.display = 'none';
      }
    });
  
    function displayHistory() {
      const playersData = JSON.parse(localStorage.getItem('playersScores')) || [];
      historyList.innerHTML = ''; 
  
      if (playersData.length === 0) {
        historyList.innerHTML = '<li>No game history available.</li>';
      } else {
        playersData.forEach((game, index) => {
          const listItem = document.createElement('li');
          listItem.textContent = `Game ${index + 1}: ${game.playerOneName} (Score: ${game.scorePlayerOne}) vs ${game.playerTwoName} (Score: ${game.scorePlayerTwo})`;
          historyList.appendChild(listItem);
        });
      }
    }
  });
  
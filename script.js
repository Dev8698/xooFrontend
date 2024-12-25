var WhosTurn;
var sessionIdd;
var mainArr = [
  ['.', '.', '.'],
  ['.', '.', '.'],
  ['.', '.', '.']
];
var moveR;
var moveC;

document.addEventListener('DOMContentLoaded', () => {
    const joinGameButton = document.getElementById('join-game');
    const createGameButton = document.getElementById('create-game');
    const joinForm = document.getElementById('join-form');
    const createForm = document.getElementById('create-form');
    const joinSessionForm = document.getElementById('join-session-form');
    const createSessionForm = document.getElementById('create-session-form');
    const gameScreen = document.querySelector('.game-screen');
    const gameBoard = document.getElementById('game-board');
    const displayCode = document.getElementById('display-code');
    const playerSelf = document.getElementById('player-self');
    const playerOpponent = document.getElementById('player-opponent');
    joinGameButton.addEventListener('click', () => {
      document.querySelector('.main-screen').classList.add('hidden');
      joinForm.classList.remove('hidden');

    });
  
    createGameButton.addEventListener('click', () => {
      document.querySelector('.main-screen').classList.add('hidden');
      createForm.classList.remove('hidden');
      
    });
  
    joinSessionForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = document.getElementById('join-name').value;
      const sessionCode = document.getElementById('session-code').value;
      
      fetch(`http://192.168.255.183:8090/api/joinsession?opponent_name=${encodeURIComponent(name)}&sessionId=${encodeURIComponent(sessionCode)}`, {
        method: "POST",
      }).then((res)=> res.text())
      .then((creatoorName)=> {
        sessionIdd = sessionCode;
        WhosTurn = 1;
        setupGame(name, sessionCode, creatoorName);
      })
      .catch((error) => {
        console.error("Error creating session:", error); // Handle any errors
      });
      
    });
    

    createSessionForm.addEventListener('submit', (event) => {
      event.preventDefault();
    
      const name = document.getElementById('create-name').value; // Get the name from the input field
      const data = { creator_name: name }; // Prepare the data object
    
      // Send the request to the backend
      fetch(`http://192.168.255.183:8090/api/createsession?creator_name=${encodeURIComponent(name)}`, {
        method: "POST",
      })
        .then((res) => res.text()) // Parse response as plain text
        .then((sessionCode) => {
          sessionIdd = sessionCode;
          // Pass the session code to the setupGame function
          setupGame(name, sessionCode, "Waiting for Opponent");
          WhosTurn = 0;
        })
        .catch((error) => {
          console.error("Error creating session:", error); // Handle any errors
        });
    });
    
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms*1000));
    }



    async function fetchOpponent(sessionCode) {
      await sleep(10);
      fetch(`http://192.168.255.183:8090/api/getopponentname?sessionId=${encodeURIComponent(sessionCode)}`, {
        method: "POST",
      })
        .then((res) => res.text())
        .then((opponent) => {
          if (opponent !== "none") {
            playerOpponent.textContent = opponent; // Update the opponent's name
            // opponentName = opponent; // Update the global opponentName
          } else {
            // setTimeout(fetchOpponent(sessionCode), 4000); 
            // console.log("a");

            console.log("u");
            fetchOpponent(sessionCode);// Wait 4 seconds and try again
          }
        })
        .catch((error) => {
          console.error("Error fetching opponent:", error);
        });
    }
    
    // Set up interval to fetch every 4 seconds
    

    function setupGame(name, sessionCode, opponentName) {
      joinForm.classList.add('hidden');
      createForm.classList.add('hidden');
      gameScreen.classList.remove('hidden');
      displayCode.textContent = sessionCode;
      playerSelf.textContent = name;
      playerOpponent.textContent = opponentName;
      
      if(opponentName==="Waiting for Opponent"){
        fetchOpponent(sessionCode);
      }
     
      initializeBoard();
    }
  
    function initializeBoard() {
      gameBoard.innerHTML = '';
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        gameBoard.appendChild(cell);
      }
    }
  //
    function UpdateMove(sessionId, X, Y){
      fetch(`http://192.168.255.183:8090/api/postmove?sessionId=${encodeURIComponent(sessionId)}&X=${encodeURIComponent(X)}&Y=${encodeURIComponent(Y)}`, {
        method: "POST",
      })
        .then((res) => res.text())
        .then((statuss) => {
          console.log(statuss);
        }).catch((error) => {
          console.error("Error fetching opponent:", error);
        });
    }

    function mainArrHandler(index,move) {
      if (index == 0) {
        mainArr[0][0]=move;
        moveR=0;
        moveC=0;
        UpdateMove(sessionIdd,moveR,moveC);
      }
      else if (index == 1){
        mainArr[0][1] = move;
        moveR=0;
        moveC=1;
        UpdateMove(sessionIdd,moveR,moveC);
      }
      else if (index == 2){
        mainArr[0][2] = move;
        moveR=0;
        moveC=2;
        UpdateMove(sessionIdd,moveR,moveC);
      }
      else if (index == 3){
        mainArr[1][0] = move;
        moveR=1;
        moveC=0;
        UpdateMove(sessionIdd,moveR,moveC);
      }
      else if (index == 4){
        mainArr[1][1] = move;
        moveR=1;
        moveC=1;
        UpdateMove(sessionIdd,moveR,moveC);
      }
      else if (index == 5){
        mainArr[1][2] = move;
        moveR=1;
        moveC=2;
        UpdateMove(sessionIdd,moveR,moveC);
      }
      else if (index == 6){
        mainArr[2][0] = move;
        moveR=2;
        moveC=0;
        UpdateMove(sessionIdd,moveR,moveC);
      }
      else if (index == 7){
        mainArr[2][1] = move;
        moveR=2;
        moveC=1;
        UpdateMove(sessionIdd,moveR,moveC);
      }
      else if (index == 8){
        mainArr[2][2] = move;
        moveR=2;
        moveC=2;
        UpdateMove(sessionIdd,moveR,moveC);
      }
    }

    async function CurrentMoveChecker(sessionId) {
      await sleep(3);
      console.log("CurrentMoveChecker");
      fetch(`http://192.168.255.183:8090/api/getmove?sessionId=${encodeURIComponent(sessionId)}`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((statuss) => {
          if (statuss.row==moveR && statuss.col==moveC) {
            CurrentMoveChecker(sessionId);
          }
          else{
            console.log(statuss.row);
            console.log(statuss.col);
            moveR = statuss.row;
            moveC = statuss.col;
            // if (WhosTurn == 0) {
            //   cell.textContent = 'O';
            //   mainArrHandler(cell.dataset.index,'O');
            // }else if (WhosTurn == 1) {
            //   cell.textContent = 'X';
            //   mainArrHandler(cell.dataset.index,'x');
            // }
          }
        }).catch((error) => {
          console.error("Error fetching opponent:", error);
        });
    }

    function handleCellClick(event) {
      const cell = event.target;

      if (WhosTurn == 0 ) {
         
      }

      if (cell.textContent === '') {
        
        console.log(cell.dataset.index);
        // Add logic to handle opponent's move and check for win/draw.
        if (WhosTurn == 0 ) {
          cell.textContent = 'X';
          mainArrHandler(cell.dataset.index,'x');
          CurrentMoveChecker(sessionIdd);
          if (WhosTurn == 0) {
            cell.textContent = 'O';
            mainArrHandler(cell.dataset.index,'O');
          }else if (WhosTurn == 1) {
            cell.textContent = 'X';
            mainArrHandler(cell.dataset.index,'x');
          }
        }
        else if (WhosTurn == 1){
          cell.textContent = 'O';
          mainArrHandler(cell.dataset.index,'o');
          CurrentMoveChecker(sessionIdd);
          if (WhosTurn == 0) {
            cell.textContent = 'O';
            mainArrHandler(cell.dataset.index,'O');
          }else if (WhosTurn == 1) {
            cell.textContent = 'X';
            mainArrHandler(cell.dataset.index,'x');
          }
        }

      }
    }
  });


  
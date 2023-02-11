let GameBoard = (function () {
  let board = [];

  const createBoard = () => {
    const content = document.getElementById('content');
    const cells = document.createElement('div');
    cells.setAttribute('id', 'cells');
    content.insertBefore(cells, content.querySelector('#restart'));

    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('button');
      cell.setAttribute('id', i);
      cells.append(cell);
    }
  };
  const reset = () => {
    board = [];
    return board;
  };
  return { board, createBoard, reset };
})();

const main = document.querySelector('#main');

const playerTurn = document.createElement('div');

playerTurn.setAttribute('id', 'winner');
main.insertBefore(playerTurn, content);

const Game = (function () {
  const restart = document.getElementById('restart');
  restart.addEventListener('click', (e) => {
    GameBoard.board = GameBoard.reset();
    startGame();
    console.log(GameBoard.board);
  });
  const startGame = () => {
    let turn = 0;
    const cells = document.getElementById('cells');
    const places = cells.querySelectorAll('button');
    for (let i = 0; i < 9; i++) {
      cells.childNodes.forEach((child) => (child.textContent = ''));
    }
    playerTurn.textContent = `Player 1 turn`;
    playerTurn.style.backgroundColor = 'teal';
    places.forEach((button) => {
      button.addEventListener(
        'click',
        (e) => {
          if (displayWinner(GameBoard.board)) {
            return;
          }

          GameBoard.board[e.target.id] = turn % 2 == 0 ? 'X' : '0';
          e.target.textContent = GameBoard.board[e.target.id];
          turn++;
          const currentTurn = turn % 2 === 0 ? 'Player 1' : 'Player 2';
          playerTurn.textContent = `${currentTurn} Turn`;
          const winner = displayWinner(GameBoard.board);
          if (winner) {
            playerTurn.textContent = `${winner} is the Winner`;
            playerTurn.style.backgroundColor =
              winner == 'Player 1' ? 'lightgreen' : 'lightsalmon';
          }
          if (
            !GameBoard.board.includes(undefined) &&
            GameBoard.board.length == 9 &&
            !winner
          ) {
            console.log(GameBoard.board);
            playerTurn.textContent = 'It is a tie';
            playerTurn.style.backgroundColor = 'yellow';
          }
        },
        { once: true }
      );
    });
  };

  const isGameOver = (board) => {
    if (board[0] === board[1] && board[0] === board[2] && board[0]) {
      return board[0] === 'X' ? 'Player 1' : 'Player 2';
    } else if (board[3] === board[4] && board[3] === board[5] && board[3]) {
      return board[3] === 'X' ? 'Player 1' : 'Player 2';
    } else if (board[6] === board[7] && board[6] === board[8] && board[6]) {
      return board[6] === 'X' ? 'Player 1' : 'Player 2';
    } else if (board[0] === board[3] && board[0] === board[6] && board[0]) {
      return board[0] === 'X' ? 'Player 1' : 'Player 2';
    } else if (board[1] === board[4] && board[1] === board[7] && board[1]) {
      return board[1] === 'X' ? 'Player 1' : 'Player 2';
    } else if (board[2] === board[5] && board[2] === board[8] && board[2]) {
      return board[2] === 'X' ? 'Player 1' : 'Player 2';
    } else if (board[0] === board[4] && board[0] === board[8] && board[0]) {
      return board[0] === 'X' ? 'Player 1' : 'Player 2';
    } else if (board[2] === board[4] && board[2] === board[6] && board[2]) {
      return board[2] === 'X' ? 'Player 1' : 'Player 2';
    } else return false;
  };

  const displayWinner = (board) => {
    const winner = isGameOver(board);
    if (winner) {
      return winner;
    } else {
      return false;
    }
  };
  return { displayWinner, startGame };
})();

GameBoard.createBoard();
Game.startGame();

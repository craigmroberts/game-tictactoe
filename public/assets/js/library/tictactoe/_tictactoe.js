var TicTacToe = {
  board: '.board', // board class
  computerPlaySpeed: 200, // represents how fast the computer plays, 200 milliseconds
  currentMove: false, // currentMove represents which players turn it currently is, it will either be "player" or "computer"
  playersPiece: 'x', // represents the user/players piece, either x or o.
  computersPiece : (this.playersPiece === 'o') ? 'x' : 'o', // represents the computers piece, always opposite to players
  square: '.board__square', // the board square class
  status: false,
  // represents the game status.
  // TicTacToe.status is:
  //   '?' if game is not finished, in progress
  //   'x' if game has been won by X
  //   'o' if game has been won by O
  //   't' if game is a tie/draw (no moves left, no winner)
  //   'false' means that the game has not yet played
  boardToString: [0, 0, 0, 0, 0, 0, 0, 0, 0], // boardString represents the contents of the 9 cells of the board
  //     |   |
  //   0 | 1 | 2
  // ----+---+----
  //   3 | 4 | 5
  // ----+---+----
  //   6 | 7 | 8
  //     |   |

  score: {

    update: function() {
      // this function updates the games scoreboard onscreen

      // check if the game is not in progress.
      // only update the scoreboard if the game has been won or there is a tie.
      if (TicTacToe.status !== '?') {

        App.updateContent();
/*
        // update the scores on the scoreboard
        $('.board-stats .tie .score').html(TicTacToe.stats.totalTies);
        $('.board-stats .player .score').html(TicTacToe.stats.totalWon);
        $('.board-stats .computer .score').html(TicTacToe.stats.totalLost);

        // update best time
        if (TicTacToe.Timer.bestTime) {
          $('.board-stats .best-time .score').html(TicTacToe.Timer.bestTime);
        }
        */
      }
    }
  },

  takeTurn: function(el) {
    // this function is called when the play has clicked a square
    // which means the player has taken their turn
    // this function is then called by the computer to take its turn

    // check if this is the first move of the game
    if (!TicTacToe.status) {
      // a new game has began
      TicTacToe.Timer.start(); // start timer
      TicTacToe.status = '?'; // update game status to in progress (?)
    }

    // check who move this is
    // add piece to board and update boardString
    var squareIndx = TicTacToe.check.bestMove(); // find the best move for the computer
    var currentGamePiece = TicTacToe.computersPiece;

    if (TicTacToe.currentMove === 'player') {
      // its the players move
      // update variables for player vvv
      squareIndx = el.index();
      currentGamePiece = TicTacToe.playersPiece;

      // players move is over, change current move to computer
      TicTacToe.currentMove = 'computer';

    } else if (TicTacToe.currentMove === 'computer') {
      // its the computers move
      // computers move is over, change current move to player
      TicTacToe.currentMove = 'player';
    }

    // add current players piece to board
    $(TicTacToe.square).eq(squareIndx).addClass('board__square--taken board__square__' + currentGamePiece);
    // update boardString to match the board game thats being played
    TicTacToe.boardToString[squareIndx] = currentGamePiece;

    // check if there is a winner
    TicTacToe.check.win();

    // check if there is a tie
    TicTacToe.check.tie();

    if (TicTacToe.status !== '?') {
      TicTacToe.Timer.end();
    }

    // play the appropriate sound
    TicTacToe.sound.play();

    // if the game is in progress and it is now the computers turn
    // tell the computer its his/hers turn :)
    // the turn is delayed by the properts computerPlaySpeed
    if (TicTacToe.status === '?' && TicTacToe.currentMove === 'computer') {

      setTimeout(function() {
        // make the computers move straight after the player
        // delay the move by a 0.7 millisecond
        TicTacToe.takeTurn();
      }, TicTacToe.computerPlaySpeed);
    }

    if (TicTacToe.status !== '?') {
      // if the game has ended

      // update all stats
      TicTacToe.stats.updateAll();

      // update the game score after each turn
      TicTacToe.score.update();

      TicTacToe.Player.updateStats(function(response) {

      });

      // check if the board needs to be reset
      TicTacToe.reset();
    }

  },

  check: {

    tie: function() {

      // check if the game is in progress (?)
      if (TicTacToe.status === '?') {

        // check if all squares on the board is occupied.
        // If so there is no more moves. The game is a tie
        for (var i = 0; i < TicTacToe.boardToString.length; i++) {
          if (TicTacToe.boardToString[i] === 0) {
            return false;
          }
        }

        // update the game status to tie (t)
        TicTacToe.status = 't';

        // animate the board. Make the borders blink/flash
        $(TicTacToe.board).addClass('board--blink-borders');

        return true;
      }
    },

    win: function() {

      // check if the game has been won by going through the board String
      // find if there is any 3 of the same pieces that are connect horizontally,
      // diagonally or vertically
      var winner = TicTacToe.check.winningRow(0, 1, 2) || // check for 3-in-a-row horizontally
        TicTacToe.check.winningRow(3, 4, 5) ||
        TicTacToe.check.winningRow(6, 7, 8) ||
        TicTacToe.check.winningRow(0, 3, 6) || // check for 3-in-a-row vertically
        TicTacToe.check.winningRow(1, 4, 7) ||
        TicTacToe.check.winningRow(2, 5, 8) ||
        TicTacToe.check.winningRow(0, 4, 8) || // check for 3-in-a-row diagonally
        TicTacToe.check.winningRow(6, 4, 2);

      // check if there is a winner
      if (winner) {
        // the result has found a winning line

        // update the game status to won by adding the
        // winning players piece. x or o
        TicTacToe.status = winner.gamePiece;

        // animate the board. Make the borders blink/flash
        $(TicTacToe.board).addClass('board--blink-winner');

        // make the winning row blink
        for (var i = 0; i < 3; i++) {
          // loop through the winning cells and add blink class
          $(TicTacToe.square).eq(winner.cells[i]).addClass('board__square--win');
        }
      }
    },

    winningRow: function(c1, c2, c3) {
      // check if all cells match. also check that they arent empty (0)
      if (TicTacToe.boardToString[c1] === TicTacToe.boardToString[c2] && TicTacToe.boardToString[c2] === TicTacToe.boardToString[c3] && TicTacToe.boardToString[c1] !== 0) {
        // all cells match! This is a winning row!
        // return winning piece and winning cells.
        return {
          cells: [c1, c2, c3],
          gamePiece: TicTacToe.boardToString[c1]
        };
      }
      // this is note a winning row. Return false
      return false;
    },

    bestMove : function() {
      // find the best move for the computer to play
      // the best move wouuld to be to win or to block the player from winning

      var winningMove = TicTacToe.check.findBestMove(TicTacToe.computersPiece);
      var blockingMove = TicTacToe.check.findBestMove(TicTacToe.playersPiece);

      var bestMove = blockingMove;

      // if there is a winning move...
      if (winningMove || winningMove === 0) {
        // Set best move to be winning move
        bestMove = winningMove;
      }
      // if there isnt a best move, winning or blocking. choose a random cell
      if (!bestMove && bestMove !== 0) {

        // return a random square
        bestMove = TicTacToe.getAvailableSquares();

        // choose a random cell from available spaces
        bestMove = bestMove[Math.floor(Math.random() * bestMove.length)];
      }

      return bestMove;
    },

    findBestMove : function(gamePiece) {

      // check for 3-in-a-row horizontally
      var move = TicTacToe.check.getBestMove(0, 1, 2, gamePiece);
      move = (!move && move !== 0) ? TicTacToe.check.getBestMove(3, 4, 5, gamePiece) : move;
      move = (!move && move !== 0) ? TicTacToe.check.getBestMove(6, 7, 8, gamePiece) : move;

      // check for 3-in-a-row vertically
      move = (!move && move !== 0) ? TicTacToe.check.getBestMove(0, 3, 6, gamePiece) : move;
      move = (!move && move !== 0) ? TicTacToe.check.getBestMove(1, 4, 7, gamePiece) : move;
      move = (!move && move !== 0) ? TicTacToe.check.getBestMove(2, 5, 8, gamePiece) : move;

      // check for 3-in-a-row diagonally
      move = (!move && move !== 0) ? TicTacToe.check.getBestMove(0, 4, 8, gamePiece) : move;
      move = (!move && move !== 0) ? TicTacToe.check.getBestMove(6, 4, 2, gamePiece) : move;

      return move;
    },

    getBestMove: function(c1, c2, c3, piece) {
      // find the next best move to make the game harder

      // check if other two are empty or same piece
      if (TicTacToe.boardToString[c1] === 0 && TicTacToe.boardToString[c2] === TicTacToe.boardToString[c3] && TicTacToe.boardToString[c2] === piece) { return c1;
      } else if (TicTacToe.boardToString[c2] === 0 && TicTacToe.boardToString[c1] === TicTacToe.boardToString[c3] && TicTacToe.boardToString[c1] === piece) { return c2;
      } else if (TicTacToe.boardToString[c3] === 0 && TicTacToe.boardToString[c1] === TicTacToe.boardToString[c2] && TicTacToe.boardToString[c1] === piece) { return c3;
      }

      return false;
    }
  },

  reset: function() {

      TicTacToe.boardToString = [0, 0, 0, 0, 0, 0, 0, 0, 0];

      setTimeout(function() {
        // remove all pieces
        $('.board').removeClass('board--blink-winner board--blink-borders');
        $('.board__square').removeClass('board__square--taken board__square--win board__square__o board__square__x');

        TicTacToe.status = false;
      }, 1000);
  },

  getAvailableSquares: function() {
    // create new array for unoccupied cells
    var availableSquares = new Array();
    for (var i = 0; i < TicTacToe.boardToString.length; i++) {
      // check if the cell is occupied. (0) is false
      if (!TicTacToe.boardToString[i]) {
        // add empty cell to array
        availableSquares.push(i);
      }
    }
    // return array of empty cells
    return availableSquares;
  }
}

TicTacToe.Timer = {
  startTime : 0,
  endTime : 0,
  bestTime : false,
  timeDiff : 0,

  start : function() {
    TicTacToe.Timer.startTime = new Date();
  },

  end : function() {

    TicTacToe.Timer.endTime = new Date();
    TicTacToe.Timer.timeDiff = TicTacToe.Timer.endTime - TicTacToe.Timer.startTime; //in ms

    TicTacToe.Timer.timeDiff /= 1000; // strip the ms

    // compare with best time, update best time
    if (TicTacToe.Timer.timeDiff < TicTacToe.Timer.bestTime  || !TicTacToe.Timer.bestTime) {

      if (TicTacToe.Timer.timeDiff < App.data.bestScore || App.data.bestScore == 0) {

        // update best score
        TicTacToe.Timer.bestTime = TicTacToe.Timer.timeDiff;
        $('.board-stats .best-time.hidden').removeClass('hidden');
        $('.board-stats .best-time').addClass('blink'); // make the board blink

        TicTacToe.Player.updateBestScore(function(response) {
        });
      }
    }

    return TicTacToe.Timer.timeDiff;
  }
};

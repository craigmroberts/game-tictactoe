TicTacToe.stats = {
  totalGamesPlayed : 0,
  totalWon : 0,
  totalTies : 0,
  totalLost : 0,
  totalGameTime : 0,
  averageWin : 0,
  averageGameTime : 0,
  bestStreak : 0,
  currentStreak : 0,
  bestScore : 0,

  updateAll : function() {

    if (TicTacToe.status != '?') {

      if (TicTacToe.status === 'x') {
        // player won
        TicTacToe.stats.totalWon++;
        if (TicTacToe.Timer.bestTime) {
          TicTacToe.stats.bestScore = TicTacToe.Timer.bestTime;
        }

        TicTacToe.stats.currentStreak++;

      } else if (TicTacToe.status === 'o') {
        // computer won
        TicTacToe.stats.totalLost++;
        TicTacToe.stats.currentStreak = 0;
      } else if (TicTacToe.status === 't') {
        // it was a tie
        TicTacToe.stats.totalTies++;
        TicTacToe.stats.currentStreak = 0;
      }

      if (TicTacToe.stats.currentStreak > TicTacToe.stats.bestStreak) {
        TicTacToe.stats.bestStreak = TicTacToe.stats.currentStreak;
      }

      // updates total games won
      TicTacToe.stats.totalGameTime = parseFloat(TicTacToe.Timer.timeDiff) + parseFloat(TicTacToe.stats.totalGameTime);

      TicTacToe.stats.totalGamesPlayed = (parseInt(TicTacToe.stats.totalWon) + parseInt(TicTacToe.stats.totalTies) + parseInt(TicTacToe.stats.totalLost));
      TicTacToe.stats.averageWin = (TicTacToe.stats.totalWon / TicTacToe.stats.totalGamesPlayed) * 100;

      TicTacToe.stats.averageGameTime = (parseFloat(TicTacToe.stats.averageGameTime) + parseFloat(TicTacToe.Timer.timeDiff)) / 2;
    }
  },

  getNiceTime : function(seconds) {

    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600*24));
    var h = Math.floor(seconds % (3600*24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 3600 % 60);

    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hr, " : " hrs, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " min, " : " mins, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " s" : " s") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
  },

  update : function(data) {

    TicTacToe.stats.totalGamesPlayed = data.totalGamesPlayed;
    TicTacToe.stats.totalWon = data.totalWon;
    TicTacToe.stats.totalTies = data.totalTies;
    TicTacToe.stats.totalLost = data.totalLost;
    TicTacToe.stats.totalGameTime = data.totalGameTime;
    TicTacToe.stats.averageWin = data.averageWin;
    TicTacToe.stats.averageGameTime = data.averageGameTime;
    TicTacToe.stats.bestStreak = data.bestStreak;
    TicTacToe.stats.bestScore = data.bestScore;
    TicTacToe.stats.currentStrea = data.currentStreak;

    TicTacToe.stats.totalGameTimeNice = TicTacToe.stats.getNiceTime(data.totalGameTime);
    TicTacToe.stats.averageWinNice = parseFloat(data.averageWin).toFixed(2) + '%';
    TicTacToe.stats.averageGameTimeNice = TicTacToe.stats.getNiceTime(data.averageGameTime);
  },

  getAll : function() {

    return {
      totalGamesPlayed : TicTacToe.stats.totalGamesPlayed,
      totalWon : TicTacToe.stats.totalWon,
      totalTies : TicTacToe.stats.totalTies,
      totalLost : TicTacToe.stats.totalLost,
      totalGameTime : TicTacToe.stats.totalGameTime,
      averageWin : TicTacToe.stats.averageWin,
      averageGameTime : TicTacToe.stats.averageGameTime,
      bestStreak : TicTacToe.stats.bestStreak,
      bestScore : TicTacToe.stats.bestScore,
      currentStreak : TicTacToe.stats.currentStreak,

      totalGameTimeNice : TicTacToe.stats.getNiceTime(TicTacToe.stats.totalGameTime),
      averageWinNice : parseFloat(TicTacToe.stats.averageWin).toFixed(2) + '%',
      averageGameTimeNice : TicTacToe.stats.getNiceTime(TicTacToe.stats.averageGameTime),
    }
  }
}

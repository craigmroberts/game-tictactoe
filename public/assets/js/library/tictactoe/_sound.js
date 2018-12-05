TicTacToe.sound = {
  // this sound object handles the sound/audio that is played during the game
  isMuted: false, // represents if the game has been muted, true = no sounds, false = plays sounds

  // the below are sounds that are triggered when a player has taken a move. Game is drawn or tied.
  gameover: document.getElementById("aud-gameover"),
  gameoverTie: document.getElementById("aud-gameover-tie"),
  noteHigh: document.getElementById("aud-note-high"),
  noteLow: document.getElementById("aud-note-low"),

  play: function() {
    // this function figures out what sound should be played

    // check if the game is muted
    if (!TicTacToe.sound.isMuted) {

      // check if the game is a tie
      if (TicTacToe.status === 't') {
        TicTacToe.sound.gameoverTie.play(); // play sound

      // else check if game has been won
    } else if (TicTacToe.status === 'x' || TicTacToe.status === 'o') {
        TicTacToe.sound.gameover.play(); // play sound

      // check if game is in progress
    } else if (TicTacToe.status === '?') {

        // check who moved and play their sound
        if (TicTacToe.currentMove === 'computer') {
          TicTacToe.sound.noteHigh.play(); // play sound

        // if its not the computers move it is the players
        } else {
          TicTacToe.sound.noteLow.play(); // play sound
        }
      }
    }
  }
};

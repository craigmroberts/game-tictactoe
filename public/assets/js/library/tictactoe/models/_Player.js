TicTacToe.Player = {

    updateBestScore : function(callback) {

      if (callback) {

        var query_string = App.url.api + 'user/update-score';

        App.data.bestScore = TicTacToe.Timer.bestTime;

        var obj = {
          currentDate : new Date().toLocaleString().replaceAll('/','-').replaceAll(',',''),
          action: 'updateBestScore',
          data: btoa(JSON.stringify(App.data))
        };

        jQuery.ajax({
          url: query_string,
          type: 'post',
          data: obj
        }).always(function(output) {
          output = JSON.parse(atob(output));
          if (output) {
            View.switch('tictactoe');
          }

          return callback(output);
        })
      }
    }
}

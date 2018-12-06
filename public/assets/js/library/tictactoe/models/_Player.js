TicTacToe.Player = {

    updateStats : function(callback) {

      if (callback) {

        var query_string = App.url.api + 'user/update-score';

        var data = TicTacToe.stats.getAll();
        data.id = App.data.id;

        var obj = {
          currentDate : new Date().toLocaleString().replaceAll('/','-').replaceAll(',',''),
          action: 'updateStats',
          data: btoa(JSON.stringify(data))
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

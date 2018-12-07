TicTacToe.User = {

  getByUserID : function(userID, callback) {
    if (callback) {

      var query_string = App.url.api + 'user/getUser';

      // prepare data
      App.prepareData();

      var obj = {
        currentDate : new Date().toLocaleString().replaceAll('/','-').replaceAll(',',''),
        action: 'getUser',
        data: btoa(JSON.stringify({id : userID}))
      };

      jQuery.ajax({
        url: query_string,
        type: 'post',
        data: obj
      }).always(function(output) {

        output = JSON.parse(atob(output));

        if (output.result) {
          // login success
          App.data = output.data;

          // create session with users id
          localStorage.setItem('sessionID', App.data.id, {
            expires: 30
          }); // expires 30 days

          TicTacToe.stats.update(App.data);

          App.updateContent();
          $('body').addClass('activeUser');
          View.switch('tictactoe');

          // update stats
          TicTacToe.stats.updateAll();

          if (App.data.bestScore > 0) {
            $('.best-time').removeClass('hidden');
          }
        } else {
          // error
          alert(output.message)
        }

        return callback(output);
      })
    }
  },

  login : function(callback) {

    if (callback) {

      var query_string = App.url.api + 'user/login';

      // prepare data
      App.prepareData();

      var obj = {
        currentDate : new Date().toLocaleString().replaceAll('/','-').replaceAll(',',''),
        action: 'login',
        data: btoa(JSON.stringify(App.data))
      };

      jQuery.ajax({
        url: query_string,
        type: 'post',
        data: obj
      }).always(function(output) {

        output = JSON.parse(atob(output));

        if (output.result) {
          // login success
          App.data = output.data;

          // create session with users id
          localStorage.setItem('sessionID', App.data.id, {
            expires: 30
          }); // expires 30 days

          TicTacToe.stats.update(App.data);

          App.updateContent();
          $('body').addClass('activeUser');
          View.switch('tictactoe');

          // update stats
          TicTacToe.stats.updateAll();

          if (App.data.bestScore > 0) {
            $('.best-time').removeClass('hidden');
          }
        } else {
          // error
          alert(output.message)
        }

        return callback(output);
      })
    }
  },

  signup : function(callback) {

    if (callback) {

      var query_string = App.url.api + 'user/signup';

      // prepare data
      App.prepareData();

      var obj = {
        currentDate : new Date().toLocaleString().replaceAll('/','-').replaceAll(',',''),
        action: 'signup',
        data: btoa(JSON.stringify(App.data))
      };

      jQuery.ajax({
        url: query_string,
        type: 'post',
        data: obj
      }).always(function(output) {
        output = JSON.parse(atob(output));
        if (output) {
          App.data = output.data;

          // create session with users id
          localStorage.setItem('sessionID', App.data.id, {
            expires: 30
          }); // expires 30 days

          App.updateContent();
          $('body').addClass('activeUser');
          View.switch('tictactoe');
        }

        return callback(output);
      })
    }
  },

  delete : function(callback) {

    if (callback) {

      var query_string = App.url.api + 'user/delete';

      var obj = {
        currentDate : new Date().toLocaleString().replaceAll('/','-').replaceAll(',',''),
        action: 'delete',
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
  },

  signOut : function() {
    $('body').removeClass('activeUser');
    App.data = false;
    // remove current session
    localStorage.removeItem('sessionID');
    window.location.href = '/';
  }
}

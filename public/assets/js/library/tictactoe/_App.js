var App = {
  data : false,
  url : {
    root : 'https://tictactoe.craigmroberts.com/',
    api : '/api/'
  },
  prepareData : function() {

    var form = $('#' + View.currentView + ' form input:not([type="submit"])');
    var data = {};
    for (var i = 0; i < form.length; i++) {
      data[form.eq(i).attr('name')] = form.eq(i).val();
    }
    App.data = data;
  },

  updateContent : function() {
    if (App.data) {

      var stats = TicTacToe.stats.getAll();

      for (var i = 0; i < $('[data-dynamic]').length; i++) {
        var el = $('[data-dynamic]').eq(i);
        var value = el.data('dynamic');

        if (typeof stats[value] != 'undefined'){
          el.html(stats[value]);
        } else {
          el.html(App.data[value]);
        }
      }
    }
  }
}

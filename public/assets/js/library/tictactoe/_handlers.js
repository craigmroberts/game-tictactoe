$(document).on('click', 'a[href^="#/"]', function(e) {

  location.hash = $(this).attr('href');
  var view = location.hash.split('#')[1].replaceAll('/','');
  view = (view === '') ? 'home' : view;

  View.switch(view);
});

$(document).on('click', '[data-action]', function(e) {
  e.preventDefault();
  var action = $(this).data('action');

  switch (action) {
    case 'signup':

      if (Validate.form('#form-signup')) {
        // form is ok
        TicTacToe.Person.signup(function(response) {
        });
      }

      break;
    case 'login':
      if (Validate.form('#form-login')) {
        // form is ok
        TicTacToe.Person.login(function(response) {
        });
      }

      break;
    case 'signout':
      TicTacToe.Person.signOut(function(response) {

      });
      break;
    case 'delete':
      TicTacToe.Person.delete(function(response) {
        TicTacToe.Person.signOut(function(response) {

        });
      });
      break;
  }
});

$(document).on('click', TicTacToe.square, function() {
  if (!$(this).hasClass('board__square--taken')) {
    TicTacToe.currentMove = 'player';
    TicTacToe.takeTurn($(this));
  }
});

$(document).on('click', '.btn__sound', function() {
  if ($(this).hasClass('btn__sound--mute')) {
    TicTacToe.sound.isMuted = false;
  } else {
    TicTacToe.sound.isMuted = true;
  }
  $(this).toggleClass('btn__sound--mute');
});

$(document).on('click', '.btn__language', function() {
  $('#language-menu').toggleClass('hidden');
});

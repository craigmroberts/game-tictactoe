var sessionID = localStorage.getItem('sessionID');
if (sessionID) {
  TicTacToe.User.getByUserID(sessionID,function(response) {
    console.log(sessionID);
  });

} else {
  console.log('no session');
  View.switch('home');
}

var sessionID = localStorage.getItem('sessionID');
if (sessionID) {
  TicTacToe.Person.getByUserID(sessionID,function(response) {
    console.log(sessionID);
  });

} else {
  console.log('no session');
}

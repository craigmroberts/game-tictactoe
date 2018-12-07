<div id="profile" class="page">
  <div class="page__head">
    <h2 class="page__title">{{Profile}}</h2>
    <a class="btn__back" href="#/tictactoe"></a>
  </div>
  <div class="page__content">
    <div>{{Welcome back}} <span data-dynamic="name"></span></div>
    <br/>
    <span data-action="signout" class="btn">{{Sign Out}}</span>
    <span data-action="delete" class="btn btn--red">{{Delete Account}}</span>

    <div class="stats">
      <div class="stats__row"><span class="stats__title">Total Games Played</span><strong data-dynamic="totalGamesPlayed"></strong></div>
      <div class="stats__row"><span class="stats__title">Total Games Won</span><strong data-dynamic="totalWon"></strong></div>
      <div class="stats__row"><span class="stats__title">Total Games Ties</span><strong data-dynamic="totalTies"></strong></div>
      <div class="stats__row"><span class="stats__title">Total Games Lost</span><strong data-dynamic="totalLost"></strong></div>
      <div class="stats__row"><span class="stats__title">Total Game Time</span><strong data-dynamic="totalGameTimeNice"></strong></div>
      <div class="stats__row"><span class="stats__title">Average Game Time</span><strong data-dynamic="averageGameTimeNice"></strong></div>
      <div class="stats__row"><span class="stats__title">Average Win</span><strong data-dynamic="averageWinNice"></strong></div>
      <div class="stats__row"><span class="stats__title">Best Winning Streak</span><strong data-dynamic="bestStreak"></strong></div>
      <div class="stats__row"><span class="stats__title">Fastest Win Time</span><strong data-dynamic="bestScore"></strong></div>
    </div>
  </div>
  <a class="btn__language icon icon--{language}" href='#/menu-language'></a>
</div>

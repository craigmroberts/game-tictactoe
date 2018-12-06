<div id="profile" class="page">
  <div class="topBar">
    <h2 class="viewTitle">{{Profile}}</h2>
    <a class="btn-back" href="#/tictactoe"></a>
  </div>
  <div class="content">
    <div>{{Welcome back}} <span data-dynamic="name"></span></div>
    <br/>
    <span data-action="signout" class="btn">{{Sign Out}}</span>
    <span data-action="delete" class="btn btn-red">{{Delete Account}}</span>

    <div class="stats">
      <div class="row"><span class="title">Total Games Played</span><strong data-dynamic="totalGamesPlayed"></strong></div>
      <div class="row"><span class="title">Total Games Won</span><strong data-dynamic="totalWon"></strong></div>
      <div class="row"><span class="title">Total Games Ties</span><strong data-dynamic="totalTies"></strong></div>
      <div class="row"><span class="title">Total Games Lost</span><strong data-dynamic="totalLost"></strong></div>
      <div class="row"><span class="title">Total Game Time</span><strong data-dynamic="totalGameTimeNice"></strong></div>
      <div class="row"><span class="title">Average Game Time</span><strong data-dynamic="averageGameTimeNice"></strong></div>
      <div class="row"><span class="title">Average Win</span><strong data-dynamic="averageWinNice"></strong></div>
      <div class="row"><span class="title">Best Winning Streak</span><strong data-dynamic="bestStreak"></strong></div>
      <div class="row"><span class="title">Fastest Win Time</span><strong data-dynamic="bestScore"></strong></div>
    </div>
  </div>
  <div class="btn-language {language}"></div>
</div>

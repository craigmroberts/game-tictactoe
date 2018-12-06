<div id="tictactoe" class="page">
  <a href="#/profile" class="btn-menu"></a>
  <div class="btn-sound"></div>
  <div class="board-wrap">
    <div class="board">
      <div class="square"><div></div></div>
      <div class="square"><div></div></div>
      <div class="square"><div></div></div>

      <div class="square"><div></div></div>
      <div class="square"><div></div></div>
      <div class="square"><div></div></div>

      <div class="square"><div></div></div>
      <div class="square"><div></div></div>
      <div class="square"><div></div></div>
    </div>

    <div class="board-stats">
      <div class="col player">
        <span class="title">{{Player}}<br/>(<strong>x</strong>)</span>
        <span class="score">0</span>
      </div>

      <div class="col tie">
        <span class="title">{{Tie}}<br/>&nbsp;</span>
        <span class="score">0</span>
      </div>

      <div class="col computer">
        <span class="title">{{Computer}}<br/>(<strong>o</strong>)</span>
        <span class="score">0</span>
      </div>

      <div class="col best-time hidden">
        <span class="title">{{Best Time}}</span>
        <div class="best-score"><span class="score" data-dynamic="bestScore"></span><span class="seconds">{{Seconds}}</span></div>
      </div>
    </div>
  </div>
</div>

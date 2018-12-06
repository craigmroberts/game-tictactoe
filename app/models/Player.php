<?php

  class Player extends Person {

    protected $totalGamesPlayed;
    protected $totalWon;
    protected $totalTies;
    protected $totalLost;
    protected $totalGameTime;
    protected $averageWin;
    protected $averageGameTime;
    protected $bestStreak;
    protected $bestScore;

    public function __construct() {

      //parent::__construct($property);
      //$this->bestScore = $bestScore;
    }

    public function updateStats() {

      // update players stats
      $db = Database::getInstance();
      $connection = $db->getConnection();

      // updates stats in database
      $stmt= $connection->prepare("UPDATE person_player SET totalGamesPlayed = ?, totalWon = ?, totalTies = ?, totalLost = ?, totalGameTime = ?, averageWin = ?, averageGameTime = ?, bestStreak = ?, bestScore = ? WHERE id=?");
      $result = $stmt->execute([$this->totalGamesPlayed, $this->totalWon, $this->totalTies, $this->totalLost, $this->totalGameTime, $this->averageWin, $this->averageGameTime, $this->bestStreak, $this->bestScore, $this->id]);

      return $result;
    }
  }

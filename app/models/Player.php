<?php

  class Player extends Person {

    protected $bestScore;

    public function __construct() {

      //parent::__construct($property);
      //$this->bestScore = $bestScore;
    }

    public function updateBestScore() {

      // update players best score
      $db = Database::getInstance();
      $connection = $db->getConnection();

      // delete rows from two tables
      $stmt= $connection->prepare("UPDATE person_player SET bestScore = ? WHERE id=?");
      $result = $stmt->execute([$this->bestScore, $this->id]);

      return $result;
    }
  }

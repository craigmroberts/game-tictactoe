<?php

  require_once dirname(__FILE__,2) .'/config/config.php';

  if (isset($_POST['action']) && isset($_POST['data']) && isset($_POST['currentDate'])) {

      $_POST['data'] = json_decode(base64_decode($_POST['data']));

      $response = false;
      $action = $_POST['action'];
      $data   = (object) $_POST['data'];

      switch ($action) {

        case 'getUser':
          $response = User::getUser($data->id);
          break;

        case 'login':
          $response = User::login($data);
          break;

        case 'signup':
          $response = User::signup($data);
          break;

        case 'delete':
          $person = new User();
          $person->__set('id', $data->id);
          $response = User::delete();
          break;

        case 'updateStats':
          $playerStats = new PlayerStats();
          $playerStats->__set('id', $data->id);
          $playerStats->__set('totalGamesPlayed', $data->totalGamesPlayed);
          $playerStats->__set('totalWon', $data->totalWon);
          $playerStats->__set('totalTies', $data->totalTies);
          $playerStats->__set('totalLost', $data->totalLost);
          $playerStats->__set('totalGameTime', $data->totalGameTime);
          $playerStats->__set('averageWin', $data->averageWin);
          $playerStats->__set('averageGameTime', $data->averageGameTime);
          $playerStats->__set('bestStreak', $data->bestStreak);
          $playerStats->__set('bestScore', $data->bestScore);

          $response = $playerStats->updateStats();
          break;
      }

      echo base64_encode(json_encode($response));
  }

<?php

  require_once dirname(__FILE__,2) .'/config/config.php';

  if (isset($_POST['action']) && isset($_POST['data']) && isset($_POST['currentDate'])) {

      $_POST['data'] = json_decode(base64_decode($_POST['data']));

      $response = false;
      $action = $_POST['action'];
      $data   = (object) $_POST['data'];

      switch ($action) {

        case 'getUser':
          $response = Person::getUser($data->id);
          break;

        case 'login':
          $response = Person::login($data);
          break;

        case 'signup':
          $response = Person::signup($data);
          break;

        case 'delete':
          $person = new Person();
          $person->__set('id', $data->id);
          $response = Person::delete();
          break;

        case 'updateStats':
          $player = new PlayerStats();
          $player->__set('id', $data->id);
          $player->__set('totalGamesPlayed', $data->totalGamesPlayed);
          $player->__set('totalWon', $data->totalWon);
          $player->__set('totalTies', $data->totalTies);
          $player->__set('totalLost', $data->totalLost);
          $player->__set('totalGameTime', $data->totalGameTime);
          $player->__set('averageWin', $data->averageWin);
          $player->__set('averageGameTime', $data->averageGameTime);
          $player->__set('bestStreak', $data->bestStreak);
          $player->__set('bestScore', $data->bestScore);

          $response = $player->updateStats();
          break;
      }

      echo base64_encode(json_encode($response));
  }

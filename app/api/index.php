<?php

  require_once dirname(__FILE__,2) .'/config/config.php';

  if (isset($_POST['action']) && isset($_POST['data']) && isset($_POST['currentDate'])) {

      $_POST['data'] = json_decode(base64_decode($_POST['data']));

      $response = false;
      $action = $_POST['action'];
      $data   = (object) $_POST['data'];

      switch ($action) {

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

        case 'updateBestScore':
          $player = new Player();
          $player->__set('id', $data->id);
          $player->__set('bestScore', $data->bestScore);
          $response = $player->updateBestScore();
          break;
      }

      echo base64_encode(json_encode($response));
  }

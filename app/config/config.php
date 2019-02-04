<?php

  // DEBUGGING MODE
  define('DEBUG', True); // set to True if you want to debug and display error,warnings
  define('LANG', 'en'); // represents the default language of the page

  // Set the website url
  define('SUB_DIR',   'tictactoe/');
  define('ROOT_URL',    'https://' . getenv('HTTP_HOST') . '/' . SUB_DIR);

  // DIRECTORIES
  define('ROOT_DIR',    dirname(__FILE__,3) . '/');
  define('MODEL_DIR',   ROOT_DIR . 'app/model/');
  define('VIEW_DIR',    ROOT_DIR . 'app/view/');
  define('PARTS_DIR',   ROOT_DIR . 'app/parts/');
  define('ASSETS_DIR',  ROOT_URL . 'assets/');
  define('API_DIR',     ROOT_DIR . 'api/');

  if (DEBUG) {
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
  }

  require_once ROOT_DIR .'/app/functions.php';

  $lang = json_decode(file_get_contents(ROOT_DIR .'public/assets/languages/' . getLanguage() . '.json'), true);

  // include all libraries
  foreach (glob(ROOT_DIR . "/app/libraries/*.php") as $filename) {
      require_once $filename;
  }

  // include all models
  require_once ROOT_DIR . "/app/models/User.php";
  require_once ROOT_DIR . "/app/models/PlayerStats.php";

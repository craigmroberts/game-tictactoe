<?php

  function getLanguage() {
    // get the current language of the website

    $lang = LANG; // default language set in config.php

    // check if the url has url parater
    if (isset($_GET['lang'])) {
      // the lang parameter is present, update language cookie with value
      $lang = $_GET['lang'];
      // update cookie value with the new language
      setcookie("lang", $lang, 2147483647);

      // redirect url to get rid of language paramater
      header('Location: ' . ROOT_URL);
    } else {
      // check if cookie exists
      if(isset($_COOKIE['lang'])) {
        // cookie exists, get its value
        $lang = $_COOKIE['lang'];
      } else {
        // no cookie set.
        // create new cookie with default language as value
        setcookie("lang", $lang, 2147483647);
      }
    }

    return $lang;
  }

  function compressHtml($html) {
    // this function reads in a webpage and compresses it by removing whitespaces
    $search = array(
      '/\>[^\S ]+/s',  // remove whitespaces after tags
      '/[^\S ]+\</s',  // remove whitespaces before tags
      '/(\s)+/s'       // remove multiple whitespace sequences
    );

    $replace = array('>','<','\\1');
    $html = preg_replace($search, $replace, $html);

    return $html;
  }

  function parse($html) {
    // read html and replace all placeholders with placeholder values
    global $lang;

    // replace placeholder with values
    $html = str_replace("{language}", getLanguage(), $html);

    // loop through language array and replace placeholders with associated
    // values within the language array
    foreach ($lang as $key => $value) {
      $html = str_replace("{{" . $key . "}}", $value, $html);
    }

    return $html;
  }

  function loadViews($directory) {
      if(is_dir($directory)) {
          $scan = scandir($directory);
          unset($scan[0], $scan[1]); //unset . and ..
          foreach($scan as $file) {
              if(is_dir($directory."/".$file)) {
                  loadViews($directory."/".$file);
              } else {

                if (!strrpos($directory,'404') && ($directory . $file != './index.php')) {
                  if(strpos($file, '.php') !== false) {
                      require_once($directory."/".$file);
                  }
                }
              }
          }
      }
  }

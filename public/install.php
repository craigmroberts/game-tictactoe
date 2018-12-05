<?php

  require_once '../app/libraries/Database.php';

  try {

    $db = Database::getInstance();
    $connection = $db->getConnection();

    // get sql from file
    $sql = file_get_contents("../app/data/init.sql");

    $connection->exec($sql);

    // ouput success
  	echo "Database and table users created successfully.";

  } catch(PDOException $error) {
    // output failed with error
    echo $sql . "<br>" . $error->getMessage();
  }

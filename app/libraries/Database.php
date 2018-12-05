<?php

  /*
    PHP OOP Database class using PDO and Singleton pattern. Only one instance of the class will be made, this requires less memory.
  */

  class Database {

    private $connection;
    private static $_instance;

    // DATABASE SETTINGS
    private $dbUser = 'XXX';
    private $dbPass = 'XXX';
    private $dbHost = 'XXX';
    private $dbName = 'XXX';

    /*
    Get an instance of the Database
    @return Instance
    */
    public static function getInstance() {
      if (!self::$_instance) {
        self::$_instance = new self();
      }
      return self::$_instance;
    }

    // Cosntructor
    public function __construct() {

      try {

        $options  = array(
          PDO::MYSQL_ATTR_FOUND_ROWS   => TRUE,
          PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
          PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
          PDO::ATTR_EMULATE_PREPARES   => false
        );

        $this->connection = new PDO("mysql:host=" . $this->dbHost . ";dbname=" . $this->dbName . ';charset=latin1', $this->dbUser, $this->dbPass, $options);

        // ERROR HANDLING
      } catch (PDOException $e) {
        die('Failed to connect to DB: ' . $e->getMessage());
      }
    }

    // Magic method clone is empty to prevent duplication of connection
    private function __clone(){}

    // Get the connection
    public function getConnection(){
      return $this->connection;
    }
}

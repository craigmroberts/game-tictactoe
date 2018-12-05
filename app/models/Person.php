<?php

  class Person {

    protected $id;
    protected $name;
    protected $email;
    protected $password;
    protected $roleID;

    public static $minPasswordLength = 6;

    // Runs when object is instantiated
    public function __construct() {
      $this->id = bin2hex(openssl_random_pseudo_bytes(16)); // create random guid
      $this->roleID = '0dc97da7-29b8-4c44-9d28-c6517b2abddb';
    }

    // __get MAGIC METHOD
    public function __get($property) {
      if (property_exists($this, $property)) {
        return $this->$property;
      }
    }

    // __set MAGIC METHOD
    public function __set($property, $value) {
      if (property_exists($this, $property)) {
        if ($property === 'password') {
          $this->$property = $this->encryptString($value);;
        } else {
          $this->$property = $value;
        }
      }
      return $this->$property;
    }

    public function __desruct() {
    }

    static private function get_by_email($data) {
      // returns a person object if email matches in db

      // connect to databaase
      $db = Database::getInstance();
      $connection = $db->getConnection();

      // get ststs from person_player table
      $sql = "SELECT * FROM person INNER JOIN person_player ON person.id=person_player.id WHERE person.email=?";
      $stmt= $connection->prepare($sql);
      $stmt->execute([$data->email]);

      // use a while loop instead of fetchAll for future manipulation
      while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $arr[] = (object) $row;
      }

      if (count($arr) === 1) {
        // return single row as object instead of array
        return $arr[0];
      }

      return $arr;
    }

    static private function verifyPassword($passwordString, $personsPassword) {
      // check if the password string matches the users in the db

        // check it the password matches that users hash
        if (self::verifyEncryptedString($passwordString, $personsPassword)) {
          return true;
        }
        // incorrect password
        return false;
    }

    static public function login($data) {

      $obj = new stdClass();
      $obj->result = false;
      $obj->data = false;
      $obj->message = 'user not found';

      /*
      if (strlen($data->password) < self::$minPasswordLength) {
        $obj->message = 'password length to short';
        return $obj;
      }
      */

      $person = self::get_by_email($data);

      if ($person) {
        // person found

        // check if password is ok
        if (self::verifyPassword($data->password, $person->password)) {
          // login success
          $obj->result = true;
          $obj->data = $person;
          $obj->message = 'success';
        }

        $obj->message = 'incorrect password';
      }

      return $obj;
    }

    static public function signup($data) {

      $person = new Person();

      if (strlen($data->password) < self::$minPasswordLength) {
        $obj = new stdClass();
        $obj->result = false;
        $obj->data = false;
        $obj->message = 'password length to short';
        return $obj;
      }

      $person->__set('email', $data->email);
      $person->__set('name', $data->name);
      $person->__set('password', $data->password);

      $db = Database::getInstance();
      $connection = $db->getConnection();

      $sql = "INSERT INTO person (id, email, name, password, role_id) VALUES (?, ?, ?, ?, ?)";
      $stmt= $connection->prepare($sql);
      $result = $stmt->execute([$person->id, $person->email, $person->name, $person->password, $person->roleID]);

      if ($result) {

        $sql = "INSERT INTO person_player (id) VALUES (?)";
        $stmt= $connection->prepare($sql);
        $result = $stmt->execute([$person->id]);

        if ($result) {
          return Person::login($data);
        }
      }

      return $result;
    }

    static public function signOut($person) {
      // log the user out
    }

    static public function delete($person) {

      // delete user account
      $db = Database::getInstance();
      $connection = $db->getConnection();

      // delete rows from two tables
      $sql = "DELETE person, person_player FROM person INNER JOIN person_player WHERE person.id=person_player.id AND person.id=?";
      $stmt= $connection->prepare($sql);
      $result = $stmt->execute([$this->id]);

      return $result;
    }

    static private function encryptString($string) {
      $options = array(
        'cost' => 12,
      );

      $hash = password_hash($string, PASSWORD_BCRYPT, $options);

      return $hash;
    }

    static private function verifyEncryptedString($string, $hash) {
      if (password_verify($string, $hash)) {
          // Correct password
          return true;
      } else {
          // Incorrect password
          return false;
      }
    }
  }

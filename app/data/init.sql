CREATE DATABASE IF NOT EXISTS everfqlx_tictactoe;

use everfqlx_tictactoe;

CREATE TABLE IF NOT EXISTS person (
  id VARCHAR(255) NOT NULL PRIMARY KEY,
  date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  role_id VARCHAR(255) NOT NULL,
  name VARCHAR(35) NOT NULL,
  email TEXT NOT NULL,
  password VARCHAR(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS person_player (
  id VARCHAR(255) NOT NULL PRIMARY KEY,
  lastPlayed TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  totalGamesPlayed INT NOT NULL,
  totalWon INT NOT NULL,
  totalLost INT NOT NULL,
  totalTies INT NOT NULL,
  averageWin FLOAT NOT NULL,
  averageGameTime FLOAT NOT NULL,
  bestStreak INT NOT NULL,
  bestScore FLOAT NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS role (
  id VARCHAR(255) NOT NULL PRIMARY KEY,
  title VARCHAR(35) NOT NULL,
  description VARCHAR(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

INSERT INTO `role` (`id`, `title`, `description`) VALUES
('406ce976-e009-43fc-b058-42b8b5b51b0f', 'admin', 'Admin user has all privileges'),
('0dc97da7-29b8-4c44-9d28-c6517b2abddb', 'player', 'Only allows the player to update information belonging to that particular user.');

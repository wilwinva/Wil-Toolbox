<?php


//header('Content-Type: text/html');

//error_reporting(E_ALL);
//ini_set('display_errors', 1);


/**
 * Provides Web Services for the Corporate Dictionary and Acronym DB
 */
/*
* Database connection credentials
*
*  Connection info for all three environments is stored in this section.
*  Using the following format:
* array(<development username>, <development password>, <development PDO server string>),
* array( <quality username>,  <quality password>, <quality PDO server string>),
* array(  <production username>, <production password>, <production PDO server string>)
* )
*/
$_db_connections = array(array("cdm_dev", "j9h#kLtr", "dblib:host=db13snlnt:3904;dbname=CDM"),
    array("cdm_user", "wkz#cJ9y", "dblib:host=db13snlnt:3905;dbname=CDM"),
    array("cdm_user", "Soemkr#8", "dblib:host=db15snlnt:1186;dbname=CDM"));
/*
 * Environment
 *
 * One of: dev, qual, prod
 */
$_environment = "dev";


function get_db_connection()
{
  global $_db_connections, $_environment;

  // Environment determines which credentials' array to grab
  $env_offset = 2; // prod by default
  if ($_environment == "dev") {
    $env_offset = 0;
  } else if ($_environment == "qual") {
    $env_offset = 1;
  }
  return $_db_connections[$env_offset];
}

function query($sql, $params = array(), $max_rows = 500)
{
  $credentials = get_db_connection();
  $server = $credentials[2];
  $username = $credentials[0];
  $password = $credentials[1];
  // Catch $max_rows passed into $params
  if (is_numeric($params) && func_num_args() == 5) {
    $max_rows = $params;
    $params = array();
  }
  // Create Db connection
  $dbh = null;
  try {
    $dbh = new PDO($server, $username, $password);
  } catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "\n\n<br/>";
    die();
  }
  $stmt = $dbh->prepare($sql);

  // Execute statement
  $success = $stmt->execute();
  // Populate return object
  $rows = array();
  $num_rows = 0;
  while (($row = $stmt->fetch(PDO::FETCH_ASSOC)) && ($num_rows < $max_rows || $max_rows == -1)) {
    $rows[] = $row;
    $num_rows++;
  }

  return $rows;
}

// Handle querystring actions


// djsedil's Terms By Date Report query
if (isset($_GET['date'])) {
  retrieve_term_by_date($_GET['date']);
} else {
  echo 'You need to enter a data';
}

function retrieve_term_by_date($date)
{
  $sql = "SELECT T.term_id, T.term_name, T.created_date, t.last_updated_date
FROM term AS T
WHERE T.created_date <= '".$date."'
AND (T.last_updated_date IS NULL OR T.last_updated_date <= '".$date."')
UNION
SELECT termhis.term_id, termhis.term_name, termhis.created_date, termhis.last_updated_date
FROM term_history as termhis
WHERE termhis.created_date <= '".$date."'
AND termhis.term_name IS NOT NULL
AND (termhis.last_updated_date IS NULL OR termhis.last_updated_date <= '".$date."')
and termhis.term_id NOT IN
(SELECT T.term_id
FROM term AS T
WHERE T.created_date <= '".$date."'
AND T.term_name IS NOT NULL
AND (T.last_updated_date IS NULL OR T.last_updated_date <= '".$date."')
)
order by t.term_name;";

//echo $sql;
  $results = query($sql, -1);
  echo json_encode($results);
}

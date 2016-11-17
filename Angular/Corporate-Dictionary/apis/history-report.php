<?php


//header('Content-Type: text/html');

//error_reporting(E_ALL);
//ini_set('display_errors', 1);


/**
 * Provides Web Services for the Corporate Dictionary and Acronym DB
 */

include 'cadm-db-connect.php';


// djsedil's History Report query
if (isset($_GET['termid'])) {
  retrieve_term_history($_GET['termid']);
} else {
  echo 'You need to enter a term ID';
}

function retrieve_term_history($termId)
{
  $sql = "SELECT term_name, delete_flag, definition, update_reason, last_updated_by, last_updated_date
FROM dbo.term
WHERE term_id = '" . $termId . "'
UNION
SELECT term_name, delete_flag, definition, update_reason, last_updated_by, last_updated_date
FROM dbo.term_history
WHERE term_id = '" . $termId . "';";

//echo $sql;
  $results = query($sql, -1);
  echo json_encode($results);
}

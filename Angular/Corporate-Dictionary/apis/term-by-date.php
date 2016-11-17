<?php


//header('Content-Type: text/html');

//error_reporting(E_ALL);
//ini_set('display_errors', 1);


/**
 * Provides Web Services for the Corporate Dictionary and Acronym DB
 */
include 'cadm-db-connect.php';


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

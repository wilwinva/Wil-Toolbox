<?php


//header('Content-Type: text/html');

//error_reporting(E_ALL);
//ini_set('display_errors', 1);





/**
 * Provides Web Services for the Corporate Dictionary and Acronym DB
 */
include 'cadm-db-connect.php';



// djsedil's Change Report query
if (isset($_GET['csd'],$_GET['ced'],$_GET['cat'])) {
    retrieve_changed_terms_with_cat($_GET['csd'],$_GET['ced'],$_GET['cat']);
}
elseif (isset($_GET['csd'],$_GET['ced'])){
    retrieve_changed_terms($_GET['csd'], $_GET['ced']);
}

function retrieve_changed_terms_with_cat($changeStartDate,$changeEndDate,$category)
{
    $sql = "SELECT term_id, term_name, definition, update_reason, last_updated_date, last_updated_by, category_list 
		FROM (
			SELECT term_id, term_name, definition, update_reason, last_updated_date, last_updated_by,
				STUFF(
					(SELECT ',' + category FROM
					  (	
						SELECT policy_area_desc as category
						FROM v_term_policy_subpolicy SP
						WHERE SP.term_id = T.term_id

						UNION

						SELECT ',' + 'ES&H' as category
						FROM v_term_subglossary SG
						WHERE SG.term_id = T.term_id
					  ) as pas
					  GROUP BY category
					  FOR XML PATH('')), 1, 1, ''

					) as category_list
			FROM term T
			
			UNION
		
			SELECT term_id, term_name, definition, update_reason, last_updated_date, last_updated_by,
				STUFF(
					(SELECT ',' + category FROM
					  (	
						SELECT policy_area_desc as category
						FROM v_term_policy_subpolicy SP
						WHERE SP.term_id = TH.term_id

						UNION

						SELECT ',' + 'ES&H' as category
						FROM v_term_subglossary SG
						WHERE SG.term_id = TH.term_id
					  ) as pas
					  GROUP BY category
					  FOR XML PATH('')), 1, 1, ''
					) as category_list
			FROM term_history TH
		) as terms
			
		WHERE 
				last_updated_date >= '" . $changeStartDate . "'
		AND
				last_updated_date <= '" . $changeEndDate . "'
		AND
				CHARINDEX('" . $category . "',category_list) > 0

		ORDER BY term_id, last_updated_date ASC;";

//echo $sql;
    $results = query($sql, -1);
    echo json_encode($results);
}
function retrieve_changed_terms($changeStartDate,$changeEndDate)
{
    $sql = "SELECT term_id, term_name, definition, update_reason, last_updated_date, last_updated_by 
		FROM (SELECT term_id, term_name, definition, update_reason, last_updated_date, last_updated_by
			FROM term T
			UNION
			SELECT term_id, term_name, definition, update_reason, last_updated_date, last_updated_by
			FROM term_history TH
		) as terms
		WHERE 
			last_updated_date >= '" . $changeStartDate . "'
			AND
			last_updated_date <= '" . $changeEndDate . "'
		ORDER BY term_id, last_updated_date ASC";

//echo $sql;
    $results = query($sql, -1);
    echo json_encode($results);
}

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
    $env_offset = 2; // dev by default
    if ($_environment == "dev") {
        $env_offset = 0;
    } else if ($_environment == "qual") {
        $env_offset = 1;
    }
    return $_db_connections[$env_offset];
}

function query($sql, $params = array(), $action, $max_rows = 500)
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
        //$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        echo "Error!: " . $e->getMessage() . "\n\n<br/>";
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
// header('Access-Control-Allow-Origin: http://localhost:9000');
//header('Access-Control-Allow-Credentials: true');
// header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if (isset($_GET['q']) && strlen($_GET['q']) > 2 ) {
    retrieve_terms_by_index($_GET['q']);
}

if (isset($_GET['action'])) {
    //$_POST['searchType']
    $action = $_GET['action'];
    if($action == 'addAcronym') {
        addAcronym();
    }
    if($action == 'getCategories') {
        retrieve_categories();
    }
}



function addAcronym(){
    $_POST = json_decode(file_get_contents('php://input'), true);
    $acronym = $_POST['acronym'];
    $abbrev_simplified = $_POST['abbrev_simplified'];
    $term_name = $_POST['term_name'];
    $delete_flag = $_POST['delete_flag'];
    $definition = "This is the definition";
    $sub_policy_areas = $_POST['categories'];
    $related_terms = $_POST['relatedTerms'];
    $update_reason = $_POST['update_reason'];
    $term_anchor = str_replace(' ', '_', strtolower($term_name));
    $source_id = 4; // 4=acronym, 3=CDM. // TODO Fix this with a passed in variable.
    $expansion_in_caps = strtoupper($term_name);
    $created_by = $_SERVER['REMOTE_USER'];
    $create_application = "ACRONYMS";
    $last_update_app = "ACRONYMS";
    $now = date('Y-m-d H:i:s').substr((string)microtime(), 1, 4);  // Oh, my...

    // Insert Term
    $sql = "INSERT INTO dbo.term (term_name,term_anchor,source_id,definition,owner_snl_id,owner_deptid,delete_flag,created_by,
                      created_date,create_application,update_reason,acronym,abbrev_simplified,expansion_in_caps)
			OUTPUT INSERTED.term_id
			VALUES ('".$term_name."', '".$term_anchor."', ".$source_id.", '".$definition."', 69001, 9531, '".$delete_flag."', null, null, null, '".
        $update_reason."', '".$acronym."', '".$abbrev_simplified."', '" .$expansion_in_caps."')";

    $results =  query($sql, -1);
    $termId = $results[0][term_id];

    // Insert Categories (policy areas)
    foreach($sub_policy_areas as $key=>$category){
        $sql = "INSERT INTO dbo.term_2_sub_policy_area (term_id, sub_policy_area_id, created_by, create_application, delete_flag, last_updated_by, last_updated_date, last_update_app)
				VALUES ($termId, $category[id], '$created_by',  '$create_application', 'N','$created_by', '$now', '$last_update_app')";
        $results =  query($sql, -1);
    }

    // Insert Related Terms
    foreach($related_terms as $key=>$term){
        $sql = "INSERT INTO related_term (term_id, related_term_id, created_by, create_application, delete_flag, last_updated_by, last_updated_date, last_update_app)
				VALUES ($termId, $term[id], '$created_by',  '$create_application', 'N','$created_by', '$now', '$last_update_app')";
        $results =  query($sql, -1);
    }







}


/**
 * Retrieves categories and their associated sub-categories (and sub-glossaries for ES&H)
 * e.g. [{"category":"Corporate Governance","sub_categories":["--None--","Assurance"]},
 *       {"category":"ES&H","sub_categories":["--None--","ES&H General"]}]
 * @access public
 * @return array    array with rows representing a category that includes an array of sub-categories
 */
function retrieve_categories()
{
    $sql = "SELECT PA.policy_area_id as id, PA.policy_area_desc as name
	FROM dbo.policy_area PA
	WHERE PA.delete_flag <> 'Y'
	ORDER BY PA.policy_area_desc";

    $results =  query($sql, -1);
    echo json_encode($results);

}


function retrieve_terms_by_index($alphaIndex)
{
    /*$sql = "select t.term_id as id, t.term_name as term, t.acronym , t.abbrev_simplified, t.definition, t.delete_flag, t.create_application, 		pa.policy_area_desc, pa.policy_area_id, related.term_name as related_term_name
			from dbo.term t
			inner join dbo.term_2_sub_policy_area t2sp on t.term_id = t2sp.term_id and t2sp.delete_flag <> 'y'
			inner join dbo.sub_policy_area spa on t2sp.sub_policy_area_id = spa.sub_policy_area_id and spa.delete_flag <> 'y'
			inner join dbo.policy_area pa on pa.policy_area_id = spa.policy_area_id and pa.delete_flag <> 'y'
			left join dbo.related_term rt on t.term_id = rt.term_id and rt.delete_flag <> 'y'
			left join dbo.term related on rt.related_term_id = related.term_id and related.delete_flag <> 'y'
			where (t.term_name like '%".$alphaIndex."%' OR t.acronym like '%".$alphaIndex."%' OR t.term_id like '%".$alphaIndex."%')
			order by t.term_name";*/

    $sql = "select t.term_id as id, t.term_name as term, t.acronym, t.definition,
		t.delete_flag as deleteFlag, t.superseded_by as supersededById, superseded_term.term_name as supersededByName,
		pa.policy_area_id as categoryId, pa.policy_area_desc as categoryName,
		rt.related_term_id as relatedTermId, related.term_name as relatedTermName,
		t.create_application as createApp, t.created_by as createdBy, t.created_date as createdDate,
		t.last_updated_by as updatedBy, t.last_updated_date as updatedDate, t.last_update_application as updateApp, t.update_reason as updateReason,
		s.source_name as source
		from dbo.term t
		inner join dbo.source s on t.source_id = s.source_id
		left join dbo.term_2_sub_policy_area t2sp on t.term_id = t2sp.term_id and t2sp.delete_flag <> 'y'
		left join dbo.sub_policy_area spa on t2sp.sub_policy_area_id = spa.sub_policy_area_id and spa.delete_flag <> 'y'
		left join dbo.policy_area pa on pa.policy_area_id = spa.policy_area_id and pa.delete_flag <> 'y'
		left join dbo.related_term rt on t.term_id = rt.term_id and rt.delete_flag <> 'y'
		left join dbo.term related on rt.related_term_id = related.term_id and related.delete_flag <> 'y'
		left join dbo.term superseded_term on t.superseded_by = superseded_term.term_id
		where (t.term_name like '%".$alphaIndex."%' OR t.acronym like '%".$alphaIndex."%' OR t.term_id like '%".$alphaIndex."%')
		order by t.term_name";



    $results =  query($sql, -1);
    // Loop through the results to add custom JSON values and remove duplicates from the query.
    foreach($results as  $index => & $item) {

        // Create supersededByTerm object that consists of the superseded ID and Name values.
        if($item['supersededById']) {
            $item['supersededByTerm'] = (object) array('id' => $item['supersededById'], 'term' => $item['supersededByName']);
        }
        else {
            $item['supersededByTerm'] = (object) array();
        }
        // Remove the ID and Name values now that they are in the above object.
        unset($item['supersededById']);
        unset($item['supersededByName']);

        // Add arrays and populate them with any values to the evantual json to hold the cats and related terms.
        $item['categories'] = array();
        $item['relatedTerms'] = array();

        if($item['categoryName']) {
            array_push($item['categories'], array("name" => $item['categoryName'], "id" => $item['categoryId'] ));
        }
        // Remove because they've been added to the array above (empty array if they were null).
        unset($item['categoryName']);
        unset($item['categoryId']);

        if($item['relatedTermName']) {
            array_push($item['relatedTerms'], array("term" => $item['relatedTermName'], "id" => $item['relatedTermId'] ));
        }
        // Remove because they've been added to the array above (empty array if they were null).
        unset($item['relatedTermName']);
        unset($item['relatedTermId']);

        // The results will have duplicate terms when they have either different categories (policy area desc) or related terms.
        // Look ahead to see if the next term is the same.
        $x=1;
        while($results[$index+$x]['term'] == $item['term']) {
            // If so, and it has either a different policy area (category) or related term, add it to the array.
            if($results[$index+$x]['categoryName'] != $item['categoryName']) {
                array_push($item['categories'], array("name" => $results[$index+$x]['categoryName'], "id" => $results[$index+$x]['categoryId']));
            }
            if($results[$index+$x]['relatedTermName'] != $item['relatedTermName']) {
                array_push($item['relatedTerms'], array("term" => $results[$index+$x]['relatedTermName'], "id" => $results[$index+$x]['relatedTermId']));
            }
            // finally, remove the duplicate from the result set (after extracting the related term or cat).
            unset($results[$index+$x]);
            $x++;
        }

    }
    // Unset used above doesn't change the index of the arrays and it leaves gaps that Angular can't deal with.
    // array_values() simply rebases the indexes in the arrays to remove the gaps.
    $results = array_values($results);
    echo '{"q":"'.strtoupper($alphaIndex).'", "results": ' . json_encode($results) . '}';


}
function retrieve_filtered_terms($category, $subCategory, $term, $definition, $term_defn)
{
    /*
    $sql = "SELECT t.term_id, t.term_name, t.acronym, t.abbrev_simplified, t.definition, PA.policy_area_desc, SPA.sub_policy_area_desc, g.sub_glossary_desc, related.term_name
        FROM dbo.term t
        INNER JOIN dbo.term_2_sub_policy_area T2SP ON t.term_id = T2SP.term_id and T2SP.delete_flag <> 'Y'
        INNER JOIN dbo.sub_policy_area SPA ON T2SP.sub_policy_area_id = SPA.sub_policy_area_id and SPA.delete_flag <> 'Y'
        INNER JOIN dbo.policy_area PA ON PA.policy_area_id = SPA.policy_area_id and PA.delete_flag <> 'Y'
        LEFT JOIN dbo.related_term RT ON t.term_id = RT.term_id and RT.delete_flag <> 'Y'
        LEFT JOIN dbo.term related ON RT.related_term_id = related.term_id and related.delete_flag <> 'Y'
        WHERE t.delete_flag <> 'Y' --admin filters change to ?
        AND t.term_name LIKE 'A%' -- letter selected from dropdown
        AND t.term_name LIKE '%?%' OR t.definition LIKE '%?%' -- term and def'n
        AND PA.policy_area_id=?
        AND t.term_id = ? --admin filters
        AND t.source_id = ? --admin filters
        ORDER BY t.term_name;";

    $results =  query($sql, -1);
    echo  json_encode($results); */
}

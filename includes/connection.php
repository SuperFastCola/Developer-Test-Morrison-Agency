<?php
//command line PHP requires <?php at top of required/included files - otherwise see them as text
define('MAIN_DIRECTORY', preg_replace("/\/includes/","", dirname(realpath(__FILE__))) . "/"); // need to add trailing slash
define('DB_DOCUMENT_ROOT', dirname(realpath(__FILE__)) . "/"); // need to add trailing slash

require(MAIN_DIRECTORY . "config.php");

//set to NULL when not wanting to use
$use_mysql = NULL;

if(function_exists('mysqli_connect') && !isset($use_mysql)) {
  require(DB_DOCUMENT_ROOT . "connection_mysqli.php");
}
else{
  require(DB_DOCUMENT_ROOT . "connection_mysql.php"); 
}


if(isset($env_config)){
  $myDB = new DB($env_config);
  $myDB->connect();
}
else{
  echo "Requires Config File";
}

?>
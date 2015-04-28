<?php

$q=$_GET["username"];
$p=$_GET["password"];

$host="localhost"; // Host name 
$username="teacher"; // Mysql username 
$password="teacherpassword"; // Mysql password 
$db_name="thewynn_test"; // Database name 

// Connect to server and select databse.
$link = mysql_connect("$host", "$username", "$password")or die("cannot connect"); 
mysql_select_db("$db_name",$link)or die("cannot select DB");


$sql="SELECT type FROM usertable WHERE username = '".$q."' AND password = '".$p."'";

$result = mysql_query($sql);

$row = mysql_fetch_array($result);

$type =$row['type'];

if($type == 1 || $type == "1") {
	// return teacher type
	echo 1;
} else if($type == 2 || $type == "2")
{
	// return student type
	echo 2;
} else {
	// return not found
	echo 0;
}

mysql_close($link);
?>
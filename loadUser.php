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


$sql="SELECT userID FROM usertable WHERE username = '".$q."' AND password = '".$p."'";

$result = mysql_query($sql);

$row = mysql_fetch_array($result);

$tempstring = "";

while ($row = mysql_fetch_array($result)) {
	$tempstring = $tempstring." ".$row['name'];
}

if($tempstring == '' || empty($tempstring))
{
	echo "-1";
}
else
{
	echo $tempstring;
}

mysql_close($link);
?>
<?php

$q=$_GET["dictionaryID"];

$host="localhost"; // Host name 
$username="teacher"; // Mysql username 
$password="teacherpassword"; // Mysql password 
$db_name="thewynn_test"; // Database name 

// Connect to server and select databse.
$link = mysql_connect("$host", "$username", "$password")or die("cannot connect"); 
mysql_select_db("$db_name",$link)or die("cannot select DB");


$sql="SELECT written, spoken  FROM dictionarytable WHERE dictionaryID = ".$q."";

$result = mysql_query($sql);

$row = mysql_fetch_array($result);

$tempstring1 = $row['written'];
$tempstring2 = $row['spoken'];

if($tempstring1 == '' || empty($tempstring1))
{
	echo "-1";
}
else
{
	echo $tempstring1."$".$tempstring2;
}

mysql_close($link);
?>
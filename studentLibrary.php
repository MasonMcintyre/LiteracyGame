<?php

$host="localhost"; // Host name 
$username="teacher"; // Mysql username 
$password="teacherpassword"; // Mysql password 
$db_name="thewynn_test"; // Database name 

// Connect to server and select databse.
$link = mysql_connect("$host", "$username", "$password")or die("cannot connect"); 
mysql_select_db("$db_name",$link)or die("cannot select DB");


$sql="SELECT title, dictionaryID FROM dictionarytable ORDER BY dictionaryID";

$result = mysql_query($sql);

$tempstring1 = "";
$tempstring2 = "";

$ts = 0;

while ($row = mysql_fetch_array($result)) {
	if ($ts == 1) {
		$tempstring1 = $tempstring1." ".$row['title'];
		$tempstring2 = $tempstring2." ".$row['dictionaryID'];
	} else {
		$tempstring1 = $row['title'];
		$tempstring2 = $row['dictionaryID'];
		$ts = 1;
	}
}

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
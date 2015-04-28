<?php

$q=$_GET["q"];

$host="localhost"; // Host name 
$username="teacher"; // Mysql username 
$password="teacherpassword"; // Mysql password 
$db_name="thewynn_test"; // Database name 

// Connect to server and select databse.
$link = mysql_connect("$host", "$username", "$password")or die("cannot connect"); 
mysql_select_db("$db_name",$link)or die("cannot select DB");


$sql="SELECT name FROM tblprofile WHERE userId = '".$q."'";

$result = mysql_query($sql);

$row = mysql_fetch_array($result);

$name =$row['name'];

if($name == '' || empty($name))
{
//echo "<b>ID not found.</b>";
echo "<b>".$row."</b>";
}
else
{
echo "<b>".$name."</b>";
}

mysql_close($link);
?>
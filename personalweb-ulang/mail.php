<?php
$name = $_POST['name'];
$email = $_POST['email'];
$judul = $_POST['judul'];
$message = $_POST['message'];
$to = "zaki.alawi22@gmail.com";
$subject = "Mail From Personal Web " . "<" .$name .">";

$headers = "From: ".$name. "\r\n" .
"CC: hallo@zakialawi.my.id";

$txt = "You Have Recived an E-mail From " . "[" .$name ."]" ."\r\nName: " .$name ."\r\nEmail: " .$email ."\r\nSubject: " .$judul ."\r\nMessage/Comment: " .$message;


if($email!=NULL){
    mail($to, $subject, $txt, $headers);
}

header('Location:sendedform.html');

?>
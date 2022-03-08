<?php
    use PHPMailer\PHPMailer\PHPMailer;

    if (isset($_POST['name']) && isset($_POST['email'])) {
        $name = $_POST['name'];
        $email = $_POST['email'];
        $subject = $_POST['subject'];
        $body = $_POST['body'];

        require_once "PHPMailer/PHPMailer.php";
        require_once "PHPMailer/SMTP.php";
        require_once "PHPMailer/Exception.php";

        $mail = new PHPMailer();

        //SMTP Settings
        $mail->isSMTP();
        // $mail->Host = "smtp.gmail.com";
        // $mail->Host = "mail.zakialawi.my.id";
        $mail->SMTPAuth = true;
        // $mail->Username =  "hallo@zakialawi.my.id";//"youremail@gmail.com"; //enter you email address
        // $mail->Password = 'password'; //enter you email password
        $mail->Username =  "hallo@zakialawi.my.id";//"youremail@gmail.com"; //enter you email address
        $mail->Password = 'password'; //enter you email password
        $mail->Port = 465;
        $mail->SMTPSecure = "ssl";

        //Email Settings
        $mail->isHTML(true);
        $mail->setFrom($email, $name);
        // $mail->addAddress("youremail@gmail.com"); //enter you email address
        $mail->addAddress("hallo@zakialawi.my.id"); //enter you email address
        $mail->Subject = ("$email ($subject)");
        $mail->body = $body;

        if ($mail->send()) {
            $status = "success";
            $response = "Email is sent!";
        } else {
            $status = "failed";
            $response = "Something is wrong: <br><br>" . $mail->ErrorInfo;
        }

        exit(json_encode(array("status" => $status, "response" => $response)));
    }
?>

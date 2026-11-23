<?php
$page_title = 'Delivery received';
include 'includes/header.php';

function isMemberNumber($member) {
    return is_string($member) && preg_match('/^ER-[0-9]{4}$/', $member) === 1;
}

function isSession($session) {
    return $session === 'MORNING' || $session === 'EVENING';
}

function isLitres($litres) {
    return is_numeric($litres) && 0 < (float) $litres && (float) $litres <= 60;
}

echo '<main>';

if (isset($_POST['member_no'], $_POST['session'], $_POST['litres'])) {
    $member = $_POST['member_no'];
    $session = $_POST['session'];
    $litres = $_POST['litres'];

    $errors = [];
    if (!isMemberNumber($member)) {
        $errors[] = 'Member numbers look like ER-0001.';
    }
    if (!isSession($session)) {
        $errors[] = 'The session must be MORNING or EVENING.';
    }
    if (!isLitres($litres)) {
        $errors[] = 'Litres must be more than 0 and at most 60.';
    }

    if (empty($errors)) {
        // For this lab, every load passes the alcohol test, so accepted is 1.
        // The database insert itself is Week 12 work; here the checked load is confirmed.
        echo '<h2>Delivery recorded</h2>';
        echo '<p>' . $member . ', ' . $session . ', ' . $litres . ' litres — accepted.</p>';
    } else {
        echo '<h2>Delivery not recorded</h2>';
        foreach ($errors as $error) {
            echo '<p>' . $error . '</p>';
        }
    }
    echo '<p><a href="deliveries.php">Back to deliveries</a></p>';
} else {
    echo '<h2>No delivery</h2>';
    echo '<p>This page answers the delivery form. ';
    echo '<a href="deliveries.php">Fill it in first.</a></p>';
}

echo '</main>';

include 'includes/footer.php';
?>

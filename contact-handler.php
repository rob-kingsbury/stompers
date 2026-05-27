<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.php#contact');
    exit;
}

$clean = fn($v) => trim(strip_tags($v ?? ''));
$noNewlines = fn($v) => str_replace(["\r", "\n"], ' ', $v);

$name    = $noNewlines($clean($_POST['name']));
$email   = $clean($_POST['email']);
$venue   = $clean($_POST['venue']);
$date    = $clean($_POST['date']);
$message = $clean($_POST['message']);

// Honeypot / basic validation
if (!$name || !$email || !$message || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: index.php?status=error#contact');
    exit;
}

$to      = 'booking@swampcitystompers.ca';
$reply   = filter_var($email, FILTER_SANITIZE_EMAIL);
$subject = "[Stompers] Booking inquiry from {$name}";

$headers = implode("\r\n", [
    'From: Stompers Website <info@swampcitystompers.ca>',
    "Reply-To: {$name} <{$reply}>",
    'Content-Type: text/plain; charset=UTF-8',
]);

$body  = "Name: {$name}\n";
$body .= "Email: {$email}\n";
if ($venue) $body .= "Venue / event: {$venue}\n";
if ($date)  $body .= "Target date: {$date}\n";
$body .= "\n{$message}\n";

$sent = @mail($to, $subject, $body, $headers);

header('Location: index.php?status=' . ($sent ? 'sent' : 'error') . '#contact');
exit;

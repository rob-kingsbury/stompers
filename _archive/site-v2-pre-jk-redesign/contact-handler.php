<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  header('Location: contact');
  exit;
}

$name    = str_replace(["\r", "\n"], '', trim(strip_tags($_POST['name'] ?? '')));
$email   = trim(strip_tags($_POST['email'] ?? ''));
$subject = trim(strip_tags($_POST['subject'] ?? ''));
$message = trim(strip_tags($_POST['message'] ?? ''));

// Basic validation
if (!$name || !$email || !$message || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  header('Location: contact?status=error');
  exit;
}

$subject_labels = [
  'booking' => 'Booking Inquiry',
  'press'   => 'Press / Media',
  'general' => 'General',
];
$subject_label = $subject_labels[$subject] ?? 'Contact Form';

$to      = 'robandtherockets@gmail.com';
$headers = implode("\r\n", [
  'From: Stompers Website <info@swampcitystompers.ca>',
  'Reply-To: ' . $name . ' <' . $email . '>',
  'Content-Type: text/plain; charset=UTF-8',
]);

$body = "Name: {$name}\nEmail: {$email}\nSubject: {$subject_label}\n\n{$message}";

$sent = mail($to, "[Stompers] {$subject_label} from {$name}", $body, $headers);

header('Location: contact?status=' . ($sent ? 'sent' : 'error'));
exit;

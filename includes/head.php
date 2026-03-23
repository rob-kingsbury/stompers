<?php require_once __DIR__ . '/vite.php'; ?>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= $page_title ?? 'Swamp City Stompers' ?></title>
  <meta name="description" content="<?= $page_description ?? 'Swamp City Stompers - Gritty southern rock, swamp blues, and roots Americana from Eastern Ontario.' ?>">
  <link rel="icon" type="image/png" href="img/logo-goon.png">

  <meta property="og:title" content="<?= $page_title ?? 'Swamp City Stompers' ?>">
  <meta property="og:description" content="<?= $og_description ?? $page_description ?? 'Southern Rock | Blues | Soul | Outlaw Country' ?>">
  <meta property="og:type" content="website">
  <meta property="og:image" content="img/logo-stompers.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="<?= $page_title ?? 'Swamp City Stompers' ?>">
  <meta name="twitter:description" content="<?= $twitter_description ?? $page_description ?? 'Southern Rock | Blues | Soul | Outlaw Country' ?>">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=Source+Serif+Pro:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">
  <?= vite_assets() ?>

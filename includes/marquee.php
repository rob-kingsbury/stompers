<?php
/**
 * Hero marquee — artists Stompers cover.
 *
 * Hardcoded list. Edit MARQUEE_ARTISTS below to add, remove, or
 * reorder. List was seeded on 2026-05-27 from BandPilot's songs
 * table (top artists by song count).
 *
 * If you ever want this driven by BandPilot live again, git log this
 * file for the previous Supabase Mgmt API version.
 */

const MARQUEE_ARTISTS = [
    'Lynyrd Skynyrd',
    'Allman Brothers',
    'Tom Petty',
    'Eric Clapton',
    'Jimi Hendrix',
    'Neil Young',
    'Cream',
    'Dwight Yoakam',
    'Alan Jackson',
    'CCR',
    'Bob Dylan',
    'Black Crowes',
    'Aretha Franklin',
    'B.B. King',
    'Big Sugar',
    'Big Wreck',
    'April Wine',
    'Brad Paisley',
    'Brooks & Dunn',
    'Cash / Nelson',
    'Crosby, Stills, Nash and Young',
    'Cake',
    'Band Of Heathens',
];

$marquee_loop = array_merge(MARQUEE_ARTISTS, MARQUEE_ARTISTS);
?>
<div class="hero-marquee" aria-hidden="true">
  <div class="hero-marquee-track">
    <?php foreach ($marquee_loop as $a): ?>
      <span class="hero-marquee-item"><span><?= htmlspecialchars($a) ?></span><span class="star">&#10022;</span></span>
    <?php endforeach; ?>
  </div>
</div>

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

// Hand-staggered so heavy hitters spread out and genres interleave
// (no alphabetical / no country-block / no blues-block clustering).
const MARQUEE_ARTISTS = [
    'Lynyrd Skynyrd',
    'Hank Williams, Jr.',
    'Tom Petty',
    'Big Sugar',
    'Jimi Hendrix',
    'Dwight Yoakam',
    'Stevie Ray Vaughan',
    'Bob Dylan',
    'Allman Brothers',
    'JJ Cale',
    'Eric Clapton',
    'Brad Paisley',
    'Cream',
    'Big Wreck',
    'Doobie Brothers',
    'Johnny Cash',
    'CCR',
    'Black Crowes',
    'Neil Young',
    'Georgia Satellites',
    'Freddie King',
    'Marvin Gaye',
    'Alan Jackson',
    'Crosby, Stills, Nash and Young',
    'B.B. King',
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

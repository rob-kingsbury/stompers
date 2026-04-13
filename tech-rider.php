<?php
$page_title = 'Tech Rider | Swamp City Stompers';
?><!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?= $page_title ?></title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Courier New', monospace;
    background: #fff;
    color: #111;
    padding: 40px;
    max-width: 860px;
    margin: 0 auto;
    font-size: 13px;
    line-height: 1.6;
  }

  .header {
    border-bottom: 3px solid #111;
    padding-bottom: 20px;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .band-name {
    font-size: 26px;
    font-weight: bold;
    letter-spacing: 3px;
    text-transform: uppercase;
  }

  .doc-title {
    font-size: 12px;
    letter-spacing: 3px;
    color: #666;
    text-transform: uppercase;
  }

  .contact {
    text-align: right;
    font-size: 11px;
    color: #444;
  }

  h2 {
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    border-bottom: 1px solid #ddd;
    padding-bottom: 6px;
    margin: 28px 0 14px;
    color: #333;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 10px;
  }

  th {
    text-align: left;
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #666;
    padding: 4px 8px 4px 0;
    border-bottom: 1px solid #eee;
  }

  td {
    padding: 6px 8px 6px 0;
    border-bottom: 1px solid #f0f0f0;
    vertical-align: top;
  }

  td:first-child { font-weight: bold; width: 180px; }

  ul {
    list-style: none;
    padding: 0;
  }

  ul li {
    padding: 4px 0;
    border-bottom: 1px solid #f0f0f0;
  }

  ul li::before {
    content: "— ";
    color: #999;
  }

  .note {
    background: #f9f9f9;
    border-left: 3px solid #111;
    padding: 10px 14px;
    margin: 14px 0;
    font-size: 12px;
    color: #444;
  }

  .footer {
    margin-top: 40px;
    padding-top: 16px;
    border-top: 1px solid #ddd;
    font-size: 11px;
    color: #888;
    display: flex;
    justify-content: space-between;
  }

  @media print {
    body { padding: 20px; }
    @page { margin: 1.5cm; }
  }
</style>
</head>
<body>

<div class="header">
  <div>
    <div class="band-name">Swamp City Stompers</div>
    <div class="doc-title">Technical Rider</div>
  </div>
  <div class="contact">
    Booking: info@swampcitystompers.ca<br>
    Eastern Ontario, Canada
  </div>
</div>

<div class="note">
  This rider covers minimum technical requirements. The band is flexible and easy to work with — if something isn't possible, just communicate in advance. We want a good show as much as you do.
</div>

<h2>The Band</h2>
<table>
  <tr><th>Member</th><th>Role</th><th>Backline</th></tr>
  <tr><td>Rob</td><td>Guitar / Vocals</td><td>Fender '65 Deluxe Reverb Reissue (provided)</td></tr>
  <tr><td>Eugene</td><td>Guitar / Vocals</td><td>Tweed Fender Harvard (provided)</td></tr>
  <tr><td>Kurt</td><td>Bass / Vocals</td><td>Bass amp (provided) — runs DI to board</td></tr>
  <tr><td>Matt</td><td>Drums</td><td>Full kit (provided)</td></tr>
</table>

<div class="note">
  The band can provide full backline and a PA system suitable for small to medium-sized rooms. Please confirm in advance whether house PA is available.
</div>

<h2>Input List</h2>
<table>
  <tr><th>Ch.</th><th>Source</th><th>Mic / DI</th><th>Stand</th></tr>
  <tr><td>1</td><td>Rob — Vocals</td><td>Shure SM58 (provided)</td><td>Tall boom</td></tr>
  <tr><td>2</td><td>Eugene — Vocals</td><td>Shure SM58 (provided)</td><td>Tall boom</td></tr>
  <tr><td>3</td><td>Kurt — Vocals</td><td>Shure SM58 (provided)</td><td>Tall boom</td></tr>
  <tr><td>4</td><td>Rob — Guitar (Fender Deluxe)</td><td>Sennheiser e906 (provided)</td><td>Short boom</td></tr>
  <tr><td>5</td><td>Eugene — Guitar (Tweed Harvard)</td><td>Shure SM57 (provided)</td><td>Short boom</td></tr>
  <tr><td>6</td><td>Kurt — Bass</td><td>DI (provided)</td><td>—</td></tr>
  <tr><td>7</td><td>Kick Drum</td><td>Venue mic preferred</td><td>Internal</td></tr>
  <tr><td>8+</td><td>Additional drums</td><td>Venue mics as available</td><td>As needed</td></tr>
</table>

<div class="note">
  Minimum drum micing requirement: 1x kick drum. Additional mics (snare, overheads, toms) welcome but not required.
</div>

<h2>Monitor Requirements</h2>
<table>
  <tr><th>Mix</th><th>Position</th><th>Wedges</th><th>Contents</th></tr>
  <tr><td>Mix 1</td><td>Rob — Stage Left</td><td>2x floor wedges</td><td>Vox (Rob + Eugene), guitars, some bass</td></tr>
  <tr><td>Mix 2</td><td>Eugene — Stage Right</td><td>2x floor wedges</td><td>Vox (Rob + Eugene), guitars, some bass</td></tr>
  <tr><td>Mix 3</td><td>Kurt — Center</td><td>1x floor wedge</td><td>Vox (Kurt), bass, kick</td></tr>
  <tr><td>Mix 4</td><td>Matt — Drums</td><td>1x floor wedge</td><td>Kick, vox blend, guitars</td></tr>
</table>

<div class="note">
  No IEMs. Floor wedges only. Minimum 4 discrete monitor mixes required.
</div>

<h2>PA Requirements</h2>
<ul>
  <li>Main PA coverage sufficient for venue capacity — we will discuss specifics in advance</li>
  <li>Band can provide PA for rooms up to approximately 300 capacity</li>
  <li>Minimum 8-channel mixing board with 4 aux sends for monitors</li>
  <li>Subwoofer recommended for full-range coverage</li>
</ul>

<h2>Stage Requirements</h2>
<ul>
  <li>Minimum stage width: 20 feet (6m) — 16 feet acceptable for smaller rooms</li>
  <li>Minimum depth: 14 feet (4.3m) for full kit</li>
  <li>4x standard 20A power outlets on stage</li>
  <li>Stage clear of obstacles — drum riser optional but not required</li>
</ul>

<h2>Changeover</h2>
<ul>
  <li>Load-in: minimum 90 minutes before doors</li>
  <li>Soundcheck: 45 minutes</li>
  <li>Band provides own backline — no venue backline required</li>
</ul>

<div class="footer">
  <span>Swamp City Stompers &mdash; Technical Rider</span>
  <span>info@swampcitystompers.ca</span>
</div>

</body>
</html>

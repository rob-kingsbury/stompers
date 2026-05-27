<?php
/**
 * Copy to config.php (gitignored). Holds the Supabase Management API
 * access token used by includes/marquee.php to pull the live artist list
 * from BandPilot.
 *
 * Token lives in c:/xampp/htdocs/.credentials/apis.md under "Supabase - BandPilot".
 */

return [
    'supabase_project_ref'  => 'ynrtcpulwsqfygpupwzl',
    'supabase_access_token' => 'sbp_REPLACE_ME',
    'stompers_band_id'      => '1772f36e-1770-470f-892a-28c4eb4991d4',
];

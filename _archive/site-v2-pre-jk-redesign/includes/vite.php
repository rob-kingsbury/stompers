<?php
/**
 * Vite asset integration for PHP.
 *
 * Development: loads from Vite dev server (HMR).
 * Production:  reads dist/.vite/manifest.json for hashed filenames.
 *
 * Usage: <?= vite_assets() ?> in your <head> or before </body>
 */

define('VITE_DEV_SERVER', 'http://localhost:3000');
define('VITE_MANIFEST', __DIR__ . '/../dist/.vite/manifest.json');

function is_vite_dev(): bool {
    // Only consider dev mode when the request is served from a local host.
    // Prevents shared hosting from serving Vite dev tags if something on the
    // server happens to answer on port 3000.
    $host = $_SERVER['HTTP_HOST'] ?? '';
    $host = strtolower(preg_replace('/:\d+$/', '', $host));
    $localHosts = ['localhost', '127.0.0.1', '::1'];
    if (!in_array($host, $localHosts, true)) {
        return false;
    }
    $handle = @fsockopen('localhost', 3000, $errno, $errstr, 0.3);
    if ($handle) {
        fclose($handle);
        return true;
    }
    return false;
}

function vite_assets(): string {
    $html = '';

    if (is_vite_dev()) {
        // Vite HMR client + JS entry (CSS loaded directly by head.php)
        $html .= '<script type="module" src="' . VITE_DEV_SERVER . '/@vite/client"></script>' . "\n";
        $html .= '<script type="module" src="' . VITE_DEV_SERVER . '/js/main.js"></script>' . "\n";
    } elseif (file_exists(VITE_MANIFEST)) {
        // Production: read manifest for hashed filenames
        $manifest = json_decode(file_get_contents(VITE_MANIFEST), true);

        if (isset($manifest['js/main.js'])) {
            $entry = $manifest['js/main.js'];
            // CSS extracted from JS imports (e.g. lenis.css)
            if (isset($entry['css'])) {
                foreach ($entry['css'] as $cssFile) {
                    $html .= '<link rel="stylesheet" href="dist/' . $cssFile . '">' . "\n";
                }
            }
            $html .= '<script type="module" src="dist/' . $entry['file'] . '"></script>' . "\n";
        }
    } else {
        // No Vite dev server, no built manifest — CSS loaded by head.php, skip JS
        $html .= '<!-- Run npm run build to generate production assets -->' . "\n";
    }

    return $html;
}

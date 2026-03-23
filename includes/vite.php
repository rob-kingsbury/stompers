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
    // Check if Vite dev server is running
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

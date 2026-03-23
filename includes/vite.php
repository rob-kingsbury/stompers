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
        $html .= '<script type="module" src="' . VITE_DEV_SERVER . '/@vite/client"></script>' . "\n";
        $html .= '<link rel="stylesheet" href="' . VITE_DEV_SERVER . '/css/themes.css">' . "\n";
        $html .= '<link rel="stylesheet" href="' . VITE_DEV_SERVER . '/css/styles.css">' . "\n";
        $html .= '<script type="module" src="' . VITE_DEV_SERVER . '/js/main.js"></script>' . "\n";
    } elseif (file_exists(VITE_MANIFEST)) {
        $manifest = json_decode(file_get_contents(VITE_MANIFEST), true);

        // CSS files
        foreach (['css/themes.css', 'css/styles.css'] as $css) {
            if (isset($manifest[$css])) {
                $html .= '<link rel="stylesheet" href="dist/' . $manifest[$css]['file'] . '">' . "\n";
            }
        }

        // JS entry + its CSS imports
        if (isset($manifest['js/main.js'])) {
            $entry = $manifest['js/main.js'];
            if (isset($entry['css'])) {
                foreach ($entry['css'] as $cssFile) {
                    $html .= '<link rel="stylesheet" href="dist/' . $cssFile . '">' . "\n";
                }
            }
            $html .= '<script type="module" src="dist/' . $entry['file'] . '"></script>' . "\n";
        }
    } else {
        // Fallback: load source files directly (works if no bare imports, otherwise needs Vite)
        $html .= '<link rel="stylesheet" href="css/themes.css">' . "\n";
        $html .= '<link rel="stylesheet" href="css/styles.css">' . "\n";
        $html .= '<script type="module" src="js/main.js"></script>' . "\n";
    }

    return $html;
}

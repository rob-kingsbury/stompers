<?php
/**
 * Shared helpers used across includes/*.php.
 * Required from index.php before any section is rendered.
 */

if (!function_exists('e')) {
    function e(mixed $s): string {
        return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8');
    }
}

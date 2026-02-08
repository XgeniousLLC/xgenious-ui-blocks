<?php
/**
 * Autoloader for plugin classes.
 *
 * @package XgeniousUIBlocks
 */

namespace XgeniousUIBlocks;

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Autoloader class.
 */
class Autoloader {

    /**
     * Namespace prefix.
     *
     * @var string
     */
    private static $prefix = 'XgeniousUIBlocks\\';

    /**
     * Initialize autoloader.
     */
    public static function init() {
        spl_autoload_register([__CLASS__, 'autoload']);
    }

    /**
     * Autoload classes.
     *
     * @param string $class Class name.
     */
    public static function autoload($class) {
        // Check if class uses our namespace
        if (strpos($class, self::$prefix) !== 0) {
            return;
        }

        // Remove namespace prefix
        $relative_class = substr($class, strlen(self::$prefix));

        // Convert namespace to file path (PSR-4)
        $file = XGENIOUS_UI_BLOCKS_PATH . 'includes/';
        $file .= str_replace('\\', '/', $relative_class);
        $file .= '.php';

        // Check for class file
        if (file_exists($file)) {
            require_once $file;
        }
    }
}

Autoloader::init();

<?php
/**
 * Framework Name: NUXY
 * Framework URI:  https://github.com/StylemixThemes/nuxy
 * Description: WordPress Custom Fields & Theme Options with Vue.js.
 * Version:     4.1.2
 * Author:      StylemixThemes
 * Author URI:  https://stylemixthemes.com
 *
 * @package    WordPress Custom Fields & Theme Options
 * @author     StylemixThemes
 * @copyright  Copyright (c) 2011-2020, StylemixThemes
 * @link       https://github.com/StylemixThemes/nuxy
 * @license    http://www.gnu.org/licenses/gpl-3.0.html
 */

add_action('plugins_loaded', function () {

    if (!function_exists('get_plugin_data')) {
        require_once(ABSPATH . 'wp-admin/includes/plugin.php');
    }

    $framework_versions = apply_filters('wpcfto_versions', array());

    $max_version = array_keys($framework_versions, max($framework_versions));

    if (!class_exists('Stylemix_NUXY') and $max_version[0] === __FILE__) {

        define('STM_WPCFTO_FILE', __FILE__);
        define('STM_WPCFTO_PATH', dirname(STM_WPCFTO_FILE));
        define('STM_WPCFTO_URL', plugin_dir_url(STM_WPCFTO_FILE));

        class Stylemix_NUXY
        {
            function __construct()
            {

                require_once STM_WPCFTO_PATH . '/metaboxes/metabox.php';
                require_once STM_WPCFTO_PATH . '/metaboxes/google_fonts.php';
                require_once STM_WPCFTO_PATH . '/taxonomy_meta/metaboxes.php';
                require_once STM_WPCFTO_PATH . '/settings/settings.php';
                require_once STM_WPCFTO_PATH . '/backward-compatibility.php';


                if (!is_textdomain_loaded('nuxy')) {

                    load_textdomain(
                        'nuxy',
                        STM_WPCFTO_PATH . '/languages/nuxy.mo'
                    );

                }

            }
        }

        new Stylemix_NUXY();
    }
});



add_filter('wpcfto_versions', function ($versions) {

    $plugin_data = get_plugin_data(__FILE__);

    $versions[__FILE__] = $plugin_data['Version'];

    return $versions;

});
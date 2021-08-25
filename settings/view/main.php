<?php

/**
 * Settings Main template.
 *
 * @var $metabox
 * @var $page
 * @var $wpcfto_title
 * @var $wpcfto_sub_title
 * @var $wpcfto_logo
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
} //Exit if accessed directly

if ( empty( $wpcfto_title ) ) {
	$wpcfto_title = $page['page_title'];
}

?>

<?php
$metabox_id = $metabox['id'];
$sections   = $metabox['args'][ $metabox_id ];
$source_id  = 'data-source="settings"';

do_action( "wpcfto_settings_screen_{$metabox_id}_before" );

if ( ! empty( $sections ) ) :
	?>

	<div class="wpcfto-settings"
		v-bind:class="'data-' + data.length"
		data-vue="<?php echo esc_attr( $metabox_id ); ?>" data-source="settings">

		<?php include STM_WPCFTO_PATH . '/settings/view/header.php'; ?>

		<?php require_once STM_WPCFTO_PATH . '/metaboxes/metabox-display.php'; ?>

	</div>

<?php
endif;

do_action( "wpcfto_settings_screen_{$metabox_id}_after" );

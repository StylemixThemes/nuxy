<?php

require_once STM_WPCFTO_PATH . '/helpers/icons.php';

function wpcfto_term_meta_field_icon( $field_key, $value ) {
	?>
	<div class="wpcfto_image_field">
		<input type="text"
			class="wpcfto_font"
			value="<?php echo esc_attr($value); ?>"
			name="<?php echo esc_attr($field_key); ?>"/>
	</div>
	<?php
	$fa_icons_i = array('');
	if ( function_exists('stm_new_fa_icons') ) {
		$fa_icons = stm_wpcfto_new_fa_icons();
		foreach ( $fa_icons as $icon ) {
			$icons        = array_keys($icon);
			$fa_icons_i[] = $icons[0];
		}
	}

	$lr_icons   = stm_wpcfto_add_vc_icons_linear(array());
	$lr_icons   = $lr_icons['Linear'];
	$lr_icons_i = array('');
	foreach ( $lr_icons as $icon ) {
		$icons        = array_keys($icon);
		$lr_icons_i[] = str_replace('lnr-', 'lnricons-', $icons[0]);
	}

	$icons = apply_filters('wpcfto_iconpicker_sets', array(
		'FontAwesome' => $fa_icons_i,
		'Linear' => $lr_icons_i,
	));

	?>
	<script type="text/javascript">
		(function ($) {
			var iconsSearch = icons = <?php echo json_encode($icons); ?>;

			$(document).ready(function () {
				$('.wpcfto_font').each(function () {
					$(this).fontIconPicker({
						source: icons,
						searchSource: iconsSearch,
					});
				});
			});
		})(jQuery)
	</script>
<?php
}

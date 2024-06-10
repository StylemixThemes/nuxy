<?php

function stm_wpcfto_filtered_output( $data ) {
	return apply_filters( 'stm_wpcfto_filter_output', $data );
}

function stm_wpcfto_is_pro() {
	return apply_filters( 'wpcfto_check_is_pro_field', false );
}

function stm_wpcfto_wp_head() {
	?>
	<script type="text/javascript">
		var stm_wpcfto_ajaxurl = '<?php echo esc_url( admin_url( 'admin-ajax.php' ) ); ?>';
	</script>

	<style>
		.vue_is_disabled {
			display: none;
		}
	</style>
	<?php
}

add_action( 'wp_head', 'stm_wpcfto_wp_head' );
add_action( 'admin_head', 'stm_wpcfto_wp_head' );

function stm_wpcfto_nonces() {

	$nonces = array(
		'wpcfto_save_settings',
		'get_image_url',
		'wpcfto_upload_file',
		'wpcfto_search_posts',
		'wpcfto_regenerate_fonts',
	);

	$nonces_list = array();

	foreach ( $nonces as $nonce_name ) {
		$nonces_list[ $nonce_name ] = wp_create_nonce( $nonce_name );
	}

	?>
	<script>
		var stm_wpcfto_nonces = <?php echo wp_json_encode( $nonces_list ); ?>;
	</script>
	<?php
}

add_action( 'admin_head', 'stm_wpcfto_nonces' );
add_action( 'wp_head', 'stm_wpcfto_nonces' );

add_action( 'wp_ajax_stm_wpcfto_get_settings', 'stm_wpcfto_get_settings_callback' );

function stm_wpcfto_get_settings_callback() {
	check_ajax_referer( 'stm_wpcfto_get_settings_nonce', 'nonce' );

	$source = ( isset( $_GET['source'] ) ) ? sanitize_text_field( $_GET['source'] ) : '';
	$name   = ( isset( $_GET['name'] ) ) ? sanitize_text_field( $_GET['name'] ) : '';
	wp_send_json( wpcfto_get_settings_map( $source, $name ) );
}

function wpcfto_get_settings_map( $source, $name ) {
	if ( 'settings' === $source ) {
		$theme_options_page = array_merge(
			apply_filters( 'wpcfto_options_page_setup', array() ),
			apply_filters( 'wpcfto_get_frontend_settings', array() )
		);
		$settings_data      = get_option( $name, array() );
		$settings           = array();
		/*Get Our settings*/
		foreach ( $theme_options_page as $option_page ) {
			if ( $option_page['option_name'] !== $name ) {
				continue;
			}

			$settings = $option_page['fields'];
		}

		$settings_data = apply_filters( 'filter_settings_data_values', $settings_data );

		foreach ( $settings as $section_name => $section ) {
			foreach ( $section['fields'] as $field_name => $field ) {
				$default_value = ( ! empty( $field['value'] ) ) ? $field['value'] : '';
				$settings[ $section_name ]['fields'][ $field_name ]['value'] = ( isset( $settings_data[ $field_name ] ) ) ? $settings_data[ $field_name ] : $default_value;
			}
		}

		return $settings;
	} else {
		$post_id = intval( $source );

		$meta = STM_Metaboxes::convert_meta( $post_id );

		$fields_data = apply_filters( 'stm_wpcfto_fields', array() );
		$sections    = $fields_data[ $name ];

		foreach ( $sections as $section_name => $section ) {
			foreach ( $section['fields'] as $field_name => $field ) {
				$default_value = ( ! empty( $field['value'] ) ) ? $field['value'] : '';
				$value         = ( isset( $meta[ $field_name ] ) ) ? $meta[ $field_name ] : $default_value;
				if ( isset( $value ) ) {
					switch ( $field['type'] ) {
						case 'dates':
							if ( ! empty( $value ) ) {
								$value = explode( ',', $value );
							}
							break;
						case 'answers':
							if ( ! empty( $value ) ) {
								$value = unserialize( $value );
							}
							break;
						case 'repeater':
							if ( empty( $value ) ) {
								$value = array();
							}
							break;
					}
				}
				$sections[ $section_name ]['fields'][ $field_name ]['value'] = $value;
			}
		}

		return $sections;

	}

}


function stm_wpcfto_get_options( $option_name, $option = '', $default_value = null ) {
	$options = get_option( $option_name, array() );

	if ( empty( $option ) ) {
		return $options;
	}

	return isset( $options[ $option ] ) ? $options[ $option ] : $default_value;

}


add_action( 'wp_ajax_wpcfto_get_image_url', 'wpcfto_get_image_url' );

function wpcfto_get_image_url() {
	if ( empty( $_GET['image_id'] ) ) {
		die;
	}
	wp_send_json( wp_get_attachment_url( intval( $_GET['image_id'] ) ) );
}

function wpcfto_sanitize_string( $taxonomy ) {
	return apply_filters( 'wpcfto_sanitize_string', urldecode( sanitize_title( urldecode( $taxonomy ) ) ), $taxonomy );
}

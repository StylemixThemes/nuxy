<?php

class WPCFTO_Front_Settings {

	public static function render( $option_name ) {
		$front_options = apply_filters( 'wpcfto_get_frontend_settings', array() );

		foreach ( $front_options as $front_option ) {
			if ( $front_option['option_name'] !== $option_name ) {
				continue;
			}

			$options = $front_option;
		}

		if ( empty( $options['option_name'] ) || empty( $options['page'] ) || ! isset( $options['fields'] ) ) {
			return;
		}

		$page             = $options['page'];
		$option_name      = $options['option_name'];
		$wpcfto_title     = ( ! empty( $options['title'] ) ) ? $options['title'] : '';
		$wpcfto_sub_title = ( ! empty( $options['sub_title'] ) ) ? $options['sub_title'] : '';
		$wpcfto_logo      = ( ! empty( $options['logo'] ) ) ? $options['logo'] : STM_WPCFTO_URL . '/metaboxes/assets/images/stm-logo.svg';
		$settings         = get_option( $option_name, array() );
		$metabox          = apply_filters( $option_name, array(
			'id'   => $option_name,
			'args' => array(
				$option_name => $options['fields']
			)
		) );

		foreach ( $metabox['args'][ $option_name ] as $section_name => $section ) {
			foreach ( $section['fields'] as $field_name => $field ) {
				$default_value = ( ! empty( $field['value'] ) ) ? $field['value'] : '';
				$metabox['args'][ $option_name ][ $section_name ]['fields'][ $field_name ]['value'] = ( isset( $settings[ $field_name ] ) ) ? $settings[ $field_name ] : $default_value;
			}
		}

		STM_Metaboxes::wpcfto_scripts();

		include STM_WPCFTO_PATH . '/settings/view/main.php';
	}

}

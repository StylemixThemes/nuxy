<?php

new WPCFTO_Gfonts();

class WPCFTO_Gfonts {

	public function __construct() {
	}

	public static function variants() {
		return array(
			'100'       => esc_html__( 'Thin 100', 'nuxy' ),
			'100italic' => esc_html__( 'Thin 100 italic', 'nuxy' ),
			'300'       => esc_html__( 'Light 300', 'nuxy' ),
			'300italic' => esc_html__( 'Light 300 italic', 'nuxy' ),
			'regular'   => esc_html__( 'Regular 400', 'nuxy' ),
			'italic'    => esc_html__( 'Regular 400 italic', 'nuxy' ),
			'500'       => esc_html__( 'Medium 500', 'nuxy' ),
			'500italic' => esc_html__( 'Medium 500 italic', 'nuxy' ),
			'700'       => esc_html__( 'Bold 700', 'nuxy' ),
			'700italic' => esc_html__( 'Bold 700 italic', 'nuxy' ),
			'900'       => esc_html__( 'Black 900', 'nuxy' ),
			'900italic' => esc_html__( 'Black 900 italic', 'nuxy' ),
		);
	}

	public static function subsets() {
		return array(
			'cyrillic'     => esc_html__( 'Cyrillic', 'nuxy' ),
			'cyrillic-ext' => esc_html__( 'Cyrillic ext', 'nuxy' ),
			'greek'        => esc_html__( 'Greek', 'nuxy' ),
			'greek-ext'    => esc_html__( 'Greek ext', 'nuxy' ),
			'latin'        => esc_html__( 'Latin', 'nuxy' ),
			'latin-ext'    => esc_html__( 'Latin ext', 'nuxy' ),
			'vietnamese'   => esc_html__( 'Vietnamese', 'nuxy' ),
		);
	}

	public static function align() {
		return array(
			'none'   => esc_html__( 'Default', 'nuxy' ),
			'left'   => esc_html__( 'Left', 'nuxy' ),
			'center' => esc_html__( 'Center', 'nuxy' ),
			'right'  => esc_html__( 'Right', 'nuxy' ),
		);
	}

	public static function transform() {
		return array(
			'none'       => esc_html__( 'Normal', 'nuxy' ),
			'uppercase'  => esc_html__( 'Uppercase', 'nuxy' ),
			'lowercase'  => esc_html__( 'Lowercase', 'nuxy' ),
			'capitalize' => esc_html__( 'Capitalize', 'nuxy' ),
		);
	}

	public static function fonts_json() {
		return STM_WPCFTO_PATH . '/metaboxes/assets/webfonts/google-fonts.json';
	}

	public static function google_fonts() {
		$g_fonts = json_decode( file_get_contents( self::fonts_json() ), true );

		return (
			array(
				'google'  => $g_fonts['items'],
				'websafe' => array(
					'Arial',
					'Arial Black',
					'Verdana',
					'Tahoma',
					'Trebuchet MS',
					'Impact',
					'Times New Roman',
					'Courier',
					'Lucida Console',
					'Monaco',
					'Bradley Hand',
					'Brush Script MT',
					'Luminari',
					'Comic Sans MS',
				),
			)
		);
	}
}

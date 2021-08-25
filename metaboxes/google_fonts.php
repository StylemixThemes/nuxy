<?php

new WPCFTO_Gfonts();

class WPCFTO_Gfonts {

	public function __construct() {
	}

	public static function variants() {
		return array(
			'100' => esc_html__('Thin 100', 'wpcfto'),
			'100italic' => esc_html__('Thin 100 italic', 'wpcfto'),
			'300' => esc_html__('Light 300', 'wpcfto'),
			'300italic' => esc_html__('Light 300 italic', 'wpcfto'),
			'regular' => esc_html__('Regular 400', 'wpcfto'),
			'italic' => esc_html__('Regular 400 italic', 'wpcfto'),
			'500' => esc_html__('Medium 500', 'wpcfto'),
			'500italic' => esc_html__('Medium 500 italic', 'wpcfto'),
			'700' => esc_html__('Bold 700', 'wpcfto'),
			'700italic' => esc_html__('Bold 700 italic', 'wpcfto'),
			'900' => esc_html__('Black 900', 'wpcfto'),
			'900italic' => esc_html__('Black 900 italic', 'wpcfto')
		);
	}

	public static function subsets() {
		return array(
			'cyrillic' => esc_html__('Cyrillic', 'wpcfto'),
			'cyrillic-ext' => esc_html__('Cyrillic ext', 'wpcfto'),
			'greek' => esc_html__('Greek', 'wpcfto'),
			'greek-ext' => esc_html__('Greek ext', 'wpcfto'),
			'latin' => esc_html__('Latin', 'wpcfto'),
			'latin-ext' => esc_html__('Latin ext', 'wpcfto'),
			'vietnamese' => esc_html__('Vietnamese', 'wpcfto')
		);
	}

	public static function align() {
		return array(
			'left' => esc_html__('Left', 'wpcfto'),
			'center' => esc_html__('Center', 'wpcfto'),
			'right' => esc_html__('Right', 'wpcfto'),
		);
	}

	public static function transform() {
		return array(
			'none' => esc_html__('Normal', 'wpcfto'),
			'uppercase' => esc_html__('Uppercase', 'wpcfto'),
			'lowercase' => esc_html__('Lowercase', 'wpcfto'),
			'capitalize' => esc_html__('Capitalize', 'wpcfto'),
		);
	}

	public static function fonts_json() {
		return STM_WPCFTO_PATH . '/metaboxes/assets/webfonts/google-fonts.json';
	}

	public static function google_fonts() {
		$g_fonts = json_decode(file_get_contents(self::fonts_json()), true);

		return (
			array(
				'google' => $g_fonts['items'],
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
					'Comic Sans MS'
				)
			)
		);
	}
}

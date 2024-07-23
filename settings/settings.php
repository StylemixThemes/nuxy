<?php

class WPCFTO_Settings {

	public $option_name;
	public $page_args;
	public $fields;
	private $setup;

	public function __construct( $option_name, $page_args, $fields, $setup ) {

		$this->option_name = $option_name;
		$this->page_args   = $page_args;
		$this->fields      = $fields;
		$this->setup       = $setup;

		add_action( 'admin_menu', array( $this, 'settings_page' ), 1000 );
		add_action( 'wp_ajax_wpcfto_save_settings', array( $this, 'stm_save_settings' ) );
		add_action( 'wp_ajax_wpcfto_regenerate_fonts', array( $this, 'stm_regenerate_fonts' ) );
		add_filter( 'wpcfto_enable_regenerate_fonts', array( $this, 'stm_enable_regenerate_fonts' ) );

		if ( ! empty( $this->setup['admin_bar_title'] ) ) {
			add_action( 'admin_bar_menu', array( $this, 'admin_bar_button' ), 40 );
			add_action( 'wp_head', array( $this, 'admin_bar_styles' ) );
			add_action( 'admin_head', array( $this, 'admin_bar_styles' ) );
		}

	}

	public function admin_bar_styles() {
		$selector = "#wp-admin-bar-{$this->setup['option_name']}";
		?>
		<style>
			<?php echo esc_attr( $selector ); ?>
			img {
				max-width: 25px;
				vertical-align: top;
				position: relative;
				top: 3px;
			}
		</style>
		<?php
	}

	public function admin_bar_button( $wp_admin_bar ) {
		$url         = add_query_arg( 'page', $this->setup['page']['menu_slug'], admin_url() );
		$wpcfto_logo = ( ! empty( $this->setup['logo'] ) ) ? $this->setup['logo'] : STM_WPCFTO_URL . '/metaboxes/assets/images/stm-logo.svg';
		$title       = $this->setup['admin_bar_title'];
		$menu        = "<img src='{$wpcfto_logo}' /> {$title}";

		$args = array(
			'id'    => $this->setup['option_name'],
			'title' => $menu,
			'href'  => $url,
			'meta'  => array(
				'title' => $title,
			),
		);
		$wp_admin_bar->add_node( $args );
	}

	public function settings_page() {
		if ( current_user_can( 'manage_options' ) ) {

			if ( ! empty( $this->page_args['parent_slug'] ) ) {
				$r = add_submenu_page(
					$this->page_args['parent_slug'],
					$this->page_args['page_title'],
					$this->page_args['menu_title'],
					'manage_options',
					$this->page_args['menu_slug'],
					array( $this, 'settings_page_view' )
				);
			} else {
				add_menu_page(
					$this->page_args['page_title'],
					$this->page_args['menu_title'],
					'manage_options',
					$this->page_args['menu_slug'],
					array( $this, 'settings_page_view' ),
					$this->page_args['icon'],
					$this->page_args['position']
				);
			}

			do_action( "wpcfto_screen_{$this->option_name}_added" );
		}
	}

	public static function stm_get_post_type_array( $post_type, $args = array() ) {
		$r = array(
			'' => esc_html__( 'Choose Page', 'nuxy' ),
		);

		$default_args = array(
			'post_type'      => $post_type,
			'posts_per_page' => - 1,
			'post_status'    => 'publish',
		);

		$q = get_posts( wp_parse_args( $args, $default_args ) );

		if ( ! empty( $q ) ) {
			foreach ( $q as $post_data ) {
				$r[ $post_data->ID ] = $post_data->post_title;
			}
		}

		wp_reset_postdata();

		return $r;
	}

	public function wpcfto_settings() {
		$args                       = array();
		$args[ $this->option_name ] = $this->fields;

		return apply_filters(
			$this->option_name,
			array(
				'id'   => $this->option_name,
				'args' => $args,
			)
		);
	}

	public function wpcfto_get_settings() {
		return get_option( $this->option_name, array() );
	}

	public function settings_page_view() {
		$metabox               = $this->wpcfto_settings();
		$settings              = $this->wpcfto_get_settings();
		$page                  = $this->page_args;
		$wpcfto_title          = ( ! empty( $this->setup['title'] ) ) ? $this->setup['title'] : '';
		$wpcfto_sub_title      = ( ! empty( $this->setup['sub_title'] ) ) ? $this->setup['sub_title'] : '';
		$wpcfto_logo           = ( ! empty( $this->setup['logo'] ) ) ? $this->setup['logo'] : STM_WPCFTO_URL . '/metaboxes/assets/images/stm-logo.svg';
		$wpcfto_settings_alert = ( ! empty( $this->setup['save_settings_alert'] ) ) ? $this->setup['save_settings_alert'] : array(
			'position'      => 'top_right',
			'success_alert' => array(
				'title'    => esc_html__( 'Saved!', 'nuxy' ),
				'subtitle' => esc_html__( 'Settings are changed', 'nuxy' ),
			),
			'error_alert'   => array(
				'title'    => esc_html__( 'Oops, something went wrong', 'nuxy' ),
				'subtitle' => esc_html__( 'Settings are not changed', 'nuxy' ),
			),
		);

		foreach ( $metabox['args'][ $this->option_name ] as $section_name => $section ) {
			foreach ( $section['fields'] as $field_name => $field ) {
				$default_value = ( ! empty( $field['value'] ) ) ? $field['value'] : '';
				$metabox['args'][ $this->option_name ][ $section_name ]['fields'][ $field_name ]['value'] = ( isset( $settings[ $field_name ] ) ) ? $settings[ $field_name ] : $default_value;
			}
		}

		include STM_WPCFTO_PATH . '/settings/view/main.php';
	}

	public static function get_my_settings() {

	}

	public function stm_save_settings() {
		check_ajax_referer( 'wpcfto_save_settings', 'nonce' );

		if ( ! current_user_can( 'manage_options' ) ) {
			die;
		}

		if ( empty( $_REQUEST['name'] ) ) {
			die;
		}

		$id           = sanitize_text_field( $_REQUEST['name'] );
		$settings     = array();
		$request_body = file_get_contents( 'php://input' );
		if ( ! empty( $request_body ) ) {
			$request_body = json_decode( $request_body, true );
			foreach ( $request_body as $section_name => $section ) {
				foreach ( $section['fields'] as $field_name => $field ) {
					if ( ! empty( $field['value']['font-data']['family'] ) ) {
						$font                                     = new WPCFTO_WebFont_Loader( $field['value'], $field_name );
						$field['value']['font-data']['local_url'] = $font->get_url();
					}
					if ( ! isset( $field['readonly'] ) || ! $field['readonly'] ) {
						$settings[ $field_name ] = $field['value'];
					}
				}
			}
		}

		$response = array(
			'reload'  => false,
			'updated' => false,
		);

		$response['reload'] = apply_filters( 'wpcfto_reload_after_save', $id, $settings );

		do_action( 'wpcfto_settings_saved', $id, $settings );

		$response['updated'] = update_option( $id, $settings );

		do_action( 'wpcfto_after_settings_saved', $id, $settings );

		wp_send_json( $response );
	}

	public function stm_regenerate_fonts() {
		check_ajax_referer( 'wpcfto_regenerate_fonts', 'nonce' );

		if ( ! current_user_can( 'manage_options' ) && ! class_exists( 'WPCFTO_WebFont_Loader' ) ) {
			die;
		}

		$settings = $this->wpcfto_get_settings();

		$response = array(
			'reload'    => true,
			'generated' => false,
		);

		$wpcfto_webfont = new WPCFTO_WebFont_Loader();
		$wpcfto_webfont->delete_fonts_folder();

		foreach ( $settings as $field_name => $field ) {
			if ( ! empty( $field['font-data']['family'] ) ) {
				$font                                              = new WPCFTO_WebFont_Loader( $field, $field_name );
				$settings[ $field_name ]['font-data']['local_url'] = $font->get_url();
			}
		}
		$response['generated'] = update_option( $this->option_name, $settings );

		wp_send_json( $response );
	}

	public function stm_enable_regenerate_fonts( $val ) {
		if ( ! current_user_can( 'manage_options' ) && ! class_exists( 'WPCFTO_WebFont_Loader' ) ) {
			return false;
		}

		$settings = $this->wpcfto_get_settings();
		if ( ! empty( $settings ) ) {
			foreach ( $settings as $field_name => $field ) {
				if ( ! empty( $field['font-data']['family'] ) ) {
					return true;
				}
			}
		}

		return false;
	}
}

add_action(
	'init',
	function () {
		if ( ! is_admin() ) {
			return;
		}

		$theme_options_page = apply_filters( 'wpcfto_options_page_setup', array() );

		if ( ! empty( $theme_options_page ) ) {
			foreach ( $theme_options_page as $setup ) {
				if ( empty( $setup['option_name'] ) || empty( $setup['page'] ) || ! isset( $setup['fields'] ) ) {
					continue;
				}

				new WPCFTO_Settings( $setup['option_name'], $setup['page'], $setup['fields'], $setup );
			}
		}
	}
);

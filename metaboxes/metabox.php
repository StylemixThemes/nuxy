<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

class STM_Metaboxes {

	public function __construct() {
		require_once STM_WPCFTO_PATH . '/helpers/helpers.php';

		require_once STM_WPCFTO_PATH . '/helpers/file_upload.php';

		add_action( 'add_meta_boxes', array( $this, 'wpcfto_register_meta_boxes' ) );

		add_action( 'admin_enqueue_scripts', array( self::class, 'wpcfto_scripts' ) );

		add_action( 'save_post', array( $this, 'wpcfto_save' ), 10, 3 );

		add_action( 'wp_ajax_wpcfto_search_posts', 'STM_Metaboxes::search_posts' );

		add_filter( 'safe_style_css', 'STM_Metaboxes::add_safe_style', 100 );

		add_action( 'admin_init', array( $this, 'enqueue' ), 10 );
	}

	public function enqueue() {
		$assets = STM_WPCFTO_URL . 'metaboxes/assets';
		wp_enqueue_style( 'ctrumbowyg', $assets . '/vendors/trumbowyg/ctrumbowyg.css', array(), STM_WPCFTO_VERSION );
		wp_enqueue_style( 'color-trumbowyg', $assets . '/vendors/trumbowyg/color-trumbowyg.css', array(), STM_WPCFTO_VERSION );
		wp_enqueue_script( 'strumbowyg', $assets . '/vendors/trumbowyg/strumbowyg.js', array( 'jquery' ), STM_WPCFTO_VERSION, true );
		wp_enqueue_script( 'vtrumbowyg', $assets . '/vendors/trumbowyg/vtrumbowyg.js', array( 'jquery' ), STM_WPCFTO_VERSION, true );
		wp_enqueue_script( 'color-trumbowyg', $assets . '/vendors/trumbowyg/color-trumbowyg.js', array( 'jquery' ), STM_WPCFTO_VERSION, true );
	}

	public function boxes() {
		return apply_filters( 'stm_wpcfto_boxes', array() );
	}

	public static function get_users() {
		$users = array(
			'' => apply_filters( 'wpcfto_all_users_label', esc_html__( 'Choose User', 'nuxy' ) ),
		);

		if ( ! is_admin() ) {
			return $users;
		}

		$users_data = get_users();
		foreach ( $users_data as $user ) {
			$users[ $user->ID ] = $user->data->user_nicename;
		}

		return $users;
	}

	public function fields() {
		return apply_filters( 'stm_wpcfto_fields', array() );
	}

	public function get_fields( $metaboxes ) {
		global $post_id;

		$fields = array();

		if ( ! isset( $_REQUEST['_wpnonce'] ) || ! wp_verify_nonce( sanitize_text_field( $_REQUEST['_wpnonce'] ), 'update-post_' . $post_id ) ) {
			return $fields;
		}

		foreach ( $metaboxes as $metabox_name => $metabox ) {
			foreach ( $metabox as $section ) {
				foreach ( $section['fields'] as $field_name => $field ) {

					$sanitize = ( ! empty( $field['sanitize'] ) ) ? $field['sanitize'] : 'wpcfto_save_field';

					$field_modified = '';

					if ( isset( $_POST[ $field_name ] ) ) {
						if ( 'editor' === $field['type'] ) {
							$field_modified = wp_kses_post( $_POST[ $field_name ] );
						} else {
							$field_modified = is_array( $_POST[ $field_name ] )
								// phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
								? $this->wpcfto_sanitize_array_field( $_POST[ $field_name ] )
								: sanitize_text_field( $_POST[ $field_name ] );
						}

						if ( method_exists( 'STM_Metaboxes', "wpcfto_field_sanitize_{$field['type']}" ) ) {
							$field_modified = call_user_func(
								array(
									$this,
									"wpcfto_field_sanitize_{$field['type']}",
								),
								$field_modified
							);
						}

						$field_modified = call_user_func( array( $this, $sanitize ), $field_modified, $field_name );
					}
					$field_modified_array = json_decode( wp_unslash( $field_modified ), true );
					if ( ! empty( $field_modified_array ) && ! empty( $field_modified_array['font-data']['family'] ) ) {
						$font                                           = new WPCFTO_WebFont_Loader( $field_modified_array, $field_name . '_' . $post_id );
						$field_modified_array['font-data']['local_url'] = $font->get_url();
						$field_modified                                 = json_encode( wp_slash( $field_modified_array ) );
					}

					$fields[ $field_name ] = $field_modified;
				}
			}
		}

		return $fields;
	}

	public function wpcfto_sanitize_array_field( $value ) {
		if ( is_array( $value ) ) {
			foreach ( $value as $key => &$val ) {
				if ( is_array( $val ) ) {
					$val = $this->wpcfto_sanitize_array_field( $val );
				} else {
					$val = 'isTrue' === $key
						? rest_sanitize_boolean( $val )
						: sanitize_text_field( $val );
				}
			}
		}

		return $value;
	}

	public function wpcfto_field_sanitize_repeater( $value ) {
		$decoded = json_decode( $value );
		$value   = ( null === $decoded ) ? $value : $decoded;

		if ( is_array( $value ) && empty( $value ) ) {
			$value = '';
		}

		return $value;
	}

	public function wpcfto_save_field( $value ) {
		return $value;
	}

	public function wpcfto_save_number( $value ) {
		$value = floatval( $value );
		if ( 0 === $value ) {
			return '';
		}

		return $value;
	}


	public static function add_safe_style( $tags ) {
		$allowed = array(
			'style',
		);

		return array_merge( $allowed, $tags );
	}

	public function wpcfto_save_dates( $value, $field_name ) {
		global $post_id;

		$dates = array();

		if ( ! isset( $_REQUEST['_wpnonce'] ) || ! wp_verify_nonce( sanitize_text_field( $_REQUEST['_wpnonce'] ), 'update-post_' . $post_id ) ) {
			return $value;
		}

		if ( isset( $_POST[ "{$field_name}_start" ] ) ) {
			$dates[] = sanitize_text_field( $_POST[ "{$field_name}_start" ] );
		}
		if ( isset( $_POST[ "{$field_name}_end" ] ) ) {
			$dates[] = sanitize_text_field( $_POST[ "{$field_name}_end" ] );
		}

		if ( ! empty( $dates ) && count( $dates ) > 1 ) {
			update_post_meta( $post_id, $field_name . '_start', $dates[0] );
			update_post_meta( $post_id, $field_name . '_end', $dates[1] );
		}

		return $value;
	}

	public function wpcfto_register_meta_boxes() {
		$boxes = $this->boxes();
		foreach ( $boxes as $box_id => $box ) {
			$box_name = $box['label'];
			add_meta_box(
				$box_id,
				$box_name,
				array(
					$this,
					'wpcfto_display_callback',
				),
				$box['post_type'],
				'normal',
				'high',
				$this->fields()
			);
		}
	}

	public function wpcfto_display_callback( $post, $metabox ) {
		$meta = $this->convert_meta( $post->ID );
		foreach ( $metabox['args'] as $metabox_name => $metabox_data ) {
			foreach ( $metabox_data as $section_name => $section ) {
				foreach ( $section['fields'] as $field_name => $field ) {
					$default_value = ( ! empty( $field['value'] ) ) ? $field['value'] : '';
					$value         = ( isset( $meta[ $field_name ] ) ) ? $meta[ $field_name ] : $default_value;
					if ( ! empty( $value ) ) {
						switch ( $field['type'] ) {
							case 'dates':
								$value = explode( ',', $value );
								break;
							case 'answers':
								$value = unserialize( $value ); // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.serialize_unserialize
								break;
						}
					}
					$metabox['args'][ $metabox_name ][ $section_name ]['fields'][ $field_name ]['value'] = $value;
				}
			}
		}
		include STM_WPCFTO_PATH . '/metaboxes/metabox-display.php';
	}

	public static function convert_meta( $post_id ) {
		$meta  = get_post_meta( $post_id );
		$metas = array();
		foreach ( $meta as $meta_name => $meta_value ) {
			$metas[ $meta_name ] = $meta_value[0];
		}

		return $metas;
	}

	public static function translations() {
		return array(
			'font_size'                          => esc_html__( 'Font size', 'nuxy' ),
			'line_height'                        => esc_html__( 'Line height', 'nuxy' ),
			'word_spacing'                       => esc_html__( 'Word spacing', 'nuxy' ),
			'letter_spacing'                     => esc_html__( 'Letter spacing', 'nuxy' ),
			'font_family'                        => esc_html__( 'Font Family', 'nuxy' ),
			'backup_font_family'                 => esc_html__( 'Backup Font Family', 'nuxy' ),
			'font_weight'                        => esc_html__( 'Font Weignt & Style', 'nuxy' ),
			'font_subset'                        => esc_html__( 'Font Subsets', 'nuxy' ),
			'text_align'                         => esc_html__( 'Text Align', 'nuxy' ),
			'font_color'                         => esc_html__( 'Font Color', 'nuxy' ),
			'text-transform'                     => esc_html__( 'Text transform', 'nuxy' ),
			'export'                             => esc_html__( 'Copy settings', 'nuxy' ),
			'import'                             => esc_html__( 'Import settings', 'nuxy' ),
			'import_notice'                      => esc_html__( 'WARNING! This will overwrite all existing option values, please proceed with caution!', 'nuxy' ),
			'exported_data'                      => esc_html__( 'Settings copied to buffer', 'nuxy' ),
			'exported_data_error'                => esc_html__( 'Couldn\'t copy settings', 'nuxy' ),
			'export_data_label'                  => esc_html__( 'Export options', 'nuxy' ),
			'import_data_label'                  => esc_html__( 'Import options', 'nuxy' ),
			'vue_select_notice'                  => esc_html__( 'Sorry, no matching options.', 'nuxy' ),
			'regenerate_fonts_btn'               => esc_html__( 'Synchronize', 'nuxy' ),
			'regenerate_fonts_title'             => esc_html__( 'Font Synchronize', 'nuxy' ),
			'regenerate_fonts_notice'            => esc_html__( 'Sync and update your fonts if they are displayed incorrectly on your website.', 'nuxy' ),
			'fonts_download_setting_label'       => esc_html__( 'Download Google Fonts', 'nuxy' ),
			'fonts_download_setting_description' => esc_html__( 'Download and store Google Fonts locally. Set the fonts in the typography.', 'nuxy' ),
		);
	}

	public static function wpcfto_scripts() {
		$v      = STM_WPCFTO_VERSION;
		$base   = STM_WPCFTO_URL . 'metaboxes/assets/';
		$assets = STM_WPCFTO_URL . 'metaboxes/assets/';

		wp_enqueue_media();
		wp_enqueue_script( 'vue.js', $base . 'js/vue.min.js', array( 'jquery' ), $v, true );
		wp_enqueue_script( 'vue-resource.js', $base . 'js/vue-resource.min.js', array( 'vue.js' ), $v, true );
		wp_enqueue_script( 'vue2-datepicker.js', $base . 'js/vue2-datepicker.min.js', array( 'vue.js' ), $v, true );
		wp_enqueue_script( 'vue-select.js', $base . 'js/vue-select.js', array( 'vue.js' ), $v, true );
		wp_enqueue_script( 'vue2-editor.js', $base . 'js/vue2-editor.min.js', array( 'vue.js' ), $v, true );
		wp_enqueue_script( 'vue2-color.js', $base . 'js/vue-color.min.js', array( 'vue.js' ), $v, true );
		wp_enqueue_script( 'sortable.js', $base . 'js/sortable.min.js', array( 'vue.js' ), $v, true );
		wp_enqueue_script( 'vue-draggable.js', $base . 'js/vue-draggable.min.js', array( 'sortable.js' ), $v, true );
		wp_enqueue_script( 'wpcfto_mixins.js', $base . 'js/mixins.js', array( 'vue.js' ), $v, true );
		wp_enqueue_script( 'wpcfto_metaboxes.js', $base . 'js/metaboxes.js', array( 'vue.js' ), $v, true );

		wp_add_inline_script( 'wpcfto_metaboxes.js', 'const WPCFTO_EventBus = new Vue();' );

		wp_localize_script(
			'wpcfto_metaboxes.js',
			'wpcfto_global_settings',
			array(
				'fonts_list'   => WPCFTO_Gfonts::google_fonts(),
				'variants'     => WPCFTO_Gfonts::variants(),
				'subsets'      => WPCFTO_Gfonts::subsets(),
				'align'        => WPCFTO_Gfonts::align(),
				'translations' => self::translations(),
				'transform'    => WPCFTO_Gfonts::transform(),
				'nonce'        => wp_create_nonce( 'stm_wpcfto_get_settings_nonce' ),
			)
		);

		wp_enqueue_style( 'wpcfto-metaboxes.css', $base . 'css/main.css', array(), $v );
		wp_enqueue_style( 'linear-icons', $base . 'css/linear-icons.css', array( 'wpcfto-metaboxes.css' ), $v );
		wp_enqueue_style( 'font-awesome-min', $assets . 'vendors/font-awesome.min.css', null, $v, 'all' );
		wp_enqueue_style( 'vue-multiselect-min', $assets . 'vendors/vue-multiselect.min.css', null, $v, 'all' );

		if ( is_rtl() ) {
			wp_enqueue_style( 'nuxy-rtl', $base . 'css/rtl.css', array( 'wpcfto-metaboxes.css' ), $v );
		}

		/*GENERAL COMPONENTS*/
		$components = array(
			'group_title',
			'text',
			'time',
			'number',
			'image',
			'checkbox',
			'date',
			'dates',
			'select',
			'radio',
			'textarea',
			'hint_textarea',
			'color',
			'autocomplete',
			'editor',
			'repeater',
			'file',
			'notice',
			'notice_banner',
			'notification_message',
			'button_group',
			'button_list',
			'image_select',
			'data_select',
			'spacing',
			'link_color',
			'multi_checkbox',
			'sorter',
			'gallery',
			'multi_input',
			'ace_editor',
			'color_gradient',
			'icon_picker',
			'range_slider',
			'typography',
			'multiselect',
			'import_export',
			'trumbowyg',
		);

		foreach ( $components as $component ) {
			wp_enqueue_script(
				"wpcfto_{$component}_component",
				STM_WPCFTO_URL . "/metaboxes/general_components/js/{$component}.js",
				array( 'wpcfto_metaboxes.js' ),
				$v,
				true
			);
		}

		wp_enqueue_script(
			'wpcfto_fields_layout_component',
			STM_WPCFTO_URL . '/metaboxes/general_components/js/fields_aside.js',
			array( 'wpcfto_metaboxes.js' ),
			$v,
			true
		);

		$icons        = array();
		$font_awesome = stm_wpcfto_new_fa_icons();
		array_walk(
			$font_awesome,
			function ( &$icon ) {
				reset( $icon );
				$title = key( $icon );
				$icon  = array(
					'title'       => $title,
					'searchTerms' => array( $icon[ $title ] ),
				);
			}
		);

		$icons = array_merge( $icons, $font_awesome );

		wp_localize_script(
			'wpcfto_icon_picker_component',
			'wpcfto_icons_set',
			apply_filters( 'wpcfto_icons_set', $icons )
		);

		do_action( 'wpcfto_enqueue_scripts' );
	}

	public function wpcfto_post_types() {
		$post_types = array();
		$boxes      = $this->boxes();
		if ( ! empty( $boxes ) ) {
			foreach ( $boxes as $box ) {
				if ( empty( $box['post_type'] ) || ! empty( $box['skip_post_type'] ) ) {
					continue;
				}
				$post_types = array_merge( $post_types, $box['post_type'] );
			}
		}

		$post_types = array_unique( $post_types );

		return apply_filters( 'wpcfto_post_types', $post_types );
	}

	public function wpcfto_save( $post_id, $post ) {
		$post_type = get_post_type( $post_id );

		if ( ! isset( $_REQUEST['_wpnonce'] )
			|| ! wp_verify_nonce( sanitize_text_field( $_REQUEST['_wpnonce'] ), 'update-post_' . $post_id )
			|| ! in_array( $post_type, $this->wpcfto_post_types(), true )
		) {
			return;
		}

		if ( ! empty( $_POST ) && ! empty( $_POST['action'] ) && 'editpost' === $_POST['action'] ) {
			$fields = $this->get_fields( $this->fields() );

			foreach ( $fields as $field_name => $field_value ) {
				update_post_meta( $post_id, $field_name, $field_value );
			}
		}
	}

	public static function search_posts() {
		check_ajax_referer( 'wpcfto_search_posts', 'nonce' );

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json( array( 'error' => 'Forbidden' ) );
		}

		$r = array();

		$args = array(
			'posts_per_page' => 10,
		);

		if ( ( isset( $_GET['ids'] ) && empty( $_GET['ids'] ) ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json( $r );
		}

		if ( ! empty( $_GET['post_types'] ) ) {
			$args['post_type'] = explode( ',', sanitize_text_field( $_GET['post_types'] ) );
		}

		if ( ! empty( $_GET['s'] ) ) {
			$args['s'] = sanitize_text_field( $_GET['s'] );
		}

		if ( isset( $_GET['ids'] ) ) {
			$args['post__in'] = explode( ',', sanitize_text_field( $_GET['ids'] ) );
		}

		if ( ! empty( $_GET['exclude_ids'] ) ) {
			$args['post__not_in'] = explode( ',', sanitize_text_field( $_GET['exclude_ids'] ) );
		}

		if ( ! empty( $_GET['orderby'] ) ) {
			$args['orderby'] = sanitize_text_field( $_GET['orderby'] );
		}

		if ( ! empty( $_GET['posts_per_page'] ) ) {
			$args['posts_per_page'] = sanitize_text_field( $_GET['posts_per_page'] );
		}

		$user  = wp_get_current_user();
		$roles = (array) $user->roles;

		if ( ! in_array( 'administrator', $roles, true ) ) {
			$args['author'] = get_current_user_id();
		}

		if ( ! empty( $_GET['course_id'] ) ) {
			$course_id = intval( $_GET['course_id'] );
			$authors   = array();
			$authors[] = intval( get_post_field( 'post_author', $course_id ) );
			$authors[] = get_post_meta( $course_id, 'co_instructor', true );

			$args['author__in'] = $authors;
		}

		$args = apply_filters( 'wpcfto_search_posts_args', $args );

		/*If somebody applied custom filter just return custom array*/
		if ( ! empty( $_GET['name'] ) ) {
			$name     = sanitize_text_field( $_GET['name'] );
			$filtered = apply_filters( "stm_wpcfto_autocomplete_{$name}", null, $args );
			$r        = $filtered;

			if ( ! empty( $args['post__in'] ) ) {

				$data = array();

				foreach ( $r as $item ) {
					if ( ! in_array( $item['id'], $args['post__in'] ) ) {
						continue;
					}

					$data[] = $item;
				}

				$r = $data;
			}

			if ( ! empty( $r ) || isset( $filtered ) ) {
				wp_send_json( $r );
			}
		}

		$q = new WP_Query( $args );
		if ( $q->have_posts() ) {
			while ( $q->have_posts() ) {
				$q->the_post();

				$id = get_the_ID();

				if ( empty( $id ) ) {
					continue;
				}

				$response = array(
					'id'        => get_the_ID(),
					'title'     => get_the_title(),
					'post_type' => get_post_type( get_the_ID() ),
					'excerpt'   => get_the_excerpt( get_the_ID() ),
					'image'     => get_the_post_thumbnail_url( get_the_ID(), 'thumbnail' ),
				);

				$r[] = apply_filters( 'wpcfto_search_posts_response', $response, $args['post_type'] );
			}

			wp_reset_postdata();
		}

		if ( ! empty( $_GET['ids'] ) ) {
			$insert_sections = array();

			foreach ( $args['post__in'] as $key => $post ) {
				if ( ! empty( $post ) && ! is_numeric( $post ) ) {
					$insert_sections[ $key ] = array(
						'id'    => $post,
						'title' => $post,
					);
				}
			}

			foreach ( $insert_sections as $position => $inserted ) {
				array_splice( $r, $position, 0, array( $inserted ) );
			}
		}

		if ( ! empty( $name ) ) {
			wp_send_json( apply_filters( "stm_wpcfto_autocomplete_{$name}_output", $r ) );
		}

		wp_send_json( $r );
	}

}

new STM_Metaboxes();

function wpcfto_metaboxes_deps( $field, $section_name ) {
	$dependency   = '';
	$dependencies = array();

	if ( ! empty( $field['field_disabled'] ) && 'yes' === $field['field_disabled'] ) {
		$dependency = "v-bind:class=\"{'wpcfto-field-disabled' : true}\"";
	}

	if ( empty( $field['dependency'] ) ) {
		return $dependency;
	}

	if ( ! empty( $field['dependencies'] ) ) {
		$mode = $field['dependencies'];

		foreach ( $field['dependency'] as $dep ) {
			$sectionName = ( isset( $dep['section'] ) ) ? $dep['section'] : $section_name;

			$dependencies[] = wpcfto_metaboxes_generate_deps( $sectionName, $dep );
		}

		$dependencies = implode( " {$mode} ", $dependencies );

	} else {
		if ( ! empty( $field['dependency']['section'] ) ) {
			$section_name = $field['dependency']['section'];
		}

		$dependencies = wpcfto_metaboxes_generate_deps( $section_name, $field['dependency'] );
	}

	$dependency = "v-if=\"{$dependencies}\"";

	if ( ! empty( $field['dependency_mode'] ) && 'disabled' === $field['dependency_mode'] ) {
		$dependency = "v-bind:class=\"{'wpcfto-disabled-field' : {$dependencies}}\"";
	}

	return $dependency;
}

function wpcfto_metaboxes_generate_deps( $section_name, $dep ) {
	$key     = $dep['key'];
	$compare = $dep['value'];
	if ( 'not_empty' === $compare ) {
		$dependency = "data['{$section_name}']['fields']['{$key}']['value']";
	} elseif ( 'empty' === $compare ) {
		$dependency = "!data['{$section_name}']['fields']['{$key}']['value']";
	} elseif ( ! empty( $compare ) && strpos( $compare, '||' ) ) {
		$compare    = preg_replace( '/\s+/', '', $compare );
		$compares   = explode( '||', $compare );
		$length     = count( $compares );
		$i          = 0;
		$dependency = '(';
		foreach ( $compares as $compare ) {
			$i ++;
			$dependency .= "data['{$section_name}']['fields']['{$key}']['value'] === '{$compare}'";
			if ( $i !== $length ) {
				$dependency .= ' || ';
			}
		}
		$dependency .= ')';
	} else {
		$dependency = "data['{$section_name}']['fields']['{$key}']['value'] === '{$compare}'";
	}

	return $dependency;
}

function wpcfto_metaboxes_display_single_field( $section, $section_name, $field, $field_name, $metabox_id = null  ) {
	$dependency  = wpcfto_metaboxes_deps( $field, $section_name );
	$width       = 'column-1';
	$is_pro      = ( ! empty( $field['pro'] ) ) ? 'is_pro' : 'not_pro';
	$disable     = ( ! empty( $field['disable'] ) ) ? 'is_disabled' : '';
	$pro_url     = ( ! empty( $field['pro'] ) && ! empty( $field['pro_url'] ) ) ? $field['pro_url'] : '';
	$is_child    = ( isset( $field['is_group_item'] ) && ! empty( $field['is_group_item'] ) ) ? true : false;
	$description = ( ! empty( $field['description'] ) ) ? $field['description'] : '';
	if ( stm_wpcfto_is_pro() ) {
		$is_pro = '';
	}

	$classes   = array();
	$classes[] = ( $is_child ) ? 'wpcfto-box-child' : 'wpcfto-box';

	$classes[] = $width;
	$classes[] = $is_pro;
	$classes[] = $disable;
	$classes[] = "wpcfto-box-{$field['type']}";

	$classes[] = $field_name;

	if ( 'notice' !== $field['type'] ) {
		$classes[] = $field['type'];
	}

	if ( ! empty( $field['classes'] ) ) {
		$classes = array_merge( $classes, $field['classes'] );
	}

	if ( ! empty( $field['submenu'] ) ) {
		$classes[] = $section_name . '_' . wpcfto_sanitize_string( $field['submenu'] );
	}

	$classes = apply_filters( 'stm_wpcfto_single_field_classes', $classes, $field_name, $field );
	?>


	<transition name="slide-fade">
		<div class="<?php echo esc_attr( implode( ' ', $classes ) ); ?>"
			<?php echo wp_kses( $dependency, array() ); ?>
			data-field="<?php echo esc_attr( "wpcfto_addon_option_{$field_name}" ); ?>">

			<?php
			do_action( 'stm_wpcfto_single_field_before_start', $classes, $field_name, $field, $is_pro, $pro_url, $disable );

			/**
			 * !!! This block for insert pro notice html to component "wpcfto_fields_aside_after"
			 * ob_start();
			 * do_action('stm_wpcfto_single_field_before_start', $classes, $field_name, $field, $is_pro, $pro_url);
			 * $pro_content = ob_get_contents();
			 * ob_end_clean();
			 */
			?>

			<?php
			$field_data = $field;

			$label = ( ! empty( $field_data['label'] ) ) ? $field_data['label'] : '';
			if ( empty( $field_data['placeholder'] ) ) {
				$field_data['placeholder'] = $label;
			}
			$field_type = $field['type'];

			$field = "data['{$section_name}']['fields']['{$field_name}']";

			/*Needed for include*/
			$field_value    = "{$field}['value']";
			$field_label    = "{$field}['label']";
			$field_id       = $section_name . '-' . $field_name;
			$field_readonly = isset( $field_data['readonly'] ) ? 'true' : 'false';
			$option_id     = $metabox_id;

			$file = apply_filters( "wpcfto_field_{$field_type}", STM_WPCFTO_PATH . '/metaboxes/fields/' . $field_type . '.php' );

			include $file;
			?>


		</div>
	</transition>

	<?php
}

function wpcfto_metaboxes_display_group_field( $section, $section_name, $field, $field_name ) {
	if ( 'started' === $field['group'] ) :
		$group_classes = array( 'wpcfto-box wpcfto_group_started column-1' );
		if ( ! empty( $field['submenu'] ) ) {
			$group_classes[] = sanitize_title( "{$section_name}_{$field['submenu']}" );
		}
		?>
		<div class="<?php echo esc_attr( implode( ' ', $group_classes ) ); ?>">
		<div class="container">
		<div class="row">
		<?php if ( isset( $field['group_title'] ) && ! empty( $field['group_title'] ) ) { ?>
		<div class="wpcfto_group_title"><?php echo esc_html( $field['group_title'] ); ?></div>
	<?php } ?>
	<?php
	endif;

	wpcfto_metaboxes_display_single_field( $section, $section_name, $field, $field_name );

	if ( 'ended' === $field['group'] ) :
		?>
		</div></div></div>
	<?php
	endif;
}

function wpcfto_metaboxes_preopen_field( $section, $section_name, $field, $field_name ) {
	$vue_field       = "data['{$section_name}']['fields']['{$field_name}']";
	$field_options   = $section['fields'][ $field_name ];
	$preopen_disable = '';
	?>
	<div class="preopen_field_wrapper wpcfto_generic_field"
		 v-init="initOpen(<?php echo wp_kses( $vue_field, array() ); ?>)">
		<?php
		if ( ! stm_wpcfto_is_pro() && isset( $field_options['disabled'] ) && true === $field_options['disabled'] ) {
			$preopen_disable = 'preopen_disable';
			do_action( 'metabox_field_nuxy_notification' );
		}
		?>
		<div class="wpcfto-admin-checkbox" @click="openField(<?php echo wp_kses( $vue_field, array() ); ?>)">

			<label class="<?php echo esc_attr( $preopen_disable ); ?>">

				<div class="wpcfto-admin-checkbox-wrapper"
					 v-bind:class="{'active' : <?php echo esc_attr( $vue_field ); ?>['opened'], 'is_toggle' : <?php echo ( isset( $field['toggle'] ) ) ? esc_attr( $field['toggle'] ) : 'true'; ?>}">
					<div class="wpcfto-checkbox-switcher"></div>
				</div>

				<span v-html="<?php echo esc_attr( $vue_field ); ?>['label']"></span>

			</label>

		</div>

		<div class="preopen_field"
			 v-if="<?php echo esc_attr( $vue_field ); ?>['opened']">
			<?php wpcfto_metaboxes_display_single_field( $section, $section_name, $field, $field_name ); ?>
		</div>

	</div>

	<?php
}

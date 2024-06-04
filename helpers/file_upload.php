<?php
new STM_WPCFTO_FILE_UPLOAD();

class STM_WPCFTO_FILE_UPLOAD {

	public function __construct() {
		add_action( 'wp_ajax_wpcfto_upload_file', array( $this, 'upload_file' ) );
	}

	public function upload_file() {
		check_ajax_referer( 'wpcfto_upload_file', 'nonce' );

		if ( ! empty( $_FILES['file'] ) && ! empty( $_FILES['file']['name'] ) ) {
			$filename = sanitize_text_field( $_FILES['file']['name'] );
			do_action( 'stm_lms_nuxy_repeater_upload_file', $filename );
		}

		$this->create_folder();

		$r = array(
			'error' => apply_filters( 'wpcfto_file_error_label', esc_html__( 'Error occurred, please try again', 'nuxy' ) ),
			'path'  => '',
			'url'   => '',
		);

		if ( empty( $_POST['field'] ) ) {
			wp_send_json( $r );
		}

		$field = sanitize_text_field( $_POST['field'] );

		/*is_repeater?*/
		if ( ! empty( $_POST['field_native_name'] ) && ! empty( $_POST['field_native_name_inner'] ) ) {
			$field       = sanitize_text_field( $_POST['field_native_name'] );
			$field_inner = sanitize_text_field( $_POST['field_native_name_inner'] );
		}

		$field_data = $this->get_field_data( $field );

		if ( ! empty( $field_inner ) && ! empty( $field_data ) && ! empty( $field_data['fields'] ) && ! empty( $field_data['fields'][ $field_inner ] ) ) {
			$field_data = $field_data['fields'][ $field_inner ];
		}

		if ( empty( $field_data ) ) {
			wp_send_json( $r );
		}

		$allowed_extensions = $field_data['mimes'];

		if ( empty( $_FILES['file'] ) ) {
			wp_send_json(
				array(
					'error' => apply_filters( 'wpcfto_empty_file_error_label', esc_html__( 'Please, select file', 'nuxy' ) ),
				)
			);
		}

		$path = ( isset( $_FILES['file']['name'] ) ) ? sanitize_text_field( $_FILES['file']['name'] ) : '';
		$ext  = pathinfo( $path, PATHINFO_EXTENSION );

		if ( ! in_array( $ext, $allowed_extensions, true ) ) {
			wp_send_json(
				array(
					'error'   => true,
					'message' => apply_filters( 'wpcfto_file_error_ext_label', esc_html__( 'Invalid file extension', 'nuxy' ) ),
				)
			);
		}

		$filename    = md5( time() ) . basename( $path );
		$file        = ( isset( $_FILES['file']['tmp_name'] ) ) ? file_get_contents( sanitize_text_field( $_FILES['file']['tmp_name'] ) ) : '';
		$upload_file = wp_upload_bits( $filename, null, $file );

		if ( $upload_file['error'] ) {
			$r['error'] = $upload_file['error'];
			wp_send_json( $r );
		}

		rename( $upload_file['file'], $this->get_file_path( $filename ) );

		$file_data  = $this->get_file_data( $filename );
		$r['error'] = '';
		$r['path']  = $file_data['path'];
		$r['url']   = $file_data['url'];

		if ( apply_filters( "wpcfto_modify_file_{$field}", false ) ) {
			$r = apply_filters( "wpcfto_modified_{$field}", $r, $filename );
		}

		wp_send_json( $r );
	}

	public function get_file_path( $filename ) {
		return $this->upload_dir() . '/' . $filename;
	}

	public function get_file_url( $filename ) {
		return $this->upload_url() . '/' . $filename;
	}

	public function get_file_data( $filename ) {
		return array(
			'path' => $this->get_file_path( $filename ),
			'url'  => $this->get_file_url( $filename ),
		);
	}

	public function get_field_data( $name ) {
		$boxes = apply_filters( 'stm_wpcfto_fields', array() );

		foreach ( $boxes as $box ) {
			foreach ( $box as $section ) {
				foreach ( $section['fields'] as $field_key => $field ) {
					if ( $field_key === $name ) {
						return $field;
					}
				}
			}
		}

		return false;
	}


	public static function upload_url() {
		$upload     = wp_upload_dir();
		$upload_dir = $upload['baseurl'];

		return $upload_dir . '/wpcfto_files';
	}

	public static function upload_dir() {
		$upload     = wp_upload_dir();
		$upload_dir = $upload['basedir'];

		return $upload_dir . '/wpcfto_files';
	}

	public function create_folder() {

		global $wp_filesystem;

		if ( empty( $wp_filesystem ) ) {
			require_once ABSPATH . '/wp-admin/includes/file.php';
			WP_Filesystem();
		}

		$upload_dir = $this->upload_dir();

		if ( ! $wp_filesystem->is_dir( $upload_dir ) ) {
			wp_mkdir_p( $upload_dir );
		}
	}

}

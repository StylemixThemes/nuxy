<?php

require_once STM_WPCFTO_PATH . '/taxonomy_meta/enqueue.php';
require_once STM_WPCFTO_PATH . '/taxonomy_meta/fields/default.php';
require_once STM_WPCFTO_PATH . '/taxonomy_meta/fields/image.php';
require_once STM_WPCFTO_PATH . '/taxonomy_meta/fields/icon.php';
require_once STM_WPCFTO_PATH . '/taxonomy_meta/fields/color.php';

function wpcfto_term_meta_fields() {
	return apply_filters( 'stm_wpcfto_term_meta_fields', array() );
}

function wpcfto_sanitize_term_meta( $value ) {
	return sanitize_text_field( $value );
}

function wpcfto_get_term_meta_text( $term_id, $term_key ) {
	$value = get_term_meta( $term_id, $term_key, true );
	$value = wpcfto_sanitize_term_meta( $value );

	return $value;
}

add_action(
	'admin_init',
	function () {
		$taxonomies = wpcfto_term_meta_fields();
		foreach ( $taxonomies as $taxonomy => $fields ) {
			add_action( "{$taxonomy}_add_form_fields", 'wpcfto_add_term_meta_fields' );
			add_action( "{$taxonomy}_edit_form_fields", 'wpcfto_edit_term_meta_fields' );

			add_action( "edit_{$taxonomy}", 'wpcfto_save_term_meta_field' );
			add_action( "create_{$taxonomy}", 'wpcfto_save_term_meta_field' );
		}

		function wpcfto_add_term_meta_fields( $tax ) {
			$meta   = wpcfto_term_meta_fields();
			$fields = $meta[ $tax ]; ?>
			<table class="form-table">
				<tbody>
				<?php
				foreach ( $fields as $field_key => $field ) :
					?>
					<tr class="form-field">
						<th scope="row">
							<label for="<?php echo esc_attr( $field_key ); ?>"><?php echo esc_html( $field['label'] ); ?></label>
						</th>
						<td>
							<?php
							switch ( $field['type'] ) {
								case 'image':
									wpcfto_term_meta_field_image( $field_key, '' );
									break;
								case 'icon':
									wpcfto_term_meta_field_icon( $field_key, '' );
									break;
								case 'color':
									wpcfto_term_meta_field_color( $field_key, '' );
									break;
								default:
									wpcfto_term_meta_field_default( $field_key, '' );
							}
							?>
						</td>
					</tr>

				<?php endforeach; ?>
				</tbody>
			</table>
			<?php
		}

		function wpcfto_edit_term_meta_fields( $term ) {
			$taxonomy = $term->taxonomy;
			$meta     = wpcfto_term_meta_fields();
			$fields   = $meta[ $taxonomy ];
			?>
			<table class="form-table">
				<tbody>
				<?php
				foreach ( $fields as $field_key => $field ) :
					$value = wpcfto_get_term_meta_text( $term->term_id, $field_key );
					?>

					<tr class="form-field">
						<th scope="row">
							<label for="<?php echo esc_attr( $field_key ); ?>"><?php echo esc_html( $field['label'] ); ?></label>
						</th>
						<td>
							<?php
							switch ( $field['type'] ) {
								case 'image':
									wpcfto_term_meta_field_image( $field_key, $value );
									break;
								case 'icon':
									wpcfto_term_meta_field_icon( $field_key, $value );
									break;
								case 'color':
									wpcfto_term_meta_field_color( $field_key, $value );
									break;
								default:
									wpcfto_term_meta_field_default( $field_key, $value );
							}
							?>
						</td>
					</tr>

				<?php endforeach; ?>
				</tbody>
			</table>
			<?php
		}

		function wpcfto_save_term_meta_field( $term_id ) {
			if ( ! isset( $_REQUEST['_wpnonce'] ) || ! wp_verify_nonce( sanitize_text_field( $_REQUEST['_wpnonce'] ), 'update-tag_' . $term_id ) ) {
				return;
			}

			if ( ! empty( $_POST['taxonomy'] ) ) {
				$taxonomy = sanitize_text_field( $_POST['taxonomy'] );
				$meta     = wpcfto_term_meta_fields();
				if ( ! empty( $meta[ $taxonomy ] ) ) {
					$fields = $meta[ $taxonomy ];
					foreach ( $fields as $field_key => $field ) {
						$field_value = ( ! empty( $_POST[ $field_key ] ) ) ? sanitize_text_field( $_POST[ $field_key ] ) : '';
						update_term_meta( $term_id, $field_key, $field_value );
					}
				}
			}
		}
	}
);

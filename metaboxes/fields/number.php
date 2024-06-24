<?php
/**
 * Number field template.
 *
 * @var $field
 * @var $field_id
 * @var $field_value
 * @var $field_label
 * @var $field_name
 * @var $field_data
 * @var $section_name
 *
 */
?>

<wpcfto_number :fields="<?php echo esc_attr( $field ); ?>"
	:field_data='<?php echo esc_attr( htmlspecialchars( wp_json_encode( $field_data ) ) ); ?>'
	:field_label="<?php echo esc_attr( $field_label ); ?>"
	:field_name="'<?php echo esc_attr( $field_name ); ?>'"
	:field_id="'<?php echo esc_attr( $field_id ); ?>'"
	:field_value="<?php echo esc_attr( $field_value ); ?>"
	:placeholder_text="'<?php echo esc_html__( 'Enter numbers...', 'nuxy' ); ?>'"
	@wpcfto-get-value="<?php echo esc_attr( $field_value ); ?> = $event">
</wpcfto_number>

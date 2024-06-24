<?php

/**
 * Image field template.
 *
 * @var $field
 * @var $field_id
 * @var $field_value
 * @var $field_label
 * @var $field_name
 * @var $section_name
 *
 */

$field = "data['{$section_name}']['fields']['{$field_name}']";

?>

<wpcfto_image :fields="<?php echo esc_attr($field); ?>"
	:field_label="<?php echo esc_attr($field_label); ?>"
	:field_name="'<?php echo esc_attr($field_name); ?>'"
	:field_id="'<?php echo esc_attr($field_id); ?>'"
	:field_value="<?php echo esc_attr($field_value); ?>"
	:placeholder_text="'<?php echo esc_html__( 'Image URL', 'nuxy' ); ?>'"
	:upload_text="'<?php echo esc_html__( 'Upload', 'nuxy' ); ?>'"
	:replace_text="'<?php echo esc_html__( 'Replace', 'nuxy' ); ?>'"
	:remove_text="'<?php echo esc_html__( 'Remove', 'nuxy' ); ?>'"
	@wpcfto-get-value="<?php echo esc_attr($field_value); ?> = $event">
</wpcfto_image>

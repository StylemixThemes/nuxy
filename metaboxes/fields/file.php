<?php

/**
 * File field template.
 *
 * @var $field
 * @var $field_id
 * @var $field_value
 * @var $field_label
 * @var $field_name
 * @var $section_name
 * @var $field_data
 *
 */
$field = "data['{$section_name}']['fields']['{$field_name}']";

?>

<wpcfto_file :fields="<?php echo esc_attr($field); ?>"
			:field_label="<?php echo esc_attr($field_label); ?>"
			:field_name="'<?php echo esc_attr($field_name); ?>'"
			:field_id="'<?php echo esc_attr($field_id); ?>'"
			:field_value="<?php echo esc_attr($field_value); ?>"
			:field_data='<?php echo esc_attr(str_replace("'", '', wp_json_encode($field_data))); ?>'
			@wpcfto-get-value="<?php echo esc_attr($field_value); ?> = $event">
</wpcfto_file>

<?php

/**
 * Color field template.
 *
 * @var $field
 * @var $field_id
 * @var $field_value
 * @var $field_label
 * @var $field_name
 * @var $section_name
 * @var $default_value
 *
 */

$field = "data['{$section_name}']['fields']['{$field_name}']";

?>

<wpcfto_color :fields="<?php echo esc_attr($field); ?>"
				:field_label="<?php echo esc_attr($field_label); ?>"
				:field_name="'<?php echo esc_attr($field_name); ?>'"
				:field_id="'<?php echo esc_attr($field_id); ?>'"
				:field_value="<?php echo esc_attr($field_value); ?>"
				:default_value="'<?php echo esc_attr($default_value); ?>'"
				@wpcfto-get-value="<?php echo esc_attr($field_value); ?> = $event">
</wpcfto_color>

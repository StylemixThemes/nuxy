<?php

/**
 * Link Color field template.
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

<wpcfto_link_color :fields="<?php echo esc_attr($field); ?>"
				:field_label="<?php echo esc_attr($field_label); ?>"
				:field_name="'<?php echo esc_attr($field_name); ?>'"
				:field_id="'<?php echo esc_attr($field_id); ?>'"
				:field_value="<?php echo esc_attr($field_value); ?>"
				@wpcfto-get-value="<?php echo esc_attr($field_value); ?> = $event">
</wpcfto_link_color>

<input type="hidden"
		name="<?php echo esc_attr($field_name); ?>"
		v-bind:id="'<?php echo esc_attr($field_id); ?>'"
		v-model="JSON.stringify(<?php echo esc_attr(wp_unslash($field_value)); ?>)" />

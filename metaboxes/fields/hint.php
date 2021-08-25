<?php
/**
 * Hint field template.
 *
 * @var $field_name
 * @var $section_name
 *
 */

$field_key = "data['{$section_name}']['fields']['{$field_name}']";

?>


<div class="wpcfto-hint">
	<label v-html="<?php echo esc_attr($field_key); ?>['label']"></label>

	<textarea name="<?php echo esc_attr($field_name); ?>"
			v-bind:id="'<?php echo esc_attr($section_name . '-' . $field_name); ?>'"
			v-model="<?php echo esc_attr($field_key); ?>['value']">
	</textarea>
</div>

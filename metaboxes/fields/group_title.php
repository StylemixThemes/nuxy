<?php

/**
 * Title field template.
 *
 * @var $field
 * @var $field_id
 * @var $field_label
 * @var $field_name
 * @var $field_icon
 * @var $field_preview_position
 * @var $section_name
 *
 */

$field = "data['{$section_name}']['fields']['{$field_name}']";

?>

<wpcfto_group_title :fields="<?php echo esc_attr($field); ?>"
			:field_label="<?php echo esc_attr($field_label); ?>"
			:field_name="'<?php echo esc_attr($field_name); ?>'"
			:field_id="'<?php echo esc_attr($field_id); ?>'"
			:field_icon="<?php echo esc_attr( $field ); ?>['icon']"
			:field_preview_position="<?php echo esc_attr( $field ); ?>['preview_position']"
			>
</wpcfto_group_title>

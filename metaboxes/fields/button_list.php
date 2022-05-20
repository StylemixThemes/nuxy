<?php

/**
 * Button list field template.
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

<wpcfto_button_list
	:fields="<?php echo esc_attr( $field ); ?>"
	:field_name="'<?php echo esc_attr( $field_name ); ?>'"
	:field_label="<?php echo esc_attr( $field_label ); ?>">
</wpcfto_button_list>

<?php
/**
 * Repeater table field template.
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

<wpcfto_repeater_table
	:fields="<?php echo esc_attr( $field ); ?>"
	:popup_text="'<?php echo esc_attr__( 'Are you sure?', 'nuxy' ); ?>'"
	:popup_confirm_button="'<?php echo esc_attr__( 'Yes', 'nuxy' ); ?>'"
	:popup_cancel_button="'<?php echo esc_attr__( 'No', 'nuxy' ); ?>'"
	:fields_error="'<?php echo esc_attr__( 'Field is required', 'nuxy' ); ?>'"
	:fields_range_error="'<?php echo esc_attr__( 'The minimum range must be less than the previous one', 'nuxy' ); ?>'"
>
</wpcfto_repeater_table>

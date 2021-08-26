<?php

/**
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

<wpcfto_notification_message :fields="<?php echo esc_attr($field); ?>"
               :field_name="'<?php echo esc_attr($field_name); ?>'"></wpcfto_notification_message>

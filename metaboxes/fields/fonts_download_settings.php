<?php
/**
 * @var $field
 * @var $field_id
 * @var $field_value
 * @var $field_label
 * @var $field_name
 * @var $section_name
 * @var $section
 * @var $option_id
 *
 */
wp_enqueue_script( 'font_download_settings', STM_WPCFTO_URL . '/metaboxes/general_components/js/fonts_download_settings.js', array(), STM_WPCFTO_VERSION, true );
?>
<fonts_download_settings :fields="<?php echo esc_attr($field); ?>"
						 :field_label="<?php echo esc_attr($field_label); ?>"
						 :field_name="'<?php echo esc_attr($field_name); ?>'"
						 :field_id="'<?php echo esc_attr($field_id); ?>'"
						 :field_value="<?php echo esc_attr($field_value); ?>"
						 :option_id="'<?php echo esc_attr($option_id); ?>'"
						 @wpcfto-get-value="<?php echo esc_attr($field_value); ?> = $event">
</fonts_download_settings>

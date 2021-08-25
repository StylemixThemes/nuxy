<?php
/**
 * Duration field template.
 *
 * @var $field_name
 * @var $section_name
 *
 */

$field_key = "data['{$section_name}']['fields']['{$field_name}']";
$measure   = "data['{$section_name}']['fields']['duration_measure']['value']";

?>

<div class="wpcfto_generic_field">
	<div class="wpcfto-field-aside">
		<label class="wpcfto-field-aside__label" v-html="<?php echo esc_attr($field_key); ?>['label']"></label>
	</div>

	<div class="wpcfto-field-content">
		<div class="row">
			<div class="column column-75">
				<input type="number"
						placeholder="<?php esc_html_e('duration', 'nuxy'); ?>"
						name="<?php echo esc_attr($field_name); ?>"
						v-bind:id="'<?php echo esc_attr($section_name . '-' . $field_name); ?>'"
						v-model="<?php echo esc_attr($field_key); ?>['value']"/>
			</div>
			<div class="column column-25">
				<div class="wpcfto-admin-select">
					<select name="<?php echo esc_attr($field_name); ?>_measure"
							v-model="<?php echo esc_attr($measure); ?>">
						<option value=""><?php esc_html_e('Minutes', 'nuxy'); ?></option>
						<option value="hours"><?php esc_html_e('Hours', 'nuxy'); ?></option>
						<option value="days"><?php esc_html_e('Days', 'nuxy'); ?></option>
					</select>
				</div>
			</div>
		</div>
	</div>
</div>

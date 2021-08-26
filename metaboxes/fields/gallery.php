<?php

/**
 * Gallery field template.
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

$value = array();

if ( ! empty( $field_data['value'] ) ) {
	$field_data['value'] = ( is_array( $field_data['value'] ) ) ? $field_data['value'] : json_decode( $field_data['value'], true );

	foreach ( $field_data['value'] as $image_id ) {
		$image = wp_get_attachment_image_src( $image_id );

		if ( empty( $image ) ) {
			continue;
		}

		$value[] = array(
			'id'  => $image_id,
			'url' => $image[0]
		);
	}
}

?>

<wpcfto_gallery v-bind:fields="<?php echo esc_attr( $field ); ?>"
				v-bind:field_label="<?php echo esc_attr( $field_label ); ?>"
				v-bind:field_name="'<?php echo esc_attr( $field_name ); ?>'"
				v-bind:field_id="'<?php echo esc_attr( $field_id ); ?>'"
				v-bind:field_value='<?php echo esc_attr( wp_json_encode( $value ) ); ?>'
				@wpcfto-get-value="$set(<?php echo esc_attr( $field ); ?>, 'value', $event)">
</wpcfto_gallery>

<input type="hidden"
		:style="{'width' : '100%'}"
		name="<?php echo esc_attr( $field_name ); ?>"
		v-bind:id="'<?php echo esc_attr( $field_id ); ?>'"
		v-model="JSON.stringify(<?php echo esc_attr( wp_unslash( $field_value ) ); ?>)"/>

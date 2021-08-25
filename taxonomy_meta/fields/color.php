<?php
function wpcfto_term_meta_field_color( $field_key, $value ) {
	?>
	<div class="wpcfto_image_field">
		<input type="color"
			value="<?php echo esc_attr($value); ?>"
			name="<?php echo esc_attr($field_key); ?>"/>
	</div>
<?php
}

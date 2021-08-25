<?php
function wpcfto_term_meta_field_default( $field_key, $value ) { ?>
	<input type="text"
		   name="<?php echo esc_attr($field_key); ?>"
		   id="<?php echo esc_attr($field_key); ?>"
		   value="<?php echo esc_attr($value); ?>"
		   class="term-meta-text-field"/>
<?php
}

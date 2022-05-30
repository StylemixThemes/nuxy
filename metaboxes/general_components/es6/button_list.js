Vue.component('wpcfto_button_list', {
	props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value'],
	data: function () {
		return {
			value: '',
			mount_status: false
		}
	},
	template: `
		<div class="wpcfto_generic_field wpcfto_generic_field__notice" v-bind:class="field_name" v-bind:data-notice="field_name">
			<wpcfto_fields_aside_before :fields="fields" :field_label="field_label"></wpcfto_fields_aside_before>
			<div v-if="fields.buttons" class="wpcfto_generic_field__notice_button_list">
				<div class="button_list_box" v-for="(button) in fields.buttons">
					<label v-if="button.label">{{ button.label }}</label>
					<a v-if="button.url || button.text" :href="button.url" :class="button.class" target="_blank" rel="nofollow">{{ button.text }}</a>
				</div>
			</div>
			<wpcfto_fields_aside_after :fields="fields"></wpcfto_fields_aside_after>
		</div>
	`
});
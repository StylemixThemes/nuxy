Vue.component('wpcfto_textarea', {
	props: [
		'fields',
		'field_label',
		'field_name',
		'field_id',
		'field_value',
		'placeholder_text',
	],
	data: function () {
		return {
			value: '',
		}
	},
	template: `
        <div class="wpcfto_generic_field wpcfto_generic_field_textarea">
            <wpcfto_fields_aside_before :fields="fields" :field_label="field_label"></wpcfto_fields_aside_before>
            
            <div class="wpcfto-field-content">
                <textarea v-bind:name="field_name"
                    v-bind:placeholder="fields.placeholder ? fields.placeholder : placeholder_text + ' ' + field_label"
                    v-bind:id="field_id"
                    v-model="value">
                </textarea>
            </div>

            <wpcfto_fields_aside_after :fields="fields"></wpcfto_fields_aside_after>
        </div>
    `,
	mounted: function () {
		this.value = this.field_value
	},
	methods: {},
	watch: {
		value: function (value) {
			this.$emit('wpcfto-get-value', value)
		},
	},
})

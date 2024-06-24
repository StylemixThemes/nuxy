Vue.component('wpcfto_number', {
	props: [
		'fields',
		'field_label',
		'field_name',
		'field_id',
		'field_value',
		'field_data',
		'placeholder_text',
	],
	data: function () {
		return {
			value: '',
			step: 1,
		}
	},
	template: `
        <div class="wpcfto_generic_field wpcfto_generic_field_flex_input wpcfto_generic_field__number">
            <wpcfto_fields_aside_before :fields="fields" :field_label="field_label"></wpcfto_fields_aside_before>

            <div class="wpcfto-field-content">
                <input type="number"
                    v-bind:name="field_name"
                    v-bind:placeholder="fields.placeholder ? fields.placeholder : placeholder_text"
                    v-bind:id="field_id"
                    :step="step"
                    v-model="value"
                />
            </div>

            <wpcfto_fields_aside_after :fields="fields"></wpcfto_fields_aside_after>
        </div>
    `,
	mounted: function () {
		this.value = this.field_value
		if (typeof this.field_data.step !== 'undefined')
			this.step = this.field_data.step
	},
	methods: {},
	watch: {
		value: function (value) {
			this.$emit('wpcfto-get-value', value)
		},
	},
})

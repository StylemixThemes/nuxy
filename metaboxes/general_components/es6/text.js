Vue.component('wpcfto_text', {
	props: [
		'fields',
		'field_label',
		'field_name',
		'field_id',
		'field_value',
		'field_readonly',
		'placeholder_text',
		'copied_text',
	],
	data: function () {
		return {
			value: '',
			showTooltip: false,
		}
	},
	template: `

        <div class="wpcfto_generic_field wpcfto_generic_field_flex_input wpcfto_generic_field__text">
            <wpcfto_fields_aside_before :fields="fields" :field_label="field_label"></wpcfto_fields_aside_before>

            <div class="wpcfto-field-content">
                <input type="text"
                    v-bind:name="field_name"
                    v-bind:placeholder="fields.placeholder ? fields.placeholder : placeholder_text + ' ' + field_label "
                    v-bind:id="field_id"
                    v-bind:readonly="field_readonly"
                    v-model="value"
                    @click="handleInputClick"
                />
                <div v-if="showTooltip" class="readonly-tooltip">copied_text</div>
            </div>

            <wpcfto_fields_aside_after :fields="fields"></wpcfto_fields_aside_after>
        </div>
    `,
	mounted: function () {
		this.value = this.field_value
	},
	methods: {
		handleInputClick() {
			if (this.field_readonly) {
				const inputField = document.getElementById(this.field_id)
				inputField.select()
				document.execCommand('copy')
				this.showTooltip = true
				setTimeout(() => {
					this.showTooltip = false
				}, 2000)
			}
		},
	},
	watch: {
		value: function (value) {
			this.$emit('wpcfto-get-value', value)
		},
	},
})

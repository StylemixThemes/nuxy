Vue.component('wpcfto_group_title', {
	props: [
		'fields',
		'field_label',
		'field_name',
		'field_id',
		'field_icon',
		'field_preview_position',
		'field_button',
	],
	data: function () {
		return {
			fields: {},
		}
	},
	methods: {
		handleButtonClick: function () {
			if (this.field_button && this.field_button.link) {
				window.open(this.field_button.link, '_blank')
			}
		},
	},
	template: `
        <div class="wpcfto_generic_field wpcfto_generic_field__group_title" :class="field_preview_position">
            <i :class="field_icon"></i>
            <div class="wpcfto-group-title-wrapper">
            <wpcfto_fields_aside_before :fields="fields" :field_label="field_label"></wpcfto_fields_aside_before>
                <div v-if="field_button" class="wpcfto-group-title-button-container">
                    <a 
                        :href="field_button.link" 
                        target="_blank" 
                        class="wpcfto-group-title-button" 
                        @click.prevent="handleButtonClick" 
                        :title="field_button.tooltip"
                        style="position: relative;"
                    >
                        <i :class="field_button.icon"></i> {{ field_button.text }}
                    </a>
                </div>
            </div>
        </div>
    `,
})

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
		handleTooltipHover: function () {
			var tooltip = document.querySelector(
				'.wpcfto-group-title-button-tooltip-content'
			)
			var settings = document.querySelector('.stm_metaboxes_grid')
			if (tooltip && settings) {
				settings.classList.add('stm_metaboxes_grid--tooltip-hover')
				tooltip.classList.add('show-tooltip')
			}
		},
		handleTooltipLeave: function () {
			var tooltip = document.querySelector(
				'.wpcfto-group-title-button-tooltip-content'
			)
			var settings = document.querySelector('.stm_metaboxes_grid')
			if (tooltip && settings) {
				settings.classList.remove('stm_metaboxes_grid--tooltip-hover')
				tooltip.classList.remove('show-tooltip')
			}
		},
		handleScroll: function () {
			this.handleTooltipLeave()
		},
	},
	mounted: function () {
		window.addEventListener('scroll', this.handleScroll)
	},
	beforeDestroy: function () {
		window.removeEventListener('scroll', this.handleScroll)
	},
	template: `
    <div 
      class="wpcfto_generic_field wpcfto_generic_field__group_title" 
      :class="field_preview_position"
    >
      <i :class="field_icon"></i>
      <div class="wpcfto-group-title-wrapper">
        <wpcfto_fields_aside_before :fields="fields" :field_label="field_label"></wpcfto_fields_aside_before>
        <div 
          v-if="field_button" 
          class="wpcfto-group-title-button-container"  
        >
          <a 
            :href="field_button.link" 
            target="_blank" 
            class="wpcfto-group-title-button" 
            :class="{'tooltip-exists': field_button.tooltip && field_button.tooltip.trim() !== ''}" 
            @click.prevent="handleButtonClick" 
            :title="field_button.tooltip"
            style="position: relative;"
            @mouseover="handleTooltipHover"
            @mouseleave="handleTooltipLeave"
          >
            <i :class="field_button.icon"></i> {{ field_button.text }}
            <span
              v-if="field_button.tooltip" 
              class="wpcfto-group-title-button-tooltip-content" 
              v-html="field_button.tooltip"
            ></span>
          </a>
        </div>
      </div>
    </div>
  `,
})

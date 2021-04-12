Vue.component('wpcfto_multi_input', {
	props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value', 'field_options'],
	data: function () {
		return {
			inputs: []
		}
	},
	template: `
        <div class="wpcfto_generic_field wpcfto_generic_field_multi_input" v-bind:class="field_id">

            <wpcfto_fields_aside_before :fields="fields" :field_label="field_label"></wpcfto_fields_aside_before>
			
			<div class="wpcfto-field-content">
				<div class="wpcfto_sorter">
	
					<draggable class="list-group"
							   :list="inputs"
							   group="inputs">
	
						<div class="wpcfto_generic_field wpcfto_generic_field_flex_input wpcfto_generic_field__text"
							 v-for="(input, input_key) in inputs"
							 :key="input['key']">
	
						  <div class="wpcfto_multi_input_label">{{input['label']}}</div>
	
						  <input type="text" v-model="input['value']" v-bind:placeholder="input['label']" />
	
						  <span class="wpcfto_multi_input_icon"><i class="fa fa-arrows-alt"></i></span>
	
						</div>
	
					 </draggable>
	
				 </div>
			 </div>

			 <wpcfto_fields_aside_after :fields="fields"></wpcfto_fields_aside_after>

        </div>
    `,
	mounted: function () {

		var _this = this;

		if (typeof _this.field_value === 'string' && WpcftoIsJsonString(_this.field_value)) _this.field_value = JSON.parse(_this.field_value);

		if(!_this.field_value.length) _this.field_value = {};

		/*Get sorted items*/
		Object.keys(_this.field_value).forEach(key => {

			var stored_item = _this.field_value[key];

			var config_item = _this.field_options.find(x => x.key === stored_item['key']);

			if(typeof config_item === 'undefined') return false;

			_this.inputs.push({
				key : stored_item['key'],
				value : stored_item['value'],
				label : config_item['label']
			});

		});

		/*Add new items from config*/
		_this.field_options.forEach(function(config_item) {
			var stored_item = _this.inputs.find(x => x.key === config_item['key']);

			if(stored_item) return false;

			_this.inputs.push(config_item);

		});


	},
	methods: {},
	watch: {
		inputs: {
			deep: true,
			handler: function (inputs) {

				var inputs_value = [];

				inputs.forEach(function (item) {
					inputs_value.push({
						key :item.key,
						value :item.value,
					});
				});

				this.$emit('wpcfto-get-value', inputs_value);
			}
		}
	}
});

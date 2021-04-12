Vue.component('wpcfto_sorter', {
	props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value', 'field_options'],
	data: function () {
		return {
			columns : []
		}
	},
	template: `
        <div class="wpcfto_generic_field wpcfto_generic_field_sorter" v-bind:class="field_id" :class="'columns-' + columns.length">

			<wpcfto_fields_aside_before :fields="fields" :field_label="field_label"></wpcfto_fields_aside_before>
			
			<div class="wpcfto-field-content">
			
				<div class="wpcfto_sorter">
	
					<div v-for="(column, column_key) in columns" class="wpcfto_sorter_single">
	
						<h6 v-html="column['name']"></h6>
	
						<draggable class="list-group"
								   :list="column['options']"
								   group="list"
								   key="column_key">
	
							<div class="list-group-item"
								 v-for="(element, element_key) in column['options']"
								 :key="element['id']">
	
							  {{element['label']}}
	
							</div>
	
						 </draggable>
	
					 </div>
	
				 </div>
				 
			</div>

			 <wpcfto_fields_aside_after :fields="fields"></wpcfto_fields_aside_after>

        </div>
    `,
	mounted: function () {

		this.columns = (typeof this.field_value !== 'undefined') ? this.field_value : this.field_options;

		if(typeof this.field_value === 'string' && WpcftoIsJsonString(this.field_value)) this.columns = JSON.parse(this.field_value);

		if(!this.columns.length) this.columns = this.field_options;

		this.fillNewOptions();
	},
	methods: {
		fillNewOptions : function() {

			var _this = this;

			/*Get current saved keys*/
			var fields = [];
			var keys = [];
			_this.columns.forEach(function(column, column_key) {
				column['options'].forEach(function(field) {
					fields[field.id] = field.label;
				});
			});

			/*Add new fields from config*/
			_this.field_options.forEach(function(column, column_key) {
				column['options'].forEach(function(field) {

					keys[field.id] = field.label;

					if(typeof fields[field['id']] !== 'undefined') return false;

					_this.columns[column_key]['options'].push(field);
				});
			});

			/*Remove deleted config fields from stored in db*/
			_this.columns.forEach(function(column, column_key) {
				column['options'].forEach(function(field, field_key) {

					if(typeof keys[field['id']] !== 'undefined') return false;

					_this.columns[column_key]['options'].splice(field_key, 1);

				});
			});

		}
	},
	watch: {
		columns: {
		    deep: true,
		    handler: function (columns) {
		        this.$emit('wpcfto-get-value', columns);
		    }
		}
	}
});

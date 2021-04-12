import Multiselect from 'vue-multiselect'

Vue.component('wpcfto_multiselect', {
    props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value', 'field_options', 'field_data'],
    components: {Multiselect},
    data: function () {
        return {
            selected: [],
            options: [],
            track_by : 'label'
        }
    },
    template: `
        <div class="wpcfto_generic_field wpcfto_generic_field_multiselect" v-bind:class="field_id" :class="'columns-' + columns.length">

			<wpcfto_fields_aside_before :fields="fields" :field_label="field_label"></wpcfto_fields_aside_before>
			
			<div class="wpcfto-field-content">
			
				<div class="wpcfto_multiselect">
				
	                <multiselect
                      v-model="selected"
                      :multiple="true"
                      label="label"
                      :track-by="track_by"
                      :options="options">
                    </multiselect>
	
				 </div>
				 
			</div>

			 <wpcfto_fields_aside_after :fields="fields"></wpcfto_fields_aside_after>

        </div>
    `,
    mounted: function () {

        if(typeof this.field_data['track_by'] !== 'undefined') {
            this.track_by = this.field_data['track_by'];
        }

        this.options = this.field_options;

        this.selected = (typeof this.field_value !== 'undefined') ? this.field_value : [];

        if (typeof this.field_value === 'string' && WpcftoIsJsonString(this.field_value)) this.selected = JSON.parse(this.field_value);

        //this.fillIds();

    },
    methods: {
        fillIds : function() {
            let _this = this;
            _this.options.forEach(function(option){
                if(typeof option['__wpcfto_id'] === 'undefined') {
                    _this.$set(option, '__wpcfto_id', _this.generate_token(10))
                }
            })
        },
        generate_token: function(length){
            var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
            var b = [];
            for (var i=0; i<length; i++) {
                var j = (Math.random() * (a.length-1)).toFixed(0);
                b[i] = a[j];
            }
            return b.join("");
        }
    },
    watch: {
        selected: {
            deep: true,
            handler: function (columns) {
                this.$emit('wpcfto-get-value', columns);
            }
        }
    }
});

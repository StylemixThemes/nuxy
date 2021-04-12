Vue.component('wpcfto_radio', {
    props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value'],
    data: function () {
        return {
            value : '',
        }
    },
    template: `
        <div class="wpcfto_generic_field wpcfto_generic_radio" v-bind:class="field_id">
        
            <wpcfto_fields_aside_before :fields="fields" :field_label="field_label"></wpcfto_fields_aside_before>
        
            <div class="wpcfto-field-content">
        
                <div class="wpcfto-admin-radio" v-bind:id="field_id">
                    <div class="wpcfto-radio">
                        <label v-for="(option, key) in fields['options']" :class="{ 'disabled' : fields.soon && fields.soon[key], 'active' : value == key }">
    
                            <input type="radio"
                                   v-bind:name="field_name"
                                   v-model="value"
                                   :disabled="fields.soon && fields.soon[key]"
                                   v-bind:value="key"/>
                                   
                           <span class="radio-option-text" v-html="option"></span>
          
                            <span
                                v-if="fields.previews && fields.previews[key]"
                                class="wpcfto_preview">Preview<span
                                class="wpcfto_preview__popup"><img
                                :src="fields.previews[key]" /></span></span>
                        </label>
                    </div>
    
                </div>
            
            </div>
        </div>
    `,
    mounted: function () {
        this.value = this.field_value;
    },
    methods: {},
    watch: {
        value: function (value) {
            this.$emit('wpcfto-get-value', value);
        }
    }
});

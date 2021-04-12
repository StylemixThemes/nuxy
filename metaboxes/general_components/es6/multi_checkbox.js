Vue.component('wpcfto_multi_checkbox', {
    props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value'],
    data: function () {
        return {
            checkboxes : [],
        }
    },
    template: `
        <div class="wpcfto_generic_field wpcfto_generic_field_multi_checkbox" v-bind:class="field_id">

            <wpcfto_fields_aside_before :fields="fields" :field_label="field_label"></wpcfto_fields_aside_before>

            <div class="wpcfto-field-content">
                <div class="wpcfto_multi_checkbox wpcfto-admin-checkbox">
                    <label v-for="(option, key) in fields['options']">
                        <div class="wpcfto-admin-checkbox-wrapper" v-bind:class="{'active' : checkboxes.includes(key)}">
                            <div class="wpcfto-checkbox-switcher"></div>
                            <input type="checkbox" v-model="checkboxes" v-bind:value="key" :key="key"/>
                        </div>
                        <span v-html="option"></span>
                    </label>
                </div>
            </div>

            <wpcfto_fields_aside_after :fields="fields"></wpcfto_fields_aside_after>
            
        </div>
    `,
    mounted: function () {
        this.checkboxes = (typeof this.field_value === 'string' && WpcftoIsJsonString(this.field_value)) ? JSON.parse(this.field_value) : this.field_value;
        if ( this.checkboxes.length === 0 ) {
            this.checkboxes  = [];
        }
    },
    methods: {},
    watch: {
        checkboxes: {
            deep: true,
            handler: function (checkboxes) {
                this.$emit('wpcfto-get-value', checkboxes);
            }
        }
    }
});

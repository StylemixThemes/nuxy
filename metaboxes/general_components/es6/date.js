Vue.component('date-picker', DatePicker.default);
Vue.component('wpcfto_date', {
    props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value'],
    data: function () {
        return {
            value: '',
            input_value : ''
        }
    },
    mounted: function () {
        this.value = this.field_value;
        if (typeof this.field_value !== 'undefined') {

            this.$set(this, 'input_value', this.field_value);

            this.value = new Date(parseInt(this.field_value));
        }
    },
    template: `
        <div class="wpcfto_generic_field wpcfto_generic_field_flex_input wpcfto_generic_field_date">

            <wpcfto_fields_aside_before :fields="fields" :field_label="field_label"></wpcfto_fields_aside_before>

            <div class="wpcfto-field-content">
            
                <date-picker v-model="value" lang="en" @change="dateChanged(value)"></date-picker>
    
                <input type="hidden"
                    v-bind:name="field_name"
                    v-bind:placeholder="field_label"
                    v-bind:id="field_id"
                    v-model="input_value"
                />
            
            </div>

            <wpcfto_fields_aside_after :fields="fields"></wpcfto_fields_aside_after>

        </div>
    `,
    methods: {
        dateChanged(newDate) {

            var unix_time = new Date(newDate + ' UTC').getTime();

            this.$emit('wpcfto-get-value', unix_time);

            this.$set(this, 'input_value', unix_time);
        }
    },
});

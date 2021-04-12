Vue.component('wpcfto_button_group', {
    props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value'],
    data: function () {
        return {
            value : '',
        }
    },
    template: `
        <div class="wpcfto_generic_field wpcfto_generic_field_button_group" v-bind:class="field_id">

            <wpcfto_fields_aside_before :fields="fields" :field_label="field_label"></wpcfto_fields_aside_before>

            <div class="wpcfto-field-content">
                <div class="wpcfto_button_group">
                    <label v-for="(option, key) in fields['options']" v-bind:class="{'active' : value == key}">
                        <input type="radio" v-bind:name="field_name" v-model="value" v-bind:value="key"/>
                        {{ option }}
                    </label>
                </div>
            </div>

            <wpcfto_fields_aside_after :fields="fields"></wpcfto_fields_aside_after>

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

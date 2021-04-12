Vue.component('wpcfto_text', {
    props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value'],
    data: function () {
        return {
            value: '',
        }
    },
    template: `

        <div class="wpcfto_generic_field wpcfto_generic_field_flex_input wpcfto_generic_field__text">
            <wpcfto_fields_aside_before :fields="fields" :field_label="field_label"></wpcfto_fields_aside_before>

            <div class="wpcfto-field-content">
                <input type="text"
                    v-bind:name="field_name"
                    v-bind:placeholder="fields.placeholder ? fields.placeholder : 'Enter ' + field_label "
                    v-bind:id="field_id"
                    v-model="value"
                />
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

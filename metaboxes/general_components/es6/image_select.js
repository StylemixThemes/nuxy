Vue.component('wpcfto_image_select', {
    props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value'],
    data: function () {
        return {
            value : '',
            style : '',
        }
    },
    template: `
        <div class="wpcfto_generic_field wpcfto_generic_field_image_select" v-bind:class="field_id">

            <wpcfto_fields_aside_before :fields="fields" :field_label="field_label"></wpcfto_fields_aside_before>

            <div class="wpcfto-field-content">
                <div class="wpcfto_image_select">
                    <label v-for="(option, key) in fields['options']" v-bind:class="{'active' : value == key}">
                        <span class="wpcfto-img-wrap"><img v-bind:src="option.img" v-bind:alt="option.alt" v-bind:style="style"></span>
                        <input type="radio" v-bind:name="field_name" v-model="value" v-bind:value="key"/>
                        <span v-html="option.alt" class="wpcfto-img-alt"></span>
                    </label>
                </div>
            </div>

            <wpcfto_fields_aside_after :fields="fields"></wpcfto_fields_aside_after>
            
        </div>
    `,
    mounted: function () {
        this.value = this.field_value;
        if ( this.fields['width'] ) {
            this.style += 'width: ' + this.fields['width'] + 'px;';
        }
        if ( this.fields['height'] ) {
            this.style += 'height: ' + this.fields['height'] + 'px;';
        }
    },
    methods: {},
    watch: {
        value: function (value) {
            this.$emit('wpcfto-get-value', value);
        }
    }
});

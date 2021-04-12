Vue.component('wpcfto_spacing', {
    props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value'],
    data: function () {
        return {
            spacing : {},
            focused: '',
        }
    },
    template: `
        <div class="wpcfto_generic_field wpcfto_generic_field_spacing" v-bind:class="field_id">

            <wpcfto_fields_aside_before :fields="fields" :field_label="field_label"></wpcfto_fields_aside_before>

            <div class="wpcfto-field-content">
                <div class="wpcfto_spacing">

                    <div class="wpcfto-spacing-input-wrap" :class="{ 'focused' : focused == 'spacing_top' }"><i class="fa fa-arrow-up"></i><input type="number" name="top" v-model="spacing.top" @focus="focused = 'spacing_top'" @blur="focused = ''"/></div>
                    <div class="wpcfto-spacing-input-wrap" :class="{ 'focused' : focused == 'spacing_right' }"><i class="fa fa-arrow-right"></i><input type="number" name="right" v-model="spacing.right" @focus="focused = 'spacing_right'" @blur="focused = ''"/></div>
                    <div class="wpcfto-spacing-input-wrap" :class="{ 'focused' : focused == 'spacing_bottom' }"><i class="fa fa-arrow-down"></i><input type="number" name="bottom" v-model="spacing.bottom" @focus="focused = 'spacing_bottom'" @blur="focused = ''"/></div>
                    <div class="wpcfto-spacing-input-wrap" :class="{ 'focused' : focused == 'spacing_left' }"><i class="fa fa-arrow-left"></i><input type="number" name="left" v-model="spacing.left" @focus="focused = 'spacing_left'" @blur="focused = ''"/></div>
    
                    <select name="unit" v-model="spacing.unit">
                        <option v-for="option in fields['units']" v-bind:value="option">{{ option }}</option>
                    </select>
                </div>
            </div>

            <wpcfto_fields_aside_after :fields="fields"></wpcfto_fields_aside_after>
            
        </div>
    `,
    mounted: function () {
        // JSON parse for Post Meta
        this.spacing = (typeof this.field_value === 'string' && WpcftoIsJsonString(this.field_value)) ? JSON.parse(this.field_value) : this.field_value;
        if (typeof this.spacing !== 'object') {
            this.spacing = {
                top: '',
                left: '',
                right: '',
                bottom: '',
            };
        }
    },
    methods: {},
    watch: {
        spacing: {
            deep: true,
            handler: function (spacing) {
                this.$emit('wpcfto-get-value', spacing);
            }
        }
    }
});

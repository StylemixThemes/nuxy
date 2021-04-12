Vue.component('wpcfto_color_gradient', {
    props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value'],
    components: {
        'slider-picker': VueColor.Chrome
    },
    data: function () {
        return {
            gradient: {},
            copy_gradient: {},
        }
    },
    template: `
        <div class="wpcfto_generic_field wpcfto_generic_field_color_gradient" v-bind:class="field_id">

            <wpcfto_fields_aside_before :fields="fields" :field_label="field_label"></wpcfto_fields_aside_before>

            <div class="wpcfto-field-content">
                <div class="wpcfto_color_gradient">
                    <div class="wpcfto_color_gradient_group">
                        <label>From</label>
                        <div class="stm_colorpicker_wrapper">
                            <span v-bind:style="{'background-color': gradient.from.input_value}" @click="$refs.field_name_from.focus()"></span>
                            <input type="text" name="from" v-model="gradient.from.input_value" ref="field_name_from"/>
                            <div><slider-picker v-model="gradient.from.value"></slider-picker></div>
                        </div>
                    </div>
                    <div class="wpcfto_color_gradient_group">
                        <label>To</label>
                        <div class="stm_colorpicker_wrapper">
                            <span v-bind:style="{'background-color': gradient.to.input_value}" @click="$refs.field_name_to.focus()"></span>
                            <input type="text" name="to" v-model="gradient.to.input_value" ref="field_name_to" />
                            <div><slider-picker v-model="gradient.to.value"></slider-picker></div>
                        </div>
                    </div>
                </div>
            </div>

            <wpcfto_fields_aside_after :fields="fields"></wpcfto_fields_aside_after>

        </div>
    `,
    created: function () {
        // JSON parse for Post Meta
        if ( typeof this.field_value === 'string' && WpcftoIsJsonString(this.field_value) ) {
            this.field_value = JSON.parse(this.field_value);
        }

        this.gradient = {
            from: {
                input_value: (typeof this.field_value.from !== 'undefined') ? this.field_value.from : '',
                value: (typeof this.field_value.from !== 'undefined') ? this.field_value.from : ''
            },
            to: {
                input_value: (typeof this.field_value.to !== 'undefined') ? this.field_value.to : '',
                value: (typeof this.field_value.to !== 'undefined') ? this.field_value.to : ''
            }
        };

        this.set_copy_gradient();
    },
    methods: {
        vuecolor_to_string (color) {
            return ( color.a === 1 ) ? color.hex : 'rgba(' + color.rgba.r + ',' + color.rgba.g + ',' + color.rgba.b + ',' + color.rgba.a + ')';
        },
        set_copy_gradient () {
            this.copy_gradient = JSON.parse(JSON.stringify(this.gradient));
        }
    },
    watch: {
        gradient: {
            deep: true,
            handler: function (gradient) {
                var value = {};

                Object.keys(gradient).forEach((key) => {
                    if ( gradient[key].input_value !== this.copy_gradient[key].input_value ) {
                        value[key] = gradient[key].input_value;
                        this.$set(gradient[key], 'value',  value[key]);
                    } else {
                        value[key] = ( typeof gradient[key].value === 'string' ) ? gradient[key].value : this.vuecolor_to_string(gradient[key].value);
                        this.$set(gradient[key], 'input_value',  value[key]);
                    }
                });

                this.set_copy_gradient();
                this.$emit('wpcfto-get-value', value);
            }
        }
    }
});

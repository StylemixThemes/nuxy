Vue.component('wpcfto_link_color', {
    props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value'],
    components: {
        'slider-picker': VueColor.Chrome
    },
    data: function () {
        return {
            link: {},
            copy_link: {},
        }
    },
    template: `
        <div class="wpcfto_generic_field wpcfto_generic_field_link_color" v-bind:class="field_id">
            <wpcfto_fields_aside_before :fields="fields" :field_label="field_label"></wpcfto_fields_aside_before>

            <div class="wpcfto-field-content">
                
                <div class="wpcfto_link_color">
                    <div class="wpcfto_link_color_group">
                        <label>Regular</label>
                        <div class="stm_colorpicker_wrapper">
                            <span v-bind:style="{'background-color': link.regular.input_value}" @click="$refs.field_regular.focus()"></span>
                            <input type="text" name="regular" v-model="link.regular.input_value" ref="field_regular" />
                            <div><slider-picker v-model="link.regular.value"></slider-picker></div>
                        </div>
                    </div>
                    
                    <div class="wpcfto_link_color_group">
                        <label>Hover</label>
                        <div class="stm_colorpicker_wrapper">
                            <span v-bind:style="{'background-color': link.hover.input_value}" @click="$refs.field_hover.focus()"></span>
                            <input type="text" name="hover" v-model="link.hover.input_value" ref="field_hover" />
                            <div><slider-picker v-model="link.hover.value"></slider-picker></div>
                        </div>
                    </div>
                    
                    <div class="wpcfto_link_color_group">
                        <label>Active</label>
                        <div class="stm_colorpicker_wrapper">
                            <span v-bind:style="{'background-color': link.active.input_value}" @click="$refs.field_active.focus()"></span>
                            <input type="text" name="active" v-model="link.active.input_value" ref="field_active" />
                            <div><slider-picker v-model="link.active.value"></slider-picker></div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    `,
    created: function () {
        // JSON parse for Post Meta
        if ( typeof this.field_value === 'string' && WpcftoIsJsonString(this.field_value) ) {
            this.field_value = JSON.parse(this.field_value);
        }

        this.link = {
            regular: {
                input_value: (typeof this.field_value.regular !== 'undefined') ? this.field_value.regular : '',
                value: (typeof this.field_value.regular !== 'undefined') ? this.field_value.regular : ''
            },
            hover: {
                input_value: (typeof this.field_value.hover !== 'undefined') ? this.field_value.hover : '',
                value: (typeof this.field_value.hover !== 'undefined') ? this.field_value.hover : ''
            },
            active: {
                input_value: (typeof this.field_value.active !== 'undefined') ? this.field_value.active : '',
                value: (typeof this.field_value.active !== 'undefined') ? this.field_value.active : ''
            }
        };

        this.set_copy_link();
    },
    methods: {
        vuecolor_to_string (color) {
            return ( color.a === 1 ) ? color.hex : 'rgba(' + color.rgba.r + ',' + color.rgba.g + ',' + color.rgba.b + ',' + color.rgba.a + ')';
        },
        set_copy_link () {
            this.copy_link = JSON.parse(JSON.stringify(this.link));
        }
    },
    watch: {
        link: {
            deep: true,
            handler: function (link) {
                var value = {};

                Object.keys(link).forEach((key) => {
                    if ( link[key].input_value !== this.copy_link[key].input_value ) {
                        value[key] = link[key].input_value;
                        this.$set(link[key], 'value',  value[key]);
                    } else {
                        value[key] = ( typeof link[key].value === 'string' ) ? link[key].value : this.vuecolor_to_string(link[key].value);
                        this.$set(link[key], 'input_value',  value[key]);
                    }
                });

                this.set_copy_link();
                this.$emit('wpcfto-get-value', value);
            }
        }
    }
});
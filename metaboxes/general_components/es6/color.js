Vue.component('wpcfto_color', {
    template: `
        <div class="wpcfto_generic_field wpcfto_generic_field_color">
        
            <wpcfto_fields_aside_before :fields="fields" :field_label="field_label"></wpcfto_fields_aside_before>
            
            <div class="wpcfto-field-content">
                        
                <div class="stm_colorpicker_wrapper" v-bind:class="['picker-position-' + position]">

                    <span v-bind:style="{'background-color': input_value}" @click="$refs.field_name.focus()"></span>
    
                    <input type="text"
                           v-bind:name="field_name"
                           v-bind:placeholder="field_label"
                           v-bind:id="field_id"
                           v-model="input_value"
                           ref="field_name"
                    />
    
                    <div @click="changeValueFormat">
                        <slider-picker ref="colorPicker" v-model="value"></slider-picker>
                    </div>

                      <a href="#" @click="resetValue" v-if="input_value" class="wpcfto_generic_field_color__clear">
                        <i class="fa fa-times"></i>
                      </a>
    
                </div>
            
            </div>
            
            <wpcfto_fields_aside_after :fields="fields"></wpcfto_fields_aside_after>
            
        </div>
    `,
    props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value', 'default_value', 'format'],
    components: {
        'slider-picker': VueColor.Chrome
    },
    data: function () {
        return {
            input_value: '',
            position: 'bottom',
            current_format: 'hex',
            value: {
                hex: '#000000',
                rgba: {
                    r: 0,
                    g: 0,
                    b: 0,
                    a: 1,
                },
                hsl: {
                    a: 1,
                    h: 1,
                    l: 0,
                    s: 1
                },
            },
        }
    },
    created: function() {
        if(this.fields.position) {
            this.position = this.fields.position;
        }
    },
    mounted: function () {
        this.$nextTick(() => {
            this.updatePickerValue(this.field_value);
        });
    },
    methods: {
        resetValue: function(event) {
            event.preventDefault();
            this.updateInputValue(this.default_value);
            this.updatePickerValue(this.default_value);
        },
        updatePickerValue: function(value) {
            if (typeof value === 'string') {
                if ( value.indexOf('rgb') !== -1 ) {
                    var colors = value.replace('rgba(', '').slice(0, -1).split(',');
                    this.current_format = 'rgba';
                    this.value = {
                        r: colors[0],
                        g: colors[1],
                        b: colors[2],
                        a: colors[3],
                        rgba: {
                            r: colors[0],
                            g: colors[1],
                            b: colors[2],
                            a: colors[3]
                        }
                    };
                    this.$refs.colorPicker.fieldsIndex = 1;
                } else if ( value.indexOf('hsl') !== -1 ) {       
                    var colors = value.replace('hsla(', '').slice(0, -1).split(',');
                    this.current_format = 'hsl';
                    this.value = {
                        hsl: {
                            h: colors[0],
                            s: colors[1].replace('%', '') / 100,
                            l: colors[2].replace('%', '') / 100,
                            a: colors[3],
                        }
                    };
                    this.$refs.colorPicker.fieldsIndex = 2;
                } else if ( value.indexOf('#') !== -1 ) {
                    this.current_format = 'hex';
                    this.value = {
                        hex: value
                    };
                    this.$refs.colorPicker.fieldsIndex = 0;
                }
                this.input_value = value;
            }
        },
        getValueFormat: function(value) {
            var format = 'hex';
            if (typeof value === 'string') {
                if ( value.indexOf('rgb') !== -1 ) {
                    format = 'rgba';
                } else if ( value.indexOf('hsl') !== -1 ) {       
                    format = 'hsl';
                } else if ( value.indexOf('#') !== -1 ) {
                    format = 'hex';
                }
            }
            return format;
        },
        updateInputValue: function(value) {
            this.$set(this, 'input_value', value);
            this.$emit('wpcfto-get-value', value);
        },
        changeValueFormat: function(event) {
            if ( event.target.classList.contains('vc-chrome-toggle-icon') || event.target.closest('.vc-chrome-toggle-icon') ) {
                var wrapper = event.target.closest('.vc-chrome-fields-wrap');
                if ( wrapper ) {
                    var fields = wrapper.querySelectorAll('.vc-chrome-fields');
                    for ( var field of fields ) {
                        if ( field.style.display !== 'none' ) {
                            var format = field.querySelector('.vc-input__label').textContent.toLowerCase().trim();
                            var colorValue = '';
                            
                            switch (format) {
                                case 'hex':
                                    this.current_format = 'hex';
                                    colorValue = field.querySelector('.vc-input__input').getAttribute('aria-label');
                                    break;
                                case 'r':
                                    var rgba = field.querySelectorAll('.vc-input__input');
                                    this.current_format = 'rgba';
                                    colorValue = 'rgba(' + rgba[0].getAttribute('aria-label') + ',' + rgba[1].getAttribute('aria-label') + ',' + rgba[2].getAttribute('aria-label') + ',' + rgba[3].getAttribute('aria-label') + ')';
                                    break;
                                case 'h':
                                    var hsla = field.querySelectorAll('.vc-input__input');
                                    this.current_format = 'hsla';
                                    colorValue = 'hsla(' + hsla[0].getAttribute('aria-label') + ',' + hsla[1].getAttribute('aria-label') + ',' + hsla[2].getAttribute('aria-label') + ',' + hsla[3].getAttribute('aria-label') + ')';
                                    break;
                            }
                            this.updateInputValue(colorValue);
                            break;
                        }
                    }
                }
            }
        },
        hexToRgba(hex) {
            let c;
            hex = hex.trim();

            if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('');
            if (c.length === 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            const r = parseInt(c[0] + c[1], 16);
            const g = parseInt(c[2] + c[3], 16);
            const b = parseInt(c[4] + c[5], 16);
            return { r, g, b, a: 1 };
            }
            return null;
        }
    },
    watch: {
        input_value: function(value) {
            const format = this.format;
            if (format === 'rgba' && typeof value === 'string' && value.startsWith('#')) {
                const rgba = this.hexToRgba(value);
                if (rgba) {
                    const rgbaStr = `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`;
                    this.$nextTick(() => {
                        this.input_value = rgbaStr;
                        this.$emit('wpcfto-get-value', rgbaStr);
                    });
                    return;
                }
            }

            this.$emit('wpcfto-get-value', value);
        },
        value: function (value) {
            if ( value.rgba && value.rgba.a !== undefined && value.rgba.a < 1 && this.current_format === 'hex' ) {
                this.current_format = 'rgba';
            }
            switch ( this.current_format ) {
                case 'hex':
                    this.updateInputValue(value.hex);
                    break;
                case 'rgba':
                    this.updateInputValue('rgba(' + value.rgba.r + ',' + value.rgba.g + ',' + value.rgba.b + ',' + value.rgba.a + ')');
                    break;
                case 'hsl':
                    this.updateInputValue('hsla(' +  Math.ceil(value.hsl.h) + ',' + value.hsl.s*100 + '%,' + value.hsl.l*100 + '%,' + value.hsl.a + ')');
                    break;
            }
        }
    }
});

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
                        <slider-picker v-model="value"></slider-picker>
                    </div>

                      <a href="#" @click="resetValue" v-if="input_value" class="wpcfto_generic_field_color__clear">
                        <i class="fa fa-times"></i>
                      </a>
    
                </div>
            
            </div>
            
            <wpcfto_fields_aside_after :fields="fields"></wpcfto_fields_aside_after>
            
        </div>
    `,
    props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value'],
    components: {
        'slider-picker': VueColor.Chrome
    },
    data: function () {
        return {
            default_value: '',
            input_value: '',
            position : 'bottom',
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
                    h: 0,
                    l: 1,
                    s: 0
                },
            },
        }
    },
    created: function () {
        this.default_value = this.field_value;

        if (typeof this.field_value === 'string') {

            if ( this.field_value.indexOf('rgb') !== -1 ) {
                var colors = this.field_value.replace('rgba(', '').slice(0, -1).split(',');

                this.value = {
                    rgba: {
                        r: colors[0],
                        g: colors[1],
                        b: colors[2],
                        a: colors[3]
                    }
                };

            } else if ( this.field_value.indexOf('hsl') !== -1 ) {
                var colors = this.field_value.replace('hsla(', '').slice(0, -1).split(',');
                this.value = {
                    hsl: {
                        h: colors[0],
                        s: colors[1],
                        l: colors[2],
                        a: colors[3]
                    }
                };
            } else if ( this.field_value.indexOf('#') !== -1 ) {
                this.value = {
                    hex: this.field_value
                };
            }
            this.input_value = this.field_value;
        }

        if(this.fields.position) this.position = this.fields.position;
    },
    methods: {
        resetValue: function(event) {
            event.preventDefault();
            this.$set(this, 'input_value', this.default_value);
            this.$emit('wpcfto-get-value', this.default_value);
        },
        updateValue: function(value) {
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
                                    colorValue = field.querySelector('.vc-input__input').getAttribute('aria-label');
                                    console.log(colorValue);
                                    break;
                                case 'r':
                                    var rgba = field.querySelectorAll('.vc-input__input');
                                    colorValue = 'rgba(' + rgba[0].getAttribute('aria-label') + ',' + rgba[1].getAttribute('aria-label') + ',' + rgba[2].getAttribute('aria-label') + ',' + rgba[3].getAttribute('aria-label') + ')';
                                    break;
                                case 'h':
                                    var hsla = field.querySelectorAll('.vc-input__input');
                                    colorValue = 'hsla(' + hsla[0].getAttribute('aria-label') + ',' + hsla[1].getAttribute('aria-label') + ',' + hsla[2].getAttribute('aria-label') + ',' + hsla[3].getAttribute('aria-label') + ')';
                                    break;
                            }
                            this.updateValue(colorValue);
                            break;
                        }
                    }
                }
            }
        }
    },
    watch: {
        input_value : function(value) {
            this.$emit('wpcfto-get-value', value);
        },
        value: function (value) {
            if (typeof value.rgba !== 'undefined') {
                var rgba_color = 'rgba(' + value.rgba.r + ',' + value.rgba.g + ',' + value.rgba.b + ',' + value.rgba.a + ')';
                this.updateValue(rgba_color);
            }
        }
    }
});

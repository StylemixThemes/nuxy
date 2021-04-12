import RangeSlider from 'vue-range-slider'

Vue.component('wpcfto_range_slider', {
    props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value', 'field_data', 'field_description', 'field_input_addon'],
    data: function () {
        return {
            value: 0,
            min : 0,
            max : 100,
            step : 1
        }
    },
    components: {
        RangeSlider
    },
    template: ` 
            <div class="wpcfto_generic_field wpcfto_generic_field_range_slider" v-bind:class="field_id">
            
                <wpcfto_fields_aside_before :fields="fields" :field_label="field_label"></wpcfto_fields_aside_before>
            
                <div class="wpcfto-field-content">
                    <div class="wpcfto_range_slider">
                        <span class="wpcfto_range_slider__pin" v-html="value" v-bind:style="rangeStyles()"></span>
                        <range-slider
                        class="slider"
                        :min="min"
                        :max="max"
                        :step="step"
                        v-model="value">
                        </range-slider>
                        <template v-if="field_input_addon">
                            <input type="number" @input="change" @change="change" v-model="value" :max="max" class="wpcfto_range_slider_custom_input" />
                            <span v-if="field_input_addon.label" v-html="field_input_addon.label" class="wpcfto_field_addon"></span>
                        </template>
                    </div>
                </div>
                
            </div>
    `,
    mounted: function () {
        this.value = (typeof this.field_value === 'string' && WpcftoIsJsonString(this.field_value)) ? JSON.parse(this.field_value) : this.field_value;
         this.min = this.field_data.min;
         this.max = this.field_data.max;
         this.step = this.field_data.step;
    },
    methods: {
        rangeStyles : function() {
            let procent = (this.max - this.min) / 100;
            return {
                left: ((this.value - this.min) * 100 / (this.max - this.min)) + '%'
            }
        },

        change() {
            if ( this.value > 200  )
                this.value = 200
        }
    },
    watch: {
        value: {
            deep: true,
            handler: function (value) {
                this.$emit('wpcfto-get-value', value);
            }
        }
    }
});
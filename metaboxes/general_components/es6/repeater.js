Vue.component('wpcfto_repeater', {
    props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value', 'field_data'],
    data: function () {
        return {
            repeater: [],
            repeater_values: {},
            disable_scroll: false
        }
    },
    template: `
    <div class="wpcfto_generic_field wpcfto_generic_field_repeater wpcfto-repeater unflex_fields">

        <wpcfto_fields_aside_before :fields="fields" :field_label="field_label"></wpcfto_fields_aside_before>
        
        <div class="wpcfto-field-content">

            <div v-for="(area, area_key) in repeater" class="wpcfto-repeater-single" :class="'wpcfto-repeater_' + field_name + '_' + area_key ">
    
                <div class="wpcfto_group_title" v-html="field_label + ' #' + (area_key + 1)"></div>
    
                <div class="repeater_inner">
    
                    <div class="wpcfto-repeater-field" v-for="(field, field_name_inner) in fields.fields">
                    
                        <component :is="'wpcfto_' + field.type"
                                   :fields="field"
                                   :field_name="field_name + '_' + area_key + '_' + field_name_inner"
                                   :field_label="field.label"
                                   :field_value="getFieldValue(area_key, field, field_name_inner)"
                                   :field_data="field"
                                   :field_native_name="field_name"
                                   :field_native_name_inner="field_name_inner"
                                   @wpcfto-get-value="$set(repeater[area_key], field_name_inner, $event)">
                        </component>
    
                    </div>
    
                </div>
    
                <span class="wpcfto-repeater-single-delete" @click="removeArea(area_key)">
                    <i class="fa fa-trash-alt"></i>Delete
                </span>
    
            </div>
    
            <div v-if="repeater && repeater.length > 0" class="separator"></div>
    
            <div class="addArea" @click="addArea">
                <i class="fa fa-plus-circle"></i>
                <span v-html="addLabel()"></span>
            </div>
        
        </div>
        
        <wpcfto_fields_aside_after :fields="fields"></wpcfto_fields_aside_after>

    </div>
    `,
    mounted: function () {
        var _this = this;

        if (typeof _this.field_value === 'string' && WpcftoIsJsonString(_this.field_value)) {
            _this.field_value = JSON.parse(_this.field_value);
        }


        if (typeof _this.field_value !== 'undefined' && typeof _this.field_value !== 'string') {
            _this.$set(_this, 'repeater_values', _this.field_value);
            _this.repeater_values.forEach(function () {
                _this.repeater.push({});
            });
        }

        if(typeof _this.field_data !== 'undefined' && typeof _this.field_data['disable_scroll'] !== 'undefined') _this.disable_scroll = true;

    },
    methods: {
        addArea: function () {
            this.repeater.push({
                closed_tab : true
            });


            if(!this.disable_scroll) {
                var el = 'wpcfto-repeater_' + this.field_name + '_' + (this.repeater.length - 1);

                Vue.nextTick(function () {
                    if (typeof jQuery !== 'undefined') {
                        var $ = jQuery;
                        $([document.documentElement, document.body]).animate({
                            scrollTop: $("." + el).offset().top - 40
                        }, 400);
                    }
                })
            }

        },
        toggleArea: function(area) {
            var currentState  = (typeof area['closed_tab'] !== 'undefined') ? area['closed_tab'] : false;

            this.$set(area, 'closed_tab', !currentState);
        },
        removeArea: function (areaIndex) {
            if(confirm('Do your really want to delete this field?')) {
                this.repeater.splice(areaIndex, 1);
            }
        },
        getFieldValue(key, field, field_name) {

            if (typeof this.repeater_values === 'undefined') return field.value;
            if (typeof this.repeater_values[key] === 'undefined') return field.value;
            if (typeof this.repeater_values[key][field_name] === 'undefined') return field.value;

            return this.repeater_values[key][field_name];
        },
        addLabel() {

            if(typeof this.fields['load_labels'] !== 'undefined' && this.fields['load_labels']['add_label'] !== 'undefined') {
                return this.fields['load_labels']['add_label'];
            }

            return this['field_label'];
        }
    },
    watch: {
        repeater: {
            deep: true,
            handler: function (repeater) {
                this.$emit('wpcfto-get-value', repeater);
            }
        },
    }
});

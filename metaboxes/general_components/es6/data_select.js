Vue.component('wpcfto_data_select', {
    props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value'],
    data: function () {
        return {
            value : '',
            style : '',
        }
    },
    template: `
        <div class="wpcfto_generic_field wpcfto_generic_field_data_select" v-bind:class="field_id">

            <wpcfto_fields_aside_before :fields="fields" :field_label="field_label"></wpcfto_fields_aside_before>

            <div class="wpcfto-field-content">
                <div class="wpcfto_data_select">
                    <label
                        v-for="(option, key) in fields['options']"
                        class="wpcfto_data_select__label"
                    >
                        <div class="wpcfto_data_select__wrapper" v-bind:class="{'wpcfto_data_select__wrapper_disabled': option.disabled}">
                            <span class="wpcfto_data_select__img" v-bind:class="{'wpcfto_data_select__img_active': value == option.value}">
                                <img v-bind:src="option.img" v-bind:alt="option.alt" v-bind:style="style">
                                <a v-if="option.preview_url" :href="option.preview_url" target="_blank" class="wpcfto_data_select__img-preview">
                                    {{ option.preview_label }}
                                </a>
                            </span>
                            <div class="wpcfto_data_select__content">
                                <input v-if="!option.disabled" type="radio" v-bind:name="field_name" v-model="value" v-bind:value="option.value"/>
                                <div class="wpcfto_data_select__alt-wrapper">
                                    <span v-html="option.alt" class="wpcfto_data_select__alt"></span>
                                    
                                    <div v-if="option.disabled" class="wpcfto_data_select__disabled">
                                        <span v-if="option.disabled_hint" class="wpcfto_data_select__disabled-hint" v-html="option.disabled_hint"></span>
                                        <i class="fa fa-lock"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
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
    watch: {
        value: function (value) {
            this.$emit('wpcfto-get-value', value);
        }
    }
});

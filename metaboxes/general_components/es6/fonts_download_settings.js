Vue.component('fonts_download_settings', {
    props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value', 'option_id'],
    data: function () {
        return {
            translations: wpcfto_global_settings['translations'],
            loading: false,
            value: '',
            regenerate_texts: {
                label: wpcfto_global_settings['translations'].regenerate_fonts_title,
                description: wpcfto_global_settings['translations'].regenerate_fonts_notice,
            },
            fonts_download_setting_texts: {
                label: wpcfto_global_settings['translations'].fonts_download_setting_label,
                description: wpcfto_global_settings['translations'].fonts_download_setting_description,
            }
        }
    },
    template: `
        <div class="wpcfto_fonts_download_settings">
            <div class="wpcfto_enable_fonts">
                <div class="wpcfto_generic_field wpcfto_generic_checkbox wpcfto_generic_field_regenerate_fonts">
                    <wpcfto_fields_aside_before :fields="fonts_download_setting_texts" :field_label="fonts_download_setting_texts.label"></wpcfto_fields_aside_before>
                    <div class="wpcfto-field-content">
                        <div class="wpcfto-admin-checkbox wpcfto_enable_fonts_checkbox">
                            <label>
                                <div class="wpcfto-admin-checkbox-wrapper is_toggle" v-bind:class="{'active' : value}">
                                    <div class="wpcfto-checkbox-switcher"></div>
                                    <input type="checkbox"
                                           :name="field_name"
                                           v-bind:id="field_id"
                                           v-model="value"
                                    />
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="value" class="wpcfto_regenerate_fonts_field">
                <div class="wpcfto_generic_field wpcfto_generic_field_flex_input wpcfto_generic_field_regenerate_fonts">
                    <wpcfto_fields_aside_before :fields="regenerate_texts" :field_label="regenerate_texts.label"></wpcfto_fields_aside_before>
                    <a href="#" v-bind:class="{'loading': loading}" class="button" @click.prevent="regenerateFonts">
                        <span>{{ translations.regenerate_fonts_btn }}</span>
                        <i class="lnr lnr-sync"></i>
                    </a>
                </div>
            </div>
        </div>
    `,
    mounted: function () {
        this.value = this.field_value;
    },
    methods: {
        regenerateFonts() {
            var vm = this;

            vm.loading = true;
            let url = stm_wpcfto_ajaxurl + '?action=wpcfto_regenerate_fonts&name=' + vm.option_id + '&nonce=' + stm_wpcfto_nonces['wpcfto_regenerate_fonts'];
            this.$http.post(url).then(function (response) {
                vm.loading = false;
                if (response?.data?.reload) {
                    location.reload();
                }
            });
        }
    },
    watch: {
        value: function (value) {
            this.$emit('wpcfto-get-value', value);
        }
    }
});
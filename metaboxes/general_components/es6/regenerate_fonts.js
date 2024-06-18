Vue.component('wpcfto_regenerate_fonts', {
    data: function () {
        return {
            translations: wpcfto_global_settings['translations'],
            loading: false
        }
    },
    template: `
      <div class="wpcfto_regenerate_fonts">
        <div class="wpcfto_generic_field wpcfto_generic_field_flex_input wpcfto_generic_field_regenerate_fonts">
          <label v-html="translations.regenerate_fonts_title"></label>
          <p v-html="translations.regenerate_fonts_notice"></p>
          <a href="#" v-bind:class="{'loading': loading}" class="button" @click.prevent="regenerateFonts">
            <span>{{ translations.regenerate_fonts_btn }}</span>
            <i class="lnr lnr-sync"></i>
          </a>
        </div>
      </div>
    `,
    methods: {
        regenerateFonts() {
            var vm = this;

            vm.loading = true;
            let url = stm_wpcfto_ajaxurl + '?action=wpcfto_regenerate_fonts&nonce=' + stm_wpcfto_nonces['wpcfto_regenerate_fonts'];
            this.$http.post(url).then(function (response) {
                vm.loading = false;
                if (response?.data?.reload) {
                    location.reload();
                }
            });
        }
    }
});

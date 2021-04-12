Vue.component('wpcfto_import_export', {
    props: ['data', 'id'],
    data: function () {
        return {
            translations: wpcfto_global_settings['translations'],
            userData: [],
            importData : '',
            loading: false
        }
    },
    template: `

        <div class="wpcfto_import_export">
        
            <div class="wpcfto_import_export__export">
            
                <input id="wpcfto_export_data" type="hidden" v-model="exportData" />
                <h3 v-html="translations.export_data_label"></h3>
                <a href="#" class="button" @click.prevent="copyExportData">{{translations.export}}</a>
                
            </div>
            
            <div class="wpcfto_import_export__import">
            
                <h3 v-html="translations.import_data_label"></h3>
                <textarea v-model="importData"></textarea>
                <div class="wpcfto_import_export__import_notice" v-html="translations.import_notice"></div>
                <a href="#" class="button" :disabled="Object.keys(importData).length === 0" @click.prevent="proceedData">{{translations.import}}</a>
                <span class="loading_import" v-if="loading">
                    <i class="loading_v2"></i>
                </span>
                
            </div>
            
        </div>
    `,
    mounted: function () {
        this.userData = this.data;
    },
    methods: {
        copyExportData() {
            let wpcftoExportData = document.querySelector('#wpcfto_export_data');
            wpcftoExportData.setAttribute('type', 'text');
            wpcftoExportData.select();

            try {
                var successful = document.execCommand('copy');
                alert(this.translations['exported_data']);
            } catch (err) {
                alert(this.translations['exported_data_error']);
            }

            /* unselect the range */
            wpcftoExportData.setAttribute('type', 'hidden');
            window.getSelection().removeAllRanges()
        },
        proceedData() {
            var vm = this;

            if(Object.keys(vm.importData).length === 0) return false;

            vm.loading = true;
            let url = stm_wpcfto_ajaxurl + '?action=wpcfto_save_settings&nonce=' + stm_wpcfto_nonces['wpcfto_save_settings'] + '&name=' + vm.id;
            this.$http.post(url, vm.importData).then(function (response) {
                vm.loading = false;
                location.reload();
            });
        }
    },
    computed: {
        exportData: function () {
            return JSON.stringify(this.userData);
        }
    }
});

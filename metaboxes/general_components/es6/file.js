Vue.component('wpcfto_file', {
    props: ['fields','field_label', 'field_name', 'field_id', 'field_value', 'field_data', 'field_native_name', 'field_native_name_inner'],
    data: function () {
        return {
            data: '',
            error: '',
            value: {
                name: '',
                url: '',
                path: '',
            },
            input_value: '',
            uploading: false
        }
    },
    template: `
        <div class="wpcfto_generic_field wpcfto_generic_field__file">
        
            <wpcfto_fields_aside_before :fields="fields" :field_label="field_label"></wpcfto_fields_aside_before>

            <div class="wpcfto-field-content">
                <label class="file-select" v-if="!value.path">
    
                    <div class="select-button" v-bind:class="{'uploading' : uploading}">
                        <span v-if="!uploading">
                            <i class="fa fa-paperclip"></i>
                            {{field_data.load_labels.label}}
                        </span>
                        <span v-html="field_data.load_labels.loading" v-else></span>
                    </div>
    
                    <input type="file" :accept="field_data['accept'].join(',')" @change="handleFileChange" />
                </label>
    
                <div class="field_label_error" v-if="error" v-html="error"></div>
    
                <div class="field_label__file" v-if="value.url">
                    <a v-bind:href="value.url" target="_blank">
                        {{generateFileName(value['url'])}}
                        <i class="fa fa-times" @click.prevent="deleteFile()"></i>
                    </a>
    
                </div>
  
                <input type="hidden"
                    v-bind:name="field_name"
                    v-bind:placeholder="field_label"
                    v-bind:id="field_id"
                    v-model="input_value"
                />
            
            </div>

            <wpcfto_fields_aside_after :fields="fields"></wpcfto_fields_aside_after>

        </div>
    `,
    mounted: function () {
        if(typeof this.field_value !== 'undefined') {
            if (typeof this.field_value.url !== 'undefined' && this.field_value.url === '') this.field_value = '';
            if (typeof this.field_value.path !== 'undefined' && this.field_value.path === '') this.field_value = '';

            if(this.field_value !== '') this.value = JSON.parse(this.field_value);
        }

        this.data = this.field_data;
    },
    methods: {
        handleFileChange(e) {
            var _this = this;
            if (e.target.files.length) {
                var file = e.target.files[0];
                _this.uploading = true;
                _this.error = '';

                var formData = new FormData();
                formData.append('file', file);
                formData.append('field', this.field_name);

                if(typeof this.field_native_name !== 'undefined') {
                    formData.append('field_native_name', this.field_native_name);
                }

                if(typeof this.field_native_name_inner !== 'undefined') {
                    formData.append('field_native_name_inner', this.field_native_name_inner);
                }

                var url = stm_wpcfto_ajaxurl + '?action=wpcfto_upload_file&nonce=' + stm_wpcfto_nonces['wpcfto_upload_file'];

                _this.$http.post(url, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(function (r) {
                    r = r.body;
                    if (r.error) {
                        _this.$set(_this, 'error', r.error);
                    } else {
                        _this.$set(_this, 'value', r);
                    }
                    _this.uploading = false;
                });

            }
        },
        deleteFile() {
            this.$set(this, 'value', {
                path: '',
                url: ''
            })
        },
        generateFileName(url) {
            var name = '';
            var nameLength = 30;
            if(url.length > nameLength) name = '...';
            name += url.substr(url.length - nameLength);

            return name;
        }
    },
    watch: {
        value: function (value) {
            var stringified = JSON.stringify(value);
            if(value.path === '' && value.url === '') stringified = '';
            this['input_value'] = stringified;
            this.$emit('wpcfto-get-value', stringified);
        }
    }
});

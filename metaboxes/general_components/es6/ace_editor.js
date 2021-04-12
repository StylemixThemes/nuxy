Vue.component('wpcfto_ace_editor', {
    props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value', 'field_data'],
    data: function () {
        return {
            value: '',
        }
    },
    components: {
        editor: require('vue2-ace-editor'),
    },
    template: `
        <div class="wpcfto_generic_field wpcfto_generic_field_ace_editor">
        
            <wpcfto_fields_aside_before :fields="fields" :field_label="field_label"></wpcfto_fields_aside_before>

            <div class="wpcfto-field-content">
                <editor
                    v-model="value"
                    @init="editorInit"
                    :lang="field_data['lang']"
                    theme="chrome"
                    width="100%"
                    height="400"></editor>
            </div>

            <wpcfto_fields_aside_after :fields="fields"></wpcfto_fields_aside_after>
        </div>
    `,
    mounted: function () {
        this.value = this.field_value;
    },
    methods: {
        editorInit: function () {
            require('brace/ext/language_tools');
            require('brace/mode/html');
            require('brace/mode/javascript');
            require('brace/mode/less');
            require('brace/theme/chrome');
            require('brace/snippets/javascript');
        }
    },
    watch: {
        value: function (value) {
            this.$emit('wpcfto-get-value', value);
        }
    }
});

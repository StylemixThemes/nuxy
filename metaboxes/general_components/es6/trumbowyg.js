Vue.component('vue-trumbowyg', VueTrumbowyg.default);
Vue.component('wpcfto_trumbowyg', {
    props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value'],
    data: function data() {
        return {
            value: '',
            content: null,
            config: {
                btns: [
                    ['viewHTML'],
                    ['undo', 'redo'], // Only supported in Blink browsers
                    ['formatting'],
                    ['strong', 'em', 'del'],
                    ['foreColor', 'backColor'],
                    ['link'],
                    ['insertImage'],
                    ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
                    ['unorderedList', 'orderedList'],
                    ['horizontalRule'],
                    ['removeformat'],
                    ['fullscreen']
                ],
            }
        };
    },
    template: `
        <template>
            <div>
                <div class="wpcfto_generic_field">
                    <div class="wpcfto-field-aside">
                        <label v-html="field_label" class="wpcfto-field-aside__label"></label>
                    </div>
                    <div class="wpcfto-field-content">
                        <div class="hints">
                            <span @click="enterHint(hint_key)" v-for="(hint_text, hint_key) in fields.hints">{{hint_text}}</span>
                        </div>
                    </div>
                </div>
                <vue-trumbowyg v-model="value" :config="config"  class="form-control" name="content">
                </vue-trumbowyg>
            </div>
        </template>`,
    mounted: function mounted() {
        if (typeof this.field_value !== 'undefined') {
            this.$set(this, 'value', this.field_value);
        }
    },
    methods: {
        enterHint: function (hint) {
            this.value += ' {{' + hint + '}}';
        }
    },
    watch: {
        value: function value(_value) {
            this.$emit('wpcfto-get-value', _value);
        }
    }
});
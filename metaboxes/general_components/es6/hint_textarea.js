Vue.component('wpcfto_hint_textarea', {
    props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value'],
    data: function () {
        return {
            value: '',
        }
    },
    template: `
        <div class="wpcfto_generic_field">
        
            <div class="wpcfto-field-aside">
                <label v-html="field_label" class="wpcfto-field-aside__label"></label>
            </div>
            
            <div class="wpcfto-field-content">
                <div class="hints">
                    <span @click="enterHint(hint_key)" v-for="(hint_text, hint_key) in fields.hints">{{hint_text}}</span>
                </div>
                
                <textarea v-bind:name="field_name"
                          v-bind:placeholder="field_label"
                          v-bind:id="field_id"
                          v-model="value">
                </textarea>
            </div>
            
        </div>
    `,
    mounted: function () {
        this.value = this.field_value;
    },
    methods: {
        enterHint: function (hint) {
            this.value += ' {{' + hint + '}}';
        }
    },
    watch: {
        value: function (value) {
            this.$emit('wpcfto-get-value', value);
        }
    }
});
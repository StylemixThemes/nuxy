Vue.component('wpcfto_fields_aside_before', {
    props: ['fields', 'field_label'],
    data: function () {
        return {
            fields: {},
        }
    },
    template: `
        <div class="wpcfto-field-aside" v-if="field_label || fields.preview || fields.description || fields.hint">
            <label v-html="field_label" class="wpcfto-field-aside__label"></label>

            <div v-if="fields && fields.hint" class="wpcfto_field_hint text">
                <i class="fa fa-info-circle"></i><div v-html="fields.hint" class="hint"></div>
            </div>
                     
            <div
            v-if="fields && fields.preview"
            class="wpcfto_preview"><span class="wpcfto_preview__text">Preview</span><span
            class="wpcfto_preview__popup"><img
            :src="fields.preview" /></span></div>
            
            <div v-if="fields && fields.description" v-html="fields.description" class="wpcfto-field-description wpcfto-field-description__before description"></div>
        </div>
    `,
});


Vue.component('wpcfto_fields_aside_after', {
    props: ['fields', 'field_data'],
    data: function () {
        return {
            fields: {},
        }
    },
    template: ` 
        <div>&nbsp</div>
`,
});

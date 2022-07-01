Vue.component('wpcfto_group_title', {
    props: ['fields', 'field_label', 'field_name', 'field_id', 'field_icon', 'field_preview_position'],
    data: function () {
        return {
            fields: {},
        }
    },
    template: `

        <div class="wpcfto_generic_field wpcfto_generic_field__group_title" :class="field_preview_position">
            <i :class="field_icon"></i>
            <wpcfto_fields_aside_before :fields="fields" :field_label="field_label"></wpcfto_fields_aside_before>
        </div>
    `
});
Vue.component('wpcfto_notification_message', {
    props: ['fields', 'field_name', 'field_id', 'field_value'],
    data: function () {
        return {
            value: '',
            mount_status: false
        }
    },
    template: `
        <div class="wpcfto_generic_field wpcfto_generic_field__notice" v-bind:class="field_name" v-bind:data-notice="field_name">
            <div class="wpcfto_generic_field__notice_info">
                <div v-if="fields.image" class="notice_icon"><img :src="fields.image" width="80" height="80" /></div>
                <div v-if="fields.icon" class="notice_icon"><i :class="fields.icon"></i></div>
                <div v-if="fields.description" v-html="fields.description" class="field-description description"></div>
            </div>
            <div v-if="fields.buttons" class="wpcfto_generic_field__notice_button_box">
                <a v-for="(button) in fields.buttons" v-if="button.url || button.text" :href="button.url" class="button" :class="button.class" target="_blank" rel="nofollow">{{ button.text }}</a>
            </div>
        </div>
    `
});
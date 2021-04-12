var wpcfto_notice_mounted = false;

Vue.component('wpcfto_notice', {
    props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value'],
    data: function () {
        return {
            value: '',
            mount_status: false
        }
    },
    template: `
        <div class="wpcfto_generic_field wpcfto_generic_field__notice" v-bind:class="field_name" v-bind:data-notice="field_name">
            <label v-html="field_label"></label>
            <span v-if="fields.description" v-html="fields.description" class="field-description description"></span>
        </div>
    `,
    mounted: function () {

        if (!wpcfto_notice_mounted) {

            wpcfto_notice_mounted = true;

            Vue.nextTick(function () {


                var $ = jQuery;
                var current_notice = '';
                $('.column-1').each(function () {
                    var $this = $(this);
                    var $isNotice = $(this).find('.wpcfto_generic_field__notice');
                    if ($isNotice.length) {
                        current_notice = $isNotice.attr('data-notice');
                        $this.attr('data-main', current_notice);
                    } else {
                        $this.addClass(current_notice).addClass('wpcfto_notice_visiblity');
                    }
                });

                $('.wpcfto_generic_field__notice').on('click', function () {

                    $('.wpcfto_generic_field__notice, .wpcfto_notice_visiblity').removeClass('opened');

                    $('.' + $(this).data('notice')).toggleClass('opened');
                });

            });

        }
    },
    methods: {},
    watch: {
        value: function (value) {

        }
    }
});

Vue.component('wpcfto_image', {
    props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value'],
    mixins: [wpcfto_get_image_mixin],
    data: function () {
        return {
            value: '',
            media_modal: '',
            image_url: ''
        }
    },
    mounted: function () {
        var vm = this;
        vm.value = vm.field_value;
    },
    template: `
        <div class="wpcfto_generic_field wpcfto_generic_field_image">

            <wpcfto_fields_aside_before :fields="fields" :field_label="field_label"></wpcfto_fields_aside_before>

            <div class="wpcfto-field-content" v-bind:class="{'not_image' : (image_url && !wpcfto_checkURL(image_url))}">
                <div class="wpcfto-image" :class="{ 'has-image' : image_url && wpcfto_checkURL(image_url) }">
                    <input type="text" v-model="image_url" class="wpcfto-input-url" readonly
                    v-bind:placeholder="fields.placeholder ? fields.placeholder : 'Image URL'" />
    
                    <div class="image-field" v-if="image_url && wpcfto_checkURL(image_url)">
                        <img v-bind:src="image_url" v-if="wpcfto_checkURL(image_url)"/>
                    </div>
                    <div class="actions">
                        <div class="button" v-if="!image_url || !wpcfto_checkURL(image_url)" @click="addImage()">
                            <i class="fa fa-upload"></i>Upload
                        </div>
                        <div class="button" v-if="image_url && wpcfto_checkURL(image_url)" @click="addImage()">
                        <i class="fa fa-upload"></i>Replace
                        </div>
                        <div class="button button-remove" v-if="image_url" @click="removeImage()">
                            <i class="fa fa-times"></i>Remove
                        </div>
                    </div>
                </div>
    
    
                <input type="hidden"
                       v-bind:name="field_name"
                       v-model="value" />
                       
           </div>

            <wpcfto_fields_aside_after :fields="fields"></wpcfto_fields_aside_after>

        </div>
    `,
    methods: {
        addImage: function () {
            this.media_modal = wp.media({
                frame: 'select',
                multiple: false,
                editing: true,
            });

            this.media_modal.on('select', function (value) {
                var attachment = this.media_modal.state().get('selection').first().toJSON();

                this.value = attachment.id;
                this.image_url = attachment.url;

            }, this);

            this.media_modal.open();
        },
        removeImage: function () {
            this.value = this.image_url = '';
        }
    },
    watch: {
        value: function (value) {
            this.$emit('wpcfto-get-value', value);
        },
    }
});

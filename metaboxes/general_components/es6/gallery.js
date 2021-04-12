Vue.component('wpcfto_gallery', {
	props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value'],
	data: function () {
		return {
			gallery : []
		}
	},
	template: `
        <div class="wpcfto_generic_field wpcfto_generic_field_gallery" v-bind:class="field_id">

            <wpcfto_fields_aside_before :fields="fields" :field_label="field_label"></wpcfto_fields_aside_before>
			
			<div class="wpcfto-field-content">
			
				<div class="wpcfto_gallery">
					<draggable class="wpcfto_gallery__items"
							   :list="gallery"
							   group="gallery">
	
						<div class="wpcfto_gallery__item"
							 v-for="(image, image_key) in gallery"
							 :key="image_key">
	
							 <i class="wpcfto_gallery__item_delete fa fa-times" @click="gallery.splice(image_key, 1)"></i>
	
						  <img v-bind:src="image.url" />
	
						</div>
	
					 </draggable>
	
					<div class="actions">
						<div class="button" @click="addImages()">Add/Edit Gallery</div>
						<div class="button button-remove" v-if="gallery.length > 0" @click="gallery = []">Clear Gallery</div>
					</div>
	
				</div>
			</div>

			<wpcfto_fields_aside_after :fields="fields"></wpcfto_fields_aside_after>

        </div>
    `,
	mounted: function () {

		this.gallery = this.field_value;
		if(typeof this.field_value === 'string' && WpcftoIsJsonString(this.field_value)) this.gallery = JSON.parse(this.field_value);

	},
	methods: {
		addImages: function () {

			var _this = this;

			_this.media_modal = wp.media({
				frame: 'select',
				multiple: true,
				editing: true,
				library: {
					type: [ 'image' ]
				},
			});

			_this.media_modal.on('select', function () {
				var attachments = _this.media_modal.state().get('selection').toJSON();
				attachments.forEach(function(attachment){
					_this.gallery.push({
						id : attachment.id,
						url : attachment.sizes.thumbnail.url
					});
				})

			}, _this);

			_this.media_modal.open();
		}
	},
	watch: {
		gallery: {
		    deep: true,
		    handler: function (gallery) {

		    	let gallery_value = [];

		    	gallery.forEach(function(gallery_item){
		    		gallery_value.push(gallery_item.id);
				});

		        this.$emit('wpcfto-get-value', gallery_value);

		    }
		}
	}
});

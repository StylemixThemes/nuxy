let timeout = undefined;
let icons = wpcfto_icons_set;

Vue.component('wpcfto_icon_picker', {
    props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value', 'field_data'],
    data: function () {
        return {
            value: {
                icon: '',
                color: '#000',
                size: 15,
            },
            focusOn: false,
            icons: icons,
            hoverPanel: false,
            search: "",
            beforeSelect: "",
            selected: "",
            inited: false
        }
    },
    template: `
        <div class="wpcfto_generic_field wpcfto_generic_field_iconpicker">

            <wpcfto_fields_aside_before :fields="fields" :field_label="field_label"></wpcfto_fields_aside_before>
            
            <div class="wpcfto-field-content">
                <div class="wpcfto_generic_field__inner">
    
                    <div class="wpcfto_generic_field">
                        <label>Icon picker</label>
                        <input ref="picker"
                        v-model="search"
                        @blur="blur"
                        @focus="focus"
                        type="email"
                        class="form-control"
                        placeholder="Search an icon">
                    </div>
    
                    <wpcfto_color @wpcfto-get-value="value['color'] = $event"
                        :fields="{position: 'bottom'}"
                        v-if="inited"
                        :field_label="'Icon color'"
                        :field_value="value['color']">
    
                    </wpcfto_color>
    
                    <wpcfto_range_slider :fields="fields"
                        v-if="inited"
                        :field_label="'Icon size'"
                        :field_name="field_name"
                        :field_description="'Icon size set in pixels'"
                        :field_id="field_id"
                        :field_value="value['size']"
                        :field_data="{min:1,max:200}"
                        :field_input_addon="{label:'px'}"
                        @wpcfto-get-value="value['size'] = $event">
                    </wpcfto_range_slider>
    
                </div>
    
                <transition name="icon-preview-fade">
                    <div v-if="focusOn" class="preview-container">
                        <div @click="select(undefined)" @mouseover="hoverPanel = true" @mouseout="hoverPanel = false" :class="['previewer', 'rounded', {'custom-shadow-sm': !hoverPanel}, {'custom-shadow': hoverPanel} ]">
                            <div v-for="(i, index) in iconsFiltered" :key="index" class="icon-preview">
                                <div @click.prevent.stop="select(i)" :class="['icon-wrapper','rounded','shadow-sm', {selected: i.title == selected}]" >
                                    <i :class="i.title" />
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            
                 <div class="icon-preview-wrap">
                    <label>Preview</label>
                    <div class="icon-preview-inner">
                        <i class="wpcfto_generic_field__iconpicker__icon"
                        v-bind:class="value.icon"
                        v-bind:style="{ color: value.color, 'font-size' : value.size + 'px'}"
                        v-if="value.icon && value.icon !== ''"></i>  
                        <span v-else>--</span>  
                    </div>        
                 </div>
             </div>

        </div>
  `,
    mounted: function () {
        if (typeof this.field_value === 'string' && WpcftoIsJsonString(this.field_value)) {
            this.value = JSON.parse(this.field_value);
        } else if (typeof this.field_value === 'object') {
            this.value = this.field_value;
        }

        if (!this.value.icon) {
            this.value = {
                icon: '',
                color: '#000',
                size: 15,
            };
        }

        this.selected = this.value.icon;
        this.inited = true;
    },
    methods: {
        blur() {
            timeout = setTimeout(() => {
                this.focusOn = false;
                this.value.icon = '';
            }, 100);
        },
        focus() {
            this.focusOn = true;
        },
        select(icon) {
            clearTimeout(timeout);
            if (icon) {
                if (this.search != this.selected) this.beforeSelect = this.search;
                this.selected = icon.title;
                this.search = icon.title;
            }
            this.focusOn = false;
            this.value.icon = this.selected;

        }
    },
    computed: {
        iconsFiltered: function () {
            const search = (this.search == this.selected) ? this.beforeSelect : this.search
            return this.icons.filter(i =>
                i.title.indexOf(search) !== -1 || i.searchTerms.some(t => t.indexOf(search) !== -1)
            )
        }
    },
    watch: {
        value: {
            deep: true,
            handler: function (value) {
                this.$emit('wpcfto-get-value', value);
            }
        }
    }
});

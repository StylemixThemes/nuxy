Vue.component('wpcfto_checkbox', {
    props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value'],
    data: function () {
        return {
            value : '',
            alwaysOn: false,
            parentObserver: null,
        }
    },
    template: `
        <div class="wpcfto_generic_field wpcfto_generic_checkbox">
        
            <wpcfto_fields_aside_before :fields="fields" :field_label="field_label"></wpcfto_fields_aside_before>
            
            <div class="wpcfto-field-content">
                <div class="wpcfto-admin-checkbox" v-bind:class="field_id">

               <label>
                    <div class="wpcfto-admin-checkbox-wrapper" v-bind:class="{'active' : value, 'is_toggle' : (typeof fields.toggle == 'undefined' || fields.toggle) }">
                        <div class="wpcfto-checkbox-switcher"></div>
                        <input type="checkbox"
                               :name="field_name"
                               v-bind:id="field_id"
                               :disabled="alwaysOn"
                               v-model="value"/>
                    </div>
                </label>
            </div>
            </div>
            
            <wpcfto_fields_aside_after :fields="fields"></wpcfto_fields_aside_after>

        </div>
    `,
    mounted: function () {
        this.detectAlwaysOn();

        if (this.alwaysOn) {
            this.value = true;
            this.$emit('wpcfto-get-value', true);
        } else {
            this.value = this.field_value;
        }

        this.observeParentClass();
    },
    methods: {
        detectAlwaysOn() {
            const parent = this.$el.parentElement;
            this.alwaysOn = !!(parent && parent.classList.contains('wpcfto-always-on'));
        },
        observeParentClass() {
            const parent = this.$el.parentElement;
            if (!parent) return;

            this.parentObserver = new MutationObserver(() => {
                const wasAlwaysOn = this.alwaysOn;
                this.detectAlwaysOn();

                if (this.alwaysOn && this.value !== true) {
                    this.value = true;
                    this.$emit('wpcfto-get-value', true);
                }

                if (!this.alwaysOn && wasAlwaysOn) {
                    this.value = this.field_value;
                    this.$emit('wpcfto-get-value', this.value);
                }
            });

            this.parentObserver.observe(parent, {
                attributes: true,
                attributeFilter: ['class'],
            });
        }
    },
    beforeDestroy() {
        if (this.parentObserver) {
            this.parentObserver.disconnect();
        }
    },
    watch: {
        value(val) {
            if (this.alwaysOn && val !== true) {
                this.value = true;
            } else {
                this.$emit('wpcfto-get-value', val);
            }
        }
    }
});

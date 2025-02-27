Vue.component('wpcfto_multiselect_add_term', {
    props: ['fields', 'uniq_id'],
    data: function () {
        return {
            fields: {},
            uniq_id: '',
            show_input: false,
            new_term: '',
            new_tag_placeholder: '',
        }
    },
    beforeMount: function () {
        this.new_tag_placeholder = ( this.fields.new_tag_settings !== undefined ) ? this.fields.new_tag_settings.placeholder : '';
    },
    computed: {},
    template: `
      <div class="wpcfto-multiselect-add-term" v-if="fields.new_tag_settings">
          <div v-if="fields && fields.new_tag_settings.add_label && !show_input" class="wpcfto_m_s_a_t_btn_wrap">
            <button class="multiselect_add_term_btn" @click="showInput">
              <i class="fa fa-plus"></i>
              <div>{{ fields.new_tag_settings.add_label }}</div>
            </button>
          </div>
          <div v-if="show_input" class="m_s_a_t_hidden_input">
            <input v-model="new_term" type="text" :placeholder="new_tag_placeholder" />
            <button class="multiselect_add_btn" @click="addTerm">
              {{ fields.new_tag_settings.add_btn }}
            </button>
            <button class="multiselect_cancel_btn" @click="showInput">
              {{ fields.new_tag_settings.cancel_btn }}
            </button>
          </div>
      </div>
    `,
    methods: {
        showInput: function () {
            this.new_term = '';
            this.show_input = !this.show_input;
        },
        addTerm: function () {
            this.$emit('add-term', this.fields.new_tag_settings.taxonomy_name, this.new_term);
            this.new_term = '';
        }
    }
});
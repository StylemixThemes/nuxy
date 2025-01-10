(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Vue.component('wpcfto_multiselect_add_term', {
  props: ['fields', 'uniq_id'],
  data: function data() {
    return {
      fields: {},
      uniq_id: '',
      show_input: false,
      new_term: '',
      new_tag_placeholder: this.fields.new_tag_settings.placeholder
    };
  },
  computed: {},
  template: "\n      <div class=\"wpcfto-multiselect-add-term\" v-if=\"fields.new_tag_settings\">\n          <div v-if=\"fields && fields.new_tag_settings.add_label && !show_input\" class=\"wpcfto_m_s_a_t_btn_wrap\">\n            <button class=\"multiselect_add_term_btn\" @click=\"showInput\">\n              <i class=\"fa fa-plus\"></i>\n              <div>{{ fields.new_tag_settings.add_label }}</div>\n            </button>\n          </div>\n          <div v-if=\"show_input\" class=\"m_s_a_t_hidden_input\">\n            <input v-model=\"new_term\" type=\"text\" :placeholder=\"new_tag_placeholder\" />\n            <button class=\"multiselect_add_btn\" @click=\"addTerm\">\n              {{ fields.new_tag_settings.add_btn }}\n            </button>\n            <button class=\"multiselect_cancel_btn\" @click=\"showInput\">\n              {{ fields.new_tag_settings.cancel_btn }}\n            </button>\n          </div>\n      </div>\n    ",
  methods: {
    showInput: function showInput() {
      this.new_term = '';
      this.show_input = !this.show_input;
    },
    addTerm: function addTerm() {
      this.$emit('add-term', this.fields.new_tag_settings.taxonomy_name, this.new_term);
      this.new_term = '';
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJmaWVsZHMiLCJ1bmlxX2lkIiwic2hvd19pbnB1dCIsIm5ld190ZXJtIiwibmV3X3RhZ19wbGFjZWhvbGRlciIsIm5ld190YWdfc2V0dGluZ3MiLCJwbGFjZWhvbGRlciIsImNvbXB1dGVkIiwidGVtcGxhdGUiLCJtZXRob2RzIiwic2hvd0lucHV0IiwiYWRkVGVybSIsIiRlbWl0IiwidGF4b25vbXlfbmFtZSJdLCJzb3VyY2VzIjpbImZha2VfMjU5MjFkMTEuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cblZ1ZS5jb21wb25lbnQoJ3dwY2Z0b19tdWx0aXNlbGVjdF9hZGRfdGVybScsIHtcbiAgcHJvcHM6IFsnZmllbGRzJywgJ3VuaXFfaWQnXSxcbiAgZGF0YTogZnVuY3Rpb24gZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZmllbGRzOiB7fSxcbiAgICAgIHVuaXFfaWQ6ICcnLFxuICAgICAgc2hvd19pbnB1dDogZmFsc2UsXG4gICAgICBuZXdfdGVybTogJycsXG4gICAgICBuZXdfdGFnX3BsYWNlaG9sZGVyOiB0aGlzLmZpZWxkcy5uZXdfdGFnX3NldHRpbmdzLnBsYWNlaG9sZGVyXG4gICAgfTtcbiAgfSxcbiAgY29tcHV0ZWQ6IHt9LFxuICB0ZW1wbGF0ZTogXCJcXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG8tbXVsdGlzZWxlY3QtYWRkLXRlcm1cXFwiIHYtaWY9XFxcImZpZWxkcy5uZXdfdGFnX3NldHRpbmdzXFxcIj5cXG4gICAgICAgICAgPGRpdiB2LWlmPVxcXCJmaWVsZHMgJiYgZmllbGRzLm5ld190YWdfc2V0dGluZ3MuYWRkX2xhYmVsICYmICFzaG93X2lucHV0XFxcIiBjbGFzcz1cXFwid3BjZnRvX21fc19hX3RfYnRuX3dyYXBcXFwiPlxcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XFxcIm11bHRpc2VsZWN0X2FkZF90ZXJtX2J0blxcXCIgQGNsaWNrPVxcXCJzaG93SW5wdXRcXFwiPlxcbiAgICAgICAgICAgICAgPGkgY2xhc3M9XFxcImZhIGZhLXBsdXNcXFwiPjwvaT5cXG4gICAgICAgICAgICAgIDxkaXY+e3sgZmllbGRzLm5ld190YWdfc2V0dGluZ3MuYWRkX2xhYmVsIH19PC9kaXY+XFxuICAgICAgICAgICAgPC9idXR0b24+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8ZGl2IHYtaWY9XFxcInNob3dfaW5wdXRcXFwiIGNsYXNzPVxcXCJtX3NfYV90X2hpZGRlbl9pbnB1dFxcXCI+XFxuICAgICAgICAgICAgPGlucHV0IHYtbW9kZWw9XFxcIm5ld190ZXJtXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiA6cGxhY2Vob2xkZXI9XFxcIm5ld190YWdfcGxhY2Vob2xkZXJcXFwiIC8+XFxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cXFwibXVsdGlzZWxlY3RfYWRkX2J0blxcXCIgQGNsaWNrPVxcXCJhZGRUZXJtXFxcIj5cXG4gICAgICAgICAgICAgIHt7IGZpZWxkcy5uZXdfdGFnX3NldHRpbmdzLmFkZF9idG4gfX1cXG4gICAgICAgICAgICA8L2J1dHRvbj5cXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVxcXCJtdWx0aXNlbGVjdF9jYW5jZWxfYnRuXFxcIiBAY2xpY2s9XFxcInNob3dJbnB1dFxcXCI+XFxuICAgICAgICAgICAgICB7eyBmaWVsZHMubmV3X3RhZ19zZXR0aW5ncy5jYW5jZWxfYnRuIH19XFxuICAgICAgICAgICAgPC9idXR0b24+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcbiAgICBcIixcbiAgbWV0aG9kczoge1xuICAgIHNob3dJbnB1dDogZnVuY3Rpb24gc2hvd0lucHV0KCkge1xuICAgICAgdGhpcy5uZXdfdGVybSA9ICcnO1xuICAgICAgdGhpcy5zaG93X2lucHV0ID0gIXRoaXMuc2hvd19pbnB1dDtcbiAgICB9LFxuICAgIGFkZFRlcm06IGZ1bmN0aW9uIGFkZFRlcm0oKSB7XG4gICAgICB0aGlzLiRlbWl0KCdhZGQtdGVybScsIHRoaXMuZmllbGRzLm5ld190YWdfc2V0dGluZ3MudGF4b25vbXlfbmFtZSwgdGhpcy5uZXdfdGVybSk7XG4gICAgICB0aGlzLm5ld190ZXJtID0gJyc7XG4gICAgfVxuICB9XG59KTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBQSxHQUFHLENBQUNDLFNBQUosQ0FBYyw2QkFBZCxFQUE2QztFQUMzQ0MsS0FBSyxFQUFFLENBQUMsUUFBRCxFQUFXLFNBQVgsQ0FEb0M7RUFFM0NDLElBQUksRUFBRSxTQUFTQSxJQUFULEdBQWdCO0lBQ3BCLE9BQU87TUFDTEMsTUFBTSxFQUFFLEVBREg7TUFFTEMsT0FBTyxFQUFFLEVBRko7TUFHTEMsVUFBVSxFQUFFLEtBSFA7TUFJTEMsUUFBUSxFQUFFLEVBSkw7TUFLTEMsbUJBQW1CLEVBQUUsS0FBS0osTUFBTCxDQUFZSyxnQkFBWixDQUE2QkM7SUFMN0MsQ0FBUDtFQU9ELENBVjBDO0VBVzNDQyxRQUFRLEVBQUUsRUFYaUM7RUFZM0NDLFFBQVEsRUFBRSx5NkJBWmlDO0VBYTNDQyxPQUFPLEVBQUU7SUFDUEMsU0FBUyxFQUFFLFNBQVNBLFNBQVQsR0FBcUI7TUFDOUIsS0FBS1AsUUFBTCxHQUFnQixFQUFoQjtNQUNBLEtBQUtELFVBQUwsR0FBa0IsQ0FBQyxLQUFLQSxVQUF4QjtJQUNELENBSk07SUFLUFMsT0FBTyxFQUFFLFNBQVNBLE9BQVQsR0FBbUI7TUFDMUIsS0FBS0MsS0FBTCxDQUFXLFVBQVgsRUFBdUIsS0FBS1osTUFBTCxDQUFZSyxnQkFBWixDQUE2QlEsYUFBcEQsRUFBbUUsS0FBS1YsUUFBeEU7TUFDQSxLQUFLQSxRQUFMLEdBQWdCLEVBQWhCO0lBQ0Q7RUFSTTtBQWJrQyxDQUE3QyJ9
},{}]},{},[1])
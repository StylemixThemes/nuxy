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
      new_tag_placeholder: ''
    };
  },
  beforeMount: function beforeMount() {
    this.new_tag_placeholder = this.fields.new_tag_settings !== undefined ? this.fields.new_tag_settings.placeholder : '';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJmaWVsZHMiLCJ1bmlxX2lkIiwic2hvd19pbnB1dCIsIm5ld190ZXJtIiwibmV3X3RhZ19wbGFjZWhvbGRlciIsImJlZm9yZU1vdW50IiwibmV3X3RhZ19zZXR0aW5ncyIsInVuZGVmaW5lZCIsInBsYWNlaG9sZGVyIiwiY29tcHV0ZWQiLCJ0ZW1wbGF0ZSIsIm1ldGhvZHMiLCJzaG93SW5wdXQiLCJhZGRUZXJtIiwiJGVtaXQiLCJ0YXhvbm9teV9uYW1lIl0sInNvdXJjZXMiOlsiZmFrZV9jNzQwMTY3OC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuVnVlLmNvbXBvbmVudCgnd3BjZnRvX211bHRpc2VsZWN0X2FkZF90ZXJtJywge1xuICBwcm9wczogWydmaWVsZHMnLCAndW5pcV9pZCddLFxuICBkYXRhOiBmdW5jdGlvbiBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBmaWVsZHM6IHt9LFxuICAgICAgdW5pcV9pZDogJycsXG4gICAgICBzaG93X2lucHV0OiBmYWxzZSxcbiAgICAgIG5ld190ZXJtOiAnJyxcbiAgICAgIG5ld190YWdfcGxhY2Vob2xkZXI6ICcnXG4gICAgfTtcbiAgfSxcbiAgYmVmb3JlTW91bnQ6IGZ1bmN0aW9uIGJlZm9yZU1vdW50KCkge1xuICAgIHRoaXMubmV3X3RhZ19wbGFjZWhvbGRlciA9IHRoaXMuZmllbGRzLm5ld190YWdfc2V0dGluZ3MgIT09IHVuZGVmaW5lZCA/IHRoaXMuZmllbGRzLm5ld190YWdfc2V0dGluZ3MucGxhY2Vob2xkZXIgOiAnJztcbiAgfSxcbiAgY29tcHV0ZWQ6IHt9LFxuICB0ZW1wbGF0ZTogXCJcXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG8tbXVsdGlzZWxlY3QtYWRkLXRlcm1cXFwiIHYtaWY9XFxcImZpZWxkcy5uZXdfdGFnX3NldHRpbmdzXFxcIj5cXG4gICAgICAgICAgPGRpdiB2LWlmPVxcXCJmaWVsZHMgJiYgZmllbGRzLm5ld190YWdfc2V0dGluZ3MuYWRkX2xhYmVsICYmICFzaG93X2lucHV0XFxcIiBjbGFzcz1cXFwid3BjZnRvX21fc19hX3RfYnRuX3dyYXBcXFwiPlxcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XFxcIm11bHRpc2VsZWN0X2FkZF90ZXJtX2J0blxcXCIgQGNsaWNrPVxcXCJzaG93SW5wdXRcXFwiPlxcbiAgICAgICAgICAgICAgPGkgY2xhc3M9XFxcImZhIGZhLXBsdXNcXFwiPjwvaT5cXG4gICAgICAgICAgICAgIDxkaXY+e3sgZmllbGRzLm5ld190YWdfc2V0dGluZ3MuYWRkX2xhYmVsIH19PC9kaXY+XFxuICAgICAgICAgICAgPC9idXR0b24+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8ZGl2IHYtaWY9XFxcInNob3dfaW5wdXRcXFwiIGNsYXNzPVxcXCJtX3NfYV90X2hpZGRlbl9pbnB1dFxcXCI+XFxuICAgICAgICAgICAgPGlucHV0IHYtbW9kZWw9XFxcIm5ld190ZXJtXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiA6cGxhY2Vob2xkZXI9XFxcIm5ld190YWdfcGxhY2Vob2xkZXJcXFwiIC8+XFxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cXFwibXVsdGlzZWxlY3RfYWRkX2J0blxcXCIgQGNsaWNrPVxcXCJhZGRUZXJtXFxcIj5cXG4gICAgICAgICAgICAgIHt7IGZpZWxkcy5uZXdfdGFnX3NldHRpbmdzLmFkZF9idG4gfX1cXG4gICAgICAgICAgICA8L2J1dHRvbj5cXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVxcXCJtdWx0aXNlbGVjdF9jYW5jZWxfYnRuXFxcIiBAY2xpY2s9XFxcInNob3dJbnB1dFxcXCI+XFxuICAgICAgICAgICAgICB7eyBmaWVsZHMubmV3X3RhZ19zZXR0aW5ncy5jYW5jZWxfYnRuIH19XFxuICAgICAgICAgICAgPC9idXR0b24+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcbiAgICBcIixcbiAgbWV0aG9kczoge1xuICAgIHNob3dJbnB1dDogZnVuY3Rpb24gc2hvd0lucHV0KCkge1xuICAgICAgdGhpcy5uZXdfdGVybSA9ICcnO1xuICAgICAgdGhpcy5zaG93X2lucHV0ID0gIXRoaXMuc2hvd19pbnB1dDtcbiAgICB9LFxuICAgIGFkZFRlcm06IGZ1bmN0aW9uIGFkZFRlcm0oKSB7XG4gICAgICB0aGlzLiRlbWl0KCdhZGQtdGVybScsIHRoaXMuZmllbGRzLm5ld190YWdfc2V0dGluZ3MudGF4b25vbXlfbmFtZSwgdGhpcy5uZXdfdGVybSk7XG4gICAgICB0aGlzLm5ld190ZXJtID0gJyc7XG4gICAgfVxuICB9XG59KTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBQSxHQUFHLENBQUNDLFNBQUosQ0FBYyw2QkFBZCxFQUE2QztFQUMzQ0MsS0FBSyxFQUFFLENBQUMsUUFBRCxFQUFXLFNBQVgsQ0FEb0M7RUFFM0NDLElBQUksRUFBRSxTQUFTQSxJQUFULEdBQWdCO0lBQ3BCLE9BQU87TUFDTEMsTUFBTSxFQUFFLEVBREg7TUFFTEMsT0FBTyxFQUFFLEVBRko7TUFHTEMsVUFBVSxFQUFFLEtBSFA7TUFJTEMsUUFBUSxFQUFFLEVBSkw7TUFLTEMsbUJBQW1CLEVBQUU7SUFMaEIsQ0FBUDtFQU9ELENBVjBDO0VBVzNDQyxXQUFXLEVBQUUsU0FBU0EsV0FBVCxHQUF1QjtJQUNsQyxLQUFLRCxtQkFBTCxHQUEyQixLQUFLSixNQUFMLENBQVlNLGdCQUFaLEtBQWlDQyxTQUFqQyxHQUE2QyxLQUFLUCxNQUFMLENBQVlNLGdCQUFaLENBQTZCRSxXQUExRSxHQUF3RixFQUFuSDtFQUNELENBYjBDO0VBYzNDQyxRQUFRLEVBQUUsRUFkaUM7RUFlM0NDLFFBQVEsRUFBRSx5NkJBZmlDO0VBZ0IzQ0MsT0FBTyxFQUFFO0lBQ1BDLFNBQVMsRUFBRSxTQUFTQSxTQUFULEdBQXFCO01BQzlCLEtBQUtULFFBQUwsR0FBZ0IsRUFBaEI7TUFDQSxLQUFLRCxVQUFMLEdBQWtCLENBQUMsS0FBS0EsVUFBeEI7SUFDRCxDQUpNO0lBS1BXLE9BQU8sRUFBRSxTQUFTQSxPQUFULEdBQW1CO01BQzFCLEtBQUtDLEtBQUwsQ0FBVyxVQUFYLEVBQXVCLEtBQUtkLE1BQUwsQ0FBWU0sZ0JBQVosQ0FBNkJTLGFBQXBELEVBQW1FLEtBQUtaLFFBQXhFO01BQ0EsS0FBS0EsUUFBTCxHQUFnQixFQUFoQjtJQUNEO0VBUk07QUFoQmtDLENBQTdDIn0=
},{}]},{},[1])
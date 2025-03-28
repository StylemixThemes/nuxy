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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJmaWVsZHMiLCJ1bmlxX2lkIiwic2hvd19pbnB1dCIsIm5ld190ZXJtIiwibmV3X3RhZ19wbGFjZWhvbGRlciIsImJlZm9yZU1vdW50IiwibmV3X3RhZ19zZXR0aW5ncyIsInVuZGVmaW5lZCIsInBsYWNlaG9sZGVyIiwiY29tcHV0ZWQiLCJ0ZW1wbGF0ZSIsIm1ldGhvZHMiLCJzaG93SW5wdXQiLCJhZGRUZXJtIiwiJGVtaXQiLCJ0YXhvbm9teV9uYW1lIl0sInNvdXJjZXMiOlsiZmFrZV8zZGFiNTU3LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5WdWUuY29tcG9uZW50KCd3cGNmdG9fbXVsdGlzZWxlY3RfYWRkX3Rlcm0nLCB7XG4gIHByb3BzOiBbJ2ZpZWxkcycsICd1bmlxX2lkJ10sXG4gIGRhdGE6IGZ1bmN0aW9uIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGZpZWxkczoge30sXG4gICAgICB1bmlxX2lkOiAnJyxcbiAgICAgIHNob3dfaW5wdXQ6IGZhbHNlLFxuICAgICAgbmV3X3Rlcm06ICcnLFxuICAgICAgbmV3X3RhZ19wbGFjZWhvbGRlcjogJydcbiAgICB9O1xuICB9LFxuICBiZWZvcmVNb3VudDogZnVuY3Rpb24gYmVmb3JlTW91bnQoKSB7XG4gICAgdGhpcy5uZXdfdGFnX3BsYWNlaG9sZGVyID0gdGhpcy5maWVsZHMubmV3X3RhZ19zZXR0aW5ncyAhPT0gdW5kZWZpbmVkID8gdGhpcy5maWVsZHMubmV3X3RhZ19zZXR0aW5ncy5wbGFjZWhvbGRlciA6ICcnO1xuICB9LFxuICBjb21wdXRlZDoge30sXG4gIHRlbXBsYXRlOiBcIlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0by1tdWx0aXNlbGVjdC1hZGQtdGVybVxcXCIgdi1pZj1cXFwiZmllbGRzLm5ld190YWdfc2V0dGluZ3NcXFwiPlxcbiAgICAgICAgICA8ZGl2IHYtaWY9XFxcImZpZWxkcyAmJiBmaWVsZHMubmV3X3RhZ19zZXR0aW5ncy5hZGRfbGFiZWwgJiYgIXNob3dfaW5wdXRcXFwiIGNsYXNzPVxcXCJ3cGNmdG9fbV9zX2FfdF9idG5fd3JhcFxcXCI+XFxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cXFwibXVsdGlzZWxlY3RfYWRkX3Rlcm1fYnRuXFxcIiBAY2xpY2s9XFxcInNob3dJbnB1dFxcXCI+XFxuICAgICAgICAgICAgICA8aSBjbGFzcz1cXFwiZmEgZmEtcGx1c1xcXCI+PC9pPlxcbiAgICAgICAgICAgICAgPGRpdj57eyBmaWVsZHMubmV3X3RhZ19zZXR0aW5ncy5hZGRfbGFiZWwgfX08L2Rpdj5cXG4gICAgICAgICAgICA8L2J1dHRvbj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDxkaXYgdi1pZj1cXFwic2hvd19pbnB1dFxcXCIgY2xhc3M9XFxcIm1fc19hX3RfaGlkZGVuX2lucHV0XFxcIj5cXG4gICAgICAgICAgICA8aW5wdXQgdi1tb2RlbD1cXFwibmV3X3Rlcm1cXFwiIHR5cGU9XFxcInRleHRcXFwiIDpwbGFjZWhvbGRlcj1cXFwibmV3X3RhZ19wbGFjZWhvbGRlclxcXCIgLz5cXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVxcXCJtdWx0aXNlbGVjdF9hZGRfYnRuXFxcIiBAY2xpY2s9XFxcImFkZFRlcm1cXFwiPlxcbiAgICAgICAgICAgICAge3sgZmllbGRzLm5ld190YWdfc2V0dGluZ3MuYWRkX2J0biB9fVxcbiAgICAgICAgICAgIDwvYnV0dG9uPlxcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XFxcIm11bHRpc2VsZWN0X2NhbmNlbF9idG5cXFwiIEBjbGljaz1cXFwic2hvd0lucHV0XFxcIj5cXG4gICAgICAgICAgICAgIHt7IGZpZWxkcy5uZXdfdGFnX3NldHRpbmdzLmNhbmNlbF9idG4gfX1cXG4gICAgICAgICAgICA8L2J1dHRvbj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuICAgIFwiLFxuICBtZXRob2RzOiB7XG4gICAgc2hvd0lucHV0OiBmdW5jdGlvbiBzaG93SW5wdXQoKSB7XG4gICAgICB0aGlzLm5ld190ZXJtID0gJyc7XG4gICAgICB0aGlzLnNob3dfaW5wdXQgPSAhdGhpcy5zaG93X2lucHV0O1xuICAgIH0sXG4gICAgYWRkVGVybTogZnVuY3Rpb24gYWRkVGVybSgpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ2FkZC10ZXJtJywgdGhpcy5maWVsZHMubmV3X3RhZ19zZXR0aW5ncy50YXhvbm9teV9uYW1lLCB0aGlzLm5ld190ZXJtKTtcbiAgICAgIHRoaXMubmV3X3Rlcm0gPSAnJztcbiAgICB9XG4gIH1cbn0pOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUFBLEdBQUcsQ0FBQ0MsU0FBSixDQUFjLDZCQUFkLEVBQTZDO0VBQzNDQyxLQUFLLEVBQUUsQ0FBQyxRQUFELEVBQVcsU0FBWCxDQURvQztFQUUzQ0MsSUFBSSxFQUFFLFNBQVNBLElBQVQsR0FBZ0I7SUFDcEIsT0FBTztNQUNMQyxNQUFNLEVBQUUsRUFESDtNQUVMQyxPQUFPLEVBQUUsRUFGSjtNQUdMQyxVQUFVLEVBQUUsS0FIUDtNQUlMQyxRQUFRLEVBQUUsRUFKTDtNQUtMQyxtQkFBbUIsRUFBRTtJQUxoQixDQUFQO0VBT0QsQ0FWMEM7RUFXM0NDLFdBQVcsRUFBRSxTQUFTQSxXQUFULEdBQXVCO0lBQ2xDLEtBQUtELG1CQUFMLEdBQTJCLEtBQUtKLE1BQUwsQ0FBWU0sZ0JBQVosS0FBaUNDLFNBQWpDLEdBQTZDLEtBQUtQLE1BQUwsQ0FBWU0sZ0JBQVosQ0FBNkJFLFdBQTFFLEdBQXdGLEVBQW5IO0VBQ0QsQ0FiMEM7RUFjM0NDLFFBQVEsRUFBRSxFQWRpQztFQWUzQ0MsUUFBUSxFQUFFLHk2QkFmaUM7RUFnQjNDQyxPQUFPLEVBQUU7SUFDUEMsU0FBUyxFQUFFLFNBQVNBLFNBQVQsR0FBcUI7TUFDOUIsS0FBS1QsUUFBTCxHQUFnQixFQUFoQjtNQUNBLEtBQUtELFVBQUwsR0FBa0IsQ0FBQyxLQUFLQSxVQUF4QjtJQUNELENBSk07SUFLUFcsT0FBTyxFQUFFLFNBQVNBLE9BQVQsR0FBbUI7TUFDMUIsS0FBS0MsS0FBTCxDQUFXLFVBQVgsRUFBdUIsS0FBS2QsTUFBTCxDQUFZTSxnQkFBWixDQUE2QlMsYUFBcEQsRUFBbUUsS0FBS1osUUFBeEU7TUFDQSxLQUFLQSxRQUFMLEdBQWdCLEVBQWhCO0lBQ0Q7RUFSTTtBQWhCa0MsQ0FBN0MifQ==
},{}]},{},[1])
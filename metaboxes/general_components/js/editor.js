(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Vue.component('vue-editor', Vue2Editor["default"].VueEditor);
Vue.component('wpcfto_editor', {
  props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value'],
  data: function data() {
    return {
      value: ''
    };
  },
  template: "\n        <div class=\"wpcfto_generic_field wpcfto_generic_field_editor\">\n        \n            <wpcfto_fields_aside_before :fields=\"fields\" :field_label=\"field_label\"></wpcfto_fields_aside_before>\n            \n            <div class=\"wpcfto-field-content\">\n                <div class=\"wpcfto-editor\">\n                    <vue-editor :id=\"'editor' + field_name\" v-model=\"value\"></vue-editor>\n    \n                    <textarea v-bind:name=\"field_name\"\n                          v-bind:placeholder=\"field_label\"\n                          v-bind:id=\"field_id\"\n                          v-model=\"value\">\n                    </textarea>\n                </div>\n            </div>\n            \n            <wpcfto_fields_aside_after :fields=\"fields\"></wpcfto_fields_aside_after>\n            \n        </div>\n    ",
  mounted: function mounted() {
    if (typeof this.field_value !== 'undefined') {
      this.$set(this, 'value', this.field_value);
    }
  },
  methods: {},
  watch: {
    value: function value(_value) {
      this.$emit('wpcfto-get-value', _value);
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWdWUiLCJjb21wb25lbnQiLCJWdWUyRWRpdG9yIiwiVnVlRWRpdG9yIiwicHJvcHMiLCJkYXRhIiwidmFsdWUiLCJ0ZW1wbGF0ZSIsIm1vdW50ZWQiLCJmaWVsZF92YWx1ZSIsIiRzZXQiLCJtZXRob2RzIiwid2F0Y2giLCJfdmFsdWUiLCIkZW1pdCJdLCJzb3VyY2VzIjpbImZha2VfMmVmZGI2MjkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cblZ1ZS5jb21wb25lbnQoJ3Z1ZS1lZGl0b3InLCBWdWUyRWRpdG9yW1wiZGVmYXVsdFwiXS5WdWVFZGl0b3IpO1xuVnVlLmNvbXBvbmVudCgnd3BjZnRvX2VkaXRvcicsIHtcbiAgcHJvcHM6IFsnZmllbGRzJywgJ2ZpZWxkX2xhYmVsJywgJ2ZpZWxkX25hbWUnLCAnZmllbGRfaWQnLCAnZmllbGRfdmFsdWUnXSxcbiAgZGF0YTogZnVuY3Rpb24gZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6ICcnXG4gICAgfTtcbiAgfSxcbiAgdGVtcGxhdGU6IFwiXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9fZ2VuZXJpY19maWVsZCB3cGNmdG9fZ2VuZXJpY19maWVsZF9lZGl0b3JcXFwiPlxcbiAgICAgICAgXFxuICAgICAgICAgICAgPHdwY2Z0b19maWVsZHNfYXNpZGVfYmVmb3JlIDpmaWVsZHM9XFxcImZpZWxkc1xcXCIgOmZpZWxkX2xhYmVsPVxcXCJmaWVsZF9sYWJlbFxcXCI+PC93cGNmdG9fZmllbGRzX2FzaWRlX2JlZm9yZT5cXG4gICAgICAgICAgICBcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG8tZmllbGQtY29udGVudFxcXCI+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0by1lZGl0b3JcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPHZ1ZS1lZGl0b3IgOmlkPVxcXCInZWRpdG9yJyArIGZpZWxkX25hbWVcXFwiIHYtbW9kZWw9XFxcInZhbHVlXFxcIj48L3Z1ZS1lZGl0b3I+XFxuICAgIFxcbiAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIHYtYmluZDpuYW1lPVxcXCJmaWVsZF9uYW1lXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdi1iaW5kOnBsYWNlaG9sZGVyPVxcXCJmaWVsZF9sYWJlbFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHYtYmluZDppZD1cXFwiZmllbGRfaWRcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVxcXCJ2YWx1ZVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8L3RleHRhcmVhPlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICBcXG4gICAgICAgICAgICA8d3BjZnRvX2ZpZWxkc19hc2lkZV9hZnRlciA6ZmllbGRzPVxcXCJmaWVsZHNcXFwiPjwvd3BjZnRvX2ZpZWxkc19hc2lkZV9hZnRlcj5cXG4gICAgICAgICAgICBcXG4gICAgICAgIDwvZGl2PlxcbiAgICBcIixcbiAgbW91bnRlZDogZnVuY3Rpb24gbW91bnRlZCgpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuZmllbGRfdmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLiRzZXQodGhpcywgJ3ZhbHVlJywgdGhpcy5maWVsZF92YWx1ZSk7XG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7fSxcbiAgd2F0Y2g6IHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoX3ZhbHVlKSB7XG4gICAgICB0aGlzLiRlbWl0KCd3cGNmdG8tZ2V0LXZhbHVlJywgX3ZhbHVlKTtcbiAgICB9XG4gIH1cbn0pOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUFBLEdBQUcsQ0FBQ0MsU0FBSixDQUFjLFlBQWQsRUFBNEJDLFVBQVUsQ0FBQyxTQUFELENBQVYsQ0FBc0JDLFNBQWxEO0FBQ0FILEdBQUcsQ0FBQ0MsU0FBSixDQUFjLGVBQWQsRUFBK0I7RUFDN0JHLEtBQUssRUFBRSxDQUFDLFFBQUQsRUFBVyxhQUFYLEVBQTBCLFlBQTFCLEVBQXdDLFVBQXhDLEVBQW9ELGFBQXBELENBRHNCO0VBRTdCQyxJQUFJLEVBQUUsU0FBU0EsSUFBVCxHQUFnQjtJQUNwQixPQUFPO01BQ0xDLEtBQUssRUFBRTtJQURGLENBQVA7RUFHRCxDQU40QjtFQU83QkMsUUFBUSxFQUFFLGcxQkFQbUI7RUFRN0JDLE9BQU8sRUFBRSxTQUFTQSxPQUFULEdBQW1CO0lBQzFCLElBQUksT0FBTyxLQUFLQyxXQUFaLEtBQTRCLFdBQWhDLEVBQTZDO01BQzNDLEtBQUtDLElBQUwsQ0FBVSxJQUFWLEVBQWdCLE9BQWhCLEVBQXlCLEtBQUtELFdBQTlCO0lBQ0Q7RUFDRixDQVo0QjtFQWE3QkUsT0FBTyxFQUFFLEVBYm9CO0VBYzdCQyxLQUFLLEVBQUU7SUFDTE4sS0FBSyxFQUFFLFNBQVNBLEtBQVQsQ0FBZU8sTUFBZixFQUF1QjtNQUM1QixLQUFLQyxLQUFMLENBQVcsa0JBQVgsRUFBK0JELE1BQS9CO0lBQ0Q7RUFISTtBQWRzQixDQUEvQiJ9
},{}]},{},[1])
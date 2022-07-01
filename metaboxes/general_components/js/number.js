(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Vue.component('wpcfto_number', {
  props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value', 'field_data'],
  data: function data() {
    return {
      value: '',
      step: 1
    };
  },
  template: "\n        <div class=\"wpcfto_generic_field wpcfto_generic_field_flex_input wpcfto_generic_field__number\">\n            <wpcfto_fields_aside_before :fields=\"fields\" :field_label=\"field_label\"></wpcfto_fields_aside_before>\n\n            <div class=\"wpcfto-field-content\">\n                <input type=\"number\"\n                    v-bind:name=\"field_name\"\n                    v-bind:placeholder=\"fields.placeholder ? fields.placeholder : 'Enter numbers...'\"\n                    v-bind:id=\"field_id\"\n                    :step=\"step\"\n                    v-model=\"value\"\n                />\n            </div>\n\n            <wpcfto_fields_aside_after :fields=\"fields\"></wpcfto_fields_aside_after>\n        </div>\n    ",
  mounted: function mounted() {
    this.value = this.field_value;
    if (typeof this.field_data.step !== 'undefined') this.step = this.field_data.step;
  },
  methods: {},
  watch: {
    value: function value(_value) {
      this.$emit('wpcfto-get-value', _value);
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJ2YWx1ZSIsInN0ZXAiLCJ0ZW1wbGF0ZSIsIm1vdW50ZWQiLCJmaWVsZF92YWx1ZSIsImZpZWxkX2RhdGEiLCJtZXRob2RzIiwid2F0Y2giLCJfdmFsdWUiLCIkZW1pdCJdLCJzb3VyY2VzIjpbImZha2VfODYzYzY3NC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuVnVlLmNvbXBvbmVudCgnd3BjZnRvX251bWJlcicsIHtcbiAgcHJvcHM6IFsnZmllbGRzJywgJ2ZpZWxkX2xhYmVsJywgJ2ZpZWxkX25hbWUnLCAnZmllbGRfaWQnLCAnZmllbGRfdmFsdWUnLCAnZmllbGRfZGF0YSddLFxuICBkYXRhOiBmdW5jdGlvbiBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogJycsXG4gICAgICBzdGVwOiAxXG4gICAgfTtcbiAgfSxcbiAgdGVtcGxhdGU6IFwiXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9fZ2VuZXJpY19maWVsZCB3cGNmdG9fZ2VuZXJpY19maWVsZF9mbGV4X2lucHV0IHdwY2Z0b19nZW5lcmljX2ZpZWxkX19udW1iZXJcXFwiPlxcbiAgICAgICAgICAgIDx3cGNmdG9fZmllbGRzX2FzaWRlX2JlZm9yZSA6ZmllbGRzPVxcXCJmaWVsZHNcXFwiIDpmaWVsZF9sYWJlbD1cXFwiZmllbGRfbGFiZWxcXFwiPjwvd3BjZnRvX2ZpZWxkc19hc2lkZV9iZWZvcmU+XFxuXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvLWZpZWxkLWNvbnRlbnRcXFwiPlxcbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwibnVtYmVyXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgdi1iaW5kOm5hbWU9XFxcImZpZWxkX25hbWVcXFwiXFxuICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6cGxhY2Vob2xkZXI9XFxcImZpZWxkcy5wbGFjZWhvbGRlciA/IGZpZWxkcy5wbGFjZWhvbGRlciA6ICdFbnRlciBudW1iZXJzLi4uJ1xcXCJcXG4gICAgICAgICAgICAgICAgICAgIHYtYmluZDppZD1cXFwiZmllbGRfaWRcXFwiXFxuICAgICAgICAgICAgICAgICAgICA6c3RlcD1cXFwic3RlcFxcXCJcXG4gICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XFxcInZhbHVlXFxcIlxcbiAgICAgICAgICAgICAgICAvPlxcbiAgICAgICAgICAgIDwvZGl2PlxcblxcbiAgICAgICAgICAgIDx3cGNmdG9fZmllbGRzX2FzaWRlX2FmdGVyIDpmaWVsZHM9XFxcImZpZWxkc1xcXCI+PC93cGNmdG9fZmllbGRzX2FzaWRlX2FmdGVyPlxcbiAgICAgICAgPC9kaXY+XFxuICAgIFwiLFxuICBtb3VudGVkOiBmdW5jdGlvbiBtb3VudGVkKCkge1xuICAgIHRoaXMudmFsdWUgPSB0aGlzLmZpZWxkX3ZhbHVlO1xuICAgIGlmICh0eXBlb2YgdGhpcy5maWVsZF9kYXRhLnN0ZXAgIT09ICd1bmRlZmluZWQnKSB0aGlzLnN0ZXAgPSB0aGlzLmZpZWxkX2RhdGEuc3RlcDtcbiAgfSxcbiAgbWV0aG9kczoge30sXG4gIHdhdGNoOiB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKF92YWx1ZSkge1xuICAgICAgdGhpcy4kZW1pdCgnd3BjZnRvLWdldC12YWx1ZScsIF92YWx1ZSk7XG4gICAgfVxuICB9XG59KTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBQSxHQUFHLENBQUNDLFNBQUosQ0FBYyxlQUFkLEVBQStCO0VBQzdCQyxLQUFLLEVBQUUsQ0FBQyxRQUFELEVBQVcsYUFBWCxFQUEwQixZQUExQixFQUF3QyxVQUF4QyxFQUFvRCxhQUFwRCxFQUFtRSxZQUFuRSxDQURzQjtFQUU3QkMsSUFBSSxFQUFFLFNBQVNBLElBQVQsR0FBZ0I7SUFDcEIsT0FBTztNQUNMQyxLQUFLLEVBQUUsRUFERjtNQUVMQyxJQUFJLEVBQUU7SUFGRCxDQUFQO0VBSUQsQ0FQNEI7RUFRN0JDLFFBQVEsRUFBRSx3dUJBUm1CO0VBUzdCQyxPQUFPLEVBQUUsU0FBU0EsT0FBVCxHQUFtQjtJQUMxQixLQUFLSCxLQUFMLEdBQWEsS0FBS0ksV0FBbEI7SUFDQSxJQUFJLE9BQU8sS0FBS0MsVUFBTCxDQUFnQkosSUFBdkIsS0FBZ0MsV0FBcEMsRUFBaUQsS0FBS0EsSUFBTCxHQUFZLEtBQUtJLFVBQUwsQ0FBZ0JKLElBQTVCO0VBQ2xELENBWjRCO0VBYTdCSyxPQUFPLEVBQUUsRUFib0I7RUFjN0JDLEtBQUssRUFBRTtJQUNMUCxLQUFLLEVBQUUsU0FBU0EsS0FBVCxDQUFlUSxNQUFmLEVBQXVCO01BQzVCLEtBQUtDLEtBQUwsQ0FBVyxrQkFBWCxFQUErQkQsTUFBL0I7SUFDRDtFQUhJO0FBZHNCLENBQS9CIn0=
},{}]},{},[1])
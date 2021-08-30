(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Vue.component('wpcfto_image_select', {
  props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value'],
  data: function data() {
    return {
      value: '',
      style: ''
    };
  },
  template: "\n        <div class=\"wpcfto_generic_field wpcfto_generic_field_image_select\" v-bind:class=\"field_id\">\n\n            <wpcfto_fields_aside_before :fields=\"fields\" :field_label=\"field_label\"></wpcfto_fields_aside_before>\n\n            <div class=\"wpcfto-field-content\">\n                <div class=\"wpcfto_image_select\">\n                    <label v-for=\"(option, key) in fields['options']\" v-bind:class=\"{'active' : value == key}\">\n                        <span class=\"wpcfto-img-wrap\"><img v-bind:src=\"option.img\" v-bind:alt=\"option.alt\" v-bind:style=\"style\"></span>\n                        <input type=\"radio\" v-bind:name=\"field_name\" v-model=\"value\" v-bind:value=\"key\"/>\n                        <span v-html=\"option.alt\" class=\"wpcfto-img-alt\"></span>\n                    </label>\n                </div>\n            </div>\n\n            <wpcfto_fields_aside_after :fields=\"fields\"></wpcfto_fields_aside_after>\n            \n        </div>\n    ",
  mounted: function mounted() {
    this.value = this.field_value;

    if (this.fields['width']) {
      this.style += 'width: ' + this.fields['width'] + 'px;';
    }

    if (this.fields['height']) {
      this.style += 'height: ' + this.fields['height'] + 'px;';
    }
  },
  methods: {},
  watch: {
    value: function value(_value) {
      this.$emit('wpcfto-get-value', _value);
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfNGYzYWIxMS5qcyJdLCJuYW1lcyI6WyJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJ2YWx1ZSIsInN0eWxlIiwidGVtcGxhdGUiLCJtb3VudGVkIiwiZmllbGRfdmFsdWUiLCJmaWVsZHMiLCJtZXRob2RzIiwid2F0Y2giLCJfdmFsdWUiLCIkZW1pdCJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUFBLEdBQUcsQ0FBQ0MsU0FBSixDQUFjLHFCQUFkLEVBQXFDO0FBQ25DQyxFQUFBQSxLQUFLLEVBQUUsQ0FBQyxRQUFELEVBQVcsYUFBWCxFQUEwQixZQUExQixFQUF3QyxVQUF4QyxFQUFvRCxhQUFwRCxDQUQ0QjtBQUVuQ0MsRUFBQUEsSUFBSSxFQUFFLFNBQVNBLElBQVQsR0FBZ0I7QUFDcEIsV0FBTztBQUNMQyxNQUFBQSxLQUFLLEVBQUUsRUFERjtBQUVMQyxNQUFBQSxLQUFLLEVBQUU7QUFGRixLQUFQO0FBSUQsR0FQa0M7QUFRbkNDLEVBQUFBLFFBQVEsRUFBRSxxK0JBUnlCO0FBU25DQyxFQUFBQSxPQUFPLEVBQUUsU0FBU0EsT0FBVCxHQUFtQjtBQUMxQixTQUFLSCxLQUFMLEdBQWEsS0FBS0ksV0FBbEI7O0FBRUEsUUFBSSxLQUFLQyxNQUFMLENBQVksT0FBWixDQUFKLEVBQTBCO0FBQ3hCLFdBQUtKLEtBQUwsSUFBYyxZQUFZLEtBQUtJLE1BQUwsQ0FBWSxPQUFaLENBQVosR0FBbUMsS0FBakQ7QUFDRDs7QUFFRCxRQUFJLEtBQUtBLE1BQUwsQ0FBWSxRQUFaLENBQUosRUFBMkI7QUFDekIsV0FBS0osS0FBTCxJQUFjLGFBQWEsS0FBS0ksTUFBTCxDQUFZLFFBQVosQ0FBYixHQUFxQyxLQUFuRDtBQUNEO0FBQ0YsR0FuQmtDO0FBb0JuQ0MsRUFBQUEsT0FBTyxFQUFFLEVBcEIwQjtBQXFCbkNDLEVBQUFBLEtBQUssRUFBRTtBQUNMUCxJQUFBQSxLQUFLLEVBQUUsU0FBU0EsS0FBVCxDQUFlUSxNQUFmLEVBQXVCO0FBQzVCLFdBQUtDLEtBQUwsQ0FBVyxrQkFBWCxFQUErQkQsTUFBL0I7QUFDRDtBQUhJO0FBckI0QixDQUFyQyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5WdWUuY29tcG9uZW50KCd3cGNmdG9faW1hZ2Vfc2VsZWN0Jywge1xuICBwcm9wczogWydmaWVsZHMnLCAnZmllbGRfbGFiZWwnLCAnZmllbGRfbmFtZScsICdmaWVsZF9pZCcsICdmaWVsZF92YWx1ZSddLFxuICBkYXRhOiBmdW5jdGlvbiBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogJycsXG4gICAgICBzdHlsZTogJydcbiAgICB9O1xuICB9LFxuICB0ZW1wbGF0ZTogXCJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0b19nZW5lcmljX2ZpZWxkIHdwY2Z0b19nZW5lcmljX2ZpZWxkX2ltYWdlX3NlbGVjdFxcXCIgdi1iaW5kOmNsYXNzPVxcXCJmaWVsZF9pZFxcXCI+XFxuXFxuICAgICAgICAgICAgPHdwY2Z0b19maWVsZHNfYXNpZGVfYmVmb3JlIDpmaWVsZHM9XFxcImZpZWxkc1xcXCIgOmZpZWxkX2xhYmVsPVxcXCJmaWVsZF9sYWJlbFxcXCI+PC93cGNmdG9fZmllbGRzX2FzaWRlX2JlZm9yZT5cXG5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG8tZmllbGQtY29udGVudFxcXCI+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0b19pbWFnZV9zZWxlY3RcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIHYtZm9yPVxcXCIob3B0aW9uLCBrZXkpIGluIGZpZWxkc1snb3B0aW9ucyddXFxcIiB2LWJpbmQ6Y2xhc3M9XFxcInsnYWN0aXZlJyA6IHZhbHVlID09IGtleX1cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJ3cGNmdG8taW1nLXdyYXBcXFwiPjxpbWcgdi1iaW5kOnNyYz1cXFwib3B0aW9uLmltZ1xcXCIgdi1iaW5kOmFsdD1cXFwib3B0aW9uLmFsdFxcXCIgdi1iaW5kOnN0eWxlPVxcXCJzdHlsZVxcXCI+PC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJyYWRpb1xcXCIgdi1iaW5kOm5hbWU9XFxcImZpZWxkX25hbWVcXFwiIHYtbW9kZWw9XFxcInZhbHVlXFxcIiB2LWJpbmQ6dmFsdWU9XFxcImtleVxcXCIvPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHYtaHRtbD1cXFwib3B0aW9uLmFsdFxcXCIgY2xhc3M9XFxcIndwY2Z0by1pbWctYWx0XFxcIj48L3NwYW4+XFxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG5cXG4gICAgICAgICAgICA8d3BjZnRvX2ZpZWxkc19hc2lkZV9hZnRlciA6ZmllbGRzPVxcXCJmaWVsZHNcXFwiPjwvd3BjZnRvX2ZpZWxkc19hc2lkZV9hZnRlcj5cXG4gICAgICAgICAgICBcXG4gICAgICAgIDwvZGl2PlxcbiAgICBcIixcbiAgbW91bnRlZDogZnVuY3Rpb24gbW91bnRlZCgpIHtcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5maWVsZF92YWx1ZTtcblxuICAgIGlmICh0aGlzLmZpZWxkc1snd2lkdGgnXSkge1xuICAgICAgdGhpcy5zdHlsZSArPSAnd2lkdGg6ICcgKyB0aGlzLmZpZWxkc1snd2lkdGgnXSArICdweDsnO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmZpZWxkc1snaGVpZ2h0J10pIHtcbiAgICAgIHRoaXMuc3R5bGUgKz0gJ2hlaWdodDogJyArIHRoaXMuZmllbGRzWydoZWlnaHQnXSArICdweDsnO1xuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge30sXG4gIHdhdGNoOiB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKF92YWx1ZSkge1xuICAgICAgdGhpcy4kZW1pdCgnd3BjZnRvLWdldC12YWx1ZScsIF92YWx1ZSk7XG4gICAgfVxuICB9XG59KTsiXX0=
},{}]},{},[1])
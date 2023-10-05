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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJ2YWx1ZSIsInN0eWxlIiwidGVtcGxhdGUiLCJtb3VudGVkIiwiZmllbGRfdmFsdWUiLCJmaWVsZHMiLCJtZXRob2RzIiwid2F0Y2giLCJfdmFsdWUiLCIkZW1pdCJdLCJzb3VyY2VzIjpbImZha2VfNDcyM2NkOTcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cblZ1ZS5jb21wb25lbnQoJ3dwY2Z0b19pbWFnZV9zZWxlY3QnLCB7XG4gIHByb3BzOiBbJ2ZpZWxkcycsICdmaWVsZF9sYWJlbCcsICdmaWVsZF9uYW1lJywgJ2ZpZWxkX2lkJywgJ2ZpZWxkX3ZhbHVlJ10sXG4gIGRhdGE6IGZ1bmN0aW9uIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiAnJyxcbiAgICAgIHN0eWxlOiAnJ1xuICAgIH07XG4gIH0sXG4gIHRlbXBsYXRlOiBcIlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvX2dlbmVyaWNfZmllbGQgd3BjZnRvX2dlbmVyaWNfZmllbGRfaW1hZ2Vfc2VsZWN0XFxcIiB2LWJpbmQ6Y2xhc3M9XFxcImZpZWxkX2lkXFxcIj5cXG5cXG4gICAgICAgICAgICA8d3BjZnRvX2ZpZWxkc19hc2lkZV9iZWZvcmUgOmZpZWxkcz1cXFwiZmllbGRzXFxcIiA6ZmllbGRfbGFiZWw9XFxcImZpZWxkX2xhYmVsXFxcIj48L3dwY2Z0b19maWVsZHNfYXNpZGVfYmVmb3JlPlxcblxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0by1maWVsZC1jb250ZW50XFxcIj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvX2ltYWdlX3NlbGVjdFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgdi1mb3I9XFxcIihvcHRpb24sIGtleSkgaW4gZmllbGRzWydvcHRpb25zJ11cXFwiIHYtYmluZDpjbGFzcz1cXFwieydhY3RpdmUnIDogdmFsdWUgPT0ga2V5fVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIndwY2Z0by1pbWctd3JhcFxcXCI+PGltZyB2LWJpbmQ6c3JjPVxcXCJvcHRpb24uaW1nXFxcIiB2LWJpbmQ6YWx0PVxcXCJvcHRpb24uYWx0XFxcIiB2LWJpbmQ6c3R5bGU9XFxcInN0eWxlXFxcIj48L3NwYW4+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcInJhZGlvXFxcIiB2LWJpbmQ6bmFtZT1cXFwiZmllbGRfbmFtZVxcXCIgdi1tb2RlbD1cXFwidmFsdWVcXFwiIHYtYmluZDp2YWx1ZT1cXFwia2V5XFxcIi8+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gdi1odG1sPVxcXCJvcHRpb24uYWx0XFxcIiBjbGFzcz1cXFwid3BjZnRvLWltZy1hbHRcXFwiPjwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDwvZGl2PlxcblxcbiAgICAgICAgICAgIDx3cGNmdG9fZmllbGRzX2FzaWRlX2FmdGVyIDpmaWVsZHM9XFxcImZpZWxkc1xcXCI+PC93cGNmdG9fZmllbGRzX2FzaWRlX2FmdGVyPlxcbiAgICAgICAgICAgIFxcbiAgICAgICAgPC9kaXY+XFxuICAgIFwiLFxuICBtb3VudGVkOiBmdW5jdGlvbiBtb3VudGVkKCkge1xuICAgIHRoaXMudmFsdWUgPSB0aGlzLmZpZWxkX3ZhbHVlO1xuXG4gICAgaWYgKHRoaXMuZmllbGRzWyd3aWR0aCddKSB7XG4gICAgICB0aGlzLnN0eWxlICs9ICd3aWR0aDogJyArIHRoaXMuZmllbGRzWyd3aWR0aCddICsgJ3B4Oyc7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZmllbGRzWydoZWlnaHQnXSkge1xuICAgICAgdGhpcy5zdHlsZSArPSAnaGVpZ2h0OiAnICsgdGhpcy5maWVsZHNbJ2hlaWdodCddICsgJ3B4Oyc7XG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7fSxcbiAgd2F0Y2g6IHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoX3ZhbHVlKSB7XG4gICAgICB0aGlzLiRlbWl0KCd3cGNmdG8tZ2V0LXZhbHVlJywgX3ZhbHVlKTtcbiAgICB9XG4gIH1cbn0pOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUFBLEdBQUcsQ0FBQ0MsU0FBSixDQUFjLHFCQUFkLEVBQXFDO0VBQ25DQyxLQUFLLEVBQUUsQ0FBQyxRQUFELEVBQVcsYUFBWCxFQUEwQixZQUExQixFQUF3QyxVQUF4QyxFQUFvRCxhQUFwRCxDQUQ0QjtFQUVuQ0MsSUFBSSxFQUFFLFNBQVNBLElBQVQsR0FBZ0I7SUFDcEIsT0FBTztNQUNMQyxLQUFLLEVBQUUsRUFERjtNQUVMQyxLQUFLLEVBQUU7SUFGRixDQUFQO0VBSUQsQ0FQa0M7RUFRbkNDLFFBQVEsRUFBRSxxK0JBUnlCO0VBU25DQyxPQUFPLEVBQUUsU0FBU0EsT0FBVCxHQUFtQjtJQUMxQixLQUFLSCxLQUFMLEdBQWEsS0FBS0ksV0FBbEI7O0lBRUEsSUFBSSxLQUFLQyxNQUFMLENBQVksT0FBWixDQUFKLEVBQTBCO01BQ3hCLEtBQUtKLEtBQUwsSUFBYyxZQUFZLEtBQUtJLE1BQUwsQ0FBWSxPQUFaLENBQVosR0FBbUMsS0FBakQ7SUFDRDs7SUFFRCxJQUFJLEtBQUtBLE1BQUwsQ0FBWSxRQUFaLENBQUosRUFBMkI7TUFDekIsS0FBS0osS0FBTCxJQUFjLGFBQWEsS0FBS0ksTUFBTCxDQUFZLFFBQVosQ0FBYixHQUFxQyxLQUFuRDtJQUNEO0VBQ0YsQ0FuQmtDO0VBb0JuQ0MsT0FBTyxFQUFFLEVBcEIwQjtFQXFCbkNDLEtBQUssRUFBRTtJQUNMUCxLQUFLLEVBQUUsU0FBU0EsS0FBVCxDQUFlUSxNQUFmLEVBQXVCO01BQzVCLEtBQUtDLEtBQUwsQ0FBVyxrQkFBWCxFQUErQkQsTUFBL0I7SUFDRDtFQUhJO0FBckI0QixDQUFyQyJ9
},{}]},{},[1])
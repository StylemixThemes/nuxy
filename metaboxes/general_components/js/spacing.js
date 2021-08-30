(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

Vue.component('wpcfto_spacing', {
  props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value'],
  data: function data() {
    return {
      spacing: {},
      focused: ''
    };
  },
  template: "\n        <div class=\"wpcfto_generic_field wpcfto_generic_field_spacing\" v-bind:class=\"field_id\">\n\n            <wpcfto_fields_aside_before :fields=\"fields\" :field_label=\"field_label\"></wpcfto_fields_aside_before>\n\n            <div class=\"wpcfto-field-content\">\n                <div class=\"wpcfto_spacing\">\n\n                    <div class=\"wpcfto-spacing-input-wrap\" :class=\"{ 'focused' : focused == 'spacing_top' }\"><i class=\"fa fa-arrow-up\"></i><input type=\"number\" name=\"top\" v-model=\"spacing.top\" @focus=\"focused = 'spacing_top'\" @blur=\"focused = ''\"/></div>\n                    <div class=\"wpcfto-spacing-input-wrap\" :class=\"{ 'focused' : focused == 'spacing_right' }\"><i class=\"fa fa-arrow-right\"></i><input type=\"number\" name=\"right\" v-model=\"spacing.right\" @focus=\"focused = 'spacing_right'\" @blur=\"focused = ''\"/></div>\n                    <div class=\"wpcfto-spacing-input-wrap\" :class=\"{ 'focused' : focused == 'spacing_bottom' }\"><i class=\"fa fa-arrow-down\"></i><input type=\"number\" name=\"bottom\" v-model=\"spacing.bottom\" @focus=\"focused = 'spacing_bottom'\" @blur=\"focused = ''\"/></div>\n                    <div class=\"wpcfto-spacing-input-wrap\" :class=\"{ 'focused' : focused == 'spacing_left' }\"><i class=\"fa fa-arrow-left\"></i><input type=\"number\" name=\"left\" v-model=\"spacing.left\" @focus=\"focused = 'spacing_left'\" @blur=\"focused = ''\"/></div>\n    \n                    <select name=\"unit\" v-model=\"spacing.unit\">\n                        <option v-for=\"option in fields['units']\" v-bind:value=\"option\">{{ option }}</option>\n                    </select>\n                </div>\n            </div>\n\n            <wpcfto_fields_aside_after :fields=\"fields\"></wpcfto_fields_aside_after>\n            \n        </div>\n    ",
  mounted: function mounted() {
    // JSON parse for Post Meta
    this.spacing = typeof this.field_value === 'string' && WpcftoIsJsonString(this.field_value) ? JSON.parse(this.field_value) : this.field_value;

    if (_typeof(this.spacing) !== 'object') {
      this.spacing = {
        top: '',
        left: '',
        right: '',
        bottom: ''
      };
    }
  },
  methods: {},
  watch: {
    spacing: {
      deep: true,
      handler: function handler(spacing) {
        this.$emit('wpcfto-get-value', spacing);
      }
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfMWRiYmY2N2EuanMiXSwibmFtZXMiOlsiX3R5cGVvZiIsIm9iaiIsIlN5bWJvbCIsIml0ZXJhdG9yIiwiY29uc3RydWN0b3IiLCJwcm90b3R5cGUiLCJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJzcGFjaW5nIiwiZm9jdXNlZCIsInRlbXBsYXRlIiwibW91bnRlZCIsImZpZWxkX3ZhbHVlIiwiV3BjZnRvSXNKc29uU3RyaW5nIiwiSlNPTiIsInBhcnNlIiwidG9wIiwibGVmdCIsInJpZ2h0IiwiYm90dG9tIiwibWV0aG9kcyIsIndhdGNoIiwiZGVlcCIsImhhbmRsZXIiLCIkZW1pdCJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUEsU0FBU0EsT0FBVCxDQUFpQkMsR0FBakIsRUFBc0I7QUFBRTs7QUFBMkIsTUFBSSxPQUFPQyxNQUFQLEtBQWtCLFVBQWxCLElBQWdDLE9BQU9BLE1BQU0sQ0FBQ0MsUUFBZCxLQUEyQixRQUEvRCxFQUF5RTtBQUFFSCxJQUFBQSxPQUFPLEdBQUcsU0FBU0EsT0FBVCxDQUFpQkMsR0FBakIsRUFBc0I7QUFBRSxhQUFPLE9BQU9BLEdBQWQ7QUFBb0IsS0FBdEQ7QUFBeUQsR0FBcEksTUFBMEk7QUFBRUQsSUFBQUEsT0FBTyxHQUFHLFNBQVNBLE9BQVQsQ0FBaUJDLEdBQWpCLEVBQXNCO0FBQUUsYUFBT0EsR0FBRyxJQUFJLE9BQU9DLE1BQVAsS0FBa0IsVUFBekIsSUFBdUNELEdBQUcsQ0FBQ0csV0FBSixLQUFvQkYsTUFBM0QsSUFBcUVELEdBQUcsS0FBS0MsTUFBTSxDQUFDRyxTQUFwRixHQUFnRyxRQUFoRyxHQUEyRyxPQUFPSixHQUF6SDtBQUErSCxLQUFqSztBQUFvSzs7QUFBQyxTQUFPRCxPQUFPLENBQUNDLEdBQUQsQ0FBZDtBQUFzQjs7QUFFMVhLLEdBQUcsQ0FBQ0MsU0FBSixDQUFjLGdCQUFkLEVBQWdDO0FBQzlCQyxFQUFBQSxLQUFLLEVBQUUsQ0FBQyxRQUFELEVBQVcsYUFBWCxFQUEwQixZQUExQixFQUF3QyxVQUF4QyxFQUFvRCxhQUFwRCxDQUR1QjtBQUU5QkMsRUFBQUEsSUFBSSxFQUFFLFNBQVNBLElBQVQsR0FBZ0I7QUFDcEIsV0FBTztBQUNMQyxNQUFBQSxPQUFPLEVBQUUsRUFESjtBQUVMQyxNQUFBQSxPQUFPLEVBQUU7QUFGSixLQUFQO0FBSUQsR0FQNkI7QUFROUJDLEVBQUFBLFFBQVEsRUFBRSw0eURBUm9CO0FBUzlCQyxFQUFBQSxPQUFPLEVBQUUsU0FBU0EsT0FBVCxHQUFtQjtBQUMxQjtBQUNBLFNBQUtILE9BQUwsR0FBZSxPQUFPLEtBQUtJLFdBQVosS0FBNEIsUUFBNUIsSUFBd0NDLGtCQUFrQixDQUFDLEtBQUtELFdBQU4sQ0FBMUQsR0FBK0VFLElBQUksQ0FBQ0MsS0FBTCxDQUFXLEtBQUtILFdBQWhCLENBQS9FLEdBQThHLEtBQUtBLFdBQWxJOztBQUVBLFFBQUlkLE9BQU8sQ0FBQyxLQUFLVSxPQUFOLENBQVAsS0FBMEIsUUFBOUIsRUFBd0M7QUFDdEMsV0FBS0EsT0FBTCxHQUFlO0FBQ2JRLFFBQUFBLEdBQUcsRUFBRSxFQURRO0FBRWJDLFFBQUFBLElBQUksRUFBRSxFQUZPO0FBR2JDLFFBQUFBLEtBQUssRUFBRSxFQUhNO0FBSWJDLFFBQUFBLE1BQU0sRUFBRTtBQUpLLE9BQWY7QUFNRDtBQUNGLEdBckI2QjtBQXNCOUJDLEVBQUFBLE9BQU8sRUFBRSxFQXRCcUI7QUF1QjlCQyxFQUFBQSxLQUFLLEVBQUU7QUFDTGIsSUFBQUEsT0FBTyxFQUFFO0FBQ1BjLE1BQUFBLElBQUksRUFBRSxJQURDO0FBRVBDLE1BQUFBLE9BQU8sRUFBRSxTQUFTQSxPQUFULENBQWlCZixPQUFqQixFQUEwQjtBQUNqQyxhQUFLZ0IsS0FBTCxDQUFXLGtCQUFYLEVBQStCaEIsT0FBL0I7QUFDRDtBQUpNO0FBREo7QUF2QnVCLENBQWhDIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mKG9iaik7IH1cblxuVnVlLmNvbXBvbmVudCgnd3BjZnRvX3NwYWNpbmcnLCB7XG4gIHByb3BzOiBbJ2ZpZWxkcycsICdmaWVsZF9sYWJlbCcsICdmaWVsZF9uYW1lJywgJ2ZpZWxkX2lkJywgJ2ZpZWxkX3ZhbHVlJ10sXG4gIGRhdGE6IGZ1bmN0aW9uIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNwYWNpbmc6IHt9LFxuICAgICAgZm9jdXNlZDogJydcbiAgICB9O1xuICB9LFxuICB0ZW1wbGF0ZTogXCJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0b19nZW5lcmljX2ZpZWxkIHdwY2Z0b19nZW5lcmljX2ZpZWxkX3NwYWNpbmdcXFwiIHYtYmluZDpjbGFzcz1cXFwiZmllbGRfaWRcXFwiPlxcblxcbiAgICAgICAgICAgIDx3cGNmdG9fZmllbGRzX2FzaWRlX2JlZm9yZSA6ZmllbGRzPVxcXCJmaWVsZHNcXFwiIDpmaWVsZF9sYWJlbD1cXFwiZmllbGRfbGFiZWxcXFwiPjwvd3BjZnRvX2ZpZWxkc19hc2lkZV9iZWZvcmU+XFxuXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvLWZpZWxkLWNvbnRlbnRcXFwiPlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9fc3BhY2luZ1xcXCI+XFxuXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG8tc3BhY2luZy1pbnB1dC13cmFwXFxcIiA6Y2xhc3M9XFxcInsgJ2ZvY3VzZWQnIDogZm9jdXNlZCA9PSAnc3BhY2luZ190b3AnIH1cXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1hcnJvdy11cFxcXCI+PC9pPjxpbnB1dCB0eXBlPVxcXCJudW1iZXJcXFwiIG5hbWU9XFxcInRvcFxcXCIgdi1tb2RlbD1cXFwic3BhY2luZy50b3BcXFwiIEBmb2N1cz1cXFwiZm9jdXNlZCA9ICdzcGFjaW5nX3RvcCdcXFwiIEBibHVyPVxcXCJmb2N1c2VkID0gJydcXFwiLz48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0by1zcGFjaW5nLWlucHV0LXdyYXBcXFwiIDpjbGFzcz1cXFwieyAnZm9jdXNlZCcgOiBmb2N1c2VkID09ICdzcGFjaW5nX3JpZ2h0JyB9XFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtYXJyb3ctcmlnaHRcXFwiPjwvaT48aW5wdXQgdHlwZT1cXFwibnVtYmVyXFxcIiBuYW1lPVxcXCJyaWdodFxcXCIgdi1tb2RlbD1cXFwic3BhY2luZy5yaWdodFxcXCIgQGZvY3VzPVxcXCJmb2N1c2VkID0gJ3NwYWNpbmdfcmlnaHQnXFxcIiBAYmx1cj1cXFwiZm9jdXNlZCA9ICcnXFxcIi8+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG8tc3BhY2luZy1pbnB1dC13cmFwXFxcIiA6Y2xhc3M9XFxcInsgJ2ZvY3VzZWQnIDogZm9jdXNlZCA9PSAnc3BhY2luZ19ib3R0b20nIH1cXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1hcnJvdy1kb3duXFxcIj48L2k+PGlucHV0IHR5cGU9XFxcIm51bWJlclxcXCIgbmFtZT1cXFwiYm90dG9tXFxcIiB2LW1vZGVsPVxcXCJzcGFjaW5nLmJvdHRvbVxcXCIgQGZvY3VzPVxcXCJmb2N1c2VkID0gJ3NwYWNpbmdfYm90dG9tJ1xcXCIgQGJsdXI9XFxcImZvY3VzZWQgPSAnJ1xcXCIvPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvLXNwYWNpbmctaW5wdXQtd3JhcFxcXCIgOmNsYXNzPVxcXCJ7ICdmb2N1c2VkJyA6IGZvY3VzZWQgPT0gJ3NwYWNpbmdfbGVmdCcgfVxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWFycm93LWxlZnRcXFwiPjwvaT48aW5wdXQgdHlwZT1cXFwibnVtYmVyXFxcIiBuYW1lPVxcXCJsZWZ0XFxcIiB2LW1vZGVsPVxcXCJzcGFjaW5nLmxlZnRcXFwiIEBmb2N1cz1cXFwiZm9jdXNlZCA9ICdzcGFjaW5nX2xlZnQnXFxcIiBAYmx1cj1cXFwiZm9jdXNlZCA9ICcnXFxcIi8+PC9kaXY+XFxuICAgIFxcbiAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBuYW1lPVxcXCJ1bml0XFxcIiB2LW1vZGVsPVxcXCJzcGFjaW5nLnVuaXRcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdi1mb3I9XFxcIm9wdGlvbiBpbiBmaWVsZHNbJ3VuaXRzJ11cXFwiIHYtYmluZDp2YWx1ZT1cXFwib3B0aW9uXFxcIj57eyBvcHRpb24gfX08L29wdGlvbj5cXG4gICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG5cXG4gICAgICAgICAgICA8d3BjZnRvX2ZpZWxkc19hc2lkZV9hZnRlciA6ZmllbGRzPVxcXCJmaWVsZHNcXFwiPjwvd3BjZnRvX2ZpZWxkc19hc2lkZV9hZnRlcj5cXG4gICAgICAgICAgICBcXG4gICAgICAgIDwvZGl2PlxcbiAgICBcIixcbiAgbW91bnRlZDogZnVuY3Rpb24gbW91bnRlZCgpIHtcbiAgICAvLyBKU09OIHBhcnNlIGZvciBQb3N0IE1ldGFcbiAgICB0aGlzLnNwYWNpbmcgPSB0eXBlb2YgdGhpcy5maWVsZF92YWx1ZSA9PT0gJ3N0cmluZycgJiYgV3BjZnRvSXNKc29uU3RyaW5nKHRoaXMuZmllbGRfdmFsdWUpID8gSlNPTi5wYXJzZSh0aGlzLmZpZWxkX3ZhbHVlKSA6IHRoaXMuZmllbGRfdmFsdWU7XG5cbiAgICBpZiAoX3R5cGVvZih0aGlzLnNwYWNpbmcpICE9PSAnb2JqZWN0Jykge1xuICAgICAgdGhpcy5zcGFjaW5nID0ge1xuICAgICAgICB0b3A6ICcnLFxuICAgICAgICBsZWZ0OiAnJyxcbiAgICAgICAgcmlnaHQ6ICcnLFxuICAgICAgICBib3R0b206ICcnXG4gICAgICB9O1xuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge30sXG4gIHdhdGNoOiB7XG4gICAgc3BhY2luZzoge1xuICAgICAgZGVlcDogdHJ1ZSxcbiAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoc3BhY2luZykge1xuICAgICAgICB0aGlzLiRlbWl0KCd3cGNmdG8tZ2V0LXZhbHVlJywgc3BhY2luZyk7XG4gICAgICB9XG4gICAgfVxuICB9XG59KTsiXX0=
},{}]},{},[1])
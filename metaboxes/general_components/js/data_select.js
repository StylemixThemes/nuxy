(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Vue.component('wpcfto_data_select', {
  props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value'],
  data: function data() {
    return {
      value: '',
      style: ''
    };
  },
  template: "\n        <div class=\"wpcfto_generic_field wpcfto_generic_field_data_select\" v-bind:class=\"field_id\">\n\n            <wpcfto_fields_aside_before :fields=\"fields\" :field_label=\"field_label\"></wpcfto_fields_aside_before>\n\n            <div class=\"wpcfto-field-content\">\n                <div class=\"wpcfto_data_select\">\n                    <label\n                        v-for=\"(option, key) in fields['options']\"\n                        class=\"wpcfto_data_select__label\"\n                    >\n                        <div class=\"wpcfto_data_select__wrapper\" v-bind:class=\"{'wpcfto_data_select__wrapper_disabled': option.disabled}\">\n                            <span class=\"wpcfto_data_select__img\" v-bind:class=\"{'wpcfto_data_select__img_active': value == option.value}\">\n                                <img v-bind:src=\"option.img\" v-bind:alt=\"option.alt\" v-bind:style=\"style\">\n                                <a v-if=\"option.preview_url\" :href=\"option.preview_url\" target=\"_blank\" class=\"wpcfto_data_select__img-preview\">\n                                    {{ option.preview_label }}\n                                </a>\n                            </span>\n                            <div class=\"wpcfto_data_select__content\">\n                                <input v-if=\"!option.disabled\" type=\"radio\" v-bind:name=\"field_name\" v-model=\"value\" v-bind:value=\"option.value\"/>\n                                <div class=\"wpcfto_data_select__alt-wrapper\">\n                                    <span v-html=\"option.alt\" class=\"wpcfto_data_select__alt\"></span>\n                                    \n                                    <div v-if=\"option.disabled\" class=\"wpcfto_data_select__disabled\">\n                                        <span v-if=\"option.disabled_hint\" class=\"wpcfto_data_select__disabled-hint\" v-html=\"option.disabled_hint\"></span>\n                                        <i class=\"fa fa-lock\"></i>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </label>\n                </div>\n            </div>\n\n            <wpcfto_fields_aside_after :fields=\"fields\"></wpcfto_fields_aside_after>\n            \n        </div>\n    ",
  mounted: function mounted() {
    this.value = this.field_value;

    if (this.fields['width']) {
      this.style += 'width: ' + this.fields['width'] + 'px;';
    }

    if (this.fields['height']) {
      this.style += 'height: ' + this.fields['height'] + 'px;';
    }
  },
  watch: {
    value: function value(_value) {
      this.$emit('wpcfto-get-value', _value);
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJ2YWx1ZSIsInN0eWxlIiwidGVtcGxhdGUiLCJtb3VudGVkIiwiZmllbGRfdmFsdWUiLCJmaWVsZHMiLCJ3YXRjaCIsIl92YWx1ZSIsIiRlbWl0Il0sInNvdXJjZXMiOlsiZmFrZV81MzNhM2FkZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuVnVlLmNvbXBvbmVudCgnd3BjZnRvX2RhdGFfc2VsZWN0Jywge1xuICBwcm9wczogWydmaWVsZHMnLCAnZmllbGRfbGFiZWwnLCAnZmllbGRfbmFtZScsICdmaWVsZF9pZCcsICdmaWVsZF92YWx1ZSddLFxuICBkYXRhOiBmdW5jdGlvbiBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogJycsXG4gICAgICBzdHlsZTogJydcbiAgICB9O1xuICB9LFxuICB0ZW1wbGF0ZTogXCJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0b19nZW5lcmljX2ZpZWxkIHdwY2Z0b19nZW5lcmljX2ZpZWxkX2RhdGFfc2VsZWN0XFxcIiB2LWJpbmQ6Y2xhc3M9XFxcImZpZWxkX2lkXFxcIj5cXG5cXG4gICAgICAgICAgICA8d3BjZnRvX2ZpZWxkc19hc2lkZV9iZWZvcmUgOmZpZWxkcz1cXFwiZmllbGRzXFxcIiA6ZmllbGRfbGFiZWw9XFxcImZpZWxkX2xhYmVsXFxcIj48L3dwY2Z0b19maWVsZHNfYXNpZGVfYmVmb3JlPlxcblxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0by1maWVsZC1jb250ZW50XFxcIj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvX2RhdGFfc2VsZWN0XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbFxcbiAgICAgICAgICAgICAgICAgICAgICAgIHYtZm9yPVxcXCIob3B0aW9uLCBrZXkpIGluIGZpZWxkc1snb3B0aW9ucyddXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJ3cGNmdG9fZGF0YV9zZWxlY3RfX2xhYmVsXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0b19kYXRhX3NlbGVjdF9fd3JhcHBlclxcXCIgdi1iaW5kOmNsYXNzPVxcXCJ7J3dwY2Z0b19kYXRhX3NlbGVjdF9fd3JhcHBlcl9kaXNhYmxlZCc6IG9wdGlvbi5kaXNhYmxlZH1cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwid3BjZnRvX2RhdGFfc2VsZWN0X19pbWdcXFwiIHYtYmluZDpjbGFzcz1cXFwieyd3cGNmdG9fZGF0YV9zZWxlY3RfX2ltZ19hY3RpdmUnOiB2YWx1ZSA9PSBvcHRpb24udmFsdWV9XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgdi1iaW5kOnNyYz1cXFwib3B0aW9uLmltZ1xcXCIgdi1iaW5kOmFsdD1cXFwib3B0aW9uLmFsdFxcXCIgdi1iaW5kOnN0eWxlPVxcXCJzdHlsZVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSB2LWlmPVxcXCJvcHRpb24ucHJldmlld191cmxcXFwiIDpocmVmPVxcXCJvcHRpb24ucHJldmlld191cmxcXFwiIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBjbGFzcz1cXFwid3BjZnRvX2RhdGFfc2VsZWN0X19pbWctcHJldmlld1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgb3B0aW9uLnByZXZpZXdfbGFiZWwgfX1cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9fZGF0YV9zZWxlY3RfX2NvbnRlbnRcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHYtaWY9XFxcIiFvcHRpb24uZGlzYWJsZWRcXFwiIHR5cGU9XFxcInJhZGlvXFxcIiB2LWJpbmQ6bmFtZT1cXFwiZmllbGRfbmFtZVxcXCIgdi1tb2RlbD1cXFwidmFsdWVcXFwiIHYtYmluZDp2YWx1ZT1cXFwib3B0aW9uLnZhbHVlXFxcIi8+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9fZGF0YV9zZWxlY3RfX2FsdC13cmFwcGVyXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiB2LWh0bWw9XFxcIm9wdGlvbi5hbHRcXFwiIGNsYXNzPVxcXCJ3cGNmdG9fZGF0YV9zZWxlY3RfX2FsdFxcXCI+PC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgdi1pZj1cXFwib3B0aW9uLmRpc2FibGVkXFxcIiBjbGFzcz1cXFwid3BjZnRvX2RhdGFfc2VsZWN0X19kaXNhYmxlZFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHYtaWY9XFxcIm9wdGlvbi5kaXNhYmxlZF9oaW50XFxcIiBjbGFzcz1cXFwid3BjZnRvX2RhdGFfc2VsZWN0X19kaXNhYmxlZC1oaW50XFxcIiB2LWh0bWw9XFxcIm9wdGlvbi5kaXNhYmxlZF9oaW50XFxcIj48L3NwYW4+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJmYSBmYS1sb2NrXFxcIj48L2k+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG5cXG4gICAgICAgICAgICA8d3BjZnRvX2ZpZWxkc19hc2lkZV9hZnRlciA6ZmllbGRzPVxcXCJmaWVsZHNcXFwiPjwvd3BjZnRvX2ZpZWxkc19hc2lkZV9hZnRlcj5cXG4gICAgICAgICAgICBcXG4gICAgICAgIDwvZGl2PlxcbiAgICBcIixcbiAgbW91bnRlZDogZnVuY3Rpb24gbW91bnRlZCgpIHtcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5maWVsZF92YWx1ZTtcblxuICAgIGlmICh0aGlzLmZpZWxkc1snd2lkdGgnXSkge1xuICAgICAgdGhpcy5zdHlsZSArPSAnd2lkdGg6ICcgKyB0aGlzLmZpZWxkc1snd2lkdGgnXSArICdweDsnO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmZpZWxkc1snaGVpZ2h0J10pIHtcbiAgICAgIHRoaXMuc3R5bGUgKz0gJ2hlaWdodDogJyArIHRoaXMuZmllbGRzWydoZWlnaHQnXSArICdweDsnO1xuICAgIH1cbiAgfSxcbiAgd2F0Y2g6IHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoX3ZhbHVlKSB7XG4gICAgICB0aGlzLiRlbWl0KCd3cGNmdG8tZ2V0LXZhbHVlJywgX3ZhbHVlKTtcbiAgICB9XG4gIH1cbn0pOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUFBLEdBQUcsQ0FBQ0MsU0FBSixDQUFjLG9CQUFkLEVBQW9DO0VBQ2xDQyxLQUFLLEVBQUUsQ0FBQyxRQUFELEVBQVcsYUFBWCxFQUEwQixZQUExQixFQUF3QyxVQUF4QyxFQUFvRCxhQUFwRCxDQUQyQjtFQUVsQ0MsSUFBSSxFQUFFLFNBQVNBLElBQVQsR0FBZ0I7SUFDcEIsT0FBTztNQUNMQyxLQUFLLEVBQUUsRUFERjtNQUVMQyxLQUFLLEVBQUU7SUFGRixDQUFQO0VBSUQsQ0FQaUM7RUFRbENDLFFBQVEsRUFBRSxxekVBUndCO0VBU2xDQyxPQUFPLEVBQUUsU0FBU0EsT0FBVCxHQUFtQjtJQUMxQixLQUFLSCxLQUFMLEdBQWEsS0FBS0ksV0FBbEI7O0lBRUEsSUFBSSxLQUFLQyxNQUFMLENBQVksT0FBWixDQUFKLEVBQTBCO01BQ3hCLEtBQUtKLEtBQUwsSUFBYyxZQUFZLEtBQUtJLE1BQUwsQ0FBWSxPQUFaLENBQVosR0FBbUMsS0FBakQ7SUFDRDs7SUFFRCxJQUFJLEtBQUtBLE1BQUwsQ0FBWSxRQUFaLENBQUosRUFBMkI7TUFDekIsS0FBS0osS0FBTCxJQUFjLGFBQWEsS0FBS0ksTUFBTCxDQUFZLFFBQVosQ0FBYixHQUFxQyxLQUFuRDtJQUNEO0VBQ0YsQ0FuQmlDO0VBb0JsQ0MsS0FBSyxFQUFFO0lBQ0xOLEtBQUssRUFBRSxTQUFTQSxLQUFULENBQWVPLE1BQWYsRUFBdUI7TUFDNUIsS0FBS0MsS0FBTCxDQUFXLGtCQUFYLEVBQStCRCxNQUEvQjtJQUNEO0VBSEk7QUFwQjJCLENBQXBDIn0=
},{}]},{},[1])
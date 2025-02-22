(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Vue.component('wpcfto_color', {
  template: "\n        <div class=\"wpcfto_generic_field wpcfto_generic_field_color\">\n        \n            <wpcfto_fields_aside_before :fields=\"fields\" :field_label=\"field_label\"></wpcfto_fields_aside_before>\n            \n            <div class=\"wpcfto-field-content\">\n                        \n                <div class=\"stm_colorpicker_wrapper\" v-bind:class=\"['picker-position-' + position]\">\n\n                    <span v-bind:style=\"{'background-color': input_value}\" @click=\"$refs.field_name.focus()\"></span>\n    \n                    <input type=\"text\"\n                           v-bind:name=\"field_name\"\n                           v-bind:placeholder=\"field_label\"\n                           v-bind:id=\"field_id\"\n                           v-model=\"input_value\"\n                           ref=\"field_name\"\n                    />\n    \n                    <div>\n                        <slider-picker v-model=\"value\"></slider-picker>\n                    </div>\n\n                      <a href=\"#\" @click=\"resetValue\" v-if=\"input_value\" class=\"wpcfto_generic_field_color__clear\">\n                        <i class=\"fa fa-times\"></i>\n                      </a>\n    \n                </div>\n            \n            </div>\n            \n            <wpcfto_fields_aside_after :fields=\"fields\"></wpcfto_fields_aside_after>\n            \n        </div>\n    ",
  props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value'],
  components: {
    'slider-picker': VueColor.Chrome
  },
  data: function data() {
    return {
      default_value: '',
      input_value: '',
      position: 'bottom',
      value: {
        r: 255,
        g: 255,
        b: 255,
        a: 1
      }
    };
  },
  created: function created() {
    this.default_value = this.field_value;

    if (typeof this.field_value === 'string') {
      this.input_value = this.field_value;
      var colors = this.field_value.replace('rgba(', '').slice(0, -1).split(',');
      this.$set(this.value, 'r', colors[0]);
      this.$set(this.value, 'g', colors[1]);
      this.$set(this.value, 'b', colors[2]);
      this.$set(this.value, 'a', colors[3]);
    }

    if (this.fields.position) this.position = this.fields.position;
  },
  methods: {
    resetValue: function resetValue(event) {
      event.preventDefault();
      this.$set(this, 'input_value', this.default_value);
      this.$emit('wpcfto-get-value', this.default_value);
      console.log(this.default_value);
    }
  },
  watch: {
    input_value: function input_value(value) {
      this.$emit('wpcfto-get-value', value);
    },
    value: function value(_value) {
      if (typeof _value.rgba !== 'undefined') {
        var rgba_color = 'rgba(' + _value.rgba.r + ',' + _value.rgba.g + ',' + _value.rgba.b + ',' + _value.rgba.a + ')';
        this.$set(this, 'input_value', rgba_color);
        this.$emit('wpcfto-get-value', rgba_color);
      }
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWdWUiLCJjb21wb25lbnQiLCJ0ZW1wbGF0ZSIsInByb3BzIiwiY29tcG9uZW50cyIsIlZ1ZUNvbG9yIiwiQ2hyb21lIiwiZGF0YSIsImRlZmF1bHRfdmFsdWUiLCJpbnB1dF92YWx1ZSIsInBvc2l0aW9uIiwidmFsdWUiLCJyIiwiZyIsImIiLCJhIiwiY3JlYXRlZCIsImZpZWxkX3ZhbHVlIiwiY29sb3JzIiwicmVwbGFjZSIsInNsaWNlIiwic3BsaXQiLCIkc2V0IiwiZmllbGRzIiwibWV0aG9kcyIsInJlc2V0VmFsdWUiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiJGVtaXQiLCJjb25zb2xlIiwibG9nIiwid2F0Y2giLCJfdmFsdWUiLCJyZ2JhIiwicmdiYV9jb2xvciJdLCJzb3VyY2VzIjpbImZha2VfNGQyMWRmYjQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cblZ1ZS5jb21wb25lbnQoJ3dwY2Z0b19jb2xvcicsIHtcbiAgdGVtcGxhdGU6IFwiXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9fZ2VuZXJpY19maWVsZCB3cGNmdG9fZ2VuZXJpY19maWVsZF9jb2xvclxcXCI+XFxuICAgICAgICBcXG4gICAgICAgICAgICA8d3BjZnRvX2ZpZWxkc19hc2lkZV9iZWZvcmUgOmZpZWxkcz1cXFwiZmllbGRzXFxcIiA6ZmllbGRfbGFiZWw9XFxcImZpZWxkX2xhYmVsXFxcIj48L3dwY2Z0b19maWVsZHNfYXNpZGVfYmVmb3JlPlxcbiAgICAgICAgICAgIFxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0by1maWVsZC1jb250ZW50XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICBcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwic3RtX2NvbG9ycGlja2VyX3dyYXBwZXJcXFwiIHYtYmluZDpjbGFzcz1cXFwiWydwaWNrZXItcG9zaXRpb24tJyArIHBvc2l0aW9uXVxcXCI+XFxuXFxuICAgICAgICAgICAgICAgICAgICA8c3BhbiB2LWJpbmQ6c3R5bGU9XFxcInsnYmFja2dyb3VuZC1jb2xvcic6IGlucHV0X3ZhbHVlfVxcXCIgQGNsaWNrPVxcXCIkcmVmcy5maWVsZF9uYW1lLmZvY3VzKClcXFwiPjwvc3Bhbj5cXG4gICAgXFxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwidGV4dFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6bmFtZT1cXFwiZmllbGRfbmFtZVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6cGxhY2Vob2xkZXI9XFxcImZpZWxkX2xhYmVsXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtYmluZDppZD1cXFwiZmllbGRfaWRcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cXFwiaW5wdXRfdmFsdWVcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPVxcXCJmaWVsZF9uYW1lXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgLz5cXG4gICAgXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzbGlkZXItcGlja2VyIHYtbW9kZWw9XFxcInZhbHVlXFxcIj48L3NsaWRlci1waWNrZXI+XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG5cXG4gICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cXFwiI1xcXCIgQGNsaWNrPVxcXCJyZXNldFZhbHVlXFxcIiB2LWlmPVxcXCJpbnB1dF92YWx1ZVxcXCIgY2xhc3M9XFxcIndwY2Z0b19nZW5lcmljX2ZpZWxkX2NvbG9yX19jbGVhclxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XFxcImZhIGZhLXRpbWVzXFxcIj48L2k+XFxuICAgICAgICAgICAgICAgICAgICAgIDwvYT5cXG4gICAgXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIFxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIFxcbiAgICAgICAgICAgIDx3cGNmdG9fZmllbGRzX2FzaWRlX2FmdGVyIDpmaWVsZHM9XFxcImZpZWxkc1xcXCI+PC93cGNmdG9fZmllbGRzX2FzaWRlX2FmdGVyPlxcbiAgICAgICAgICAgIFxcbiAgICAgICAgPC9kaXY+XFxuICAgIFwiLFxuICBwcm9wczogWydmaWVsZHMnLCAnZmllbGRfbGFiZWwnLCAnZmllbGRfbmFtZScsICdmaWVsZF9pZCcsICdmaWVsZF92YWx1ZSddLFxuICBjb21wb25lbnRzOiB7XG4gICAgJ3NsaWRlci1waWNrZXInOiBWdWVDb2xvci5DaHJvbWVcbiAgfSxcbiAgZGF0YTogZnVuY3Rpb24gZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZGVmYXVsdF92YWx1ZTogJycsXG4gICAgICBpbnB1dF92YWx1ZTogJycsXG4gICAgICBwb3NpdGlvbjogJ2JvdHRvbScsXG4gICAgICB2YWx1ZToge1xuICAgICAgICByOiAyNTUsXG4gICAgICAgIGc6IDI1NSxcbiAgICAgICAgYjogMjU1LFxuICAgICAgICBhOiAxXG4gICAgICB9XG4gICAgfTtcbiAgfSxcbiAgY3JlYXRlZDogZnVuY3Rpb24gY3JlYXRlZCgpIHtcbiAgICB0aGlzLmRlZmF1bHRfdmFsdWUgPSB0aGlzLmZpZWxkX3ZhbHVlO1xuXG4gICAgaWYgKHR5cGVvZiB0aGlzLmZpZWxkX3ZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5pbnB1dF92YWx1ZSA9IHRoaXMuZmllbGRfdmFsdWU7XG4gICAgICB2YXIgY29sb3JzID0gdGhpcy5maWVsZF92YWx1ZS5yZXBsYWNlKCdyZ2JhKCcsICcnKS5zbGljZSgwLCAtMSkuc3BsaXQoJywnKTtcbiAgICAgIHRoaXMuJHNldCh0aGlzLnZhbHVlLCAncicsIGNvbG9yc1swXSk7XG4gICAgICB0aGlzLiRzZXQodGhpcy52YWx1ZSwgJ2cnLCBjb2xvcnNbMV0pO1xuICAgICAgdGhpcy4kc2V0KHRoaXMudmFsdWUsICdiJywgY29sb3JzWzJdKTtcbiAgICAgIHRoaXMuJHNldCh0aGlzLnZhbHVlLCAnYScsIGNvbG9yc1szXSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZmllbGRzLnBvc2l0aW9uKSB0aGlzLnBvc2l0aW9uID0gdGhpcy5maWVsZHMucG9zaXRpb247XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICByZXNldFZhbHVlOiBmdW5jdGlvbiByZXNldFZhbHVlKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy4kc2V0KHRoaXMsICdpbnB1dF92YWx1ZScsIHRoaXMuZGVmYXVsdF92YWx1ZSk7XG4gICAgICB0aGlzLiRlbWl0KCd3cGNmdG8tZ2V0LXZhbHVlJywgdGhpcy5kZWZhdWx0X3ZhbHVlKTtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGVmYXVsdF92YWx1ZSk7XG4gICAgfVxuICB9LFxuICB3YXRjaDoge1xuICAgIGlucHV0X3ZhbHVlOiBmdW5jdGlvbiBpbnB1dF92YWx1ZSh2YWx1ZSkge1xuICAgICAgdGhpcy4kZW1pdCgnd3BjZnRvLWdldC12YWx1ZScsIHZhbHVlKTtcbiAgICB9LFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShfdmFsdWUpIHtcbiAgICAgIGlmICh0eXBlb2YgX3ZhbHVlLnJnYmEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhciByZ2JhX2NvbG9yID0gJ3JnYmEoJyArIF92YWx1ZS5yZ2JhLnIgKyAnLCcgKyBfdmFsdWUucmdiYS5nICsgJywnICsgX3ZhbHVlLnJnYmEuYiArICcsJyArIF92YWx1ZS5yZ2JhLmEgKyAnKSc7XG4gICAgICAgIHRoaXMuJHNldCh0aGlzLCAnaW5wdXRfdmFsdWUnLCByZ2JhX2NvbG9yKTtcbiAgICAgICAgdGhpcy4kZW1pdCgnd3BjZnRvLWdldC12YWx1ZScsIHJnYmFfY29sb3IpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufSk7Il0s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
},{}]},{},[1])
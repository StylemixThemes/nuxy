(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Vue.component('date-picker', DatePicker["default"]);
Vue.component('wpcfto_date', {
  props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value'],
  data: function data() {
    return {
      value: '',
      input_value: ''
    };
  },
  mounted: function mounted() {
    this.value = this.field_value;

    if (typeof this.field_value !== 'undefined') {
      this.$set(this, 'input_value', this.field_value);
      this.value = new Date(parseInt(this.field_value));
    }
  },
  template: "\n        <div class=\"wpcfto_generic_field wpcfto_generic_field_flex_input wpcfto_generic_field_date\">\n\n            <wpcfto_fields_aside_before :fields=\"fields\" :field_label=\"field_label\"></wpcfto_fields_aside_before>\n\n            <div class=\"wpcfto-field-content\">\n            \n                <date-picker v-model=\"value\" lang=\"en\" @change=\"dateChanged(value)\"></date-picker>\n    \n                <input type=\"hidden\"\n                    v-bind:name=\"field_name\"\n                    v-bind:placeholder=\"field_label\"\n                    v-bind:id=\"field_id\"\n                    v-model=\"input_value\"\n                />\n            \n            </div>\n\n            <wpcfto_fields_aside_after :fields=\"fields\"></wpcfto_fields_aside_after>\n\n        </div>\n    ",
  methods: {
    dateChanged: function dateChanged(newDate) {
      var unix_time = new Date(newDate + ' UTC').getTime();
      this.$emit('wpcfto-get-value', unix_time);
      this.$set(this, 'input_value', unix_time);
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWdWUiLCJjb21wb25lbnQiLCJEYXRlUGlja2VyIiwicHJvcHMiLCJkYXRhIiwidmFsdWUiLCJpbnB1dF92YWx1ZSIsIm1vdW50ZWQiLCJmaWVsZF92YWx1ZSIsIiRzZXQiLCJEYXRlIiwicGFyc2VJbnQiLCJ0ZW1wbGF0ZSIsIm1ldGhvZHMiLCJkYXRlQ2hhbmdlZCIsIm5ld0RhdGUiLCJ1bml4X3RpbWUiLCJnZXRUaW1lIiwiJGVtaXQiXSwic291cmNlcyI6WyJmYWtlXzM2NjAwYjk3LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5WdWUuY29tcG9uZW50KCdkYXRlLXBpY2tlcicsIERhdGVQaWNrZXJbXCJkZWZhdWx0XCJdKTtcblZ1ZS5jb21wb25lbnQoJ3dwY2Z0b19kYXRlJywge1xuICBwcm9wczogWydmaWVsZHMnLCAnZmllbGRfbGFiZWwnLCAnZmllbGRfbmFtZScsICdmaWVsZF9pZCcsICdmaWVsZF92YWx1ZSddLFxuICBkYXRhOiBmdW5jdGlvbiBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogJycsXG4gICAgICBpbnB1dF92YWx1ZTogJydcbiAgICB9O1xuICB9LFxuICBtb3VudGVkOiBmdW5jdGlvbiBtb3VudGVkKCkge1xuICAgIHRoaXMudmFsdWUgPSB0aGlzLmZpZWxkX3ZhbHVlO1xuXG4gICAgaWYgKHR5cGVvZiB0aGlzLmZpZWxkX3ZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy4kc2V0KHRoaXMsICdpbnB1dF92YWx1ZScsIHRoaXMuZmllbGRfdmFsdWUpO1xuICAgICAgdGhpcy52YWx1ZSA9IG5ldyBEYXRlKHBhcnNlSW50KHRoaXMuZmllbGRfdmFsdWUpKTtcbiAgICB9XG4gIH0sXG4gIHRlbXBsYXRlOiBcIlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvX2dlbmVyaWNfZmllbGQgd3BjZnRvX2dlbmVyaWNfZmllbGRfZmxleF9pbnB1dCB3cGNmdG9fZ2VuZXJpY19maWVsZF9kYXRlXFxcIj5cXG5cXG4gICAgICAgICAgICA8d3BjZnRvX2ZpZWxkc19hc2lkZV9iZWZvcmUgOmZpZWxkcz1cXFwiZmllbGRzXFxcIiA6ZmllbGRfbGFiZWw9XFxcImZpZWxkX2xhYmVsXFxcIj48L3dwY2Z0b19maWVsZHNfYXNpZGVfYmVmb3JlPlxcblxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0by1maWVsZC1jb250ZW50XFxcIj5cXG4gICAgICAgICAgICBcXG4gICAgICAgICAgICAgICAgPGRhdGUtcGlja2VyIHYtbW9kZWw9XFxcInZhbHVlXFxcIiBsYW5nPVxcXCJlblxcXCIgQGNoYW5nZT1cXFwiZGF0ZUNoYW5nZWQodmFsdWUpXFxcIj48L2RhdGUtcGlja2VyPlxcbiAgICBcXG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCJcXG4gICAgICAgICAgICAgICAgICAgIHYtYmluZDpuYW1lPVxcXCJmaWVsZF9uYW1lXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgdi1iaW5kOnBsYWNlaG9sZGVyPVxcXCJmaWVsZF9sYWJlbFxcXCJcXG4gICAgICAgICAgICAgICAgICAgIHYtYmluZDppZD1cXFwiZmllbGRfaWRcXFwiXFxuICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVxcXCJpbnB1dF92YWx1ZVxcXCJcXG4gICAgICAgICAgICAgICAgLz5cXG4gICAgICAgICAgICBcXG4gICAgICAgICAgICA8L2Rpdj5cXG5cXG4gICAgICAgICAgICA8d3BjZnRvX2ZpZWxkc19hc2lkZV9hZnRlciA6ZmllbGRzPVxcXCJmaWVsZHNcXFwiPjwvd3BjZnRvX2ZpZWxkc19hc2lkZV9hZnRlcj5cXG5cXG4gICAgICAgIDwvZGl2PlxcbiAgICBcIixcbiAgbWV0aG9kczoge1xuICAgIGRhdGVDaGFuZ2VkOiBmdW5jdGlvbiBkYXRlQ2hhbmdlZChuZXdEYXRlKSB7XG4gICAgICB2YXIgdW5peF90aW1lID0gbmV3IERhdGUobmV3RGF0ZSArICcgVVRDJykuZ2V0VGltZSgpO1xuICAgICAgdGhpcy4kZW1pdCgnd3BjZnRvLWdldC12YWx1ZScsIHVuaXhfdGltZSk7XG4gICAgICB0aGlzLiRzZXQodGhpcywgJ2lucHV0X3ZhbHVlJywgdW5peF90aW1lKTtcbiAgICB9XG4gIH1cbn0pOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUFBLEdBQUcsQ0FBQ0MsU0FBSixDQUFjLGFBQWQsRUFBNkJDLFVBQVUsQ0FBQyxTQUFELENBQXZDO0FBQ0FGLEdBQUcsQ0FBQ0MsU0FBSixDQUFjLGFBQWQsRUFBNkI7RUFDM0JFLEtBQUssRUFBRSxDQUFDLFFBQUQsRUFBVyxhQUFYLEVBQTBCLFlBQTFCLEVBQXdDLFVBQXhDLEVBQW9ELGFBQXBELENBRG9CO0VBRTNCQyxJQUFJLEVBQUUsU0FBU0EsSUFBVCxHQUFnQjtJQUNwQixPQUFPO01BQ0xDLEtBQUssRUFBRSxFQURGO01BRUxDLFdBQVcsRUFBRTtJQUZSLENBQVA7RUFJRCxDQVAwQjtFQVEzQkMsT0FBTyxFQUFFLFNBQVNBLE9BQVQsR0FBbUI7SUFDMUIsS0FBS0YsS0FBTCxHQUFhLEtBQUtHLFdBQWxCOztJQUVBLElBQUksT0FBTyxLQUFLQSxXQUFaLEtBQTRCLFdBQWhDLEVBQTZDO01BQzNDLEtBQUtDLElBQUwsQ0FBVSxJQUFWLEVBQWdCLGFBQWhCLEVBQStCLEtBQUtELFdBQXBDO01BQ0EsS0FBS0gsS0FBTCxHQUFhLElBQUlLLElBQUosQ0FBU0MsUUFBUSxDQUFDLEtBQUtILFdBQU4sQ0FBakIsQ0FBYjtJQUNEO0VBQ0YsQ0FmMEI7RUFnQjNCSSxRQUFRLEVBQUUsc3lCQWhCaUI7RUFpQjNCQyxPQUFPLEVBQUU7SUFDUEMsV0FBVyxFQUFFLFNBQVNBLFdBQVQsQ0FBcUJDLE9BQXJCLEVBQThCO01BQ3pDLElBQUlDLFNBQVMsR0FBRyxJQUFJTixJQUFKLENBQVNLLE9BQU8sR0FBRyxNQUFuQixFQUEyQkUsT0FBM0IsRUFBaEI7TUFDQSxLQUFLQyxLQUFMLENBQVcsa0JBQVgsRUFBK0JGLFNBQS9CO01BQ0EsS0FBS1AsSUFBTCxDQUFVLElBQVYsRUFBZ0IsYUFBaEIsRUFBK0JPLFNBQS9CO0lBQ0Q7RUFMTTtBQWpCa0IsQ0FBN0IifQ==
},{}]},{},[1])
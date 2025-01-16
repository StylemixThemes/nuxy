(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Vue.component('wpcfto_number', {
  props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value', 'field_data', 'placeholder_text'],
  data: function data() {
    return {
      value: '',
      step: 1
    };
  },
  template: "\n        <div class=\"wpcfto_generic_field wpcfto_generic_field_flex_input wpcfto_generic_field__number\">\n            <wpcfto_fields_aside_before :fields=\"fields\" :field_label=\"field_label\"></wpcfto_fields_aside_before>\n\n            <div class=\"wpcfto-field-content\">\n                <input type=\"number\"\n                    v-bind:name=\"field_name\"\n                    v-bind:placeholder=\"fields.placeholder ? fields.placeholder : placeholder_text\"\n                    v-bind:id=\"field_id\"\n                    :step=\"step\"\n                    v-model=\"value\"\n                />\n            </div>\n\n            <wpcfto_fields_aside_after :fields=\"fields\"></wpcfto_fields_aside_after>\n        </div>\n    ",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJ2YWx1ZSIsInN0ZXAiLCJ0ZW1wbGF0ZSIsIm1vdW50ZWQiLCJmaWVsZF92YWx1ZSIsImZpZWxkX2RhdGEiLCJtZXRob2RzIiwid2F0Y2giLCJfdmFsdWUiLCIkZW1pdCJdLCJzb3VyY2VzIjpbImZha2VfOWVkNzVhNWQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cblZ1ZS5jb21wb25lbnQoJ3dwY2Z0b19udW1iZXInLCB7XG4gIHByb3BzOiBbJ2ZpZWxkcycsICdmaWVsZF9sYWJlbCcsICdmaWVsZF9uYW1lJywgJ2ZpZWxkX2lkJywgJ2ZpZWxkX3ZhbHVlJywgJ2ZpZWxkX2RhdGEnLCAncGxhY2Vob2xkZXJfdGV4dCddLFxuICBkYXRhOiBmdW5jdGlvbiBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogJycsXG4gICAgICBzdGVwOiAxXG4gICAgfTtcbiAgfSxcbiAgdGVtcGxhdGU6IFwiXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9fZ2VuZXJpY19maWVsZCB3cGNmdG9fZ2VuZXJpY19maWVsZF9mbGV4X2lucHV0IHdwY2Z0b19nZW5lcmljX2ZpZWxkX19udW1iZXJcXFwiPlxcbiAgICAgICAgICAgIDx3cGNmdG9fZmllbGRzX2FzaWRlX2JlZm9yZSA6ZmllbGRzPVxcXCJmaWVsZHNcXFwiIDpmaWVsZF9sYWJlbD1cXFwiZmllbGRfbGFiZWxcXFwiPjwvd3BjZnRvX2ZpZWxkc19hc2lkZV9iZWZvcmU+XFxuXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvLWZpZWxkLWNvbnRlbnRcXFwiPlxcbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwibnVtYmVyXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgdi1iaW5kOm5hbWU9XFxcImZpZWxkX25hbWVcXFwiXFxuICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6cGxhY2Vob2xkZXI9XFxcImZpZWxkcy5wbGFjZWhvbGRlciA/IGZpZWxkcy5wbGFjZWhvbGRlciA6IHBsYWNlaG9sZGVyX3RleHRcXFwiXFxuICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6aWQ9XFxcImZpZWxkX2lkXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgOnN0ZXA9XFxcInN0ZXBcXFwiXFxuICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVxcXCJ2YWx1ZVxcXCJcXG4gICAgICAgICAgICAgICAgLz5cXG4gICAgICAgICAgICA8L2Rpdj5cXG5cXG4gICAgICAgICAgICA8d3BjZnRvX2ZpZWxkc19hc2lkZV9hZnRlciA6ZmllbGRzPVxcXCJmaWVsZHNcXFwiPjwvd3BjZnRvX2ZpZWxkc19hc2lkZV9hZnRlcj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICBcIixcbiAgbW91bnRlZDogZnVuY3Rpb24gbW91bnRlZCgpIHtcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5maWVsZF92YWx1ZTtcbiAgICBpZiAodHlwZW9mIHRoaXMuZmllbGRfZGF0YS5zdGVwICE9PSAndW5kZWZpbmVkJykgdGhpcy5zdGVwID0gdGhpcy5maWVsZF9kYXRhLnN0ZXA7XG4gIH0sXG4gIG1ldGhvZHM6IHt9LFxuICB3YXRjaDoge1xuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShfdmFsdWUpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ3dwY2Z0by1nZXQtdmFsdWUnLCBfdmFsdWUpO1xuICAgIH1cbiAgfVxufSk7Il0sIm1hcHBpbmdzIjoiQUFBQSxZQUFZOztBQUVaQSxHQUFHLENBQUNDLFNBQVMsQ0FBQyxlQUFlLEVBQUU7RUFDN0JDLEtBQUssRUFBRSxDQUFDLFFBQVEsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLGtCQUFrQixDQUFDO0VBQzNHQyxJQUFJLEVBQUUsU0FBU0EsSUFBSUEsQ0FBQSxFQUFHO0lBQ3BCLE9BQU87TUFDTEMsS0FBSyxFQUFFLEVBQUU7TUFDVEMsSUFBSSxFQUFFO0lBQ1IsQ0FBQztFQUNILENBQUM7RUFDREMsUUFBUSxFQUFFLHN1QkFBc3VCO0VBQ2h2QkMsT0FBTyxFQUFFLFNBQVNBLE9BQU9BLENBQUEsRUFBRztJQUMxQixJQUFJLENBQUNILEtBQUssR0FBRyxJQUFJLENBQUNJLFdBQVc7SUFDN0IsSUFBSSxPQUFPLElBQUksQ0FBQ0MsVUFBVSxDQUFDSixJQUFJLEtBQUssV0FBVyxFQUFFLElBQUksQ0FBQ0EsSUFBSSxHQUFHLElBQUksQ0FBQ0ksVUFBVSxDQUFDSixJQUFJO0VBQ25GLENBQUM7RUFDREssT0FBTyxFQUFFLENBQUMsQ0FBQztFQUNYQyxLQUFLLEVBQUU7SUFDTFAsS0FBSyxFQUFFLFNBQVNBLEtBQUtBLENBQUNRLE1BQU0sRUFBRTtNQUM1QixJQUFJLENBQUNDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRUQsTUFBTSxDQUFDO0lBQ3hDO0VBQ0Y7QUFDRixDQUFDLENBQUMiLCJpZ25vcmVMaXN0IjpbXX0=
},{}]},{},[1])
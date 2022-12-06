(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Vue.component('vue-trumbowyg', VueTrumbowyg["default"]);
Vue.component('wpcfto_trumbowyg', {
  props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value'],
  data: function data() {
    return {
      value: '',
      content: null,
      config: {
        btns: [
          ['viewHTML'],
          ['undo', 'redo'], // Only supported in Blink browsers
          ['formatting'],
          ['strong', 'em', 'del'],
          ['foreColor', 'backColor'],
          ['link'],
          ['insertImage'],
          ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
          ['unorderedList', 'orderedList'],
          ['horizontalRule'],
          ['removeformat'],
          ['fullscreen']
        ],
      }
    };
  },
  template: "\n        <template>\n            <div>\n                <div class=\"wpcfto_generic_field\">\n                    <div class=\"wpcfto-field-aside\">\n                        <label v-html=\"field_label\" class=\"wpcfto-field-aside__label\"></label>\n                    </div>\n                    <div class=\"wpcfto-field-content\">\n                        <div class=\"hints\">\n                            <span @click=\"enterHint(hint_key)\" v-for=\"(hint_text, hint_key) in fields.hints\">{{hint_text}}</span>\n                        </div>\n                    </div>\n                </div>\n                <vue-trumbowyg v-model=\"value\" :config=\"config\"  class=\"form-control\" name=\"content\">\n                </vue-trumbowyg>\n            </div>\n        </template>",
  mounted: function mounted() {
    if (typeof this.field_value !== 'undefined') {
      this.$set(this, 'value', this.field_value);
    }
  },
  methods: {
    enterHint: function enterHint(hint) {
      this.value += ' {{' + hint + '}}';
    }
  },
  watch: {
    value: function value(_value) {
      this.$emit('wpcfto-get-value', _value);
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWdWUiLCJjb21wb25lbnQiLCJWdWVUcnVtYm93eWciLCJwcm9wcyIsImRhdGEiLCJ2YWx1ZSIsImNvbnRlbnQiLCJjb25maWciLCJ0ZW1wbGF0ZSIsIm1vdW50ZWQiLCJmaWVsZF92YWx1ZSIsIiRzZXQiLCJtZXRob2RzIiwiZW50ZXJIaW50IiwiaGludCIsIndhdGNoIiwiX3ZhbHVlIiwiJGVtaXQiXSwic291cmNlcyI6WyJmYWtlXzk4YzNlZmZiLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5WdWUuY29tcG9uZW50KCd2dWUtdHJ1bWJvd3lnJywgVnVlVHJ1bWJvd3lnW1wiZGVmYXVsdFwiXSk7XG5WdWUuY29tcG9uZW50KCd3cGNmdG9fdHJ1bWJvd3lnJywge1xuICBwcm9wczogWydmaWVsZHMnLCAnZmllbGRfbGFiZWwnLCAnZmllbGRfbmFtZScsICdmaWVsZF9pZCcsICdmaWVsZF92YWx1ZSddLFxuICBkYXRhOiBmdW5jdGlvbiBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogJycsXG4gICAgICBjb250ZW50OiBudWxsLFxuICAgICAgY29uZmlnOiB7fVxuICAgIH07XG4gIH0sXG4gIHRlbXBsYXRlOiBcIlxcbiAgICAgICAgPHRlbXBsYXRlPlxcbiAgICAgICAgICAgIDxkaXY+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0b19nZW5lcmljX2ZpZWxkXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0by1maWVsZC1hc2lkZVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIHYtaHRtbD1cXFwiZmllbGRfbGFiZWxcXFwiIGNsYXNzPVxcXCJ3cGNmdG8tZmllbGQtYXNpZGVfX2xhYmVsXFxcIj48L2xhYmVsPlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG8tZmllbGQtY29udGVudFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiaGludHNcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBAY2xpY2s9XFxcImVudGVySGludChoaW50X2tleSlcXFwiIHYtZm9yPVxcXCIoaGludF90ZXh0LCBoaW50X2tleSkgaW4gZmllbGRzLmhpbnRzXFxcIj57e2hpbnRfdGV4dH19PC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8dnVlLXRydW1ib3d5ZyB2LW1vZGVsPVxcXCJ2YWx1ZVxcXCIgOmNvbmZpZz1cXFwiY29uZmlnXFxcIiAgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgbmFtZT1cXFwiY29udGVudFxcXCI+XFxuICAgICAgICAgICAgICAgIDwvdnVlLXRydW1ib3d5Zz5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvdGVtcGxhdGU+XCIsXG4gIG1vdW50ZWQ6IGZ1bmN0aW9uIG1vdW50ZWQoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmZpZWxkX3ZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy4kc2V0KHRoaXMsICd2YWx1ZScsIHRoaXMuZmllbGRfdmFsdWUpO1xuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGVudGVySGludDogZnVuY3Rpb24gZW50ZXJIaW50KGhpbnQpIHtcbiAgICAgIHRoaXMudmFsdWUgKz0gJyB7eycgKyBoaW50ICsgJ319JztcbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKF92YWx1ZSkge1xuICAgICAgdGhpcy4kZW1pdCgnd3BjZnRvLWdldC12YWx1ZScsIF92YWx1ZSk7XG4gICAgfVxuICB9XG59KTsiXSwibWFwcGluZ3MiOiJBQUFBLFlBQVk7O0FBRVpBLEdBQUcsQ0FBQ0MsU0FBUyxDQUFDLGVBQWUsRUFBRUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3ZERixHQUFHLENBQUNDLFNBQVMsQ0FBQyxrQkFBa0IsRUFBRTtFQUNoQ0UsS0FBSyxFQUFFLENBQUMsUUFBUSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLGFBQWEsQ0FBQztFQUN6RUMsSUFBSSxFQUFFLFNBQVNBLElBQUksR0FBRztJQUNwQixPQUFPO01BQ0xDLEtBQUssRUFBRSxFQUFFO01BQ1RDLE9BQU8sRUFBRSxJQUFJO01BQ2JDLE1BQU0sRUFBRSxDQUFDO0lBQ1gsQ0FBQztFQUNILENBQUM7RUFDREMsUUFBUSxFQUFFLHF4QkFBcXhCO0VBQy94QkMsT0FBTyxFQUFFLFNBQVNBLE9BQU8sR0FBRztJQUMxQixJQUFJLE9BQU8sSUFBSSxDQUFDQyxXQUFXLEtBQUssV0FBVyxFQUFFO01BQzNDLElBQUksQ0FBQ0MsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDRCxXQUFXLENBQUM7SUFDNUM7RUFDRixDQUFDO0VBQ0RFLE9BQU8sRUFBRTtJQUNQQyxTQUFTLEVBQUUsU0FBU0EsU0FBUyxDQUFDQyxJQUFJLEVBQUU7TUFDbEMsSUFBSSxDQUFDVCxLQUFLLElBQUksS0FBSyxHQUFHUyxJQUFJLEdBQUcsSUFBSTtJQUNuQztFQUNGLENBQUM7RUFDREMsS0FBSyxFQUFFO0lBQ0xWLEtBQUssRUFBRSxTQUFTQSxLQUFLLENBQUNXLE1BQU0sRUFBRTtNQUM1QixJQUFJLENBQUNDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRUQsTUFBTSxDQUFDO0lBQ3hDO0VBQ0Y7QUFDRixDQUFDLENBQUMifQ==
},{}]},{},[1])
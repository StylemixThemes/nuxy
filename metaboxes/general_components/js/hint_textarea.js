(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Vue.component('wpcfto_hint_textarea', {
  props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value'],
  data: function data() {
    return {
      value: ''
    };
  },
  template: "\n        <div class=\"wpcfto_generic_field\">\n        \n            <div class=\"wpcfto-field-aside\">\n                <label v-html=\"field_label\" class=\"wpcfto-field-aside__label\"></label>\n            </div>\n            \n            <div class=\"wpcfto-field-content\">\n                <div class=\"hints\">\n                    <span @click=\"enterHint(hint_key)\" v-for=\"(hint_text, hint_key) in fields.hints\">{{hint_text}}</span>\n                </div>\n                \n                <textarea v-bind:name=\"field_name\"\n                          v-bind:placeholder=\"field_label\"\n                          v-bind:id=\"field_id\"\n                          v-model=\"value\">\n                </textarea>\n            </div>\n            \n        </div>\n    ",
  mounted: function mounted() {
    this.value = this.field_value;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJ2YWx1ZSIsInRlbXBsYXRlIiwibW91bnRlZCIsImZpZWxkX3ZhbHVlIiwibWV0aG9kcyIsImVudGVySGludCIsImhpbnQiLCJ3YXRjaCIsIl92YWx1ZSIsIiRlbWl0Il0sInNvdXJjZXMiOlsiZmFrZV8yNWNjZWY5OC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuVnVlLmNvbXBvbmVudCgnd3BjZnRvX2hpbnRfdGV4dGFyZWEnLCB7XG4gIHByb3BzOiBbJ2ZpZWxkcycsICdmaWVsZF9sYWJlbCcsICdmaWVsZF9uYW1lJywgJ2ZpZWxkX2lkJywgJ2ZpZWxkX3ZhbHVlJ10sXG4gIGRhdGE6IGZ1bmN0aW9uIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiAnJ1xuICAgIH07XG4gIH0sXG4gIHRlbXBsYXRlOiBcIlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvX2dlbmVyaWNfZmllbGRcXFwiPlxcbiAgICAgICAgXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvLWZpZWxkLWFzaWRlXFxcIj5cXG4gICAgICAgICAgICAgICAgPGxhYmVsIHYtaHRtbD1cXFwiZmllbGRfbGFiZWxcXFwiIGNsYXNzPVxcXCJ3cGNmdG8tZmllbGQtYXNpZGVfX2xhYmVsXFxcIj48L2xhYmVsPlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIFxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0by1maWVsZC1jb250ZW50XFxcIj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiaGludHNcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gQGNsaWNrPVxcXCJlbnRlckhpbnQoaGludF9rZXkpXFxcIiB2LWZvcj1cXFwiKGhpbnRfdGV4dCwgaGludF9rZXkpIGluIGZpZWxkcy5oaW50c1xcXCI+e3toaW50X3RleHR9fTwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIFxcbiAgICAgICAgICAgICAgICA8dGV4dGFyZWEgdi1iaW5kOm5hbWU9XFxcImZpZWxkX25hbWVcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6cGxhY2Vob2xkZXI9XFxcImZpZWxkX2xhYmVsXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdi1iaW5kOmlkPVxcXCJmaWVsZF9pZFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XFxcInZhbHVlXFxcIj5cXG4gICAgICAgICAgICAgICAgPC90ZXh0YXJlYT5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICBcXG4gICAgICAgIDwvZGl2PlxcbiAgICBcIixcbiAgbW91bnRlZDogZnVuY3Rpb24gbW91bnRlZCgpIHtcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5maWVsZF92YWx1ZTtcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGVudGVySGludDogZnVuY3Rpb24gZW50ZXJIaW50KGhpbnQpIHtcbiAgICAgIHRoaXMudmFsdWUgKz0gJyB7eycgKyBoaW50ICsgJ319JztcbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKF92YWx1ZSkge1xuICAgICAgdGhpcy4kZW1pdCgnd3BjZnRvLWdldC12YWx1ZScsIF92YWx1ZSk7XG4gICAgfVxuICB9XG59KTsiXSwibWFwcGluZ3MiOiJBQUFBLFlBQVk7O0FBRVpBLEdBQUcsQ0FBQ0MsU0FBUyxDQUFDLHNCQUFzQixFQUFFO0VBQ3BDQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsYUFBYSxDQUFDO0VBQ3pFQyxJQUFJLEVBQUUsU0FBU0EsSUFBSUEsQ0FBQSxFQUFHO0lBQ3BCLE9BQU87TUFDTEMsS0FBSyxFQUFFO0lBQ1QsQ0FBQztFQUNILENBQUM7RUFDREMsUUFBUSxFQUFFLG14QkFBbXhCO0VBQzd4QkMsT0FBTyxFQUFFLFNBQVNBLE9BQU9BLENBQUEsRUFBRztJQUMxQixJQUFJLENBQUNGLEtBQUssR0FBRyxJQUFJLENBQUNHLFdBQVc7RUFDL0IsQ0FBQztFQUNEQyxPQUFPLEVBQUU7SUFDUEMsU0FBUyxFQUFFLFNBQVNBLFNBQVNBLENBQUNDLElBQUksRUFBRTtNQUNsQyxJQUFJLENBQUNOLEtBQUssSUFBSSxLQUFLLEdBQUdNLElBQUksR0FBRyxJQUFJO0lBQ25DO0VBQ0YsQ0FBQztFQUNEQyxLQUFLLEVBQUU7SUFDTFAsS0FBSyxFQUFFLFNBQVNBLEtBQUtBLENBQUNRLE1BQU0sRUFBRTtNQUM1QixJQUFJLENBQUNDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRUQsTUFBTSxDQUFDO0lBQ3hDO0VBQ0Y7QUFDRixDQUFDLENBQUMiLCJpZ25vcmVMaXN0IjpbXX0=
},{}]},{},[1])
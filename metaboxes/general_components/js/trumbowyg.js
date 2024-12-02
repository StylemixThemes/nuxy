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
        btns: [['viewHTML'], ['undo', 'redo'], // Only supported in Blink browsers
        ['formatting'], ['strong', 'em', 'del'], ['foreColor', 'backColor'], ['link'], ['insertImage'], ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'], ['unorderedList', 'orderedList'], ['horizontalRule'], ['removeformat'], ['fullscreen']]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWdWUiLCJjb21wb25lbnQiLCJWdWVUcnVtYm93eWciLCJwcm9wcyIsImRhdGEiLCJ2YWx1ZSIsImNvbnRlbnQiLCJjb25maWciLCJidG5zIiwidGVtcGxhdGUiLCJtb3VudGVkIiwiZmllbGRfdmFsdWUiLCIkc2V0IiwibWV0aG9kcyIsImVudGVySGludCIsImhpbnQiLCJ3YXRjaCIsIl92YWx1ZSIsIiRlbWl0Il0sInNvdXJjZXMiOlsiZmFrZV9jMmI3ZWM5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5WdWUuY29tcG9uZW50KCd2dWUtdHJ1bWJvd3lnJywgVnVlVHJ1bWJvd3lnW1wiZGVmYXVsdFwiXSk7XG5WdWUuY29tcG9uZW50KCd3cGNmdG9fdHJ1bWJvd3lnJywge1xuICBwcm9wczogWydmaWVsZHMnLCAnZmllbGRfbGFiZWwnLCAnZmllbGRfbmFtZScsICdmaWVsZF9pZCcsICdmaWVsZF92YWx1ZSddLFxuICBkYXRhOiBmdW5jdGlvbiBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogJycsXG4gICAgICBjb250ZW50OiBudWxsLFxuICAgICAgY29uZmlnOiB7XG4gICAgICAgIGJ0bnM6IFtbJ3ZpZXdIVE1MJ10sIFsndW5kbycsICdyZWRvJ10sIC8vIE9ubHkgc3VwcG9ydGVkIGluIEJsaW5rIGJyb3dzZXJzXG4gICAgICAgIFsnZm9ybWF0dGluZyddLCBbJ3N0cm9uZycsICdlbScsICdkZWwnXSwgWydmb3JlQ29sb3InLCAnYmFja0NvbG9yJ10sIFsnbGluayddLCBbJ2luc2VydEltYWdlJ10sIFsnanVzdGlmeUxlZnQnLCAnanVzdGlmeUNlbnRlcicsICdqdXN0aWZ5UmlnaHQnLCAnanVzdGlmeUZ1bGwnXSwgWyd1bm9yZGVyZWRMaXN0JywgJ29yZGVyZWRMaXN0J10sIFsnaG9yaXpvbnRhbFJ1bGUnXSwgWydyZW1vdmVmb3JtYXQnXSwgWydmdWxsc2NyZWVuJ11dXG4gICAgICB9XG4gICAgfTtcbiAgfSxcbiAgdGVtcGxhdGU6IFwiXFxuICAgICAgICA8dGVtcGxhdGU+XFxuICAgICAgICAgICAgPGRpdj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvX2dlbmVyaWNfZmllbGRcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvLWZpZWxkLWFzaWRlXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgdi1odG1sPVxcXCJmaWVsZF9sYWJlbFxcXCIgY2xhc3M9XFxcIndwY2Z0by1maWVsZC1hc2lkZV9fbGFiZWxcXFwiPjwvbGFiZWw+XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0by1maWVsZC1jb250ZW50XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJoaW50c1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIEBjbGljaz1cXFwiZW50ZXJIaW50KGhpbnRfa2V5KVxcXCIgdi1mb3I9XFxcIihoaW50X3RleHQsIGhpbnRfa2V5KSBpbiBmaWVsZHMuaGludHNcXFwiPnt7aGludF90ZXh0fX08L3NwYW4+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDx2dWUtdHJ1bWJvd3lnIHYtbW9kZWw9XFxcInZhbHVlXFxcIiA6Y29uZmlnPVxcXCJjb25maWdcXFwiICBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIiBuYW1lPVxcXCJjb250ZW50XFxcIj5cXG4gICAgICAgICAgICAgICAgPC92dWUtdHJ1bWJvd3lnPlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC90ZW1wbGF0ZT5cIixcbiAgbW91bnRlZDogZnVuY3Rpb24gbW91bnRlZCgpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuZmllbGRfdmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLiRzZXQodGhpcywgJ3ZhbHVlJywgdGhpcy5maWVsZF92YWx1ZSk7XG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgZW50ZXJIaW50OiBmdW5jdGlvbiBlbnRlckhpbnQoaGludCkge1xuICAgICAgdGhpcy52YWx1ZSArPSAnIHt7JyArIGhpbnQgKyAnfX0nO1xuICAgIH1cbiAgfSxcbiAgd2F0Y2g6IHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoX3ZhbHVlKSB7XG4gICAgICB0aGlzLiRlbWl0KCd3cGNmdG8tZ2V0LXZhbHVlJywgX3ZhbHVlKTtcbiAgICB9XG4gIH1cbn0pOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUFBLEdBQUcsQ0FBQ0MsU0FBSixDQUFjLGVBQWQsRUFBK0JDLFlBQVksQ0FBQyxTQUFELENBQTNDO0FBQ0FGLEdBQUcsQ0FBQ0MsU0FBSixDQUFjLGtCQUFkLEVBQWtDO0VBQ2hDRSxLQUFLLEVBQUUsQ0FBQyxRQUFELEVBQVcsYUFBWCxFQUEwQixZQUExQixFQUF3QyxVQUF4QyxFQUFvRCxhQUFwRCxDQUR5QjtFQUVoQ0MsSUFBSSxFQUFFLFNBQVNBLElBQVQsR0FBZ0I7SUFDcEIsT0FBTztNQUNMQyxLQUFLLEVBQUUsRUFERjtNQUVMQyxPQUFPLEVBQUUsSUFGSjtNQUdMQyxNQUFNLEVBQUU7UUFDTkMsSUFBSSxFQUFFLENBQUMsQ0FBQyxVQUFELENBQUQsRUFBZSxDQUFDLE1BQUQsRUFBUyxNQUFULENBQWYsRUFBaUM7UUFDdkMsQ0FBQyxZQUFELENBRE0sRUFDVSxDQUFDLFFBQUQsRUFBVyxJQUFYLEVBQWlCLEtBQWpCLENBRFYsRUFDbUMsQ0FBQyxXQUFELEVBQWMsV0FBZCxDQURuQyxFQUMrRCxDQUFDLE1BQUQsQ0FEL0QsRUFDeUUsQ0FBQyxhQUFELENBRHpFLEVBQzBGLENBQUMsYUFBRCxFQUFnQixlQUFoQixFQUFpQyxjQUFqQyxFQUFpRCxhQUFqRCxDQUQxRixFQUMySixDQUFDLGVBQUQsRUFBa0IsYUFBbEIsQ0FEM0osRUFDNkwsQ0FBQyxnQkFBRCxDQUQ3TCxFQUNpTixDQUFDLGNBQUQsQ0FEak4sRUFDbU8sQ0FBQyxZQUFELENBRG5PO01BREE7SUFISCxDQUFQO0VBUUQsQ0FYK0I7RUFZaENDLFFBQVEsRUFBRSxxeEJBWnNCO0VBYWhDQyxPQUFPLEVBQUUsU0FBU0EsT0FBVCxHQUFtQjtJQUMxQixJQUFJLE9BQU8sS0FBS0MsV0FBWixLQUE0QixXQUFoQyxFQUE2QztNQUMzQyxLQUFLQyxJQUFMLENBQVUsSUFBVixFQUFnQixPQUFoQixFQUF5QixLQUFLRCxXQUE5QjtJQUNEO0VBQ0YsQ0FqQitCO0VBa0JoQ0UsT0FBTyxFQUFFO0lBQ1BDLFNBQVMsRUFBRSxTQUFTQSxTQUFULENBQW1CQyxJQUFuQixFQUF5QjtNQUNsQyxLQUFLVixLQUFMLElBQWMsUUFBUVUsSUFBUixHQUFlLElBQTdCO0lBQ0Q7RUFITSxDQWxCdUI7RUF1QmhDQyxLQUFLLEVBQUU7SUFDTFgsS0FBSyxFQUFFLFNBQVNBLEtBQVQsQ0FBZVksTUFBZixFQUF1QjtNQUM1QixLQUFLQyxLQUFMLENBQVcsa0JBQVgsRUFBK0JELE1BQS9CO0lBQ0Q7RUFISTtBQXZCeUIsQ0FBbEMifQ==
},{}]},{},[1])
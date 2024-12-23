(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Vue.component('wpcfto_fields_aside_before', {
  props: ['fields', 'field_label'],
  data: function data() {
    return {
      fields: {}
    };
  },
  computed: {
    previewLabel: function previewLabel() {
      return typeof wpcfto_global_settings !== 'undefined' && wpcfto_global_settings.translations ? wpcfto_global_settings.translations.preview : 'Preview';
    }
  },
  template: "\n        <div class=\"wpcfto-field-aside\" v-if=\"field_label || fields.preview || fields.description || fields.hint\">\n            <label v-html=\"field_label\" class=\"wpcfto-field-aside__label\"></label>\n\n            <div v-if=\"fields && fields.hint\" class=\"wpcfto_field_hint text\">\n                <i class=\"fa fa-info-circle\"></i><div v-html=\"fields.hint\" class=\"hint\"></div>\n            </div>\n                     \n            <div\n            v-if=\"fields && fields.preview\"\n            class=\"wpcfto_preview\"><span class=\"wpcfto_preview__text\">{{ previewLabel }}</span><span\n            class=\"wpcfto_preview__popup\"><img\n            :src=\"fields.preview\" /></span></div>\n            \n            <div v-if=\"fields && fields.description\" v-html=\"fields.description\" class=\"wpcfto-field-description wpcfto-field-description__before description\"></div>\n        </div>\n    "
});
Vue.component('wpcfto_fields_aside_after', {
  props: ['fields', 'field_data'],
  data: function data() {
    return {
      fields: {}
    };
  },
  template: " \n        <div>&nbsp</div>\n"
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJmaWVsZHMiLCJjb21wdXRlZCIsInByZXZpZXdMYWJlbCIsIndwY2Z0b19nbG9iYWxfc2V0dGluZ3MiLCJ0cmFuc2xhdGlvbnMiLCJwcmV2aWV3IiwidGVtcGxhdGUiXSwic291cmNlcyI6WyJmYWtlX2Y5YzgwMTZlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5WdWUuY29tcG9uZW50KCd3cGNmdG9fZmllbGRzX2FzaWRlX2JlZm9yZScsIHtcbiAgcHJvcHM6IFsnZmllbGRzJywgJ2ZpZWxkX2xhYmVsJ10sXG4gIGRhdGE6IGZ1bmN0aW9uIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGZpZWxkczoge31cbiAgICB9O1xuICB9LFxuICBjb21wdXRlZDoge1xuICAgIHByZXZpZXdMYWJlbDogZnVuY3Rpb24gcHJldmlld0xhYmVsKCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB3cGNmdG9fZ2xvYmFsX3NldHRpbmdzICE9PSAndW5kZWZpbmVkJyAmJiB3cGNmdG9fZ2xvYmFsX3NldHRpbmdzLnRyYW5zbGF0aW9ucyA/IHdwY2Z0b19nbG9iYWxfc2V0dGluZ3MudHJhbnNsYXRpb25zLnByZXZpZXcgOiAnUHJldmlldyc7XG4gICAgfVxuICB9LFxuICB0ZW1wbGF0ZTogXCJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0by1maWVsZC1hc2lkZVxcXCIgdi1pZj1cXFwiZmllbGRfbGFiZWwgfHwgZmllbGRzLnByZXZpZXcgfHwgZmllbGRzLmRlc2NyaXB0aW9uIHx8IGZpZWxkcy5oaW50XFxcIj5cXG4gICAgICAgICAgICA8bGFiZWwgdi1odG1sPVxcXCJmaWVsZF9sYWJlbFxcXCIgY2xhc3M9XFxcIndwY2Z0by1maWVsZC1hc2lkZV9fbGFiZWxcXFwiPjwvbGFiZWw+XFxuXFxuICAgICAgICAgICAgPGRpdiB2LWlmPVxcXCJmaWVsZHMgJiYgZmllbGRzLmhpbnRcXFwiIGNsYXNzPVxcXCJ3cGNmdG9fZmllbGRfaGludCB0ZXh0XFxcIj5cXG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XFxcImZhIGZhLWluZm8tY2lyY2xlXFxcIj48L2k+PGRpdiB2LWh0bWw9XFxcImZpZWxkcy5oaW50XFxcIiBjbGFzcz1cXFwiaGludFxcXCI+PC9kaXY+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgXFxuICAgICAgICAgICAgPGRpdlxcbiAgICAgICAgICAgIHYtaWY9XFxcImZpZWxkcyAmJiBmaWVsZHMucHJldmlld1xcXCJcXG4gICAgICAgICAgICBjbGFzcz1cXFwid3BjZnRvX3ByZXZpZXdcXFwiPjxzcGFuIGNsYXNzPVxcXCJ3cGNmdG9fcHJldmlld19fdGV4dFxcXCI+e3sgcHJldmlld0xhYmVsIH19PC9zcGFuPjxzcGFuXFxuICAgICAgICAgICAgY2xhc3M9XFxcIndwY2Z0b19wcmV2aWV3X19wb3B1cFxcXCI+PGltZ1xcbiAgICAgICAgICAgIDpzcmM9XFxcImZpZWxkcy5wcmV2aWV3XFxcIiAvPjwvc3Bhbj48L2Rpdj5cXG4gICAgICAgICAgICBcXG4gICAgICAgICAgICA8ZGl2IHYtaWY9XFxcImZpZWxkcyAmJiBmaWVsZHMuZGVzY3JpcHRpb25cXFwiIHYtaHRtbD1cXFwiZmllbGRzLmRlc2NyaXB0aW9uXFxcIiBjbGFzcz1cXFwid3BjZnRvLWZpZWxkLWRlc2NyaXB0aW9uIHdwY2Z0by1maWVsZC1kZXNjcmlwdGlvbl9fYmVmb3JlIGRlc2NyaXB0aW9uXFxcIj48L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICBcIlxufSk7XG5WdWUuY29tcG9uZW50KCd3cGNmdG9fZmllbGRzX2FzaWRlX2FmdGVyJywge1xuICBwcm9wczogWydmaWVsZHMnLCAnZmllbGRfZGF0YSddLFxuICBkYXRhOiBmdW5jdGlvbiBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBmaWVsZHM6IHt9XG4gICAgfTtcbiAgfSxcbiAgdGVtcGxhdGU6IFwiIFxcbiAgICAgICAgPGRpdj4mbmJzcDwvZGl2PlxcblwiXG59KTsiXSwibWFwcGluZ3MiOiJBQUFBLFlBQVk7O0FBRVpBLEdBQUcsQ0FBQ0MsU0FBUyxDQUFDLDRCQUE0QixFQUFFO0VBQzFDQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDO0VBQ2hDQyxJQUFJLEVBQUUsU0FBU0EsSUFBSUEsQ0FBQSxFQUFHO0lBQ3BCLE9BQU87TUFDTEMsTUFBTSxFQUFFLENBQUM7SUFDWCxDQUFDO0VBQ0gsQ0FBQztFQUNEQyxRQUFRLEVBQUU7SUFDUkMsWUFBWSxFQUFFLFNBQVNBLFlBQVlBLENBQUEsRUFBRztNQUNwQyxPQUFPLE9BQU9DLHNCQUFzQixLQUFLLFdBQVcsSUFBSUEsc0JBQXNCLENBQUNDLFlBQVksR0FBR0Qsc0JBQXNCLENBQUNDLFlBQVksQ0FBQ0MsT0FBTyxHQUFHLFNBQVM7SUFDdko7RUFDRixDQUFDO0VBQ0RDLFFBQVEsRUFBRTtBQUNaLENBQUMsQ0FBQztBQUNGVixHQUFHLENBQUNDLFNBQVMsQ0FBQywyQkFBMkIsRUFBRTtFQUN6Q0MsS0FBSyxFQUFFLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQztFQUMvQkMsSUFBSSxFQUFFLFNBQVNBLElBQUlBLENBQUEsRUFBRztJQUNwQixPQUFPO01BQ0xDLE1BQU0sRUFBRSxDQUFDO0lBQ1gsQ0FBQztFQUNILENBQUM7RUFDRE0sUUFBUSxFQUFFO0FBQ1osQ0FBQyxDQUFDIiwiaWdub3JlTGlzdCI6W119
},{}]},{},[1])
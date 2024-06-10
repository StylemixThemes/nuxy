(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Vue.component('wpcfto_notification_message', {
  props: ['fields', 'field_name', 'field_id', 'field_value'],
  data: function data() {
    return {
      value: '',
      mount_status: false
    };
  },
  template: "\n        <div class=\"wpcfto_generic_field wpcfto_generic_field__notice\" v-bind:class=\"field_name\" v-bind:data-notice=\"field_name\">\n            <div class=\"wpcfto_generic_field__notice_info\">\n                <div v-if=\"fields.image\" class=\"notice_icon\"><img :src=\"fields.image\" width=\"80\" height=\"80\" /></div>\n                <div v-if=\"fields.icon\" class=\"notice_icon\"><i :class=\"fields.icon\"></i></div>\n                <div v-if=\"fields.description\" v-html=\"fields.description\" class=\"field-description description\"></div>\n            </div>\n            <div v-if=\"fields.buttons\" class=\"wpcfto_generic_field__notice_button_box\">\n                <a v-for=\"(button) in fields.buttons\" v-if=\"button.url || button.text\" :href=\"button.url\" class=\"button\" :class=\"button.class\" target=\"_blank\" rel=\"nofollow\">{{ button.text }}</a>\n            </div>\n        </div>\n    "
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJ2YWx1ZSIsIm1vdW50X3N0YXR1cyIsInRlbXBsYXRlIl0sInNvdXJjZXMiOlsiZmFrZV9kNzNiNzQzYy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuVnVlLmNvbXBvbmVudCgnd3BjZnRvX25vdGlmaWNhdGlvbl9tZXNzYWdlJywge1xuICBwcm9wczogWydmaWVsZHMnLCAnZmllbGRfbmFtZScsICdmaWVsZF9pZCcsICdmaWVsZF92YWx1ZSddLFxuICBkYXRhOiBmdW5jdGlvbiBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogJycsXG4gICAgICBtb3VudF9zdGF0dXM6IGZhbHNlXG4gICAgfTtcbiAgfSxcbiAgdGVtcGxhdGU6IFwiXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9fZ2VuZXJpY19maWVsZCB3cGNmdG9fZ2VuZXJpY19maWVsZF9fbm90aWNlXFxcIiB2LWJpbmQ6Y2xhc3M9XFxcImZpZWxkX25hbWVcXFwiIHYtYmluZDpkYXRhLW5vdGljZT1cXFwiZmllbGRfbmFtZVxcXCI+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvX2dlbmVyaWNfZmllbGRfX25vdGljZV9pbmZvXFxcIj5cXG4gICAgICAgICAgICAgICAgPGRpdiB2LWlmPVxcXCJmaWVsZHMuaW1hZ2VcXFwiIGNsYXNzPVxcXCJub3RpY2VfaWNvblxcXCI+PGltZyA6c3JjPVxcXCJmaWVsZHMuaW1hZ2VcXFwiIHdpZHRoPVxcXCI4MFxcXCIgaGVpZ2h0PVxcXCI4MFxcXCIgLz48L2Rpdj5cXG4gICAgICAgICAgICAgICAgPGRpdiB2LWlmPVxcXCJmaWVsZHMuaWNvblxcXCIgY2xhc3M9XFxcIm5vdGljZV9pY29uXFxcIj48aSA6Y2xhc3M9XFxcImZpZWxkcy5pY29uXFxcIj48L2k+PC9kaXY+XFxuICAgICAgICAgICAgICAgIDxkaXYgdi1pZj1cXFwiZmllbGRzLmRlc2NyaXB0aW9uXFxcIiB2LWh0bWw9XFxcImZpZWxkcy5kZXNjcmlwdGlvblxcXCIgY2xhc3M9XFxcImZpZWxkLWRlc2NyaXB0aW9uIGRlc2NyaXB0aW9uXFxcIj48L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IHYtaWY9XFxcImZpZWxkcy5idXR0b25zXFxcIiBjbGFzcz1cXFwid3BjZnRvX2dlbmVyaWNfZmllbGRfX25vdGljZV9idXR0b25fYm94XFxcIj5cXG4gICAgICAgICAgICAgICAgPGEgdi1mb3I9XFxcIihidXR0b24pIGluIGZpZWxkcy5idXR0b25zXFxcIiB2LWlmPVxcXCJidXR0b24udXJsIHx8IGJ1dHRvbi50ZXh0XFxcIiA6aHJlZj1cXFwiYnV0dG9uLnVybFxcXCIgY2xhc3M9XFxcImJ1dHRvblxcXCIgOmNsYXNzPVxcXCJidXR0b24uY2xhc3NcXFwiIHRhcmdldD1cXFwiX2JsYW5rXFxcIiByZWw9XFxcIm5vZm9sbG93XFxcIj57eyBidXR0b24udGV4dCB9fTwvYT5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICBcIlxufSk7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQUEsR0FBRyxDQUFDQyxTQUFKLENBQWMsNkJBQWQsRUFBNkM7RUFDM0NDLEtBQUssRUFBRSxDQUFDLFFBQUQsRUFBVyxZQUFYLEVBQXlCLFVBQXpCLEVBQXFDLGFBQXJDLENBRG9DO0VBRTNDQyxJQUFJLEVBQUUsU0FBU0EsSUFBVCxHQUFnQjtJQUNwQixPQUFPO01BQ0xDLEtBQUssRUFBRSxFQURGO01BRUxDLFlBQVksRUFBRTtJQUZULENBQVA7RUFJRCxDQVAwQztFQVEzQ0MsUUFBUSxFQUFFO0FBUmlDLENBQTdDIn0=
},{}]},{},[1])
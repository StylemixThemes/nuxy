(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Vue.component('wpcfto_regenerate_fonts', {
  data: function data() {
    return {
      translations: wpcfto_global_settings['translations'],
      loading: false
    };
  },
  template: "\n      <div class=\"wpcfto_regenerate_fonts\">\n        <div class=\"wpcfto_generic_field wpcfto_generic_field_flex_input wpcfto_generic_field_regenerate_fonts\">\n          <label v-html=\"translations.regenerate_fonts_title\"></label>\n          <p v-html=\"translations.regenerate_fonts_notice\"></p>\n          <a href=\"#\" v-bind:class=\"{'loading': loading}\" class=\"button\" @click.prevent=\"regenerateFonts\">\n            <span>{{ translations.regenerate_fonts_btn }}</span>\n            <i class=\"lnr lnr-sync\"></i>\n          </a>\n        </div>\n      </div>\n    ",
  methods: {
    regenerateFonts: function regenerateFonts() {
      var vm = this;
      vm.loading = true;
      var url = stm_wpcfto_ajaxurl + '?action=wpcfto_regenerate_fonts&nonce=' + stm_wpcfto_nonces['wpcfto_regenerate_fonts'];
      this.$http.post(url).then(function (response) {
        var _response$data;

        vm.loading = false;

        if (response !== null && response !== void 0 && (_response$data = response.data) !== null && _response$data !== void 0 && _response$data.reload) {
          location.reload();
        }
      });
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWdWUiLCJjb21wb25lbnQiLCJkYXRhIiwidHJhbnNsYXRpb25zIiwid3BjZnRvX2dsb2JhbF9zZXR0aW5ncyIsImxvYWRpbmciLCJ0ZW1wbGF0ZSIsIm1ldGhvZHMiLCJyZWdlbmVyYXRlRm9udHMiLCJ2bSIsInVybCIsInN0bV93cGNmdG9fYWpheHVybCIsInN0bV93cGNmdG9fbm9uY2VzIiwiJGh0dHAiLCJwb3N0IiwidGhlbiIsInJlc3BvbnNlIiwiX3Jlc3BvbnNlJGRhdGEiLCJyZWxvYWQiLCJsb2NhdGlvbiJdLCJzb3VyY2VzIjpbImZha2VfNWQ4NTJkZDAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cblZ1ZS5jb21wb25lbnQoJ3dwY2Z0b19yZWdlbmVyYXRlX2ZvbnRzJywge1xuICBkYXRhOiBmdW5jdGlvbiBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0cmFuc2xhdGlvbnM6IHdwY2Z0b19nbG9iYWxfc2V0dGluZ3NbJ3RyYW5zbGF0aW9ucyddLFxuICAgICAgbG9hZGluZzogZmFsc2VcbiAgICB9O1xuICB9LFxuICB0ZW1wbGF0ZTogXCJcXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9fcmVnZW5lcmF0ZV9mb250c1xcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9fZ2VuZXJpY19maWVsZCB3cGNmdG9fZ2VuZXJpY19maWVsZF9mbGV4X2lucHV0IHdwY2Z0b19nZW5lcmljX2ZpZWxkX3JlZ2VuZXJhdGVfZm9udHNcXFwiPlxcbiAgICAgICAgICA8bGFiZWwgdi1odG1sPVxcXCJ0cmFuc2xhdGlvbnMucmVnZW5lcmF0ZV9mb250c190aXRsZVxcXCI+PC9sYWJlbD5cXG4gICAgICAgICAgPHAgdi1odG1sPVxcXCJ0cmFuc2xhdGlvbnMucmVnZW5lcmF0ZV9mb250c19ub3RpY2VcXFwiPjwvcD5cXG4gICAgICAgICAgPGEgaHJlZj1cXFwiI1xcXCIgdi1iaW5kOmNsYXNzPVxcXCJ7J2xvYWRpbmcnOiBsb2FkaW5nfVxcXCIgY2xhc3M9XFxcImJ1dHRvblxcXCIgQGNsaWNrLnByZXZlbnQ9XFxcInJlZ2VuZXJhdGVGb250c1xcXCI+XFxuICAgICAgICAgICAgPHNwYW4+e3sgdHJhbnNsYXRpb25zLnJlZ2VuZXJhdGVfZm9udHNfYnRuIH19PC9zcGFuPlxcbiAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJsbnIgbG5yLXN5bmNcXFwiPjwvaT5cXG4gICAgICAgICAgPC9hPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuICAgIFwiLFxuICBtZXRob2RzOiB7XG4gICAgcmVnZW5lcmF0ZUZvbnRzOiBmdW5jdGlvbiByZWdlbmVyYXRlRm9udHMoKSB7XG4gICAgICB2YXIgdm0gPSB0aGlzO1xuICAgICAgdm0ubG9hZGluZyA9IHRydWU7XG4gICAgICB2YXIgdXJsID0gc3RtX3dwY2Z0b19hamF4dXJsICsgJz9hY3Rpb249d3BjZnRvX3JlZ2VuZXJhdGVfZm9udHMmbm9uY2U9JyArIHN0bV93cGNmdG9fbm9uY2VzWyd3cGNmdG9fcmVnZW5lcmF0ZV9mb250cyddO1xuICAgICAgdGhpcy4kaHR0cC5wb3N0KHVybCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgdmFyIF9yZXNwb25zZSRkYXRhO1xuXG4gICAgICAgIHZtLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICBpZiAocmVzcG9uc2UgIT09IG51bGwgJiYgcmVzcG9uc2UgIT09IHZvaWQgMCAmJiAoX3Jlc3BvbnNlJGRhdGEgPSByZXNwb25zZS5kYXRhKSAhPT0gbnVsbCAmJiBfcmVzcG9uc2UkZGF0YSAhPT0gdm9pZCAwICYmIF9yZXNwb25zZSRkYXRhLnJlbG9hZCkge1xuICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn0pOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUFBLEdBQUcsQ0FBQ0MsU0FBSixDQUFjLHlCQUFkLEVBQXlDO0VBQ3ZDQyxJQUFJLEVBQUUsU0FBU0EsSUFBVCxHQUFnQjtJQUNwQixPQUFPO01BQ0xDLFlBQVksRUFBRUMsc0JBQXNCLENBQUMsY0FBRCxDQUQvQjtNQUVMQyxPQUFPLEVBQUU7SUFGSixDQUFQO0VBSUQsQ0FOc0M7RUFPdkNDLFFBQVEsRUFBRSx3a0JBUDZCO0VBUXZDQyxPQUFPLEVBQUU7SUFDUEMsZUFBZSxFQUFFLFNBQVNBLGVBQVQsR0FBMkI7TUFDMUMsSUFBSUMsRUFBRSxHQUFHLElBQVQ7TUFDQUEsRUFBRSxDQUFDSixPQUFILEdBQWEsSUFBYjtNQUNBLElBQUlLLEdBQUcsR0FBR0Msa0JBQWtCLEdBQUcsd0NBQXJCLEdBQWdFQyxpQkFBaUIsQ0FBQyx5QkFBRCxDQUEzRjtNQUNBLEtBQUtDLEtBQUwsQ0FBV0MsSUFBWCxDQUFnQkosR0FBaEIsRUFBcUJLLElBQXJCLENBQTBCLFVBQVVDLFFBQVYsRUFBb0I7UUFDNUMsSUFBSUMsY0FBSjs7UUFFQVIsRUFBRSxDQUFDSixPQUFILEdBQWEsS0FBYjs7UUFFQSxJQUFJVyxRQUFRLEtBQUssSUFBYixJQUFxQkEsUUFBUSxLQUFLLEtBQUssQ0FBdkMsSUFBNEMsQ0FBQ0MsY0FBYyxHQUFHRCxRQUFRLENBQUNkLElBQTNCLE1BQXFDLElBQWpGLElBQXlGZSxjQUFjLEtBQUssS0FBSyxDQUFqSCxJQUFzSEEsY0FBYyxDQUFDQyxNQUF6SSxFQUFpSjtVQUMvSUMsUUFBUSxDQUFDRCxNQUFUO1FBQ0Q7TUFDRixDQVJEO0lBU0Q7RUFkTTtBQVI4QixDQUF6QyJ9
},{}]},{},[1])
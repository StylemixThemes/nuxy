(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Vue.component('fonts_download_settings', {
  props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value', 'option_id'],
  data: function data() {
    return {
      translations: wpcfto_global_settings['translations'],
      loading: false,
      value: '',
      regenerate_texts: {
        label: wpcfto_global_settings['translations'].regenerate_fonts_title,
        description: wpcfto_global_settings['translations'].regenerate_fonts_notice
      },
      fonts_download_setting_texts: {
        label: wpcfto_global_settings['translations'].fonts_download_setting_label,
        description: wpcfto_global_settings['translations'].fonts_download_setting_description
      }
    };
  },
  template: "\n        <div class=\"wpcfto_fonts_download_settings\">\n            <div class=\"wpcfto_enable_fonts\">\n                <div class=\"wpcfto_generic_field wpcfto_generic_checkbox wpcfto_generic_field_regenerate_fonts\">\n                    <wpcfto_fields_aside_before :fields=\"fonts_download_setting_texts\" :field_label=\"fonts_download_setting_texts.label\"></wpcfto_fields_aside_before>\n                    <div class=\"wpcfto-field-content\">\n                        <div class=\"wpcfto-admin-checkbox wpcfto_enable_fonts_checkbox\">\n                            <label>\n                                <div class=\"wpcfto-admin-checkbox-wrapper is_toggle\" v-bind:class=\"{'active' : value}\">\n                                    <div class=\"wpcfto-checkbox-switcher\"></div>\n                                    <input type=\"checkbox\"\n                                           :name=\"field_name\"\n                                           v-bind:id=\"field_id\"\n                                           v-model=\"value\"\n                                    />\n                                </div>\n                            </label>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div v-show=\"value\" class=\"wpcfto_regenerate_fonts_field\">\n                <div class=\"wpcfto_generic_field wpcfto_generic_field_flex_input wpcfto_generic_field_regenerate_fonts\">\n                    <wpcfto_fields_aside_before :fields=\"regenerate_texts\" :field_label=\"regenerate_texts.label\"></wpcfto_fields_aside_before>\n                    <a href=\"#\" v-bind:class=\"{'loading': loading}\" class=\"button\" @click.prevent=\"regenerateFonts\">\n                        <span>{{ translations.regenerate_fonts_btn }}</span>\n                        <i class=\"lnr lnr-sync\"></i>\n                    </a>\n                </div>\n            </div>\n        </div>\n    ",
  mounted: function mounted() {
    this.value = this.field_value;
  },
  methods: {
    regenerateFonts: function regenerateFonts() {
      var vm = this;
      vm.loading = true;
      var url = stm_wpcfto_ajaxurl + '?action=wpcfto_regenerate_fonts&name=' + vm.option_id + '&nonce=' + stm_wpcfto_nonces['wpcfto_regenerate_fonts'];
      this.$http.post(url).then(function (response) {
        var _response$data;

        vm.loading = false;

        if (response !== null && response !== void 0 && (_response$data = response.data) !== null && _response$data !== void 0 && _response$data.reload) {
          location.reload();
        }
      });
    }
  },
  watch: {
    value: function value(_value) {
      this.$emit('wpcfto-get-value', _value);
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJ0cmFuc2xhdGlvbnMiLCJ3cGNmdG9fZ2xvYmFsX3NldHRpbmdzIiwibG9hZGluZyIsInZhbHVlIiwicmVnZW5lcmF0ZV90ZXh0cyIsImxhYmVsIiwicmVnZW5lcmF0ZV9mb250c190aXRsZSIsImRlc2NyaXB0aW9uIiwicmVnZW5lcmF0ZV9mb250c19ub3RpY2UiLCJmb250c19kb3dubG9hZF9zZXR0aW5nX3RleHRzIiwiZm9udHNfZG93bmxvYWRfc2V0dGluZ19sYWJlbCIsImZvbnRzX2Rvd25sb2FkX3NldHRpbmdfZGVzY3JpcHRpb24iLCJ0ZW1wbGF0ZSIsIm1vdW50ZWQiLCJmaWVsZF92YWx1ZSIsIm1ldGhvZHMiLCJyZWdlbmVyYXRlRm9udHMiLCJ2bSIsInVybCIsInN0bV93cGNmdG9fYWpheHVybCIsIm9wdGlvbl9pZCIsInN0bV93cGNmdG9fbm9uY2VzIiwiJGh0dHAiLCJwb3N0IiwidGhlbiIsInJlc3BvbnNlIiwiX3Jlc3BvbnNlJGRhdGEiLCJyZWxvYWQiLCJsb2NhdGlvbiIsIndhdGNoIiwiX3ZhbHVlIiwiJGVtaXQiXSwic291cmNlcyI6WyJmYWtlXzcxN2ZjNmVlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5WdWUuY29tcG9uZW50KCdmb250c19kb3dubG9hZF9zZXR0aW5ncycsIHtcbiAgcHJvcHM6IFsnZmllbGRzJywgJ2ZpZWxkX2xhYmVsJywgJ2ZpZWxkX25hbWUnLCAnZmllbGRfaWQnLCAnZmllbGRfdmFsdWUnLCAnb3B0aW9uX2lkJ10sXG4gIGRhdGE6IGZ1bmN0aW9uIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRyYW5zbGF0aW9uczogd3BjZnRvX2dsb2JhbF9zZXR0aW5nc1sndHJhbnNsYXRpb25zJ10sXG4gICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgIHZhbHVlOiAnJyxcbiAgICAgIHJlZ2VuZXJhdGVfdGV4dHM6IHtcbiAgICAgICAgbGFiZWw6IHdwY2Z0b19nbG9iYWxfc2V0dGluZ3NbJ3RyYW5zbGF0aW9ucyddLnJlZ2VuZXJhdGVfZm9udHNfdGl0bGUsXG4gICAgICAgIGRlc2NyaXB0aW9uOiB3cGNmdG9fZ2xvYmFsX3NldHRpbmdzWyd0cmFuc2xhdGlvbnMnXS5yZWdlbmVyYXRlX2ZvbnRzX25vdGljZVxuICAgICAgfSxcbiAgICAgIGZvbnRzX2Rvd25sb2FkX3NldHRpbmdfdGV4dHM6IHtcbiAgICAgICAgbGFiZWw6IHdwY2Z0b19nbG9iYWxfc2V0dGluZ3NbJ3RyYW5zbGF0aW9ucyddLmZvbnRzX2Rvd25sb2FkX3NldHRpbmdfbGFiZWwsXG4gICAgICAgIGRlc2NyaXB0aW9uOiB3cGNmdG9fZ2xvYmFsX3NldHRpbmdzWyd0cmFuc2xhdGlvbnMnXS5mb250c19kb3dubG9hZF9zZXR0aW5nX2Rlc2NyaXB0aW9uXG4gICAgICB9XG4gICAgfTtcbiAgfSxcbiAgdGVtcGxhdGU6IFwiXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9fZm9udHNfZG93bmxvYWRfc2V0dGluZ3NcXFwiPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0b19lbmFibGVfZm9udHNcXFwiPlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9fZ2VuZXJpY19maWVsZCB3cGNmdG9fZ2VuZXJpY19jaGVja2JveCB3cGNmdG9fZ2VuZXJpY19maWVsZF9yZWdlbmVyYXRlX2ZvbnRzXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDx3cGNmdG9fZmllbGRzX2FzaWRlX2JlZm9yZSA6ZmllbGRzPVxcXCJmb250c19kb3dubG9hZF9zZXR0aW5nX3RleHRzXFxcIiA6ZmllbGRfbGFiZWw9XFxcImZvbnRzX2Rvd25sb2FkX3NldHRpbmdfdGV4dHMubGFiZWxcXFwiPjwvd3BjZnRvX2ZpZWxkc19hc2lkZV9iZWZvcmU+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG8tZmllbGQtY29udGVudFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvLWFkbWluLWNoZWNrYm94IHdwY2Z0b19lbmFibGVfZm9udHNfY2hlY2tib3hcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG8tYWRtaW4tY2hlY2tib3gtd3JhcHBlciBpc190b2dnbGVcXFwiIHYtYmluZDpjbGFzcz1cXFwieydhY3RpdmUnIDogdmFsdWV9XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG8tY2hlY2tib3gtc3dpdGNoZXJcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJjaGVja2JveFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOm5hbWU9XFxcImZpZWxkX25hbWVcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtYmluZDppZD1cXFwiZmllbGRfaWRcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XFxcInZhbHVlXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IHYtc2hvdz1cXFwidmFsdWVcXFwiIGNsYXNzPVxcXCJ3cGNmdG9fcmVnZW5lcmF0ZV9mb250c19maWVsZFxcXCI+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0b19nZW5lcmljX2ZpZWxkIHdwY2Z0b19nZW5lcmljX2ZpZWxkX2ZsZXhfaW5wdXQgd3BjZnRvX2dlbmVyaWNfZmllbGRfcmVnZW5lcmF0ZV9mb250c1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8d3BjZnRvX2ZpZWxkc19hc2lkZV9iZWZvcmUgOmZpZWxkcz1cXFwicmVnZW5lcmF0ZV90ZXh0c1xcXCIgOmZpZWxkX2xhYmVsPVxcXCJyZWdlbmVyYXRlX3RleHRzLmxhYmVsXFxcIj48L3dwY2Z0b19maWVsZHNfYXNpZGVfYmVmb3JlPlxcbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cXFwiI1xcXCIgdi1iaW5kOmNsYXNzPVxcXCJ7J2xvYWRpbmcnOiBsb2FkaW5nfVxcXCIgY2xhc3M9XFxcImJ1dHRvblxcXCIgQGNsaWNrLnByZXZlbnQ9XFxcInJlZ2VuZXJhdGVGb250c1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3sgdHJhbnNsYXRpb25zLnJlZ2VuZXJhdGVfZm9udHNfYnRuIH19PC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJsbnIgbG5yLXN5bmNcXFwiPjwvaT5cXG4gICAgICAgICAgICAgICAgICAgIDwvYT5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgXCIsXG4gIG1vdW50ZWQ6IGZ1bmN0aW9uIG1vdW50ZWQoKSB7XG4gICAgdGhpcy52YWx1ZSA9IHRoaXMuZmllbGRfdmFsdWU7XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICByZWdlbmVyYXRlRm9udHM6IGZ1bmN0aW9uIHJlZ2VuZXJhdGVGb250cygpIHtcbiAgICAgIHZhciB2bSA9IHRoaXM7XG4gICAgICB2bS5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgIHZhciB1cmwgPSBzdG1fd3BjZnRvX2FqYXh1cmwgKyAnP2FjdGlvbj13cGNmdG9fcmVnZW5lcmF0ZV9mb250cyZuYW1lPScgKyB2bS5vcHRpb25faWQgKyAnJm5vbmNlPScgKyBzdG1fd3BjZnRvX25vbmNlc1snd3BjZnRvX3JlZ2VuZXJhdGVfZm9udHMnXTtcbiAgICAgIHRoaXMuJGh0dHAucG9zdCh1cmwpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHZhciBfcmVzcG9uc2UkZGF0YTtcblxuICAgICAgICB2bS5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlICE9PSBudWxsICYmIHJlc3BvbnNlICE9PSB2b2lkIDAgJiYgKF9yZXNwb25zZSRkYXRhID0gcmVzcG9uc2UuZGF0YSkgIT09IG51bGwgJiYgX3Jlc3BvbnNlJGRhdGEgIT09IHZvaWQgMCAmJiBfcmVzcG9uc2UkZGF0YS5yZWxvYWQpIHtcbiAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9LFxuICB3YXRjaDoge1xuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShfdmFsdWUpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ3dwY2Z0by1nZXQtdmFsdWUnLCBfdmFsdWUpO1xuICAgIH1cbiAgfVxufSk7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQUEsR0FBRyxDQUFDQyxTQUFKLENBQWMseUJBQWQsRUFBeUM7RUFDdkNDLEtBQUssRUFBRSxDQUFDLFFBQUQsRUFBVyxhQUFYLEVBQTBCLFlBQTFCLEVBQXdDLFVBQXhDLEVBQW9ELGFBQXBELEVBQW1FLFdBQW5FLENBRGdDO0VBRXZDQyxJQUFJLEVBQUUsU0FBU0EsSUFBVCxHQUFnQjtJQUNwQixPQUFPO01BQ0xDLFlBQVksRUFBRUMsc0JBQXNCLENBQUMsY0FBRCxDQUQvQjtNQUVMQyxPQUFPLEVBQUUsS0FGSjtNQUdMQyxLQUFLLEVBQUUsRUFIRjtNQUlMQyxnQkFBZ0IsRUFBRTtRQUNoQkMsS0FBSyxFQUFFSixzQkFBc0IsQ0FBQyxjQUFELENBQXRCLENBQXVDSyxzQkFEOUI7UUFFaEJDLFdBQVcsRUFBRU4sc0JBQXNCLENBQUMsY0FBRCxDQUF0QixDQUF1Q087TUFGcEMsQ0FKYjtNQVFMQyw0QkFBNEIsRUFBRTtRQUM1QkosS0FBSyxFQUFFSixzQkFBc0IsQ0FBQyxjQUFELENBQXRCLENBQXVDUyw0QkFEbEI7UUFFNUJILFdBQVcsRUFBRU4sc0JBQXNCLENBQUMsY0FBRCxDQUF0QixDQUF1Q1U7TUFGeEI7SUFSekIsQ0FBUDtFQWFELENBaEJzQztFQWlCdkNDLFFBQVEsRUFBRSxpN0RBakI2QjtFQWtCdkNDLE9BQU8sRUFBRSxTQUFTQSxPQUFULEdBQW1CO0lBQzFCLEtBQUtWLEtBQUwsR0FBYSxLQUFLVyxXQUFsQjtFQUNELENBcEJzQztFQXFCdkNDLE9BQU8sRUFBRTtJQUNQQyxlQUFlLEVBQUUsU0FBU0EsZUFBVCxHQUEyQjtNQUMxQyxJQUFJQyxFQUFFLEdBQUcsSUFBVDtNQUNBQSxFQUFFLENBQUNmLE9BQUgsR0FBYSxJQUFiO01BQ0EsSUFBSWdCLEdBQUcsR0FBR0Msa0JBQWtCLEdBQUcsdUNBQXJCLEdBQStERixFQUFFLENBQUNHLFNBQWxFLEdBQThFLFNBQTlFLEdBQTBGQyxpQkFBaUIsQ0FBQyx5QkFBRCxDQUFySDtNQUNBLEtBQUtDLEtBQUwsQ0FBV0MsSUFBWCxDQUFnQkwsR0FBaEIsRUFBcUJNLElBQXJCLENBQTBCLFVBQVVDLFFBQVYsRUFBb0I7UUFDNUMsSUFBSUMsY0FBSjs7UUFFQVQsRUFBRSxDQUFDZixPQUFILEdBQWEsS0FBYjs7UUFFQSxJQUFJdUIsUUFBUSxLQUFLLElBQWIsSUFBcUJBLFFBQVEsS0FBSyxLQUFLLENBQXZDLElBQTRDLENBQUNDLGNBQWMsR0FBR0QsUUFBUSxDQUFDMUIsSUFBM0IsTUFBcUMsSUFBakYsSUFBeUYyQixjQUFjLEtBQUssS0FBSyxDQUFqSCxJQUFzSEEsY0FBYyxDQUFDQyxNQUF6SSxFQUFpSjtVQUMvSUMsUUFBUSxDQUFDRCxNQUFUO1FBQ0Q7TUFDRixDQVJEO0lBU0Q7RUFkTSxDQXJCOEI7RUFxQ3ZDRSxLQUFLLEVBQUU7SUFDTDFCLEtBQUssRUFBRSxTQUFTQSxLQUFULENBQWUyQixNQUFmLEVBQXVCO01BQzVCLEtBQUtDLEtBQUwsQ0FBVyxrQkFBWCxFQUErQkQsTUFBL0I7SUFDRDtFQUhJO0FBckNnQyxDQUF6QyJ9
},{}]},{},[1])
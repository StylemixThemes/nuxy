(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Vue.component('wpcfto_file', {
  props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value', 'field_data', 'field_native_name', 'field_native_name_inner'],
  data: function data() {
    return {
      data: '',
      error: '',
      value: {
        name: '',
        url: '',
        path: ''
      },
      input_value: '',
      uploading: false
    };
  },
  template: "\n        <div class=\"wpcfto_generic_field wpcfto_generic_field__file\">\n        \n            <wpcfto_fields_aside_before :fields=\"fields\" :field_label=\"field_label\"></wpcfto_fields_aside_before>\n\n            <div class=\"wpcfto-field-content\">\n                <label class=\"file-select\" v-if=\"!value.path\">\n    \n                    <div class=\"select-button\" v-bind:class=\"{'uploading' : uploading}\">\n                        <span v-if=\"!uploading\">\n                            <i class=\"fa fa-paperclip\"></i>\n                            {{field_data.load_labels.label}}\n                        </span>\n                        <span v-html=\"field_data.load_labels.loading\" v-else></span>\n                    </div>\n    \n                    <input type=\"file\" :accept=\"field_data['accept'].join(',')\" @change=\"handleFileChange\" />\n                </label>\n    \n                <div class=\"field_label_error\" v-if=\"error\" v-html=\"error\"></div>\n    \n                <div class=\"field_label__file\" v-if=\"value.url\">\n                    <a v-bind:href=\"value.url\" target=\"_blank\">\n                        {{generateFileName(value['url'])}}\n                        <i class=\"fa fa-times\" @click.prevent=\"deleteFile()\"></i>\n                    </a>\n    \n                </div>\n  \n                <input type=\"hidden\"\n                    v-bind:name=\"field_name\"\n                    v-bind:placeholder=\"field_label\"\n                    v-bind:id=\"field_id\"\n                    v-model=\"input_value\"\n                />\n            \n            </div>\n\n            <wpcfto_fields_aside_after :fields=\"fields\"></wpcfto_fields_aside_after>\n\n        </div>\n    ",
  mounted: function mounted() {
    if (typeof this.field_value !== 'undefined') {
      if (typeof this.field_value.url !== 'undefined' && this.field_value.url === '') this.field_value = '';
      if (typeof this.field_value.path !== 'undefined' && this.field_value.path === '') this.field_value = '';
      if (this.field_value !== '') this.value = JSON.parse(this.field_value);
    }

    this.data = this.field_data;
  },
  methods: {
    handleFileChange: function handleFileChange(e) {
      var _this = this;

      if (e.target.files.length) {
        var file = e.target.files[0];
        _this.uploading = true;
        _this.error = '';
        var formData = new FormData();
        formData.append('file', file);
        formData.append('field', this.field_name);

        if (typeof this.field_native_name !== 'undefined') {
          formData.append('field_native_name', this.field_native_name);
        }

        if (typeof this.field_native_name_inner !== 'undefined') {
          formData.append('field_native_name_inner', this.field_native_name_inner);
        }

        var url = stm_wpcfto_ajaxurl + '?action=wpcfto_upload_file&nonce=' + stm_wpcfto_nonces['wpcfto_upload_file'];

        _this.$http.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(function (r) {
          r = r.body;

          if (r.error) {
            _this.$set(_this, 'error', r.error);
          } else {
            _this.$set(_this, 'value', r);
          }

          _this.uploading = false;
        });
      }
    },
    deleteFile: function deleteFile() {
      this.$set(this, 'value', {
        path: '',
        url: ''
      });
    },
    generateFileName: function generateFileName(url) {
      var name = url;
      var nameLength = 30;

      if (url.length > nameLength) {
        name = '...';
        name += url.substr(url.length - nameLength);
      }

      return name;
    }
  },
  watch: {
    value: function value(_value) {
      var stringified = JSON.stringify(_value);
      if (_value.path === '' && _value.url === '') stringified = '';
      this['input_value'] = stringified;
      this.$emit('wpcfto-get-value', stringified);
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfODIyMDg1NzEuanMiXSwibmFtZXMiOlsiVnVlIiwiY29tcG9uZW50IiwicHJvcHMiLCJkYXRhIiwiZXJyb3IiLCJ2YWx1ZSIsIm5hbWUiLCJ1cmwiLCJwYXRoIiwiaW5wdXRfdmFsdWUiLCJ1cGxvYWRpbmciLCJ0ZW1wbGF0ZSIsIm1vdW50ZWQiLCJmaWVsZF92YWx1ZSIsIkpTT04iLCJwYXJzZSIsImZpZWxkX2RhdGEiLCJtZXRob2RzIiwiaGFuZGxlRmlsZUNoYW5nZSIsImUiLCJfdGhpcyIsInRhcmdldCIsImZpbGVzIiwibGVuZ3RoIiwiZmlsZSIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJmaWVsZF9uYW1lIiwiZmllbGRfbmF0aXZlX25hbWUiLCJmaWVsZF9uYXRpdmVfbmFtZV9pbm5lciIsInN0bV93cGNmdG9fYWpheHVybCIsInN0bV93cGNmdG9fbm9uY2VzIiwiJGh0dHAiLCJwb3N0IiwiaGVhZGVycyIsInRoZW4iLCJyIiwiYm9keSIsIiRzZXQiLCJkZWxldGVGaWxlIiwiZ2VuZXJhdGVGaWxlTmFtZSIsIm5hbWVMZW5ndGgiLCJzdWJzdHIiLCJ3YXRjaCIsIl92YWx1ZSIsInN0cmluZ2lmaWVkIiwic3RyaW5naWZ5IiwiJGVtaXQiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBQSxHQUFHLENBQUNDLFNBQUosQ0FBYyxhQUFkLEVBQTZCO0FBQzNCQyxFQUFBQSxLQUFLLEVBQUUsQ0FBQyxRQUFELEVBQVcsYUFBWCxFQUEwQixZQUExQixFQUF3QyxVQUF4QyxFQUFvRCxhQUFwRCxFQUFtRSxZQUFuRSxFQUFpRixtQkFBakYsRUFBc0cseUJBQXRHLENBRG9CO0FBRTNCQyxFQUFBQSxJQUFJLEVBQUUsU0FBU0EsSUFBVCxHQUFnQjtBQUNwQixXQUFPO0FBQ0xBLE1BQUFBLElBQUksRUFBRSxFQUREO0FBRUxDLE1BQUFBLEtBQUssRUFBRSxFQUZGO0FBR0xDLE1BQUFBLEtBQUssRUFBRTtBQUNMQyxRQUFBQSxJQUFJLEVBQUUs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Y3RcIjtcblxuVnVlLmNvbXBvbmVudCgnd3BjZnRvX2ZpbGUnLCB7XG4gIHByb3BzOiBbJ2ZpZWxkcycsICdmaWVsZF9sYWJlbCcsICdmaWVsZF9uYW1lJywgJ2ZpZWxkX2lkJywgJ2ZpZWxkX3ZhbHVlJywgJ2ZpZWxkX2RhdGEnLCAnZmllbGRfbmF0aXZlX25hbWUnLCAnZmllbGRfbmF0aXZlX25hbWVfaW5uZXInXSxcbiAgZGF0YTogZnVuY3Rpb24gZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZGF0YTogJycsXG4gICAgICBlcnJvcjogJycsXG4gICAgICB2YWx1ZToge1xuICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgdXJsOiAnJyxcbiAgICAgICAgcGF0aDogJydcbiAgICAgIH0sXG4gICAgICBpbnB1dF92YWx1ZTogJycsXG4gICAgICB1cGxvYWRpbmc6IGZhbHNlXG4gICAgfTtcbiAgfSxcbiAgdGVtcGxhdGU6IFwiXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9fZ2VuZXJpY19maWVsZCB3cGNmdG9fZ2VuZXJpY19maWVsZF9fZmlsZVxcXCI+XFxuICAgICAgICBcXG4gICAgICAgICAgICA8d3BjZnRvX2ZpZWxkc19hc2lkZV9iZWZvcmUgOmZpZWxkcz1cXFwiZmllbGRzXFxcIiA6ZmllbGRfbGFiZWw9XFxcImZpZWxkX2xhYmVsXFxcIj48L3dwY2Z0b19maWVsZHNfYXNpZGVfYmVmb3JlPlxcblxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0by1maWVsZC1jb250ZW50XFxcIj5cXG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVxcXCJmaWxlLXNlbGVjdFxcXCIgdi1pZj1cXFwiIXZhbHVlLnBhdGhcXFwiPlxcbiAgICBcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInNlbGVjdC1idXR0b25cXFwiIHYtYmluZDpjbGFzcz1cXFwieyd1cGxvYWRpbmcnIDogdXBsb2FkaW5nfVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gdi1pZj1cXFwiIXVwbG9hZGluZ1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJmYSBmYS1wYXBlcmNsaXBcXFwiPjwvaT5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3tmaWVsZF9kYXRhLmxvYWRfbGFiZWxzLmxhYmVsfX1cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gdi1odG1sPVxcXCJmaWVsZF9kYXRhLmxvYWRfbGFiZWxzLmxvYWRpbmdcXFwiIHYtZWxzZT48L3NwYW4+XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgXFxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwiZmlsZVxcXCIgOmFjY2VwdD1cXFwiZmllbGRfZGF0YVsnYWNjZXB0J10uam9pbignLCcpXFxcIiBAY2hhbmdlPVxcXCJoYW5kbGVGaWxlQ2hhbmdlXFxcIiAvPlxcbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxcbiAgICBcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZmllbGRfbGFiZWxfZXJyb3JcXFwiIHYtaWY9XFxcImVycm9yXFxcIiB2LWh0bWw9XFxcImVycm9yXFxcIj48L2Rpdj5cXG4gICAgXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZpZWxkX2xhYmVsX19maWxlXFxcIiB2LWlmPVxcXCJ2YWx1ZS51cmxcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGEgdi1iaW5kOmhyZWY9XFxcInZhbHVlLnVybFxcXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt7Z2VuZXJhdGVGaWxlTmFtZSh2YWx1ZVsndXJsJ10pfX1cXG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cXFwiZmEgZmEtdGltZXNcXFwiIEBjbGljay5wcmV2ZW50PVxcXCJkZWxldGVGaWxlKClcXFwiPjwvaT5cXG4gICAgICAgICAgICAgICAgICAgIDwvYT5cXG4gICAgXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgXFxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiXFxuICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6bmFtZT1cXFwiZmllbGRfbmFtZVxcXCJcXG4gICAgICAgICAgICAgICAgICAgIHYtYmluZDpwbGFjZWhvbGRlcj1cXFwiZmllbGRfbGFiZWxcXFwiXFxuICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6aWQ9XFxcImZpZWxkX2lkXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cXFwiaW5wdXRfdmFsdWVcXFwiXFxuICAgICAgICAgICAgICAgIC8+XFxuICAgICAgICAgICAgXFxuICAgICAgICAgICAgPC9kaXY+XFxuXFxuICAgICAgICAgICAgPHdwY2Z0b19maWVsZHNfYXNpZGVfYWZ0ZXIgOmZpZWxkcz1cXFwiZmllbGRzXFxcIj48L3dwY2Z0b19maWVsZHNfYXNpZGVfYWZ0ZXI+XFxuXFxuICAgICAgICA8L2Rpdj5cXG4gICAgXCIsXG4gIG1vdW50ZWQ6IGZ1bmN0aW9uIG1vdW50ZWQoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmZpZWxkX3ZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLmZpZWxkX3ZhbHVlLnVybCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5maWVsZF92YWx1ZS51cmwgPT09ICcnKSB0aGlzLmZpZWxkX3ZhbHVlID0gJyc7XG4gICAgICBpZiAodHlwZW9mIHRoaXMuZmllbGRfdmFsdWUucGF0aCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5maWVsZF92YWx1ZS5wYXRoID09PSAnJykgdGhpcy5maWVsZF92YWx1ZSA9ICcnO1xuICAgICAgaWYgKHRoaXMuZmllbGRfdmFsdWUgIT09ICcnKSB0aGlzLnZhbHVlID0gSlNPTi5wYXJzZSh0aGlzLmZpZWxkX3ZhbHVlKTtcbiAgICB9XG5cbiAgICB0aGlzLmRhdGEgPSB0aGlzLmZpZWxkX2RhdGE7XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBoYW5kbGVGaWxlQ2hhbmdlOiBmdW5jdGlvbiBoYW5kbGVGaWxlQ2hhbmdlKGUpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIGlmIChlLnRhcmdldC5maWxlcy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGZpbGUgPSBlLnRhcmdldC5maWxlc1swXTtcbiAgICAgICAgX3RoaXMudXBsb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgX3RoaXMuZXJyb3IgPSAnJztcbiAgICAgICAgdmFyIGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnZmlsZScsIGZpbGUpO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ2ZpZWxkJywgdGhpcy5maWVsZF9uYW1lKTtcblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuZmllbGRfbmF0aXZlX25hbWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdmaWVsZF9uYXRpdmVfbmFtZScsIHRoaXMuZmllbGRfbmF0aXZlX25hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmZpZWxkX25hdGl2ZV9uYW1lX2lubmVyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnZmllbGRfbmF0aXZlX25hbWVfaW5uZXInLCB0aGlzLmZpZWxkX25hdGl2ZV9uYW1lX2lubmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB1cmwgPSBzdG1fd3BjZnRvX2FqYXh1cmwgKyAnP2FjdGlvbj13cGNmdG9fdXBsb2FkX2ZpbGUmbm9uY2U9JyArIHN0bV93cGNmdG9fbm9uY2VzWyd3cGNmdG9fdXBsb2FkX2ZpbGUnXTtcblxuICAgICAgICBfdGhpcy4kaHR0cC5wb3N0KHVybCwgZm9ybURhdGEsIHtcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnXG4gICAgICAgICAgfVxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgciA9IHIuYm9keTtcblxuICAgICAgICAgIGlmIChyLmVycm9yKSB7XG4gICAgICAgICAgICBfdGhpcy4kc2V0KF90aGlzLCAnZXJyb3InLCByLmVycm9yKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuJHNldChfdGhpcywgJ3ZhbHVlJywgcik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgX3RoaXMudXBsb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgZGVsZXRlRmlsZTogZnVuY3Rpb24gZGVsZXRlRmlsZSgpIHtcbiAgICAgIHRoaXMuJHNldCh0aGlzLCAndmFsdWUnLCB7XG4gICAgICAgIHBhdGg6ICcnLFxuICAgICAgICB1cmw6ICcnXG4gICAgICB9KTtcbiAgICB9LFxuICAgIGdlbmVyYXRlRmlsZU5hbWU6IGZ1bmN0aW9uIGdlbmVyYXRlRmlsZU5hbWUodXJsKSB7XG4gICAgICB2YXIgbmFtZSA9IHVybDtcbiAgICAgIHZhciBuYW1lTGVuZ3RoID0gMzA7XG5cbiAgICAgIGlmICh1cmwubGVuZ3RoID4gbmFtZUxlbmd0aCkge1xuICAgICAgICBuYW1lID0gJy4uLic7XG4gICAgICAgIG5hbWUgKz0gdXJsLnN1YnN0cih1cmwubGVuZ3RoIC0gbmFtZUxlbmd0aCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuYW1lO1xuICAgIH1cbiAgfSxcbiAgd2F0Y2g6IHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoX3ZhbHVlKSB7XG4gICAgICB2YXIgc3RyaW5naWZpZWQgPSBKU09OLnN0cmluZ2lmeShfdmFsdWUpO1xuICAgICAgaWYgKF92YWx1ZS5wYXRoID09PSAnJyAmJiBfdmFsdWUudXJsID09PSAnJykgc3RyaW5naWZpZWQgPSAnJztcbiAgICAgIHRoaXNbJ2lucHV0X3ZhbHVlJ10gPSBzdHJpbmdpZmllZDtcbiAgICAgIHRoaXMuJGVtaXQoJ3dwY2Z0by1nZXQtdmFsdWUnLCBzdHJpbmdpZmllZCk7XG4gICAgfVxuICB9XG59KTsiXX0=
},{}]},{},[1])
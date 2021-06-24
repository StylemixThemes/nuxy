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
      var name = '';
      var nameLength = 30;
      if (url.length > nameLength) name = '...';
      name += url.substr(url.length - nameLength);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfZjdkZDgxY2QuanMiXSwibmFtZXMiOlsiVnVlIiwiY29tcG9uZW50IiwicHJvcHMiLCJkYXRhIiwiZXJyb3IiLCJ2YWx1ZSIsIm5hbWUiLCJ1cmwiLCJwYXRoIiwiaW5wdXRfdmFsdWUiLCJ1cGxvYWRpbmciLCJ0ZW1wbGF0ZSIsIm1vdW50ZWQiLCJmaWVsZF92YWx1ZSIsIkpTT04iLCJwYXJzZSIsImZpZWxkX2RhdGEiLCJtZXRob2RzIiwiaGFuZGxlRmlsZUNoYW5nZSIsImUiLCJfdGhpcyIsInRhcmdldCIsImZpbGVzIiwibGVuZ3RoIiwiZmlsZSIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJmaWVsZF9uYW1lIiwiZmllbGRfbmF0aXZlX25hbWUiLCJmaWVsZF9uYXRpdmVfbmFtZV9pbm5lciIsInN0bV93cGNmdG9fYWpheHVybCIsInN0bV93cGNmdG9fbm9uY2VzIiwiJGh0dHAiLCJwb3N0IiwiaGVhZGVycyIsInRoZW4iLCJyIiwiYm9keSIsIiRzZXQiLCJkZWxldGVGaWxlIiwiZ2VuZXJhdGVGaWxlTmFtZSIsIm5hbWVMZW5ndGgiLCJzdWJzdHIiLCJ3YXRjaCIsIl92YWx1ZSIsInN0cmluZ2lmaWVkIiwic3RyaW5naWZ5IiwiJGVtaXQiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBQSxHQUFHLENBQUNDLFNBQUosQ0FBYyxhQUFkLEVBQTZCO0FBQzNCQyxFQUFBQSxLQUFLLEVBQUUsQ0FBQyxRQUFELEVBQVcsYUFBWCxFQUEwQixZQUExQixFQUF3QyxVQUF4QyxFQUFvRCxhQUFwRCxFQUFtRSxZQUFuRSxFQUFpRixtQkFBakYsRUFBc0cseUJBQXRHLENBRG9CO0FBRTNCQyxFQUFBQSxJQUFJLEVBQUUsU0FBU0EsSUFBVCxHQUFnQjtBQUNwQixXQUFPO0FBQ0xBLE1BQUFBLElBQUksRUFBRSxFQUREO0FBRUxDLE1BQUFBLEtBQUssRUFBRSxFQUZGO0FBR0xDLE1BQUFBLEtBQUssRUFBRTtBQUNMQyxRQUFBQSxJQUFJLEVBQUUs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ZW50KCd3cGNmdG9fZmlsZScsIHtcbiAgcHJvcHM6IFsnZmllbGRzJywgJ2ZpZWxkX2xhYmVsJywgJ2ZpZWxkX25hbWUnLCAnZmllbGRfaWQnLCAnZmllbGRfdmFsdWUnLCAnZmllbGRfZGF0YScsICdmaWVsZF9uYXRpdmVfbmFtZScsICdmaWVsZF9uYXRpdmVfbmFtZV9pbm5lciddLFxuICBkYXRhOiBmdW5jdGlvbiBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiAnJyxcbiAgICAgIGVycm9yOiAnJyxcbiAgICAgIHZhbHVlOiB7XG4gICAgICAgIG5hbWU6ICcnLFxuICAgICAgICB1cmw6ICcnLFxuICAgICAgICBwYXRoOiAnJ1xuICAgICAgfSxcbiAgICAgIGlucHV0X3ZhbHVlOiAnJyxcbiAgICAgIHVwbG9hZGluZzogZmFsc2VcbiAgICB9O1xuICB9LFxuICB0ZW1wbGF0ZTogXCJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0b19nZW5lcmljX2ZpZWxkIHdwY2Z0b19nZW5lcmljX2ZpZWxkX19maWxlXFxcIj5cXG4gICAgICAgIFxcbiAgICAgICAgICAgIDx3cGNmdG9fZmllbGRzX2FzaWRlX2JlZm9yZSA6ZmllbGRzPVxcXCJmaWVsZHNcXFwiIDpmaWVsZF9sYWJlbD1cXFwiZmllbGRfbGFiZWxcXFwiPjwvd3BjZnRvX2ZpZWxkc19hc2lkZV9iZWZvcmU+XFxuXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvLWZpZWxkLWNvbnRlbnRcXFwiPlxcbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XFxcImZpbGUtc2VsZWN0XFxcIiB2LWlmPVxcXCIhdmFsdWUucGF0aFxcXCI+XFxuICAgIFxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwic2VsZWN0LWJ1dHRvblxcXCIgdi1iaW5kOmNsYXNzPVxcXCJ7J3VwbG9hZGluZycgOiB1cGxvYWRpbmd9XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiB2LWlmPVxcXCIhdXBsb2FkaW5nXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XFxcImZhIGZhLXBhcGVyY2xpcFxcXCI+PC9pPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e2ZpZWxkX2RhdGEubG9hZF9sYWJlbHMubGFiZWx9fVxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiB2LWh0bWw9XFxcImZpZWxkX2RhdGEubG9hZF9sYWJlbHMubG9hZGluZ1xcXCIgdi1lbHNlPjwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICBcXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJmaWxlXFxcIiA6YWNjZXB0PVxcXCJmaWVsZF9kYXRhWydhY2NlcHQnXS5qb2luKCcsJylcXFwiIEBjaGFuZ2U9XFxcImhhbmRsZUZpbGVDaGFuZ2VcXFwiIC8+XFxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XFxuICAgIFxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmaWVsZF9sYWJlbF9lcnJvclxcXCIgdi1pZj1cXFwiZXJyb3JcXFwiIHYtaHRtbD1cXFwiZXJyb3JcXFwiPjwvZGl2PlxcbiAgICBcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZmllbGRfbGFiZWxfX2ZpbGVcXFwiIHYtaWY9XFxcInZhbHVlLnVybFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8YSB2LWJpbmQ6aHJlZj1cXFwidmFsdWUudXJsXFxcIiB0YXJnZXQ9XFxcIl9ibGFua1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAge3tnZW5lcmF0ZUZpbGVOYW1lKHZhbHVlWyd1cmwnXSl9fVxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJmYSBmYS10aW1lc1xcXCIgQGNsaWNrLnByZXZlbnQ9XFxcImRlbGV0ZUZpbGUoKVxcXCI+PC9pPlxcbiAgICAgICAgICAgICAgICAgICAgPC9hPlxcbiAgICBcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICBcXG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCJcXG4gICAgICAgICAgICAgICAgICAgIHYtYmluZDpuYW1lPVxcXCJmaWVsZF9uYW1lXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgdi1iaW5kOnBsYWNlaG9sZGVyPVxcXCJmaWVsZF9sYWJlbFxcXCJcXG4gICAgICAgICAgICAgICAgICAgIHYtYmluZDppZD1cXFwiZmllbGRfaWRcXFwiXFxuICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVxcXCJpbnB1dF92YWx1ZVxcXCJcXG4gICAgICAgICAgICAgICAgLz5cXG4gICAgICAgICAgICBcXG4gICAgICAgICAgICA8L2Rpdj5cXG5cXG4gICAgICAgICAgICA8d3BjZnRvX2ZpZWxkc19hc2lkZV9hZnRlciA6ZmllbGRzPVxcXCJmaWVsZHNcXFwiPjwvd3BjZnRvX2ZpZWxkc19hc2lkZV9hZnRlcj5cXG5cXG4gICAgICAgIDwvZGl2PlxcbiAgICBcIixcbiAgbW91bnRlZDogZnVuY3Rpb24gbW91bnRlZCgpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuZmllbGRfdmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMuZmllbGRfdmFsdWUudXJsICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLmZpZWxkX3ZhbHVlLnVybCA9PT0gJycpIHRoaXMuZmllbGRfdmFsdWUgPSAnJztcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5maWVsZF92YWx1ZS5wYXRoICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLmZpZWxkX3ZhbHVlLnBhdGggPT09ICcnKSB0aGlzLmZpZWxkX3ZhbHVlID0gJyc7XG4gICAgICBpZiAodGhpcy5maWVsZF92YWx1ZSAhPT0gJycpIHRoaXMudmFsdWUgPSBKU09OLnBhcnNlKHRoaXMuZmllbGRfdmFsdWUpO1xuICAgIH1cblxuICAgIHRoaXMuZGF0YSA9IHRoaXMuZmllbGRfZGF0YTtcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGhhbmRsZUZpbGVDaGFuZ2U6IGZ1bmN0aW9uIGhhbmRsZUZpbGVDaGFuZ2UoZSkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgaWYgKGUudGFyZ2V0LmZpbGVzLmxlbmd0aCkge1xuICAgICAgICB2YXIgZmlsZSA9IGUudGFyZ2V0LmZpbGVzWzBdO1xuICAgICAgICBfdGhpcy51cGxvYWRpbmcgPSB0cnVlO1xuICAgICAgICBfdGhpcy5lcnJvciA9ICcnO1xuICAgICAgICB2YXIgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdmaWxlJywgZmlsZSk7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnZmllbGQnLCB0aGlzLmZpZWxkX25hbWUpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5maWVsZF9uYXRpdmVfbmFtZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ2ZpZWxkX25hdGl2ZV9uYW1lJywgdGhpcy5maWVsZF9uYXRpdmVfbmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuZmllbGRfbmF0aXZlX25hbWVfaW5uZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdmaWVsZF9uYXRpdmVfbmFtZV9pbm5lcicsIHRoaXMuZmllbGRfbmF0aXZlX25hbWVfaW5uZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHVybCA9IHN0bV93cGNmdG9fYWpheHVybCArICc/YWN0aW9uPXdwY2Z0b191cGxvYWRfZmlsZSZub25jZT0nICsgc3RtX3dwY2Z0b19ub25jZXNbJ3dwY2Z0b191cGxvYWRfZmlsZSddO1xuXG4gICAgICAgIF90aGlzLiRodHRwLnBvc3QodXJsLCBmb3JtRGF0YSwge1xuICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YSdcbiAgICAgICAgICB9XG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICByID0gci5ib2R5O1xuXG4gICAgICAgICAgaWYgKHIuZXJyb3IpIHtcbiAgICAgICAgICAgIF90aGlzLiRzZXQoX3RoaXMsICdlcnJvcicsIHIuZXJyb3IpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy4kc2V0KF90aGlzLCAndmFsdWUnLCByKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBfdGhpcy51cGxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBkZWxldGVGaWxlOiBmdW5jdGlvbiBkZWxldGVGaWxlKCkge1xuICAgICAgdGhpcy4kc2V0KHRoaXMsICd2YWx1ZScsIHtcbiAgICAgICAgcGF0aDogJycsXG4gICAgICAgIHVybDogJydcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2VuZXJhdGVGaWxlTmFtZTogZnVuY3Rpb24gZ2VuZXJhdGVGaWxlTmFtZSh1cmwpIHtcbiAgICAgIHZhciBuYW1lID0gJyc7XG4gICAgICB2YXIgbmFtZUxlbmd0aCA9IDMwO1xuICAgICAgaWYgKHVybC5sZW5ndGggPiBuYW1lTGVuZ3RoKSBuYW1lID0gJy4uLic7XG4gICAgICBuYW1lICs9IHVybC5zdWJzdHIodXJsLmxlbmd0aCAtIG5hbWVMZW5ndGgpO1xuICAgICAgcmV0dXJuIG5hbWU7XG4gICAgfVxuICB9LFxuICB3YXRjaDoge1xuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShfdmFsdWUpIHtcbiAgICAgIHZhciBzdHJpbmdpZmllZCA9IEpTT04uc3RyaW5naWZ5KF92YWx1ZSk7XG4gICAgICBpZiAoX3ZhbHVlLnBhdGggPT09ICcnICYmIF92YWx1ZS51cmwgPT09ICcnKSBzdHJpbmdpZmllZCA9ICcnO1xuICAgICAgdGhpc1snaW5wdXRfdmFsdWUnXSA9IHN0cmluZ2lmaWVkO1xuICAgICAgdGhpcy4kZW1pdCgnd3BjZnRvLWdldC12YWx1ZScsIHN0cmluZ2lmaWVkKTtcbiAgICB9XG4gIH1cbn0pOyJdfQ==
},{}]},{},[1])
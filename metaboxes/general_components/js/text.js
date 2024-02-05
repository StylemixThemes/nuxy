(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Vue.component('wpcfto_text', {
  props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value', 'field_readonly'],
  data: function data() {
    return {
      value: '',
      showTooltip: false
    };
  },
  template: "\n\n        <div class=\"wpcfto_generic_field wpcfto_generic_field_flex_input wpcfto_generic_field__text\">\n            <wpcfto_fields_aside_before :fields=\"fields\" :field_label=\"field_label\"></wpcfto_fields_aside_before>\n\n            <div class=\"wpcfto-field-content\">\n                <input type=\"text\"\n                    v-bind:name=\"field_name\"\n                    v-bind:placeholder=\"fields.placeholder ? fields.placeholder : 'Enter ' + field_label \"\n                    v-bind:id=\"field_id\"\n                    v-bind:readonly=\"field_readonly\"\n                    v-model=\"value\"\n                    @click=\"handleInputClick\"\n                />\n                <div v-if=\"showTooltip\" class=\"readonly-tooltip\">Copied</div>\n            </div>\n\n            <wpcfto_fields_aside_after :fields=\"fields\"></wpcfto_fields_aside_after>\n        </div>\n    ",
  mounted: function mounted() {
    this.value = this.field_value;
  },
  methods: {
    handleInputClick: function handleInputClick() {
      var _this = this;

      if (this.field_readonly) {
        var inputField = document.getElementById(this.field_id);
        inputField.select();
        document.execCommand('copy');
        this.showTooltip = true;
        setTimeout(function () {
          _this.showTooltip = false;
        }, 2000);
      }
    }
  },
  watch: {
    value: function value(_value) {
      this.$emit('wpcfto-get-value', _value);
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJ2YWx1ZSIsInNob3dUb29sdGlwIiwidGVtcGxhdGUiLCJtb3VudGVkIiwiZmllbGRfdmFsdWUiLCJtZXRob2RzIiwiaGFuZGxlSW5wdXRDbGljayIsIl90aGlzIiwiZmllbGRfcmVhZG9ubHkiLCJpbnB1dEZpZWxkIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImZpZWxkX2lkIiwic2VsZWN0IiwiZXhlY0NvbW1hbmQiLCJzZXRUaW1lb3V0Iiwid2F0Y2giLCJfdmFsdWUiLCIkZW1pdCJdLCJzb3VyY2VzIjpbImZha2VfN2I3MGVjYWIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cblZ1ZS5jb21wb25lbnQoJ3dwY2Z0b190ZXh0Jywge1xuICBwcm9wczogWydmaWVsZHMnLCAnZmllbGRfbGFiZWwnLCAnZmllbGRfbmFtZScsICdmaWVsZF9pZCcsICdmaWVsZF92YWx1ZScsICdmaWVsZF9yZWFkb25seSddLFxuICBkYXRhOiBmdW5jdGlvbiBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogJycsXG4gICAgICBzaG93VG9vbHRpcDogZmFsc2VcbiAgICB9O1xuICB9LFxuICB0ZW1wbGF0ZTogXCJcXG5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0b19nZW5lcmljX2ZpZWxkIHdwY2Z0b19nZW5lcmljX2ZpZWxkX2ZsZXhfaW5wdXQgd3BjZnRvX2dlbmVyaWNfZmllbGRfX3RleHRcXFwiPlxcbiAgICAgICAgICAgIDx3cGNmdG9fZmllbGRzX2FzaWRlX2JlZm9yZSA6ZmllbGRzPVxcXCJmaWVsZHNcXFwiIDpmaWVsZF9sYWJlbD1cXFwiZmllbGRfbGFiZWxcXFwiPjwvd3BjZnRvX2ZpZWxkc19hc2lkZV9iZWZvcmU+XFxuXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvLWZpZWxkLWNvbnRlbnRcXFwiPlxcbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwidGV4dFxcXCJcXG4gICAgICAgICAgICAgICAgICAgIHYtYmluZDpuYW1lPVxcXCJmaWVsZF9uYW1lXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgdi1iaW5kOnBsYWNlaG9sZGVyPVxcXCJmaWVsZHMucGxhY2Vob2xkZXIgPyBmaWVsZHMucGxhY2Vob2xkZXIgOiAnRW50ZXIgJyArIGZpZWxkX2xhYmVsIFxcXCJcXG4gICAgICAgICAgICAgICAgICAgIHYtYmluZDppZD1cXFwiZmllbGRfaWRcXFwiXFxuICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6cmVhZG9ubHk9XFxcImZpZWxkX3JlYWRvbmx5XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cXFwidmFsdWVcXFwiXFxuICAgICAgICAgICAgICAgICAgICBAY2xpY2s9XFxcImhhbmRsZUlucHV0Q2xpY2tcXFwiXFxuICAgICAgICAgICAgICAgIC8+XFxuICAgICAgICAgICAgICAgIDxkaXYgdi1pZj1cXFwic2hvd1Rvb2x0aXBcXFwiIGNsYXNzPVxcXCJyZWFkb25seS10b29sdGlwXFxcIj5Db3BpZWQ8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG5cXG4gICAgICAgICAgICA8d3BjZnRvX2ZpZWxkc19hc2lkZV9hZnRlciA6ZmllbGRzPVxcXCJmaWVsZHNcXFwiPjwvd3BjZnRvX2ZpZWxkc19hc2lkZV9hZnRlcj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICBcIixcbiAgbW91bnRlZDogZnVuY3Rpb24gbW91bnRlZCgpIHtcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5maWVsZF92YWx1ZTtcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGhhbmRsZUlucHV0Q2xpY2s6IGZ1bmN0aW9uIGhhbmRsZUlucHV0Q2xpY2soKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICBpZiAodGhpcy5maWVsZF9yZWFkb25seSkge1xuICAgICAgICB2YXIgaW5wdXRGaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZmllbGRfaWQpO1xuICAgICAgICBpbnB1dEZpZWxkLnNlbGVjdCgpO1xuICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xuICAgICAgICB0aGlzLnNob3dUb29sdGlwID0gdHJ1ZTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgX3RoaXMuc2hvd1Rvb2x0aXAgPSBmYWxzZTtcbiAgICAgICAgfSwgMjAwMCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICB3YXRjaDoge1xuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShfdmFsdWUpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ3dwY2Z0by1nZXQtdmFsdWUnLCBfdmFsdWUpO1xuICAgIH1cbiAgfVxufSk7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQUEsR0FBRyxDQUFDQyxTQUFKLENBQWMsYUFBZCxFQUE2QjtFQUMzQkMsS0FBSyxFQUFFLENBQUMsUUFBRCxFQUFXLGFBQVgsRUFBMEIsWUFBMUIsRUFBd0MsVUFBeEMsRUFBb0QsYUFBcEQsRUFBbUUsZ0JBQW5FLENBRG9CO0VBRTNCQyxJQUFJLEVBQUUsU0FBU0EsSUFBVCxHQUFnQjtJQUNwQixPQUFPO01BQ0xDLEtBQUssRUFBRSxFQURGO01BRUxDLFdBQVcsRUFBRTtJQUZSLENBQVA7RUFJRCxDQVAwQjtFQVEzQkMsUUFBUSxFQUFFLG00QkFSaUI7RUFTM0JDLE9BQU8sRUFBRSxTQUFTQSxPQUFULEdBQW1CO0lBQzFCLEtBQUtILEtBQUwsR0FBYSxLQUFLSSxXQUFsQjtFQUNELENBWDBCO0VBWTNCQyxPQUFPLEVBQUU7SUFDUEMsZ0JBQWdCLEVBQUUsU0FBU0EsZ0JBQVQsR0FBNEI7TUFDNUMsSUFBSUMsS0FBSyxHQUFHLElBQVo7O01BRUEsSUFBSSxLQUFLQyxjQUFULEVBQXlCO1FBQ3ZCLElBQUlDLFVBQVUsR0FBR0MsUUFBUSxDQUFDQyxjQUFULENBQXdCLEtBQUtDLFFBQTdCLENBQWpCO1FBQ0FILFVBQVUsQ0FBQ0ksTUFBWDtRQUNBSCxRQUFRLENBQUNJLFdBQVQsQ0FBcUIsTUFBckI7UUFDQSxLQUFLYixXQUFMLEdBQW1CLElBQW5CO1FBQ0FjLFVBQVUsQ0FBQyxZQUFZO1VBQ3JCUixLQUFLLENBQUNOLFdBQU4sR0FBb0IsS0FBcEI7UUFDRCxDQUZTLEVBRVAsSUFGTyxDQUFWO01BR0Q7SUFDRjtFQWJNLENBWmtCO0VBMkIzQmUsS0FBSyxFQUFFO0lBQ0xoQixLQUFLLEVBQUUsU0FBU0EsS0FBVCxDQUFlaUIsTUFBZixFQUF1QjtNQUM1QixLQUFLQyxLQUFMLENBQVcsa0JBQVgsRUFBK0JELE1BQS9CO0lBQ0Q7RUFISTtBQTNCb0IsQ0FBN0IifQ==
},{}]},{},[1])

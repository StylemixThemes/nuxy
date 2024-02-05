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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJ2YWx1ZSIsInNob3dUb29sdGlwIiwidGVtcGxhdGUiLCJtb3VudGVkIiwiZmllbGRfdmFsdWUiLCJtZXRob2RzIiwiaGFuZGxlSW5wdXRDbGljayIsIl90aGlzIiwiZmllbGRfcmVhZG9ubHkiLCJpbnB1dEZpZWxkIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImZpZWxkX2lkIiwic2VsZWN0IiwiZXhlY0NvbW1hbmQiLCJzZXRUaW1lb3V0Iiwid2F0Y2giLCJfdmFsdWUiLCIkZW1pdCJdLCJzb3VyY2VzIjpbImZha2VfNTJjZTY2ZTAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cblZ1ZS5jb21wb25lbnQoJ3dwY2Z0b190ZXh0Jywge1xuICBwcm9wczogWydmaWVsZHMnLCAnZmllbGRfbGFiZWwnLCAnZmllbGRfbmFtZScsICdmaWVsZF9pZCcsICdmaWVsZF92YWx1ZScsICdmaWVsZF9yZWFkb25seSddLFxuICBkYXRhOiBmdW5jdGlvbiBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogJycsXG4gICAgICBzaG93VG9vbHRpcDogZmFsc2VcbiAgICB9O1xuICB9LFxuICB0ZW1wbGF0ZTogXCJcXG5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0b19nZW5lcmljX2ZpZWxkIHdwY2Z0b19nZW5lcmljX2ZpZWxkX2ZsZXhfaW5wdXQgd3BjZnRvX2dlbmVyaWNfZmllbGRfX3RleHRcXFwiPlxcbiAgICAgICAgICAgIDx3cGNmdG9fZmllbGRzX2FzaWRlX2JlZm9yZSA6ZmllbGRzPVxcXCJmaWVsZHNcXFwiIDpmaWVsZF9sYWJlbD1cXFwiZmllbGRfbGFiZWxcXFwiPjwvd3BjZnRvX2ZpZWxkc19hc2lkZV9iZWZvcmU+XFxuXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvLWZpZWxkLWNvbnRlbnRcXFwiPlxcbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwidGV4dFxcXCJcXG4gICAgICAgICAgICAgICAgICAgIHYtYmluZDpuYW1lPVxcXCJmaWVsZF9uYW1lXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgdi1iaW5kOnBsYWNlaG9sZGVyPVxcXCJmaWVsZHMucGxhY2Vob2xkZXIgPyBmaWVsZHMucGxhY2Vob2xkZXIgOiAnRW50ZXIgJyArIGZpZWxkX2xhYmVsIFxcXCJcXG4gICAgICAgICAgICAgICAgICAgIHYtYmluZDppZD1cXFwiZmllbGRfaWRcXFwiXFxuICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6cmVhZG9ubHk9XFxcImZpZWxkX3JlYWRvbmx5XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cXFwidmFsdWVcXFwiXFxuICAgICAgICAgICAgICAgICAgICBAY2xpY2s9XFxcImhhbmRsZUlucHV0Q2xpY2tcXFwiXFxuICAgICAgICAgICAgICAgIC8+XFxuICAgICAgICAgICAgICAgIDxkaXYgdi1pZj1cXFwic2hvd1Rvb2x0aXBcXFwiIGNsYXNzPVxcXCJyZWFkb25seS10b29sdGlwXFxcIj5Db3B5PC9kaXY+XFxuICAgICAgICAgICAgPC9kaXY+XFxuXFxuICAgICAgICAgICAgPHdwY2Z0b19maWVsZHNfYXNpZGVfYWZ0ZXIgOmZpZWxkcz1cXFwiZmllbGRzXFxcIj48L3dwY2Z0b19maWVsZHNfYXNpZGVfYWZ0ZXI+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgXCIsXG4gIG1vdW50ZWQ6IGZ1bmN0aW9uIG1vdW50ZWQoKSB7XG4gICAgdGhpcy52YWx1ZSA9IHRoaXMuZmllbGRfdmFsdWU7XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBoYW5kbGVJbnB1dENsaWNrOiBmdW5jdGlvbiBoYW5kbGVJbnB1dENsaWNrKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgaWYgKHRoaXMuZmllbGRfcmVhZG9ubHkpIHtcbiAgICAgICAgdmFyIGlucHV0RmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmZpZWxkX2lkKTtcbiAgICAgICAgaW5wdXRGaWVsZC5zZWxlY3QoKTtcbiAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKTtcbiAgICAgICAgdGhpcy5zaG93VG9vbHRpcCA9IHRydWU7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIF90aGlzLnNob3dUb29sdGlwID0gZmFsc2U7XG4gICAgICAgIH0sIDIwMDApO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgd2F0Y2g6IHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoX3ZhbHVlKSB7XG4gICAgICB0aGlzLiRlbWl0KCd3cGNmdG8tZ2V0LXZhbHVlJywgX3ZhbHVlKTtcbiAgICB9XG4gIH1cbn0pOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUFBLEdBQUcsQ0FBQ0MsU0FBSixDQUFjLGFBQWQsRUFBNkI7RUFDM0JDLEtBQUssRUFBRSxDQUFDLFFBQUQsRUFBVyxhQUFYLEVBQTBCLFlBQTFCLEVBQXdDLFVBQXhDLEVBQW9ELGFBQXBELEVBQW1FLGdCQUFuRSxDQURvQjtFQUUzQkMsSUFBSSxFQUFFLFNBQVNBLElBQVQsR0FBZ0I7SUFDcEIsT0FBTztNQUNMQyxLQUFLLEVBQUUsRUFERjtNQUVMQyxXQUFXLEVBQUU7SUFGUixDQUFQO0VBSUQsQ0FQMEI7RUFRM0JDLFFBQVEsRUFBRSxpNEJBUmlCO0VBUzNCQyxPQUFPLEVBQUUsU0FBU0EsT0FBVCxHQUFtQjtJQUMxQixLQUFLSCxLQUFMLEdBQWEsS0FBS0ksV0FBbEI7RUFDRCxDQVgwQjtFQVkzQkMsT0FBTyxFQUFFO0lBQ1BDLGdCQUFnQixFQUFFLFNBQVNBLGdCQUFULEdBQTRCO01BQzVDLElBQUlDLEtBQUssR0FBRyxJQUFaOztNQUVBLElBQUksS0FBS0MsY0FBVCxFQUF5QjtRQUN2QixJQUFJQyxVQUFVLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixLQUFLQyxRQUE3QixDQUFqQjtRQUNBSCxVQUFVLENBQUNJLE1BQVg7UUFDQUgsUUFBUSxDQUFDSSxXQUFULENBQXFCLE1BQXJCO1FBQ0EsS0FBS2IsV0FBTCxHQUFtQixJQUFuQjtRQUNBYyxVQUFVLENBQUMsWUFBWTtVQUNyQlIsS0FBSyxDQUFDTixXQUFOLEdBQW9CLEtBQXBCO1FBQ0QsQ0FGUyxFQUVQLElBRk8sQ0FBVjtNQUdEO0lBQ0Y7RUFiTSxDQVprQjtFQTJCM0JlLEtBQUssRUFBRTtJQUNMaEIsS0FBSyxFQUFFLFNBQVNBLEtBQVQsQ0FBZWlCLE1BQWYsRUFBdUI7TUFDNUIsS0FBS0MsS0FBTCxDQUFXLGtCQUFYLEVBQStCRCxNQUEvQjtJQUNEO0VBSEk7QUEzQm9CLENBQTdCIn0=
},{}]},{},[1])

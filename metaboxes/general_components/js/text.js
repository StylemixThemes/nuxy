(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Vue.component('wpcfto_text', {
  props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value', 'field_readonly', 'placeholder_text', 'copied_text'],
  data: function data() {
    return {
      value: '',
      showTooltip: false
    };
  },
  template: "\n\n        <div class=\"wpcfto_generic_field wpcfto_generic_field_flex_input wpcfto_generic_field__text\">\n            <wpcfto_fields_aside_before :fields=\"fields\" :field_label=\"field_label\"></wpcfto_fields_aside_before>\n\n            <div class=\"wpcfto-field-content\">\n                <input type=\"text\"\n                    v-bind:name=\"field_name\"\n                    v-bind:placeholder=\"fields.placeholder ? fields.placeholder : placeholder_text + ' ' + field_label \"\n                    v-bind:id=\"field_id\"\n                    v-bind:readonly=\"field_readonly\"\n                    v-model=\"value\"\n                    @click=\"handleInputClick\"\n                />\n                <div v-if=\"showTooltip\" class=\"readonly-tooltip\">copied_text</div>\n            </div>\n\n            <wpcfto_fields_aside_after :fields=\"fields\"></wpcfto_fields_aside_after>\n        </div>\n    ",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJ2YWx1ZSIsInNob3dUb29sdGlwIiwidGVtcGxhdGUiLCJtb3VudGVkIiwiZmllbGRfdmFsdWUiLCJtZXRob2RzIiwiaGFuZGxlSW5wdXRDbGljayIsIl90aGlzIiwiZmllbGRfcmVhZG9ubHkiLCJpbnB1dEZpZWxkIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImZpZWxkX2lkIiwic2VsZWN0IiwiZXhlY0NvbW1hbmQiLCJzZXRUaW1lb3V0Iiwid2F0Y2giLCJfdmFsdWUiLCIkZW1pdCJdLCJzb3VyY2VzIjpbImZha2VfYjljZDZjMWUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cblZ1ZS5jb21wb25lbnQoJ3dwY2Z0b190ZXh0Jywge1xuICBwcm9wczogWydmaWVsZHMnLCAnZmllbGRfbGFiZWwnLCAnZmllbGRfbmFtZScsICdmaWVsZF9pZCcsICdmaWVsZF92YWx1ZScsICdmaWVsZF9yZWFkb25seScsICdwbGFjZWhvbGRlcl90ZXh0JywgJ2NvcGllZF90ZXh0J10sXG4gIGRhdGE6IGZ1bmN0aW9uIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiAnJyxcbiAgICAgIHNob3dUb29sdGlwOiBmYWxzZVxuICAgIH07XG4gIH0sXG4gIHRlbXBsYXRlOiBcIlxcblxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvX2dlbmVyaWNfZmllbGQgd3BjZnRvX2dlbmVyaWNfZmllbGRfZmxleF9pbnB1dCB3cGNmdG9fZ2VuZXJpY19maWVsZF9fdGV4dFxcXCI+XFxuICAgICAgICAgICAgPHdwY2Z0b19maWVsZHNfYXNpZGVfYmVmb3JlIDpmaWVsZHM9XFxcImZpZWxkc1xcXCIgOmZpZWxkX2xhYmVsPVxcXCJmaWVsZF9sYWJlbFxcXCI+PC93cGNmdG9fZmllbGRzX2FzaWRlX2JlZm9yZT5cXG5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG8tZmllbGQtY29udGVudFxcXCI+XFxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgdi1iaW5kOm5hbWU9XFxcImZpZWxkX25hbWVcXFwiXFxuICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6cGxhY2Vob2xkZXI9XFxcImZpZWxkcy5wbGFjZWhvbGRlciA/IGZpZWxkcy5wbGFjZWhvbGRlciA6IHBsYWNlaG9sZGVyX3RleHQgKyAnICcgKyBmaWVsZF9sYWJlbCBcXFwiXFxuICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6aWQ9XFxcImZpZWxkX2lkXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgdi1iaW5kOnJlYWRvbmx5PVxcXCJmaWVsZF9yZWFkb25seVxcXCJcXG4gICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XFxcInZhbHVlXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgQGNsaWNrPVxcXCJoYW5kbGVJbnB1dENsaWNrXFxcIlxcbiAgICAgICAgICAgICAgICAvPlxcbiAgICAgICAgICAgICAgICA8ZGl2IHYtaWY9XFxcInNob3dUb29sdGlwXFxcIiBjbGFzcz1cXFwicmVhZG9ubHktdG9vbHRpcFxcXCI+Y29waWVkX3RleHQ8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG5cXG4gICAgICAgICAgICA8d3BjZnRvX2ZpZWxkc19hc2lkZV9hZnRlciA6ZmllbGRzPVxcXCJmaWVsZHNcXFwiPjwvd3BjZnRvX2ZpZWxkc19hc2lkZV9hZnRlcj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICBcIixcbiAgbW91bnRlZDogZnVuY3Rpb24gbW91bnRlZCgpIHtcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5maWVsZF92YWx1ZTtcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGhhbmRsZUlucHV0Q2xpY2s6IGZ1bmN0aW9uIGhhbmRsZUlucHV0Q2xpY2soKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICBpZiAodGhpcy5maWVsZF9yZWFkb25seSkge1xuICAgICAgICB2YXIgaW5wdXRGaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZmllbGRfaWQpO1xuICAgICAgICBpbnB1dEZpZWxkLnNlbGVjdCgpO1xuICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xuICAgICAgICB0aGlzLnNob3dUb29sdGlwID0gdHJ1ZTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgX3RoaXMuc2hvd1Rvb2x0aXAgPSBmYWxzZTtcbiAgICAgICAgfSwgMjAwMCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICB3YXRjaDoge1xuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShfdmFsdWUpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ3dwY2Z0by1nZXQtdmFsdWUnLCBfdmFsdWUpO1xuICAgIH1cbiAgfVxufSk7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQUEsR0FBRyxDQUFDQyxTQUFKLENBQWMsYUFBZCxFQUE2QjtFQUMzQkMsS0FBSyxFQUFFLENBQUMsUUFBRCxFQUFXLGFBQVgsRUFBMEIsWUFBMUIsRUFBd0MsVUFBeEMsRUFBb0QsYUFBcEQsRUFBbUUsZ0JBQW5FLEVBQXFGLGtCQUFyRixFQUF5RyxhQUF6RyxDQURvQjtFQUUzQkMsSUFBSSxFQUFFLFNBQVNBLElBQVQsR0FBZ0I7SUFDcEIsT0FBTztNQUNMQyxLQUFLLEVBQUUsRUFERjtNQUVMQyxXQUFXLEVBQUU7SUFGUixDQUFQO0VBSUQsQ0FQMEI7RUFRM0JDLFFBQVEsRUFBRSxzNUJBUmlCO0VBUzNCQyxPQUFPLEVBQUUsU0FBU0EsT0FBVCxHQUFtQjtJQUMxQixLQUFLSCxLQUFMLEdBQWEsS0FBS0ksV0FBbEI7RUFDRCxDQVgwQjtFQVkzQkMsT0FBTyxFQUFFO0lBQ1BDLGdCQUFnQixFQUFFLFNBQVNBLGdCQUFULEdBQTRCO01BQzVDLElBQUlDLEtBQUssR0FBRyxJQUFaOztNQUVBLElBQUksS0FBS0MsY0FBVCxFQUF5QjtRQUN2QixJQUFJQyxVQUFVLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixLQUFLQyxRQUE3QixDQUFqQjtRQUNBSCxVQUFVLENBQUNJLE1BQVg7UUFDQUgsUUFBUSxDQUFDSSxXQUFULENBQXFCLE1BQXJCO1FBQ0EsS0FBS2IsV0FBTCxHQUFtQixJQUFuQjtRQUNBYyxVQUFVLENBQUMsWUFBWTtVQUNyQlIsS0FBSyxDQUFDTixXQUFOLEdBQW9CLEtBQXBCO1FBQ0QsQ0FGUyxFQUVQLElBRk8sQ0FBVjtNQUdEO0lBQ0Y7RUFiTSxDQVprQjtFQTJCM0JlLEtBQUssRUFBRTtJQUNMaEIsS0FBSyxFQUFFLFNBQVNBLEtBQVQsQ0FBZWlCLE1BQWYsRUFBdUI7TUFDNUIsS0FBS0MsS0FBTCxDQUFXLGtCQUFYLEVBQStCRCxNQUEvQjtJQUNEO0VBSEk7QUEzQm9CLENBQTdCIn0=
},{}]},{},[1])
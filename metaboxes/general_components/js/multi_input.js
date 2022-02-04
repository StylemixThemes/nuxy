(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Vue.component('wpcfto_multi_input', {
  props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value', 'field_options'],
  data: function data() {
    return {
      inputs: []
    };
  },
  template: "\n        <div class=\"wpcfto_generic_field wpcfto_generic_field_multi_input\" v-bind:class=\"field_id\">\n\n            <wpcfto_fields_aside_before :fields=\"fields\" :field_label=\"field_label\"></wpcfto_fields_aside_before>\n\t\t\t\n\t\t\t<div class=\"wpcfto-field-content\">\n\t\t\t\t<div class=\"wpcfto_sorter\">\n\t\n\t\t\t\t\t<draggable class=\"list-group\"\n\t\t\t\t\t\t\t   :list=\"inputs\"\n\t\t\t\t\t\t\t   group=\"inputs\">\n\t\n\t\t\t\t\t\t<div class=\"wpcfto_generic_field wpcfto_generic_field_flex_input wpcfto_generic_field__text\"\n\t\t\t\t\t\t\t v-for=\"(input, input_key) in inputs\"\n\t\t\t\t\t\t\t :key=\"input['key']\">\n\t\n\t\t\t\t\t\t  <div class=\"wpcfto_multi_input_label\">{{input['label']}}</div>\n\t\n\t\t\t\t\t\t  <input type=\"text\" v-model=\"input['value']\" v-bind:placeholder=\"input['label']\" />\n\t\n\t\t\t\t\t\t  <span class=\"wpcfto_multi_input_icon\"><i class=\"fa fa-arrows-alt\"></i></span>\n\t\n\t\t\t\t\t\t</div>\n\t\n\t\t\t\t\t </draggable>\n\t\n\t\t\t\t </div>\n\t\t\t </div>\n\n\t\t\t <wpcfto_fields_aside_after :fields=\"fields\"></wpcfto_fields_aside_after>\n\n        </div>\n    ",
  mounted: function mounted() {
    var _this = this;

    if (typeof _this.field_value === 'string' && WpcftoIsJsonString(_this.field_value)) _this.field_value = JSON.parse(_this.field_value);
    if (!_this.field_value.length) _this.field_value = {};
    /*Get sorted items*/

    Object.keys(_this.field_value).forEach(function (key) {
      var stored_item = _this.field_value[key];

      var config_item = _this.field_options.find(function (x) {
        return x.key === stored_item['key'];
      });

      if (typeof config_item === 'undefined') return false;

      _this.inputs.push({
        key: stored_item['key'],
        value: stored_item['value'],
        label: config_item['label']
      });
    });
    /*Add new items from config*/

    _this.field_options.forEach(function (config_item) {
      var stored_item = _this.inputs.find(function (x) {
        return x.key === config_item['key'];
      });

      if (stored_item) return false;

      _this.inputs.push(config_item);
    });
  },
  methods: {},
  watch: {
    inputs: {
      deep: true,
      handler: function handler(inputs) {
        var inputs_value = [];
        inputs.forEach(function (item) {
          inputs_value.push({
            key: item.key,
            value: item.value
          });
        });
        this.$emit('wpcfto-get-value', inputs_value);
      }
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfY2IwNDMzMS5qcyJdLCJuYW1lcyI6WyJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJpbnB1dHMiLCJ0ZW1wbGF0ZSIsIm1vdW50ZWQiLCJfdGhpcyIsImZpZWxkX3ZhbHVlIiwiV3BjZnRvSXNKc29uU3RyaW5nIiwiSlNPTiIsInBhcnNlIiwibGVuZ3RoIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJzdG9yZWRfaXRlbSIsImNvbmZpZ19pdGVtIiwiZmllbGRfb3B0aW9ucyIsImZpbmQiLCJ4IiwicHVzaCIsInZhbHVlIiwibGFiZWwiLCJtZXRob2RzIiwid2F0Y2giLCJkZWVwIiwiaGFuZGxlciIsImlucHV0c192YWx1ZSIsIml0ZW0iLCIkZW1pdCJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUFBLEdBQUcsQ0FBQ0MsU0FBSixDQUFjLG9CQUFkLEVBQW9DO0FBQ2xDQyxFQUFBQSxLQUFLLEVBQUUsQ0FBQyxRQUFELEVBQVcsYUFBWCxFQUEwQixZQUExQixFQUF3QyxVQUF4QyxFQUFvRCxhQUFwRCxFQUFtRSxlQUFuRSxDQUQyQjtBQUVsQ0MsRUFBQUEsSUFBSSxFQUFFLFNBQVNBLElBQVQsR0FBZ0I7QUFDcEIsV0FBTztBQUNMQyxNQUFBQSxNQUFNLEVBQUU7QUFESCxLQUFQO0FBR0QsR0FOaUM7QUFPbENDLEVBQUFBLFFBQVEsRUFBRSw4bUNBUHdCO0FBUWxDQyxFQUFBQSxPQUFPLEVBQUUsU0FBU0EsT0FBVCxHQUFtQjtBQUMxQixRQUFJQyxLQUFLLEdBQUcsSUFBWjs7QUFFQSxRQUFJLE9BQU9BLEtBQUssQ0FBQ0MsV0FBYixLQUE2QixRQUE3QixJQUF5Q0Msa0JBQWtCLENBQUNGLEtBQUssQ0FBQ0MsV0FBUCxDQUEvRCxFQUFvRkQsS0FBSyxDQUFDQyxXQUFOLEdBQW9CRSxJQUFJLENBQUNDLEtBQUwsQ0FBV0osS0FBSyxDQUFDQyxXQUFqQixDQUFwQjtBQUNwRixRQUFJLENBQUNELEtBQUssQ0FBQ0MsV0FBTixDQUFrQkksTUFBdkIsRUFBK0JMLEtBQUssQ0FBQ0MsV0FBTixHQUFvQixFQUFwQjtBQUMvQjs7QUFFQUssSUFBQUEsTUFBTSxDQUFDQyxJQUFQLENBQVlQLEtBQUssQ0FBQ0MsV0FBbEIsRUFBK0JPLE9BQS9CLENBQXVDLFVBQVVDLEdBQVYsRUFBZTtBQUNwRCxVQUFJQyxXQUFXLEdBQUdWLEtBQUssQ0FBQ0MsV0FBTixDQUFrQlEsR0FBbEIsQ0FBbEI7O0FBRUEsVUFBSUUsV0FBVyxHQUFHWCxLQUFLLENBQUNZLGFBQU4sQ0FBb0JDLElBQXBCLENBQXlCLFVBQVVDLENBQVYsRUFBYTtBQUN0RCxlQUFPQSxDQUFDLENBQUNMLEdBQUYsS0FBVUMsV0FBVyxDQUFDLEtBQUQsQ0FBNUI7QUFDRCxPQUZpQixDQUFsQjs7QUFJQSxVQUFJLE9BQU9DLFdBQVAsS0FBdUIsV0FBM0IsRUFBd0MsT0FBTyxLQUFQOztBQUV4Q1gsTUFBQUEsS0FBSyxDQUFDSCxNQUFOLENBQWFrQixJQUFiLENBQWtCO0FBQ2hCTixRQUFBQSxHQUFHLEVBQUVDLFdBQVcsQ0FBQyxLQUFELENBREE7QUFFaEJNLFFBQUFBLEtBQUssRUFBRU4sV0FBVyxDQUFDLE9BQUQsQ0FGRjtBQUdoQk8sUUFBQUEsS0FBSyxFQUFFTixXQUFXLENBQUMsT0FBRDtBQUhGLE9BQWxCO0FBS0QsS0FkRDtBQWVBOztBQUVBWCxJQUFBQSxLQUFLLENBQUNZLGFBQU4sQ0FBb0JKLE9BQXBCLENBQTRCLFVBQVVHLFdBQVYsRUFBdUI7QUFDakQsVUFBSUQsV0FBVyxHQUFHVixLQUFLLENBQUNILE1BQU4sQ0FBYWdCLElBQWIsQ0FBa0IsVUFBVUMsQ0FBVixFQUFhO0FBQy9DLGVBQU9BLENBQUMsQ0FBQ0wsR0FBRixLQUFVRSxXQUFXLENBQUMsS0FBRCxDQUE1QjtBQUNELE9BRmlCLENBQWxCOztBQUlBLFVBQUlELFdBQUosRUFBaUIsT0FBTyxLQUFQOztBQUVqQlYsTUFBQUEsS0FBSyxDQUFDSCxNQUFOLENBQWFrQixJQUFiLENBQWtCSixXQUFsQjtBQUNELEtBUkQ7QUFTRCxHQXpDaUM7QUEwQ2xDTyxFQUFBQSxPQUFPLEVBQUUsRUExQ3lCO0FBMkNsQ0MsRUFBQUEsS0FBSyxFQUFFO0FBQ0x0QixJQUFBQSxNQUFNLEVBQUU7QUFDTnVCLE1BQUFBLElBQUksRUFBRSxJQURBO0FBRU5DLE1BQUFBLE9BQU8sRUFBRSxTQUFTQSxPQUFULENBQWlCeEIsTUFBakIsRUFBeUI7QUFDaEMsWUFBSXlCLFlBQVksR0FBRyxFQUFuQjtBQUNBekIsUUFBQUEsTUFBTSxDQUFDVyxPQUFQLENBQWUsVUFBVWUsSUFBVixFQUFnQjtBQUM3QkQsVUFBQUEsWUFBWSxDQUFDUCxJQUFiLENBQWtCO0FBQ2hCTixZQUFBQSxHQUFHLEVBQUVjLElBQUksQ0FBQ2QsR0FETTtBQUVoQk8sWUFBQUEsS0FBSyxFQUFFTyxJQUFJLENBQUNQO0FBRkksV0FBbEI7QUFJRCxTQUxEO0FBTUEsYUFBS1EsS0FBTCxDQUFXLGtCQUFYLEVBQStCRixZQUEvQjtBQUNEO0FBWEs7QUFESDtBQTNDMkIsQ0FBcEMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuVnVlLmNvbXBvbmVudCgnd3BjZnRvX211bHRpX2lucHV0Jywge1xuICBwcm9wczogWydmaWVsZHMnLCAnZmllbGRfbGFiZWwnLCAnZmllbGRfbmFtZScsICdmaWVsZF9pZCcsICdmaWVsZF92YWx1ZScsICdmaWVsZF9vcHRpb25zJ10sXG4gIGRhdGE6IGZ1bmN0aW9uIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlucHV0czogW11cbiAgICB9O1xuICB9LFxuICB0ZW1wbGF0ZTogXCJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0b19nZW5lcmljX2ZpZWxkIHdwY2Z0b19nZW5lcmljX2ZpZWxkX211bHRpX2lucHV0XFxcIiB2LWJpbmQ6Y2xhc3M9XFxcImZpZWxkX2lkXFxcIj5cXG5cXG4gICAgICAgICAgICA8d3BjZnRvX2ZpZWxkc19hc2lkZV9iZWZvcmUgOmZpZWxkcz1cXFwiZmllbGRzXFxcIiA6ZmllbGRfbGFiZWw9XFxcImZpZWxkX2xhYmVsXFxcIj48L3dwY2Z0b19maWVsZHNfYXNpZGVfYmVmb3JlPlxcblxcdFxcdFxcdFxcblxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcIndwY2Z0by1maWVsZC1jb250ZW50XFxcIj5cXG5cXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9fc29ydGVyXFxcIj5cXG5cXHRcXG5cXHRcXHRcXHRcXHRcXHQ8ZHJhZ2dhYmxlIGNsYXNzPVxcXCJsaXN0LWdyb3VwXFxcIlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdCAgIDpsaXN0PVxcXCJpbnB1dHNcXFwiXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0ICAgZ3JvdXA9XFxcImlucHV0c1xcXCI+XFxuXFx0XFxuXFx0XFx0XFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwid3BjZnRvX2dlbmVyaWNfZmllbGQgd3BjZnRvX2dlbmVyaWNfZmllbGRfZmxleF9pbnB1dCB3cGNmdG9fZ2VuZXJpY19maWVsZF9fdGV4dFxcXCJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQgdi1mb3I9XFxcIihpbnB1dCwgaW5wdXRfa2V5KSBpbiBpbnB1dHNcXFwiXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0IDprZXk9XFxcImlucHV0WydrZXknXVxcXCI+XFxuXFx0XFxuXFx0XFx0XFx0XFx0XFx0XFx0ICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9fbXVsdGlfaW5wdXRfbGFiZWxcXFwiPnt7aW5wdXRbJ2xhYmVsJ119fTwvZGl2PlxcblxcdFxcblxcdFxcdFxcdFxcdFxcdFxcdCAgPGlucHV0IHR5cGU9XFxcInRleHRcXFwiIHYtbW9kZWw9XFxcImlucHV0Wyd2YWx1ZSddXFxcIiB2LWJpbmQ6cGxhY2Vob2xkZXI9XFxcImlucHV0WydsYWJlbCddXFxcIiAvPlxcblxcdFxcblxcdFxcdFxcdFxcdFxcdFxcdCAgPHNwYW4gY2xhc3M9XFxcIndwY2Z0b19tdWx0aV9pbnB1dF9pY29uXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtYXJyb3dzLWFsdFxcXCI+PC9pPjwvc3Bhbj5cXG5cXHRcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8L2Rpdj5cXG5cXHRcXG5cXHRcXHRcXHRcXHRcXHQgPC9kcmFnZ2FibGU+XFxuXFx0XFxuXFx0XFx0XFx0XFx0IDwvZGl2PlxcblxcdFxcdFxcdCA8L2Rpdj5cXG5cXG5cXHRcXHRcXHQgPHdwY2Z0b19maWVsZHNfYXNpZGVfYWZ0ZXIgOmZpZWxkcz1cXFwiZmllbGRzXFxcIj48L3dwY2Z0b19maWVsZHNfYXNpZGVfYWZ0ZXI+XFxuXFxuICAgICAgICA8L2Rpdj5cXG4gICAgXCIsXG4gIG1vdW50ZWQ6IGZ1bmN0aW9uIG1vdW50ZWQoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIGlmICh0eXBlb2YgX3RoaXMuZmllbGRfdmFsdWUgPT09ICdzdHJpbmcnICYmIFdwY2Z0b0lzSnNvblN0cmluZyhfdGhpcy5maWVsZF92YWx1ZSkpIF90aGlzLmZpZWxkX3ZhbHVlID0gSlNPTi5wYXJzZShfdGhpcy5maWVsZF92YWx1ZSk7XG4gICAgaWYgKCFfdGhpcy5maWVsZF92YWx1ZS5sZW5ndGgpIF90aGlzLmZpZWxkX3ZhbHVlID0ge307XG4gICAgLypHZXQgc29ydGVkIGl0ZW1zKi9cblxuICAgIE9iamVjdC5rZXlzKF90aGlzLmZpZWxkX3ZhbHVlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHZhciBzdG9yZWRfaXRlbSA9IF90aGlzLmZpZWxkX3ZhbHVlW2tleV07XG5cbiAgICAgIHZhciBjb25maWdfaXRlbSA9IF90aGlzLmZpZWxkX29wdGlvbnMuZmluZChmdW5jdGlvbiAoeCkge1xuICAgICAgICByZXR1cm4geC5rZXkgPT09IHN0b3JlZF9pdGVtWydrZXknXTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAodHlwZW9mIGNvbmZpZ19pdGVtID09PSAndW5kZWZpbmVkJykgcmV0dXJuIGZhbHNlO1xuXG4gICAgICBfdGhpcy5pbnB1dHMucHVzaCh7XG4gICAgICAgIGtleTogc3RvcmVkX2l0ZW1bJ2tleSddLFxuICAgICAgICB2YWx1ZTogc3RvcmVkX2l0ZW1bJ3ZhbHVlJ10sXG4gICAgICAgIGxhYmVsOiBjb25maWdfaXRlbVsnbGFiZWwnXVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgLypBZGQgbmV3IGl0ZW1zIGZyb20gY29uZmlnKi9cblxuICAgIF90aGlzLmZpZWxkX29wdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoY29uZmlnX2l0ZW0pIHtcbiAgICAgIHZhciBzdG9yZWRfaXRlbSA9IF90aGlzLmlucHV0cy5maW5kKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHJldHVybiB4LmtleSA9PT0gY29uZmlnX2l0ZW1bJ2tleSddO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChzdG9yZWRfaXRlbSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICBfdGhpcy5pbnB1dHMucHVzaChjb25maWdfaXRlbSk7XG4gICAgfSk7XG4gIH0sXG4gIG1ldGhvZHM6IHt9LFxuICB3YXRjaDoge1xuICAgIGlucHV0czoge1xuICAgICAgZGVlcDogdHJ1ZSxcbiAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoaW5wdXRzKSB7XG4gICAgICAgIHZhciBpbnB1dHNfdmFsdWUgPSBbXTtcbiAgICAgICAgaW5wdXRzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICBpbnB1dHNfdmFsdWUucHVzaCh7XG4gICAgICAgICAgICBrZXk6IGl0ZW0ua2V5LFxuICAgICAgICAgICAgdmFsdWU6IGl0ZW0udmFsdWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuJGVtaXQoJ3dwY2Z0by1nZXQtdmFsdWUnLCBpbnB1dHNfdmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufSk7Il19
},{}]},{},[1])
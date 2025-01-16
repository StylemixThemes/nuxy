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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJpbnB1dHMiLCJ0ZW1wbGF0ZSIsIm1vdW50ZWQiLCJfdGhpcyIsImZpZWxkX3ZhbHVlIiwiV3BjZnRvSXNKc29uU3RyaW5nIiwiSlNPTiIsInBhcnNlIiwibGVuZ3RoIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJzdG9yZWRfaXRlbSIsImNvbmZpZ19pdGVtIiwiZmllbGRfb3B0aW9ucyIsImZpbmQiLCJ4IiwicHVzaCIsInZhbHVlIiwibGFiZWwiLCJtZXRob2RzIiwid2F0Y2giLCJkZWVwIiwiaGFuZGxlciIsImlucHV0c192YWx1ZSIsIml0ZW0iLCIkZW1pdCJdLCJzb3VyY2VzIjpbImZha2VfYjVhMjllYzkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cblZ1ZS5jb21wb25lbnQoJ3dwY2Z0b19tdWx0aV9pbnB1dCcsIHtcbiAgcHJvcHM6IFsnZmllbGRzJywgJ2ZpZWxkX2xhYmVsJywgJ2ZpZWxkX25hbWUnLCAnZmllbGRfaWQnLCAnZmllbGRfdmFsdWUnLCAnZmllbGRfb3B0aW9ucyddLFxuICBkYXRhOiBmdW5jdGlvbiBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpbnB1dHM6IFtdXG4gICAgfTtcbiAgfSxcbiAgdGVtcGxhdGU6IFwiXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9fZ2VuZXJpY19maWVsZCB3cGNmdG9fZ2VuZXJpY19maWVsZF9tdWx0aV9pbnB1dFxcXCIgdi1iaW5kOmNsYXNzPVxcXCJmaWVsZF9pZFxcXCI+XFxuXFxuICAgICAgICAgICAgPHdwY2Z0b19maWVsZHNfYXNpZGVfYmVmb3JlIDpmaWVsZHM9XFxcImZpZWxkc1xcXCIgOmZpZWxkX2xhYmVsPVxcXCJmaWVsZF9sYWJlbFxcXCI+PC93cGNmdG9fZmllbGRzX2FzaWRlX2JlZm9yZT5cXG5cXHRcXHRcXHRcXG5cXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJ3cGNmdG8tZmllbGQtY29udGVudFxcXCI+XFxuXFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwid3BjZnRvX3NvcnRlclxcXCI+XFxuXFx0XFxuXFx0XFx0XFx0XFx0XFx0PGRyYWdnYWJsZSBjbGFzcz1cXFwibGlzdC1ncm91cFxcXCJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQgICA6bGlzdD1cXFwiaW5wdXRzXFxcIlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdCAgIGdyb3VwPVxcXCJpbnB1dHNcXFwiPlxcblxcdFxcblxcdFxcdFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcIndwY2Z0b19nZW5lcmljX2ZpZWxkIHdwY2Z0b19nZW5lcmljX2ZpZWxkX2ZsZXhfaW5wdXQgd3BjZnRvX2dlbmVyaWNfZmllbGRfX3RleHRcXFwiXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0IHYtZm9yPVxcXCIoaW5wdXQsIGlucHV0X2tleSkgaW4gaW5wdXRzXFxcIlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdCA6a2V5PVxcXCJpbnB1dFsna2V5J11cXFwiPlxcblxcdFxcblxcdFxcdFxcdFxcdFxcdFxcdCAgPGRpdiBjbGFzcz1cXFwid3BjZnRvX211bHRpX2lucHV0X2xhYmVsXFxcIj57e2lucHV0WydsYWJlbCddfX08L2Rpdj5cXG5cXHRcXG5cXHRcXHRcXHRcXHRcXHRcXHQgIDxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiB2LW1vZGVsPVxcXCJpbnB1dFsndmFsdWUnXVxcXCIgdi1iaW5kOnBsYWNlaG9sZGVyPVxcXCJpbnB1dFsnbGFiZWwnXVxcXCIgLz5cXG5cXHRcXG5cXHRcXHRcXHRcXHRcXHRcXHQgIDxzcGFuIGNsYXNzPVxcXCJ3cGNmdG9fbXVsdGlfaW5wdXRfaWNvblxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWFycm93cy1hbHRcXFwiPjwvaT48L3NwYW4+XFxuXFx0XFxuXFx0XFx0XFx0XFx0XFx0XFx0PC9kaXY+XFxuXFx0XFxuXFx0XFx0XFx0XFx0XFx0IDwvZHJhZ2dhYmxlPlxcblxcdFxcblxcdFxcdFxcdFxcdCA8L2Rpdj5cXG5cXHRcXHRcXHQgPC9kaXY+XFxuXFxuXFx0XFx0XFx0IDx3cGNmdG9fZmllbGRzX2FzaWRlX2FmdGVyIDpmaWVsZHM9XFxcImZpZWxkc1xcXCI+PC93cGNmdG9fZmllbGRzX2FzaWRlX2FmdGVyPlxcblxcbiAgICAgICAgPC9kaXY+XFxuICAgIFwiLFxuICBtb3VudGVkOiBmdW5jdGlvbiBtb3VudGVkKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgaWYgKHR5cGVvZiBfdGhpcy5maWVsZF92YWx1ZSA9PT0gJ3N0cmluZycgJiYgV3BjZnRvSXNKc29uU3RyaW5nKF90aGlzLmZpZWxkX3ZhbHVlKSkgX3RoaXMuZmllbGRfdmFsdWUgPSBKU09OLnBhcnNlKF90aGlzLmZpZWxkX3ZhbHVlKTtcbiAgICBpZiAoIV90aGlzLmZpZWxkX3ZhbHVlLmxlbmd0aCkgX3RoaXMuZmllbGRfdmFsdWUgPSB7fTtcblxuICAgIC8qR2V0IHNvcnRlZCBpdGVtcyovXG4gICAgT2JqZWN0LmtleXMoX3RoaXMuZmllbGRfdmFsdWUpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgdmFyIHN0b3JlZF9pdGVtID0gX3RoaXMuZmllbGRfdmFsdWVba2V5XTtcbiAgICAgIHZhciBjb25maWdfaXRlbSA9IF90aGlzLmZpZWxkX29wdGlvbnMuZmluZChmdW5jdGlvbiAoeCkge1xuICAgICAgICByZXR1cm4geC5rZXkgPT09IHN0b3JlZF9pdGVtWydrZXknXTtcbiAgICAgIH0pO1xuICAgICAgaWYgKHR5cGVvZiBjb25maWdfaXRlbSA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiBmYWxzZTtcbiAgICAgIF90aGlzLmlucHV0cy5wdXNoKHtcbiAgICAgICAga2V5OiBzdG9yZWRfaXRlbVsna2V5J10sXG4gICAgICAgIHZhbHVlOiBzdG9yZWRfaXRlbVsndmFsdWUnXSxcbiAgICAgICAgbGFiZWw6IGNvbmZpZ19pdGVtWydsYWJlbCddXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8qQWRkIG5ldyBpdGVtcyBmcm9tIGNvbmZpZyovXG4gICAgX3RoaXMuZmllbGRfb3B0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChjb25maWdfaXRlbSkge1xuICAgICAgdmFyIHN0b3JlZF9pdGVtID0gX3RoaXMuaW5wdXRzLmZpbmQoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgcmV0dXJuIHgua2V5ID09PSBjb25maWdfaXRlbVsna2V5J107XG4gICAgICB9KTtcbiAgICAgIGlmIChzdG9yZWRfaXRlbSkgcmV0dXJuIGZhbHNlO1xuICAgICAgX3RoaXMuaW5wdXRzLnB1c2goY29uZmlnX2l0ZW0pO1xuICAgIH0pO1xuICB9LFxuICBtZXRob2RzOiB7fSxcbiAgd2F0Y2g6IHtcbiAgICBpbnB1dHM6IHtcbiAgICAgIGRlZXA6IHRydWUsXG4gICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKGlucHV0cykge1xuICAgICAgICB2YXIgaW5wdXRzX3ZhbHVlID0gW107XG4gICAgICAgIGlucHV0cy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgaW5wdXRzX3ZhbHVlLnB1c2goe1xuICAgICAgICAgICAga2V5OiBpdGVtLmtleSxcbiAgICAgICAgICAgIHZhbHVlOiBpdGVtLnZhbHVlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLiRlbWl0KCd3cGNmdG8tZ2V0LXZhbHVlJywgaW5wdXRzX3ZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pOyJdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWTs7QUFFWkEsR0FBRyxDQUFDQyxTQUFTLENBQUMsb0JBQW9CLEVBQUU7RUFDbENDLEtBQUssRUFBRSxDQUFDLFFBQVEsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsZUFBZSxDQUFDO0VBQzFGQyxJQUFJLEVBQUUsU0FBU0EsSUFBSUEsQ0FBQSxFQUFHO0lBQ3BCLE9BQU87TUFDTEMsTUFBTSxFQUFFO0lBQ1YsQ0FBQztFQUNILENB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
},{}]},{},[1])
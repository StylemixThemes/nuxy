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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfZDVlZmJmMGEuanMiXSwibmFtZXMiOlsiVnVlIiwiY29tcG9uZW50IiwicHJvcHMiLCJkYXRhIiwiaW5wdXRzIiwidGVtcGxhdGUiLCJtb3VudGVkIiwiX3RoaXMiLCJmaWVsZF92YWx1ZSIsIldwY2Z0b0lzSnNvblN0cmluZyIsIkpTT04iLCJwYXJzZSIsImxlbmd0aCIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5Iiwic3RvcmVkX2l0ZW0iLCJjb25maWdfaXRlbSIsImZpZWxkX29wdGlvbnMiLCJmaW5kIiwieCIsInB1c2giLCJ2YWx1ZSIsImxhYmVsIiwibWV0aG9kcyIsIndhdGNoIiwiZGVlcCIsImhhbmRsZXIiLCJpbnB1dHNfdmFsdWUiLCJpdGVtIiwiJGVtaXQiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBQSxHQUFHLENBQUNDLFNBQUosQ0FBYyxvQkFBZCxFQUFvQztBQUNsQ0MsRUFBQUEsS0FBSyxFQUFFLENBQUMsUUFBRCxFQUFXLGFBQVgsRUFBMEIsWUFBMUIsRUFBd0MsVUFBeEMsRUFBb0QsYUFBcEQsRUFBbUUsZUFBbkUsQ0FEMkI7QUFFbENDLEVBQUFBLElBQUksRUFBRSxTQUFTQSxJQUFULEdBQWdCO0FBQ3BCLFdBQU87QUFDTEMsTUFBQUEsTUFBTSxFQUFFO0FBREgsS0FBUDtBQUdELEdBTmlDO0FBT2xDQyxFQUFBQSxRQUFRLEVBQUUsOG1DQVB3QjtBQVFsQ0MsRUFBQUEsT0FBTyxFQUFFLFNBQVNBLE9BQVQsR0FBbUI7QUFDMUIsUUFBSUMsS0FBSyxHQUFHLElBQVo7O0FBRUEsUUFBSSxPQUFPQSxLQUFLLENBQUNDLFdBQWIsS0FBNkIsUUFBN0IsSUFBeUNDLGtCQUFrQixDQUFDRixLQUFLLENBQUNDLFdBQVAsQ0FBL0QsRUFBb0ZELEtBQUssQ0FBQ0MsV0FBTixHQUFvQkUsSUFBSSxDQUFDQyxLQUFMLENBQVdKLEtBQUssQ0FBQ0MsV0FBakIsQ0FBcEI7QUFDcEYsUUFBSSxDQUFDRCxLQUFLLENBQUNDLFdBQU4sQ0FBa0JJLE1BQXZCLEVBQStCTCxLQUFLLENBQUNDLFdBQU4sR0FBb0IsRUFBcEI7QUFDL0I7O0FBRUFLLElBQUFBLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZUCxLQUFLLENBQUNDLFdBQWxCLEVBQStCTyxPQUEvQixDQUF1QyxVQUFVQyxHQUFWLEVBQWU7QUFDcEQsVUFBSUMsV0FBVyxHQUFHVixLQUFLLENBQUNDLFdBQU4sQ0FBa0JRLEdBQWxCLENBQWxCOztBQUVBLFVBQUlFLFdBQVcsR0FBR1gsS0FBSyxDQUFDWSxhQUFOLENBQW9CQyxJQUFwQixDQUF5QixVQUFVQyxDQUFWLEVBQWE7QUFDdEQsZUFBT0EsQ0FBQyxDQUFDTCxHQUFGLEtBQVVDLFdBQVcsQ0FBQyxLQUFELENBQTVCO0FBQ0QsT0FGaUIsQ0FBbEI7O0FBSUEsVUFBSSxPQUFPQyxXQUFQLEtBQXVCLFdBQTNCLEVBQXdDLE9BQU8sS0FBUDs7QUFFeENYLE1BQUFBLEtBQUssQ0FBQ0gsTUFBTixDQUFha0IsSUFBYixDQUFrQjtBQUNoQk4sUUFBQUEsR0FBRyxFQUFFQyxXQUFXLENBQUMsS0FBRCxDQURBO0FBRWhCTSxRQUFBQSxLQUFLLEVBQUVOLFdBQVcsQ0FBQyxPQUFELENBRkY7QUFHaEJPLFFBQUFBLEtBQUssRUFBRU4sV0FBVyxDQUFDLE9BQUQ7QUFIRixPQUFsQjtBQUtELEtBZEQ7QUFlQTs7QUFFQVgsSUFBQUEsS0FBSyxDQUFDWSxhQUFOLENBQW9CSixPQUFwQixDQUE0QixVQUFVRyxXQUFWLEVBQXVCO0FBQ2pELFVBQUlELFdBQVcsR0FBR1YsS0FBSyxDQUFDSCxNQUFOLENBQWFnQixJQUFiLENBQWtCLFVBQVVDLENBQVYsRUFBYTtBQUMvQyxlQUFPQSxDQUFDLENBQUNMLEdBQUYsS0FBVUUsV0FBVyxDQUFDLEtBQUQsQ0FBNUI7QUFDRCxPQUZpQixDQUFsQjs7QUFJQSxVQUFJRCxXQUFKLEVBQWlCLE9BQU8sS0FBUDs7QUFFakJWLE1BQUFBLEtBQUssQ0FBQ0gsTUFBTixDQUFha0IsSUFBYixDQUFrQkosV0FBbEI7QUFDRCxLQVJEO0FBU0QsR0F6Q2lDO0FBMENsQ08sRUFBQUEsT0FBTyxFQUFFLEVBMUN5QjtBQTJDbENDLEVBQUFBLEtBQUssRUFBRTtBQUNMdEIsSUFBQUEsTUFBTSxFQUFFO0FBQ051QixNQUFBQSxJQUFJLEVBQUUsSUFEQTtBQUVOQyxNQUFBQSxPQUFPLEVBQUUsU0FBU0EsT0FBVCxDQUFpQnhCLE1BQWpCLEVBQXlCO0FBQ2hDLFlBQUl5QixZQUFZLEdBQUcsRUFBbkI7QUFDQXpCLFFBQUFBLE1BQU0sQ0FBQ1csT0FBUCxDQUFlLFVBQVVlLElBQVYsRUFBZ0I7QUFDN0JELFVBQUFBLFlBQVksQ0FBQ1AsSUFBYixDQUFrQjtBQUNoQk4sWUFBQUEsR0FBRyxFQUFFYyxJQUFJLENBQUNkLEdBRE07QUFFaEJPLFlBQUFBLEtBQUssRUFBRU8sSUFBSSxDQUFDUDtBQUZJLFdBQWxCO0FBSUQsU0FMRDtBQU1BLGFBQUtRLEtBQUwsQ0FBVyxrQkFBWCxFQUErQkYsWUFBL0I7QUFDRDtBQVhLO0FBREg7QUEzQzJCLENBQXBDIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cblZ1ZS5jb21wb25lbnQoJ3dwY2Z0b19tdWx0aV9pbnB1dCcsIHtcbiAgcHJvcHM6IFsnZmllbGRzJywgJ2ZpZWxkX2xhYmVsJywgJ2ZpZWxkX25hbWUnLCAnZmllbGRfaWQnLCAnZmllbGRfdmFsdWUnLCAnZmllbGRfb3B0aW9ucyddLFxuICBkYXRhOiBmdW5jdGlvbiBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpbnB1dHM6IFtdXG4gICAgfTtcbiAgfSxcbiAgdGVtcGxhdGU6IFwiXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9fZ2VuZXJpY19maWVsZCB3cGNmdG9fZ2VuZXJpY19maWVsZF9tdWx0aV9pbnB1dFxcXCIgdi1iaW5kOmNsYXNzPVxcXCJmaWVsZF9pZFxcXCI+XFxuXFxuICAgICAgICAgICAgPHdwY2Z0b19maWVsZHNfYXNpZGVfYmVmb3JlIDpmaWVsZHM9XFxcImZpZWxkc1xcXCIgOmZpZWxkX2xhYmVsPVxcXCJmaWVsZF9sYWJlbFxcXCI+PC93cGNmdG9fZmllbGRzX2FzaWRlX2JlZm9yZT5cXG5cXHRcXHRcXHRcXG5cXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJ3cGNmdG8tZmllbGQtY29udGVudFxcXCI+XFxuXFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwid3BjZnRvX3NvcnRlclxcXCI+XFxuXFx0XFxuXFx0XFx0XFx0XFx0XFx0PGRyYWdnYWJsZSBjbGFzcz1cXFwibGlzdC1ncm91cFxcXCJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQgICA6bGlzdD1cXFwiaW5wdXRzXFxcIlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdCAgIGdyb3VwPVxcXCJpbnB1dHNcXFwiPlxcblxcdFxcblxcdFxcdFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcIndwY2Z0b19nZW5lcmljX2ZpZWxkIHdwY2Z0b19nZW5lcmljX2ZpZWxkX2ZsZXhfaW5wdXQgd3BjZnRvX2dlbmVyaWNfZmllbGRfX3RleHRcXFwiXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0IHYtZm9yPVxcXCIoaW5wdXQsIGlucHV0X2tleSkgaW4gaW5wdXRzXFxcIlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdCA6a2V5PVxcXCJpbnB1dFsna2V5J11cXFwiPlxcblxcdFxcblxcdFxcdFxcdFxcdFxcdFxcdCAgPGRpdiBjbGFzcz1cXFwid3BjZnRvX211bHRpX2lucHV0X2xhYmVsXFxcIj57e2lucHV0WydsYWJlbCddfX08L2Rpdj5cXG5cXHRcXG5cXHRcXHRcXHRcXHRcXHRcXHQgIDxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiB2LW1vZGVsPVxcXCJpbnB1dFsndmFsdWUnXVxcXCIgdi1iaW5kOnBsYWNlaG9sZGVyPVxcXCJpbnB1dFsnbGFiZWwnXVxcXCIgLz5cXG5cXHRcXG5cXHRcXHRcXHRcXHRcXHRcXHQgIDxzcGFuIGNsYXNzPVxcXCJ3cGNmdG9fbXVsdGlfaW5wdXRfaWNvblxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWFycm93cy1hbHRcXFwiPjwvaT48L3NwYW4+XFxuXFx0XFxuXFx0XFx0XFx0XFx0XFx0XFx0PC9kaXY+XFxuXFx0XFxuXFx0XFx0XFx0XFx0XFx0IDwvZHJhZ2dhYmxlPlxcblxcdFxcblxcdFxcdFxcdFxcdCA8L2Rpdj5cXG5cXHRcXHRcXHQgPC9kaXY+XFxuXFxuXFx0XFx0XFx0IDx3cGNmdG9fZmllbGRzX2FzaWRlX2FmdGVyIDpmaWVsZHM9XFxcImZpZWxkc1xcXCI+PC93cGNmdG9fZmllbGRzX2FzaWRlX2FmdGVyPlxcblxcbiAgICAgICAgPC9kaXY+XFxuICAgIFwiLFxuICBtb3VudGVkOiBmdW5jdGlvbiBtb3VudGVkKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICBpZiAodHlwZW9mIF90aGlzLmZpZWxkX3ZhbHVlID09PSAnc3RyaW5nJyAmJiBXcGNmdG9Jc0pzb25TdHJpbmcoX3RoaXMuZmllbGRfdmFsdWUpKSBfdGhpcy5maWVsZF92YWx1ZSA9IEpTT04ucGFyc2UoX3RoaXMuZmllbGRfdmFsdWUpO1xuICAgIGlmICghX3RoaXMuZmllbGRfdmFsdWUubGVuZ3RoKSBfdGhpcy5maWVsZF92YWx1ZSA9IHt9O1xuICAgIC8qR2V0IHNvcnRlZCBpdGVtcyovXG5cbiAgICBPYmplY3Qua2V5cyhfdGhpcy5maWVsZF92YWx1ZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICB2YXIgc3RvcmVkX2l0ZW0gPSBfdGhpcy5maWVsZF92YWx1ZVtrZXldO1xuXG4gICAgICB2YXIgY29uZmlnX2l0ZW0gPSBfdGhpcy5maWVsZF9vcHRpb25zLmZpbmQoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgcmV0dXJuIHgua2V5ID09PSBzdG9yZWRfaXRlbVsna2V5J107XG4gICAgICB9KTtcblxuICAgICAgaWYgKHR5cGVvZiBjb25maWdfaXRlbSA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiBmYWxzZTtcblxuICAgICAgX3RoaXMuaW5wdXRzLnB1c2goe1xuICAgICAgICBrZXk6IHN0b3JlZF9pdGVtWydrZXknXSxcbiAgICAgICAgdmFsdWU6IHN0b3JlZF9pdGVtWyd2YWx1ZSddLFxuICAgICAgICBsYWJlbDogY29uZmlnX2l0ZW1bJ2xhYmVsJ11cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIC8qQWRkIG5ldyBpdGVtcyBmcm9tIGNvbmZpZyovXG5cbiAgICBfdGhpcy5maWVsZF9vcHRpb25zLmZvckVhY2goZnVuY3Rpb24gKGNvbmZpZ19pdGVtKSB7XG4gICAgICB2YXIgc3RvcmVkX2l0ZW0gPSBfdGhpcy5pbnB1dHMuZmluZChmdW5jdGlvbiAoeCkge1xuICAgICAgICByZXR1cm4geC5rZXkgPT09IGNvbmZpZ19pdGVtWydrZXknXTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoc3RvcmVkX2l0ZW0pIHJldHVybiBmYWxzZTtcblxuICAgICAgX3RoaXMuaW5wdXRzLnB1c2goY29uZmlnX2l0ZW0pO1xuICAgIH0pO1xuICB9LFxuICBtZXRob2RzOiB7fSxcbiAgd2F0Y2g6IHtcbiAgICBpbnB1dHM6IHtcbiAgICAgIGRlZXA6IHRydWUsXG4gICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKGlucHV0cykge1xuICAgICAgICB2YXIgaW5wdXRzX3ZhbHVlID0gW107XG4gICAgICAgIGlucHV0cy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgaW5wdXRzX3ZhbHVlLnB1c2goe1xuICAgICAgICAgICAga2V5OiBpdGVtLmtleSxcbiAgICAgICAgICAgIHZhbHVlOiBpdGVtLnZhbHVlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLiRlbWl0KCd3cGNmdG8tZ2V0LXZhbHVlJywgaW5wdXRzX3ZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pOyJdfQ==
},{}]},{},[1])
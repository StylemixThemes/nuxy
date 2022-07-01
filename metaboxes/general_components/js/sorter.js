(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Vue.component('wpcfto_sorter', {
  props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value', 'field_options'],
  data: function data() {
    return {
      columns: []
    };
  },
  template: "\n        <div class=\"wpcfto_generic_field wpcfto_generic_field_sorter\" v-bind:class=\"field_id\" :class=\"'columns-' + columns.length\">\n\n\t\t\t<wpcfto_fields_aside_before :fields=\"fields\" :field_label=\"field_label\"></wpcfto_fields_aside_before>\n\t\t\t\n\t\t\t<div class=\"wpcfto-field-content\">\n\t\t\t\n\t\t\t\t<div class=\"wpcfto_sorter\">\n\t\n\t\t\t\t\t<div v-for=\"(column, column_key) in columns\" class=\"wpcfto_sorter_single\">\n\t\n\t\t\t\t\t\t<h6 v-html=\"column['name']\"></h6>\n\t\n\t\t\t\t\t\t<draggable class=\"list-group\"\n\t\t\t\t\t\t\t\t   draggable=\".list-group-item:not(.disable)\"\n\t\t\t\t\t\t\t\t   :list=\"column['options']\"\n\t\t\t\t\t\t\t\t   group=\"list\"\n\t\t\t\t\t\t\t\t   key=\"column_key\">\n\t\n\t\t\t\t\t\t\t<div class=\"list-group-item\"\n\t\t\t\t\t\t\t    :data-id=\"element['id']\"\n\t\t\t\t\t\t\t\t v-for=\"(element, element_key) in column['options']\"\n\t\t\t\t\t\t\t\t :key=\"element['id']\"\n\t\t\t\t\t\t\t\t :class=\"[element['class'] ? element['class'] : '']\"\n\t\t\t\t\t\t\t\t >\n\t\t\t\t\t\t\t  {{element['label']}}\n\t\t\t\t\t\t\t  <i :class=\"element['icon']\"></i>\n\t\t\t\t\t\t\t</div>\n\t\n\t\t\t\t\t\t </draggable>\n\t\n\t\t\t\t\t </div>\n\t\n\t\t\t\t </div>\n\t\t\t\t \n\t\t\t</div>\n\n\t\t\t <wpcfto_fields_aside_after :fields=\"fields\"></wpcfto_fields_aside_after>\n\n        </div>\n    ",
  mounted: function mounted() {
    this.columns = typeof this.field_value !== 'undefined' ? this.field_value : this.field_options;
    if (typeof this.field_value === 'string' && WpcftoIsJsonString(this.field_value)) this.columns = JSON.parse(this.field_value);
    if (!this.columns.length) this.columns = this.field_options;
    this.fillNewOptions();
  },
  methods: {
    fillNewOptions: function fillNewOptions() {
      var _this = this;
      /*Get current saved keys*/


      var fields = [];
      var keys = [];

      _this.columns.forEach(function (column, column_key) {
        column['options'].forEach(function (field) {
          fields[field.id] = field.label;
        });
      });
      /*Add new fields from config*/


      _this.field_options.forEach(function (column, column_key) {
        column['options'].forEach(function (field) {
          keys[field.id] = field.label;
          if (typeof fields[field['id']] !== 'undefined') return false;

          _this.columns[column_key]['options'].push(field);
        });
      });
      /*Remove deleted config fields from stored in db*/


      _this.columns.forEach(function (column, column_key) {
        column['options'].forEach(function (field, field_key) {
          if (typeof keys[field['id']] !== 'undefined') return false;

          _this.columns[column_key]['options'].splice(field_key, 1);
        });
      });
    }
  },
  watch: {
    columns: {
      deep: true,
      handler: function handler(columns) {
        this.$emit('wpcfto-get-value', columns);
      }
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJjb2x1bW5zIiwidGVtcGxhdGUiLCJtb3VudGVkIiwiZmllbGRfdmFsdWUiLCJmaWVsZF9vcHRpb25zIiwiV3BjZnRvSXNKc29uU3RyaW5nIiwiSlNPTiIsInBhcnNlIiwibGVuZ3RoIiwiZmlsbE5ld09wdGlvbnMiLCJtZXRob2RzIiwiX3RoaXMiLCJmaWVsZHMiLCJrZXlzIiwiZm9yRWFjaCIsImNvbHVtbiIsImNvbHVtbl9rZXkiLCJmaWVsZCIsImlkIiwibGFiZWwiLCJwdXNoIiwiZmllbGRfa2V5Iiwic3BsaWNlIiwid2F0Y2giLCJkZWVwIiwiaGFuZGxlciIsIiRlbWl0Il0sInNvdXJjZXMiOlsiZmFrZV8yMzM4MDhhLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5WdWUuY29tcG9uZW50KCd3cGNmdG9fc29ydGVyJywge1xuICBwcm9wczogWydmaWVsZHMnLCAnZmllbGRfbGFiZWwnLCAnZmllbGRfbmFtZScsICdmaWVsZF9pZCcsICdmaWVsZF92YWx1ZScsICdmaWVsZF9vcHRpb25zJ10sXG4gIGRhdGE6IGZ1bmN0aW9uIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbHVtbnM6IFtdXG4gICAgfTtcbiAgfSxcbiAgdGVtcGxhdGU6IFwiXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9fZ2VuZXJpY19maWVsZCB3cGNmdG9fZ2VuZXJpY19maWVsZF9zb3J0ZXJcXFwiIHYtYmluZDpjbGFzcz1cXFwiZmllbGRfaWRcXFwiIDpjbGFzcz1cXFwiJ2NvbHVtbnMtJyArIGNvbHVtbnMubGVuZ3RoXFxcIj5cXG5cXG5cXHRcXHRcXHQ8d3BjZnRvX2ZpZWxkc19hc2lkZV9iZWZvcmUgOmZpZWxkcz1cXFwiZmllbGRzXFxcIiA6ZmllbGRfbGFiZWw9XFxcImZpZWxkX2xhYmVsXFxcIj48L3dwY2Z0b19maWVsZHNfYXNpZGVfYmVmb3JlPlxcblxcdFxcdFxcdFxcblxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcIndwY2Z0by1maWVsZC1jb250ZW50XFxcIj5cXG5cXHRcXHRcXHRcXG5cXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9fc29ydGVyXFxcIj5cXG5cXHRcXG5cXHRcXHRcXHRcXHRcXHQ8ZGl2IHYtZm9yPVxcXCIoY29sdW1uLCBjb2x1bW5fa2V5KSBpbiBjb2x1bW5zXFxcIiBjbGFzcz1cXFwid3BjZnRvX3NvcnRlcl9zaW5nbGVcXFwiPlxcblxcdFxcblxcdFxcdFxcdFxcdFxcdFxcdDxoNiB2LWh0bWw9XFxcImNvbHVtblsnbmFtZSddXFxcIj48L2g2PlxcblxcdFxcblxcdFxcdFxcdFxcdFxcdFxcdDxkcmFnZ2FibGUgY2xhc3M9XFxcImxpc3QtZ3JvdXBcXFwiXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0ICAgZHJhZ2dhYmxlPVxcXCIubGlzdC1ncm91cC1pdGVtOm5vdCguZGlzYWJsZSlcXFwiXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0ICAgOmxpc3Q9XFxcImNvbHVtblsnb3B0aW9ucyddXFxcIlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdFxcdCAgIGdyb3VwPVxcXCJsaXN0XFxcIlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdFxcdCAgIGtleT1cXFwiY29sdW1uX2tleVxcXCI+XFxuXFx0XFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwibGlzdC1ncm91cC1pdGVtXFxcIlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdCAgICA6ZGF0YS1pZD1cXFwiZWxlbWVudFsnaWQnXVxcXCJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHQgdi1mb3I9XFxcIihlbGVtZW50LCBlbGVtZW50X2tleSkgaW4gY29sdW1uWydvcHRpb25zJ11cXFwiXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0IDprZXk9XFxcImVsZW1lbnRbJ2lkJ11cXFwiXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0IDpjbGFzcz1cXFwiW2VsZW1lbnRbJ2NsYXNzJ10gPyBlbGVtZW50WydjbGFzcyddIDogJyddXFxcIlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdFxcdCA+XFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0ICB7e2VsZW1lbnRbJ2xhYmVsJ119fVxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdCAgPGkgOmNsYXNzPVxcXCJlbGVtZW50WydpY29uJ11cXFwiPjwvaT5cXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQ8L2Rpdj5cXG5cXHRcXG5cXHRcXHRcXHRcXHRcXHRcXHQgPC9kcmFnZ2FibGU+XFxuXFx0XFxuXFx0XFx0XFx0XFx0XFx0IDwvZGl2PlxcblxcdFxcblxcdFxcdFxcdFxcdCA8L2Rpdj5cXG5cXHRcXHRcXHRcXHQgXFxuXFx0XFx0XFx0PC9kaXY+XFxuXFxuXFx0XFx0XFx0IDx3cGNmdG9fZmllbGRzX2FzaWRlX2FmdGVyIDpmaWVsZHM9XFxcImZpZWxkc1xcXCI+PC93cGNmdG9fZmllbGRzX2FzaWRlX2FmdGVyPlxcblxcbiAgICAgICAgPC9kaXY+XFxuICAgIFwiLFxuICBtb3VudGVkOiBmdW5jdGlvbiBtb3VudGVkKCkge1xuICAgIHRoaXMuY29sdW1ucyA9IHR5cGVvZiB0aGlzLmZpZWxkX3ZhbHVlICE9PSAndW5kZWZpbmVkJyA/IHRoaXMuZmllbGRfdmFsdWUgOiB0aGlzLmZpZWxkX29wdGlvbnM7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmZpZWxkX3ZhbHVlID09PSAnc3RyaW5nJyAmJiBXcGNmdG9Jc0pzb25TdHJpbmcodGhpcy5maWVsZF92YWx1ZSkpIHRoaXMuY29sdW1ucyA9IEpTT04ucGFyc2UodGhpcy5maWVsZF92YWx1ZSk7XG4gICAgaWYgKCF0aGlzLmNvbHVtbnMubGVuZ3RoKSB0aGlzLmNvbHVtbnMgPSB0aGlzLmZpZWxkX29wdGlvbnM7XG4gICAgdGhpcy5maWxsTmV3T3B0aW9ucygpO1xuICB9LFxuICBtZXRob2RzOiB7XG4gICAgZmlsbE5ld09wdGlvbnM6IGZ1bmN0aW9uIGZpbGxOZXdPcHRpb25zKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgIC8qR2V0IGN1cnJlbnQgc2F2ZWQga2V5cyovXG5cblxuICAgICAgdmFyIGZpZWxkcyA9IFtdO1xuICAgICAgdmFyIGtleXMgPSBbXTtcblxuICAgICAgX3RoaXMuY29sdW1ucy5mb3JFYWNoKGZ1bmN0aW9uIChjb2x1bW4sIGNvbHVtbl9rZXkpIHtcbiAgICAgICAgY29sdW1uWydvcHRpb25zJ10uZm9yRWFjaChmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgICAgICBmaWVsZHNbZmllbGQuaWRdID0gZmllbGQubGFiZWw7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICAvKkFkZCBuZXcgZmllbGRzIGZyb20gY29uZmlnKi9cblxuXG4gICAgICBfdGhpcy5maWVsZF9vcHRpb25zLmZvckVhY2goZnVuY3Rpb24gKGNvbHVtbiwgY29sdW1uX2tleSkge1xuICAgICAgICBjb2x1bW5bJ29wdGlvbnMnXS5mb3JFYWNoKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICAgIGtleXNbZmllbGQuaWRdID0gZmllbGQubGFiZWw7XG4gICAgICAgICAgaWYgKHR5cGVvZiBmaWVsZHNbZmllbGRbJ2lkJ11dICE9PSAndW5kZWZpbmVkJykgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgX3RoaXMuY29sdW1uc1tjb2x1bW5fa2V5XVsnb3B0aW9ucyddLnB1c2goZmllbGQpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgLypSZW1vdmUgZGVsZXRlZCBjb25maWcgZmllbGRzIGZyb20gc3RvcmVkIGluIGRiKi9cblxuXG4gICAgICBfdGhpcy5jb2x1bW5zLmZvckVhY2goZnVuY3Rpb24gKGNvbHVtbiwgY29sdW1uX2tleSkge1xuICAgICAgICBjb2x1bW5bJ29wdGlvbnMnXS5mb3JFYWNoKGZ1bmN0aW9uIChmaWVsZCwgZmllbGRfa2V5KSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBrZXlzW2ZpZWxkWydpZCddXSAhPT0gJ3VuZGVmaW5lZCcpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgIF90aGlzLmNvbHVtbnNbY29sdW1uX2tleV1bJ29wdGlvbnMnXS5zcGxpY2UoZmllbGRfa2V5LCAxKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgY29sdW1uczoge1xuICAgICAgZGVlcDogdHJ1ZSxcbiAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoY29sdW1ucykge1xuICAgICAgICB0aGlzLiRlbWl0KCd3cGNmdG8tZ2V0LXZhbHVlJywgY29sdW1ucyk7XG4gICAgICB9XG4gICAgfVxuICB9XG59KTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBQSxHQUFHLENBQUNDLFNBQUosQ0FBYyxlQUFkLEVBQStCO0VBQzdCQyxLQUFLLEVBQUUsQ0FBQyxRQUFELEVBQVcsYUFBWCxFQUEwQixZQUExQixFQUF3QyxVQUF4QyxFQUFvRCxhQUFwRCxFQUFtRSxlQUFuRSxDQURzQjtFQUU3QkMsSUFBSSxFQUFFLFNBQVNBLElBQVQsR0FBZ0I7SUFDcEIsT0FBTztNQUNMQyxPQUFPLEVBQUU7SUFESixDQUFQO0VBR0QsQ0FONEI7RUFPN0JDLFFBQVEsRUFBRSxpMUNBUG1CO0VBUTdCQyxPQUFPLEVBQUUsU0FBU0EsT0FBVCxHQUFtQjtJQUMxQixLQUFLRixPQUFMLEdBQWUsT0FBTyxLQUFLRyxXQUFaLEtBQTRCLFdBQTVCLEdBQTBDLEtBQUtBLFdBQS9DLEdBQTZELEtBQUtDLGFBQWpGO0lBQ0EsSUFBSSxPQUFPLEtBQUtELFdBQVosS0FBNEIsUUFBNUIsSUFBd0NFLGtCQUFrQixDQUFDLEtBQUtGLFdBQU4sQ0FBOUQsRUFBa0YsS0FBS0gsT0FBTCxHQUFlTSxJQUFJLENBQUNDLEtBQUwsQ0FBVyxLQUFLSixXQUFoQixDQUFmO0lBQ2xGLElBQUksQ0FBQyxLQUFLSCxPQUFMLENBQWFRLE1BQWxCLEVBQTBCLEtBQUtSLE9BQUwsR0FBZSxLQUFLSSxhQUFwQjtJQUMxQixLQUFLSyxjQUFMO0VBQ0QsQ0FiNEI7RUFjN0JDLE9BQU8sRUFBRTtJQUNQRCxjQUFjLEVBQUUsU0FBU0EsY0FBVCxHQUEwQjtNQUN4QyxJQUFJRSxLQUFLLEdBQUcsSUFBWjtNQUNBOzs7TUFHQSxJQUFJQyxNQUFNLEdBQUcsRUFBYjtNQUNBLElBQUlDLElBQUksR0FBRyxFQUFYOztNQUVBRixLQUFLLENBQUNYLE9BQU4sQ0FBY2MsT0FBZCxDQUFzQixVQUFVQyxNQUFWLEVBQWtCQyxVQUFsQixFQUE4QjtRQUNsREQsTUFBTSxDQUFDLFNBQUQsQ0FBTixDQUFrQkQsT0FBbEIsQ0FBMEIsVUFBVUcsS0FBVixFQUFpQjtVQUN6Q0wsTUFBTSxDQUFDSyxLQUFLLENBQUNDLEVBQVAsQ0FBTixHQUFtQkQsS0FBSyxDQUFDRSxLQUF6QjtRQUNELENBRkQ7TUFHRCxDQUpEO01BS0E7OztNQUdBUixLQUFLLENBQUNQLGFBQU4sQ0FBb0JVLE9BQXBCLENBQTRCLFVBQVVDLE1BQVYsRUFBa0JDLFVBQWxCLEVBQThCO1FBQ3hERCxNQUFNLENBQUMsU0FBRCxDQUFOLENBQWtCRCxPQUFsQixDQUEwQixVQUFVRyxLQUFWLEVBQWlCO1VBQ3pDSixJQUFJLENBQUNJLEtBQUssQ0FBQ0MsRUFBUCxDQUFKLEdBQWlCRCxLQUFLLENBQUNFLEtBQXZCO1VBQ0EsSUFBSSxPQUFPUCxNQUFNLENBQUNLLEtBQUssQ0FBQyxJQUFELENBQU4sQ0FBYixLQUErQixXQUFuQyxFQUFnRCxPQUFPLEtBQVA7O1VBRWhETixLQUFLLENBQUNYLE9BQU4sQ0FBY2dCLFVBQWQsRUFBMEIsU0FBMUIsRUFBcUNJLElBQXJDLENBQTBDSCxLQUExQztRQUNELENBTEQ7TUFNRCxDQVBEO01BUUE7OztNQUdBTixLQUFLLENBQUNYLE9BQU4sQ0FBY2MsT0FBZCxDQUFzQixVQUFVQyxNQUFWLEVBQWtCQyxVQUFsQixFQUE4QjtRQUNsREQsTUFBTSxDQUFDLFNBQUQsQ0FBTixDQUFrQkQsT0FBbEIsQ0FBMEIsVUFBVUcsS0FBVixFQUFpQkksU0FBakIsRUFBNEI7VUFDcEQsSUFBSSxPQUFPUixJQUFJLENBQUNJLEtBQUssQ0FBQyxJQUFELENBQU4sQ0FBWCxLQUE2QixXQUFqQyxFQUE4QyxPQUFPLEtBQVA7O1VBRTlDTixLQUFLLENBQUNYLE9BQU4sQ0FBY2dCLFVBQWQsRUFBMEIsU0FBMUIsRUFBcUNNLE1BQXJDLENBQTRDRCxTQUE1QyxFQUF1RCxDQUF2RDtRQUNELENBSkQ7TUFLRCxDQU5EO0lBT0Q7RUFuQ00sQ0Fkb0I7RUFtRDdCRSxLQUFLLEVBQUU7SUFDTHZCLE9BQU8sRUFBRTtNQUNQd0IsSUFBSSxFQUFFLElBREM7TUFFUEMsT0FBTyxFQUFFLFNBQVNBLE9BQVQsQ0FBaUJ6QixPQUFqQixFQUEwQjtRQUNqQyxLQUFLMEIsS0FBTCxDQUFXLGtCQUFYLEVBQStCMUIsT0FBL0I7TUFDRDtJQUpNO0VBREo7QUFuRHNCLENBQS9CIn0=
},{}]},{},[1])
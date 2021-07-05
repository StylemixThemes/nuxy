(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Vue.component('wpcfto_sorter', {
  props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value', 'field_options'],
  data: function data() {
    return {
      columns: []
    };
  },
  template: "\n        <div class=\"wpcfto_generic_field wpcfto_generic_field_sorter\" v-bind:class=\"field_id\" :class=\"'columns-' + columns.length\">\n\n\t\t\t<wpcfto_fields_aside_before :fields=\"fields\" :field_label=\"field_label\"></wpcfto_fields_aside_before>\n\t\t\t\n\t\t\t<div class=\"wpcfto-field-content\">\n\t\t\t\n\t\t\t\t<div class=\"wpcfto_sorter\">\n\t\n\t\t\t\t\t<div v-for=\"(column, column_key) in columns\" class=\"wpcfto_sorter_single\">\n\t\n\t\t\t\t\t\t<h6 v-html=\"column['name']\"></h6>\n\t\n\t\t\t\t\t\t<draggable class=\"list-group\"\n\t\t\t\t\t\t\t\t   :list=\"column['options']\"\n\t\t\t\t\t\t\t\t   group=\"list\"\n\t\t\t\t\t\t\t\t   key=\"column_key\">\n\t\n\t\t\t\t\t\t\t<div class=\"list-group-item\"\n\t\t\t\t\t\t\t\t v-for=\"(element, element_key) in column['options']\"\n\t\t\t\t\t\t\t\t :key=\"element['id']\">\n\t\n\t\t\t\t\t\t\t  {{element['label']}}\n\t\n\t\t\t\t\t\t\t</div>\n\t\n\t\t\t\t\t\t </draggable>\n\t\n\t\t\t\t\t </div>\n\t\n\t\t\t\t </div>\n\t\t\t\t \n\t\t\t</div>\n\n\t\t\t <wpcfto_fields_aside_after :fields=\"fields\"></wpcfto_fields_aside_after>\n\n        </div>\n    ",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfNWZiMGNhZC5qcyJdLCJuYW1lcyI6WyJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJjb2x1bW5zIiwidGVtcGxhdGUiLCJtb3VudGVkIiwiZmllbGRfdmFsdWUiLCJmaWVsZF9vcHRpb25zIiwiV3BjZnRvSXNKc29uU3RyaW5nIiwiSlNPTiIsInBhcnNlIiwibGVuZ3RoIiwiZmlsbE5ld09wdGlvbnMiLCJtZXRob2RzIiwiX3RoaXMiLCJmaWVsZHMiLCJrZXlzIiwiZm9yRWFjaCIsImNvbHVtbiIsImNvbHVtbl9rZXkiLCJmaWVsZCIsImlkIiwibGFiZWwiLCJwdXNoIiwiZmllbGRfa2V5Iiwic3BsaWNlIiwid2F0Y2giLCJkZWVwIiwiaGFuZGxlciIsIiRlbWl0Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQUEsR0FBRyxDQUFDQyxTQUFKLENBQWMsZUFBZCxFQUErQjtBQUM3QkMsRUFBQUEsS0FBSyxFQUFFLENBQUMsUUFBRCxFQUFXLGFBQVgsRUFBMEIsWUFBMUIsRUFBd0MsVUFBeEMsRUFBb0QsYUFBcEQsRUFBbUUsZUFBbkUsQ0FEc0I7QUFFN0JDLEVBQUFBLElBQUksRUFBRSxTQUFTQSxJQUFULEdBQWdCO0FBQ3BCLFdBQU87QUFDTEMsTUFBQUEsT0FBTyxFQUFFO0FBREosS0FBUDtBQUdELEdBTjRCO0FBTzdCQyxFQUFBQSxRQUFRLEVBQUUsMmxDQVBtQjtBQVE3QkMsRUFBQUEsT0FBTyxFQUFFLFNBQVNBLE9BQVQsR0FBbUI7QUFDMUIsU0FBS0YsT0FBTCxHQUFlLE9BQU8sS0FBS0csV0FBWixLQUE0QixXQUE1QixHQUEwQyxLQUFLQSxXQUEvQyxHQUE2RCxLQUFLQyxhQUFqRjtBQUNBLFFBQUksT0FBTyxLQUFLRCxXQUFaLEtBQTRCLFFBQTVCLElBQXdDRSxrQkFBa0IsQ0FBQyxLQUFLRixXQUFOLENBQTlELEVBQWtGLEtBQUtILE9BQUwsR0FBZU0sSUFBSSxDQUFDQyxLQUFMLENBQVcsS0FBS0osV0FBaEIsQ0FBZjtBQUNsRixRQUFJLENBQUMsS0FBS0gsT0FBTCxDQUFhUSxNQUFsQixFQUEwQixLQUFLUixPQUFMLEdBQWUsS0FBS0ksYUFBcEI7QUFDMUIsU0FBS0ssY0FBTDtBQUNELEdBYjRCO0FBYzdCQyxFQUFBQSxPQUFPLEVBQUU7QUFDUEQsSUFBQUEsY0FBYyxFQUFFLFNBQVNBLGNBQVQsR0FBMEI7QUFDeEMsVUFBSUUsS0FBSyxHQUFHLElBQVo7QUFDQTs7O0FBR0EsVUFBSUMsTUFBTSxHQUFHLEVBQWI7QUFDQSxVQUFJQyxJQUFJLEdBQUcsRUFBWDs7QUFFQUYsTUFBQUEsS0FBSyxDQUFDWCxPQUFOLENBQWNjLE9BQWQsQ0FBc0IsVUFBVUMsTUFBVixFQUFrQkMsVUFBbEIsRUFBOEI7QUFDbERELFFBQUFBLE1BQU0sQ0FBQyxTQUFELENBQU4sQ0FBa0JELE9BQWxCLENBQTBCLFVBQVVHLEtBQVYsRUFBaUI7QUFDekNMLFVBQUFBLE1BQU0sQ0FBQ0ssS0FBSyxDQUFDQyxFQUFQLENBQU4sR0FBbUJELEtBQUssQ0FBQ0UsS0FBekI7QUFDRCxTQUZEO0FBR0QsT0FKRDtBQUtBOzs7QUFHQVIsTUFBQUEsS0FBSyxDQUFDUCxhQUFOLENBQW9CVSxPQUFwQixDQUE0QixVQUFVQyxNQUFWLEVBQWtCQyxVQUFsQixFQUE4QjtBQUN4REQsUUFBQUEsTUFBTSxDQUFDLFNBQUQsQ0FBTixDQUFrQkQsT0FBbEIsQ0FBMEIsVUFBVUcsS0FBVixFQUFpQjtBQUN6Q0osVUFBQUEsSUFBSSxDQUFDSSxLQUFLLENBQUNDLEVBQVAsQ0FBSixHQUFpQkQsS0FBSyxDQUFDRSxLQUF2QjtBQUNBLGNBQUksT0FBT1AsTUFBTSxDQUFDSyxLQUFLLENBQUMsSUFBRCxDQUFOLENBQWIsS0FBK0IsV0FBbkMsRUFBZ0QsT0FBTyxLQUFQOztBQUVoRE4sVUFBQUEsS0FBSyxDQUFDWCxPQUFOLENBQWNnQixVQUFkLEVBQTBCLFNBQTFCLEVBQXFDSSxJQUFyQyxDQUEwQ0gsS0FBMUM7QUFDRCxTQUxEO0FBTUQsT0FQRDtBQVFBOzs7QUFHQU4sTUFBQUEsS0FBSyxDQUFDWCxPQUFOLENBQWNjLE9BQWQsQ0FBc0IsVUFBVUMsTUFBVixFQUFrQkMsVUFBbEIsRUFBOEI7QUFDbERELFFBQUFBLE1BQU0sQ0FBQyxTQUFELENBQU4sQ0FBa0JELE9BQWxCLENBQTBCLFVBQVVHLEtBQVYsRUFBaUJJLFNBQWpCLEVBQTRCO0FBQ3BELGNBQUksT0FBT1IsSUFBSSxDQUFDSSxLQUFLLENBQUMsSUFBRCxDQUFOLENBQVgsS0FBNkIsV0FBakMsRUFBOEMsT0FBTyxLQUFQOztBQUU5Q04sVUFBQUEsS0FBSyxDQUFDWCxPQUFOLENBQWNnQixVQUFkLEVBQTBCLFNBQTFCLEVBQXFDTSxNQUFyQyxDQUE0Q0QsU0FBNUMsRUFBdUQsQ0FBdkQ7QUFDRCxTQUpEO0FBS0QsT0FORDtBQU9EO0FBbkNNLEdBZG9CO0FBbUQ3QkUsRUFBQUEsS0FBSyxFQUFFO0FBQ0x2QixJQUFBQSxPQUFPLEVBQUU7QUFDUHdCLE1BQUFBLElBQUksRUFBRSxJQURDO0FBRVBDLE1BQUFBLE9BQU8sRUFBRSxTQUFTQSxPQUFULENBQWlCekIsT0FBakIsRUFBMEI7QUFDakMsYUFBSzBCLEtBQUwsQ0FBVyxrQkFBWCxFQUErQjFCLE9BQS9CO0FBQ0Q7QUFKTTtBQURKO0FBbkRzQixDQUEvQiIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5WdWUuY29tcG9uZW50KCd3cGNmdG9fc29ydGVyJywge1xuICBwcm9wczogWydmaWVsZHMnLCAnZmllbGRfbGFiZWwnLCAnZmllbGRfbmFtZScsICdmaWVsZF9pZCcsICdmaWVsZF92YWx1ZScsICdmaWVsZF9vcHRpb25zJ10sXG4gIGRhdGE6IGZ1bmN0aW9uIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbHVtbnM6IFtdXG4gICAgfTtcbiAgfSxcbiAgdGVtcGxhdGU6IFwiXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9fZ2VuZXJpY19maWVsZCB3cGNmdG9fZ2VuZXJpY19maWVsZF9zb3J0ZXJcXFwiIHYtYmluZDpjbGFzcz1cXFwiZmllbGRfaWRcXFwiIDpjbGFzcz1cXFwiJ2NvbHVtbnMtJyArIGNvbHVtbnMubGVuZ3RoXFxcIj5cXG5cXG5cXHRcXHRcXHQ8d3BjZnRvX2ZpZWxkc19hc2lkZV9iZWZvcmUgOmZpZWxkcz1cXFwiZmllbGRzXFxcIiA6ZmllbGRfbGFiZWw9XFxcImZpZWxkX2xhYmVsXFxcIj48L3dwY2Z0b19maWVsZHNfYXNpZGVfYmVmb3JlPlxcblxcdFxcdFxcdFxcblxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcIndwY2Z0by1maWVsZC1jb250ZW50XFxcIj5cXG5cXHRcXHRcXHRcXG5cXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9fc29ydGVyXFxcIj5cXG5cXHRcXG5cXHRcXHRcXHRcXHRcXHQ8ZGl2IHYtZm9yPVxcXCIoY29sdW1uLCBjb2x1bW5fa2V5KSBpbiBjb2x1bW5zXFxcIiBjbGFzcz1cXFwid3BjZnRvX3NvcnRlcl9zaW5nbGVcXFwiPlxcblxcdFxcblxcdFxcdFxcdFxcdFxcdFxcdDxoNiB2LWh0bWw9XFxcImNvbHVtblsnbmFtZSddXFxcIj48L2g2PlxcblxcdFxcblxcdFxcdFxcdFxcdFxcdFxcdDxkcmFnZ2FibGUgY2xhc3M9XFxcImxpc3QtZ3JvdXBcXFwiXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0ICAgOmxpc3Q9XFxcImNvbHVtblsnb3B0aW9ucyddXFxcIlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdFxcdCAgIGdyb3VwPVxcXCJsaXN0XFxcIlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdFxcdCAgIGtleT1cXFwiY29sdW1uX2tleVxcXCI+XFxuXFx0XFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwibGlzdC1ncm91cC1pdGVtXFxcIlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdFxcdCB2LWZvcj1cXFwiKGVsZW1lbnQsIGVsZW1lbnRfa2V5KSBpbiBjb2x1bW5bJ29wdGlvbnMnXVxcXCJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHQgOmtleT1cXFwiZWxlbWVudFsnaWQnXVxcXCI+XFxuXFx0XFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0ICB7e2VsZW1lbnRbJ2xhYmVsJ119fVxcblxcdFxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdDwvZGl2PlxcblxcdFxcblxcdFxcdFxcdFxcdFxcdFxcdCA8L2RyYWdnYWJsZT5cXG5cXHRcXG5cXHRcXHRcXHRcXHRcXHQgPC9kaXY+XFxuXFx0XFxuXFx0XFx0XFx0XFx0IDwvZGl2PlxcblxcdFxcdFxcdFxcdCBcXG5cXHRcXHRcXHQ8L2Rpdj5cXG5cXG5cXHRcXHRcXHQgPHdwY2Z0b19maWVsZHNfYXNpZGVfYWZ0ZXIgOmZpZWxkcz1cXFwiZmllbGRzXFxcIj48L3dwY2Z0b19maWVsZHNfYXNpZGVfYWZ0ZXI+XFxuXFxuICAgICAgICA8L2Rpdj5cXG4gICAgXCIsXG4gIG1vdW50ZWQ6IGZ1bmN0aW9uIG1vdW50ZWQoKSB7XG4gICAgdGhpcy5jb2x1bW5zID0gdHlwZW9mIHRoaXMuZmllbGRfdmFsdWUgIT09ICd1bmRlZmluZWQnID8gdGhpcy5maWVsZF92YWx1ZSA6IHRoaXMuZmllbGRfb3B0aW9ucztcbiAgICBpZiAodHlwZW9mIHRoaXMuZmllbGRfdmFsdWUgPT09ICdzdHJpbmcnICYmIFdwY2Z0b0lzSnNvblN0cmluZyh0aGlzLmZpZWxkX3ZhbHVlKSkgdGhpcy5jb2x1bW5zID0gSlNPTi5wYXJzZSh0aGlzLmZpZWxkX3ZhbHVlKTtcbiAgICBpZiAoIXRoaXMuY29sdW1ucy5sZW5ndGgpIHRoaXMuY29sdW1ucyA9IHRoaXMuZmllbGRfb3B0aW9ucztcbiAgICB0aGlzLmZpbGxOZXdPcHRpb25zKCk7XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBmaWxsTmV3T3B0aW9uczogZnVuY3Rpb24gZmlsbE5ld09wdGlvbnMoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgLypHZXQgY3VycmVudCBzYXZlZCBrZXlzKi9cblxuXG4gICAgICB2YXIgZmllbGRzID0gW107XG4gICAgICB2YXIga2V5cyA9IFtdO1xuXG4gICAgICBfdGhpcy5jb2x1bW5zLmZvckVhY2goZnVuY3Rpb24gKGNvbHVtbiwgY29sdW1uX2tleSkge1xuICAgICAgICBjb2x1bW5bJ29wdGlvbnMnXS5mb3JFYWNoKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICAgIGZpZWxkc1tmaWVsZC5pZF0gPSBmaWVsZC5sYWJlbDtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIC8qQWRkIG5ldyBmaWVsZHMgZnJvbSBjb25maWcqL1xuXG5cbiAgICAgIF90aGlzLmZpZWxkX29wdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoY29sdW1uLCBjb2x1bW5fa2V5KSB7XG4gICAgICAgIGNvbHVtblsnb3B0aW9ucyddLmZvckVhY2goZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgICAga2V5c1tmaWVsZC5pZF0gPSBmaWVsZC5sYWJlbDtcbiAgICAgICAgICBpZiAodHlwZW9mIGZpZWxkc1tmaWVsZFsnaWQnXV0gIT09ICd1bmRlZmluZWQnKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICBfdGhpcy5jb2x1bW5zW2NvbHVtbl9rZXldWydvcHRpb25zJ10ucHVzaChmaWVsZCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICAvKlJlbW92ZSBkZWxldGVkIGNvbmZpZyBmaWVsZHMgZnJvbSBzdG9yZWQgaW4gZGIqL1xuXG5cbiAgICAgIF90aGlzLmNvbHVtbnMuZm9yRWFjaChmdW5jdGlvbiAoY29sdW1uLCBjb2x1bW5fa2V5KSB7XG4gICAgICAgIGNvbHVtblsnb3B0aW9ucyddLmZvckVhY2goZnVuY3Rpb24gKGZpZWxkLCBmaWVsZF9rZXkpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGtleXNbZmllbGRbJ2lkJ11dICE9PSAndW5kZWZpbmVkJykgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgX3RoaXMuY29sdW1uc1tjb2x1bW5fa2V5XVsnb3B0aW9ucyddLnNwbGljZShmaWVsZF9rZXksIDEpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgd2F0Y2g6IHtcbiAgICBjb2x1bW5zOiB7XG4gICAgICBkZWVwOiB0cnVlLFxuICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihjb2x1bW5zKSB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ3dwY2Z0by1nZXQtdmFsdWUnLCBjb2x1bW5zKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pOyJdfQ==
},{}]},{},[1])
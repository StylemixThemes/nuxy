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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJjb2x1bW5zIiwidGVtcGxhdGUiLCJtb3VudGVkIiwiZmllbGRfdmFsdWUiLCJmaWVsZF9vcHRpb25zIiwiV3BjZnRvSXNKc29uU3RyaW5nIiwiSlNPTiIsInBhcnNlIiwibGVuZ3RoIiwiZmlsbE5ld09wdGlvbnMiLCJtZXRob2RzIiwiX3RoaXMiLCJmaWVsZHMiLCJrZXlzIiwiZm9yRWFjaCIsImNvbHVtbiIsImNvbHVtbl9rZXkiLCJmaWVsZCIsImlkIiwibGFiZWwiLCJwdXNoIiwiZmllbGRfa2V5Iiwic3BsaWNlIiwid2F0Y2giLCJkZWVwIiwiaGFuZGxlciIsIiRlbWl0Il0sInNvdXJjZXMiOlsiZmFrZV9lZTU4MDIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cblZ1ZS5jb21wb25lbnQoJ3dwY2Z0b19zb3J0ZXInLCB7XG4gIHByb3BzOiBbJ2ZpZWxkcycsICdmaWVsZF9sYWJlbCcsICdmaWVsZF9uYW1lJywgJ2ZpZWxkX2lkJywgJ2ZpZWxkX3ZhbHVlJywgJ2ZpZWxkX29wdGlvbnMnXSxcbiAgZGF0YTogZnVuY3Rpb24gZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sdW1uczogW11cbiAgICB9O1xuICB9LFxuICB0ZW1wbGF0ZTogXCJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0b19nZW5lcmljX2ZpZWxkIHdwY2Z0b19nZW5lcmljX2ZpZWxkX3NvcnRlclxcXCIgdi1iaW5kOmNsYXNzPVxcXCJmaWVsZF9pZFxcXCIgOmNsYXNzPVxcXCInY29sdW1ucy0nICsgY29sdW1ucy5sZW5ndGhcXFwiPlxcblxcblxcdFxcdFxcdDx3cGNmdG9fZmllbGRzX2FzaWRlX2JlZm9yZSA6ZmllbGRzPVxcXCJmaWVsZHNcXFwiIDpmaWVsZF9sYWJlbD1cXFwiZmllbGRfbGFiZWxcXFwiPjwvd3BjZnRvX2ZpZWxkc19hc2lkZV9iZWZvcmU+XFxuXFx0XFx0XFx0XFxuXFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwid3BjZnRvLWZpZWxkLWNvbnRlbnRcXFwiPlxcblxcdFxcdFxcdFxcblxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcIndwY2Z0b19zb3J0ZXJcXFwiPlxcblxcdFxcblxcdFxcdFxcdFxcdFxcdDxkaXYgdi1mb3I9XFxcIihjb2x1bW4sIGNvbHVtbl9rZXkpIGluIGNvbHVtbnNcXFwiIGNsYXNzPVxcXCJ3cGNmdG9fc29ydGVyX3NpbmdsZVxcXCI+XFxuXFx0XFxuXFx0XFx0XFx0XFx0XFx0XFx0PGg2IHYtaHRtbD1cXFwiY29sdW1uWyduYW1lJ11cXFwiPjwvaDY+XFxuXFx0XFxuXFx0XFx0XFx0XFx0XFx0XFx0PGRyYWdnYWJsZSBjbGFzcz1cXFwibGlzdC1ncm91cFxcXCJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHQgICBkcmFnZ2FibGU9XFxcIi5saXN0LWdyb3VwLWl0ZW06bm90KC5kaXNhYmxlKVxcXCJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHQgICA6bGlzdD1cXFwiY29sdW1uWydvcHRpb25zJ11cXFwiXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0ICAgZ3JvdXA9XFxcImxpc3RcXFwiXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0ICAga2V5PVxcXCJjb2x1bW5fa2V5XFxcIj5cXG5cXHRcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJsaXN0LWdyb3VwLWl0ZW1cXFwiXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0ICAgIDpkYXRhLWlkPVxcXCJlbGVtZW50WydpZCddXFxcIlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdFxcdCB2LWZvcj1cXFwiKGVsZW1lbnQsIGVsZW1lbnRfa2V5KSBpbiBjb2x1bW5bJ29wdGlvbnMnXVxcXCJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHQgOmtleT1cXFwiZWxlbWVudFsnaWQnXVxcXCJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHQgOmNsYXNzPVxcXCJbZWxlbWVudFsnY2xhc3MnXSA/IGVsZW1lbnRbJ2NsYXNzJ10gOiAnJ11cXFwiXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0ID5cXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQgIHt7ZWxlbWVudFsnbGFiZWwnXX19XFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0ICA8aSA6Y2xhc3M9XFxcImVsZW1lbnRbJ2ljb24nXVxcXCI+PC9pPlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdDwvZGl2PlxcblxcdFxcblxcdFxcdFxcdFxcdFxcdFxcdCA8L2RyYWdnYWJsZT5cXG5cXHRcXG5cXHRcXHRcXHRcXHRcXHQgPC9kaXY+XFxuXFx0XFxuXFx0XFx0XFx0XFx0IDwvZGl2PlxcblxcdFxcdFxcdFxcdCBcXG5cXHRcXHRcXHQ8L2Rpdj5cXG5cXG5cXHRcXHRcXHQgPHdwY2Z0b19maWVsZHNfYXNpZGVfYWZ0ZXIgOmZpZWxkcz1cXFwiZmllbGRzXFxcIj48L3dwY2Z0b19maWVsZHNfYXNpZGVfYWZ0ZXI+XFxuXFxuICAgICAgICA8L2Rpdj5cXG4gICAgXCIsXG4gIG1vdW50ZWQ6IGZ1bmN0aW9uIG1vdW50ZWQoKSB7XG4gICAgdGhpcy5jb2x1bW5zID0gdHlwZW9mIHRoaXMuZmllbGRfdmFsdWUgIT09ICd1bmRlZmluZWQnID8gdGhpcy5maWVsZF92YWx1ZSA6IHRoaXMuZmllbGRfb3B0aW9ucztcbiAgICBpZiAodHlwZW9mIHRoaXMuZmllbGRfdmFsdWUgPT09ICdzdHJpbmcnICYmIFdwY2Z0b0lzSnNvblN0cmluZyh0aGlzLmZpZWxkX3ZhbHVlKSkgdGhpcy5jb2x1bW5zID0gSlNPTi5wYXJzZSh0aGlzLmZpZWxkX3ZhbHVlKTtcbiAgICBpZiAoIXRoaXMuY29sdW1ucy5sZW5ndGgpIHRoaXMuY29sdW1ucyA9IHRoaXMuZmllbGRfb3B0aW9ucztcbiAgICB0aGlzLmZpbGxOZXdPcHRpb25zKCk7XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBmaWxsTmV3T3B0aW9uczogZnVuY3Rpb24gZmlsbE5ld09wdGlvbnMoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgLypHZXQgY3VycmVudCBzYXZlZCBrZXlzKi9cblxuXG4gICAgICB2YXIgZmllbGRzID0gW107XG4gICAgICB2YXIga2V5cyA9IFtdO1xuXG4gICAgICBfdGhpcy5jb2x1bW5zLmZvckVhY2goZnVuY3Rpb24gKGNvbHVtbiwgY29sdW1uX2tleSkge1xuICAgICAgICBjb2x1bW5bJ29wdGlvbnMnXS5mb3JFYWNoKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICAgIGZpZWxkc1tmaWVsZC5pZF0gPSBmaWVsZC5sYWJlbDtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIC8qQWRkIG5ldyBmaWVsZHMgZnJvbSBjb25maWcqL1xuXG5cbiAgICAgIF90aGlzLmZpZWxkX29wdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoY29sdW1uLCBjb2x1bW5fa2V5KSB7XG4gICAgICAgIGNvbHVtblsnb3B0aW9ucyddLmZvckVhY2goZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgICAga2V5c1tmaWVsZC5pZF0gPSBmaWVsZC5sYWJlbDtcbiAgICAgICAgICBpZiAodHlwZW9mIGZpZWxkc1tmaWVsZFsnaWQnXV0gIT09ICd1bmRlZmluZWQnKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICBfdGhpcy5jb2x1bW5zW2NvbHVtbl9rZXldWydvcHRpb25zJ10ucHVzaChmaWVsZCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICAvKlJlbW92ZSBkZWxldGVkIGNvbmZpZyBmaWVsZHMgZnJvbSBzdG9yZWQgaW4gZGIqL1xuXG5cbiAgICAgIF90aGlzLmNvbHVtbnMuZm9yRWFjaChmdW5jdGlvbiAoY29sdW1uLCBjb2x1bW5fa2V5KSB7XG4gICAgICAgIGNvbHVtblsnb3B0aW9ucyddLmZvckVhY2goZnVuY3Rpb24gKGZpZWxkLCBmaWVsZF9rZXkpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGtleXNbZmllbGRbJ2lkJ11dICE9PSAndW5kZWZpbmVkJykgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgX3RoaXMuY29sdW1uc1tjb2x1bW5fa2V5XVsnb3B0aW9ucyddLnNwbGljZShmaWVsZF9rZXksIDEpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgd2F0Y2g6IHtcbiAgICBjb2x1bW5zOiB7XG4gICAgICBkZWVwOiB0cnVlLFxuICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihjb2x1bW5zKSB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ3dwY2Z0by1nZXQtdmFsdWUnLCBjb2x1bW5zKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUFBLEdBQUcsQ0FBQ0MsU0FBSixDQUFjLGVBQWQsRUFBK0I7RUFDN0JDLEtBQUssRUFBRSxDQUFDLFFBQUQsRUFBVyxhQUFYLEVBQTBCLFlBQTFCLEVBQXdDLFVBQXhDLEVBQW9ELGFBQXBELEVBQW1FLGVBQW5FLENBRHNCO0VBRTdCQyxJQUFJLEVBQUUsU0FBU0EsSUFBVCxHQUFnQjtJQUNwQixPQUFPO01BQ0xDLE9BQU8sRUFBRTtJQURKLENBQVA7RUFHRCxDQU40QjtFQU83QkMsUUFBUSxFQUFFLGkxQ0FQbUI7RUFRN0JDLE9BQU8sRUFBRSxTQUFTQSxPQUFULEdBQW1CO0lBQzFCLEtBQUtGLE9BQUwsR0FBZSxPQUFPLEtBQUtHLFdBQVosS0FBNEIsV0FBNUIsR0FBMEMsS0FBS0EsV0FBL0MsR0FBNkQsS0FBS0MsYUFBakY7SUFDQSxJQUFJLE9BQU8sS0FBS0QsV0FBWixLQUE0QixRQUE1QixJQUF3Q0Usa0JBQWtCLENBQUMsS0FBS0YsV0FBTixDQUE5RCxFQUFrRixLQUFLSCxPQUFMLEdBQWVNLElBQUksQ0FBQ0MsS0FBTCxDQUFXLEtBQUtKLFdBQWhCLENBQWY7SUFDbEYsSUFBSSxDQUFDLEtBQUtILE9BQUwsQ0FBYVEsTUFBbEIsRUFBMEIsS0FBS1IsT0FBTCxHQUFlLEtBQUtJLGFBQXBCO0lBQzFCLEtBQUtLLGNBQUw7RUFDRCxDQWI0QjtFQWM3QkMsT0FBTyxFQUFFO0lBQ1BELGNBQWMsRUFBRSxTQUFTQSxjQUFULEdBQTBCO01BQ3hDLElBQUlFLEtBQUssR0FBRyxJQUFaO01BQ0E7OztNQUdBLElBQUlDLE1BQU0sR0FBRyxFQUFiO01BQ0EsSUFBSUMsSUFBSSxHQUFHLEVBQVg7O01BRUFGLEtBQUssQ0FBQ1gsT0FBTixDQUFjYyxPQUFkLENBQXNCLFVBQVVDLE1BQVYsRUFBa0JDLFVBQWxCLEVBQThCO1FBQ2xERCxNQUFNLENBQUMsU0FBRCxDQUFOLENBQWtCRCxPQUFsQixDQUEwQixVQUFVRyxLQUFWLEVBQWlCO1VBQ3pDTCxNQUFNLENBQUNLLEtBQUssQ0FBQ0MsRUFBUCxDQUFOLEdBQW1CRCxLQUFLLENBQUNFLEtBQXpCO1FBQ0QsQ0FGRDtNQUdELENBSkQ7TUFLQTs7O01BR0FSLEtBQUssQ0FBQ1AsYUFBTixDQUFvQlUsT0FBcEIsQ0FBNEIsVUFBVUMsTUFBVixFQUFrQkMsVUFBbEIsRUFBOEI7UUFDeERELE1BQU0sQ0FBQyxTQUFELENBQU4sQ0FBa0JELE9BQWxCLENBQTBCLFVBQVVHLEtBQVYsRUFBaUI7VUFDekNKLElBQUksQ0FBQ0ksS0FBSyxDQUFDQyxFQUFQLENBQUosR0FBaUJELEtBQUssQ0FBQ0UsS0FBdkI7VUFDQSxJQUFJLE9BQU9QLE1BQU0sQ0FBQ0ssS0FBSyxDQUFDLElBQUQsQ0FBTixDQUFiLEtBQStCLFdBQW5DLEVBQWdELE9BQU8sS0FBUDs7VUFFaEROLEtBQUssQ0FBQ1gsT0FBTixDQUFjZ0IsVUFBZCxFQUEwQixTQUExQixFQUFxQ0ksSUFBckMsQ0FBMENILEtBQTFDO1FBQ0QsQ0FMRDtNQU1ELENBUEQ7TUFRQTs7O01BR0FOLEtBQUssQ0FBQ1gsT0FBTixDQUFjYyxPQUFkLENBQXNCLFVBQVVDLE1BQVYsRUFBa0JDLFVBQWxCLEVBQThCO1FBQ2xERCxNQUFNLENBQUMsU0FBRCxDQUFOLENBQWtCRCxPQUFsQixDQUEwQixVQUFVRyxLQUFWLEVBQWlCSSxTQUFqQixFQUE0QjtVQUNwRCxJQUFJLE9BQU9SLElBQUksQ0FBQ0ksS0FBSyxDQUFDLElBQUQsQ0FBTixDQUFYLEtBQTZCLFdBQWpDLEVBQThDLE9BQU8sS0FBUDs7VUFFOUNOLEtBQUssQ0FBQ1gsT0FBTixDQUFjZ0IsVUFBZCxFQUEwQixTQUExQixFQUFxQ00sTUFBckMsQ0FBNENELFNBQTVDLEVBQXVELENBQXZEO1FBQ0QsQ0FKRDtNQUtELENBTkQ7SUFPRDtFQW5DTSxDQWRvQjtFQW1EN0JFLEtBQUssRUFBRTtJQUNMdkIsT0FBTyxFQUFFO01BQ1B3QixJQUFJLEVBQUUsSUFEQztNQUVQQyxPQUFPLEVBQUUsU0FBU0EsT0FBVCxDQUFpQnpCLE9BQWpCLEVBQTBCO1FBQ2pDLEtBQUswQixLQUFMLENBQVcsa0JBQVgsRUFBK0IxQixPQUEvQjtNQUNEO0lBSk07RUFESjtBQW5Ec0IsQ0FBL0IifQ==
},{}]},{},[1])
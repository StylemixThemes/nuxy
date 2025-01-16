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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJjb2x1bW5zIiwidGVtcGxhdGUiLCJtb3VudGVkIiwiZmllbGRfdmFsdWUiLCJmaWVsZF9vcHRpb25zIiwiV3BjZnRvSXNKc29uU3RyaW5nIiwiSlNPTiIsInBhcnNlIiwibGVuZ3RoIiwiZmlsbE5ld09wdGlvbnMiLCJtZXRob2RzIiwiX3RoaXMiLCJmaWVsZHMiLCJrZXlzIiwiZm9yRWFjaCIsImNvbHVtbiIsImNvbHVtbl9rZXkiLCJmaWVsZCIsImlkIiwibGFiZWwiLCJwdXNoIiwiZmllbGRfa2V5Iiwic3BsaWNlIiwid2F0Y2giLCJkZWVwIiwiaGFuZGxlciIsIiRlbWl0Il0sInNvdXJjZXMiOlsiZmFrZV82M2FmODNkNi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuVnVlLmNvbXBvbmVudCgnd3BjZnRvX3NvcnRlcicsIHtcbiAgcHJvcHM6IFsnZmllbGRzJywgJ2ZpZWxkX2xhYmVsJywgJ2ZpZWxkX25hbWUnLCAnZmllbGRfaWQnLCAnZmllbGRfdmFsdWUnLCAnZmllbGRfb3B0aW9ucyddLFxuICBkYXRhOiBmdW5jdGlvbiBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2x1bW5zOiBbXVxuICAgIH07XG4gIH0sXG4gIHRlbXBsYXRlOiBcIlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvX2dlbmVyaWNfZmllbGQgd3BjZnRvX2dlbmVyaWNfZmllbGRfc29ydGVyXFxcIiB2LWJpbmQ6Y2xhc3M9XFxcImZpZWxkX2lkXFxcIiA6Y2xhc3M9XFxcIidjb2x1bW5zLScgKyBjb2x1bW5zLmxlbmd0aFxcXCI+XFxuXFxuXFx0XFx0XFx0PHdwY2Z0b19maWVsZHNfYXNpZGVfYmVmb3JlIDpmaWVsZHM9XFxcImZpZWxkc1xcXCIgOmZpZWxkX2xhYmVsPVxcXCJmaWVsZF9sYWJlbFxcXCI+PC93cGNmdG9fZmllbGRzX2FzaWRlX2JlZm9yZT5cXG5cXHRcXHRcXHRcXG5cXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJ3cGNmdG8tZmllbGQtY29udGVudFxcXCI+XFxuXFx0XFx0XFx0XFxuXFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwid3BjZnRvX3NvcnRlclxcXCI+XFxuXFx0XFxuXFx0XFx0XFx0XFx0XFx0PGRpdiB2LWZvcj1cXFwiKGNvbHVtbiwgY29sdW1uX2tleSkgaW4gY29sdW1uc1xcXCIgY2xhc3M9XFxcIndwY2Z0b19zb3J0ZXJfc2luZ2xlXFxcIj5cXG5cXHRcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8aDYgdi1odG1sPVxcXCJjb2x1bW5bJ25hbWUnXVxcXCI+PC9oNj5cXG5cXHRcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8ZHJhZ2dhYmxlIGNsYXNzPVxcXCJsaXN0LWdyb3VwXFxcIlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdFxcdCAgIGRyYWdnYWJsZT1cXFwiLmxpc3QtZ3JvdXAtaXRlbTpub3QoLmRpc2FibGUpXFxcIlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdFxcdCAgIDpsaXN0PVxcXCJjb2x1bW5bJ29wdGlvbnMnXVxcXCJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHQgICBncm91cD1cXFwibGlzdFxcXCJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHQgICBrZXk9XFxcImNvbHVtbl9rZXlcXFwiPlxcblxcdFxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcImxpc3QtZ3JvdXAtaXRlbVxcXCJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQgICAgOmRhdGEtaWQ9XFxcImVsZW1lbnRbJ2lkJ11cXFwiXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0IHYtZm9yPVxcXCIoZWxlbWVudCwgZWxlbWVudF9rZXkpIGluIGNvbHVtblsnb3B0aW9ucyddXFxcIlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdFxcdCA6a2V5PVxcXCJlbGVtZW50WydpZCddXFxcIlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdFxcdCA6Y2xhc3M9XFxcIltlbGVtZW50WydjbGFzcyddID8gZWxlbWVudFsnY2xhc3MnXSA6ICcnXVxcXCJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHQgPlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdCAge3tlbGVtZW50WydsYWJlbCddfX1cXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQgIDxpIDpjbGFzcz1cXFwiZWxlbWVudFsnaWNvbiddXFxcIj48L2k+XFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0PC9kaXY+XFxuXFx0XFxuXFx0XFx0XFx0XFx0XFx0XFx0IDwvZHJhZ2dhYmxlPlxcblxcdFxcblxcdFxcdFxcdFxcdFxcdCA8L2Rpdj5cXG5cXHRcXG5cXHRcXHRcXHRcXHQgPC9kaXY+XFxuXFx0XFx0XFx0XFx0IFxcblxcdFxcdFxcdDwvZGl2PlxcblxcblxcdFxcdFxcdCA8d3BjZnRvX2ZpZWxkc19hc2lkZV9hZnRlciA6ZmllbGRzPVxcXCJmaWVsZHNcXFwiPjwvd3BjZnRvX2ZpZWxkc19hc2lkZV9hZnRlcj5cXG5cXG4gICAgICAgIDwvZGl2PlxcbiAgICBcIixcbiAgbW91bnRlZDogZnVuY3Rpb24gbW91bnRlZCgpIHtcbiAgICB0aGlzLmNvbHVtbnMgPSB0eXBlb2YgdGhpcy5maWVsZF92YWx1ZSAhPT0gJ3VuZGVmaW5lZCcgPyB0aGlzLmZpZWxkX3ZhbHVlIDogdGhpcy5maWVsZF9vcHRpb25zO1xuICAgIGlmICh0eXBlb2YgdGhpcy5maWVsZF92YWx1ZSA9PT0gJ3N0cmluZycgJiYgV3BjZnRvSXNKc29uU3RyaW5nKHRoaXMuZmllbGRfdmFsdWUpKSB0aGlzLmNvbHVtbnMgPSBKU09OLnBhcnNlKHRoaXMuZmllbGRfdmFsdWUpO1xuICAgIGlmICghdGhpcy5jb2x1bW5zLmxlbmd0aCkgdGhpcy5jb2x1bW5zID0gdGhpcy5maWVsZF9vcHRpb25zO1xuICAgIHRoaXMuZmlsbE5ld09wdGlvbnMoKTtcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGZpbGxOZXdPcHRpb25zOiBmdW5jdGlvbiBmaWxsTmV3T3B0aW9ucygpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIC8qR2V0IGN1cnJlbnQgc2F2ZWQga2V5cyovXG4gICAgICB2YXIgZmllbGRzID0gW107XG4gICAgICB2YXIga2V5cyA9IFtdO1xuICAgICAgX3RoaXMuY29sdW1ucy5mb3JFYWNoKGZ1bmN0aW9uIChjb2x1bW4sIGNvbHVtbl9rZXkpIHtcbiAgICAgICAgY29sdW1uWydvcHRpb25zJ10uZm9yRWFjaChmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgICAgICBmaWVsZHNbZmllbGQuaWRdID0gZmllbGQubGFiZWw7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIC8qQWRkIG5ldyBmaWVsZHMgZnJvbSBjb25maWcqL1xuICAgICAgX3RoaXMuZmllbGRfb3B0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChjb2x1bW4sIGNvbHVtbl9rZXkpIHtcbiAgICAgICAgY29sdW1uWydvcHRpb25zJ10uZm9yRWFjaChmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgICAgICBrZXlzW2ZpZWxkLmlkXSA9IGZpZWxkLmxhYmVsO1xuICAgICAgICAgIGlmICh0eXBlb2YgZmllbGRzW2ZpZWxkWydpZCddXSAhPT0gJ3VuZGVmaW5lZCcpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICBfdGhpcy5jb2x1bW5zW2NvbHVtbl9rZXldWydvcHRpb25zJ10ucHVzaChmaWVsZCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIC8qUmVtb3ZlIGRlbGV0ZWQgY29uZmlnIGZpZWxkcyBmcm9tIHN0b3JlZCBpbiBkYiovXG4gICAgICBfdGhpcy5jb2x1bW5zLmZvckVhY2goZnVuY3Rpb24gKGNvbHVtbiwgY29sdW1uX2tleSkge1xuICAgICAgICBjb2x1bW5bJ29wdGlvbnMnXS5mb3JFYWNoKGZ1bmN0aW9uIChmaWVsZCwgZmllbGRfa2V5KSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBrZXlzW2ZpZWxkWydpZCddXSAhPT0gJ3VuZGVmaW5lZCcpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICBfdGhpcy5jb2x1bW5zW2NvbHVtbl9rZXldWydvcHRpb25zJ10uc3BsaWNlKGZpZWxkX2tleSwgMSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9LFxuICB3YXRjaDoge1xuICAgIGNvbHVtbnM6IHtcbiAgICAgIGRlZXA6IHRydWUsXG4gICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKGNvbHVtbnMpIHtcbiAgICAgICAgdGhpcy4kZW1pdCgnd3BjZnRvLWdldC12YWx1ZScsIGNvbHVtbnMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufSk7Il0sIm1hcHBpbmdzIjoiQUFBQSxZQUFZOztBQUVaQSxHQUFHLENBQUNDLFNBQVMsQ0FBQyxlQUFlLEVBQUU7RUFDN0JDLEtBQUssRUFBRSxDQUFDLFFBQVEsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsZUFBZSxDQUFDO0VBQzFGQyxJQUFJLEVBQUUsU0FBU0EsSUFBSUEsQ0FBQSxFQUFHO0lBQ3BCLE9BQU87TUFDTEMsT0FBTyxFQUFFO0lBQ1gsQ0FBQztFQUNILENBQUM7RUFDREMsUUFBUSxFQUFFLGkxQ0FBaTFDO0VBQzMxQ0MsT0FBTyxFQUFFLFNBQVNBLE9BQU9BLENBQUEsRUFBRztJQUMxQixJQUFJLENBQUNGLE9BQU8sR0FBRyxPQUFPLElBQUksQ0FBQ0csV0FBVyxLQUFLLFdBQVcsR0FBRyxJQUFJLENBQUNBLFdBQVcsR0FBRyxJQUFJLENBQUNDLGFBQWE7SUFDOUYsSUFBSSxPQUFPLElBQUksQ0FBQ0QsV0FBVyxLQUFLLFFBQVEsSUFBSUUsa0JBQWtCLENBQUMsSUFBSSxDQUFDRixXQUFXLENBQUMsRUFBRSxJQUFJLENBQUNILE9BQU8sR0FBR00sSUFBSSxDQUFDQyxLQUFLLENBQUMsSUFBSSxDQUFDSixXQUFXLENBQUM7SUFDN0gsSUFBSSxDQUFDLElBQUksQ0FBQ0gsT0FBTyxDQUFDUSxNQUFNLEVBQUUsSUFBSSxDQUFDUixPQUFPLEdBQUcsSUFBSSxDQUFDSSxhQUFhO0lBQzNELElBQUksQ0FBQ0ssY0FBYyxDQUFDLENBQUM7RUFDdkIsQ0FBQztFQUNEQyxPQUFPLEVBQUU7SUFDUEQsY0FBYyxFQUFFLFNBQVNBLGNBQWNBLENBQUEsRUFBRztNQUN4QyxJQUFJRSxLQUFLLEdBQUcsSUFBSTs7TUFFaEI7TUFDQSxJQUFJQyxNQUFNLEdBQUcsRUFBRTtNQUNmLElBQUlDLElBQUksR0FBRyxFQUFFO01BQ2JGLEtBQUssQ0FBQ1gsT0FBTyxDQUFDYyxPQUFPLENBQUMsVUFBVUMsTUFBTSxFQUFFQyxVQUFVLEVBQUU7UUFDbERELE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQ0QsT0FBTyxDQUFDLFVBQVVHLEtBQUssRUFBRTtVQUN6Q0wsTUFBTSxDQUFDSyxLQUFLLENBQUNDLEVBQUUsQ0FBQyxHQUFHRCxLQUFLLENBQUNFLEtBQUs7UUFDaEMsQ0FBQyxDQUFDO01BQ0osQ0FBQyxDQUFDOztNQUVGO01BQ0FSLEtBQUssQ0FBQ1AsYUFBYSxDQUFDVSxPQUFPLENBQUMsVUFBVUMsTUFBTSxFQUFFQyxVQUFVLEVBQUU7UUFDeERELE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQ0QsT0FBTyxDQUFDLFVBQVVHLEtBQUssRUFBRTtVQUN6Q0osSUFBSSxDQUFDSSxLQUFLLENBQUNDLEVBQUUsQ0FBQyxHQUFHRCxLQUFLLENBQUNFLEtBQUs7VUFDNUIsSUFBSSxPQUFPUCxNQUFNLENBQUNLLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLFdBQVcsRUFBRSxPQUFPLEtBQUs7VUFDNUROLEtBQUssQ0FBQ1gsT0FBTyxDQUFDZ0IsVUFBVSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUNJLElBQUksQ0FBQ0gsS0FBSyxDQUFDO1FBQ2xELENBQUMsQ0FBQztNQUNKLENBQUMsQ0FBQzs7TUFFRjtNQUNBTixLQUFLLENBQUNYLE9BQU8sQ0FBQ2MsT0FBTyxDQUFDLFVBQVVDLE1BQU0sRUFBRUMsVUFBVSxFQUFFO1FBQ2xERCxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUNELE9BQU8sQ0FBQyxVQUFVRyxLQUFLLEVBQUVJLFNBQVMsRUFBRTtVQUNwRCxJQUFJLE9BQU9SLElBQUksQ0FBQ0ksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssV0FBVyxFQUFFLE9BQU8sS0FBSztVQUMxRE4sS0FBSyxDQUFDWCxPQUFPLENBQUNnQixVQUFVLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQ00sTUFBTSxDQUFDRCxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQzNELENBQUMsQ0FBQztNQUNKLENBQUMsQ0FBQztJQUNKO0VBQ0YsQ0FBQztFQUNERSxLQUFLLEVBQUU7SUFDTHZCLE9BQU8sRUFBRTtNQUNQd0IsSUFBSSxFQUFFLElBQUk7TUFDVkMsT0FBTyxFQUFFLFNBQVNBLE9BQU9BLENBQUN6QixPQUFPLEVBQUU7UUFDakMsSUFBSSxDQUFDMEIsS0FBSyxDQUFDLGtCQUFrQixFQUFFMUIsT0FBTyxDQUFDO01BQ3pDO0lBQ0Y7RUFDRjtBQUNGLENBQUMsQ0FBQyIsImlnbm9yZUxpc3QiOltdfQ==
},{}]},{},[1])
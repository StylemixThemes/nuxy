(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

Vue.component('wpcfto_spacing', {
  props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value'],
  data: function data() {
    return {
      spacing: {},
      focused: ''
    };
  },
  template: "\n        <div class=\"wpcfto_generic_field wpcfto_generic_field_spacing\" v-bind:class=\"field_id\">\n\n            <wpcfto_fields_aside_before :fields=\"fields\" :field_label=\"field_label\"></wpcfto_fields_aside_before>\n\n            <div class=\"wpcfto-field-content\">\n                <div class=\"wpcfto_spacing\">\n\n                    <div class=\"wpcfto-spacing-input-wrap\" :class=\"{ 'focused' : focused == 'spacing_top' }\"><i class=\"fa fa-arrow-up\"></i><input type=\"number\" name=\"top\" v-model=\"spacing.top\" @focus=\"focused = 'spacing_top'\" @blur=\"focused = ''\"/></div>\n                    <div class=\"wpcfto-spacing-input-wrap\" :class=\"{ 'focused' : focused == 'spacing_right' }\"><i class=\"fa fa-arrow-right\"></i><input type=\"number\" name=\"right\" v-model=\"spacing.right\" @focus=\"focused = 'spacing_right'\" @blur=\"focused = ''\"/></div>\n                    <div class=\"wpcfto-spacing-input-wrap\" :class=\"{ 'focused' : focused == 'spacing_bottom' }\"><i class=\"fa fa-arrow-down\"></i><input type=\"number\" name=\"bottom\" v-model=\"spacing.bottom\" @focus=\"focused = 'spacing_bottom'\" @blur=\"focused = ''\"/></div>\n                    <div class=\"wpcfto-spacing-input-wrap\" :class=\"{ 'focused' : focused == 'spacing_left' }\"><i class=\"fa fa-arrow-left\"></i><input type=\"number\" name=\"left\" v-model=\"spacing.left\" @focus=\"focused = 'spacing_left'\" @blur=\"focused = ''\"/></div>\n    \n                    <select name=\"unit\" v-model=\"spacing.unit\">\n                        <option v-for=\"option in fields['units']\" v-bind:value=\"option\">{{ option }}</option>\n                    </select>\n                </div>\n            </div>\n\n            <wpcfto_fields_aside_after :fields=\"fields\"></wpcfto_fields_aside_after>\n            \n        </div>\n    ",
  mounted: function mounted() {
    // JSON parse for Post Meta
    this.spacing = typeof this.field_value === 'string' && WpcftoIsJsonString(this.field_value) ? JSON.parse(this.field_value) : this.field_value;

    if (_typeof(this.spacing) !== 'object') {
      this.spacing = {
        top: '',
        left: '',
        right: '',
        bottom: ''
      };
    }
  },
  methods: {},
  watch: {
    spacing: {
      deep: true,
      handler: function handler(spacing) {
        this.$emit('wpcfto-get-value', spacing);
      }
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfdHlwZW9mIiwib2JqIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJjb25zdHJ1Y3RvciIsInByb3RvdHlwZSIsIlZ1ZSIsImNvbXBvbmVudCIsInByb3BzIiwiZGF0YSIsInNwYWNpbmciLCJmb2N1c2VkIiwidGVtcGxhdGUiLCJtb3VudGVkIiwiZmllbGRfdmFsdWUiLCJXcGNmdG9Jc0pzb25TdHJpbmciLCJKU09OIiwicGFyc2UiLCJ0b3AiLCJsZWZ0IiwicmlnaHQiLCJib3R0b20iLCJtZXRob2RzIiwid2F0Y2giLCJkZWVwIiwiaGFuZGxlciIsIiRlbWl0Il0sInNvdXJjZXMiOlsiZmFrZV9jZDlhYjdlYy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiOyByZXR1cm4gX3R5cGVvZiA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIFwic3ltYm9sXCIgPT0gdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH0sIF90eXBlb2Yob2JqKTsgfVxuXG5WdWUuY29tcG9uZW50KCd3cGNmdG9fc3BhY2luZycsIHtcbiAgcHJvcHM6IFsnZmllbGRzJywgJ2ZpZWxkX2xhYmVsJywgJ2ZpZWxkX25hbWUnLCAnZmllbGRfaWQnLCAnZmllbGRfdmFsdWUnXSxcbiAgZGF0YTogZnVuY3Rpb24gZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3BhY2luZzoge30sXG4gICAgICBmb2N1c2VkOiAnJ1xuICAgIH07XG4gIH0sXG4gIHRlbXBsYXRlOiBcIlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvX2dlbmVyaWNfZmllbGQgd3BjZnRvX2dlbmVyaWNfZmllbGRfc3BhY2luZ1xcXCIgdi1iaW5kOmNsYXNzPVxcXCJmaWVsZF9pZFxcXCI+XFxuXFxuICAgICAgICAgICAgPHdwY2Z0b19maWVsZHNfYXNpZGVfYmVmb3JlIDpmaWVsZHM9XFxcImZpZWxkc1xcXCIgOmZpZWxkX2xhYmVsPVxcXCJmaWVsZF9sYWJlbFxcXCI+PC93cGNmdG9fZmllbGRzX2FzaWRlX2JlZm9yZT5cXG5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG8tZmllbGQtY29udGVudFxcXCI+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0b19zcGFjaW5nXFxcIj5cXG5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0by1zcGFjaW5nLWlucHV0LXdyYXBcXFwiIDpjbGFzcz1cXFwieyAnZm9jdXNlZCcgOiBmb2N1c2VkID09ICdzcGFjaW5nX3RvcCcgfVxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWFycm93LXVwXFxcIj48L2k+PGlucHV0IHR5cGU9XFxcIm51bWJlclxcXCIgbmFtZT1cXFwidG9wXFxcIiB2LW1vZGVsPVxcXCJzcGFjaW5nLnRvcFxcXCIgQGZvY3VzPVxcXCJmb2N1c2VkID0gJ3NwYWNpbmdfdG9wJ1xcXCIgQGJsdXI9XFxcImZvY3VzZWQgPSAnJ1xcXCIvPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvLXNwYWNpbmctaW5wdXQtd3JhcFxcXCIgOmNsYXNzPVxcXCJ7ICdmb2N1c2VkJyA6IGZvY3VzZWQgPT0gJ3NwYWNpbmdfcmlnaHQnIH1cXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1hcnJvdy1yaWdodFxcXCI+PC9pPjxpbnB1dCB0eXBlPVxcXCJudW1iZXJcXFwiIG5hbWU9XFxcInJpZ2h0XFxcIiB2LW1vZGVsPVxcXCJzcGFjaW5nLnJpZ2h0XFxcIiBAZm9jdXM9XFxcImZvY3VzZWQgPSAnc3BhY2luZ19yaWdodCdcXFwiIEBibHVyPVxcXCJmb2N1c2VkID0gJydcXFwiLz48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0by1zcGFjaW5nLWlucHV0LXdyYXBcXFwiIDpjbGFzcz1cXFwieyAnZm9jdXNlZCcgOiBmb2N1c2VkID09ICdzcGFjaW5nX2JvdHRvbScgfVxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWFycm93LWRvd25cXFwiPjwvaT48aW5wdXQgdHlwZT1cXFwibnVtYmVyXFxcIiBuYW1lPVxcXCJib3R0b21cXFwiIHYtbW9kZWw9XFxcInNwYWNpbmcuYm90dG9tXFxcIiBAZm9jdXM9XFxcImZvY3VzZWQgPSAnc3BhY2luZ19ib3R0b20nXFxcIiBAYmx1cj1cXFwiZm9jdXNlZCA9ICcnXFxcIi8+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG8tc3BhY2luZy1pbnB1dC13cmFwXFxcIiA6Y2xhc3M9XFxcInsgJ2ZvY3VzZWQnIDogZm9jdXNlZCA9PSAnc3BhY2luZ19sZWZ0JyB9XFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtYXJyb3ctbGVmdFxcXCI+PC9pPjxpbnB1dCB0eXBlPVxcXCJudW1iZXJcXFwiIG5hbWU9XFxcImxlZnRcXFwiIHYtbW9kZWw9XFxcInNwYWNpbmcubGVmdFxcXCIgQGZvY3VzPVxcXCJmb2N1c2VkID0gJ3NwYWNpbmdfbGVmdCdcXFwiIEBibHVyPVxcXCJmb2N1c2VkID0gJydcXFwiLz48L2Rpdj5cXG4gICAgXFxuICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IG5hbWU9XFxcInVuaXRcXFwiIHYtbW9kZWw9XFxcInNwYWNpbmcudW5pdFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2LWZvcj1cXFwib3B0aW9uIGluIGZpZWxkc1sndW5pdHMnXVxcXCIgdi1iaW5kOnZhbHVlPVxcXCJvcHRpb25cXFwiPnt7IG9wdGlvbiB9fTwvb3B0aW9uPlxcbiAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDwvZGl2PlxcblxcbiAgICAgICAgICAgIDx3cGNmdG9fZmllbGRzX2FzaWRlX2FmdGVyIDpmaWVsZHM9XFxcImZpZWxkc1xcXCI+PC93cGNmdG9fZmllbGRzX2FzaWRlX2FmdGVyPlxcbiAgICAgICAgICAgIFxcbiAgICAgICAgPC9kaXY+XFxuICAgIFwiLFxuICBtb3VudGVkOiBmdW5jdGlvbiBtb3VudGVkKCkge1xuICAgIC8vIEpTT04gcGFyc2UgZm9yIFBvc3QgTWV0YVxuICAgIHRoaXMuc3BhY2luZyA9IHR5cGVvZiB0aGlzLmZpZWxkX3ZhbHVlID09PSAnc3RyaW5nJyAmJiBXcGNmdG9Jc0pzb25TdHJpbmcodGhpcy5maWVsZF92YWx1ZSkgPyBKU09OLnBhcnNlKHRoaXMuZmllbGRfdmFsdWUpIDogdGhpcy5maWVsZF92YWx1ZTtcblxuICAgIGlmIChfdHlwZW9mKHRoaXMuc3BhY2luZykgIT09ICdvYmplY3QnKSB7XG4gICAgICB0aGlzLnNwYWNpbmcgPSB7XG4gICAgICAgIHRvcDogJycsXG4gICAgICAgIGxlZnQ6ICcnLFxuICAgICAgICByaWdodDogJycsXG4gICAgICAgIGJvdHRvbTogJydcbiAgICAgIH07XG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7fSxcbiAgd2F0Y2g6IHtcbiAgICBzcGFjaW5nOiB7XG4gICAgICBkZWVwOiB0cnVlLFxuICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihzcGFjaW5nKSB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ3dwY2Z0by1nZXQtdmFsdWUnLCBzcGFjaW5nKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUEsU0FBU0EsT0FBVCxDQUFpQkMsR0FBakIsRUFBc0I7RUFBRTs7RUFBMkIsT0FBT0QsT0FBTyxHQUFHLGNBQWMsT0FBT0UsTUFBckIsSUFBK0IsWUFBWSxPQUFPQSxNQUFNLENBQUNDLFFBQXpELEdBQW9FLFVBQVVGLEdBQVYsRUFBZTtJQUFFLE9BQU8sT0FBT0EsR0FBZDtFQUFvQixDQUF6RyxHQUE0RyxVQUFVQSxHQUFWLEVBQWU7SUFBRSxPQUFPQSxHQUFHLElBQUksY0FBYyxPQUFPQyxNQUE1QixJQUFzQ0QsR0FBRyxDQUFDRyxXQUFKLEtBQW9CRixNQUExRCxJQUFvRUQsR0FBRyxLQUFLQyxNQUFNLENBQUNHLFNBQW5GLEdBQStGLFFBQS9GLEdBQTBHLE9BQU9KLEdBQXhIO0VBQThILENBQXJRLEVBQXVRRCxPQUFPLENBQUNDLEdBQUQsQ0FBclI7QUFBNlI7O0FBRWhWSyxHQUFHLENBQUNDLFNBQUosQ0FBYyxnQkFBZCxFQUFnQztFQUM5QkMsS0FBSyxFQUFFLENBQUMsUUFBRCxFQUFXLGFBQVgsRUFBMEIsWUFBMUIsRUFBd0MsVUFBeEMsRUFBb0QsYUFBcEQsQ0FEdUI7RUFFOUJDLElBQUksRUFBRSxTQUFTQSxJQUFULEdBQWdCO0lBQ3BCLE9BQU87TUFDTEMsT0FBTyxFQUFFLEVBREo7TUFFTEMsT0FBTyxFQUFFO0lBRkosQ0FBUDtFQUlELENBUDZCO0VBUTlCQyxRQUFRLEVBQUUsNHlEQVJvQjtFQVM5QkMsT0FBTyxFQUFFLFNBQVNBLE9BQVQsR0FBbUI7SUFDMUI7SUFDQSxLQUFLSCxPQUFMLEdBQWUsT0FBTyxLQUFLSSxXQUFaLEtBQTRCLFFBQTVCLElBQXdDQyxrQkFBa0IsQ0FBQyxLQUFLRCxXQUFOLENBQTFELEdBQStFRSxJQUFJLENBQUNDLEtBQUwsQ0FBVyxLQUFLSCxXQUFoQixDQUEvRSxHQUE4RyxLQUFLQSxXQUFsSTs7SUFFQSxJQUFJZCxPQUFPLENBQUMsS0FBS1UsT0FBTixDQUFQLEtBQTBCLFFBQTlCLEVBQXdDO01BQ3RDLEtBQUtBLE9BQUwsR0FBZTtRQUNiUSxHQUFHLEVBQUUsRUFEUTtRQUViQyxJQUFJLEVBQUUsRUFGTztRQUdiQyxLQUFLLEVBQUUsRUFITTtRQUliQyxNQUFNLEVBQUU7TUFKSyxDQUFmO0lBTUQ7RUFDRixDQXJCNkI7RUFzQjlCQyxPQUFPLEVBQUUsRUF0QnFCO0VBdUI5QkMsS0FBSyxFQUFFO0lBQ0xiLE9BQU8sRUFBRTtNQUNQYyxJQUFJLEVBQUUsSUFEQztNQUVQQyxPQUFPLEVBQUUsU0FBU0EsT0FBVCxDQUFpQmYsT0FBakIsRUFBMEI7UUFDakMsS0FBS2dCLEtBQUwsQ0FBVyxrQkFBWCxFQUErQmhCLE9BQS9CO01BQ0Q7SUFKTTtFQURKO0FBdkJ1QixDQUFoQyJ9
},{}]},{},[1])
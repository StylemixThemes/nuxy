(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var timeout = undefined;
var icons = wpcfto_icons_set;
Vue.component('wpcfto_icon_picker', {
  props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value', 'field_data'],
  data: function data() {
    return {
      value: {
        icon: '',
        color: '#000',
        size: 15
      },
      focusOn: false,
      icons: icons,
      hoverPanel: false,
      search: "",
      beforeSelect: "",
      selected: "",
      inited: false
    };
  },
  template: "\n        <div class=\"wpcfto_generic_field wpcfto_generic_field_iconpicker\">\n\n            <wpcfto_fields_aside_before :fields=\"fields\" :field_label=\"field_label\"></wpcfto_fields_aside_before>\n            \n            <div class=\"wpcfto-field-content\">\n                <div class=\"wpcfto_generic_field__inner\">\n    \n                    <div class=\"wpcfto_generic_field\">\n                        <label>Icon picker</label>\n                        <input ref=\"picker\"\n                        v-model=\"search\"\n                        @blur=\"blur\"\n                        @focus=\"focus\"\n                        type=\"email\"\n                        class=\"form-control\"\n                        placeholder=\"Search an icon\">\n                    </div>\n    \n                    <wpcfto_color @wpcfto-get-value=\"value['color'] = $event\"\n                        :fields=\"{position: 'bottom'}\"\n                        v-if=\"inited\"\n                        :field_label=\"'Icon color'\"\n                        :field_value=\"value['color']\">\n    \n                    </wpcfto_color>\n    \n                    <wpcfto_range_slider :fields=\"fields\"\n                        v-if=\"inited\"\n                        :field_label=\"'Icon size'\"\n                        :field_name=\"field_name\"\n                        :field_description=\"'Icon size set in pixels'\"\n                        :field_id=\"field_id\"\n                        :field_value=\"value['size']\"\n                        :field_data=\"{min:1,max:200}\"\n                        :field_input_addon=\"{label:'px'}\"\n                        @wpcfto-get-value=\"value['size'] = $event\">\n                    </wpcfto_range_slider>\n    \n                </div>\n    \n                <transition name=\"icon-preview-fade\">\n                    <div v-if=\"focusOn\" class=\"preview-container\">\n                        <div @click=\"select(undefined)\" @mouseover=\"hoverPanel = true\" @mouseout=\"hoverPanel = false\" :class=\"['previewer', 'rounded', {'custom-shadow-sm': !hoverPanel}, {'custom-shadow': hoverPanel} ]\">\n                            <div v-for=\"(i, index) in iconsFiltered\" :key=\"index\" class=\"icon-preview\">\n                                <div @click.prevent.stop=\"select(i)\" :class=\"['icon-wrapper','rounded','shadow-sm', {selected: i.title == selected}]\" >\n                                    <i :class=\"i.title\" />\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </transition>\n            \n                 <div class=\"icon-preview-wrap\">\n                    <label>Preview</label>\n                    <div class=\"icon-preview-inner\">\n                        <i class=\"wpcfto_generic_field__iconpicker__icon\"\n                        v-bind:class=\"value.icon\"\n                        v-bind:style=\"{ color: value.color, 'font-size' : value.size + 'px'}\"\n                        v-if=\"value.icon && value.icon !== ''\"></i>  \n                        <span v-else>--</span>  \n                    </div>        \n                 </div>\n             </div>\n\n        </div>\n  ",
  mounted: function mounted() {
    if (typeof this.field_value === 'string' && WpcftoIsJsonString(this.field_value)) {
      this.value = JSON.parse(this.field_value);
    } else if (_typeof(this.field_value) === 'object') {
      this.value = this.field_value;
    }

    if (!this.value.icon) {
      this.value = {
        icon: '',
        color: '#000',
        size: 15
      };
    }

    this.selected = this.value.icon;
    this.inited = true;
  },
  methods: {
    blur: function blur() {
      var _this = this;

      timeout = setTimeout(function () {
        _this.focusOn = false;
        _this.value.icon = '';
      }, 100);
    },
    focus: function focus() {
      this.focusOn = true;
    },
    select: function select(icon) {
      clearTimeout(timeout);

      if (icon) {
        if (this.search != this.selected) this.beforeSelect = this.search;
        this.selected = icon.title;
        this.search = icon.title;
      }

      this.focusOn = false;
      this.value.icon = this.selected;
    }
  },
  computed: {
    iconsFiltered: function iconsFiltered() {
      var search = this.search == this.selected ? this.beforeSelect : this.search;
      return this.icons.filter(function (i) {
        return i.title.indexOf(search) !== -1 || i.searchTerms.some(function (t) {
          return t.indexOf(search) !== -1;
        });
      });
    }
  },
  watch: {
    value: {
      deep: true,
      handler: function handler(value) {
        this.$emit('wpcfto-get-value', value);
      }
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfZTdjOWI5NmQuanMiXSwibmFtZXMiOlsiX3R5cGVvZiIsIm9iaiIsIlN5bWJvbCIsIml0ZXJhdG9yIiwiY29uc3RydWN0b3IiLCJwcm90b3R5cGUiLCJ0aW1lb3V0IiwidW5kZWZpbmVkIiwiaWNvbnMiLCJ3cGNmdG9faWNvbnNfc2V0IiwiVnVlIiwiY29tcG9uZW50IiwicHJvcHMiLCJkYXRhIiwidmFsdWUiLCJpY29uIiwiY29sb3IiLCJzaXplIiwiZm9jdXNPbiIsImhvdmVyUGFuZWwiLCJzZWFyY2giLCJiZWZvcmVTZWxlY3QiLCJzZWxlY3RlZCIsImluaXRlZCIsInRlbXBsYXRlIiwibW91bnRlZCIsImZpZWxkX3ZhbHVlIiwiV3BjZnRvSXNKc29uU3RyaW5nIiwiSlNPTiIsInBhcnNlIiwibWV0aG9kcyIsImJsdXIiLCJfdGhpcyIsInNldFRpbWVvdXQiLCJmb2N1cyIsInNlbGVjdCIsImNsZWFyVGltZW91dCIsInRpdGxlIiwiY29tcHV0ZWQiLCJpY29uc0ZpbHRlcmVkIiwiZmlsdGVyIiwiaSIsImluZGV4T2YiLCJzZWFyY2hUZXJtcyIsInNvbWUiLCJ0Iiwid2F0Y2giLCJkZWVwIiwiaGFuZGxlciIsIiRlbWl0Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQSxTQUFTQSxPQUFULENBQWlCQyxHQUFqQixFQUFzQjtBQUFFOztBQUEyQixNQUFJLE9BQU9DLE1BQVAsS0FBa0IsVUFBbEIsSUFBZ0MsT0FBT0EsTUFBTSxDQUFDQyxRQUFkLEtBQTJCLFFBQS9ELEVBQXlFO0FBQUVILElBQUFBLE9BQU8sR0FBRyxTQUFTQSxPQUFULENBQWlCQyxHQUFqQixFQUFzQjtBQUFFLGFBQU8sT0FBT0EsR0FBZDtBQUFvQixLQUF0RDtBQUF5RCxHQUFwSSxNQUEwSTtBQUFFRCxJQUFBQSxPQUFPLEdBQUcsU0FBU0EsT0FBVCxDQUFpQkMsR0FBakIsRUFBc0I7QUFBRSxhQUFPQSxHQUFHLElBQUksT0FBT0MsTUFBUCxLQUFrQixVQUF6QixJQUF1Q0QsR0FBRyxDQUFDRyxXQUFKLEtBQW9CRixNQUEzRCxJQUFxRUQsR0FBRyxLQUFLQyxNQUFNLENBQUNHLFNBQXBGLEdBQWdHLFFBQWhHLEdBQTJHLE9BQU9KLEdBQXpIO0FBQStILEtBQWpLO0FBQW9LOztBQUFDLFNBQU9ELE9BQU8sQ0FBQ0MsR0FBRCxDQUFkO0FBQXNCOztBQUUxWCxJQUFJSyxPQUFPLEdBQUdDLFNBQWQ7QUFDQSxJQUFJQyxLQUFLLEdBQUdDLGdCQUFaO0FBQ0FDLEdBQUcsQ0FBQ0MsU0FBSixDQUFjLG9CQUFkLEVBQW9DO0FBQ2xDQyxFQUFBQSxLQUFLLEVBQUUsQ0FBQyxRQUFELEVBQVcsYUFBWCxFQUEwQixZQUExQixFQUF3QyxVQUF4QyxFQUFvRCxhQUFwRCxFQUFtRSxZQUFuRSxDQUQyQjtBQUVsQ0MsRUFBQUEsSUFBSSxFQUFFLFNBQVNBLElBQVQsR0FBZ0I7QUFDcEIsV0FBTztBQUNMQyxNQUFBQSxLQUFLLEVBQUU7QUFDTEMsUUFBQUEsSUFBSSxFQUFFLEVBREQ7QUFFTEMsUUFBQUEsS0FBSyxFQUFFLE1BRkY7QUFHTEMsUUFBQUEsSUFBSSxFQUFFO0FBSEQsT0FERjtBQU1MQyxNQUFBQSxPQUFPLEVBQUUsS0FOSjtBQU9MVixNQUFBQSxLQUFLLEVBQUVBLEtBUEY7QUFRTFcsTUFBQUEsVUFBVSxFQUFFLEtBUlA7QUFTTEMsTUFBQUEsTUFBTSxFQUFFLEVBVEg7QUFVTEMsTUFBQUEsWUFBWSxFQUFFLEVBVlQ7QUFXTEMsTUFBQUEsUUFBUSxFQUFFLEVBWEw7QUFZTEMsTUFBQUEsTUFBTSxFQUFFO0FBWkgsS0FBUDtBQWNELEdBakJpQztBQWtCbENDLEVBQUFBLFFBQVEsRUFBRSxrc0dBbEJ3QjtBQW1CbENDLEVBQUFBLE9BQU8sRUFBRSxTQUFTQSxPQUFULEdBQW1CO0FBQzFCLFFBQUksT0FBTyxLQUFLQyxXQUFaLEtBQTRCLFFBQTVCLElBQXdDQyxrQkFBa0IsQ0FBQyxLQUFLRCxXQUFOLENBQTlELEVBQWtGO0FBQ2hGLFdBQUtaLEtBQUwsR0FBYWMsSUFBSSxDQUFDQyxLQUFMLENBQVcsS0FBS0gsV0FBaEIsQ0FBYjtBQUNELEtBRkQsTUFFTyxJQUFJMUIsT0FBTyxDQUFDLEtBQUswQixXQUFOLENBQVAsS0FBOEIsUUFBbEMsRUFBNEM7QUFDakQsV0FBS1osS0FBTCxHQUFhLEtBQUtZLFdBQWxCO0FBQ0Q7O0FBRUQsUUFBSSxDQUFDLEtBQUtaLEtBQUwsQ0FBV0MsSUFBaEIsRUFBc0I7QUFDcEIsV0FBS0QsS0FBTCxHQUFhO0FBQ1hDLFFBQUFBLElBQUksRUFBRSxFQURLO0FBRVhDLFFBQUFBLEtBQUssRUFBRSxNQUZJO0FBR1hDLFFBQUFBLElBQUksRUFBRTtBQUhLLE9BQWI7QUFLRDs7QUFFRCxTQUFLSyxRQUFMLEdBQWdCLEtBQUtSLEtBQUwsQ0FBV0MsSUFBM0I7QUFDQSxTQUFLUSxNQUFMLEdBQWMsSUFBZDtBQUNELEdBcENpQztBQXFDbENPLEVBQUFBLE9BQU8sRUFBRTtBQUNQQyxJQUFBQSxJQUFJLEVBQUUsU0FBU0EsSUFBVCxHQUFnQjtBQUNwQixVQUFJQyxLQUFLLEdBQUcsSUFBWjs7QUFFQTFCLE1BQUFBLE9BQU8sR0FBRzJCLFVBQVUsQ0FBQyxZQUFZO0FBQy9CRCxRQUFBQSxLQUFLLENBQUNkLE9BQU4sR0FBZ0IsS0FBaEI7QUFDQWMsUUFBQUEsS0FBSyxDQUFDbEIsS0FBTixDQUFZQyxJQUFaLEdBQW1CLEVBQW5CO0FBQ0QsT0FIbUIsRUFHakIsR0FIaUIsQ0FBcEI7QUFJRCxLQVJNO0FBU1BtQixJQUFBQSxLQUFLLEVBQUUsU0FBU0EsS0FBVCxHQUFpQjtBQUN0QixXQUFLaEIsT0FBTCxHQUFlLElBQWY7QUFDRCxLQVhNO0FBWVBpQixJQUFBQSxNQUFNLEVBQUUsU0FBU0EsTUFBVCxDQUFnQnBCLElBQWhCLEVBQXNCO0FBQzVCcUIsTUFBQUEsWUFBWSxDQUFDOUIsT0FBRCxDQUFaOztBQUVBLFVBQUlTLElBQUosRUFBVTtBQUNSLFlBQUksS0FBS0ssTUFBTCxJQUFlLEtBQUtFLFFBQXhCLEVBQWtDLEtBQUtELFlBQUwsR0FBb0IsS0FBS0QsTUFBekI7QUFDbEMsYUFBS0UsUUFBTCxHQUFnQlAsSUFBSSxDQUFDc0IsS0FBckI7QUFDQSxhQUFLakIsTUFBTCxHQUFjTCxJQUFJLENBQUNzQixLQUFuQjtBQUNEOztBQUVELFdBQUtuQixPQUFMLEdBQWUsS0FBZjtBQUNBLFdBQUtKLEtBQUwsQ0FBV0MsSUFBWCxHQUFrQixLQUFLTyxRQUF2QjtBQUNEO0FBdkJNLEdBckN5QjtBQThEbENnQixFQUFBQSxRQUFRLEVBQUU7QUFDUkMsSUFBQUEsYUFBYSxFQUFFLFNBQVNBLGFBQVQsR0FBeUI7QUFDdEMsVUFBSW5CLE1BQU0sR0FBRyxLQUFLQSxNQUFMLElBQWUsS0FBS0UsUUFBcEIsR0FBK0IsS0FBS0QsWUFBcEMsR0FBbUQsS0FBS0QsTUFBckU7QUFDQSxhQUFPLEtBQUtaLEtBQUwsQ0FBV2dDLE1BQVgsQ0FBa0IsVUFBVUMsQ0FBVixFQUFhO0FBQ3BDLGVBQU9BLENBQUMsQ0FBQ0osS0FBRixDQUFRSyxPQUFSLENBQWdCdEIsTUFBaEIsTUFBNEIsQ0FBQyxDQUE3QixJQUFrQ3FCLENBQUMsQ0FBQ0UsV0FBRixDQUFjQyxJQUFkLENBQW1CLFVBQVVDLENBQVYsRUFBYTtBQUN2RSxpQkFBT0EsQ0FBQyxDQUFDSCxPQUFGLENBQVV0QixNQUFWLE1BQXNCLENBQUMsQ0FBOUI7QUFDRCxTQUZ3QyxDQUF6QztBQUdELE9BSk0sQ0FBUDtBQUtEO0FBUk8sR0E5RHdCO0FBd0VsQzBCLEVBQUFBLEtBQUssRUFBRTtBQUNMaEMsSUFBQUEsS0FBSyxFQUFFO0FBQ0xpQyxNQUFBQSxJQUFJLEVBQUUsSUFERDtBQUVMQyxNQUFBQSxPQUFPLEVBQUUsU0FBU0EsT0FBVCxDQUFpQmxDLEtBQWpCLEVBQXdCO0FBQy9CLGFBQUttQyxLQUFMLENBQVcsa0JBQVgsRUFBK0JuQyxLQUEvQjtBQUNEO0FBSkk7QUFERjtBQXhFMkIsQ0FBcEMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiOyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG52YXIgdGltZW91dCA9IHVuZGVmaW5lZDtcbnZhciBpY29ucyA9IHdwY2Z0b19pY29uc19zZXQ7XG5WdWUuY29tcG9uZW50KCd3cGNmdG9faWNvbl9waWNrZXInLCB7XG4gIHByb3BzOiBbJ2ZpZWxkcycsICdmaWVsZF9sYWJlbCcsICdmaWVsZF9uYW1lJywgJ2ZpZWxkX2lkJywgJ2ZpZWxkX3ZhbHVlJywgJ2ZpZWxkX2RhdGEnXSxcbiAgZGF0YTogZnVuY3Rpb24gZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IHtcbiAgICAgICAgaWNvbjogJycsXG4gICAgICAgIGNvbG9yOiAnIzAwMCcsXG4gICAgICAgIHNpemU6IDE1XG4gICAgICB9LFxuICAgICAgZm9jdXNPbjogZmFsc2UsXG4gICAgICBpY29uczogaWNvbnMsXG4gICAgICBob3ZlclBhbmVsOiBmYWxzZSxcbiAgICAgIHNlYXJjaDogXCJcIixcbiAgICAgIGJlZm9yZVNlbGVjdDogXCJcIixcbiAgICAgIHNlbGVjdGVkOiBcIlwiLFxuICAgICAgaW5pdGVkOiBmYWxzZVxuICAgIH07XG4gIH0sXG4gIHRlbXBsYXRlOiBcIlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvX2dlbmVyaWNfZmllbGQgd3BjZnRvX2dlbmVyaWNfZmllbGRfaWNvbnBpY2tlclxcXCI+XFxuXFxuICAgICAgICAgICAgPHdwY2Z0b19maWVsZHNfYXNpZGVfYmVmb3JlIDpmaWVsZHM9XFxcImZpZWxkc1xcXCIgOmZpZWxkX2xhYmVsPVxcXCJmaWVsZF9sYWJlbFxcXCI+PC93cGNmdG9fZmllbGRzX2FzaWRlX2JlZm9yZT5cXG4gICAgICAgICAgICBcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG8tZmllbGQtY29udGVudFxcXCI+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0b19nZW5lcmljX2ZpZWxkX19pbm5lclxcXCI+XFxuICAgIFxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvX2dlbmVyaWNfZmllbGRcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5JY29uIHBpY2tlcjwvbGFiZWw+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHJlZj1cXFwicGlja2VyXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XFxcInNlYXJjaFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICBAYmx1cj1cXFwiYmx1clxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICBAZm9jdXM9XFxcImZvY3VzXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XFxcImVtYWlsXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XFxcIlNlYXJjaCBhbiBpY29uXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICBcXG4gICAgICAgICAgICAgICAgICAgIDx3cGNmdG9fY29sb3IgQHdwY2Z0by1nZXQtdmFsdWU9XFxcInZhbHVlWydjb2xvciddID0gJGV2ZW50XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDpmaWVsZHM9XFxcIntwb3NpdGlvbjogJ2JvdHRvbSd9XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIHYtaWY9XFxcImluaXRlZFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICA6ZmllbGRfbGFiZWw9XFxcIidJY29uIGNvbG9yJ1xcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICA6ZmllbGRfdmFsdWU9XFxcInZhbHVlWydjb2xvciddXFxcIj5cXG4gICAgXFxuICAgICAgICAgICAgICAgICAgICA8L3dwY2Z0b19jb2xvcj5cXG4gICAgXFxuICAgICAgICAgICAgICAgICAgICA8d3BjZnRvX3JhbmdlX3NsaWRlciA6ZmllbGRzPVxcXCJmaWVsZHNcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgdi1pZj1cXFwiaW5pdGVkXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDpmaWVsZF9sYWJlbD1cXFwiJ0ljb24gc2l6ZSdcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgOmZpZWxkX25hbWU9XFxcImZpZWxkX25hbWVcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgOmZpZWxkX2Rlc2NyaXB0aW9uPVxcXCInSWNvbiBzaXplIHNldCBpbiBwaXhlbHMnXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDpmaWVsZF9pZD1cXFwiZmllbGRfaWRcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgOmZpZWxkX3ZhbHVlPVxcXCJ2YWx1ZVsnc2l6ZSddXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDpmaWVsZF9kYXRhPVxcXCJ7bWluOjEsbWF4OjIwMH1cXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgOmZpZWxkX2lucHV0X2FkZG9uPVxcXCJ7bGFiZWw6J3B4J31cXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgQHdwY2Z0by1nZXQtdmFsdWU9XFxcInZhbHVlWydzaXplJ10gPSAkZXZlbnRcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPC93cGNmdG9fcmFuZ2Vfc2xpZGVyPlxcbiAgICBcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgIFxcbiAgICAgICAgICAgICAgICA8dHJhbnNpdGlvbiBuYW1lPVxcXCJpY29uLXByZXZpZXctZmFkZVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtaWY9XFxcImZvY3VzT25cXFwiIGNsYXNzPVxcXCJwcmV2aWV3LWNvbnRhaW5lclxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBAY2xpY2s9XFxcInNlbGVjdCh1bmRlZmluZWQpXFxcIiBAbW91c2VvdmVyPVxcXCJob3ZlclBhbmVsID0gdHJ1ZVxcXCIgQG1vdXNlb3V0PVxcXCJob3ZlclBhbmVsID0gZmFsc2VcXFwiIDpjbGFzcz1cXFwiWydwcmV2aWV3ZXInLCAncm91bmRlZCcsIHsnY3VzdG9tLXNoYWRvdy1zbSc6ICFob3ZlclBhbmVsfSwgeydjdXN0b20tc2hhZG93JzogaG92ZXJQYW5lbH0gXVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgdi1mb3I9XFxcIihpLCBpbmRleCkgaW4gaWNvbnNGaWx0ZXJlZFxcXCIgOmtleT1cXFwiaW5kZXhcXFwiIGNsYXNzPVxcXCJpY29uLXByZXZpZXdcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBAY2xpY2sucHJldmVudC5zdG9wPVxcXCJzZWxlY3QoaSlcXFwiIDpjbGFzcz1cXFwiWydpY29uLXdyYXBwZXInLCdyb3VuZGVkJywnc2hhZG93LXNtJywge3NlbGVjdGVkOiBpLnRpdGxlID09IHNlbGVjdGVkfV1cXFwiID5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSA6Y2xhc3M9XFxcImkudGl0bGVcXFwiIC8+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPC90cmFuc2l0aW9uPlxcbiAgICAgICAgICAgIFxcbiAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiaWNvbi1wcmV2aWV3LXdyYXBcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlByZXZpZXc8L2xhYmVsPlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiaWNvbi1wcmV2aWV3LWlubmVyXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cXFwid3BjZnRvX2dlbmVyaWNfZmllbGRfX2ljb25waWNrZXJfX2ljb25cXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgdi1iaW5kOmNsYXNzPVxcXCJ2YWx1ZS5pY29uXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIHYtYmluZDpzdHlsZT1cXFwieyBjb2xvcjogdmFsdWUuY29sb3IsICdmb250LXNpemUnIDogdmFsdWUuc2l6ZSArICdweCd9XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIHYtaWY9XFxcInZhbHVlLmljb24gJiYgdmFsdWUuaWNvbiAhPT0gJydcXFwiPjwvaT4gIFxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHYtZWxzZT4tLTwvc3Bhbj4gIFxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+ICAgICAgICBcXG4gICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICA8L2Rpdj5cXG5cXG4gICAgICAgIDwvZGl2PlxcbiAgXCIsXG4gIG1vdW50ZWQ6IGZ1bmN0aW9uIG1vdW50ZWQoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmZpZWxkX3ZhbHVlID09PSAnc3RyaW5nJyAmJiBXcGNmdG9Jc0pzb25TdHJpbmcodGhpcy5maWVsZF92YWx1ZSkpIHtcbiAgICAgIHRoaXMudmFsdWUgPSBKU09OLnBhcnNlKHRoaXMuZmllbGRfdmFsdWUpO1xuICAgIH0gZWxzZSBpZiAoX3R5cGVvZih0aGlzLmZpZWxkX3ZhbHVlKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmZpZWxkX3ZhbHVlO1xuICAgIH1cblxuICAgIGlmICghdGhpcy52YWx1ZS5pY29uKSB7XG4gICAgICB0aGlzLnZhbHVlID0ge1xuICAgICAgICBpY29uOiAnJyxcbiAgICAgICAgY29sb3I6ICcjMDAwJyxcbiAgICAgICAgc2l6ZTogMTVcbiAgICAgIH07XG4gICAgfVxuXG4gICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMudmFsdWUuaWNvbjtcbiAgICB0aGlzLmluaXRlZCA9IHRydWU7XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBibHVyOiBmdW5jdGlvbiBibHVyKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBfdGhpcy5mb2N1c09uID0gZmFsc2U7XG4gICAgICAgIF90aGlzLnZhbHVlLmljb24gPSAnJztcbiAgICAgIH0sIDEwMCk7XG4gICAgfSxcbiAgICBmb2N1czogZnVuY3Rpb24gZm9jdXMoKSB7XG4gICAgICB0aGlzLmZvY3VzT24gPSB0cnVlO1xuICAgIH0sXG4gICAgc2VsZWN0OiBmdW5jdGlvbiBzZWxlY3QoaWNvbikge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXG4gICAgICBpZiAoaWNvbikge1xuICAgICAgICBpZiAodGhpcy5zZWFyY2ggIT0gdGhpcy5zZWxlY3RlZCkgdGhpcy5iZWZvcmVTZWxlY3QgPSB0aGlzLnNlYXJjaDtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGljb24udGl0bGU7XG4gICAgICAgIHRoaXMuc2VhcmNoID0gaWNvbi50aXRsZTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5mb2N1c09uID0gZmFsc2U7XG4gICAgICB0aGlzLnZhbHVlLmljb24gPSB0aGlzLnNlbGVjdGVkO1xuICAgIH1cbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBpY29uc0ZpbHRlcmVkOiBmdW5jdGlvbiBpY29uc0ZpbHRlcmVkKCkge1xuICAgICAgdmFyIHNlYXJjaCA9IHRoaXMuc2VhcmNoID09IHRoaXMuc2VsZWN0ZWQgPyB0aGlzLmJlZm9yZVNlbGVjdCA6IHRoaXMuc2VhcmNoO1xuICAgICAgcmV0dXJuIHRoaXMuaWNvbnMuZmlsdGVyKGZ1bmN0aW9uIChpKSB7XG4gICAgICAgIHJldHVybiBpLnRpdGxlLmluZGV4T2Yoc2VhcmNoKSAhPT0gLTEgfHwgaS5zZWFyY2hUZXJtcy5zb21lKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgcmV0dXJuIHQuaW5kZXhPZihzZWFyY2gpICE9PSAtMTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgdmFsdWU6IHtcbiAgICAgIGRlZXA6IHRydWUsXG4gICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ3dwY2Z0by1nZXQtdmFsdWUnLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59KTsiXX0=
},{}]},{},[1])
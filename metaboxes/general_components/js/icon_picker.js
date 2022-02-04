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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfN2IzZmNjMTUuanMiXSwibmFtZXMiOlsiX3R5cGVvZiIsIm9iaiIsIlN5bWJvbCIsIml0ZXJhdG9yIiwiY29uc3RydWN0b3IiLCJwcm90b3R5cGUiLCJ0aW1lb3V0IiwidW5kZWZpbmVkIiwiaWNvbnMiLCJ3cGNmdG9faWNvbnNfc2V0IiwiVnVlIiwiY29tcG9uZW50IiwicHJvcHMiLCJkYXRhIiwidmFsdWUiLCJpY29uIiwiY29sb3IiLCJzaXplIiwiZm9jdXNPbiIsImhvdmVyUGFuZWwiLCJzZWFyY2giLCJiZWZvcmVTZWxlY3QiLCJzZWxlY3RlZCIsImluaXRlZCIsInRlbXBsYXRlIiwibW91bnRlZCIsImZpZWxkX3ZhbHVlIiwiV3BjZnRvSXNKc29uU3RyaW5nIiwiSlNPTiIsInBhcnNlIiwibWV0aG9kcyIsImJsdXIiLCJfdGhpcyIsInNldFRpbWVvdXQiLCJmb2N1cyIsInNlbGVjdCIsImNsZWFyVGltZW91dCIsInRpdGxlIiwiY29tcHV0ZWQiLCJpY29uc0ZpbHRlcmVkIiwiZmlsdGVyIiwiaSIsImluZGV4T2YiLCJzZWFyY2hUZXJtcyIsInNvbWUiLCJ0Iiwid2F0Y2giLCJkZWVwIiwiaGFuZGxlciIsIiRlbWl0Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQSxTQUFTQSxPQUFULENBQWlCQyxHQUFqQixFQUFzQjtBQUFFOztBQUEyQixTQUFPRCxPQUFPLEdBQUcsY0FBYyxPQUFPRSxNQUFyQixJQUErQixZQUFZLE9BQU9BLE1BQU0sQ0FBQ0MsUUFBekQsR0FBb0UsVUFBVUYsR0FBVixFQUFlO0FBQUUsV0FBTyxPQUFPQSxHQUFkO0FBQW9CLEdBQXpHLEdBQTRHLFVBQVVBLEdBQVYsRUFBZTtBQUFFLFdBQU9BLEdBQUcsSUFBSSxjQUFjLE9BQU9DLE1BQTVCLElBQXNDRCxHQUFHLENBQUNHLFdBQUosS0FBb0JGLE1BQTFELElBQW9FRCxHQUFHLEtBQUtDLE1BQU0sQ0FBQ0csU0FBbkYsR0FBK0YsUUFBL0YsR0FBMEcsT0FBT0osR0FBeEg7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TCxHQUFlLEtBQWY7QUFDQSxXQUFLSixLQUFMLENBQVdDLElBQVgsR0FBa0IsS0FBS08sUUFBdkI7QUFDRDtBQXZCTSxHQXJDeUI7QUE4RGxDZ0IsRUFBQUEsUUFBUSxFQUFFO0FBQ1JDLElBQUFBLGFBQWEsRUFBRSxTQUFTQSxhQUFULEdBQXlCO0FBQ3RDLFVBQUluQixNQUFNLEdBQUcsS0FBS0EsTUFBTCxJQUFlLEtBQUtFLFFBQXBCLEdBQStCLEtBQUtELFlBQXBDLEdBQW1ELEtBQUtELE1BQXJFO0FBQ0EsYUFBTyxLQUFLWixLQUFMLENBQVdnQyxNQUFYLENBQWtCLFVBQVVDLENBQVYsRUFBYTtBQUNwQyxlQUFPQSxDQUFDLENBQUNKLEtBQUYsQ0FBUUssT0FBUixDQUFnQnRCLE1BQWhCLE1BQTRCLENBQUMsQ0FBN0IsSUFBa0NxQixDQUFDLENBQUNFLFdBQUYsQ0FBY0MsSUFBZCxDQUFtQixVQUFVQyxDQUFWLEVBQWE7QUFDdkUsaUJBQU9BLENBQUMsQ0FBQ0gsT0FBRixDQUFVdEIsTUFBVixNQUFzQixDQUFDLENBQTlCO0FBQ0QsU0FGd0MsQ0FBekM7QUFHRCxPQUpNLENBQVA7QUFLRDtBQVJPLEdBOUR3QjtBQXdFbEMwQixFQUFBQSxLQUFLLEVBQUU7QUFDTGhDLElBQUFBLEtBQUssRUFBRTtBQUNMaUMsTUFBQUEsSUFBSSxFQUFFLElBREQ7QUFFTEMsTUFBQUEsT0FBTyxFQUFFLFNBQVNBLE9BQVQsQ0FBaUJsQyxLQUFqQixFQUF3QjtBQUMvQixhQUFLbUMsS0FBTCxDQUFXLGtCQUFYLEVBQStCbkMsS0FBL0I7QUFDRDtBQUpJO0FBREY7QUF4RTJCLENBQXBDIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9LCBfdHlwZW9mKG9iaik7IH1cblxudmFyIHRpbWVvdXQgPSB1bmRlZmluZWQ7XG52YXIgaWNvbnMgPSB3cGNmdG9faWNvbnNfc2V0O1xuVnVlLmNvbXBvbmVudCgnd3BjZnRvX2ljb25fcGlja2VyJywge1xuICBwcm9wczogWydmaWVsZHMnLCAnZmllbGRfbGFiZWwnLCAnZmllbGRfbmFtZScsICdmaWVsZF9pZCcsICdmaWVsZF92YWx1ZScsICdmaWVsZF9kYXRhJ10sXG4gIGRhdGE6IGZ1bmN0aW9uIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiB7XG4gICAgICAgIGljb246ICcnLFxuICAgICAgICBjb2xvcjogJyMwMDAnLFxuICAgICAgICBzaXplOiAxNVxuICAgICAgfSxcbiAgICAgIGZvY3VzT246IGZhbHNlLFxuICAgICAgaWNvbnM6IGljb25zLFxuICAgICAgaG92ZXJQYW5lbDogZmFsc2UsXG4gICAgICBzZWFyY2g6IFwiXCIsXG4gICAgICBiZWZvcmVTZWxlY3Q6IFwiXCIsXG4gICAgICBzZWxlY3RlZDogXCJcIixcbiAgICAgIGluaXRlZDogZmFsc2VcbiAgICB9O1xuICB9LFxuICB0ZW1wbGF0ZTogXCJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0b19nZW5lcmljX2ZpZWxkIHdwY2Z0b19nZW5lcmljX2ZpZWxkX2ljb25waWNrZXJcXFwiPlxcblxcbiAgICAgICAgICAgIDx3cGNmdG9fZmllbGRzX2FzaWRlX2JlZm9yZSA6ZmllbGRzPVxcXCJmaWVsZHNcXFwiIDpmaWVsZF9sYWJlbD1cXFwiZmllbGRfbGFiZWxcXFwiPjwvd3BjZnRvX2ZpZWxkc19hc2lkZV9iZWZvcmU+XFxuICAgICAgICAgICAgXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvLWZpZWxkLWNvbnRlbnRcXFwiPlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9fZ2VuZXJpY19maWVsZF9faW5uZXJcXFwiPlxcbiAgICBcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0b19nZW5lcmljX2ZpZWxkXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+SWNvbiBwaWNrZXI8L2xhYmVsPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCByZWY9XFxcInBpY2tlclxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVxcXCJzZWFyY2hcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgQGJsdXI9XFxcImJsdXJcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgQGZvY3VzPVxcXCJmb2N1c1xcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVxcXCJlbWFpbFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVxcXCJTZWFyY2ggYW4gaWNvblxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgXFxuICAgICAgICAgICAgICAgICAgICA8d3BjZnRvX2NvbG9yIEB3cGNmdG8tZ2V0LXZhbHVlPVxcXCJ2YWx1ZVsnY29sb3InXSA9ICRldmVudFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICA6ZmllbGRzPVxcXCJ7cG9zaXRpb246ICdib3R0b20nfVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICB2LWlmPVxcXCJpbml0ZWRcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgOmZpZWxkX2xhYmVsPVxcXCInSWNvbiBjb2xvcidcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgOmZpZWxkX3ZhbHVlPVxcXCJ2YWx1ZVsnY29sb3InXVxcXCI+XFxuICAgIFxcbiAgICAgICAgICAgICAgICAgICAgPC93cGNmdG9fY29sb3I+XFxuICAgIFxcbiAgICAgICAgICAgICAgICAgICAgPHdwY2Z0b19yYW5nZV9zbGlkZXIgOmZpZWxkcz1cXFwiZmllbGRzXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIHYtaWY9XFxcImluaXRlZFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICA6ZmllbGRfbGFiZWw9XFxcIidJY29uIHNpemUnXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDpmaWVsZF9uYW1lPVxcXCJmaWVsZF9uYW1lXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDpmaWVsZF9kZXNjcmlwdGlvbj1cXFwiJ0ljb24gc2l6ZSBzZXQgaW4gcGl4ZWxzJ1xcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICA6ZmllbGRfaWQ9XFxcImZpZWxkX2lkXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDpmaWVsZF92YWx1ZT1cXFwidmFsdWVbJ3NpemUnXVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICA6ZmllbGRfZGF0YT1cXFwie21pbjoxLG1heDoyMDB9XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDpmaWVsZF9pbnB1dF9hZGRvbj1cXFwie2xhYmVsOidweCd9XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIEB3cGNmdG8tZ2V0LXZhbHVlPVxcXCJ2YWx1ZVsnc2l6ZSddID0gJGV2ZW50XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDwvd3BjZnRvX3JhbmdlX3NsaWRlcj5cXG4gICAgXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICBcXG4gICAgICAgICAgICAgICAgPHRyYW5zaXRpb24gbmFtZT1cXFwiaWNvbi1wcmV2aWV3LWZhZGVcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWlmPVxcXCJmb2N1c09uXFxcIiBjbGFzcz1cXFwicHJldmlldy1jb250YWluZXJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgQGNsaWNrPVxcXCJzZWxlY3QodW5kZWZpbmVkKVxcXCIgQG1vdXNlb3Zlcj1cXFwiaG92ZXJQYW5lbCA9IHRydWVcXFwiIEBtb3VzZW91dD1cXFwiaG92ZXJQYW5lbCA9IGZhbHNlXFxcIiA6Y2xhc3M9XFxcIlsncHJldmlld2VyJywgJ3JvdW5kZWQnLCB7J2N1c3RvbS1zaGFkb3ctc20nOiAhaG92ZXJQYW5lbH0sIHsnY3VzdG9tLXNoYWRvdyc6IGhvdmVyUGFuZWx9IF1cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtZm9yPVxcXCIoaSwgaW5kZXgpIGluIGljb25zRmlsdGVyZWRcXFwiIDprZXk9XFxcImluZGV4XFxcIiBjbGFzcz1cXFwiaWNvbi1wcmV2aWV3XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgQGNsaWNrLnByZXZlbnQuc3RvcD1cXFwic2VsZWN0KGkpXFxcIiA6Y2xhc3M9XFxcIlsnaWNvbi13cmFwcGVyJywncm91bmRlZCcsJ3NoYWRvdy1zbScsIHtzZWxlY3RlZDogaS50aXRsZSA9PSBzZWxlY3RlZH1dXFxcIiA+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgOmNsYXNzPVxcXCJpLnRpdGxlXFxcIiAvPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDwvdHJhbnNpdGlvbj5cXG4gICAgICAgICAgICBcXG4gICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImljb24tcHJldmlldy13cmFwXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbD5QcmV2aWV3PC9sYWJlbD5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImljb24tcHJldmlldy1pbm5lclxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XFxcIndwY2Z0b19nZW5lcmljX2ZpZWxkX19pY29ucGlja2VyX19pY29uXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIHYtYmluZDpjbGFzcz1cXFwidmFsdWUuaWNvblxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6c3R5bGU9XFxcInsgY29sb3I6IHZhbHVlLmNvbG9yLCAnZm9udC1zaXplJyA6IHZhbHVlLnNpemUgKyAncHgnfVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICB2LWlmPVxcXCJ2YWx1ZS5pY29uICYmIHZhbHVlLmljb24gIT09ICcnXFxcIj48L2k+ICBcXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiB2LWVsc2U+LS08L3NwYW4+ICBcXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PiAgICAgICAgXFxuICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgPC9kaXY+XFxuXFxuICAgICAgICA8L2Rpdj5cXG4gIFwiLFxuICBtb3VudGVkOiBmdW5jdGlvbiBtb3VudGVkKCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5maWVsZF92YWx1ZSA9PT0gJ3N0cmluZycgJiYgV3BjZnRvSXNKc29uU3RyaW5nKHRoaXMuZmllbGRfdmFsdWUpKSB7XG4gICAgICB0aGlzLnZhbHVlID0gSlNPTi5wYXJzZSh0aGlzLmZpZWxkX3ZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKF90eXBlb2YodGhpcy5maWVsZF92YWx1ZSkgPT09ICdvYmplY3QnKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5maWVsZF92YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMudmFsdWUuaWNvbikge1xuICAgICAgdGhpcy52YWx1ZSA9IHtcbiAgICAgICAgaWNvbjogJycsXG4gICAgICAgIGNvbG9yOiAnIzAwMCcsXG4gICAgICAgIHNpemU6IDE1XG4gICAgICB9O1xuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLnZhbHVlLmljb247XG4gICAgdGhpcy5pbml0ZWQgPSB0cnVlO1xuICB9LFxuICBtZXRob2RzOiB7XG4gICAgYmx1cjogZnVuY3Rpb24gYmx1cigpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXMuZm9jdXNPbiA9IGZhbHNlO1xuICAgICAgICBfdGhpcy52YWx1ZS5pY29uID0gJyc7XG4gICAgICB9LCAxMDApO1xuICAgIH0sXG4gICAgZm9jdXM6IGZ1bmN0aW9uIGZvY3VzKCkge1xuICAgICAgdGhpcy5mb2N1c09uID0gdHJ1ZTtcbiAgICB9LFxuICAgIHNlbGVjdDogZnVuY3Rpb24gc2VsZWN0KGljb24pIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblxuICAgICAgaWYgKGljb24pIHtcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoICE9IHRoaXMuc2VsZWN0ZWQpIHRoaXMuYmVmb3JlU2VsZWN0ID0gdGhpcy5zZWFyY2g7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBpY29uLnRpdGxlO1xuICAgICAgICB0aGlzLnNlYXJjaCA9IGljb24udGl0bGU7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZm9jdXNPbiA9IGZhbHNlO1xuICAgICAgdGhpcy52YWx1ZS5pY29uID0gdGhpcy5zZWxlY3RlZDtcbiAgICB9XG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgaWNvbnNGaWx0ZXJlZDogZnVuY3Rpb24gaWNvbnNGaWx0ZXJlZCgpIHtcbiAgICAgIHZhciBzZWFyY2ggPSB0aGlzLnNlYXJjaCA9PSB0aGlzLnNlbGVjdGVkID8gdGhpcy5iZWZvcmVTZWxlY3QgOiB0aGlzLnNlYXJjaDtcbiAgICAgIHJldHVybiB0aGlzLmljb25zLmZpbHRlcihmdW5jdGlvbiAoaSkge1xuICAgICAgICByZXR1cm4gaS50aXRsZS5pbmRleE9mKHNlYXJjaCkgIT09IC0xIHx8IGkuc2VhcmNoVGVybXMuc29tZShmdW5jdGlvbiAodCkge1xuICAgICAgICAgIHJldHVybiB0LmluZGV4T2Yoc2VhcmNoKSAhPT0gLTE7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9LFxuICB3YXRjaDoge1xuICAgIHZhbHVlOiB7XG4gICAgICBkZWVwOiB0cnVlLFxuICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcih2YWx1ZSkge1xuICAgICAgICB0aGlzLiRlbWl0KCd3cGNmdG8tZ2V0LXZhbHVlJywgdmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufSk7Il19
},{}]},{},[1])
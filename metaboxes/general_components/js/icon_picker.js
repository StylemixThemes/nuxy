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
      search: '',
      beforeSelect: '',
      selected: '',
      inited: false
    };
  },
  computed: {
    previewLabel: function previewLabel() {
      return typeof wpcfto_global_settings !== 'undefined' && wpcfto_global_settings.translations ? wpcfto_global_settings.translations.preview : 'Preview';
    },
    iconsFiltered: function iconsFiltered() {
      var search = this.search == this.selected ? this.beforeSelect : this.search;
      return this.icons.filter(function (i) {
        return i.title.indexOf(search) !== -1 || i.searchTerms.some(function (t) {
          return t.indexOf(search) !== -1;
        });
      });
    }
  },
  template: "\n        <div class=\"wpcfto_generic_field wpcfto_generic_field_iconpicker\">\n\n            <wpcfto_fields_aside_before :fields=\"fields\" :field_label=\"field_label\"></wpcfto_fields_aside_before>\n            \n            <div class=\"wpcfto-field-content\">\n                <div class=\"wpcfto_generic_field__inner\">\n    \n                    <div class=\"wpcfto_generic_field\">\n                        <label>Icon picker</label>\n                        <input ref=\"picker\"\n                        v-model=\"search\"\n                        @blur=\"blur\"\n                        @focus=\"focus\"\n                        type=\"text\"\n                        class=\"form-control\"\n                        placeholder=\"Search an icon\">\n                    </div>\n    \n                    <wpcfto_color @wpcfto-get-value=\"value['color'] = $event\"\n                        :fields=\"{position: 'bottom'}\"\n                        v-if=\"inited\"\n                        :field_label=\"'Icon color'\"\n                        :field_value=\"value['color']\">\n    \n                    </wpcfto_color>\n    \n                    <wpcfto_range_slider :fields=\"fields\"\n                        v-if=\"inited\"\n                        :field_label=\"'Icon size'\"\n                        :field_name=\"field_name\"\n                        :field_description=\"'Icon size set in pixels'\"\n                        :field_id=\"field_id\"\n                        :field_value=\"value['size']\"\n                        :field_data=\"{min:1,max:200}\"\n                        :field_input_addon=\"{label:'px'}\"\n                        @wpcfto-get-value=\"value['size'] = $event\">\n                    </wpcfto_range_slider>\n    \n                </div>\n    \n                <transition name=\"icon-preview-fade\">\n                    <div v-if=\"focusOn\" class=\"preview-container\">\n                        <div @click=\"select(undefined)\" @mouseover=\"hoverPanel = true\" @mouseout=\"hoverPanel = false\" :class=\"['previewer', 'rounded', {'custom-shadow-sm': !hoverPanel}, {'custom-shadow': hoverPanel} ]\">\n                            <div v-for=\"(i, index) in iconsFiltered\" :key=\"index\" class=\"icon-preview\">\n                                <div @click.prevent.stop=\"select(i)\" :class=\"['icon-wrapper','rounded','shadow-sm', {selected: i.title == selected}]\" >\n                                    <i :class=\"i.title\" />\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </transition>\n            \n                 <div class=\"icon-preview-wrap\">\n                    <label>{{ previewLabel }}</label>\n                    <div class=\"icon-preview-inner\">\n                        <i class=\"wpcfto_generic_field__iconpicker__icon\"\n                        v-bind:class=\"value.icon\"\n                        v-bind:style=\"{ color: value.color, 'font-size' : value.size + 'px'}\"\n                        v-if=\"value.icon && value.icon !== ''\"></i>  \n                        <span v-else>--</span>  \n                    </div>        \n                 </div>\n             </div>\n\n        </div>\n  ",
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
  watch: {
    value: {
      deep: true,
      handler: function handler(value) {
        this.$emit('wpcfto-get-value', value);
      }
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfdHlwZW9mIiwib2JqIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJjb25zdHJ1Y3RvciIsInByb3RvdHlwZSIsInRpbWVvdXQiLCJ1bmRlZmluZWQiLCJpY29ucyIsIndwY2Z0b19pY29uc19zZXQiLCJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJ2YWx1ZSIsImljb24iLCJjb2xvciIsInNpemUiLCJmb2N1c09uIiwiaG92ZXJQYW5lbCIsInNlYXJjaCIsImJlZm9yZVNlbGVjdCIsInNlbGVjdGVkIiwiaW5pdGVkIiwiY29tcHV0ZWQiLCJwcmV2aWV3TGFiZWwiLCJ3cGNmdG9fZ2xvYmFsX3NldHRpbmdzIiwidHJhbnNsYXRpb25zIiwicHJldmlldyIsImljb25zRmlsdGVyZWQiLCJmaWx0ZXIiLCJpIiwidGl0bGUiLCJpbmRleE9mIiwic2VhcmNoVGVybXMiLCJzb21lIiwidCIsInRlbXBsYXRlIiwibW91bnRlZCIsImZpZWxkX3ZhbHVlIiwiV3BjZnRvSXNKc29uU3RyaW5nIiwiSlNPTiIsInBhcnNlIiwibWV0aG9kcyIsImJsdXIiLCJfdGhpcyIsInNldFRpbWVvdXQiLCJmb2N1cyIsInNlbGVjdCIsImNsZWFyVGltZW91dCIsIndhdGNoIiwiZGVlcCIsImhhbmRsZXIiLCIkZW1pdCJdLCJzb3VyY2VzIjpbImZha2VfNWQ5YjE3ZDEuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9LCBfdHlwZW9mKG9iaik7IH1cblxudmFyIHRpbWVvdXQgPSB1bmRlZmluZWQ7XG52YXIgaWNvbnMgPSB3cGNmdG9faWNvbnNfc2V0O1xuVnVlLmNvbXBvbmVudCgnd3BjZnRvX2ljb25fcGlja2VyJywge1xuICBwcm9wczogWydmaWVsZHMnLCAnZmllbGRfbGFiZWwnLCAnZmllbGRfbmFtZScsICdmaWVsZF9pZCcsICdmaWVsZF92YWx1ZScsICdmaWVsZF9kYXRhJ10sXG4gIGRhdGE6IGZ1bmN0aW9uIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiB7XG4gICAgICAgIGljb246ICcnLFxuICAgICAgICBjb2xvcjogJyMwMDAnLFxuICAgICAgICBzaXplOiAxNVxuICAgICAgfSxcbiAgICAgIGZvY3VzT246IGZhbHNlLFxuICAgICAgaWNvbnM6IGljb25zLFxuICAgICAgaG92ZXJQYW5lbDogZmFsc2UsXG4gICAgICBzZWFyY2g6ICcnLFxuICAgICAgYmVmb3JlU2VsZWN0OiAnJyxcbiAgICAgIHNlbGVjdGVkOiAnJyxcbiAgICAgIGluaXRlZDogZmFsc2VcbiAgICB9O1xuICB9LFxuICBjb21wdXRlZDoge1xuICAgIHByZXZpZXdMYWJlbDogZnVuY3Rpb24gcHJldmlld0xhYmVsKCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB3cGNmdG9fZ2xvYmFsX3NldHRpbmdzICE9PSAndW5kZWZpbmVkJyAmJiB3cGNmdG9fZ2xvYmFsX3NldHRpbmdzLnRyYW5zbGF0aW9ucyA/IHdwY2Z0b19nbG9iYWxfc2V0dGluZ3MudHJhbnNsYXRpb25zLnByZXZpZXcgOiAnUHJldmlldyc7XG4gICAgfSxcbiAgICBpY29uc0ZpbHRlcmVkOiBmdW5jdGlvbiBpY29uc0ZpbHRlcmVkKCkge1xuICAgICAgdmFyIHNlYXJjaCA9IHRoaXMuc2VhcmNoID09IHRoaXMuc2VsZWN0ZWQgPyB0aGlzLmJlZm9yZVNlbGVjdCA6IHRoaXMuc2VhcmNoO1xuICAgICAgcmV0dXJuIHRoaXMuaWNvbnMuZmlsdGVyKGZ1bmN0aW9uIChpKSB7XG4gICAgICAgIHJldHVybiBpLnRpdGxlLmluZGV4T2Yoc2VhcmNoKSAhPT0gLTEgfHwgaS5zZWFyY2hUZXJtcy5zb21lKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgcmV0dXJuIHQuaW5kZXhPZihzZWFyY2gpICE9PSAtMTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIHRlbXBsYXRlOiBcIlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvX2dlbmVyaWNfZmllbGQgd3BjZnRvX2dlbmVyaWNfZmllbGRfaWNvbnBpY2tlclxcXCI+XFxuXFxuICAgICAgICAgICAgPHdwY2Z0b19maWVsZHNfYXNpZGVfYmVmb3JlIDpmaWVsZHM9XFxcImZpZWxkc1xcXCIgOmZpZWxkX2xhYmVsPVxcXCJmaWVsZF9sYWJlbFxcXCI+PC93cGNmdG9fZmllbGRzX2FzaWRlX2JlZm9yZT5cXG4gICAgICAgICAgICBcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG8tZmllbGQtY29udGVudFxcXCI+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0b19nZW5lcmljX2ZpZWxkX19pbm5lclxcXCI+XFxuICAgIFxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvX2dlbmVyaWNfZmllbGRcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5JY29uIHBpY2tlcjwvbGFiZWw+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHJlZj1cXFwicGlja2VyXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XFxcInNlYXJjaFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICBAYmx1cj1cXFwiYmx1clxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICBAZm9jdXM9XFxcImZvY3VzXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XFxcInRleHRcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cXFwiU2VhcmNoIGFuIGljb25cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgIFxcbiAgICAgICAgICAgICAgICAgICAgPHdwY2Z0b19jb2xvciBAd3BjZnRvLWdldC12YWx1ZT1cXFwidmFsdWVbJ2NvbG9yJ10gPSAkZXZlbnRcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgOmZpZWxkcz1cXFwie3Bvc2l0aW9uOiAnYm90dG9tJ31cXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgdi1pZj1cXFwiaW5pdGVkXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDpmaWVsZF9sYWJlbD1cXFwiJ0ljb24gY29sb3InXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDpmaWVsZF92YWx1ZT1cXFwidmFsdWVbJ2NvbG9yJ11cXFwiPlxcbiAgICBcXG4gICAgICAgICAgICAgICAgICAgIDwvd3BjZnRvX2NvbG9yPlxcbiAgICBcXG4gICAgICAgICAgICAgICAgICAgIDx3cGNmdG9fcmFuZ2Vfc2xpZGVyIDpmaWVsZHM9XFxcImZpZWxkc1xcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICB2LWlmPVxcXCJpbml0ZWRcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgOmZpZWxkX2xhYmVsPVxcXCInSWNvbiBzaXplJ1xcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICA6ZmllbGRfbmFtZT1cXFwiZmllbGRfbmFtZVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICA6ZmllbGRfZGVzY3JpcHRpb249XFxcIidJY29uIHNpemUgc2V0IGluIHBpeGVscydcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgOmZpZWxkX2lkPVxcXCJmaWVsZF9pZFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICA6ZmllbGRfdmFsdWU9XFxcInZhbHVlWydzaXplJ11cXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgOmZpZWxkX2RhdGE9XFxcInttaW46MSxtYXg6MjAwfVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICA6ZmllbGRfaW5wdXRfYWRkb249XFxcIntsYWJlbDoncHgnfVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICBAd3BjZnRvLWdldC12YWx1ZT1cXFwidmFsdWVbJ3NpemUnXSA9ICRldmVudFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8L3dwY2Z0b19yYW5nZV9zbGlkZXI+XFxuICAgIFxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgXFxuICAgICAgICAgICAgICAgIDx0cmFuc2l0aW9uIG5hbWU9XFxcImljb24tcHJldmlldy1mYWRlXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgdi1pZj1cXFwiZm9jdXNPblxcXCIgY2xhc3M9XFxcInByZXZpZXctY29udGFpbmVyXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IEBjbGljaz1cXFwic2VsZWN0KHVuZGVmaW5lZClcXFwiIEBtb3VzZW92ZXI9XFxcImhvdmVyUGFuZWwgPSB0cnVlXFxcIiBAbW91c2VvdXQ9XFxcImhvdmVyUGFuZWwgPSBmYWxzZVxcXCIgOmNsYXNzPVxcXCJbJ3ByZXZpZXdlcicsICdyb3VuZGVkJywgeydjdXN0b20tc2hhZG93LXNtJzogIWhvdmVyUGFuZWx9LCB7J2N1c3RvbS1zaGFkb3cnOiBob3ZlclBhbmVsfSBdXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWZvcj1cXFwiKGksIGluZGV4KSBpbiBpY29uc0ZpbHRlcmVkXFxcIiA6a2V5PVxcXCJpbmRleFxcXCIgY2xhc3M9XFxcImljb24tcHJldmlld1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IEBjbGljay5wcmV2ZW50LnN0b3A9XFxcInNlbGVjdChpKVxcXCIgOmNsYXNzPVxcXCJbJ2ljb24td3JhcHBlcicsJ3JvdW5kZWQnLCdzaGFkb3ctc20nLCB7c2VsZWN0ZWQ6IGkudGl0bGUgPT0gc2VsZWN0ZWR9XVxcXCIgPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIDpjbGFzcz1cXFwiaS50aXRsZVxcXCIgLz5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8L3RyYW5zaXRpb24+XFxuICAgICAgICAgICAgXFxuICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJpY29uLXByZXZpZXctd3JhcFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8bGFiZWw+e3sgcHJldmlld0xhYmVsIH19PC9sYWJlbD5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImljb24tcHJldmlldy1pbm5lclxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XFxcIndwY2Z0b19nZW5lcmljX2ZpZWxkX19pY29ucGlja2VyX19pY29uXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIHYtYmluZDpjbGFzcz1cXFwidmFsdWUuaWNvblxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6c3R5bGU9XFxcInsgY29sb3I6IHZhbHVlLmNvbG9yLCAnZm9udC1zaXplJyA6IHZhbHVlLnNpemUgKyAncHgnfVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICB2LWlmPVxcXCJ2YWx1ZS5pY29uICYmIHZhbHVlLmljb24gIT09ICcnXFxcIj48L2k+ICBcXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiB2LWVsc2U+LS08L3NwYW4+ICBcXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PiAgICAgICAgXFxuICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgPC9kaXY+XFxuXFxuICAgICAgICA8L2Rpdj5cXG4gIFwiLFxuICBtb3VudGVkOiBmdW5jdGlvbiBtb3VudGVkKCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5maWVsZF92YWx1ZSA9PT0gJ3N0cmluZycgJiYgV3BjZnRvSXNKc29uU3RyaW5nKHRoaXMuZmllbGRfdmFsdWUpKSB7XG4gICAgICB0aGlzLnZhbHVlID0gSlNPTi5wYXJzZSh0aGlzLmZpZWxkX3ZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKF90eXBlb2YodGhpcy5maWVsZF92YWx1ZSkgPT09ICdvYmplY3QnKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5maWVsZF92YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMudmFsdWUuaWNvbikge1xuICAgICAgdGhpcy52YWx1ZSA9IHtcbiAgICAgICAgaWNvbjogJycsXG4gICAgICAgIGNvbG9yOiAnIzAwMCcsXG4gICAgICAgIHNpemU6IDE1XG4gICAgICB9O1xuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLnZhbHVlLmljb247XG4gICAgdGhpcy5pbml0ZWQgPSB0cnVlO1xuICB9LFxuICBtZXRob2RzOiB7XG4gICAgYmx1cjogZnVuY3Rpb24gYmx1cigpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXMuZm9jdXNPbiA9IGZhbHNlO1xuICAgICAgICBfdGhpcy52YWx1ZS5pY29uID0gJyc7XG4gICAgICB9LCAxMDApO1xuICAgIH0sXG4gICAgZm9jdXM6IGZ1bmN0aW9uIGZvY3VzKCkge1xuICAgICAgdGhpcy5mb2N1c09uID0gdHJ1ZTtcbiAgICB9LFxuICAgIHNlbGVjdDogZnVuY3Rpb24gc2VsZWN0KGljb24pIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblxuICAgICAgaWYgKGljb24pIHtcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoICE9IHRoaXMuc2VsZWN0ZWQpIHRoaXMuYmVmb3JlU2VsZWN0ID0gdGhpcy5zZWFyY2g7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBpY29uLnRpdGxlO1xuICAgICAgICB0aGlzLnNlYXJjaCA9IGljb24udGl0bGU7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZm9jdXNPbiA9IGZhbHNlO1xuICAgICAgdGhpcy52YWx1ZS5pY29uID0gdGhpcy5zZWxlY3RlZDtcbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgdmFsdWU6IHtcbiAgICAgIGRlZXA6IHRydWUsXG4gICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ3dwY2Z0by1nZXQtdmFsdWUnLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59KTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBLFNBQVNBLE9BQVQsQ0FBaUJDLEdBQWpCLEVBQXNCO0VBQUU7O0VBQTJCLE9BQU9ELE9BQU8sR0FBRyxjQUFjLE9BQU9FLE1BQXJCLElBQStCLFlBQVksT0FBT0EsTUFBTSxDQUFDQyxRQUF6RCxHQUFvRSxVQUFVRixHQUFWLEVBQWU7SUFBRSxPQUFPLE9BQU9BLEdBQWQ7RUFBb0IsQ0FBekcsR0FBNEcsVUFBVUEsR0FBVixFQUFlO0lBQUUsT0FBT0EsR0FBRyxJQUFJLGNBQWMsT0FBT0MsTUFBNUIsSUFBc0NELEdBQUcsQ0FBQ0csV0FBSixLQUFvQkYsTUFBMUQsSUFBb0VELEdBQUcsS0FBS0MsTUFBTSxDQUFDRyxTQUFuRixHQUErRixRQUEvRixHQUEwRyxPQUFPSixHQUF4SDtFQUE4SCxDQUFy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
},{}]},{},[1])
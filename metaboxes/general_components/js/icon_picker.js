(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
var timeout = undefined;
var icons = wpcfto_icons_set;
Vue.component('wpcfto_icon_picker', _defineProperty(_defineProperty({
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
  }
}, "computed", {
  iconsFiltered: function iconsFiltered() {
    var search = this.search == this.selected ? this.beforeSelect : this.search;
    return this.icons.filter(function (i) {
      return i.title.indexOf(search) !== -1 || i.searchTerms.some(function (t) {
        return t.indexOf(search) !== -1;
      });
    });
  }
}), "watch", {
  value: {
    deep: true,
    handler: function handler(value) {
      this.$emit('wpcfto-get-value', value);
    }
  }
}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfZGVmaW5lUHJvcGVydHkiLCJlIiwiciIsInQiLCJfdG9Qcm9wZXJ0eUtleSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJpIiwiX3RvUHJpbWl0aXZlIiwiX3R5cGVvZiIsIlN5bWJvbCIsInRvUHJpbWl0aXZlIiwiY2FsbCIsIlR5cGVFcnJvciIsIlN0cmluZyIsIk51bWJlciIsIm8iLCJpdGVyYXRvciIsImNvbnN0cnVjdG9yIiwicHJvdG90eXBlIiwidGltZW91dCIsInVuZGVmaW5lZCIsImljb25zIiwid3BjZnRvX2ljb25zX3NldCIsIlZ1ZSIsImNvbXBvbmVudCIsInByb3BzIiwiZGF0YSIsImljb24iLCJjb2xvciIsInNpemUiLCJmb2N1c09uIiwiaG92ZXJQYW5lbCIsInNlYXJjaCIsImJlZm9yZVNlbGVjdCIsInNlbGVjdGVkIiwiaW5pdGVkIiwiY29tcHV0ZWQiLCJwcmV2aWV3TGFiZWwiLCJ3cGNmdG9fZ2xvYmFsX3NldHRpbmdzIiwidHJhbnNsYXRpb25zIiwicHJldmlldyIsInRlbXBsYXRlIiwibW91bnRlZCIsImZpZWxkX3ZhbHVlIiwiV3BjZnRvSXNKc29uU3RyaW5nIiwiSlNPTiIsInBhcnNlIiwibWV0aG9kcyIsImJsdXIiLCJfdGhpcyIsInNldFRpbWVvdXQiLCJmb2N1cyIsInNlbGVjdCIsImNsZWFyVGltZW91dCIsInRpdGxlIiwiaWNvbnNGaWx0ZXJlZCIsImZpbHRlciIsImluZGV4T2YiLCJzZWFyY2hUZXJtcyIsInNvbWUiLCJkZWVwIiwiaGFuZGxlciIsIiRlbWl0Il0sInNvdXJjZXMiOlsiZmFrZV80M2Q0OTdkNS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KGUsIHIsIHQpIHsgcmV0dXJuIChyID0gX3RvUHJvcGVydHlLZXkocikpIGluIGUgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgciwgeyB2YWx1ZTogdCwgZW51bWVyYWJsZTogITAsIGNvbmZpZ3VyYWJsZTogITAsIHdyaXRhYmxlOiAhMCB9KSA6IGVbcl0gPSB0LCBlOyB9XG5mdW5jdGlvbiBfdG9Qcm9wZXJ0eUtleSh0KSB7IHZhciBpID0gX3RvUHJpbWl0aXZlKHQsIFwic3RyaW5nXCIpOyByZXR1cm4gXCJzeW1ib2xcIiA9PSBfdHlwZW9mKGkpID8gaSA6IGkgKyBcIlwiOyB9XG5mdW5jdGlvbiBfdG9QcmltaXRpdmUodCwgcikgeyBpZiAoXCJvYmplY3RcIiAhPSBfdHlwZW9mKHQpIHx8ICF0KSByZXR1cm4gdDsgdmFyIGUgPSB0W1N5bWJvbC50b1ByaW1pdGl2ZV07IGlmICh2b2lkIDAgIT09IGUpIHsgdmFyIGkgPSBlLmNhbGwodCwgciB8fCBcImRlZmF1bHRcIik7IGlmIChcIm9iamVjdFwiICE9IF90eXBlb2YoaSkpIHJldHVybiBpOyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQEB0b1ByaW1pdGl2ZSBtdXN0IHJldHVybiBhIHByaW1pdGl2ZSB2YWx1ZS5cIik7IH0gcmV0dXJuIChcInN0cmluZ1wiID09PSByID8gU3RyaW5nIDogTnVtYmVyKSh0KTsgfVxuZnVuY3Rpb24gX3R5cGVvZihvKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAobykgeyByZXR1cm4gdHlwZW9mIG87IH0gOiBmdW5jdGlvbiAobykgeyByZXR1cm4gbyAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgbyAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2YgbzsgfSwgX3R5cGVvZihvKTsgfVxudmFyIHRpbWVvdXQgPSB1bmRlZmluZWQ7XG52YXIgaWNvbnMgPSB3cGNmdG9faWNvbnNfc2V0O1xuVnVlLmNvbXBvbmVudCgnd3BjZnRvX2ljb25fcGlja2VyJywgX2RlZmluZVByb3BlcnR5KF9kZWZpbmVQcm9wZXJ0eSh7XG4gIHByb3BzOiBbJ2ZpZWxkcycsICdmaWVsZF9sYWJlbCcsICdmaWVsZF9uYW1lJywgJ2ZpZWxkX2lkJywgJ2ZpZWxkX3ZhbHVlJywgJ2ZpZWxkX2RhdGEnXSxcbiAgZGF0YTogZnVuY3Rpb24gZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IHtcbiAgICAgICAgaWNvbjogJycsXG4gICAgICAgIGNvbG9yOiAnIzAwMCcsXG4gICAgICAgIHNpemU6IDE1XG4gICAgICB9LFxuICAgICAgZm9jdXNPbjogZmFsc2UsXG4gICAgICBpY29uczogaWNvbnMsXG4gICAgICBob3ZlclBhbmVsOiBmYWxzZSxcbiAgICAgIHNlYXJjaDogJycsXG4gICAgICBiZWZvcmVTZWxlY3Q6ICcnLFxuICAgICAgc2VsZWN0ZWQ6ICcnLFxuICAgICAgaW5pdGVkOiBmYWxzZVxuICAgIH07XG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgcHJldmlld0xhYmVsOiBmdW5jdGlvbiBwcmV2aWV3TGFiZWwoKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHdwY2Z0b19nbG9iYWxfc2V0dGluZ3MgIT09ICd1bmRlZmluZWQnICYmIHdwY2Z0b19nbG9iYWxfc2V0dGluZ3MudHJhbnNsYXRpb25zID8gd3BjZnRvX2dsb2JhbF9zZXR0aW5ncy50cmFuc2xhdGlvbnMucHJldmlldyA6ICdQcmV2aWV3JztcbiAgICB9XG4gIH0sXG4gIHRlbXBsYXRlOiBcIlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvX2dlbmVyaWNfZmllbGQgd3BjZnRvX2dlbmVyaWNfZmllbGRfaWNvbnBpY2tlclxcXCI+XFxuXFxuICAgICAgICAgICAgPHdwY2Z0b19maWVsZHNfYXNpZGVfYmVmb3JlIDpmaWVsZHM9XFxcImZpZWxkc1xcXCIgOmZpZWxkX2xhYmVsPVxcXCJmaWVsZF9sYWJlbFxcXCI+PC93cGNmdG9fZmllbGRzX2FzaWRlX2JlZm9yZT5cXG4gICAgICAgICAgICBcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG8tZmllbGQtY29udGVudFxcXCI+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0b19nZW5lcmljX2ZpZWxkX19pbm5lclxcXCI+XFxuICAgIFxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvX2dlbmVyaWNfZmllbGRcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5JY29uIHBpY2tlcjwvbGFiZWw+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHJlZj1cXFwicGlja2VyXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XFxcInNlYXJjaFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICBAYmx1cj1cXFwiYmx1clxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICBAZm9jdXM9XFxcImZvY3VzXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XFxcInRleHRcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cXFwiU2VhcmNoIGFuIGljb25cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgIFxcbiAgICAgICAgICAgICAgICAgICAgPHdwY2Z0b19jb2xvciBAd3BjZnRvLWdldC12YWx1ZT1cXFwidmFsdWVbJ2NvbG9yJ10gPSAkZXZlbnRcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgOmZpZWxkcz1cXFwie3Bvc2l0aW9uOiAnYm90dG9tJ31cXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgdi1pZj1cXFwiaW5pdGVkXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDpmaWVsZF9sYWJlbD1cXFwiJ0ljb24gY29sb3InXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDpmaWVsZF92YWx1ZT1cXFwidmFsdWVbJ2NvbG9yJ11cXFwiPlxcbiAgICBcXG4gICAgICAgICAgICAgICAgICAgIDwvd3BjZnRvX2NvbG9yPlxcbiAgICBcXG4gICAgICAgICAgICAgICAgICAgIDx3cGNmdG9fcmFuZ2Vfc2xpZGVyIDpmaWVsZHM9XFxcImZpZWxkc1xcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICB2LWlmPVxcXCJpbml0ZWRcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgOmZpZWxkX2xhYmVsPVxcXCInSWNvbiBzaXplJ1xcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICA6ZmllbGRfbmFtZT1cXFwiZmllbGRfbmFtZVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICA6ZmllbGRfZGVzY3JpcHRpb249XFxcIidJY29uIHNpemUgc2V0IGluIHBpeGVscydcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgOmZpZWxkX2lkPVxcXCJmaWVsZF9pZFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICA6ZmllbGRfdmFsdWU9XFxcInZhbHVlWydzaXplJ11cXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgOmZpZWxkX2RhdGE9XFxcInttaW46MSxtYXg6MjAwfVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICA6ZmllbGRfaW5wdXRfYWRkb249XFxcIntsYWJlbDoncHgnfVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICBAd3BjZnRvLWdldC12YWx1ZT1cXFwidmFsdWVbJ3NpemUnXSA9ICRldmVudFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8L3dwY2Z0b19yYW5nZV9zbGlkZXI+XFxuICAgIFxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgXFxuICAgICAgICAgICAgICAgIDx0cmFuc2l0aW9uIG5hbWU9XFxcImljb24tcHJldmlldy1mYWRlXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgdi1pZj1cXFwiZm9jdXNPblxcXCIgY2xhc3M9XFxcInByZXZpZXctY29udGFpbmVyXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IEBjbGljaz1cXFwic2VsZWN0KHVuZGVmaW5lZClcXFwiIEBtb3VzZW92ZXI9XFxcImhvdmVyUGFuZWwgPSB0cnVlXFxcIiBAbW91c2VvdXQ9XFxcImhvdmVyUGFuZWwgPSBmYWxzZVxcXCIgOmNsYXNzPVxcXCJbJ3ByZXZpZXdlcicsICdyb3VuZGVkJywgeydjdXN0b20tc2hhZG93LXNtJzogIWhvdmVyUGFuZWx9LCB7J2N1c3RvbS1zaGFkb3cnOiBob3ZlclBhbmVsfSBdXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWZvcj1cXFwiKGksIGluZGV4KSBpbiBpY29uc0ZpbHRlcmVkXFxcIiA6a2V5PVxcXCJpbmRleFxcXCIgY2xhc3M9XFxcImljb24tcHJldmlld1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IEBjbGljay5wcmV2ZW50LnN0b3A9XFxcInNlbGVjdChpKVxcXCIgOmNsYXNzPVxcXCJbJ2ljb24td3JhcHBlcicsJ3JvdW5kZWQnLCdzaGFkb3ctc20nLCB7c2VsZWN0ZWQ6IGkudGl0bGUgPT0gc2VsZWN0ZWR9XVxcXCIgPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIDpjbGFzcz1cXFwiaS50aXRsZVxcXCIgLz5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8L3RyYW5zaXRpb24+XFxuICAgICAgICAgICAgXFxuICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJpY29uLXByZXZpZXctd3JhcFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8bGFiZWw+e3sgcHJldmlld0xhYmVsIH19PC9sYWJlbD5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImljb24tcHJldmlldy1pbm5lclxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XFxcIndwY2Z0b19nZW5lcmljX2ZpZWxkX19pY29ucGlja2VyX19pY29uXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIHYtYmluZDpjbGFzcz1cXFwidmFsdWUuaWNvblxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6c3R5bGU9XFxcInsgY29sb3I6IHZhbHVlLmNvbG9yLCAnZm9udC1zaXplJyA6IHZhbHVlLnNpemUgKyAncHgnfVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICB2LWlmPVxcXCJ2YWx1ZS5pY29uICYmIHZhbHVlLmljb24gIT09ICcnXFxcIj48L2k+ICBcXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiB2LWVsc2U+LS08L3NwYW4+ICBcXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PiAgICAgICAgXFxuICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgPC9kaXY+XFxuXFxuICAgICAgICA8L2Rpdj5cXG4gIFwiLFxuICBtb3VudGVkOiBmdW5jdGlvbiBtb3VudGVkKCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5maWVsZF92YWx1ZSA9PT0gJ3N0cmluZycgJiYgV3BjZnRvSXNKc29uU3RyaW5nKHRoaXMuZmllbGRfdmFsdWUpKSB7XG4gICAgICB0aGlzLnZhbHVlID0gSlNPTi5wYXJzZSh0aGlzLmZpZWxkX3ZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKF90eXBlb2YodGhpcy5maWVsZF92YWx1ZSkgPT09ICdvYmplY3QnKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5maWVsZF92YWx1ZTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLnZhbHVlLmljb24pIHtcbiAgICAgIHRoaXMudmFsdWUgPSB7XG4gICAgICAgIGljb246ICcnLFxuICAgICAgICBjb2xvcjogJyMwMDAnLFxuICAgICAgICBzaXplOiAxNVxuICAgICAgfTtcbiAgICB9XG4gICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMudmFsdWUuaWNvbjtcbiAgICB0aGlzLmluaXRlZCA9IHRydWU7XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBibHVyOiBmdW5jdGlvbiBibHVyKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXMuZm9jdXNPbiA9IGZhbHNlO1xuICAgICAgICBfdGhpcy52YWx1ZS5pY29uID0gJyc7XG4gICAgICB9LCAxMDApO1xuICAgIH0sXG4gICAgZm9jdXM6IGZ1bmN0aW9uIGZvY3VzKCkge1xuICAgICAgdGhpcy5mb2N1c09uID0gdHJ1ZTtcbiAgICB9LFxuICAgIHNlbGVjdDogZnVuY3Rpb24gc2VsZWN0KGljb24pIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgIGlmIChpY29uKSB7XG4gICAgICAgIGlmICh0aGlzLnNlYXJjaCAhPSB0aGlzLnNlbGVjdGVkKSB0aGlzLmJlZm9yZVNlbGVjdCA9IHRoaXMuc2VhcmNoO1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gaWNvbi50aXRsZTtcbiAgICAgICAgdGhpcy5zZWFyY2ggPSBpY29uLnRpdGxlO1xuICAgICAgfVxuICAgICAgdGhpcy5mb2N1c09uID0gZmFsc2U7XG4gICAgICB0aGlzLnZhbHVlLmljb24gPSB0aGlzLnNlbGVjdGVkO1xuICAgIH1cbiAgfVxufSwgXCJjb21wdXRlZFwiLCB7XG4gIGljb25zRmlsdGVyZWQ6IGZ1bmN0aW9uIGljb25zRmlsdGVyZWQoKSB7XG4gICAgdmFyIHNlYXJjaCA9IHRoaXMuc2VhcmNoID09IHRoaXMuc2VsZWN0ZWQgPyB0aGlzLmJlZm9yZVNlbGVjdCA6IHRoaXMuc2VhcmNoO1xuICAgIHJldHVybiB0aGlzLmljb25zLmZpbHRlcihmdW5jdGlvbiAoaSkge1xuICAgICAgcmV0dXJuIGkudGl0bGUuaW5kZXhPZihzZWFyY2gpICE9PSAtMSB8fCBpLnNlYXJjaFRlcm1zLnNvbWUoZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgcmV0dXJuIHQuaW5kZXhPZihzZWFyY2gpICE9PSAtMTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59KSwgXCJ3YXRjaFwiLCB7XG4gIHZhbHVlOiB7XG4gICAgZGVlcDogdHJ1ZSxcbiAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKHZhbHVlKSB7XG4gICAgICB0aGlzLiRlbWl0KCd3cGNmdG8tZ2V0LXZhbHVlJywgdmFsdWUpO1xuICAgIH1cbiAgfVxufSkpOyJdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWTs7QUFFWixTQUFTQSxlQUFlQSxDQUFDQyxDQUFDLEVBQUVDLENBQUMsRUFBRUMsQ0FBQyxFQUFFO0VBQUUsT0FBTyxDQUFDRCxDQUFDLEdBQUdFLGNBQWMsQ0FBQ0YsQ0FBQyxDQUFDLEtBQUtELENBQUMsR0FBR0ksTUFBTSxDQUFDQyxjQUFjLENBQUNMLENBQUMsRUFBRUMsQ0FBQyxFQUFFO0lBQUVLLEtBQUssRUFBRUosQ0FBQztJQUFFSyxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQUVDLFlBQVksRUFBRSxDQUFDLENBQUM7SUFBRUMsUUFBUSxFQUFFLENBQUM7RUFBRSxDQUFDLENBQUMsR0FBR1QsQ0FBQyxDQUFDQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxFQUFFRixDQUFDO0FBQUU7QUFDbkwsU0FBU0csY0FBY0EsQ0FBQ0QsQ0FBQyxFQUFFO0VBQUUsSUFBSVEsQ0FBQyxHQUFHQyxZQUFZLENBQUNULENBQUMsRUFBRSxRQUFRLENBQUM7RUFBRSxPQUFPLFFBQVEsSUFBSVUsT0FBTyxDQUFDRixDQUFD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
},{}]},{},[1])
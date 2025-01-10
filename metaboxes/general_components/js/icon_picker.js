(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _Vue$component;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

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
Vue.component('wpcfto_icon_picker', (_Vue$component = {
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
}, _defineProperty(_Vue$component, "computed", {
  iconsFiltered: function iconsFiltered() {
    var search = this.search == this.selected ? this.beforeSelect : this.search;
    return this.icons.filter(function (i) {
      return i.title.indexOf(search) !== -1 || i.searchTerms.some(function (t) {
        return t.indexOf(search) !== -1;
      });
    });
  }
}), _defineProperty(_Vue$component, "watch", {
  value: {
    deep: true,
    handler: function handler(value) {
      this.$emit('wpcfto-get-value', value);
    }
  }
}), _Vue$component));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfVnVlJGNvbXBvbmVudCIsIl9kZWZpbmVQcm9wZXJ0eSIsIm9iaiIsImtleSIsInZhbHVlIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJfdHlwZW9mIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJjb25zdHJ1Y3RvciIsInByb3RvdHlwZSIsInRpbWVvdXQiLCJ1bmRlZmluZWQiLCJpY29ucyIsIndwY2Z0b19pY29uc19zZXQiLCJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJpY29uIiwiY29sb3IiLCJzaXplIiwiZm9jdXNPbiIsImhvdmVyUGFuZWwiLCJzZWFyY2giLCJiZWZvcmVTZWxlY3QiLCJzZWxlY3RlZCIsImluaXRlZCIsImNvbXB1dGVkIiwicHJldmlld0xhYmVsIiwid3BjZnRvX2dsb2JhbF9zZXR0aW5ncyIsInRyYW5zbGF0aW9ucyIsInByZXZpZXciLCJ0ZW1wbGF0ZSIsIm1vdW50ZWQiLCJmaWVsZF92YWx1ZSIsIldwY2Z0b0lzSnNvblN0cmluZyIsIkpTT04iLCJwYXJzZSIsIm1ldGhvZHMiLCJibHVyIiwiX3RoaXMiLCJzZXRUaW1lb3V0IiwiZm9jdXMiLCJzZWxlY3QiLCJjbGVhclRpbWVvdXQiLCJ0aXRsZSIsImljb25zRmlsdGVyZWQiLCJmaWx0ZXIiLCJpIiwiaW5kZXhPZiIsInNlYXJjaFRlcm1zIiwic29tZSIsInQiLCJkZWVwIiwiaGFuZGxlciIsIiRlbWl0Il0sInNvdXJjZXMiOlsiZmFrZV80NjY3Mjk5Ni5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9WdWUkY29tcG9uZW50O1xuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfVxuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7IHJldHVybiBfdHlwZW9mID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgXCJzeW1ib2xcIiA9PSB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfSwgX3R5cGVvZihvYmopOyB9XG5cbnZhciB0aW1lb3V0ID0gdW5kZWZpbmVkO1xudmFyIGljb25zID0gd3BjZnRvX2ljb25zX3NldDtcblZ1ZS5jb21wb25lbnQoJ3dwY2Z0b19pY29uX3BpY2tlcicsIChfVnVlJGNvbXBvbmVudCA9IHtcbiAgcHJvcHM6IFsnZmllbGRzJywgJ2ZpZWxkX2xhYmVsJywgJ2ZpZWxkX25hbWUnLCAnZmllbGRfaWQnLCAnZmllbGRfdmFsdWUnLCAnZmllbGRfZGF0YSddLFxuICBkYXRhOiBmdW5jdGlvbiBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZToge1xuICAgICAgICBpY29uOiAnJyxcbiAgICAgICAgY29sb3I6ICcjMDAwJyxcbiAgICAgICAgc2l6ZTogMTVcbiAgICAgIH0sXG4gICAgICBmb2N1c09uOiBmYWxzZSxcbiAgICAgIGljb25zOiBpY29ucyxcbiAgICAgIGhvdmVyUGFuZWw6IGZhbHNlLFxuICAgICAgc2VhcmNoOiAnJyxcbiAgICAgIGJlZm9yZVNlbGVjdDogJycsXG4gICAgICBzZWxlY3RlZDogJycsXG4gICAgICBpbml0ZWQ6IGZhbHNlXG4gICAgfTtcbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBwcmV2aWV3TGFiZWw6IGZ1bmN0aW9uIHByZXZpZXdMYWJlbCgpIHtcbiAgICAgIHJldHVybiB0eXBlb2Ygd3BjZnRvX2dsb2JhbF9zZXR0aW5ncyAhPT0gJ3VuZGVmaW5lZCcgJiYgd3BjZnRvX2dsb2JhbF9zZXR0aW5ncy50cmFuc2xhdGlvbnMgPyB3cGNmdG9fZ2xvYmFsX3NldHRpbmdzLnRyYW5zbGF0aW9ucy5wcmV2aWV3IDogJ1ByZXZpZXcnO1xuICAgIH1cbiAgfSxcbiAgdGVtcGxhdGU6IFwiXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9fZ2VuZXJpY19maWVsZCB3cGNmdG9fZ2VuZXJpY19maWVsZF9pY29ucGlja2VyXFxcIj5cXG5cXG4gICAgICAgICAgICA8d3BjZnRvX2ZpZWxkc19hc2lkZV9iZWZvcmUgOmZpZWxkcz1cXFwiZmllbGRzXFxcIiA6ZmllbGRfbGFiZWw9XFxcImZpZWxkX2xhYmVsXFxcIj48L3dwY2Z0b19maWVsZHNfYXNpZGVfYmVmb3JlPlxcbiAgICAgICAgICAgIFxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0by1maWVsZC1jb250ZW50XFxcIj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvX2dlbmVyaWNfZmllbGRfX2lubmVyXFxcIj5cXG4gICAgXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9fZ2VuZXJpY19maWVsZFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPkljb24gcGlja2VyPC9sYWJlbD5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgcmVmPVxcXCJwaWNrZXJcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cXFwic2VhcmNoXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIEBibHVyPVxcXCJibHVyXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIEBmb2N1cz1cXFwiZm9jdXNcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cXFwidGV4dFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVxcXCJTZWFyY2ggYW4gaWNvblxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgXFxuICAgICAgICAgICAgICAgICAgICA8d3BjZnRvX2NvbG9yIEB3cGNmdG8tZ2V0LXZhbHVlPVxcXCJ2YWx1ZVsnY29sb3InXSA9ICRldmVudFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICA6ZmllbGRzPVxcXCJ7cG9zaXRpb246ICdib3R0b20nfVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICB2LWlmPVxcXCJpbml0ZWRcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgOmZpZWxkX2xhYmVsPVxcXCInSWNvbiBjb2xvcidcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgOmZpZWxkX3ZhbHVlPVxcXCJ2YWx1ZVsnY29sb3InXVxcXCI+XFxuICAgIFxcbiAgICAgICAgICAgICAgICAgICAgPC93cGNmdG9fY29sb3I+XFxuICAgIFxcbiAgICAgICAgICAgICAgICAgICAgPHdwY2Z0b19yYW5nZV9zbGlkZXIgOmZpZWxkcz1cXFwiZmllbGRzXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIHYtaWY9XFxcImluaXRlZFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICA6ZmllbGRfbGFiZWw9XFxcIidJY29uIHNpemUnXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDpmaWVsZF9uYW1lPVxcXCJmaWVsZF9uYW1lXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDpmaWVsZF9kZXNjcmlwdGlvbj1cXFwiJ0ljb24gc2l6ZSBzZXQgaW4gcGl4ZWxzJ1xcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICA6ZmllbGRfaWQ9XFxcImZpZWxkX2lkXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDpmaWVsZF92YWx1ZT1cXFwidmFsdWVbJ3NpemUnXVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICA6ZmllbGRfZGF0YT1cXFwie21pbjoxLG1heDoyMDB9XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDpmaWVsZF9pbnB1dF9hZGRvbj1cXFwie2xhYmVsOidweCd9XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIEB3cGNmdG8tZ2V0LXZhbHVlPVxcXCJ2YWx1ZVsnc2l6ZSddID0gJGV2ZW50XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDwvd3BjZnRvX3JhbmdlX3NsaWRlcj5cXG4gICAgXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICBcXG4gICAgICAgICAgICAgICAgPHRyYW5zaXRpb24gbmFtZT1cXFwiaWNvbi1wcmV2aWV3LWZhZGVcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWlmPVxcXCJmb2N1c09uXFxcIiBjbGFzcz1cXFwicHJldmlldy1jb250YWluZXJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgQGNsaWNrPVxcXCJzZWxlY3QodW5kZWZpbmVkKVxcXCIgQG1vdXNlb3Zlcj1cXFwiaG92ZXJQYW5lbCA9IHRydWVcXFwiIEBtb3VzZW91dD1cXFwiaG92ZXJQYW5lbCA9IGZhbHNlXFxcIiA6Y2xhc3M9XFxcIlsncHJldmlld2VyJywgJ3JvdW5kZWQnLCB7J2N1c3RvbS1zaGFkb3ctc20nOiAhaG92ZXJQYW5lbH0sIHsnY3VzdG9tLXNoYWRvdyc6IGhvdmVyUGFuZWx9IF1cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtZm9yPVxcXCIoaSwgaW5kZXgpIGluIGljb25zRmlsdGVyZWRcXFwiIDprZXk9XFxcImluZGV4XFxcIiBjbGFzcz1cXFwiaWNvbi1wcmV2aWV3XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgQGNsaWNrLnByZXZlbnQuc3RvcD1cXFwic2VsZWN0KGkpXFxcIiA6Y2xhc3M9XFxcIlsnaWNvbi13cmFwcGVyJywncm91bmRlZCcsJ3NoYWRvdy1zbScsIHtzZWxlY3RlZDogaS50aXRsZSA9PSBzZWxlY3RlZH1dXFxcIiA+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgOmNsYXNzPVxcXCJpLnRpdGxlXFxcIiAvPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDwvdHJhbnNpdGlvbj5cXG4gICAgICAgICAgICBcXG4gICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImljb24tcHJldmlldy13cmFwXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbD57eyBwcmV2aWV3TGFiZWwgfX08L2xhYmVsPlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiaWNvbi1wcmV2aWV3LWlubmVyXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cXFwid3BjZnRvX2dlbmVyaWNfZmllbGRfX2ljb25waWNrZXJfX2ljb25cXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgdi1iaW5kOmNsYXNzPVxcXCJ2YWx1ZS5pY29uXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIHYtYmluZDpzdHlsZT1cXFwieyBjb2xvcjogdmFsdWUuY29sb3IsICdmb250LXNpemUnIDogdmFsdWUuc2l6ZSArICdweCd9XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIHYtaWY9XFxcInZhbHVlLmljb24gJiYgdmFsdWUuaWNvbiAhPT0gJydcXFwiPjwvaT4gIFxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHYtZWxzZT4tLTwvc3Bhbj4gIFxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+ICAgICAgICBcXG4gICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICA8L2Rpdj5cXG5cXG4gICAgICAgIDwvZGl2PlxcbiAgXCIsXG4gIG1vdW50ZWQ6IGZ1bmN0aW9uIG1vdW50ZWQoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmZpZWxkX3ZhbHVlID09PSAnc3RyaW5nJyAmJiBXcGNmdG9Jc0pzb25TdHJpbmcodGhpcy5maWVsZF92YWx1ZSkpIHtcbiAgICAgIHRoaXMudmFsdWUgPSBKU09OLnBhcnNlKHRoaXMuZmllbGRfdmFsdWUpO1xuICAgIH0gZWxzZSBpZiAoX3R5cGVvZih0aGlzLmZpZWxkX3ZhbHVlKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmZpZWxkX3ZhbHVlO1xuICAgIH1cblxuICAgIGlmICghdGhpcy52YWx1ZS5pY29uKSB7XG4gICAgICB0aGlzLnZhbHVlID0ge1xuICAgICAgICBpY29uOiAnJyxcbiAgICAgICAgY29sb3I6ICcjMDAwJyxcbiAgICAgICAgc2l6ZTogMTVcbiAgICAgIH07XG4gICAgfVxuXG4gICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMudmFsdWUuaWNvbjtcbiAgICB0aGlzLmluaXRlZCA9IHRydWU7XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBibHVyOiBmdW5jdGlvbiBibHVyKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBfdGhpcy5mb2N1c09uID0gZmFsc2U7XG4gICAgICAgIF90aGlzLnZhbHVlLmljb24gPSAnJztcbiAgICAgIH0sIDEwMCk7XG4gICAgfSxcbiAgICBmb2N1czogZnVuY3Rpb24gZm9jdXMoKSB7XG4gICAgICB0aGlzLmZvY3VzT24gPSB0cnVlO1xuICAgIH0sXG4gICAgc2VsZWN0OiBmdW5jdGlvbiBzZWxlY3QoaWNvbikge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXG4gICAgICBpZiAoaWNvbikge1xuICAgICAgICBpZiAodGhpcy5zZWFyY2ggIT0gdGhpcy5zZWxlY3RlZCkgdGhpcy5iZWZvcmVTZWxlY3QgPSB0aGlzLnNlYXJjaDtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGljb24udGl0bGU7XG4gICAgICAgIHRoaXMuc2VhcmNoID0gaWNvbi50aXRsZTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5mb2N1c09uID0gZmFsc2U7XG4gICAgICB0aGlzLnZhbHVlLmljb24gPSB0aGlzLnNlbGVjdGVkO1xuICAgIH1cbiAgfVxufSwgX2RlZmluZVByb3BlcnR5KF9WdWUkY29tcG9uZW50LCBcImNvbXB1dGVkXCIsIHtcbiAgaWNvbnNGaWx0ZXJlZDogZnVuY3Rpb24gaWNvbnNGaWx0ZXJlZCgpIHtcbiAgICB2YXIgc2VhcmNoID0gdGhpcy5zZWFyY2ggPT0gdGhpcy5zZWxlY3RlZCA/IHRoaXMuYmVmb3JlU2VsZWN0IDogdGhpcy5zZWFyY2g7XG4gICAgcmV0dXJuIHRoaXMuaWNvbnMuZmlsdGVyKGZ1bmN0aW9uIChpKSB7XG4gICAgICByZXR1cm4gaS50aXRsZS5pbmRleE9mKHNlYXJjaCkgIT09IC0xIHx8IGkuc2VhcmNoVGVybXMuc29tZShmdW5jdGlvbiAodCkge1xuICAgICAgICByZXR1cm4gdC5pbmRleE9mKHNlYXJjaCkgIT09IC0xO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn0pLCBfZGVmaW5lUHJvcGVydHkoX1Z1ZSRjb21wb25lbnQsIFwid2F0Y2hcIiwge1xuICB2YWx1ZToge1xuICAgIGRlZXA6IHRydWUsXG4gICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcih2YWx1ZSkge1xuICAgICAgdGhpcy4kZW1pdCgnd3BjZnRvLWdldC12YWx1ZScsIHZhbHVlKTtcbiAgICB9XG4gIH1cbn0pLCBfVnVlJGNvbXBvbmVudCkpOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUEsSUFBSUEsY0FBSjs7QUFFQSxTQUFTQyxlQUFULENBQXlCQyxHQUF6QixFQUE4QkMsR0FBOUIsRUFBbUNDLEtBQW5DLEVBQTBDO0VBQUUsSUFBSUQsR0FBRyxJQUFJRCxHQUFYLEVBQWdCO0lBQUVHLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkosR0FBdEIsRUFBMkJDLEdBQTNCLEVBQWdDO01BQUVDLEtBQUssRUFBRUEsS0FBVDtNQUFnQkcsVUFBVSxFQUFFLElBQTVCO01BQWtDQyxZQUFZLEVBQUUsSUFBaEQ7TUFBc0RDLFFBQVEsRUFBRTtJQUFoRSxDQUFoQztFQUEwRyxDQUE1SCxNQUFrSTtJQUFFUCxHQUFHLENBQUNDLEdBQUQsQ0FBSCxHQUFXQyxLQUFYO0VBQW1COztFQUFDLE9BQU9GLEdBQVA7QUFBYTs7QUFFak4sU0FBU1EsT0FBVCxDQUFpQlIsR0FBakIsRUFBc0I7RUFBRTs7RUFBMkIsT0FBT1EsT0FBTyxHQUFHLGNBQWMsT0FBT0MsTUFBckIsSUFBK0IsWUFBWSxPQUFPQSxNQUFNLENBQUNDLFFBQXpELEdBQW9FLFVBQVVWLEdBQVYsRUFBZTtJQUFFLE9BQU8sT0FBT0EsR0FBZDtFQUFvQixDQUF6RyxHQUE0RyxVQUFVQSxHQUFWLEVBQWU7SUFBRSxPQUFPQSxHQUFHLElBQUksY0FBYyxPQUFPUyxNQUE1QixJQUFzQ1QsR0FBRyxDQUFDVyxXQUFKLEtBQW9CRixNQUExRCxJQUFvRVQsR0FBRyxLQUFLUyxNQUFNLENBQUNHLFNBQW5GLEdBQStGLFFBQS9GLEdBQTBHLE9BQU9aLEdBQXhIO0VBQThILENBQXJRLEVBQXVRUSxPQUFPLENBQUNSLEdBQUQsQ0FBclI7QUFBNlI7O0FBRWhWLElBQUlhLE9BQU8sR0FBR0MsU0FBZDtBQUNBLElBQUlDLEtBQUssR0FBR0MsZ0JBQVo7QUFDQUMsR0FBRyxDQUFDQyxTQUFKLENBQWMsb0JBQWQs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
},{}]},{},[1])
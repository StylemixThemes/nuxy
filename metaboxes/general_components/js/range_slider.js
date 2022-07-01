(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _vueRangeSlider = _interopRequireDefault(require("vue-range-slider"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

Vue.component('wpcfto_range_slider', {
  props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value', 'field_data', 'field_description', 'field_input_addon'],
  data: function data() {
    return {
      value: 0,
      min: 0,
      max: 100,
      step: 1
    };
  },
  components: {
    RangeSlider: _vueRangeSlider["default"]
  },
  template: " \n            <div class=\"wpcfto_generic_field wpcfto_generic_field_range_slider\" v-bind:class=\"field_id\">\n            \n                <wpcfto_fields_aside_before :fields=\"fields\" :field_label=\"field_label\"></wpcfto_fields_aside_before>\n            \n                <div class=\"wpcfto-field-content\">\n                    <div class=\"wpcfto_range_slider\">\n                        <span class=\"wpcfto_range_slider__pin\" v-html=\"value\" v-bind:style=\"rangeStyles()\"></span>\n                        <range-slider\n                        class=\"slider\"\n                        :min=\"min\"\n                        :max=\"max\"\n                        :step=\"step\"\n                        v-model=\"value\">\n                        </range-slider>\n                        <template v-if=\"field_input_addon\">\n                            <input type=\"number\" @input=\"change\" @change=\"change\" v-model=\"value\" :max=\"max\" class=\"wpcfto_range_slider_custom_input\" />\n                            <span v-if=\"field_input_addon.label\" v-html=\"field_input_addon.label\" class=\"wpcfto_field_addon\"></span>\n                        </template>\n                    </div>\n                </div>\n                \n            </div>\n    ",
  mounted: function mounted() {
    this.value = typeof this.field_value === 'string' && WpcftoIsJsonString(this.field_value) ? JSON.parse(this.field_value) : this.field_value;
    this.min = this.field_data.min;
    this.max = this.field_data.max;
    this.step = this.field_data.step;
  },
  methods: {
    rangeStyles: function rangeStyles() {
      var procent = (this.max - this.min) / 100;
      return {
        left: (this.value - this.min) * 100 / (this.max - this.min) + '%'
      };
    },
    change: function change() {
      if (this.value > 200) this.value = 200;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfdnVlUmFuZ2VTbGlkZXIiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsIm9iaiIsIl9fZXNNb2R1bGUiLCJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJ2YWx1ZSIsIm1pbiIsIm1heCIsInN0ZXAiLCJjb21wb25lbnRzIiwiUmFuZ2VTbGlkZXIiLCJ0ZW1wbGF0ZSIsIm1vdW50ZWQiLCJmaWVsZF92YWx1ZSIsIldwY2Z0b0lzSnNvblN0cmluZyIsIkpTT04iLCJwYXJzZSIsImZpZWxkX2RhdGEiLCJtZXRob2RzIiwicmFuZ2VTdHlsZXMiLCJwcm9jZW50IiwibGVmdCIsImNoYW5nZSIsIndhdGNoIiwiZGVlcCIsImhhbmRsZXIiLCIkZW1pdCJdLCJzb3VyY2VzIjpbImZha2VfYTNmMTJjLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX3Z1ZVJhbmdlU2xpZGVyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwidnVlLXJhbmdlLXNsaWRlclwiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IFwiZGVmYXVsdFwiOiBvYmogfTsgfVxuXG5WdWUuY29tcG9uZW50KCd3cGNmdG9fcmFuZ2Vfc2xpZGVyJywge1xuICBwcm9wczogWydmaWVsZHMnLCAnZmllbGRfbGFiZWwnLCAnZmllbGRfbmFtZScsICdmaWVsZF9pZCcsICdmaWVsZF92YWx1ZScsICdmaWVsZF9kYXRhJywgJ2ZpZWxkX2Rlc2NyaXB0aW9uJywgJ2ZpZWxkX2lucHV0X2FkZG9uJ10sXG4gIGRhdGE6IGZ1bmN0aW9uIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiAwLFxuICAgICAgbWluOiAwLFxuICAgICAgbWF4OiAxMDAsXG4gICAgICBzdGVwOiAxXG4gICAgfTtcbiAgfSxcbiAgY29tcG9uZW50czoge1xuICAgIFJhbmdlU2xpZGVyOiBfdnVlUmFuZ2VTbGlkZXJbXCJkZWZhdWx0XCJdXG4gIH0sXG4gIHRlbXBsYXRlOiBcIiBcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9fZ2VuZXJpY19maWVsZCB3cGNmdG9fZ2VuZXJpY19maWVsZF9yYW5nZV9zbGlkZXJcXFwiIHYtYmluZDpjbGFzcz1cXFwiZmllbGRfaWRcXFwiPlxcbiAgICAgICAgICAgIFxcbiAgICAgICAgICAgICAgICA8d3BjZnRvX2ZpZWxkc19hc2lkZV9iZWZvcmUgOmZpZWxkcz1cXFwiZmllbGRzXFxcIiA6ZmllbGRfbGFiZWw9XFxcImZpZWxkX2xhYmVsXFxcIj48L3dwY2Z0b19maWVsZHNfYXNpZGVfYmVmb3JlPlxcbiAgICAgICAgICAgIFxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG8tZmllbGQtY29udGVudFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9fcmFuZ2Vfc2xpZGVyXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwid3BjZnRvX3JhbmdlX3NsaWRlcl9fcGluXFxcIiB2LWh0bWw9XFxcInZhbHVlXFxcIiB2LWJpbmQ6c3R5bGU9XFxcInJhbmdlU3R5bGVzKClcXFwiPjwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8cmFuZ2Utc2xpZGVyXFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XFxcInNsaWRlclxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICA6bWluPVxcXCJtaW5cXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgOm1heD1cXFwibWF4XFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDpzdGVwPVxcXCJzdGVwXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XFxcInZhbHVlXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3JhbmdlLXNsaWRlcj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGVtcGxhdGUgdi1pZj1cXFwiZmllbGRfaW5wdXRfYWRkb25cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwibnVtYmVyXFxcIiBAaW5wdXQ9XFxcImNoYW5nZVxcXCIgQGNoYW5nZT1cXFwiY2hhbmdlXFxcIiB2LW1vZGVsPVxcXCJ2YWx1ZVxcXCIgOm1heD1cXFwibWF4XFxcIiBjbGFzcz1cXFwid3BjZnRvX3JhbmdlX3NsaWRlcl9jdXN0b21faW5wdXRcXFwiIC8+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHYtaWY9XFxcImZpZWxkX2lucHV0X2FkZG9uLmxhYmVsXFxcIiB2LWh0bWw9XFxcImZpZWxkX2lucHV0X2FkZG9uLmxhYmVsXFxcIiBjbGFzcz1cXFwid3BjZnRvX2ZpZWxkX2FkZG9uXFxcIj48L3NwYW4+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgXFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgIFwiLFxuICBtb3VudGVkOiBmdW5jdGlvbiBtb3VudGVkKCkge1xuICAgIHRoaXMudmFsdWUgPSB0eXBlb2YgdGhpcy5maWVsZF92YWx1ZSA9PT0gJ3N0cmluZycgJiYgV3BjZnRvSXNKc29uU3RyaW5nKHRoaXMuZmllbGRfdmFsdWUpID8gSlNPTi5wYXJzZSh0aGlzLmZpZWxkX3ZhbHVlKSA6IHRoaXMuZmllbGRfdmFsdWU7XG4gICAgdGhpcy5taW4gPSB0aGlzLmZpZWxkX2RhdGEubWluO1xuICAgIHRoaXMubWF4ID0gdGhpcy5maWVsZF9kYXRhLm1heDtcbiAgICB0aGlzLnN0ZXAgPSB0aGlzLmZpZWxkX2RhdGEuc3RlcDtcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIHJhbmdlU3R5bGVzOiBmdW5jdGlvbiByYW5nZVN0eWxlcygpIHtcbiAgICAgIHZhciBwcm9jZW50ID0gKHRoaXMubWF4IC0gdGhpcy5taW4pIC8gMTAwO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGVmdDogKHRoaXMudmFsdWUgLSB0aGlzLm1pbikgKiAxMDAgLyAodGhpcy5tYXggLSB0aGlzLm1pbikgKyAnJSdcbiAgICAgIH07XG4gICAgfSxcbiAgICBjaGFuZ2U6IGZ1bmN0aW9uIGNoYW5nZSgpIHtcbiAgICAgIGlmICh0aGlzLnZhbHVlID4gMjAwKSB0aGlzLnZhbHVlID0gMjAwO1xuICAgIH1cbiAgfSxcbiAgd2F0Y2g6IHtcbiAgICB2YWx1ZToge1xuICAgICAgZGVlcDogdHJ1ZSxcbiAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIodmFsdWUpIHtcbiAgICAgICAgdGhpcy4kZW1pdCgnd3BjZnRvLWdldC12YWx1ZScsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUEsSUFBSUEsZUFBZSxHQUFHQyxzQkFBc0IsQ0FBQ0MsT0FBTyxDQUFDLGtCQUFELENBQVIsQ0FBNUM7O0FBRUEsU0FBU0Qsc0JBQVQsQ0FBZ0NFLEdBQWhDLEVBQXFDO0VBQUUsT0FBT0EsR0FBRyxJQUFJQSxHQUFHLENBQUNDLFVBQVgsR0FBd0JELEdBQXhCLEdBQThCO0lBQUUsV0FBV0E7RUFBYixDQUFyQztBQUEwRDs7QUFFakdFLEdBQUcsQ0FBQ0MsU0FBSixDQUFjLHFCQUFkLEVBQXFDO0VBQ25DQyxLQUFLLEVBQUUsQ0FBQyxRQUFELEVBQVcsYUFBWCxFQUEwQixZQUExQixFQUF3QyxVQUF4QyxFQUFvRCxhQUFwRCxFQUFtRSxZQUFuRSxFQUFpRixtQkFBakYsRUFBc0csbUJBQXRHLENBRDRCO0VBRW5DQyxJQUFJLEVBQUUsU0FBU0EsSUFBVCxHQUFnQjtJQUNwQixPQUFPO01BQ0xDLEtBQUssRUFBRSxDQURGO01BRUxDLEdBQUcsRUFBRSxDQUZBO01BR0xDLEdBQUcsRUFBRSxHQUhBO01BSUxDLElBQUksRUFBRTtJQUpELENBQVA7RUFNRCxDQVRrQztFQVVuQ0MsVUFBVSxFQUFFO0lBQ1ZDLFdBQVcsRUFBRWQsZUFBZSxDQUFDLFNBQUQ7RUFEbEIsQ0FWdUI7RUFhbkNlLFFBQVEsRUFBRSxpd0NBYnlCO0VBY25DQyxPQUFPLEVBQUUsU0FBU0EsT0FBVCxHQUFtQjtJQUMxQixLQUFLUCxLQUFMLEdBQWEsT0FBTyxLQUFLUSxXQUFaLEtBQTRCLFFBQTVCLElBQXdDQyxrQkFBa0IsQ0FBQyxLQUFLRCxXQUFOLENBQTFELEdBQStFRSxJQUFJLENBQUNDLEtBQUwsQ0FBVyxLQUFLSCxXQUFoQixDQUEvRSxHQUE4RyxLQUFLQSxXQUFoSTtJQUNBLEtBQUtQLEdBQUwsR0FBVyxLQUFLVyxVQUFMLENBQWdCWCxHQUEzQjtJQUNBLEtBQUtDLEdBQUwsR0FBVyxLQUFLVSxVQUFMLENBQWdCVixHQUEzQjtJQUNBLEtBQUtDLElBQUwsR0FBWSxLQUFLUyxVQUFMLENBQWdCVCxJQUE1QjtFQUNELENBbkJrQztFQW9CbkNVLE9BQU8sRUFBRTtJQUNQQyxXQUFXLEVBQUUsU0FBU0EsV0FBVCxHQUF1QjtNQUNsQyxJQUFJQyxPQUFPLEdBQUcsQ0FBQyxLQUFLYixHQUFMLEdBQVcsS0FBS0QsR0FBakIsSUFBd0IsR0FBdEM7TUFDQSxPQUFPO1FBQ0xlLElBQUksRUFBRSxDQUFDLEtBQUtoQixLQUFMLEdBQWEsS0FBS0MsR0FBbkIsSUFBMEIsR0FBMUIsSUFBaUMsS0FBS0MsR0FBTCxHQUFXLEtBQUtELEdBQWpELElBQXdEO01BRHpELENBQVA7SUFHRCxDQU5NO0lBT1BnQixNQUFNLEVBQUUsU0FBU0EsTUFBVCxHQUFrQjtNQUN4QixJQUFJLEtBQUtqQixLQUFMLEdBQWEsR0FBakIsRUFBc0IsS0FBS0EsS0FBTCxHQUFhLEdBQWI7SUFDdkI7RUFUTSxDQXBCMEI7RUErQm5Da0IsS0FBSyxFQUFFO0lBQ0xsQixLQUFLLEVBQUU7TUFDTG1CLElBQUksRUFBRSxJQUREO01BRUxDLE9BQU8sRUFBRSxTQUFTQSxPQUFULENBQWlCcEIsS0FBakIsRUFBd0I7UUFDL0IsS0FBS3FCLEtBQUwsQ0FBVyxrQkFBWCxFQUErQnJCLEtBQS9CO01BQ0Q7SUFKSTtFQURGO0FBL0I0QixDQUFyQyJ9
},{"vue-range-slider":2}],2:[function(require,module,exports){
/*!
 * vue-range-slider v0.6.0
 * https://github.com/ktsn/vue-range-slider
 *
 * @license
 * Copyright (c) 2016-2018 katashin
 * Released under the MIT license
 * https://github.com/ktsn/vue-range-slider/blob/master/LICENSE
 */
'use strict';

/* global window, document */

var DocumentEventHelper = {
  created: function created() {
    if (typeof document === 'undefined') return;
    forEachListener(this, function (key, listener) {
      on(document, key, listener);
    });
  },
  beforeDestroy: function beforeDestroy() {
    if (typeof document === 'undefined') return;
    forEachListener(this, function (key, listener) {
      off(document, key, listener);
    });
  }
};

var isBrowser = typeof window !== 'undefined';

var hasPassive = isBrowser && function () {
  var supported = false;

  try {
    var desc = {
      get: function get() {
        supported = true;
      }
    };
    var opts = Object.defineProperty({}, 'passive', desc);

    window.addEventListener('test', null, opts);
    window.removeEventListener('test', null, opts);
  } catch (e) {
    supported = false;
  }

  return supported;
}();

function forEachListener(vm, f) {
  var events = vm.$options.events;
  Object.keys(events).forEach(function (key) {
    f(key, function (event) {
      return events[key].call(vm, event);
    });
  });
}

function on(el, name, fn) {
  var options = hasPassive ? { passive: false } : undefined;
  el.addEventListener(name, fn, options);
}

function off(el, name, fn) {
  var options = hasPassive ? { passive: false } : undefined;
  el.removeEventListener(name, fn, options);
}

function relativeMouseOffset(offset, base) {
  var bounds = base.getBoundingClientRect();
  return {
    left: offset.clientX - bounds.left,
    top: offset.clientY - bounds.top
  };
}

function round(value, min, max, step) {
  if (value <= min) {
    return min;
  }

  var roundedMax = Math.floor((max - min) / step) * step + min;
  if (value >= roundedMax) {
    return roundedMax;
  }

  var normalize = (value - min) / step;
  var decimal = Math.floor(normalize);
  var fraction = normalize - decimal;

  if (fraction === 0) return value;

  if (fraction < 0.5) {
    return step * decimal + min;
  } else {
    return step * (decimal + 1) + min;
  }
}

var DragHelper = {
  mixins: [DocumentEventHelper],

  props: {
    disabled: Boolean
  },

  data: function data() {
    return {
      isDrag: false
    };
  },


  events: {
    mousedown: function mousedown(event) {
      return this.dragStart(event, this.offsetByMouse);
    },
    mousemove: function mousemove(event) {
      return this.dragMove(event, this.offsetByMouse);
    },
    mouseup: function mouseup(event) {
      return this.dragEnd(event, this.offsetByMouse);
    },
    touchstart: function touchstart(event) {
      return this.dragStart(event, this.offsetByTouch);
    },
    touchmove: function touchmove(event) {
      return this.dragMove(event, this.offsetByTouch);
    },
    touchend: function touchend(event) {
      return this.dragEnd(event, this.offsetByTouch);
    },
    touchcancel: function touchcancel(event) {
      return this.dragEnd(event, this.offsetByTouch);
    }
  },

  methods: {
    isInTarget: function isInTarget(el) {
      if (!el) return false;

      if (el === this.$el) {
        return true;
      } else {
        return this.isInTarget(el.parentElement);
      }
    },
    offsetByMouse: function offsetByMouse(event) {
      return relativeMouseOffset(event, this.$el);
    },
    offsetByTouch: function offsetByTouch(event) {
      var touch = event.touches.length === 0 ? event.changedTouches[0] : event.touches[0];
      return relativeMouseOffset(touch, this.$el);
    },
    dragStart: function dragStart(event, f) {
      if (this.disabled || event.button !== undefined && event.button !== 0 || !this.isInTarget(event.target)) {
        return;
      }

      event.preventDefault();
      this.isDrag = true;
      this.$emit('dragstart', event, f(event), this.$el);
    },
    dragMove: function dragMove(event, f) {
      if (!this.isDrag) return;
      event.preventDefault();
      this.$emit('drag', event, f(event), this.$el);
    },
    dragEnd: function dragEnd(event, f) {
      if (!this.isDrag) return;
      event.preventDefault();
      this.isDrag = false;
      this.$emit('dragend', event, f(event), this.$el);
    }
  },

  render: function render() {
    return this.$slots.default && this.$slots.default[0];
  }
};

var RangeSlider = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('span', { staticClass: "range-slider", class: { disabled: _vm.disabled } }, [_c('drag-helper', { attrs: { "disabled": _vm.disabled }, on: { "dragstart": _vm.dragStart, "drag": _vm.drag, "dragend": _vm.dragEnd } }, [_c('span', { ref: "inner", staticClass: "range-slider-inner" }, [_c('input', { staticClass: "range-slider-hidden", attrs: { "type": "text", "name": _vm.name, "disabled": _vm.disabled }, domProps: { "value": _vm.actualValue } }), _vm._v(" "), _c('span', { staticClass: "range-slider-rail" }), _vm._v(" "), _c('span', { staticClass: "range-slider-fill", style: { width: _vm.valuePercent + '%' } }), _vm._v(" "), _c('span', { ref: "knob", staticClass: "range-slider-knob", style: { left: _vm.valuePercent + '%' } }, [_vm._t("knob")], 2)])])], 1);
  }, staticRenderFns: [],
  props: {
    name: String,
    value: [String, Number],
    disabled: {
      type: Boolean,
      default: false
    },
    min: {
      type: [String, Number],
      default: 0
    },
    max: {
      type: [String, Number],
      default: 100
    },
    step: {
      type: [String, Number],
      default: 1
    }
  },

  data: function data() {
    return {
      actualValue: null,
      dragStartValue: null
    };
  },
  created: function created() {
    var min = this._min,
        max = this._max;

    var defaultValue = Number(this.value);

    if (this.value == null || isNaN(defaultValue)) {
      if (min > max) {
        defaultValue = min;
      } else {
        defaultValue = (min + max) / 2;
      }
    }

    this.actualValue = this.round(defaultValue);
  },


  computed: {
    _min: function _min() {
      return Number(this.min);
    },
    _max: function _max() {
      return Number(this.max);
    },
    _step: function _step() {
      return Number(this.step);
    },
    valuePercent: function valuePercent() {
      return (this.actualValue - this._min) / (this._max - this._min) * 100;
    }
  },

  watch: {
    value: function value(newValue) {
      var value = Number(newValue);
      if (newValue != null && !isNaN(value)) {
        this.actualValue = this.round(value);
      }
    },
    min: function min() {
      this.actualValue = this.round(this.actualValue);
    },
    max: function max() {
      this.actualValue = this.round(this.actualValue);
    }
  },

  methods: {
    dragStart: function dragStart(event, offset) {
      this.dragStartValue = this.actualValue;
      if (event.target === this.$refs.knob) {
        return;
      }
      // If the click is out of knob, move it to mouse position
      this.drag(event, offset);
    },
    drag: function drag(event, offset) {
      var offsetWidth = this.$refs.inner.offsetWidth;

      this.actualValue = this.round(this.valueFromBounds(offset.left, offsetWidth));
      this.emitInput(this.actualValue);
    },
    dragEnd: function dragEnd(event, offset) {
      var offsetWidth = this.$refs.inner.offsetWidth;

      this.actualValue = this.round(this.valueFromBounds(offset.left, offsetWidth));

      if (this.dragStartValue !== this.actualValue) {
        this.emitChange(this.actualValue);
      }
    },
    emitInput: function emitInput(value) {
      this.$emit('input', value);
    },
    emitChange: function emitChange(value) {
      this.$emit('change', value);
    },
    valueFromBounds: function valueFromBounds(point, width) {
      return point / width * (this._max - this._min) + this._min;
    },
    round: function round$$1(value) {
      return round(value, this._min, this._max, this._step);
    }
  },

  components: {
    DragHelper: DragHelper
  }
};

module.exports = RangeSlider;

},{}]},{},[1])
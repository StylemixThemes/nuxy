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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfMzg5MmI0NDUuanMiXSwibmFtZXMiOlsiX3Z1ZVJhbmdlU2xpZGVyIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJvYmoiLCJfX2VzTW9kdWxlIiwiVnVlIiwiY29tcG9uZW50IiwicHJvcHMiLCJkYXRhIiwidmFsdWUiLCJtaW4iLCJtYXgiLCJzdGVwIiwiY29tcG9uZW50cyIsIlJhbmdlU2xpZGVyIiwidGVtcGxhdGUiLCJtb3VudGVkIiwiZmllbGRfdmFsdWUiLCJXcGNmdG9Jc0pzb25TdHJpbmciLCJKU09OIiwicGFyc2UiLCJmaWVsZF9kYXRhIiwibWV0aG9kcyIsInJhbmdlU3R5bGVzIiwicHJvY2VudCIsImxlZnQiLCJjaGFuZ2UiLCJ3YXRjaCIsImRlZXAiLCJoYW5kbGVyIiwiJGVtaXQiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBLElBQUlBLGVBQWUsR0FBR0Msc0JBQXNCLENBQUNDLE9BQU8sQ0FBQyxrQkFBRCxDQUFSLENBQTVDOztBQUVBLFNBQVNELHNCQUFULENBQWdDRSxHQUFoQyxFQUFxQztBQUFFLFNBQU9BLEdBQUcsSUFBSUEsR0FBRyxDQUFDQyxVQUFYLEdBQXdCRCxHQUF4QixHQUE4QjtBQUFFLGVBQVdBO0FBQWIsR0FBckM7QUFBMEQ7O0FBRWpHRSxHQUFHLENBQUNDLFNBQUosQ0FBYyxxQkFBZCxFQUFxQztBQUNuQ0MsRUFBQUEsS0FBSyxFQUFFLENBQUMsUUFBRCxFQUFXLGFBQVgsRUFBMEIsWUFBMUIsRUFBd0MsVUFBeEMsRUFBb0QsYUFBcEQsRUFBbUUsWUFBbkUsRUFBaUYsbUJBQWpGLEVBQXNHLG1CQUF0RyxDQUQ0QjtBQUVuQ0MsRUFBQUEsSUFBSSxFQUFFLFNBQVNBLElBQVQsR0FBZ0I7QUFDcEIsV0FBTztBQUNMQyxNQUFBQSxLQUFLLEVBQUUsQ0FERjtBQUVMQyxNQUFBQSxHQUFHLEVBQUUsQ0FGQTtBQUdMQyxNQUFBQSxHQUFHLEVBQUUsR0FIQTtBQUlMQyxNQUFBQSxJQUFJLEVBQUU7QUFKRCxLQUFQO0FBTUQsR0FUa0M7QUFVbkNDLEVBQUFBLFVBQVUsRUFBRTtBQUNWQyxJQUFBQSxXQUFXLEVBQUVkLGVBQWUsQ0FBQyxTQUFEO0FBRGxCLEdBVnVCO0FBYW5DZSxFQUFBQSxRQUFRLEVBQUUsaXdDQWJ5QjtBQWNuQ0MsRUFBQUEsT0FBTyxFQUFFLFNBQVNBLE9BQVQsR0FBbUI7QUFDMUIsU0FBS1AsS0FBTCxHQUFhLE9BQU8sS0FBS1EsV0FBWixLQUE0QixRQUE1QixJQUF3Q0Msa0JBQWtCLENBQUMsS0FBS0QsV0FBTixDQUExRCxHQUErRUUsSUFBSSxDQUFDQyxLQUFMLENBQVcsS0FBS0gsV0FBaEIsQ0FBL0UsR0FBOEcsS0FBS0EsV0FBaEk7QUFDQSxTQUFLUCxHQUFMLEdBQVcsS0FBS1csVUFBTCxDQUFnQlgsR0FBM0I7QUFDQSxTQUFLQyxHQUFMLEdBQVcsS0FBS1UsVUFBTCxDQUFnQlYsR0FBM0I7QUFDQSxTQUFLQyxJQUFMLEdBQVksS0FBS1MsVUFBTCxDQUFnQlQsSUFBNUI7QUFDRCxHQW5Ca0M7QUFvQm5DVSxFQUFBQSxPQUFPLEVBQUU7QUFDUEMsSUFBQUEsV0FBVyxFQUFFLFNBQVNBLFdBQVQsR0FBdUI7QUFDbEMsVUFBSUMsT0FBTyxHQUFHLENBQUMsS0FBS2IsR0FBTCxHQUFXLEtBQUtELEdBQWpCLElBQXdCLEdBQXRDO0FBQ0EsYUFBTztBQUNMZSxRQUFBQSxJQUFJLEVBQUUsQ0FBQyxLQUFLaEIsS0FBTCxHQUFhLEtBQUtDLEdBQW5CLElBQTBCLEdBQTFCLElBQWlDLEtBQUtDLEdBQUwsR0FBVyxLQUFLRCxHQUFqRCxJQUF3RDtBQUR6RCxPQUFQO0FBR0QsS0FOTTtBQU9QZ0IsSUFBQUEsTUFBTSxFQUFFLFNBQVNBLE1BQVQsR0FBa0I7QUFDeEIsVUFBSSxLQUFLakIsS0FBTCxHQUFhLEdBQWpCLEVBQXNCLEtBQUtBLEtBQUwsR0FBYSxHQUFiO0FBQ3ZCO0FBVE0sR0FwQjBCO0FBK0JuQ2tCLEVBQUFBLEtBQUssRUFBRTtBQUNMbEIsSUFBQUEsS0FBSyxFQUFFO0FBQ0xtQixNQUFBQSxJQUFJLEVBQUUsSUFERDtBQUVMQyxNQUFBQSxPQUFPLEVBQUUsU0FBU0EsT0FBVCxDQUFpQnBCLEtBQWpCLEVBQXdCO0FBQy9CLGFBQUtxQixLQUFMLENBQVcsa0JBQVgsRUFBK0JyQixLQUEvQjtBQUNEO0FBSkk7QUFERjtBQS9CNEIsQ0FBckMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIF92dWVSYW5nZVNsaWRlciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcInZ1ZS1yYW5nZS1zbGlkZXJcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH1cblxuVnVlLmNvbXBvbmVudCgnd3BjZnRvX3JhbmdlX3NsaWRlcicsIHtcbiAgcHJvcHM6IFsnZmllbGRzJywgJ2ZpZWxkX2xhYmVsJywgJ2ZpZWxkX25hbWUnLCAnZmllbGRfaWQnLCAnZmllbGRfdmFsdWUnLCAnZmllbGRfZGF0YScsICdmaWVsZF9kZXNjcmlwdGlvbicsICdmaWVsZF9pbnB1dF9hZGRvbiddLFxuICBkYXRhOiBmdW5jdGlvbiBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogMCxcbiAgICAgIG1pbjogMCxcbiAgICAgIG1heDogMTAwLFxuICAgICAgc3RlcDogMVxuICAgIH07XG4gIH0sXG4gIGNvbXBvbmVudHM6IHtcbiAgICBSYW5nZVNsaWRlcjogX3Z1ZVJhbmdlU2xpZGVyW1wiZGVmYXVsdFwiXVxuICB9LFxuICB0ZW1wbGF0ZTogXCIgXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvX2dlbmVyaWNfZmllbGQgd3BjZnRvX2dlbmVyaWNfZmllbGRfcmFuZ2Vfc2xpZGVyXFxcIiB2LWJpbmQ6Y2xhc3M9XFxcImZpZWxkX2lkXFxcIj5cXG4gICAgICAgICAgICBcXG4gICAgICAgICAgICAgICAgPHdwY2Z0b19maWVsZHNfYXNpZGVfYmVmb3JlIDpmaWVsZHM9XFxcImZpZWxkc1xcXCIgOmZpZWxkX2xhYmVsPVxcXCJmaWVsZF9sYWJlbFxcXCI+PC93cGNmdG9fZmllbGRzX2FzaWRlX2JlZm9yZT5cXG4gICAgICAgICAgICBcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvLWZpZWxkLWNvbnRlbnRcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvX3JhbmdlX3NsaWRlclxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIndwY2Z0b19yYW5nZV9zbGlkZXJfX3BpblxcXCIgdi1odG1sPVxcXCJ2YWx1ZVxcXCIgdi1iaW5kOnN0eWxlPVxcXCJyYW5nZVN0eWxlcygpXFxcIj48L3NwYW4+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHJhbmdlLXNsaWRlclxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJzbGlkZXJcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgOm1pbj1cXFwibWluXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDptYXg9XFxcIm1heFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICA6c3RlcD1cXFwic3RlcFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVxcXCJ2YWx1ZVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9yYW5nZS1zbGlkZXI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtaWY9XFxcImZpZWxkX2lucHV0X2FkZG9uXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcIm51bWJlclxcXCIgQGlucHV0PVxcXCJjaGFuZ2VcXFwiIEBjaGFuZ2U9XFxcImNoYW5nZVxcXCIgdi1tb2RlbD1cXFwidmFsdWVcXFwiIDptYXg9XFxcIm1heFxcXCIgY2xhc3M9XFxcIndwY2Z0b19yYW5nZV9zbGlkZXJfY3VzdG9tX2lucHV0XFxcIiAvPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiB2LWlmPVxcXCJmaWVsZF9pbnB1dF9hZGRvbi5sYWJlbFxcXCIgdi1odG1sPVxcXCJmaWVsZF9pbnB1dF9hZGRvbi5sYWJlbFxcXCIgY2xhc3M9XFxcIndwY2Z0b19maWVsZF9hZGRvblxcXCI+PC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIFxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICBcIixcbiAgbW91bnRlZDogZnVuY3Rpb24gbW91bnRlZCgpIHtcbiAgICB0aGlzLnZhbHVlID0gdHlwZW9mIHRoaXMuZmllbGRfdmFsdWUgPT09ICdzdHJpbmcnICYmIFdwY2Z0b0lzSnNvblN0cmluZyh0aGlzLmZpZWxkX3ZhbHVlKSA/IEpTT04ucGFyc2UodGhpcy5maWVsZF92YWx1ZSkgOiB0aGlzLmZpZWxkX3ZhbHVlO1xuICAgIHRoaXMubWluID0gdGhpcy5maWVsZF9kYXRhLm1pbjtcbiAgICB0aGlzLm1heCA9IHRoaXMuZmllbGRfZGF0YS5tYXg7XG4gICAgdGhpcy5zdGVwID0gdGhpcy5maWVsZF9kYXRhLnN0ZXA7XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICByYW5nZVN0eWxlczogZnVuY3Rpb24gcmFuZ2VTdHlsZXMoKSB7XG4gICAgICB2YXIgcHJvY2VudCA9ICh0aGlzLm1heCAtIHRoaXMubWluKSAvIDEwMDtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxlZnQ6ICh0aGlzLnZhbHVlIC0gdGhpcy5taW4pICogMTAwIC8gKHRoaXMubWF4IC0gdGhpcy5taW4pICsgJyUnXG4gICAgICB9O1xuICAgIH0sXG4gICAgY2hhbmdlOiBmdW5jdGlvbiBjaGFuZ2UoKSB7XG4gICAgICBpZiAodGhpcy52YWx1ZSA+IDIwMCkgdGhpcy52YWx1ZSA9IDIwMDtcbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgdmFsdWU6IHtcbiAgICAgIGRlZXA6IHRydWUsXG4gICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ3dwY2Z0by1nZXQtdmFsdWUnLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59KTsiXX0=
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
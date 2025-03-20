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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfdnVlUmFuZ2VTbGlkZXIiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsIm9iaiIsIl9fZXNNb2R1bGUiLCJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJ2YWx1ZSIsIm1pbiIsIm1heCIsInN0ZXAiLCJjb21wb25lbnRzIiwiUmFuZ2VTbGlkZXIiLCJ0ZW1wbGF0ZSIsIm1vdW50ZWQiLCJmaWVsZF92YWx1ZSIsIldwY2Z0b0lzSnNvblN0cmluZyIsIkpTT04iLCJwYXJzZSIsImZpZWxkX2RhdGEiLCJtZXRob2RzIiwicmFuZ2VTdHlsZXMiLCJwcm9jZW50IiwibGVmdCIsImNoYW5nZSIsIndhdGNoIiwiZGVlcCIsImhhbmRsZXIiLCIkZW1pdCJdLCJzb3VyY2VzIjpbImZha2VfMTg0NzdjYS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIF92dWVSYW5nZVNsaWRlciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcInZ1ZS1yYW5nZS1zbGlkZXJcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH1cblxuVnVlLmNvbXBvbmVudCgnd3BjZnRvX3JhbmdlX3NsaWRlcicsIHtcbiAgcHJvcHM6IFsnZmllbGRzJywgJ2ZpZWxkX2xhYmVsJywgJ2ZpZWxkX25hbWUnLCAnZmllbGRfaWQnLCAnZmllbGRfdmFsdWUnLCAnZmllbGRfZGF0YScsICdmaWVsZF9kZXNjcmlwdGlvbicsICdmaWVsZF9pbnB1dF9hZGRvbiddLFxuICBkYXRhOiBmdW5jdGlvbiBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogMCxcbiAgICAgIG1pbjogMCxcbiAgICAgIG1heDogMTAwLFxuICAgICAgc3RlcDogMVxuICAgIH07XG4gIH0sXG4gIGNvbXBvbmVudHM6IHtcbiAgICBSYW5nZVNsaWRlcjogX3Z1ZVJhbmdlU2xpZGVyW1wiZGVmYXVsdFwiXVxuICB9LFxuICB0ZW1wbGF0ZTogXCIgXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvX2dlbmVyaWNfZmllbGQgd3BjZnRvX2dlbmVyaWNfZmllbGRfcmFuZ2Vfc2xpZGVyXFxcIiB2LWJpbmQ6Y2xhc3M9XFxcImZpZWxkX2lkXFxcIj5cXG4gICAgICAgICAgICBcXG4gICAgICAgICAgICAgICAgPHdwY2Z0b19maWVsZHNfYXNpZGVfYmVmb3JlIDpmaWVsZHM9XFxcImZpZWxkc1xcXCIgOmZpZWxkX2xhYmVsPVxcXCJmaWVsZF9sYWJlbFxcXCI+PC93cGNmdG9fZmllbGRzX2FzaWRlX2JlZm9yZT5cXG4gICAgICAgICAgICBcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvLWZpZWxkLWNvbnRlbnRcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvX3JhbmdlX3NsaWRlclxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIndwY2Z0b19yYW5nZV9zbGlkZXJfX3BpblxcXCIgdi1odG1sPVxcXCJ2YWx1ZVxcXCIgdi1iaW5kOnN0eWxlPVxcXCJyYW5nZVN0eWxlcygpXFxcIj48L3NwYW4+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHJhbmdlLXNsaWRlclxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJzbGlkZXJcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgOm1pbj1cXFwibWluXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDptYXg9XFxcIm1heFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICA6c3RlcD1cXFwic3RlcFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVxcXCJ2YWx1ZVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9yYW5nZS1zbGlkZXI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtaWY9XFxcImZpZWxkX2lucHV0X2FkZG9uXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcIm51bWJlclxcXCIgQGlucHV0PVxcXCJjaGFuZ2VcXFwiIEBjaGFuZ2U9XFxcImNoYW5nZVxcXCIgdi1tb2RlbD1cXFwidmFsdWVcXFwiIDptYXg9XFxcIm1heFxcXCIgY2xhc3M9XFxcIndwY2Z0b19yYW5nZV9zbGlkZXJfY3VzdG9tX2lucHV0XFxcIiAvPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiB2LWlmPVxcXCJmaWVsZF9pbnB1dF9hZGRvbi5sYWJlbFxcXCIgdi1odG1sPVxcXCJmaWVsZF9pbnB1dF9hZGRvbi5sYWJlbFxcXCIgY2xhc3M9XFxcIndwY2Z0b19maWVsZF9hZGRvblxcXCI+PC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIFxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICBcIixcbiAgbW91bnRlZDogZnVuY3Rpb24gbW91bnRlZCgpIHtcbiAgICB0aGlzLnZhbHVlID0gdHlwZW9mIHRoaXMuZmllbGRfdmFsdWUgPT09ICdzdHJpbmcnICYmIFdwY2Z0b0lzSnNvblN0cmluZyh0aGlzLmZpZWxkX3ZhbHVlKSA/IEpTT04ucGFyc2UodGhpcy5maWVsZF92YWx1ZSkgOiB0aGlzLmZpZWxkX3ZhbHVlO1xuICAgIHRoaXMubWluID0gdGhpcy5maWVsZF9kYXRhLm1pbjtcbiAgICB0aGlzLm1heCA9IHRoaXMuZmllbGRfZGF0YS5tYXg7XG4gICAgdGhpcy5zdGVwID0gdGhpcy5maWVsZF9kYXRhLnN0ZXA7XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICByYW5nZVN0eWxlczogZnVuY3Rpb24gcmFuZ2VTdHlsZXMoKSB7XG4gICAgICB2YXIgcHJvY2VudCA9ICh0aGlzLm1heCAtIHRoaXMubWluKSAvIDEwMDtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxlZnQ6ICh0aGlzLnZhbHVlIC0gdGhpcy5taW4pICogMTAwIC8gKHRoaXMubWF4IC0gdGhpcy5taW4pICsgJyUnXG4gICAgICB9O1xuICAgIH0sXG4gICAgY2hhbmdlOiBmdW5jdGlvbiBjaGFuZ2UoKSB7XG4gICAgICBpZiAodGhpcy52YWx1ZSA+IDIwMCkgdGhpcy52YWx1ZSA9IDIwMDtcbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgdmFsdWU6IHtcbiAgICAgIGRlZXA6IHRydWUsXG4gICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ3dwY2Z0by1nZXQtdmFsdWUnLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59KTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBLElBQUlBLGVBQWUsR0FBR0Msc0JBQXNCLENBQUNDLE9BQU8sQ0FBQyxrQkFBRCxDQUFSLENBQTVDOztBQUVBLFNBQVNELHNCQUFULENBQWdDRSxHQUFoQyxFQUFxQztFQUFFLE9BQU9BLEdBQUcsSUFBSUEsR0FBRyxDQUFDQyxVQUFYLEdBQXdCRCxHQUF4QixHQUE4QjtJQUFFLFdBQVdBO0VBQWIsQ0FBckM7QUFBMEQ7O0FBRWpHRSxHQUFHLENBQUNDLFNBQUosQ0FBYyxxQkFBZCxFQUFxQztFQUNuQ0MsS0FBSyxFQUFFLENBQUMsUUFBRCxFQUFXLGFBQVgsRUFBMEIsWUFBMUIsRUFBd0MsVUFBeEMsRUFBb0QsYUFBcEQsRUFBbUUsWUFBbkUsRUFBaUYsbUJBQWpGLEVBQXNHLG1CQUF0RyxDQUQ0QjtFQUVuQ0MsSUFBSSxFQUFFLFNBQVNBLElBQVQsR0FBZ0I7SUFDcEIsT0FBTztNQUNMQyxLQUFLLEVBQUUsQ0FERjtNQUVMQyxHQUFHLEVBQUUsQ0FGQTtNQUdMQyxHQUFHLEVBQUUsR0FIQTtNQUlMQyxJQUFJLEVBQUU7SUFKRCxDQUFQO0VBTUQsQ0FUa0M7RUFVbkNDLFVBQVUsRUFBRTtJQUNWQyxXQUFXLEVBQUVkLGVBQWUsQ0FBQyxTQUFEO0VBRGxCLENBVnVCO0VBYW5DZSxRQUFRLEVBQUUsaXdDQWJ5QjtFQWNuQ0MsT0FBTyxFQUFFLFNBQVNBLE9BQVQsR0FBbUI7SUFDMUIsS0FBS1AsS0FBTCxHQUFhLE9BQU8sS0FBS1EsV0FBWixLQUE0QixRQUE1QixJQUF3Q0Msa0JBQWtCLENBQUMsS0FBS0QsV0FBTixDQUExRCxHQUErRUUsSUFBSSxDQUFDQyxLQUFMLENBQVcsS0FBS0gsV0FBaEIsQ0FBL0UsR0FBOEcsS0FBS0EsV0FBaEk7SUFDQSxLQUFLUCxHQUFMLEdBQVcsS0FBS1csVUFBTCxDQUFnQlgsR0FBM0I7SUFDQSxLQUFLQyxHQUFMLEdBQVcsS0FBS1UsVUFBTCxDQUFnQlYsR0FBM0I7SUFDQSxLQUFLQyxJQUFMLEdBQVksS0FBS1MsVUFBTCxDQUFnQlQsSUFBNUI7RUFDRCxDQW5Ca0M7RUFvQm5DVSxPQUFPLEVBQUU7SUFDUEMsV0FBVyxFQUFFLFNBQVNBLFdBQVQsR0FBdUI7TUFDbEMsSUFBSUMsT0FBTyxHQUFHLENBQUMsS0FBS2IsR0FBTCxHQUFXLEtBQUtELEdBQWpCLElBQXdCLEdBQXRDO01BQ0EsT0FBTztRQUNMZSxJQUFJLEVBQUUsQ0FBQyxLQUFLaEIsS0FBTCxHQUFhLEtBQUtDLEdBQW5CLElBQTBCLEdBQTFCLElBQWlDLEtBQUtDLEdBQUwsR0FBVyxLQUFLRCxHQUFqRCxJQUF3RDtNQUR6RCxDQUFQO0lBR0QsQ0FOTTtJQU9QZ0IsTUFBTSxFQUFFLFNBQVNBLE1BQVQsR0FBa0I7TUFDeEIsSUFBSSxLQUFLakIsS0FBTCxHQUFhLEdBQWpCLEVBQXNCLEtBQUtBLEtBQUwsR0FBYSxHQUFiO0lBQ3ZCO0VBVE0sQ0FwQjBCO0VBK0JuQ2tCLEtBQUssRUFBRTtJQUNMbEIsS0FBSyxFQUFFO01BQ0xtQixJQUFJLEVBQUUsSUFERDtNQUVMQyxPQUFPLEVBQUUsU0FBU0EsT0FBVCxDQUFpQnBCLEtBQWpCLEVBQXdCO1FBQy9CLEtBQUtxQixLQUFMLENBQVcsa0JBQVgsRUFBK0JyQixLQUEvQjtNQUNEO0lBSkk7RUFERjtBQS9CNEIsQ0FBckMifQ==
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
  var options = hasPassive ? {
    passive: false
  } : undefined;
  el.addEventListener(name, fn, options);
}

function off(el, name, fn) {
  var options = hasPassive ? {
    passive: false
  } : undefined;
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
var RangeSlider = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('span', {
      staticClass: "range-slider",
      class: {
        disabled: _vm.disabled
      }
    }, [_c('drag-helper', {
      attrs: {
        "disabled": _vm.disabled
      },
      on: {
        "dragstart": _vm.dragStart,
        "drag": _vm.drag,
        "dragend": _vm.dragEnd
      }
    }, [_c('span', {
      ref: "inner",
      staticClass: "range-slider-inner"
    }, [_c('input', {
      staticClass: "range-slider-hidden",
      attrs: {
        "type": "text",
        "name": _vm.name,
        "disabled": _vm.disabled
      },
      domProps: {
        "value": _vm.actualValue
      }
    }), _vm._v(" "), _c('span', {
      staticClass: "range-slider-rail"
    }), _vm._v(" "), _c('span', {
      staticClass: "range-slider-fill",
      style: {
        width: _vm.valuePercent + '%'
      }
    }), _vm._v(" "), _c('span', {
      ref: "knob",
      staticClass: "range-slider-knob",
      style: {
        left: _vm.valuePercent + '%'
      }
    }, [_vm._t("knob")], 2)])])], 1);
  },
  staticRenderFns: [],
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
      } // If the click is out of knob, move it to mouse position


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJEb2N1bWVudEV2ZW50SGVscGVyIiwiY3JlYXRlZCIsImRvY3VtZW50IiwiZm9yRWFjaExpc3RlbmVyIiwia2V5IiwibGlzdGVuZXIiLCJvbiIsImJlZm9yZURlc3Ryb3kiLCJvZmYiLCJpc0Jyb3dzZXIiLCJ3aW5kb3ciLCJoYXNQYXNzaXZlIiwic3VwcG9ydGVkIiwiZGVzYyIsImdldCIsIm9wdHMiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZSIsInZtIiwiZiIsImV2ZW50cyIsIiRvcHRpb25zIiwia2V5cyIsImZvckVhY2giLCJldmVudCIsImNhbGwiLCJlbCIsIm5hbWUiLCJmbiIsIm9wdGlvbnMiLCJwYXNzaXZlIiwidW5kZWZpbmVkIiwicmVsYXRpdmVNb3VzZU9mZnNldCIsIm9mZnNldCIsImJhc2UiLCJib3VuZHMiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJsZWZ0IiwiY2xpZW50WCIsInRvcCIsImNsaWVudFkiLCJyb3VuZCIsInZhbHVlIiwibWluIiwibWF4Iiwic3RlcCIsInJvdW5kZWRNYXgiLCJNYXRoIiwiZmxvb3IiLCJub3JtYWxpemUiLCJkZWNpbWFsIiwiZnJhY3Rpb24iLCJEcmFnSGVscGVyIiwibWl4aW5zIiwicHJvcHMiLCJkaXNhYmxlZCIsIkJvb2xlYW4iLCJkYXRhIiwiaXNEcmFnIiwibW91c2Vkb3duIiwiZHJhZ1N0YXJ0Iiwib2Zmc2V0QnlNb3VzZSIsIm1vdXNlbW92ZSIsImRyYWdNb3ZlIiwibW91c2V1cCIsImRyYWdFbmQiLCJ0b3VjaHN0YXJ0Iiwib2Zmc2V0QnlUb3VjaCIsInRvdWNobW92ZSIsInRvdWNoZW5kIiwidG91Y2hjYW5jZWwiLCJtZXRob2RzIiwiaXNJblRhcmdldCIsIiRlbCIsInBhcmVudEVsZW1lbnQiLCJ0b3VjaCIsInRvdWNoZXMiLCJsZW5ndGgiLCJjaGFuZ2VkVG91Y2hlcyIsImJ1dHRvbiIsInRhcmdldCIsInByZXZlbnREZWZhdWx0IiwiJGVtaXQiLCJyZW5kZXIiLCIkc2xvdHMiLCJkZWZhdWx0IiwiUmFuZ2VTbGlkZXIiLCJfdm0iLCJfaCIsIiRjcmVhdGVFbGVtZW50IiwiX2MiLCJfc2VsZiIsInN0YXRpY0NsYXNzIiwiY2xhc3MiLCJhdHRycyIsImRyYWciLCJyZWYiLCJkb21Qcm9wcyIsImFjdHVhbFZhbHVlIiwiX3YiLCJzdHlsZSIsIndpZHRoIiwidmFsdWVQZXJjZW50IiwiX3QiLCJzdGF0aWNSZW5kZXJGbnMiLCJTdHJpbmciLCJOdW1iZXIiLCJ0eXBlIiwiZHJhZ1N0YXJ0VmFsdWUiLCJfbWluIiwiX21heCIsImRlZmF1bHRWYWx1ZSIsImlzTmFOIiwiY29tcHV0ZWQiLCJfc3RlcCIsIndhdGNoIiwibmV3VmFsdWUiLCIkcmVmcyIsImtub2IiLCJvZmZzZXRXaWR0aCIsImlubmVyIiwidmFsdWVGcm9tQm91bmRzIiwiZW1pdElucHV0IiwiZW1pdENoYW5nZSIsInBvaW50Iiwicm91bmQkJDEiLCJjb21wb25lbnRzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbInZ1ZS1yYW5nZS1zbGlkZXIuY2pzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogdnVlLXJhbmdlLXNsaWRlciB2MC42LjBcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9rdHNuL3Z1ZS1yYW5nZS1zbGlkZXJcbiAqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTgga2F0YXNoaW5cbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICogaHR0cHM6Ly9naXRodWIuY29tL2t0c24vdnVlLXJhbmdlLXNsaWRlci9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cbid1c2Ugc3RyaWN0JztcblxuLyogZ2xvYmFsIHdpbmRvdywgZG9jdW1lbnQgKi9cblxudmFyIERvY3VtZW50RXZlbnRIZWxwZXIgPSB7XG4gIGNyZWF0ZWQ6IGZ1bmN0aW9uIGNyZWF0ZWQoKSB7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcbiAgICBmb3JFYWNoTGlzdGVuZXIodGhpcywgZnVuY3Rpb24gKGtleSwgbGlzdGVuZXIpIHtcbiAgICAgIG9uKGRvY3VtZW50LCBrZXksIGxpc3RlbmVyKTtcbiAgICB9KTtcbiAgfSxcbiAgYmVmb3JlRGVzdHJveTogZnVuY3Rpb24gYmVmb3JlRGVzdHJveSgpIHtcbiAgICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuICAgIGZvckVhY2hMaXN0ZW5lcih0aGlzLCBmdW5jdGlvbiAoa2V5LCBsaXN0ZW5lcikge1xuICAgICAgb2ZmKGRvY3VtZW50LCBrZXksIGxpc3RlbmVyKTtcbiAgICB9KTtcbiAgfVxufTtcblxudmFyIGlzQnJvd3NlciA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnO1xuXG52YXIgaGFzUGFzc2l2ZSA9IGlzQnJvd3NlciAmJiBmdW5jdGlvbiAoKSB7XG4gIHZhciBzdXBwb3J0ZWQgPSBmYWxzZTtcblxuICB0cnkge1xuICAgIHZhciBkZXNjID0ge1xuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgIHN1cHBvcnRlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgb3B0cyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ3Bhc3NpdmUnLCBkZXNjKTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0ZXN0JywgbnVsbCwgb3B0cyk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBudWxsLCBvcHRzKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHN1cHBvcnRlZCA9IGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHN1cHBvcnRlZDtcbn0oKTtcblxuZnVuY3Rpb24gZm9yRWFjaExpc3RlbmVyKHZtLCBmKSB7XG4gIHZhciBldmVudHMgPSB2bS4kb3B0aW9ucy5ldmVudHM7XG4gIE9iamVjdC5rZXlzKGV2ZW50cykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgZihrZXksIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgcmV0dXJuIGV2ZW50c1trZXldLmNhbGwodm0sIGV2ZW50KTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG9uKGVsLCBuYW1lLCBmbikge1xuICB2YXIgb3B0aW9ucyA9IGhhc1Bhc3NpdmUgPyB7IHBhc3NpdmU6IGZhbHNlIH0gOiB1bmRlZmluZWQ7XG4gIGVsLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgZm4sIG9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiBvZmYoZWwsIG5hbWUsIGZuKSB7XG4gIHZhciBvcHRpb25zID0gaGFzUGFzc2l2ZSA/IHsgcGFzc2l2ZTogZmFsc2UgfSA6IHVuZGVmaW5lZDtcbiAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBmbiwgb3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbGF0aXZlTW91c2VPZmZzZXQob2Zmc2V0LCBiYXNlKSB7XG4gIHZhciBib3VuZHMgPSBiYXNlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICByZXR1cm4ge1xuICAgIGxlZnQ6IG9mZnNldC5jbGllbnRYIC0gYm91bmRzLmxlZnQsXG4gICAgdG9wOiBvZmZzZXQuY2xpZW50WSAtIGJvdW5kcy50b3BcbiAgfTtcbn1cblxuZnVuY3Rpb24gcm91bmQodmFsdWUsIG1pbiwgbWF4LCBzdGVwKSB7XG4gIGlmICh2YWx1ZSA8PSBtaW4pIHtcbiAgICByZXR1cm4gbWluO1xuICB9XG5cbiAgdmFyIHJvdW5kZWRNYXggPSBNYXRoLmZsb29yKChtYXggLSBtaW4pIC8gc3RlcCkgKiBzdGVwICsgbWluO1xuICBpZiAodmFsdWUgPj0gcm91bmRlZE1heCkge1xuICAgIHJldHVybiByb3VuZGVkTWF4O1xuICB9XG5cbiAgdmFyIG5vcm1hbGl6ZSA9ICh2YWx1ZSAtIG1pbikgLyBzdGVwO1xuICB2YXIgZGVjaW1hbCA9IE1hdGguZmxvb3Iobm9ybWFsaXplKTtcbiAgdmFyIGZyYWN0aW9uID0gbm9ybWFsaXplIC0gZGVjaW1hbDtcblxuICBpZiAoZnJhY3Rpb24gPT09IDApIHJldHVybiB2YWx1ZTtcblxuICBpZiAoZnJhY3Rpb24gPCAwLjUpIHtcbiAgICByZXR1cm4gc3RlcCAqIGRlY2ltYWwgKyBtaW47XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHN0ZXAgKiAoZGVjaW1hbCArIDEpICsgbWluO1xuICB9XG59XG5cbnZhciBEcmFnSGVscGVyID0ge1xuICBtaXhpbnM6IFtEb2N1bWVudEV2ZW50SGVscGVyXSxcblxuICBwcm9wczoge1xuICAgIGRpc2FibGVkOiBCb29sZWFuXG4gIH0sXG5cbiAgZGF0YTogZnVuY3Rpb24gZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaXNEcmFnOiBmYWxzZVxuICAgIH07XG4gIH0sXG5cblxuICBldmVudHM6IHtcbiAgICBtb3VzZWRvd246IGZ1bmN0aW9uIG1vdXNlZG93bihldmVudCkge1xuICAgICAgcmV0dXJuIHRoaXMuZHJhZ1N0YXJ0KGV2ZW50LCB0aGlzLm9mZnNldEJ5TW91c2UpO1xuICAgIH0sXG4gICAgbW91c2Vtb3ZlOiBmdW5jdGlvbiBtb3VzZW1vdmUoZXZlbnQpIHtcbiAgICAgIHJldHVybiB0aGlzLmRyYWdNb3ZlKGV2ZW50LCB0aGlzLm9mZnNldEJ5TW91c2UpO1xuICAgIH0sXG4gICAgbW91c2V1cDogZnVuY3Rpb24gbW91c2V1cChldmVudCkge1xuICAgICAgcmV0dXJuIHRoaXMuZHJhZ0VuZChldmVudCwgdGhpcy5vZmZzZXRCeU1vdXNlKTtcbiAgICB9LFxuICAgIHRvdWNoc3RhcnQ6IGZ1bmN0aW9uIHRvdWNoc3RhcnQoZXZlbnQpIHtcbiAgICAgIHJldHVybiB0aGlzLmRyYWdTdGFydChldmVudCwgdGhpcy5vZmZzZXRCeVRvdWNoKTtcbiAgICB9LFxuICAgIHRvdWNobW92ZTogZnVuY3Rpb24gdG91Y2htb3ZlKGV2ZW50KSB7XG4gICAgICByZXR1cm4gdGhpcy5kcmFnTW92ZShldmVudCwgdGhpcy5vZmZzZXRCeVRvdWNoKTtcbiAgICB9LFxuICAgIHRvdWNoZW5kOiBmdW5jdGlvbiB0b3VjaGVuZChldmVudCkge1xuICAgICAgcmV0dXJuIHRoaXMuZHJhZ0VuZChldmVudCwgdGhpcy5vZmZzZXRCeVRvdWNoKTtcbiAgICB9LFxuICAgIHRvdWNoY2FuY2VsOiBmdW5jdGlvbiB0b3VjaGNhbmNlbChldmVudCkge1xuICAgICAgcmV0dXJuIHRoaXMuZHJhZ0VuZChldmVudCwgdGhpcy5vZmZzZXRCeVRvdWNoKTtcbiAgICB9XG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIGlzSW5UYXJnZXQ6IGZ1bmN0aW9uIGlzSW5UYXJnZXQoZWwpIHtcbiAgICAgIGlmICghZWwpIHJldHVybiBmYWxzZTtcblxuICAgICAgaWYgKGVsID09PSB0aGlzLiRlbCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzSW5UYXJnZXQoZWwucGFyZW50RWxlbWVudCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBvZmZzZXRCeU1vdXNlOiBmdW5jdGlvbiBvZmZzZXRCeU1vdXNlKGV2ZW50KSB7XG4gICAgICByZXR1cm4gcmVsYXRpdmVNb3VzZU9mZnNldChldmVudCwgdGhpcy4kZWwpO1xuICAgIH0sXG4gICAgb2Zmc2V0QnlUb3VjaDogZnVuY3Rpb24gb2Zmc2V0QnlUb3VjaChldmVudCkge1xuICAgICAgdmFyIHRvdWNoID0gZXZlbnQudG91Y2hlcy5sZW5ndGggPT09IDAgPyBldmVudC5jaGFuZ2VkVG91Y2hlc1swXSA6IGV2ZW50LnRvdWNoZXNbMF07XG4gICAgICByZXR1cm4gcmVsYXRpdmVNb3VzZU9mZnNldCh0b3VjaCwgdGhpcy4kZWwpO1xuICAgIH0sXG4gICAgZHJhZ1N0YXJ0OiBmdW5jdGlvbiBkcmFnU3RhcnQoZXZlbnQsIGYpIHtcbiAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IGV2ZW50LmJ1dHRvbiAhPT0gdW5kZWZpbmVkICYmIGV2ZW50LmJ1dHRvbiAhPT0gMCB8fCAhdGhpcy5pc0luVGFyZ2V0KGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5pc0RyYWcgPSB0cnVlO1xuICAgICAgdGhpcy4kZW1pdCgnZHJhZ3N0YXJ0JywgZXZlbnQsIGYoZXZlbnQpLCB0aGlzLiRlbCk7XG4gICAgfSxcbiAgICBkcmFnTW92ZTogZnVuY3Rpb24gZHJhZ01vdmUoZXZlbnQsIGYpIHtcbiAgICAgIGlmICghdGhpcy5pc0RyYWcpIHJldHVybjtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLiRlbWl0KCdkcmFnJywgZXZlbnQsIGYoZXZlbnQpLCB0aGlzLiRlbCk7XG4gICAgfSxcbiAgICBkcmFnRW5kOiBmdW5jdGlvbiBkcmFnRW5kKGV2ZW50LCBmKSB7XG4gICAgICBpZiAoIXRoaXMuaXNEcmFnKSByZXR1cm47XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5pc0RyYWcgPSBmYWxzZTtcbiAgICAgIHRoaXMuJGVtaXQoJ2RyYWdlbmQnLCBldmVudCwgZihldmVudCksIHRoaXMuJGVsKTtcbiAgICB9XG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuJHNsb3RzLmRlZmF1bHQgJiYgdGhpcy4kc2xvdHMuZGVmYXVsdFswXTtcbiAgfVxufTtcblxudmFyIFJhbmdlU2xpZGVyID0geyByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICB2YXIgX3ZtID0gdGhpczt2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oO3JldHVybiBfYygnc3BhbicsIHsgc3RhdGljQ2xhc3M6IFwicmFuZ2Utc2xpZGVyXCIsIGNsYXNzOiB7IGRpc2FibGVkOiBfdm0uZGlzYWJsZWQgfSB9LCBbX2MoJ2RyYWctaGVscGVyJywgeyBhdHRyczogeyBcImRpc2FibGVkXCI6IF92bS5kaXNhYmxlZCB9LCBvbjogeyBcImRyYWdzdGFydFwiOiBfdm0uZHJhZ1N0YXJ0LCBcImRyYWdcIjogX3ZtLmRyYWcsIFwiZHJhZ2VuZFwiOiBfdm0uZHJhZ0VuZCB9IH0sIFtfYygnc3BhbicsIHsgcmVmOiBcImlubmVyXCIsIHN0YXRpY0NsYXNzOiBcInJhbmdlLXNsaWRlci1pbm5lclwiIH0sIFtfYygnaW5wdXQnLCB7IHN0YXRpY0NsYXNzOiBcInJhbmdlLXNsaWRlci1oaWRkZW5cIiwgYXR0cnM6IHsgXCJ0eXBlXCI6IFwidGV4dFwiLCBcIm5hbWVcIjogX3ZtLm5hbWUsIFwiZGlzYWJsZWRcIjogX3ZtLmRpc2FibGVkIH0sIGRvbVByb3BzOiB7IFwidmFsdWVcIjogX3ZtLmFjdHVhbFZhbHVlIH0gfSksIF92bS5fdihcIiBcIiksIF9jKCdzcGFuJywgeyBzdGF0aWNDbGFzczogXCJyYW5nZS1zbGlkZXItcmFpbFwiIH0pLCBfdm0uX3YoXCIgXCIpLCBfYygnc3BhbicsIHsgc3RhdGljQ2xhc3M6IFwicmFuZ2Utc2xpZGVyLWZpbGxcIiwgc3R5bGU6IHsgd2lkdGg6IF92bS52YWx1ZVBlcmNlbnQgKyAnJScgfSB9KSwgX3ZtLl92KFwiIFwiKSwgX2MoJ3NwYW4nLCB7IHJlZjogXCJrbm9iXCIsIHN0YXRpY0NsYXNzOiBcInJhbmdlLXNsaWRlci1rbm9iXCIsIHN0eWxlOiB7IGxlZnQ6IF92bS52YWx1ZVBlcmNlbnQgKyAnJScgfSB9LCBbX3ZtLl90KFwia25vYlwiKV0sIDIpXSldKV0sIDEpO1xuICB9LCBzdGF0aWNSZW5kZXJGbnM6IFtdLFxuICBwcm9wczoge1xuICAgIG5hbWU6IFN0cmluZyxcbiAgICB2YWx1ZTogW1N0cmluZywgTnVtYmVyXSxcbiAgICBkaXNhYmxlZDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfSxcbiAgICBtaW46IHtcbiAgICAgIHR5cGU6IFtTdHJpbmcsIE51bWJlcl0sXG4gICAgICBkZWZhdWx0OiAwXG4gICAgfSxcbiAgICBtYXg6IHtcbiAgICAgIHR5cGU6IFtTdHJpbmcsIE51bWJlcl0sXG4gICAgICBkZWZhdWx0OiAxMDBcbiAgICB9LFxuICAgIHN0ZXA6IHtcbiAgICAgIHR5cGU6IFtTdHJpbmcsIE51bWJlcl0sXG4gICAgICBkZWZhdWx0OiAxXG4gICAgfVxuICB9LFxuXG4gIGRhdGE6IGZ1bmN0aW9uIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGFjdHVhbFZhbHVlOiBudWxsLFxuICAgICAgZHJhZ1N0YXJ0VmFsdWU6IG51bGxcbiAgICB9O1xuICB9LFxuICBjcmVhdGVkOiBmdW5jdGlvbiBjcmVhdGVkKCkge1xuICAgIHZhciBtaW4gPSB0aGlzLl9taW4sXG4gICAgICAgIG1heCA9IHRoaXMuX21heDtcblxuICAgIHZhciBkZWZhdWx0VmFsdWUgPSBOdW1iZXIodGhpcy52YWx1ZSk7XG5cbiAgICBpZiAodGhpcy52YWx1ZSA9PSBudWxsIHx8IGlzTmFOKGRlZmF1bHRWYWx1ZSkpIHtcbiAgICAgIGlmIChtaW4gPiBtYXgpIHtcbiAgICAgICAgZGVmYXVsdFZhbHVlID0gbWluO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVmYXVsdFZhbHVlID0gKG1pbiArIG1heCkgLyAyO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuYWN0dWFsVmFsdWUgPSB0aGlzLnJvdW5kKGRlZmF1bHRWYWx1ZSk7XG4gIH0sXG5cblxuICBjb21wdXRlZDoge1xuICAgIF9taW46IGZ1bmN0aW9uIF9taW4oKSB7XG4gICAgICByZXR1cm4gTnVtYmVyKHRoaXMubWluKTtcbiAgICB9LFxuICAgIF9tYXg6IGZ1bmN0aW9uIF9tYXgoKSB7XG4gICAgICByZXR1cm4gTnVtYmVyKHRoaXMubWF4KTtcbiAgICB9LFxuICAgIF9zdGVwOiBmdW5jdGlvbiBfc3RlcCgpIHtcbiAgICAgIHJldHVybiBOdW1iZXIodGhpcy5zdGVwKTtcbiAgICB9LFxuICAgIHZhbHVlUGVyY2VudDogZnVuY3Rpb24gdmFsdWVQZXJjZW50KCkge1xuICAgICAgcmV0dXJuICh0aGlzLmFjdHVhbFZhbHVlIC0gdGhpcy5fbWluKSAvICh0aGlzLl9tYXggLSB0aGlzLl9taW4pICogMTAwO1xuICAgIH1cbiAgfSxcblxuICB3YXRjaDoge1xuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShuZXdWYWx1ZSkge1xuICAgICAgdmFyIHZhbHVlID0gTnVtYmVyKG5ld1ZhbHVlKTtcbiAgICAgIGlmIChuZXdWYWx1ZSAhPSBudWxsICYmICFpc05hTih2YWx1ZSkpIHtcbiAgICAgICAgdGhpcy5hY3R1YWxWYWx1ZSA9IHRoaXMucm91bmQodmFsdWUpO1xuICAgICAgfVxuICAgIH0sXG4gICAgbWluOiBmdW5jdGlvbiBtaW4oKSB7XG4gICAgICB0aGlzLmFjdHVhbFZhbHVlID0gdGhpcy5yb3VuZCh0aGlzLmFjdHVhbFZhbHVlKTtcbiAgICB9LFxuICAgIG1heDogZnVuY3Rpb24gbWF4KCkge1xuICAgICAgdGhpcy5hY3R1YWxWYWx1ZSA9IHRoaXMucm91bmQodGhpcy5hY3R1YWxWYWx1ZSk7XG4gICAgfVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBkcmFnU3RhcnQ6IGZ1bmN0aW9uIGRyYWdTdGFydChldmVudCwgb2Zmc2V0KSB7XG4gICAgICB0aGlzLmRyYWdTdGFydFZhbHVlID0gdGhpcy5hY3R1YWxWYWx1ZTtcbiAgICAgIGlmIChldmVudC50YXJnZXQgPT09IHRoaXMuJHJlZnMua25vYikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBJZiB0aGUgY2xpY2sgaXMgb3V0IG9mIGtub2IsIG1vdmUgaXQgdG8gbW91c2UgcG9zaXRpb25cbiAgICAgIHRoaXMuZHJhZyhldmVudCwgb2Zmc2V0KTtcbiAgICB9LFxuICAgIGRyYWc6IGZ1bmN0aW9uIGRyYWcoZXZlbnQsIG9mZnNldCkge1xuICAgICAgdmFyIG9mZnNldFdpZHRoID0gdGhpcy4kcmVmcy5pbm5lci5vZmZzZXRXaWR0aDtcblxuICAgICAgdGhpcy5hY3R1YWxWYWx1ZSA9IHRoaXMucm91bmQodGhpcy52YWx1ZUZyb21Cb3VuZHMob2Zmc2V0LmxlZnQsIG9mZnNldFdpZHRoKSk7XG4gICAgICB0aGlzLmVtaXRJbnB1dCh0aGlzLmFjdHVhbFZhbHVlKTtcbiAgICB9LFxuICAgIGRyYWdFbmQ6IGZ1bmN0aW9uIGRyYWdFbmQoZXZlbnQsIG9mZnNldCkge1xuICAgICAgdmFyIG9mZnNldFdpZHRoID0gdGhpcy4kcmVmcy5pbm5lci5vZmZzZXRXaWR0aDtcblxuICAgICAgdGhpcy5hY3R1YWxWYWx1ZSA9IHRoaXMucm91bmQodGhpcy52YWx1ZUZyb21Cb3VuZHMob2Zmc2V0LmxlZnQsIG9mZnNldFdpZHRoKSk7XG5cbiAgICAgIGlmICh0aGlzLmRyYWdTdGFydFZhbHVlICE9PSB0aGlzLmFjdHVhbFZhbHVlKSB7XG4gICAgICAgIHRoaXMuZW1pdENoYW5nZSh0aGlzLmFjdHVhbFZhbHVlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGVtaXRJbnB1dDogZnVuY3Rpb24gZW1pdElucHV0KHZhbHVlKSB7XG4gICAgICB0aGlzLiRlbWl0KCdpbnB1dCcsIHZhbHVlKTtcbiAgICB9LFxuICAgIGVtaXRDaGFuZ2U6IGZ1bmN0aW9uIGVtaXRDaGFuZ2UodmFsdWUpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ2NoYW5nZScsIHZhbHVlKTtcbiAgICB9LFxuICAgIHZhbHVlRnJvbUJvdW5kczogZnVuY3Rpb24gdmFsdWVGcm9tQm91bmRzKHBvaW50LCB3aWR0aCkge1xuICAgICAgcmV0dXJuIHBvaW50IC8gd2lkdGggKiAodGhpcy5fbWF4IC0gdGhpcy5fbWluKSArIHRoaXMuX21pbjtcbiAgICB9LFxuICAgIHJvdW5kOiBmdW5jdGlvbiByb3VuZCQkMSh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHJvdW5kKHZhbHVlLCB0aGlzLl9taW4sIHRoaXMuX21heCwgdGhpcy5fc3RlcCk7XG4gICAgfVxuICB9LFxuXG4gIGNvbXBvbmVudHM6IHtcbiAgICBEcmFnSGVscGVyOiBEcmFnSGVscGVyXG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmFuZ2VTbGlkZXI7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBRUEsSUFBSUEsbUJBQW1CLEdBQUc7RUFDeEJDLE9BQU8sRUFBRSxTQUFTQSxPQUFULEdBQW1CO0lBQzFCLElBQUksT0FBT0MsUUFBUCxLQUFvQixXQUF4QixFQUFxQztJQUNyQ0MsZUFBZSxDQUFDLElBQUQsRUFBTyxVQUFVQyxHQUFWLEVBQWVDLFFBQWYsRUFBeUI7TUFDN0NDLEVBQUUsQ0FBQ0osUUFBRCxFQUFXRSxHQUFYLEVBQWdCQyxRQUFoQixDQUFGO0lBQ0QsQ0FGYyxDQUFmO0VBR0QsQ0FOdUI7RUFPeEJFLGFBQWEsRUFBRSxTQUFTQSxhQUFULEdBQXlCO0lBQ3RDLElBQUksT0FBT0wsUUFBUCxLQUFvQixXQUF4QixFQUFxQztJQUNyQ0MsZUFBZSxDQUFDLElBQUQsRUFBTyxVQUFVQyxHQUFWLEVBQWVDLFFBQWYsRUFBeUI7TUFDN0NHLEdBQUcsQ0FBQ04sUUFBRCxFQUFXRSxHQUFYLEVBQWdCQyxRQUFoQixDQUFIO0lBQ0QsQ0FGYyxDQUFmO0VBR0Q7QUFadUIsQ0FBMUI7QUFlQSxJQUFJSSxTQUFTLEdBQUcsT0FBT0MsTUFBUCxLQUFrQixXQUFsQzs7QUFFQSxJQUFJQyxVQUFVLEdBQUdGLFNBQVMsSUFBSSxZQUFZO0VBQ3hDLElBQUlHLFNBQVMsR0FBRyxLQUFoQjs7RUFFQSxJQUFJO0lBQ0YsSUFBSUMsSUFBSSxHQUFHO01BQ1RDLEdBQUcsRUFBRSxTQUFTQSxHQUFULEdBQWU7UUFDbEJGLFNBQVMsR0FBRyxJQUFaO01BQ0Q7SUFIUSxDQUFYO0lBS0EsSUFBSUcsSUFBSSxHQUFHQyxNQUFNLENBQUNDLGNBQVAsQ0FBc0IsRUFBdEIsRUFBMEIsU0FBMUIsRUFBcUNKLElBQXJDLENBQVg7SUFFQUgsTUFBTSxDQUFDUSxnQkFBUCxDQUF3QixNQUF4QixFQUFnQyxJQUFoQyxFQUFzQ0gsSUFBdEM7SUFDQUwsTUFBTSxDQUFDUyxtQkFBUCxDQUEyQixNQUEzQixFQUFtQyxJQUFuQyxFQUF5Q0osSUFBekM7RUFDRCxDQVZELENBVUUsT0FBT0ssQ0FBUCxFQUFVO0lBQ1ZSLFNBQVMsR0FBRyxLQUFaO0VBQ0Q7O0VBRUQsT0FBT0EsU0FBUDtBQUNELENBbEI2QixFQUE5Qjs7QUFvQkEsU0FBU1QsZUFBVCxDQUF5QmtCLEVBQXpCLEVBQTZCQyxDQUE3QixFQUFnQztFQUM5QixJQUFJQyxNQUFNLEdBQUdGLEVBQUUsQ0FBQ0csUUFBSCxDQUFZRCxNQUF6QjtFQUNBUCxNQUFNLENBQUNTLElBQVAsQ0FBWUYsTUFBWixFQUFvQkcsT0FBcEIsQ0FBNEIsVUFBVXRCLEdBQVYsRUFBZTtJQUN6Q2tCLENBQUMsQ0FBQ2xCLEdBQUQsRUFBTSxVQUFVdUIsS0FBVixFQUFpQjtNQUN0QixPQUFPSixNQUFNLENBQUNuQixHQUFELENBQU4sQ0FBWXdCLElBQVosQ0FBaUJQLEVBQWpCLEVBQXFCTSxLQUFyQixDQUFQO0lBQ0QsQ0FGQSxDQUFEO0VBR0QsQ0FKRDtBQUtEOztBQUVELFNBQVNyQixFQUFULENBQVl1QixFQUFaLEVBQWdCQyxJQUFoQixFQUFzQkMsRUFBdEIsRUFBMEI7RUFDeEIsSUFBSUMsT0FBTyxHQUFHckIsVUFBVSxHQUFHO0lBQUVzQixPQUFPLEVBQUU7RUFBWCxDQUFILEdBQXdCQyxTQUFoRDtFQUNBTCxFQUFFLENBQUNYLGdCQUFILENBQW9CWSxJQUFwQixFQUEwQkMsRUFBMUIsRUFBOEJDLE9BQTlCO0FBQ0Q7O0FBRUQsU0FBU3hCLEdBQVQsQ0FBYXFCLEVBQWIsRUFBaUJDLElBQWpCLEVBQXVCQyxFQUF2QixFQUEyQjtFQUN6QixJQUFJQyxPQUFPLEdBQUdyQixVQUFVLEdBQUc7SUFBRXNCLE9BQU8sRUFBRTtFQUFYLENBQUgsR0FBd0JDLFNBQWhEO0VBQ0FMLEVBQUUsQ0FBQ1YsbUJBQUgsQ0FBdUJXLElBQXZCLEVBQTZCQyxFQUE3QixFQUFpQ0MsT0FBakM7QUFDRDs7QUFFRCxTQUFTRyxtQkFBVCxDQUE2QkMsTUFBN0IsRUFBcUNDLElBQXJDLEVBQTJDO0VBQ3pDLElBQUlDLE1BQU0sR0FBR0QsSUFBSSxDQUFDRSxxQkFBTCxFQUFiO0VBQ0EsT0FBTztJQUNMQyxJQUFJLEVBQUVKLE1BQU0sQ0FBQ0ssT0FBUCxHQUFpQkgsTUFBTSxDQUFDRSxJQUR6QjtJQUVMRSxHQUFHLEVBQUVOLE1BQU0sQ0FBQ08sT0FBUCxHQUFpQkwsTUFBTSxDQUFDSTtFQUZ4QixDQUFQO0FBSUQ7O0FBRUQsU0FBU0UsS0FBVCxDQUFlQyxLQUFmLEVBQXNCQyxHQUF0QixFQUEyQkMsR0FBM0IsRUFBZ0NDLElBQWhDLEVBQXNDO0VBQ3BDLElBQUlILEtBQUssSUFBSUMsR0FBYixFQUFrQjtJQUNoQixPQUFPQSxHQUFQO0VBQ0Q7O0VBRUQsSUFBSUcsVUFBVSxHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBVyxDQUFDSixHQUFHLEdBQUdELEdBQVAsSUFBY0UsSUFBekIsSUFBaUNBLElBQWpDLEdBQXdDRixHQUF6RDs7RUFDQSxJQUFJRCxLQUFLLElBQUlJLFVBQWIsRUFBeUI7SUFDdkIsT0FBT0EsVUFBUDtFQUNEOztFQUVELElBQUlHLFNBQVMsR0FBRyxDQUFDUCxLQUFLLEdBQUdDLEdBQVQsSUFBZ0JFLElBQWhDO0VBQ0EsSUFBSUssT0FBTyxHQUFHSCxJQUFJLENBQUNDLEtBQUwsQ0FBV0MsU0FBWCxDQUFkO0VBQ0EsSUFBSUUsUUFBUSxHQUFHRixTQUFTLEdBQUdDLE9BQTNCO0VBRUEsSUFBSUMsUUFBUSxLQUFLLENBQWpCLEVBQW9CLE9BQU9ULEtBQVA7O0VBRXBCLElBQUlTLFFBQVEsR0FBRyxHQUFmLEVBQW9CO0lBQ2xCLE9BQU9OLElBQUksR0FBR0ssT0FBUCxHQUFpQlAsR0FBeEI7RUFDRCxDQUZELE1BRU87SUFDTCxPQUFPRSxJQUFJLElBQUlLLE9BQU8sR0FBRyxDQUFkLENBQUosR0FBdUJQLEdBQTlCO0VBQ0Q7QUFDRjs7QUFFRCxJQUFJUyxVQUFVLEdBQUc7RUFDZkMsTUFBTSxFQUFFLENBQUN4RCxtQkFBRCxDQURPO0VBR2Z5RCxLQUFLLEVBQUU7SUFDTEMsUUFBUSxFQUFFQztFQURMLENBSFE7RUFPZkMsSUFBSSxFQUFFLFNBQVNBLElBQVQsR0FBZ0I7SUFDcEIsT0FBTztNQUNMQyxNQUFNLEVBQUU7SUFESCxDQUFQO0VBR0QsQ0FYYztFQWNmdEMsTUFBTSxFQUFFO0lBQ051QyxTQUFTLEVBQUUsU0FBU0EsU0FBVCxDQUFtQm5DLEtBQW5CLEVBQTBCO01BQ25DLE9BQU8sS0FBS29DLFNBQUwsQ0FBZXBDLEtBQWYsRUFBc0IsS0FBS3FDLGFBQTNCLENBQVA7SUFDRCxDQUhLO0lBSU5DLFNBQVMsRUFBRSxTQUFTQSxTQUFULENBQW1CdEMsS0FBbkIsRUFBMEI7TUFDbkMsT0FBTyxLQUFLdUMsUUFBTCxDQUFjdkMsS0FBZCxFQUFxQixLQUFLcUMsYUFBMUIsQ0FBUDtJQUNELENBTks7SUFPTkcsT0FBTyxFQUFFLFNBQVNBLE9BQVQsQ0FBaUJ4QyxLQUFqQixFQUF3QjtNQUMvQixPQUFPLEtBQUt5QyxPQUFMLENBQWF6QyxLQUFiLEVBQW9CLEtBQUtxQyxhQUF6QixDQUFQO0lBQ0QsQ0FUSztJQVVOSyxVQUFVLEVBQUUsU0FBU0EsVUFBVCxDQUFvQjFDLEtBQXBCLEVBQTJCO01BQ3JDLE9BQU8sS0FBS29DLFNBQUwsQ0FBZXBDLEtBQWYsRUFBc0IsS0FBSzJDLGFBQTNCLENBQVA7SUFDRCxDQVpLO0lBYU5DLFNBQVMsRUFBRSxTQUFTQSxTQUFULENBQW1CNUMsS0FBbkIsRUFBMEI7TUFDbkMsT0FBTyxLQUFLdUMsUUFBTCxDQUFjdkMsS0FBZCxFQUFxQixLQUFLMkMsYUFBMUIsQ0FBUDtJQUNELENBZks7SUFnQk5FLFFBQVEsRUFBRSxTQUFTQSxRQUFULENBQWtCN0MsS0FBbEIsRUFBeUI7TUFDakMsT0FBTyxLQUFLeUMsT0FBTCxDQUFhekMsS0FBYixFQUFvQixLQUFLMkMsYUFBekIsQ0FBUDtJQUNELENBbEJLO0lBbUJORyxXQUFXLEVBQUUsU0FBU0EsV0FBVCxDQUFxQjlDLEtBQXJCLEVBQTRCO01BQ3ZDLE9BQU8sS0FBS3lDLE9BQUwsQ0FBYXpDLEtBQWIsRUFBb0IsS0FBSzJDLGFBQXpCLENBQVA7SUFDRDtFQXJCSyxDQWRPO0VBc0NmSSxPQUFPLEVBQUU7SUFDUEMsVUFBVSxFQUFFLFNBQVNBLFVBQVQsQ0FBb0I5QyxFQUFwQixFQUF3QjtNQUNsQyxJQUFJLENBQUNBLEVBQUwsRUFBUyxPQUFPLEtBQVA7O01BRVQsSUFBSUEsRUFBRSxLQUFLLEtBQUsrQyxHQUFoQixFQUFxQjtRQUNuQixPQUFPLElBQVA7TUFDRCxDQUZELE1BRU87UUFDTCxPQUFPLEtBQUtELFVBQUwsQ0FBZ0I5QyxFQUFFLENBQUNnRCxhQUFuQixDQUFQO01BQ0Q7SUFDRixDQVRNO0lBVVBiLGFBQWEsRUFBRSxTQUFTQSxhQUFULENBQXVCckMsS0FBdkIsRUFBOEI7TUFDM0MsT0FBT1EsbUJBQW1CLENBQUNSLEtBQUQsRUFBUSxLQUFLaUQsR0FBYixDQUExQjtJQUNELENBWk07SUFhUE4sYUFBYSxFQUFFLFNBQVNBLGFBQVQsQ0FBdUIzQyxLQUF2QixFQUE4QjtNQUMzQyxJQUFJbUQsS0FBSyxHQUFHbkQsS0FBSyxDQUFDb0QsT0FBTixDQUFjQyxNQUFkLEtBQXlCLENBQXpCLEdBQTZCckQsS0FBSyxDQUFDc0QsY0FBTixDQUFxQixDQUFyQixDQUE3QixHQUF1RHRELEtBQUssQ0FBQ29ELE9BQU4sQ0FBYyxDQUFkLENBQW5FO01BQ0EsT0FBTzVDLG1CQUFtQixDQUFDMkMsS0FBRCxFQUFRLEtBQUtGLEdBQWIsQ0FBMUI7SUFDRCxDQWhCTTtJQWlCUGIsU0FBUyxFQUFFLFNBQVNBLFNBQVQsQ0FBbUJwQyxLQUFuQixFQUEwQkwsQ0FBMUIsRUFBNkI7TUFDdEMsSUFBSSxLQUFLb0MsUUFBTCxJQUFpQi9CLEtBQUssQ0FBQ3VELE1BQU4sS0FBaUJoRCxTQUFqQixJQUE4QlAsS0FBSyxDQUFDdUQsTUFBTixLQUFpQixDQUFoRSxJQUFxRSxDQUFDLEtBQUtQLFVBQUwsQ0FBZ0JoRCxLQUFLLENBQUN3RCxNQUF0QixDQUExRSxFQUF5RztRQUN2RztNQUNEOztNQUVEeEQsS0FBSyxDQUFDeUQsY0FBTjtNQUNBLEtBQUt2QixNQUFMLEdBQWMsSUFBZDtNQUNBLEtBQUt3QixLQUFMLENBQVcsV0FBWCxFQUF3QjFELEtBQXhCLEVBQStCTCxDQUFDLENBQUNLLEtBQUQsQ0FBaEMsRUFBeUMsS0FBS2lELEdBQTlDO0lBQ0QsQ0F6Qk07SUEwQlBWLFFBQVEsRUFBRSxTQUFTQSxRQUFULENBQWtCdkMsS0FBbEIsRUFBeUJMLENBQXpCLEVBQTRCO01BQ3BDLElBQUksQ0FBQyxLQUFLdUMsTUFBVixFQUFrQjtNQUNsQmxDLEtBQUssQ0FBQ3lELGNBQU47TUFDQSxLQUFLQyxLQUFMLENBQVcsTUFBWCxFQUFtQjFELEtBQW5CLEVBQTBCTCxDQUFDLENBQUNLLEtBQUQsQ0FBM0IsRUFBb0MsS0FBS2lELEdBQXpDO0lBQ0QsQ0E5Qk07SUErQlBSLE9BQU8sRUFBRSxTQUFTQSxPQUFULENBQWlCekMsS0FBakIsRUFBd0JMLENBQXhCLEVBQTJCO01BQ2xDLElBQUksQ0FBQyxLQUFLdUMsTUFBVixFQUFrQjtNQUNsQmxDLEtBQUssQ0FBQ3lELGNBQU47TUFDQSxLQUFLdkIsTUFBTCxHQUFjLEtBQWQ7TUFDQSxLQUFLd0IsS0FBTCxDQUFXLFNBQVgsRUFBc0IxRCxLQUF0QixFQUE2QkwsQ0FBQyxDQUFDSyxLQUFELENBQTlCLEVBQXVDLEtBQUtpRCxHQUE1QztJQUNEO0VBcENNLENBdENNO0VBNkVmVSxNQUFNLEVBQUUsU0FBU0EsTUFBVCxHQUFrQjtJQUN4QixPQUFPLEtBQUtDLE1BQUwsQ0FBWUMsT0FBWixJQUF1QixLQUFLRCxNQUFMLENBQVlDLE9BQVosQ0FBb0IsQ0FBcEIsQ0FBOUI7RUFDRDtBQS9FYyxDQUFqQjtBQWtGQSxJQUFJQyxXQUFXLEdBQUc7RUFBRUgsTUFBTSxFQUFFLFNBQVNBLE1BQVQsR0FBa0I7SUFDMUMsSUFBSUksR0FBRyxHQUFHLElBQVY7O0lBQWUsSUFBSUMsRUFBRSxHQUFHRCxHQUFHLENBQUNFLGNBQWI7O0lBQTRCLElBQUlDLEVBQUUsR0FBR0gsR0FBRyxDQUFDSSxLQUFKLENBQVVELEVBQVYsSUFBZ0JGLEVBQXpCOztJQUE0QixPQUFPRSxFQUFFLENBQUMsTUFBRCxFQUFTO01BQUVFLFdBQVcsRUFBRSxjQUFmO01BQStCQyxLQUFLLEVBQUU7UUFBRXRDLFFBQVEsRUFBRWdDLEdBQUcsQ0FBQ2hDO01BQWhCO0lBQXRDLENBQVQsRUFBNkUsQ0FBQ21DLEVBQUUsQ0FBQyxhQUFELEVBQWdCO01BQUVJLEtBQUssRUFBRTtRQUFFLFlBQVlQLEdBQUcsQ0FBQ2hDO01BQWxCLENBQVQ7TUFBdUNwRCxFQUFFLEVBQUU7UUFBRSxhQUFhb0YsR0FBRyxDQUFDM0IsU0FBbkI7UUFBOEIsUUFBUTJCLEdBQUcsQ0FBQ1EsSUFBMUM7UUFBZ0QsV0FBV1IsR0FBRyxDQUFDdEI7TUFBL0Q7SUFBM0MsQ0FBaEIsRUFBdUksQ0FBQ3lCLEVBQUUsQ0FBQyxNQUFELEVBQVM7TUFBRU0sR0FBRyxFQUFFLE9BQVA7TUFBZ0JKLFdBQVcsRUFBRTtJQUE3QixDQUFULEVBQThELENBQUNGLEVBQUUsQ0FBQyxPQUFELEVBQVU7TUFBRUUsV0FBVyxFQUFFLHFCQUFmO01BQXNDRSxLQUFLLEVBQUU7UUFBRSxRQUFRLE1BQVY7UUFBa0IsUUFBUVAsR0FBRyxDQUFDNUQsSUFBOUI7UUFBb0MsWUFBWTRELEdBQUcsQ0FBQ2hDO01BQXBELENBQTdDO01BQTZHMEMsUUFBUSxFQUFFO1FBQUUsU0FBU1YsR0FBRyxDQUFDVztNQUFmO0lBQXZILENBQVYsQ0FBSCxFQUFxS1gsR0FBRyxDQUFDWSxFQUFKLENBQU8sR0FBUCxDQUFySyxFQUFrTFQsRUFBRSxDQUFDLE1BQUQsRUFBUztNQUFFRSxXQUFXLEVBQUU7SUFBZixDQUFULENBQXBMLEVBQW9PTCxHQUFHLENBQUNZLEVBQUosQ0FBTyxHQUFQLENBQXBPLEVBQWlQVCxFQUFFLENBQUMsTUFBRCxFQUFTO01BQUVFLFdBQVcsRUFBRSxtQkFBZjtNQUFvQ1EsS0FBSyxFQUFFO1FBQUVDLEtBQUssRUFBRWQsR0FBRyxDQUFDZSxZQUFKLEdBQW1CO01BQTVCO0lBQTNDLENBQVQsQ0FBblAsRUFBNlVmLEdBQUcsQ0FBQ1ksRUFBSixDQUFPLEdBQVAsQ0FBN1UsRUFBMFZULEVBQUUsQ0FBQyxNQUFELEVBQVM7TUFBRU0sR0FBRyxFQUFFLE1BQVA7TUFBZUosV0FBVyxFQUFFLG1CQUE1QjtNQUFpRFEsS0FBSyxFQUFFO1FBQUUvRCxJQUFJLEVBQUVrRCxHQUFHLENBQUNlLFlBQUosR0FBbUI7TUFBM0I7SUFBeEQsQ0FBVCxFQUFxRyxDQUFDZixHQUFHLENBQUNnQixFQUFKLENBQU8sTUFBUCxDQUFELENBQXJHLEVBQXVILENBQXZILENBQTVWLENBQTlELENBQUgsQ0FBdkksQ0FBSCxDQUE3RSxFQUFvdkIsQ0FBcHZCLENBQVQ7RUFDeEUsQ0FGZTtFQUViQyxlQUFlLEVBQUUsRUFGSjtFQUdoQmxELEtBQUssRUFBRTtJQUNMM0IsSUFBSSxFQUFFOEUsTUFERDtJQUVML0QsS0FBSyxFQUFFLENBQUMrRCxNQUFELEVBQVNDLE1BQVQsQ0FGRjtJQUdMbkQsUUFBUSxFQUFFO01BQ1JvRCxJQUFJLEVBQUVuRCxPQURFO01BRVI2QixPQUFPLEVBQUU7SUFGRCxDQUhMO0lBT0wxQyxHQUFHLEVBQUU7TUFDSGdFLElBQUksRUFBRSxDQUFDRixNQUFELEVBQVNDLE1BQVQsQ0FESDtNQUVIckIsT0FBTyxFQUFFO0lBRk4sQ0FQQTtJQVdMekMsR0FBRyxFQUFFO01BQ0grRCxJQUFJLEVBQUUsQ0FBQ0YsTUFBRCxFQUFTQyxNQUFULENBREg7TUFFSHJCLE9BQU8sRUFBRTtJQUZOLENBWEE7SUFlTHhDLElBQUksRUFBRTtNQUNKOEQsSUFBSSxFQUFFLENBQUNGLE1BQUQsRUFBU0MsTUFBVCxDQURGO01BRUpyQixPQUFPLEVBQUU7SUFGTDtFQWZELENBSFM7RUF3QmhCNUIsSUFBSSxFQUFFLFNBQVNBLElBQVQsR0FBZ0I7SUFDcEIsT0FBTztNQUNMeUMsV0FBVyxFQUFFLElBRFI7TUFFTFUsY0FBYyxFQUFFO0lBRlgsQ0FBUDtFQUlELENBN0JlO0VBOEJoQjlHLE9BQU8sRUFBRSxTQUFTQSxPQUFULEdBQW1CO0lBQzFCLElBQUk2QyxHQUFHLEdBQUcsS0FBS2tFLElBQWY7SUFBQSxJQUNJakUsR0FBRyxHQUFHLEtBQUtrRSxJQURmO0lBR0EsSUFBSUMsWUFBWSxHQUFHTCxNQUFNLENBQUMsS0FBS2hFLEtBQU4sQ0FBekI7O0lBRUEsSUFBSSxLQUFLQSxLQUFMLElBQWMsSUFBZCxJQUFzQnNFLEtBQUssQ0FBQ0QsWUFBRCxDQUEvQixFQUErQztNQUM3QyxJQUFJcEUsR0FBRyxHQUFHQyxHQUFWLEVBQWU7UUFDYm1FLFlBQVksR0FBR3BFLEdBQWY7TUFDRCxDQUZELE1BRU87UUFDTG9FLFlBQVksR0FBRyxDQUFDcEUsR0FBRyxHQUFHQyxHQUFQLElBQWMsQ0FBN0I7TUFDRDtJQUNGOztJQUVELEtBQUtzRCxXQUFMLEdBQW1CLEtBQUt6RCxLQUFMLENBQVdzRSxZQUFYLENBQW5CO0VBQ0QsQ0E3Q2U7RUFnRGhCRSxRQUFRLEVBQUU7SUFDUkosSUFBSSxFQUFFLFNBQVNBLElBQVQsR0FBZ0I7TUFDcEIsT0FBT0gsTUFBTSxDQUFDLEtBQUsvRCxHQUFOLENBQWI7SUFDRCxDQUhPO0lBSVJtRSxJQUFJLEVBQUUsU0FBU0EsSUFBVCxHQUFnQjtNQUNwQixPQUFPSixNQUFNLENBQUMsS0FBSzlELEdBQU4sQ0FBYjtJQUNELENBTk87SUFPUnNFLEtBQUssRUFBRSxTQUFTQSxLQUFULEdBQWlCO01BQ3RCLE9BQU9SLE1BQU0sQ0FBQyxLQUFLN0QsSUFBTixDQUFiO0lBQ0QsQ0FUTztJQVVSeUQsWUFBWSxFQUFFLFNBQVNBLFlBQVQsR0FBd0I7TUFDcEMsT0FBTyxDQUFDLEtBQUtKLFdBQUwsR0FBbUIsS0FBS1csSUFBekIsS0FBa0MsS0FBS0MsSUFBTCxHQUFZLEtBQUtELElBQW5ELElBQTJELEdBQWxFO0lBQ0Q7RUFaTyxDQWhETTtFQStEaEJNLEtBQUssRUFBRTtJQUNMekUsS0FBSyxFQUFFLFNBQVNBLEtBQVQsQ0FBZTBFLFFBQWYsRUFBeUI7TUFDOUIsSUFBSTFFLEtBQUssR0FBR2dFLE1BQU0sQ0FBQ1UsUUFBRCxDQUFsQjs7TUFDQSxJQUFJQSxRQUFRLElBQUksSUFBWixJQUFvQixDQUFDSixLQUFLLENBQUN0RSxLQUFELENBQTlCLEVBQXVDO1FBQ3JDLEtBQUt3RCxXQUFMLEdBQW1CLEtBQUt6RCxLQUFMLENBQVdDLEtBQVgsQ0FBbkI7TUFDRDtJQUNGLENBTkk7SUFPTEMsR0FBRyxFQUFFLFNBQVNBLEdBQVQsR0FBZTtNQUNsQixLQUFLdUQsV0FBTCxHQUFtQixLQUFLekQsS0FBTCxDQUFXLEtBQUt5RCxXQUFoQixDQUFuQjtJQUNELENBVEk7SUFVTHRELEdBQUcsRUFBRSxTQUFTQSxHQUFULEdBQWU7TUFDbEIsS0FBS3NELFdBQUwsR0FBbUIsS0FBS3pELEtBQUwsQ0FBVyxLQUFLeUQsV0FBaEIsQ0FBbkI7SUFDRDtFQVpJLENBL0RTO0VBOEVoQjNCLE9BQU8sRUFBRTtJQUNQWCxTQUFTLEVBQUUsU0FBU0EsU0FBVCxDQUFtQnBDLEtBQW5CLEVBQTBCUyxNQUExQixFQUFrQztNQUMzQyxLQUFLMkUsY0FBTCxHQUFzQixLQUFLVixXQUEzQjs7TUFDQSxJQUFJMUUsS0FBSyxDQUFDd0QsTUFBTixLQUFpQixLQUFLcUMsS0FBTCxDQUFXQyxJQUFoQyxFQUFzQztRQUNwQztNQUNELENBSjBDLENBSzNDOzs7TUFDQSxLQUFLdkIsSUFBTCxDQUFVdkUsS0FBVixFQUFpQlMsTUFBakI7SUFDRCxDQVJNO0lBU1A4RCxJQUFJLEVBQUUsU0FBU0EsSUFBVCxDQUFjdkUsS0FBZCxFQUFxQlMsTUFBckIsRUFBNkI7TUFDakMsSUFBSXNGLFdBQVcsR0FBRyxLQUFLRixLQUFMLENBQVdHLEtBQVgsQ0FBaUJELFdBQW5DO01BRUEsS0FBS3JCLFdBQUwsR0FBbUIsS0FBS3pELEtBQUwsQ0FBVyxLQUFLZ0YsZUFBTCxDQUFxQnhGLE1BQU0sQ0FBQ0ksSUFBNUIsRUFBa0NrRixXQUFsQyxDQUFYLENBQW5CO01BQ0EsS0FBS0csU0FBTCxDQUFlLEtBQUt4QixXQUFwQjtJQUNELENBZE07SUFlUGpDLE9BQU8sRUFBRSxTQUFTQSxPQUFULENBQWlCekMsS0FBakIsRUFBd0JTLE1BQXhCLEVBQWdDO01BQ3ZDLElBQUlzRixXQUFXLEdBQUcsS0FBS0YsS0FBTCxDQUFXRyxLQUFYLENBQWlCRCxXQUFuQztNQUVBLEtBQUtyQixXQUFMLEdBQW1CLEtBQUt6RCxLQUFMLENBQVcsS0FBS2dGLGVBQUwsQ0FBcUJ4RixNQUFNLENBQUNJLElBQTVCLEVBQWtDa0YsV0FBbEMsQ0FBWCxDQUFuQjs7TUFFQSxJQUFJLEtBQUtYLGNBQUwsS0FBd0IsS0FBS1YsV0FBakMsRUFBOEM7UUFDNUMsS0FBS3lCLFVBQUwsQ0FBZ0IsS0FBS3pCLFdBQXJCO01BQ0Q7SUFDRixDQXZCTTtJQXdCUHdCLFNBQVMsRUFBRSxTQUFTQSxTQUFULENBQW1CaEYsS0FBbkIsRUFBMEI7TUFDbkMsS0FBS3dDLEtBQUwsQ0FBVyxPQUFYLEVBQW9CeEMsS0FBcEI7SUFDRCxDQTFCTTtJQTJCUGlGLFVBQVUsRUFBRSxTQUFTQSxVQUFULENBQW9CakYsS0FBcEIsRUFBMkI7TUFDckMsS0FBS3dDLEtBQUwsQ0FBVyxRQUFYLEVBQXFCeEMsS0FBckI7SUFDRCxDQTdCTTtJQThCUCtFLGVBQWUsRUFBRSxTQUFTQSxlQUFULENBQXlCRyxLQUF6QixFQUFnQ3ZCLEtBQWhDLEVBQXVDO01BQ3RELE9BQU91QixLQUFLLEdBQUd2QixLQUFSLElBQWlCLEtBQUtTLElBQUwsR0FBWSxLQUFLRCxJQUFsQyxJQUEwQyxLQUFLQSxJQUF0RDtJQUNELENBaENNO0lBaUNQcEUsS0FBSyxFQUFFLFNBQVNvRixRQUFULENBQWtCbkYsS0FBbEIsRUFBeUI7TUFDOUIsT0FBT0QsS0FBSyxDQUFDQyxLQUFELEVBQVEsS0FBS21FLElBQWIsRUFBbUIsS0FBS0MsSUFBeEIsRUFBOEIsS0FBS0ksS0FBbkMsQ0FBWjtJQUNEO0VBbkNNLENBOUVPO0VBb0hoQlksVUFBVSxFQUFFO0lBQ1YxRSxVQUFVLEVBQUVBO0VBREY7QUFwSEksQ0FBbEI7QUF5SEEyRSxNQUFNLENBQUNDLE9BQVAsR0FBaUIxQyxXQUFqQiJ9
},{}]},{},[1])
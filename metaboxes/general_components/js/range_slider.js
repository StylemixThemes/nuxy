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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfdnVlUmFuZ2VTbGlkZXIiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsIm9iaiIsIl9fZXNNb2R1bGUiLCJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJ2YWx1ZSIsIm1pbiIsIm1heCIsInN0ZXAiLCJjb21wb25lbnRzIiwiUmFuZ2VTbGlkZXIiLCJ0ZW1wbGF0ZSIsIm1vdW50ZWQiLCJmaWVsZF92YWx1ZSIsIldwY2Z0b0lzSnNvblN0cmluZyIsIkpTT04iLCJwYXJzZSIsImZpZWxkX2RhdGEiLCJtZXRob2RzIiwicmFuZ2VTdHlsZXMiLCJwcm9jZW50IiwibGVmdCIsImNoYW5nZSIsIndhdGNoIiwiZGVlcCIsImhhbmRsZXIiLCIkZW1pdCJdLCJzb3VyY2VzIjpbImZha2VfNTM3ODdlOWUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfdnVlUmFuZ2VTbGlkZXIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJ2dWUtcmFuZ2Utc2xpZGVyXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgXCJkZWZhdWx0XCI6IG9iaiB9OyB9XG5cblZ1ZS5jb21wb25lbnQoJ3dwY2Z0b19yYW5nZV9zbGlkZXInLCB7XG4gIHByb3BzOiBbJ2ZpZWxkcycsICdmaWVsZF9sYWJlbCcsICdmaWVsZF9uYW1lJywgJ2ZpZWxkX2lkJywgJ2ZpZWxkX3ZhbHVlJywgJ2ZpZWxkX2RhdGEnLCAnZmllbGRfZGVzY3JpcHRpb24nLCAnZmllbGRfaW5wdXRfYWRkb24nXSxcbiAgZGF0YTogZnVuY3Rpb24gZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IDAsXG4gICAgICBtaW46IDAsXG4gICAgICBtYXg6IDEwMCxcbiAgICAgIHN0ZXA6IDFcbiAgICB9O1xuICB9LFxuICBjb21wb25lbnRzOiB7XG4gICAgUmFuZ2VTbGlkZXI6IF92dWVSYW5nZVNsaWRlcltcImRlZmF1bHRcIl1cbiAgfSxcbiAgdGVtcGxhdGU6IFwiIFxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0b19nZW5lcmljX2ZpZWxkIHdwY2Z0b19nZW5lcmljX2ZpZWxkX3JhbmdlX3NsaWRlclxcXCIgdi1iaW5kOmNsYXNzPVxcXCJmaWVsZF9pZFxcXCI+XFxuICAgICAgICAgICAgXFxuICAgICAgICAgICAgICAgIDx3cGNmdG9fZmllbGRzX2FzaWRlX2JlZm9yZSA6ZmllbGRzPVxcXCJmaWVsZHNcXFwiIDpmaWVsZF9sYWJlbD1cXFwiZmllbGRfbGFiZWxcXFwiPjwvd3BjZnRvX2ZpZWxkc19hc2lkZV9iZWZvcmU+XFxuICAgICAgICAgICAgXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0by1maWVsZC1jb250ZW50XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0b19yYW5nZV9zbGlkZXJcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJ3cGNmdG9fcmFuZ2Vfc2xpZGVyX19waW5cXFwiIHYtaHRtbD1cXFwidmFsdWVcXFwiIHYtYmluZDpzdHlsZT1cXFwicmFuZ2VTdHlsZXMoKVxcXCI+PC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxyYW5nZS1zbGlkZXJcXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cXFwic2xpZGVyXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDptaW49XFxcIm1pblxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICA6bWF4PVxcXCJtYXhcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgOnN0ZXA9XFxcInN0ZXBcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cXFwidmFsdWVcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvcmFuZ2Utc2xpZGVyPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LWlmPVxcXCJmaWVsZF9pbnB1dF9hZGRvblxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJudW1iZXJcXFwiIEBpbnB1dD1cXFwiY2hhbmdlXFxcIiBAY2hhbmdlPVxcXCJjaGFuZ2VcXFwiIHYtbW9kZWw9XFxcInZhbHVlXFxcIiA6bWF4PVxcXCJtYXhcXFwiIGNsYXNzPVxcXCJ3cGNmdG9fcmFuZ2Vfc2xpZGVyX2N1c3RvbV9pbnB1dFxcXCIgLz5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gdi1pZj1cXFwiZmllbGRfaW5wdXRfYWRkb24ubGFiZWxcXFwiIHYtaHRtbD1cXFwiZmllbGRfaW5wdXRfYWRkb24ubGFiZWxcXFwiIGNsYXNzPVxcXCJ3cGNmdG9fZmllbGRfYWRkb25cXFwiPjwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICBcXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgXCIsXG4gIG1vdW50ZWQ6IGZ1bmN0aW9uIG1vdW50ZWQoKSB7XG4gICAgdGhpcy52YWx1ZSA9IHR5cGVvZiB0aGlzLmZpZWxkX3ZhbHVlID09PSAnc3RyaW5nJyAmJiBXcGNmdG9Jc0pzb25TdHJpbmcodGhpcy5maWVsZF92YWx1ZSkgPyBKU09OLnBhcnNlKHRoaXMuZmllbGRfdmFsdWUpIDogdGhpcy5maWVsZF92YWx1ZTtcbiAgICB0aGlzLm1pbiA9IHRoaXMuZmllbGRfZGF0YS5taW47XG4gICAgdGhpcy5tYXggPSB0aGlzLmZpZWxkX2RhdGEubWF4O1xuICAgIHRoaXMuc3RlcCA9IHRoaXMuZmllbGRfZGF0YS5zdGVwO1xuICB9LFxuICBtZXRob2RzOiB7XG4gICAgcmFuZ2VTdHlsZXM6IGZ1bmN0aW9uIHJhbmdlU3R5bGVzKCkge1xuICAgICAgdmFyIHByb2NlbnQgPSAodGhpcy5tYXggLSB0aGlzLm1pbikgLyAxMDA7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsZWZ0OiAodGhpcy52YWx1ZSAtIHRoaXMubWluKSAqIDEwMCAvICh0aGlzLm1heCAtIHRoaXMubWluKSArICclJ1xuICAgICAgfTtcbiAgICB9LFxuICAgIGNoYW5nZTogZnVuY3Rpb24gY2hhbmdlKCkge1xuICAgICAgaWYgKHRoaXMudmFsdWUgPiAyMDApIHRoaXMudmFsdWUgPSAyMDA7XG4gICAgfVxuICB9LFxuICB3YXRjaDoge1xuICAgIHZhbHVlOiB7XG4gICAgICBkZWVwOiB0cnVlLFxuICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcih2YWx1ZSkge1xuICAgICAgICB0aGlzLiRlbWl0KCd3cGNmdG8tZ2V0LXZhbHVlJywgdmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufSk7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQSxJQUFJQSxlQUFlLEdBQUdDLHNCQUFzQixDQUFDQyxPQUFPLENBQUMsa0JBQUQsQ0FBUixDQUE1Qzs7QUFFQSxTQUFTRCxzQkFBVCxDQUFnQ0UsR0FBaEMsRUFBcUM7RUFBRSxPQUFPQSxHQUFHLElBQUlBLEdBQUcsQ0FBQ0MsVUFBWCxHQUF3QkQsR0FBeEIsR0FBOEI7SUFBRSxXQUFXQTtFQUFiLENBQXJDO0FBQTBEOztBQUVqR0UsR0FBRyxDQUFDQyxTQUFKLENBQWMscUJBQWQsRUFBcUM7RUFDbkNDLEtBQUssRUFBRSxDQUFDLFFBQUQsRUFBVyxhQUFYLEVBQTBCLFlBQTFCLEVBQXdDLFVBQXhDLEVBQW9ELGFBQXBELEVBQW1FLFlBQW5FLEVBQWlGLG1CQUFqRixFQUFzRyxtQkFBdEcsQ0FENEI7RUFFbkNDLElBQUksRUFBRSxTQUFTQSxJQUFULEdBQWdCO0lBQ3BCLE9BQU87TUFDTEMsS0FBSyxFQUFFLENBREY7TUFFTEMsR0FBRyxFQUFFLENBRkE7TUFHTEMsR0FBRyxFQUFFLEdBSEE7TUFJTEMsSUFBSSxFQUFFO0lBSkQsQ0FBUDtFQU1ELENBVGtDO0VBVW5DQyxVQUFVLEVBQUU7SUFDVkMsV0FBVyxFQUFFZCxlQUFlLENBQUMsU0FBRDtFQURsQixDQVZ1QjtFQWFuQ2UsUUFBUSxFQUFFLGl3Q0FieUI7RUFjbkNDLE9BQU8sRUFBRSxTQUFTQSxPQUFULEdBQW1CO0lBQzFCLEtBQUtQLEtBQUwsR0FBYSxPQUFPLEtBQUtRLFdBQVosS0FBNEIsUUFBNUIsSUFBd0NDLGtCQUFrQixDQUFDLEtBQUtELFdBQU4sQ0FBMUQsR0FBK0VFLElBQUksQ0FBQ0MsS0FBTCxDQUFXLEtBQUtILFdBQWhCLENBQS9FLEdBQThHLEtBQUtBLFdBQWhJO0lBQ0EsS0FBS1AsR0FBTCxHQUFXLEtBQUtXLFVBQUwsQ0FBZ0JYLEdBQTNCO0lBQ0EsS0FBS0MsR0FBTCxHQUFXLEtBQUtVLFVBQUwsQ0FBZ0JWLEdBQTNCO0lBQ0EsS0FBS0MsSUFBTCxHQUFZLEtBQUtTLFVBQUwsQ0FBZ0JULElBQTVCO0VBQ0QsQ0FuQmtDO0VBb0JuQ1UsT0FBTyxFQUFFO0lBQ1BDLFdBQVcsRUFBRSxTQUFTQSxXQUFULEdBQXVCO01BQ2xDLElBQUlDLE9BQU8sR0FBRyxDQUFDLEtBQUtiLEdBQUwsR0FBVyxLQUFLRCxHQUFqQixJQUF3QixHQUF0QztNQUNBLE9BQU87UUFDTGUsSUFBSSxFQUFFLENBQUMsS0FBS2hCLEtBQUwsR0FBYSxLQUFLQyxHQUFuQixJQUEwQixHQUExQixJQUFpQyxLQUFLQyxHQUFMLEdBQVcsS0FBS0QsR0FBakQsSUFBd0Q7TUFEekQsQ0FBUDtJQUdELENBTk07SUFPUGdCLE1BQU0sRUFBRSxTQUFTQSxNQUFULEdBQWtCO01BQ3hCLElBQUksS0FBS2pCLEtBQUwsR0FBYSxHQUFqQixFQUFzQixLQUFLQSxLQUFMLEdBQWEsR0FBYjtJQUN2QjtFQVRNLENBcEIwQjtFQStCbkNrQixLQUFLLEVBQUU7SUFDTGxCLEtBQUssRUFBRTtNQUNMbUIsSUFBSSxFQUFFLElBREQ7TUFFTEMsT0FBTyxFQUFFLFNBQVNBLE9BQVQsQ0FBaUJwQixLQUFqQixFQUF3QjtRQUMvQixLQUFLcUIsS0FBTCxDQUFXLGtCQUFYLEVBQStCckIsS0FBL0I7TUFDRDtJQUpJO0VBREY7QUEvQjRCLENBQXJDIn0=
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
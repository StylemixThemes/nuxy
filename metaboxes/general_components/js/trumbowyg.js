(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Vue.component('vue-trumbowyg', VueTrumbowyg["default"]);
Vue.component('wpcfto_trumbowyg', {
  props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value'],
  data: function data() {
    return {
      value: '',
      content: null,
      config: {
        btns: [['viewHTML'], ['undo', 'redo'],
        // Only supported in Blink browsers
        ['formatting'], ['strong', 'em', 'del'], ['foreColor', 'backColor'], ['link'], ['insertImage'], ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'], ['unorderedList', 'orderedList'], ['horizontalRule'], ['removeformat'], ['fullscreen']]
      }
    };
  },
  template: "\n        <template>\n            <div>\n                <div class=\"wpcfto_generic_field\">\n                    <div class=\"wpcfto-field-aside\">\n                        <label v-html=\"field_label\" class=\"wpcfto-field-aside__label\"></label>\n                    </div>\n                    <div class=\"wpcfto-field-content\">\n                        <div class=\"hints\">\n                            <span @click=\"enterHint(hint_key)\" v-for=\"(hint_text, hint_key) in fields.hints\">{{hint_text}}</span>\n                        </div>\n                    </div>\n                </div>\n                <vue-trumbowyg v-model=\"value\" :config=\"config\"  class=\"form-control\" name=\"content\">\n                </vue-trumbowyg>\n            </div>\n        </template>",
  mounted: function mounted() {
    if (typeof this.field_value !== 'undefined') {
      this.$set(this, 'value', this.field_value);
    }
  },
  methods: {
    enterHint: function enterHint(hint) {
      this.value += ' {{' + hint + '}}';
    }
  },
  watch: {
    value: function value(_value) {
      this.$emit('wpcfto-get-value', _value);
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWdWUiLCJjb21wb25lbnQiLCJWdWVUcnVtYm93eWciLCJwcm9wcyIsImRhdGEiLCJ2YWx1ZSIsImNvbnRlbnQiLCJjb25maWciLCJidG5zIiwidGVtcGxhdGUiLCJtb3VudGVkIiwiZmllbGRfdmFsdWUiLCIkc2V0IiwibWV0aG9kcyIsImVudGVySGludCIsImhpbnQiLCJ3YXRjaCIsIl92YWx1ZSIsIiRlbWl0Il0sInNvdXJjZXMiOlsiZmFrZV81NDZhNjg1MC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuVnVlLmNvbXBvbmVudCgndnVlLXRydW1ib3d5ZycsIFZ1ZVRydW1ib3d5Z1tcImRlZmF1bHRcIl0pO1xuVnVlLmNvbXBvbmVudCgnd3BjZnRvX3RydW1ib3d5ZycsIHtcbiAgcHJvcHM6IFsnZmllbGRzJywgJ2ZpZWxkX2xhYmVsJywgJ2ZpZWxkX25hbWUnLCAnZmllbGRfaWQnLCAnZmllbGRfdmFsdWUnXSxcbiAgZGF0YTogZnVuY3Rpb24gZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6ICcnLFxuICAgICAgY29udGVudDogbnVsbCxcbiAgICAgIGNvbmZpZzoge1xuICAgICAgICBidG5zOiBbWyd2aWV3SFRNTCddLCBbJ3VuZG8nLCAncmVkbyddLFxuICAgICAgICAvLyBPbmx5IHN1cHBvcnRlZCBpbiBCbGluayBicm93c2Vyc1xuICAgICAgICBbJ2Zvcm1hdHRpbmcnXSwgWydzdHJvbmcnLCAnZW0nLCAnZGVsJ10sIFsnZm9yZUNvbG9yJywgJ2JhY2tDb2xvciddLCBbJ2xpbmsnXSwgWydpbnNlcnRJbWFnZSddLCBbJ2p1c3RpZnlMZWZ0JywgJ2p1c3RpZnlDZW50ZXInLCAnanVzdGlmeVJpZ2h0JywgJ2p1c3RpZnlGdWxsJ10sIFsndW5vcmRlcmVkTGlzdCcsICdvcmRlcmVkTGlzdCddLCBbJ2hvcml6b250YWxSdWxlJ10sIFsncmVtb3ZlZm9ybWF0J10sIFsnZnVsbHNjcmVlbiddXVxuICAgICAgfVxuICAgIH07XG4gIH0sXG4gIHRlbXBsYXRlOiBcIlxcbiAgICAgICAgPHRlbXBsYXRlPlxcbiAgICAgICAgICAgIDxkaXY+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0b19nZW5lcmljX2ZpZWxkXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0by1maWVsZC1hc2lkZVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIHYtaHRtbD1cXFwiZmllbGRfbGFiZWxcXFwiIGNsYXNzPVxcXCJ3cGNmdG8tZmllbGQtYXNpZGVfX2xhYmVsXFxcIj48L2xhYmVsPlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG8tZmllbGQtY29udGVudFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiaGludHNcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBAY2xpY2s9XFxcImVudGVySGludChoaW50X2tleSlcXFwiIHYtZm9yPVxcXCIoaGludF90ZXh0LCBoaW50X2tleSkgaW4gZmllbGRzLmhpbnRzXFxcIj57e2hpbnRfdGV4dH19PC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8dnVlLXRydW1ib3d5ZyB2LW1vZGVsPVxcXCJ2YWx1ZVxcXCIgOmNvbmZpZz1cXFwiY29uZmlnXFxcIiAgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgbmFtZT1cXFwiY29udGVudFxcXCI+XFxuICAgICAgICAgICAgICAgIDwvdnVlLXRydW1ib3d5Zz5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvdGVtcGxhdGU+XCIsXG4gIG1vdW50ZWQ6IGZ1bmN0aW9uIG1vdW50ZWQoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmZpZWxkX3ZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy4kc2V0KHRoaXMsICd2YWx1ZScsIHRoaXMuZmllbGRfdmFsdWUpO1xuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGVudGVySGludDogZnVuY3Rpb24gZW50ZXJIaW50KGhpbnQpIHtcbiAgICAgIHRoaXMudmFsdWUgKz0gJyB7eycgKyBoaW50ICsgJ319JztcbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKF92YWx1ZSkge1xuICAgICAgdGhpcy4kZW1pdCgnd3BjZnRvLWdldC12YWx1ZScsIF92YWx1ZSk7XG4gICAgfVxuICB9XG59KTsiXSwibWFwcGluZ3MiOiJBQUFBLFlBQVk7O0FBRVpBLEdBQUcsQ0FBQ0MsU0FBUyxDQUFDLGVBQWUsRUFBRUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3ZERixHQUFHLENBQUNDLFNBQVMsQ0FBQyxrQkFBa0IsRUFBRTtFQUNoQ0UsS0FBSyxFQUFFLENBQUMsUUFBUSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLGFBQWEsQ0FBQztFQUN6RUMsSUFBSSxFQUFFLFNBQVNBLElBQUlBLENBQUEsRUFBRztJQUNwQixPQUFPO01BQ0xDLEtBQUssRUFBRSxFQUFFO01BQ1RDLE9BQU8sRUFBRSxJQUFJO01BQ2JDLE1BQU0sRUFBRTtRQUNOQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztRQUNyQztRQUNBLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLGFBQWEsQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLGFBQWEsQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDO01BQ3pQO0lBQ0YsQ0FBQztFQUNILENBQUM7RUFDREMsUUFBUSxFQUFFLHF4QkFBcXhCO0VBQy94QkMsT0FBTyxFQUFFLFNBQVNBLE9BQU9BLENBQUEsRUFBRztJQUMxQixJQUFJLE9BQU8sSUFBSSxDQUFDQyxXQUFXLEtBQUssV0FBVyxFQUFFO01BQzNDLElBQUksQ0FBQ0MsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDRCxXQUFXLENBQUM7SUFDNUM7RUFDRixDQUFDO0VBQ0RFLE9BQU8sRUFBRTtJQUNQQyxTQUFTLEVBQUUsU0FBU0EsU0FBU0EsQ0FBQ0MsSUFBSSxFQUFFO01BQ2xDLElBQUksQ0FBQ1YsS0FBSyxJQUFJLEtBQUssR0FBR1UsSUFBSSxHQUFHLElBQUk7SUFDbkM7RUFDRixDQUFDO0VBQ0RDLEtBQUssRUFBRTtJQUNMWCxLQUFLLEVBQUUsU0FBU0EsS0FBS0EsQ0FBQ1ksTUFBTSxFQUFFO01BQzVCLElBQUksQ0FBQ0MsS0FBSyxDQUFDLGtCQUFrQixFQUFFRCxNQUFNLENBQUM7SUFDeEM7RUFDRjtBQUNGLENBQUMsQ0FBQyIsImlnbm9yZUxpc3QiOltdfQ==
},{}]},{},[1])
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var wpcfto_notice_mounted = false;
Vue.component('wpcfto_notice', {
  props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value'],
  data: function data() {
    return {
      value: '',
      mount_status: false
    };
  },
  template: "\n        <div class=\"wpcfto_generic_field wpcfto_generic_field__notice\" v-bind:class=\"field_name\" v-bind:data-notice=\"field_name\">\n            <label v-html=\"field_label\"></label>\n            <span v-if=\"fields.description\" v-html=\"fields.description\" class=\"field-description description\"></span>\n        </div>\n    ",
  mounted: function mounted() {
    if (!wpcfto_notice_mounted) {
      wpcfto_notice_mounted = true;
      Vue.nextTick(function () {
        var $ = jQuery;
        var current_notice = '';
        $('.column-1').each(function () {
          var $this = $(this);
          var $isNotice = $(this).find('.wpcfto_generic_field__notice');
          if ($isNotice.length) {
            current_notice = $isNotice.attr('data-notice');
            $this.attr('data-main', current_notice);
          } else {
            $this.addClass(current_notice).addClass('wpcfto_notice_visiblity');
          }
        });
        $('.wpcfto_generic_field__notice').on('click', function () {
          $('.wpcfto_generic_field__notice, .wpcfto_notice_visiblity').removeClass('opened');
          $('.' + $(this).data('notice')).toggleClass('opened');
        });
      });
    }
  },
  methods: {},
  watch: {
    value: function value(_value) {}
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ3cGNmdG9fbm90aWNlX21vdW50ZWQiLCJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJ2YWx1ZSIsIm1vdW50X3N0YXR1cyIsInRlbXBsYXRlIiwibW91bnRlZCIsIm5leHRUaWNrIiwiJCIsImpRdWVyeSIsImN1cnJlbnRfbm90aWNlIiwiZWFjaCIsIiR0aGlzIiwiJGlzTm90aWNlIiwiZmluZCIsImxlbmd0aCIsImF0dHIiLCJhZGRDbGFzcyIsIm9uIiwicmVtb3ZlQ2xhc3MiLCJ0b2dnbGVDbGFzcyIsIm1ldGhvZHMiLCJ3YXRjaCIsIl92YWx1ZSJdLCJzb3VyY2VzIjpbImZha2VfZDZmNDM1NTUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciB3cGNmdG9fbm90aWNlX21vdW50ZWQgPSBmYWxzZTtcblZ1ZS5jb21wb25lbnQoJ3dwY2Z0b19ub3RpY2UnLCB7XG4gIHByb3BzOiBbJ2ZpZWxkcycsICdmaWVsZF9sYWJlbCcsICdmaWVsZF9uYW1lJywgJ2ZpZWxkX2lkJywgJ2ZpZWxkX3ZhbHVlJ10sXG4gIGRhdGE6IGZ1bmN0aW9uIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiAnJyxcbiAgICAgIG1vdW50X3N0YXR1czogZmFsc2VcbiAgICB9O1xuICB9LFxuICB0ZW1wbGF0ZTogXCJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0b19nZW5lcmljX2ZpZWxkIHdwY2Z0b19nZW5lcmljX2ZpZWxkX19ub3RpY2VcXFwiIHYtYmluZDpjbGFzcz1cXFwiZmllbGRfbmFtZVxcXCIgdi1iaW5kOmRhdGEtbm90aWNlPVxcXCJmaWVsZF9uYW1lXFxcIj5cXG4gICAgICAgICAgICA8bGFiZWwgdi1odG1sPVxcXCJmaWVsZF9sYWJlbFxcXCI+PC9sYWJlbD5cXG4gICAgICAgICAgICA8c3BhbiB2LWlmPVxcXCJmaWVsZHMuZGVzY3JpcHRpb25cXFwiIHYtaHRtbD1cXFwiZmllbGRzLmRlc2NyaXB0aW9uXFxcIiBjbGFzcz1cXFwiZmllbGQtZGVzY3JpcHRpb24gZGVzY3JpcHRpb25cXFwiPjwvc3Bhbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICBcIixcbiAgbW91bnRlZDogZnVuY3Rpb24gbW91bnRlZCgpIHtcbiAgICBpZiAoIXdwY2Z0b19ub3RpY2VfbW91bnRlZCkge1xuICAgICAgd3BjZnRvX25vdGljZV9tb3VudGVkID0gdHJ1ZTtcbiAgICAgIFZ1ZS5uZXh0VGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkID0galF1ZXJ5O1xuICAgICAgICB2YXIgY3VycmVudF9ub3RpY2UgPSAnJztcbiAgICAgICAgJCgnLmNvbHVtbi0xJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgICB2YXIgJGlzTm90aWNlID0gJCh0aGlzKS5maW5kKCcud3BjZnRvX2dlbmVyaWNfZmllbGRfX25vdGljZScpO1xuICAgICAgICAgIGlmICgkaXNOb3RpY2UubGVuZ3RoKSB7XG4gICAgICAgICAgICBjdXJyZW50X25vdGljZSA9ICRpc05vdGljZS5hdHRyKCdkYXRhLW5vdGljZScpO1xuICAgICAgICAgICAgJHRoaXMuYXR0cignZGF0YS1tYWluJywgY3VycmVudF9ub3RpY2UpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkdGhpcy5hZGRDbGFzcyhjdXJyZW50X25vdGljZSkuYWRkQ2xhc3MoJ3dwY2Z0b19ub3RpY2VfdmlzaWJsaXR5Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgJCgnLndwY2Z0b19nZW5lcmljX2ZpZWxkX19ub3RpY2UnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgJCgnLndwY2Z0b19nZW5lcmljX2ZpZWxkX19ub3RpY2UsIC53cGNmdG9fbm90aWNlX3Zpc2libGl0eScpLnJlbW92ZUNsYXNzKCdvcGVuZWQnKTtcbiAgICAgICAgICAkKCcuJyArICQodGhpcykuZGF0YSgnbm90aWNlJykpLnRvZ2dsZUNsYXNzKCdvcGVuZWQnKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHt9LFxuICB3YXRjaDoge1xuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShfdmFsdWUpIHt9XG4gIH1cbn0pOyJdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWTs7QUFFWixJQUFJQSxxQkFBcUIsR0FBRyxLQUFLO0FBQ2pDQyxHQUFHLENBQUNDLFNBQVMsQ0FBQyxlQUFlLEVBQUU7RUFDN0JDLEtBQUssRUFBRSxDQUFDLFFBQVEsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxhQUFhLENBQUM7RUFDekVDLElBQUksRUFBRSxTQUFTQSxJQUFJQSxDQUFBLEVBQUc7SUFDcEIsT0FBTztNQUNMQyxLQUFLLEVBQUUsRUFBRTtNQUNUQyxZQUFZLEVBQUU7SUFDaEIsQ0FBQztFQUNILENBQUM7RUFDREMsUUFBUSxFQUFFLGtWQUFrVjtFQUM1VkMsT0FBTyxFQUFFLFNBQVNBLE9BQU9BLENBQUEsRUFBRztJQUMxQixJQUFJLENBQUNSLHFCQUFxQixFQUFFO01BQzFCQSxxQkFBcUIsR0FBRyxJQUFJO01BQzVCQyxHQUFHLENBQUNRLFFBQVEsQ0FBQyxZQUFZO1FBQ3ZCLElBQUlDLENBQUMsR0FBR0MsTUFBTTtRQUNkLElBQUlDLGNBQWMsR0FBRyxFQUFFO1FBQ3ZCRixDQUFDLENBQUMsV0FBVyxDQUFDLENBQUNHLElBQUksQ0FBQyxZQUFZO1VBQzlCLElBQUlDLEtBQUssR0FBR0osQ0FBQyxDQUFDLElBQUksQ0FBQztVQUNuQixJQUFJSyxTQUFTLEdBQUdMLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQ00sSUFBSSxDQUFDLCtCQUErQixDQUFDO1VBQzdELElBQUlELFNBQVMsQ0FBQ0UsTUFBTSxFQUFFO1lBQ3BCTCxjQUFjLEdBQUdHLFNBQVMsQ0FBQ0csSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUM5Q0osS0FBSyxDQUFDSSxJQUFJLENBQUMsV0FBVyxFQUFFTixjQUFjLENBQUM7VUFDekMsQ0FBQyxNQUFNO1lBQ0xFLEtBQUssQ0FBQ0ssUUFBUSxDQUFDUCxjQUFjLENBQUMsQ0FBQ08sUUFBUSxDQUFDLHlCQUF5QixDQUFDO1VBQ3BFO1FBQ0YsQ0FBQyxDQUFDO1FBQ0ZULENBQUMsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDVSxFQUFFLENBQUMsT0FBTyxFQUFFLFlBQVk7VUFDekRWLENBQUMsQ0FBQyx5REFBeUQsQ0FBQyxDQUFDVyxXQUFXLENBQUMsUUFBUSxDQUFDO1VBQ2xGWCxDQUFDLENBQUMsR0FBRyxHQUFHQSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUNOLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDa0IsV0FBVyxDQUFDLFFBQVEsQ0FBQztRQUN2RCxDQUFDLENBQUM7TUFDSixDQUFDLENBQUM7SUFDSjtFQUNGLENBQUM7RUFDREMsT0FBTyxFQUFFLENBQUMsQ0FBQztFQUNYQyxLQUFLLEVBQUU7SUFDTG5CLEtBQUssRUFBRSxTQUFTQSxLQUFLQSxDQUFDb0IsTUFBTSxFQUFFLENBQUM7RUFDakM7QUFDRixDQUFDLENBQUMiLCJpZ25vcmVMaXN0IjpbXX0=
},{}]},{},[1])
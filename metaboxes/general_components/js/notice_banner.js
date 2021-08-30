(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var wpcfto_notice_mounted = false;
Vue.component('wpcfto_notice_banner', {
  props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value'],
  data: function data() {
    return {
      value: '',
      mount_status: false
    };
  },
  template: "\n        <div class=\"wpcfto_generic_field wpcfto_generic_field__notice_banner\" v-bind:class=\"field_name\" v-bind:data-notice=\"field_name\">\n            <label v-html=\"field_label\"></label>\n        </div>\n    ",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfNWQ5OGVkMTUuanMiXSwibmFtZXMiOlsid3BjZnRvX25vdGljZV9tb3VudGVkIiwiVnVlIiwiY29tcG9uZW50IiwicHJvcHMiLCJkYXRhIiwidmFsdWUiLCJtb3VudF9zdGF0dXMiLCJ0ZW1wbGF0ZSIsIm1vdW50ZWQiLCJuZXh0VGljayIsIiQiLCJqUXVlcnkiLCJjdXJyZW50X25vdGljZSIsImVhY2giLCIkdGhpcyIsIiRpc05vdGljZSIsImZpbmQiLCJsZW5ndGgiLCJhdHRyIiwiYWRkQ2xhc3MiLCJvbiIsInJlbW92ZUNsYXNzIiwidG9nZ2xlQ2xhc3MiLCJtZXRob2RzIiwid2F0Y2giLCJfdmFsdWUiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBLElBQUlBLHFCQUFxQixHQUFHLEtBQTVCO0FBQ0FDLEdBQUcsQ0FBQ0MsU0FBSixDQUFjLHNCQUFkLEVBQXNDO0FBQ3BDQyxFQUFBQSxLQUFLLEVBQUUsQ0FBQyxRQUFELEVBQVcsYUFBWCxFQUEwQixZQUExQixFQUF3QyxVQUF4QyxFQUFvRCxhQUFwRCxDQUQ2QjtBQUVwQ0MsRUFBQUEsSUFBSSxFQUFFLFNBQVNBLElBQVQsR0FBZ0I7QUFDcEIsV0FBTztBQUNMQyxNQUFBQSxLQUFLLEVBQUUsRUFERjtBQUVMQyxNQUFBQSxZQUFZLEVBQUU7QUFGVCxLQUFQO0FBSUQsR0FQbUM7QUFRcENDLEVBQUFBLFFBQVEsRUFBRSw0TkFSMEI7QUFTcENDLEVBQUFBLE9BQU8sRUFBRSxTQUFTQSxPQUFULEdBQW1CO0FBQzFCLFFBQUksQ0FBQ1IscUJBQUwsRUFBNEI7QUFDMUJBLE1BQUFBLHFCQUFxQixHQUFHLElBQXhCO0FBQ0FDLE1BQUFBLEdBQUcsQ0FBQ1EsUUFBSixDQUFhLFlBQVk7QUFDdkIsWUFBSUMsQ0FBQyxHQUFHQyxNQUFSO0FBQ0EsWUFBSUMsY0FBYyxHQUFHLEVBQXJCO0FBQ0FGLFFBQUFBLENBQUMsQ0FBQyxXQUFELENBQUQsQ0FBZUcsSUFBZixDQUFvQixZQUFZO0FBQzlCLGNBQUlDLEtBQUssR0FBR0osQ0FBQyxDQUFDLElBQUQsQ0FBYjtBQUNBLGNBQUlLLFNBQVMsR0FBR0wsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRTSxJQUFSLENBQWEsK0JBQWIsQ0FBaEI7O0FBRUEsY0FBSUQsU0FBUyxDQUFDRSxNQUFkLEVBQXNCO0FBQ3BCTCxZQUFBQSxjQUFjLEdBQUdHLFNBQVMsQ0FBQ0csSUFBVixDQUFlLGFBQWYsQ0FBakI7QUFDQUosWUFBQUEsS0FBSyxDQUFDSSxJQUFOLENBQVcsV0FBWCxFQUF3Qk4sY0FBeEI7QUFDRCxXQUhELE1BR087QUFDTEUsWUFBQUEsS0FBSyxDQUFDSyxRQUFOLENBQWVQLGNBQWYsRUFBK0JPLFFBQS9CLENBQXdDLHlCQUF4QztBQUNEO0FBQ0YsU0FWRDtBQVdBVCxRQUFBQSxDQUFDLENBQUMsK0JBQUQsQ0FBRCxDQUFtQ1UsRUFBbkMsQ0FBc0MsT0FBdEMsRUFBK0MsWUFBWTtBQUN6RFYsVUFBQUEsQ0FBQyxDQUFDLHlEQUFELENBQUQsQ0FBNkRXLFdBQTdELENBQXlFLFFBQXpFO0FBQ0FYLFVBQUFBLENBQUMsQ0FBQyxNQUFNQSxDQUFDLENBQUMsSUFBRCxDQUFELENBQVFOLElBQVIsQ0FBYSxRQUFiLENBQVAsQ0FBRCxDQUFnQ2tCLFdBQWhDLENBQTRDLFFBQTVDO0FBQ0QsU0FIRDtBQUlELE9BbEJEO0FBbUJEO0FBQ0YsR0FoQ21DO0FBaUNwQ0MsRUFBQUEsT0FBTyxFQUFFLEVBakMyQjtBQWtDcENDLEVBQUFBLEtBQUssRUFBRTtBQUNMbkIsSUFBQUEsS0FBSyxFQUFFLFNBQVNBLEtBQVQsQ0FBZW9CLE1BQWYsRUFBdUIsQ0FBRTtBQUQzQjtBQWxDNkIsQ0FBdEMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIHdwY2Z0b19ub3RpY2VfbW91bnRlZCA9IGZhbHNlO1xuVnVlLmNvbXBvbmVudCgnd3BjZnRvX25vdGljZV9iYW5uZXInLCB7XG4gIHByb3BzOiBbJ2ZpZWxkcycsICdmaWVsZF9sYWJlbCcsICdmaWVsZF9uYW1lJywgJ2ZpZWxkX2lkJywgJ2ZpZWxkX3ZhbHVlJ10sXG4gIGRhdGE6IGZ1bmN0aW9uIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiAnJyxcbiAgICAgIG1vdW50X3N0YXR1czogZmFsc2VcbiAgICB9O1xuICB9LFxuICB0ZW1wbGF0ZTogXCJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0b19nZW5lcmljX2ZpZWxkIHdwY2Z0b19nZW5lcmljX2ZpZWxkX19ub3RpY2VfYmFubmVyXFxcIiB2LWJpbmQ6Y2xhc3M9XFxcImZpZWxkX25hbWVcXFwiIHYtYmluZDpkYXRhLW5vdGljZT1cXFwiZmllbGRfbmFtZVxcXCI+XFxuICAgICAgICAgICAgPGxhYmVsIHYtaHRtbD1cXFwiZmllbGRfbGFiZWxcXFwiPjwvbGFiZWw+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgXCIsXG4gIG1vdW50ZWQ6IGZ1bmN0aW9uIG1vdW50ZWQoKSB7XG4gICAgaWYgKCF3cGNmdG9fbm90aWNlX21vdW50ZWQpIHtcbiAgICAgIHdwY2Z0b19ub3RpY2VfbW91bnRlZCA9IHRydWU7XG4gICAgICBWdWUubmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJCA9IGpRdWVyeTtcbiAgICAgICAgdmFyIGN1cnJlbnRfbm90aWNlID0gJyc7XG4gICAgICAgICQoJy5jb2x1bW4tMScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgICAgdmFyICRpc05vdGljZSA9ICQodGhpcykuZmluZCgnLndwY2Z0b19nZW5lcmljX2ZpZWxkX19ub3RpY2UnKTtcblxuICAgICAgICAgIGlmICgkaXNOb3RpY2UubGVuZ3RoKSB7XG4gICAgICAgICAgICBjdXJyZW50X25vdGljZSA9ICRpc05vdGljZS5hdHRyKCdkYXRhLW5vdGljZScpO1xuICAgICAgICAgICAgJHRoaXMuYXR0cignZGF0YS1tYWluJywgY3VycmVudF9ub3RpY2UpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkdGhpcy5hZGRDbGFzcyhjdXJyZW50X25vdGljZSkuYWRkQ2xhc3MoJ3dwY2Z0b19ub3RpY2VfdmlzaWJsaXR5Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgJCgnLndwY2Z0b19nZW5lcmljX2ZpZWxkX19ub3RpY2UnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgJCgnLndwY2Z0b19nZW5lcmljX2ZpZWxkX19ub3RpY2UsIC53cGNmdG9fbm90aWNlX3Zpc2libGl0eScpLnJlbW92ZUNsYXNzKCdvcGVuZWQnKTtcbiAgICAgICAgICAkKCcuJyArICQodGhpcykuZGF0YSgnbm90aWNlJykpLnRvZ2dsZUNsYXNzKCdvcGVuZWQnKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHt9LFxuICB3YXRjaDoge1xuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShfdmFsdWUpIHt9XG4gIH1cbn0pOyJdfQ==
},{}]},{},[1])
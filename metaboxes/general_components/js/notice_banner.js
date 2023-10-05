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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ3cGNmdG9fbm90aWNlX21vdW50ZWQiLCJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJ2YWx1ZSIsIm1vdW50X3N0YXR1cyIsInRlbXBsYXRlIiwibW91bnRlZCIsIm5leHRUaWNrIiwiJCIsImpRdWVyeSIsImN1cnJlbnRfbm90aWNlIiwiZWFjaCIsIiR0aGlzIiwiJGlzTm90aWNlIiwiZmluZCIsImxlbmd0aCIsImF0dHIiLCJhZGRDbGFzcyIsIm9uIiwicmVtb3ZlQ2xhc3MiLCJ0b2dnbGVDbGFzcyIsIm1ldGhvZHMiLCJ3YXRjaCIsIl92YWx1ZSJdLCJzb3VyY2VzIjpbImZha2VfYTAxMTBmZWUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciB3cGNmdG9fbm90aWNlX21vdW50ZWQgPSBmYWxzZTtcblZ1ZS5jb21wb25lbnQoJ3dwY2Z0b19ub3RpY2VfYmFubmVyJywge1xuICBwcm9wczogWydmaWVsZHMnLCAnZmllbGRfbGFiZWwnLCAnZmllbGRfbmFtZScsICdmaWVsZF9pZCcsICdmaWVsZF92YWx1ZSddLFxuICBkYXRhOiBmdW5jdGlvbiBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogJycsXG4gICAgICBtb3VudF9zdGF0dXM6IGZhbHNlXG4gICAgfTtcbiAgfSxcbiAgdGVtcGxhdGU6IFwiXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9fZ2VuZXJpY19maWVsZCB3cGNmdG9fZ2VuZXJpY19maWVsZF9fbm90aWNlX2Jhbm5lclxcXCIgdi1iaW5kOmNsYXNzPVxcXCJmaWVsZF9uYW1lXFxcIiB2LWJpbmQ6ZGF0YS1ub3RpY2U9XFxcImZpZWxkX25hbWVcXFwiPlxcbiAgICAgICAgICAgIDxsYWJlbCB2LWh0bWw9XFxcImZpZWxkX2xhYmVsXFxcIj48L2xhYmVsPlxcbiAgICAgICAgPC9kaXY+XFxuICAgIFwiLFxuICBtb3VudGVkOiBmdW5jdGlvbiBtb3VudGVkKCkge1xuICAgIGlmICghd3BjZnRvX25vdGljZV9tb3VudGVkKSB7XG4gICAgICB3cGNmdG9fbm90aWNlX21vdW50ZWQgPSB0cnVlO1xuICAgICAgVnVlLm5leHRUaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICQgPSBqUXVlcnk7XG4gICAgICAgIHZhciBjdXJyZW50X25vdGljZSA9ICcnO1xuICAgICAgICAkKCcuY29sdW1uLTEnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICAgIHZhciAkaXNOb3RpY2UgPSAkKHRoaXMpLmZpbmQoJy53cGNmdG9fZ2VuZXJpY19maWVsZF9fbm90aWNlJyk7XG5cbiAgICAgICAgICBpZiAoJGlzTm90aWNlLmxlbmd0aCkge1xuICAgICAgICAgICAgY3VycmVudF9ub3RpY2UgPSAkaXNOb3RpY2UuYXR0cignZGF0YS1ub3RpY2UnKTtcbiAgICAgICAgICAgICR0aGlzLmF0dHIoJ2RhdGEtbWFpbicsIGN1cnJlbnRfbm90aWNlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHRoaXMuYWRkQ2xhc3MoY3VycmVudF9ub3RpY2UpLmFkZENsYXNzKCd3cGNmdG9fbm90aWNlX3Zpc2libGl0eScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICQoJy53cGNmdG9fZ2VuZXJpY19maWVsZF9fbm90aWNlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICQoJy53cGNmdG9fZ2VuZXJpY19maWVsZF9fbm90aWNlLCAud3BjZnRvX25vdGljZV92aXNpYmxpdHknKS5yZW1vdmVDbGFzcygnb3BlbmVkJyk7XG4gICAgICAgICAgJCgnLicgKyAkKHRoaXMpLmRhdGEoJ25vdGljZScpKS50b2dnbGVDbGFzcygnb3BlbmVkJyk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7fSxcbiAgd2F0Y2g6IHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoX3ZhbHVlKSB7fVxuICB9XG59KTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBLElBQUlBLHFCQUFxQixHQUFHLEtBQTVCO0FBQ0FDLEdBQUcsQ0FBQ0MsU0FBSixDQUFjLHNCQUFkLEVBQXNDO0VBQ3BDQyxLQUFLLEVBQUUsQ0FBQyxRQUFELEVBQVcsYUFBWCxFQUEwQixZQUExQixFQUF3QyxVQUF4QyxFQUFvRCxhQUFwRCxDQUQ2QjtFQUVwQ0MsSUFBSSxFQUFFLFNBQVNBLElBQVQsR0FBZ0I7SUFDcEIsT0FBTztNQUNMQyxLQUFLLEVBQUUsRUFERjtNQUVMQyxZQUFZLEVBQUU7SUFGVCxDQUFQO0VBSUQsQ0FQbUM7RUFRcENDLFFBQVEsRUFBRSw0TkFSMEI7RUFTcENDLE9BQU8sRUFBRSxTQUFTQSxPQUFULEdBQW1CO0lBQzFCLElBQUksQ0FBQ1IscUJBQUwsRUFBNEI7TUFDMUJBLHFCQUFxQixHQUFHLElBQXhCO01BQ0FDLEdBQUcsQ0FBQ1EsUUFBSixDQUFhLFlBQVk7UUFDdkIsSUFBSUMsQ0FBQyxHQUFHQyxNQUFSO1FBQ0EsSUFBSUMsY0FBYyxHQUFHLEVBQXJCO1FBQ0FGLENBQUMsQ0FBQyxXQUFELENBQUQsQ0FBZUcsSUFBZixDQUFvQixZQUFZO1VBQzlCLElBQUlDLEtBQUssR0FBR0osQ0FBQyxDQUFDLElBQUQsQ0FBYjtVQUNBLElBQUlLLFNBQVMsR0FBR0wsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRTSxJQUFSLENBQWEsK0JBQWIsQ0FBaEI7O1VBRUEsSUFBSUQsU0FBUyxDQUFDRSxNQUFkLEVBQXNCO1lBQ3BCTCxjQUFjLEdBQUdHLFNBQVMsQ0FBQ0csSUFBVixDQUFlLGFBQWYsQ0FBakI7WUFDQUosS0FBSyxDQUFDSSxJQUFOLENBQVcsV0FBWCxFQUF3Qk4sY0FBeEI7VUFDRCxDQUhELE1BR087WUFDTEUsS0FBSyxDQUFDSyxRQUFOLENBQWVQLGNBQWYsRUFBK0JPLFFBQS9CLENBQXdDLHlCQUF4QztVQUNEO1FBQ0YsQ0FWRDtRQVdBVCxDQUFDLENBQUMsK0JBQUQsQ0FBRCxDQUFtQ1UsRUFBbkMsQ0FBc0MsT0FBdEMsRUFBK0MsWUFBWTtVQUN6RFYsQ0FBQyxDQUFDLHlEQUFELENBQUQsQ0FBNkRXLFdBQTdELENBQXlFLFFBQXpFO1VBQ0FYLENBQUMsQ0FBQyxNQUFNQSxDQUFDLENBQUMsSUFBRCxDQUFELENBQVFOLElBQVIsQ0FBYSxRQUFiLENBQVAsQ0FBRCxDQUFnQ2tCLFdBQWhDLENBQTRDLFFBQTVDO1FBQ0QsQ0FIRDtNQUlELENBbEJEO0lBbUJEO0VBQ0YsQ0FoQ21DO0VBaUNwQ0MsT0FBTyxFQUFFLEVBakMyQjtFQWtDcENDLEtBQUssRUFBRTtJQUNMbkIsS0FBSyxFQUFFLFNBQVNBLEtBQVQsQ0FBZW9CLE1BQWYsRUFBdUIsQ0FBRTtFQUQzQjtBQWxDNkIsQ0FBdEMifQ==
},{}]},{},[1])
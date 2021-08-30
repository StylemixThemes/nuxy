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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfYjE4OWIwMDUuanMiXSwibmFtZXMiOlsid3BjZnRvX25vdGljZV9tb3VudGVkIiwiVnVlIiwiY29tcG9uZW50IiwicHJvcHMiLCJkYXRhIiwidmFsdWUiLCJtb3VudF9zdGF0dXMiLCJ0ZW1wbGF0ZSIsIm1vdW50ZWQiLCJuZXh0VGljayIsIiQiLCJqUXVlcnkiLCJjdXJyZW50X25vdGljZSIsImVhY2giLCIkdGhpcyIsIiRpc05vdGljZSIsImZpbmQiLCJsZW5ndGgiLCJhdHRyIiwiYWRkQ2xhc3MiLCJvbiIsInJlbW92ZUNsYXNzIiwidG9nZ2xlQ2xhc3MiLCJtZXRob2RzIiwid2F0Y2giLCJfdmFsdWUiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBLElBQUlBLHFCQUFxQixHQUFHLEtBQTVCO0FBQ0FDLEdBQUcsQ0FBQ0MsU0FBSixDQUFjLGVBQWQsRUFBK0I7QUFDN0JDLEVBQUFBLEtBQUssRUFBRSxDQUFDLFFBQUQsRUFBVyxhQUFYLEVBQTBCLFlBQTFCLEVBQXdDLFVBQXhDLEVBQW9ELGFBQXBELENBRHNCO0FBRTdCQyxFQUFBQSxJQUFJLEVBQUUsU0FBU0EsSUFBVCxHQUFnQjtBQUNwQixXQUFPO0FBQ0xDLE1BQUFBLEtBQUssRUFBRSxFQURGO0FBRUxDLE1BQUFBLFlBQVksRUFBRTtBQUZULEtBQVA7QUFJRCxHQVA0QjtBQVE3QkMsRUFBQUEsUUFBUSxFQUFFLGtWQVJtQjtBQVM3QkMsRUFBQUEsT0FBTyxFQUFFLFNBQVNBLE9BQVQsR0FBbUI7QUFDMUIsUUFBSSxDQUFDUixxQkFBTCxFQUE0QjtBQUMxQkEsTUFBQUEscUJBQXFCLEdBQUcsSUFBeEI7QUFDQUMsTUFBQUEsR0FBRyxDQUFDUSxRQUFKLENBQWEsWUFBWTtBQUN2QixZQUFJQyxDQUFDLEdBQUdDLE1BQVI7QUFDQSxZQUFJQyxjQUFjLEdBQUcsRUFBckI7QUFDQUYsUUFBQUEsQ0FBQyxDQUFDLFdBQUQsQ0FBRCxDQUFlRyxJQUFmLENBQW9CLFlBQVk7QUFDOUIsY0FBSUMsS0FBSyxHQUFHSixDQUFDLENBQUMsSUFBRCxDQUFiO0FBQ0EsY0FBSUssU0FBUyxHQUFHTCxDQUFDLENBQUMsSUFBRCxDQUFELENBQVFNLElBQVIsQ0FBYSwrQkFBYixDQUFoQjs7QUFFQSxjQUFJRCxTQUFTLENBQUNFLE1BQWQsRUFBc0I7QUFDcEJMLFlBQUFBLGNBQWMsR0FBR0csU0FBUyxDQUFDRyxJQUFWLENBQWUsYUFBZixDQUFqQjtBQUNBSixZQUFBQSxLQUFLLENBQUNJLElBQU4sQ0FBVyxXQUFYLEVBQXdCTixjQUF4QjtBQUNELFdBSEQsTUFHTztBQUNMRSxZQUFBQSxLQUFLLENBQUNLLFFBQU4sQ0FBZVAsY0FBZixFQUErQk8sUUFBL0IsQ0FBd0MseUJBQXhDO0FBQ0Q7QUFDRixTQVZEO0FBV0FULFFBQUFBLENBQUMsQ0FBQywrQkFBRCxDQUFELENBQW1DVSxFQUFuQyxDQUFzQyxPQUF0QyxFQUErQyxZQUFZO0FBQ3pEVixVQUFBQSxDQUFDLENBQUMseURBQUQsQ0FBRCxDQUE2RFcsV0FBN0QsQ0FBeUUsUUFBekU7QUFDQVgsVUFBQUEsQ0FBQyxDQUFDLE1BQU1BLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUU4sSUFBUixDQUFhLFFBQWIsQ0FBUCxDQUFELENBQWdDa0IsV0FBaEMsQ0FBNEMsUUFBNUM7QUFDRCxTQUhEO0FBSUQsT0FsQkQ7QUFtQkQ7QUFDRixHQWhDNEI7QUFpQzdCQyxFQUFBQSxPQUFPLEVBQUUsRUFqQ29CO0FBa0M3QkMsRUFBQUEsS0FBSyxFQUFFO0FBQ0xuQixJQUFBQSxLQUFLLEVBQUUsU0FBU0EsS0FBVCxDQUFlb0IsTUFBZixFQUF1QixDQUFFO0FBRDNCO0FBbENzQixDQUEvQiIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgd3BjZnRvX25vdGljZV9tb3VudGVkID0gZmFsc2U7XG5WdWUuY29tcG9uZW50KCd3cGNmdG9fbm90aWNlJywge1xuICBwcm9wczogWydmaWVsZHMnLCAnZmllbGRfbGFiZWwnLCAnZmllbGRfbmFtZScsICdmaWVsZF9pZCcsICdmaWVsZF92YWx1ZSddLFxuICBkYXRhOiBmdW5jdGlvbiBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogJycsXG4gICAgICBtb3VudF9zdGF0dXM6IGZhbHNlXG4gICAgfTtcbiAgfSxcbiAgdGVtcGxhdGU6IFwiXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9fZ2VuZXJpY19maWVsZCB3cGNmdG9fZ2VuZXJpY19maWVsZF9fbm90aWNlXFxcIiB2LWJpbmQ6Y2xhc3M9XFxcImZpZWxkX25hbWVcXFwiIHYtYmluZDpkYXRhLW5vdGljZT1cXFwiZmllbGRfbmFtZVxcXCI+XFxuICAgICAgICAgICAgPGxhYmVsIHYtaHRtbD1cXFwiZmllbGRfbGFiZWxcXFwiPjwvbGFiZWw+XFxuICAgICAgICAgICAgPHNwYW4gdi1pZj1cXFwiZmllbGRzLmRlc2NyaXB0aW9uXFxcIiB2LWh0bWw9XFxcImZpZWxkcy5kZXNjcmlwdGlvblxcXCIgY2xhc3M9XFxcImZpZWxkLWRlc2NyaXB0aW9uIGRlc2NyaXB0aW9uXFxcIj48L3NwYW4+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgXCIsXG4gIG1vdW50ZWQ6IGZ1bmN0aW9uIG1vdW50ZWQoKSB7XG4gICAgaWYgKCF3cGNmdG9fbm90aWNlX21vdW50ZWQpIHtcbiAgICAgIHdwY2Z0b19ub3RpY2VfbW91bnRlZCA9IHRydWU7XG4gICAgICBWdWUubmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJCA9IGpRdWVyeTtcbiAgICAgICAgdmFyIGN1cnJlbnRfbm90aWNlID0gJyc7XG4gICAgICAgICQoJy5jb2x1bW4tMScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgICAgdmFyICRpc05vdGljZSA9ICQodGhpcykuZmluZCgnLndwY2Z0b19nZW5lcmljX2ZpZWxkX19ub3RpY2UnKTtcblxuICAgICAgICAgIGlmICgkaXNOb3RpY2UubGVuZ3RoKSB7XG4gICAgICAgICAgICBjdXJyZW50X25vdGljZSA9ICRpc05vdGljZS5hdHRyKCdkYXRhLW5vdGljZScpO1xuICAgICAgICAgICAgJHRoaXMuYXR0cignZGF0YS1tYWluJywgY3VycmVudF9ub3RpY2UpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkdGhpcy5hZGRDbGFzcyhjdXJyZW50X25vdGljZSkuYWRkQ2xhc3MoJ3dwY2Z0b19ub3RpY2VfdmlzaWJsaXR5Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgJCgnLndwY2Z0b19nZW5lcmljX2ZpZWxkX19ub3RpY2UnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgJCgnLndwY2Z0b19nZW5lcmljX2ZpZWxkX19ub3RpY2UsIC53cGNmdG9fbm90aWNlX3Zpc2libGl0eScpLnJlbW92ZUNsYXNzKCdvcGVuZWQnKTtcbiAgICAgICAgICAkKCcuJyArICQodGhpcykuZGF0YSgnbm90aWNlJykpLnRvZ2dsZUNsYXNzKCdvcGVuZWQnKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHt9LFxuICB3YXRjaDoge1xuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShfdmFsdWUpIHt9XG4gIH1cbn0pOyJdfQ==
},{}]},{},[1])
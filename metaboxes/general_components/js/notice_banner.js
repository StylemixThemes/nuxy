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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ3cGNmdG9fbm90aWNlX21vdW50ZWQiLCJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJ2YWx1ZSIsIm1vdW50X3N0YXR1cyIsInRlbXBsYXRlIiwibW91bnRlZCIsIm5leHRUaWNrIiwiJCIsImpRdWVyeSIsImN1cnJlbnRfbm90aWNlIiwiZWFjaCIsIiR0aGlzIiwiJGlzTm90aWNlIiwiZmluZCIsImxlbmd0aCIsImF0dHIiLCJhZGRDbGFzcyIsIm9uIiwicmVtb3ZlQ2xhc3MiLCJ0b2dnbGVDbGFzcyIsIm1ldGhvZHMiLCJ3YXRjaCIsIl92YWx1ZSJdLCJzb3VyY2VzIjpbImZha2VfZTYwZWVkNy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIHdwY2Z0b19ub3RpY2VfbW91bnRlZCA9IGZhbHNlO1xuVnVlLmNvbXBvbmVudCgnd3BjZnRvX25vdGljZV9iYW5uZXInLCB7XG4gIHByb3BzOiBbJ2ZpZWxkcycsICdmaWVsZF9sYWJlbCcsICdmaWVsZF9uYW1lJywgJ2ZpZWxkX2lkJywgJ2ZpZWxkX3ZhbHVlJ10sXG4gIGRhdGE6IGZ1bmN0aW9uIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiAnJyxcbiAgICAgIG1vdW50X3N0YXR1czogZmFsc2VcbiAgICB9O1xuICB9LFxuICB0ZW1wbGF0ZTogXCJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0b19nZW5lcmljX2ZpZWxkIHdwY2Z0b19nZW5lcmljX2ZpZWxkX19ub3RpY2VfYmFubmVyXFxcIiB2LWJpbmQ6Y2xhc3M9XFxcImZpZWxkX25hbWVcXFwiIHYtYmluZDpkYXRhLW5vdGljZT1cXFwiZmllbGRfbmFtZVxcXCI+XFxuICAgICAgICAgICAgPGxhYmVsIHYtaHRtbD1cXFwiZmllbGRfbGFiZWxcXFwiPjwvbGFiZWw+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgXCIsXG4gIG1vdW50ZWQ6IGZ1bmN0aW9uIG1vdW50ZWQoKSB7XG4gICAgaWYgKCF3cGNmdG9fbm90aWNlX21vdW50ZWQpIHtcbiAgICAgIHdwY2Z0b19ub3RpY2VfbW91bnRlZCA9IHRydWU7XG4gICAgICBWdWUubmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJCA9IGpRdWVyeTtcbiAgICAgICAgdmFyIGN1cnJlbnRfbm90aWNlID0gJyc7XG4gICAgICAgICQoJy5jb2x1bW4tMScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgICAgdmFyICRpc05vdGljZSA9ICQodGhpcykuZmluZCgnLndwY2Z0b19nZW5lcmljX2ZpZWxkX19ub3RpY2UnKTtcblxuICAgICAgICAgIGlmICgkaXNOb3RpY2UubGVuZ3RoKSB7XG4gICAgICAgICAgICBjdXJyZW50X25vdGljZSA9ICRpc05vdGljZS5hdHRyKCdkYXRhLW5vdGljZScpO1xuICAgICAgICAgICAgJHRoaXMuYXR0cignZGF0YS1tYWluJywgY3VycmVudF9ub3RpY2UpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkdGhpcy5hZGRDbGFzcyhjdXJyZW50X25vdGljZSkuYWRkQ2xhc3MoJ3dwY2Z0b19ub3RpY2VfdmlzaWJsaXR5Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgJCgnLndwY2Z0b19nZW5lcmljX2ZpZWxkX19ub3RpY2UnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgJCgnLndwY2Z0b19nZW5lcmljX2ZpZWxkX19ub3RpY2UsIC53cGNmdG9fbm90aWNlX3Zpc2libGl0eScpLnJlbW92ZUNsYXNzKCdvcGVuZWQnKTtcbiAgICAgICAgICAkKCcuJyArICQodGhpcykuZGF0YSgnbm90aWNlJykpLnRvZ2dsZUNsYXNzKCdvcGVuZWQnKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHt9LFxuICB3YXRjaDoge1xuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShfdmFsdWUpIHt9XG4gIH1cbn0pOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUEsSUFBSUEscUJBQXFCLEdBQUcsS0FBNUI7QUFDQUMsR0FBRyxDQUFDQyxTQUFKLENBQWMsc0JBQWQsRUFBc0M7RUFDcENDLEtBQUssRUFBRSxDQUFDLFFBQUQsRUFBVyxhQUFYLEVBQTBCLFlBQTFCLEVBQXdDLFVBQXhDLEVBQW9ELGFBQXBELENBRDZCO0VBRXBDQyxJQUFJLEVBQUUsU0FBU0EsSUFBVCxHQUFnQjtJQUNwQixPQUFPO01BQ0xDLEtBQUssRUFBRSxFQURGO01BRUxDLFlBQVksRUFBRTtJQUZULENBQVA7RUFJRCxDQVBtQztFQVFwQ0MsUUFBUSxFQUFFLDROQVIwQjtFQVNwQ0MsT0FBTyxFQUFFLFNBQVNBLE9BQVQsR0FBbUI7SUFDMUIsSUFBSSxDQUFDUixxQkFBTCxFQUE0QjtNQUMxQkEscUJBQXFCLEdBQUcsSUFBeEI7TUFDQUMsR0FBRyxDQUFDUSxRQUFKLENBQWEsWUFBWTtRQUN2QixJQUFJQyxDQUFDLEdBQUdDLE1BQVI7UUFDQSxJQUFJQyxjQUFjLEdBQUcsRUFBckI7UUFDQUYsQ0FBQyxDQUFDLFdBQUQsQ0FBRCxDQUFlRyxJQUFmLENBQW9CLFlBQVk7VUFDOUIsSUFBSUMsS0FBSyxHQUFHSixDQUFDLENBQUMsSUFBRCxDQUFiO1VBQ0EsSUFBSUssU0FBUyxHQUFHTCxDQUFDLENBQUMsSUFBRCxDQUFELENBQVFNLElBQVIsQ0FBYSwrQkFBYixDQUFoQjs7VUFFQSxJQUFJRCxTQUFTLENBQUNFLE1BQWQsRUFBc0I7WUFDcEJMLGNBQWMsR0FBR0csU0FBUyxDQUFDRyxJQUFWLENBQWUsYUFBZixDQUFqQjtZQUNBSixLQUFLLENBQUNJLElBQU4sQ0FBVyxXQUFYLEVBQXdCTixjQUF4QjtVQUNELENBSEQsTUFHTztZQUNMRSxLQUFLLENBQUNLLFFBQU4sQ0FBZVAsY0FBZixFQUErQk8sUUFBL0IsQ0FBd0MseUJBQXhDO1VBQ0Q7UUFDRixDQVZEO1FBV0FULENBQUMsQ0FBQywrQkFBRCxDQUFELENBQW1DVSxFQUFuQyxDQUFzQyxPQUF0QyxFQUErQyxZQUFZO1VBQ3pEVixDQUFDLENBQUMseURBQUQsQ0FBRCxDQUE2RFcsV0FBN0QsQ0FBeUUsUUFBekU7VUFDQVgsQ0FBQyxDQUFDLE1BQU1BLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUU4sSUFBUixDQUFhLFFBQWIsQ0FBUCxDQUFELENBQWdDa0IsV0FBaEMsQ0FBNEMsUUFBNUM7UUFDRCxDQUhEO01BSUQsQ0FsQkQ7SUFtQkQ7RUFDRixDQWhDbUM7RUFpQ3BDQyxPQUFPLEVBQUUsRUFqQzJCO0VBa0NwQ0MsS0FBSyxFQUFFO0lBQ0xuQixLQUFLLEVBQUUsU0FBU0EsS0FBVCxDQUFlb0IsTUFBZixFQUF1QixDQUFFO0VBRDNCO0FBbEM2QixDQUF0QyJ9
},{}]},{},[1])
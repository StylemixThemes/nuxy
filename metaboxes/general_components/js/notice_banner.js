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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ3cGNmdG9fbm90aWNlX21vdW50ZWQiLCJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJ2YWx1ZSIsIm1vdW50X3N0YXR1cyIsInRlbXBsYXRlIiwibW91bnRlZCIsIm5leHRUaWNrIiwiJCIsImpRdWVyeSIsImN1cnJlbnRfbm90aWNlIiwiZWFjaCIsIiR0aGlzIiwiJGlzTm90aWNlIiwiZmluZCIsImxlbmd0aCIsImF0dHIiLCJhZGRDbGFzcyIsIm9uIiwicmVtb3ZlQ2xhc3MiLCJ0b2dnbGVDbGFzcyIsIm1ldGhvZHMiLCJ3YXRjaCIsIl92YWx1ZSJdLCJzb3VyY2VzIjpbImZha2VfNjBjNDMyOGQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciB3cGNmdG9fbm90aWNlX21vdW50ZWQgPSBmYWxzZTtcblZ1ZS5jb21wb25lbnQoJ3dwY2Z0b19ub3RpY2VfYmFubmVyJywge1xuICBwcm9wczogWydmaWVsZHMnLCAnZmllbGRfbGFiZWwnLCAnZmllbGRfbmFtZScsICdmaWVsZF9pZCcsICdmaWVsZF92YWx1ZSddLFxuICBkYXRhOiBmdW5jdGlvbiBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogJycsXG4gICAgICBtb3VudF9zdGF0dXM6IGZhbHNlXG4gICAgfTtcbiAgfSxcbiAgdGVtcGxhdGU6IFwiXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9fZ2VuZXJpY19maWVsZCB3cGNmdG9fZ2VuZXJpY19maWVsZF9fbm90aWNlX2Jhbm5lclxcXCIgdi1iaW5kOmNsYXNzPVxcXCJmaWVsZF9uYW1lXFxcIiB2LWJpbmQ6ZGF0YS1ub3RpY2U9XFxcImZpZWxkX25hbWVcXFwiPlxcbiAgICAgICAgICAgIDxsYWJlbCB2LWh0bWw9XFxcImZpZWxkX2xhYmVsXFxcIj48L2xhYmVsPlxcbiAgICAgICAgPC9kaXY+XFxuICAgIFwiLFxuICBtb3VudGVkOiBmdW5jdGlvbiBtb3VudGVkKCkge1xuICAgIGlmICghd3BjZnRvX25vdGljZV9tb3VudGVkKSB7XG4gICAgICB3cGNmdG9fbm90aWNlX21vdW50ZWQgPSB0cnVlO1xuICAgICAgVnVlLm5leHRUaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICQgPSBqUXVlcnk7XG4gICAgICAgIHZhciBjdXJyZW50X25vdGljZSA9ICcnO1xuICAgICAgICAkKCcuY29sdW1uLTEnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICAgIHZhciAkaXNOb3RpY2UgPSAkKHRoaXMpLmZpbmQoJy53cGNmdG9fZ2VuZXJpY19maWVsZF9fbm90aWNlJyk7XG4gICAgICAgICAgaWYgKCRpc05vdGljZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGN1cnJlbnRfbm90aWNlID0gJGlzTm90aWNlLmF0dHIoJ2RhdGEtbm90aWNlJyk7XG4gICAgICAgICAgICAkdGhpcy5hdHRyKCdkYXRhLW1haW4nLCBjdXJyZW50X25vdGljZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICR0aGlzLmFkZENsYXNzKGN1cnJlbnRfbm90aWNlKS5hZGRDbGFzcygnd3BjZnRvX25vdGljZV92aXNpYmxpdHknKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAkKCcud3BjZnRvX2dlbmVyaWNfZmllbGRfX25vdGljZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkKCcud3BjZnRvX2dlbmVyaWNfZmllbGRfX25vdGljZSwgLndwY2Z0b19ub3RpY2VfdmlzaWJsaXR5JykucmVtb3ZlQ2xhc3MoJ29wZW5lZCcpO1xuICAgICAgICAgICQoJy4nICsgJCh0aGlzKS5kYXRhKCdub3RpY2UnKSkudG9nZ2xlQ2xhc3MoJ29wZW5lZCcpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge30sXG4gIHdhdGNoOiB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKF92YWx1ZSkge31cbiAgfVxufSk7Il0sIm1hcHBpbmdzIjoiQUFBQSxZQUFZOztBQUVaLElBQUlBLHFCQUFxQixHQUFHLEtBQUs7QUFDakNDLEdBQUcsQ0FBQ0MsU0FBUyxDQUFDLHNCQUFzQixFQUFFO0VBQ3BDQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsYUFBYSxDQUFDO0VBQ3pFQyxJQUFJLEVBQUUsU0FBU0EsSUFBSUEsQ0FBQSxFQUFHO0lBQ3BCLE9BQU87TUFDTEMsS0FBSyxFQUFFLEVBQUU7TUFDVEMsWUFBWSxFQUFFO0lBQ2hCLENBQUM7RUFDSCxDQUFDO0VBQ0RDLFFBQVEsRUFBRSw0TkFBNE47RUFDdE9DLE9BQU8sRUFBRSxTQUFTQSxPQUFPQSxDQUFBLEVBQUc7SUFDMUIsSUFBSSxDQUFDUixxQkFBcUIsRUFBRTtNQUMxQkEscUJBQXFCLEdBQUcsSUFBSTtNQUM1QkMsR0FBRyxDQUFDUSxRQUFRLENBQUMsWUFBWTtRQUN2QixJQUFJQyxDQUFDLEdBQUdDLE1BQU07UUFDZCxJQUFJQyxjQUFjLEdBQUcsRUFBRTtRQUN2QkYsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDRyxJQUFJLENBQUMsWUFBWTtVQUM5QixJQUFJQyxLQUFLLEdBQUdKLENBQUMsQ0FBQyxJQUFJLENBQUM7VUFDbkIsSUFBSUssU0FBUyxHQUFHTCxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUNNLElBQUksQ0FBQywrQkFBK0IsQ0FBQztVQUM3RCxJQUFJRCxTQUFTLENBQUNFLE1BQU0sRUFBRTtZQUNwQkwsY0FBYyxHQUFHRyxTQUFTLENBQUNHLElBQUksQ0FBQyxhQUFhLENBQUM7WUFDOUNKLEtBQUssQ0FBQ0ksSUFBSSxDQUFDLFdBQVcsRUFBRU4sY0FBYyxDQUFDO1VBQ3pDLENBQUMsTUFBTTtZQUNMRSxLQUFLLENBQUNLLFFBQVEsQ0FBQ1AsY0FBYyxDQUFDLENBQUNPLFFBQVEsQ0FBQyx5QkFBeUIsQ0FBQztVQUNwRTtRQUNGLENBQUMsQ0FBQztRQUNGVCxDQUFDLENBQUMsK0JBQStCLENBQUMsQ0FBQ1UsRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFZO1VBQ3pEVixDQUFDLENBQUMseURBQXlELENBQUMsQ0FBQ1csV0FBVyxDQUFDLFFBQVEsQ0FBQztVQUNsRlgsQ0FBQyxDQUFDLEdBQUcsR0FBR0EsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDTixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQ2tCLFdBQVcsQ0FBQyxRQUFRLENBQUM7UUFDdkQsQ0FBQyxDQUFDO01BQ0osQ0FBQyxDQUFDO0lBQ0o7RUFDRixDQUFDO0VBQ0RDLE9BQU8sRUFBRSxDQUFDLENBQUM7RUFDWEMsS0FBSyxFQUFFO0lBQ0xuQixLQUFLLEVBQUUsU0FBU0EsS0FBS0EsQ0FBQ29CLE1BQU0sRUFBRSxDQUFDO0VBQ2pDO0FBQ0YsQ0FBQyxDQUFDIiwiaWdub3JlTGlzdCI6W119
},{}]},{},[1])
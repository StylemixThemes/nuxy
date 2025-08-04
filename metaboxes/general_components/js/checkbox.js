(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Vue.component('wpcfto_checkbox', {
  props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value'],
  data: function data() {
    return {
      value: '',
      alwaysOn: false,
      parentObserver: null
    };
  },
  template: "\n        <div class=\"wpcfto_generic_field wpcfto_generic_checkbox\">\n        \n            <wpcfto_fields_aside_before :fields=\"fields\" :field_label=\"field_label\"></wpcfto_fields_aside_before>\n            \n            <div class=\"wpcfto-field-content\">\n                <div class=\"wpcfto-admin-checkbox\" v-bind:class=\"field_id\">\n\n               <label>\n                    <div class=\"wpcfto-admin-checkbox-wrapper\" v-bind:class=\"{'active' : value, 'is_toggle' : (typeof fields.toggle == 'undefined' || fields.toggle) }\">\n                        <div class=\"wpcfto-checkbox-switcher\"></div>\n                        <input type=\"checkbox\"\n                               :name=\"field_name\"\n                               v-bind:id=\"field_id\"\n                               :disabled=\"alwaysOn\"\n                               v-model=\"value\"/>\n                    </div>\n                </label>\n            </div>\n            </div>\n            \n            <wpcfto_fields_aside_after :fields=\"fields\"></wpcfto_fields_aside_after>\n\n        </div>\n    ",
  mounted: function mounted() {
    this.detectAlwaysOn();

    if (this.alwaysOn) {
      this.value = true;
      this.$emit('wpcfto-get-value', true);
    } else {
      this.value = this.field_value;
    }

    this.observeParentClass();
  },
  methods: {
    detectAlwaysOn: function detectAlwaysOn() {
      var parent = this.$el.parentElement;
      this.alwaysOn = !!(parent && parent.classList.contains('wpcfto-always-on'));
    },
    observeParentClass: function observeParentClass() {
      var _this = this;

      var parent = this.$el.parentElement;
      if (!parent) return;
      this.parentObserver = new MutationObserver(function () {
        var wasAlwaysOn = _this.alwaysOn;

        _this.detectAlwaysOn();

        if (_this.alwaysOn && _this.value !== true) {
          _this.value = true;

          _this.$emit('wpcfto-get-value', true);
        }

        if (!_this.alwaysOn && wasAlwaysOn) {
          _this.value = _this.field_value;

          _this.$emit('wpcfto-get-value', _this.value);
        }
      });
      this.parentObserver.observe(parent, {
        attributes: true,
        attributeFilter: ['class']
      });
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.parentObserver) {
      this.parentObserver.disconnect();
    }
  },
  watch: {
    value: function value(val) {
      if (this.alwaysOn && val !== true) {
        this.value = true;
      } else {
        this.$emit('wpcfto-get-value', val);
      }
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJ2YWx1ZSIsImFsd2F5c09uIiwicGFyZW50T2JzZXJ2ZXIiLCJ0ZW1wbGF0ZSIsIm1vdW50ZWQiLCJkZXRlY3RBbHdheXNPbiIsIiRlbWl0IiwiZmllbGRfdmFsdWUiLCJvYnNlcnZlUGFyZW50Q2xhc3MiLCJtZXRob2RzIiwicGFyZW50IiwiJGVsIiwicGFyZW50RWxlbWVudCIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiX3RoaXMiLCJNdXRhdGlvbk9ic2VydmVyIiwid2FzQWx3YXlzT24iLCJvYnNlcnZlIiwiYXR0cmlidXRlcyIsImF0dHJpYnV0ZUZpbHRlciIsImJlZm9yZURlc3Ryb3kiLCJkaXNjb25uZWN0Iiwid2F0Y2giLCJ2YWwiXSwic291cmNlcyI6WyJmYWtlX2RhM2U3MDY1LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5WdWUuY29tcG9uZW50KCd3cGNmdG9fY2hlY2tib3gnLCB7XG4gIHByb3BzOiBbJ2ZpZWxkcycsICdmaWVsZF9sYWJlbCcsICdmaWVsZF9uYW1lJywgJ2ZpZWxkX2lkJywgJ2ZpZWxkX3ZhbHVlJ10sXG4gIGRhdGE6IGZ1bmN0aW9uIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiAnJyxcbiAgICAgIGFsd2F5c09uOiBmYWxzZSxcbiAgICAgIHBhcmVudE9ic2VydmVyOiBudWxsXG4gICAgfTtcbiAgfSxcbiAgdGVtcGxhdGU6IFwiXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9fZ2VuZXJpY19maWVsZCB3cGNmdG9fZ2VuZXJpY19jaGVja2JveFxcXCI+XFxuICAgICAgICBcXG4gICAgICAgICAgICA8d3BjZnRvX2ZpZWxkc19hc2lkZV9iZWZvcmUgOmZpZWxkcz1cXFwiZmllbGRzXFxcIiA6ZmllbGRfbGFiZWw9XFxcImZpZWxkX2xhYmVsXFxcIj48L3dwY2Z0b19maWVsZHNfYXNpZGVfYmVmb3JlPlxcbiAgICAgICAgICAgIFxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0by1maWVsZC1jb250ZW50XFxcIj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvLWFkbWluLWNoZWNrYm94XFxcIiB2LWJpbmQ6Y2xhc3M9XFxcImZpZWxkX2lkXFxcIj5cXG5cXG4gICAgICAgICAgICAgICA8bGFiZWw+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG8tYWRtaW4tY2hlY2tib3gtd3JhcHBlclxcXCIgdi1iaW5kOmNsYXNzPVxcXCJ7J2FjdGl2ZScgOiB2YWx1ZSwgJ2lzX3RvZ2dsZScgOiAodHlwZW9mIGZpZWxkcy50b2dnbGUgPT0gJ3VuZGVmaW5lZCcgfHwgZmllbGRzLnRvZ2dsZSkgfVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvLWNoZWNrYm94LXN3aXRjaGVyXFxcIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwiY2hlY2tib3hcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpuYW1lPVxcXCJmaWVsZF9uYW1lXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6aWQ9XFxcImZpZWxkX2lkXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ZGlzYWJsZWQ9XFxcImFsd2F5c09uXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVxcXCJ2YWx1ZVxcXCIvPlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgXFxuICAgICAgICAgICAgPHdwY2Z0b19maWVsZHNfYXNpZGVfYWZ0ZXIgOmZpZWxkcz1cXFwiZmllbGRzXFxcIj48L3dwY2Z0b19maWVsZHNfYXNpZGVfYWZ0ZXI+XFxuXFxuICAgICAgICA8L2Rpdj5cXG4gICAgXCIsXG4gIG1vdW50ZWQ6IGZ1bmN0aW9uIG1vdW50ZWQoKSB7XG4gICAgdGhpcy5kZXRlY3RBbHdheXNPbigpO1xuXG4gICAgaWYgKHRoaXMuYWx3YXlzT24pIHtcbiAgICAgIHRoaXMudmFsdWUgPSB0cnVlO1xuICAgICAgdGhpcy4kZW1pdCgnd3BjZnRvLWdldC12YWx1ZScsIHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5maWVsZF92YWx1ZTtcbiAgICB9XG5cbiAgICB0aGlzLm9ic2VydmVQYXJlbnRDbGFzcygpO1xuICB9LFxuICBtZXRob2RzOiB7XG4gICAgZGV0ZWN0QWx3YXlzT246IGZ1bmN0aW9uIGRldGVjdEFsd2F5c09uKCkge1xuICAgICAgdmFyIHBhcmVudCA9IHRoaXMuJGVsLnBhcmVudEVsZW1lbnQ7XG4gICAgICB0aGlzLmFsd2F5c09uID0gISEocGFyZW50ICYmIHBhcmVudC5jbGFzc0xpc3QuY29udGFpbnMoJ3dwY2Z0by1hbHdheXMtb24nKSk7XG4gICAgfSxcbiAgICBvYnNlcnZlUGFyZW50Q2xhc3M6IGZ1bmN0aW9uIG9ic2VydmVQYXJlbnRDbGFzcygpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHZhciBwYXJlbnQgPSB0aGlzLiRlbC5wYXJlbnRFbGVtZW50O1xuICAgICAgaWYgKCFwYXJlbnQpIHJldHVybjtcbiAgICAgIHRoaXMucGFyZW50T2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB3YXNBbHdheXNPbiA9IF90aGlzLmFsd2F5c09uO1xuXG4gICAgICAgIF90aGlzLmRldGVjdEFsd2F5c09uKCk7XG5cbiAgICAgICAgaWYgKF90aGlzLmFsd2F5c09uICYmIF90aGlzLnZhbHVlICE9PSB0cnVlKSB7XG4gICAgICAgICAgX3RoaXMudmFsdWUgPSB0cnVlO1xuXG4gICAgICAgICAgX3RoaXMuJGVtaXQoJ3dwY2Z0by1nZXQtdmFsdWUnLCB0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghX3RoaXMuYWx3YXlzT24gJiYgd2FzQWx3YXlzT24pIHtcbiAgICAgICAgICBfdGhpcy52YWx1ZSA9IF90aGlzLmZpZWxkX3ZhbHVlO1xuXG4gICAgICAgICAgX3RoaXMuJGVtaXQoJ3dwY2Z0by1nZXQtdmFsdWUnLCBfdGhpcy52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdGhpcy5wYXJlbnRPYnNlcnZlci5vYnNlcnZlKHBhcmVudCwge1xuICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgICAgICBhdHRyaWJ1dGVGaWx0ZXI6IFsnY2xhc3MnXVxuICAgICAgfSk7XG4gICAgfVxuICB9LFxuICBiZWZvcmVEZXN0cm95OiBmdW5jdGlvbiBiZWZvcmVEZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnBhcmVudE9ic2VydmVyKSB7XG4gICAgICB0aGlzLnBhcmVudE9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKHZhbCkge1xuICAgICAgaWYgKHRoaXMuYWx3YXlzT24gJiYgdmFsICE9PSB0cnVlKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy4kZW1pdCgnd3BjZnRvLWdldC12YWx1ZScsIHZhbCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59KTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBQSxHQUFHLENBQUNDLFNBQUosQ0FBYyxpQkFBZCxFQUFpQztFQUMvQkMsS0FBSyxFQUFFLENBQUMsUUFBRCxFQUFXLGFBQVgsRUFBMEIsWUFBMUIsRUFBd0MsVUFBeEMsRUFBb0QsYUFBcEQsQ0FEd0I7RUFFL0JDLElBQUksRUFBRSxTQUFTQSxJQUFULEdBQWdCO0lBQ3BC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
},{}]},{},[1])
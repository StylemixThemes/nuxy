(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Vue.component('wpcfto_image', {
  props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value', 'placeholder_text', 'upload_text', 'replace_text', 'remove_text'],
  mixins: [wpcfto_get_image_mixin],
  data: function data() {
    return {
      value: '',
      media_modal: '',
      image_url: ''
    };
  },
  mounted: function mounted() {
    var vm = this;
    vm.value = vm.field_value;
  },
  template: "\n        <div class=\"wpcfto_generic_field wpcfto_generic_field_image\">\n\n            <wpcfto_fields_aside_before :fields=\"fields\" :field_label=\"field_label\"></wpcfto_fields_aside_before>\n\n            <div class=\"wpcfto-field-content\" v-bind:class=\"{'not_image' : (image_url && !wpcfto_checkURL(image_url))}\">\n                <div class=\"wpcfto-image\" :class=\"{ 'has-image' : image_url && wpcfto_checkURL(image_url) }\">\n                    <input type=\"text\" v-model=\"image_url\" class=\"wpcfto-input-url\" readonly\n                    v-bind:placeholder=\"fields.placeholder ? fields.placeholder : placeholder_text\" />\n    \n                    <div class=\"image-field\" v-if=\"image_url && wpcfto_checkURL(image_url)\">\n                        <img v-bind:src=\"image_url\" v-if=\"wpcfto_checkURL(image_url)\"/>\n                    </div>\n                    <div class=\"actions\">\n                        <div class=\"button\" v-if=\"!image_url || !wpcfto_checkURL(image_url)\" @click=\"addImage()\">\n                            <i class=\"fa fa-upload\"></i>{{ upload_text }}\n                        </div>\n                        <div class=\"button\" v-if=\"image_url && wpcfto_checkURL(image_url)\" @click=\"addImage()\">\n                        <i class=\"fa fa-upload\"></i>{{ replace_text }}\n                        </div>\n                        <div class=\"button button-remove\" v-if=\"image_url\" @click=\"removeImage()\">\n                            <i class=\"fa fa-times\"></i>{{ remove_text }}\n                        </div>\n                    </div>\n                </div>\n    \n    \n                <input type=\"hidden\"\n                       v-bind:name=\"field_name\"\n                       v-model=\"value\" />\n                       \n           </div>\n\n            <wpcfto_fields_aside_after :fields=\"fields\"></wpcfto_fields_aside_after>\n\n        </div>\n    ",
  methods: {
    addImage: function addImage() {
      this.media_modal = wp.media({
        frame: 'select',
        multiple: false,
        editing: true
      });
      this.media_modal.on('select', function (value) {
        var attachment = this.media_modal.state().get('selection').first().toJSON();
        this.value = attachment.id;
        this.image_url = attachment.url;
      }, this);
      this.media_modal.open();
    },
    removeImage: function removeImage() {
      this.value = this.image_url = '';
    }
  },
  watch: {
    value: function value(_value) {
      this.$emit('wpcfto-get-value', _value);
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsIm1peGlucyIsIndwY2Z0b19nZXRfaW1hZ2VfbWl4aW4iLCJkYXRhIiwidmFsdWUiLCJtZWRpYV9tb2RhbCIsImltYWdlX3VybCIsIm1vdW50ZWQiLCJ2bSIsImZpZWxkX3ZhbHVlIiwidGVtcGxhdGUiLCJtZXRob2RzIiwiYWRkSW1hZ2UiLCJ3cCIsIm1lZGlhIiwiZnJhbWUiLCJtdWx0aXBsZSIsImVkaXRpbmciLCJvbiIsImF0dGFjaG1lbnQiLCJzdGF0ZSIsImdldCIsImZpcnN0IiwidG9KU09OIiwiaWQiLCJ1cmwiLCJvcGVuIiwicmVtb3ZlSW1hZ2UiLCJ3YXRjaCIsIl92YWx1ZSIsIiRlbWl0Il0sInNvdXJjZXMiOlsiZmFrZV82NDkwM2ExMi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuVnVlLmNvbXBvbmVudCgnd3BjZnRvX2ltYWdlJywge1xuICBwcm9wczogWydmaWVsZHMnLCAnZmllbGRfbGFiZWwnLCAnZmllbGRfbmFtZScsICdmaWVsZF9pZCcsICdmaWVsZF92YWx1ZScsICdwbGFjZWhvbGRlcl90ZXh0JywgJ3VwbG9hZF90ZXh0JywgJ3JlcGxhY2VfdGV4dCcsICdyZW1vdmVfdGV4dCddLFxuICBtaXhpbnM6IFt3cGNmdG9fZ2V0X2ltYWdlX21peGluXSxcbiAgZGF0YTogZnVuY3Rpb24gZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6ICcnLFxuICAgICAgbWVkaWFfbW9kYWw6ICcnLFxuICAgICAgaW1hZ2VfdXJsOiAnJ1xuICAgIH07XG4gIH0sXG4gIG1vdW50ZWQ6IGZ1bmN0aW9uIG1vdW50ZWQoKSB7XG4gICAgdmFyIHZtID0gdGhpcztcbiAgICB2bS52YWx1ZSA9IHZtLmZpZWxkX3ZhbHVlO1xuICB9LFxuICB0ZW1wbGF0ZTogXCJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0b19nZW5lcmljX2ZpZWxkIHdwY2Z0b19nZW5lcmljX2ZpZWxkX2ltYWdlXFxcIj5cXG5cXG4gICAgICAgICAgICA8d3BjZnRvX2ZpZWxkc19hc2lkZV9iZWZvcmUgOmZpZWxkcz1cXFwiZmllbGRzXFxcIiA6ZmllbGRfbGFiZWw9XFxcImZpZWxkX2xhYmVsXFxcIj48L3dwY2Z0b19maWVsZHNfYXNpZGVfYmVmb3JlPlxcblxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0by1maWVsZC1jb250ZW50XFxcIiB2LWJpbmQ6Y2xhc3M9XFxcInsnbm90X2ltYWdlJyA6IChpbWFnZV91cmwgJiYgIXdwY2Z0b19jaGVja1VSTChpbWFnZV91cmwpKX1cXFwiPlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG8taW1hZ2VcXFwiIDpjbGFzcz1cXFwieyAnaGFzLWltYWdlJyA6IGltYWdlX3VybCAmJiB3cGNmdG9fY2hlY2tVUkwoaW1hZ2VfdXJsKSB9XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiB2LW1vZGVsPVxcXCJpbWFnZV91cmxcXFwiIGNsYXNzPVxcXCJ3cGNmdG8taW5wdXQtdXJsXFxcIiByZWFkb25seVxcbiAgICAgICAgICAgICAgICAgICAgdi1iaW5kOnBsYWNlaG9sZGVyPVxcXCJmaWVsZHMucGxhY2Vob2xkZXIgPyBmaWVsZHMucGxhY2Vob2xkZXIgOiBwbGFjZWhvbGRlcl90ZXh0XFxcIiAvPlxcbiAgICBcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImltYWdlLWZpZWxkXFxcIiB2LWlmPVxcXCJpbWFnZV91cmwgJiYgd3BjZnRvX2NoZWNrVVJMKGltYWdlX3VybClcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgdi1iaW5kOnNyYz1cXFwiaW1hZ2VfdXJsXFxcIiB2LWlmPVxcXCJ3cGNmdG9fY2hlY2tVUkwoaW1hZ2VfdXJsKVxcXCIvPlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJhY3Rpb25zXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJidXR0b25cXFwiIHYtaWY9XFxcIiFpbWFnZV91cmwgfHwgIXdwY2Z0b19jaGVja1VSTChpbWFnZV91cmwpXFxcIiBAY2xpY2s9XFxcImFkZEltYWdlKClcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cXFwiZmEgZmEtdXBsb2FkXFxcIj48L2k+e3sgdXBsb2FkX3RleHQgfX1cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJidXR0b25cXFwiIHYtaWY9XFxcImltYWdlX3VybCAmJiB3cGNmdG9fY2hlY2tVUkwoaW1hZ2VfdXJsKVxcXCIgQGNsaWNrPVxcXCJhZGRJbWFnZSgpXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cXFwiZmEgZmEtdXBsb2FkXFxcIj48L2k+e3sgcmVwbGFjZV90ZXh0IH19XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYnV0dG9uIGJ1dHRvbi1yZW1vdmVcXFwiIHYtaWY9XFxcImltYWdlX3VybFxcXCIgQGNsaWNrPVxcXCJyZW1vdmVJbWFnZSgpXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XFxcImZhIGZhLXRpbWVzXFxcIj48L2k+e3sgcmVtb3ZlX3RleHQgfX1cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgXFxuICAgIFxcbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgdi1iaW5kOm5hbWU9XFxcImZpZWxkX25hbWVcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVxcXCJ2YWx1ZVxcXCIgLz5cXG4gICAgICAgICAgICAgICAgICAgICAgIFxcbiAgICAgICAgICAgPC9kaXY+XFxuXFxuICAgICAgICAgICAgPHdwY2Z0b19maWVsZHNfYXNpZGVfYWZ0ZXIgOmZpZWxkcz1cXFwiZmllbGRzXFxcIj48L3dwY2Z0b19maWVsZHNfYXNpZGVfYWZ0ZXI+XFxuXFxuICAgICAgICA8L2Rpdj5cXG4gICAgXCIsXG4gIG1ldGhvZHM6IHtcbiAgICBhZGRJbWFnZTogZnVuY3Rpb24gYWRkSW1hZ2UoKSB7XG4gICAgICB0aGlzLm1lZGlhX21vZGFsID0gd3AubWVkaWEoe1xuICAgICAgICBmcmFtZTogJ3NlbGVjdCcsXG4gICAgICAgIG11bHRpcGxlOiBmYWxzZSxcbiAgICAgICAgZWRpdGluZzogdHJ1ZVxuICAgICAgfSk7XG4gICAgICB0aGlzLm1lZGlhX21vZGFsLm9uKCdzZWxlY3QnLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIGF0dGFjaG1lbnQgPSB0aGlzLm1lZGlhX21vZGFsLnN0YXRlKCkuZ2V0KCdzZWxlY3Rpb24nKS5maXJzdCgpLnRvSlNPTigpO1xuICAgICAgICB0aGlzLnZhbHVlID0gYXR0YWNobWVudC5pZDtcbiAgICAgICAgdGhpcy5pbWFnZV91cmwgPSBhdHRhY2htZW50LnVybDtcbiAgICAgIH0sIHRoaXMpO1xuICAgICAgdGhpcy5tZWRpYV9tb2RhbC5vcGVuKCk7XG4gICAgfSxcbiAgICByZW1vdmVJbWFnZTogZnVuY3Rpb24gcmVtb3ZlSW1hZ2UoKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5pbWFnZV91cmwgPSAnJztcbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKF92YWx1ZSkge1xuICAgICAgdGhpcy4kZW1pdCgnd3BjZnRvLWdldC12YWx1ZScsIF92YWx1ZSk7XG4gICAgfVxuICB9XG59KTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBQSxHQUFHLENBQUNDLFNBQUosQ0FBYyxjQUFkLEVBQThCO0VBQzVCQyxLQUFLLEVBQUUsQ0FBQyxRQUFELEVBQVcsYUFBWCxFQUEwQixZQUExQixFQUF3QyxVQUF4QyxFQUFvRCxhQUFwRCxFQUFtRSxrQkFBbkUsRUFBdUYsYUFBdkYsRUFBc0csY0FBdEcsRUFBc0gsYUFBdEgsQ0FEcUI7RUFFNUJDLE1BQU0sRUFBRSxDQUFDQyxzQkFBRCxDQUZvQjtFQUc1QkMsSUFBSSxFQUFFLFNBQVNBLElBQVQsR0FBZ0I7SUFDcEIsT0FBTztNQUNMQyxLQUFLLEVBQUUsRUFERjtNQUVMQyxXQUFXLEVBQUUsRUFGUjtNQUdMQyxTQUFTLEVBQUU7SUFITixDQUFQO0VBS0QsQ0FUMkI7RUFVNUJDLE9BQU8sRUFBRSxTQUFTQSxPQUFULEdBQW1CO0lBQzFCLElBQUlDLEVBQUUsR0FBRyxJQUFUO0lBQ0FBLEVBQUUsQ0FBQ0osS0FBSCxHQUFXSSxFQUFFLENBQUNDLFdBQWQ7RUFDRCxDQWIyQjtFQWM1QkMsUUFBUSxFQUFFLHM1REFka0I7RUFlNUJDLE9BQU8sRUFBRTtJQUNQQyxRQUFRLEVBQUUsU0FBU0EsUUFBVCxHQUFvQjtNQUM1QixLQUFLUCxXQUFMLEdBQW1CUSxFQUFFLENBQUNDLEtBQUgsQ0FBUztRQUMxQkMsS0FBSyxFQUFFLFFBRG1CO1FBRTFCQyxRQUFRLEVBQUUsS0FGZ0I7UUFHMUJDLE9BQU8sRUFBRTtNQUhpQixDQUFULENBQW5CO01BS0EsS0FBS1osV0FBTCxDQUFpQmEsRUFBakIsQ0FBb0IsUUFBcEIsRUFBOEIsVUFBVWQsS0FBVixFQUFpQjtRQUM3QyxJQUFJZSxVQUFVLEdBQUcsS0FBS2QsV0FBTCxDQUFpQmUsS0FBakIsR0FBeUJDLEdBQXpCLENBQTZCLFdBQTdCLEVBQTBDQyxLQUExQyxHQUFrREMsTUFBbEQsRUFBakI7UUFDQSxLQUFLbkIsS0FBTCxHQUFhZSxVQUFVLENBQUNLLEVBQXhCO1FBQ0EsS0FBS2xCLFNBQUwsR0FBaUJhLFVBQVUsQ0FBQ00sR0FBNUI7TUFDRCxDQUpELEVBSUcsSUFKSDtNQUtBLEtBQUtwQixXQUFMLENBQWlCcUIsSUFBakI7SUFDRCxDQWJNO0lBY1BDLFdBQVcsRUFBRSxTQUFTQSxXQUFULEdBQXVCO01BQ2xDLEtBQUt2QixLQUFMLEdBQWEsS0FBS0UsU0FBTCxHQUFpQixFQUE5QjtJQUNEO0VBaEJNLENBZm1CO0VBaUM1QnNCLEtBQUssRUFBRTtJQUNMeEIsS0FBSyxFQUFFLFNBQVNBLEtBQVQsQ0FBZXlCLE1BQWYsRUFBdUI7TUFDNUIsS0FBS0MsS0FBTCxDQUFXLGtCQUFYLEVBQStCRCxNQUEvQjtJQUNEO0VBSEk7QUFqQ3FCLENBQTlCIn0=
},{}]},{},[1])
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Vue.component('wpcfto_gallery', {
  props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value', 'preview_text'],
  data: function data() {
    return {
      gallery: []
    };
  },
  template: "\n        <div class=\"wpcfto_generic_field wpcfto_generic_field_gallery\" v-bind:class=\"field_id\">\n\n            <wpcfto_fields_aside_before :fields=\"fields\" :field_label=\"field_label\" :preview_text=\"preview_text\"></wpcfto_fields_aside_before>\n\t\t\t\n\t\t\t<div class=\"wpcfto-field-content\">\n\t\t\t\n\t\t\t\t<div class=\"wpcfto_gallery\">\n\t\t\t\t\t<draggable class=\"wpcfto_gallery__items\"\n\t\t\t\t\t\t\t   :list=\"gallery\"\n\t\t\t\t\t\t\t   group=\"gallery\">\n\t\n\t\t\t\t\t\t<div class=\"wpcfto_gallery__item\"\n\t\t\t\t\t\t\t v-for=\"(image, image_key) in gallery\"\n\t\t\t\t\t\t\t :key=\"image_key\">\n\t\n\t\t\t\t\t\t\t <i class=\"wpcfto_gallery__item_delete fa fa-times\" @click=\"gallery.splice(image_key, 1)\"></i>\n\t\n\t\t\t\t\t\t  <img v-bind:src=\"image.url\" />\n\t\n\t\t\t\t\t\t</div>\n\t\n\t\t\t\t\t </draggable>\n\t\n\t\t\t\t\t<div class=\"actions\">\n\t\t\t\t\t\t<div class=\"button\" @click=\"addImages()\">Add/Edit Gallery</div>\n\t\t\t\t\t\t<div class=\"button button-remove\" v-if=\"gallery.length > 0\" @click=\"gallery = []\">Clear Gallery</div>\n\t\t\t\t\t</div>\n\t\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<wpcfto_fields_aside_after :fields=\"fields\"></wpcfto_fields_aside_after>\n\n        </div>\n    ",
  mounted: function mounted() {
    this.gallery = this.field_value;
    if (typeof this.field_value === 'string' && WpcftoIsJsonString(this.field_value)) this.gallery = JSON.parse(this.field_value);
  },
  methods: {
    addImages: function addImages() {
      var _this = this;

      _this.media_modal = wp.media({
        frame: 'select',
        multiple: true,
        editing: true,
        library: {
          type: ['image']
        }
      });

      _this.media_modal.on('select', function () {
        var attachments = _this.media_modal.state().get('selection').toJSON();

        attachments.forEach(function (attachment) {
          _this.gallery.push({
            id: attachment.id,
            url: attachment.sizes.thumbnail.url
          });
        });
      }, _this);

      _this.media_modal.open();
    }
  },
  watch: {
    gallery: {
      deep: true,
      handler: function handler(gallery) {
        var gallery_value = [];
        gallery.forEach(function (gallery_item) {
          gallery_value.push(gallery_item.id);
        });
        this.$emit('wpcfto-get-value', gallery_value);
      }
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJnYWxsZXJ5IiwidGVtcGxhdGUiLCJtb3VudGVkIiwiZmllbGRfdmFsdWUiLCJXcGNmdG9Jc0pzb25TdHJpbmciLCJKU09OIiwicGFyc2UiLCJtZXRob2RzIiwiYWRkSW1hZ2VzIiwiX3RoaXMiLCJtZWRpYV9tb2RhbCIsIndwIiwibWVkaWEiLCJmcmFtZSIsIm11bHRpcGxlIiwiZWRpdGluZyIsImxpYnJhcnkiLCJ0eXBlIiwib24iLCJhdHRhY2htZW50cyIsInN0YXRlIiwiZ2V0IiwidG9KU09OIiwiZm9yRWFjaCIsImF0dGFjaG1lbnQiLCJwdXNoIiwiaWQiLCJ1cmwiLCJzaXplcyIsInRodW1ibmFpbCIsIm9wZW4iLCJ3YXRjaCIsImRlZXAiLCJoYW5kbGVyIiwiZ2FsbGVyeV92YWx1ZSIsImdhbGxlcnlfaXRlbSIsIiRlbWl0Il0sInNvdXJjZXMiOlsiZmFrZV9kNjY4NTcwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5WdWUuY29tcG9uZW50KCd3cGNmdG9fZ2FsbGVyeScsIHtcbiAgcHJvcHM6IFsnZmllbGRzJywgJ2ZpZWxkX2xhYmVsJywgJ2ZpZWxkX25hbWUnLCAnZmllbGRfaWQnLCAnZmllbGRfdmFsdWUnLCAncHJldmlld190ZXh0J10sXG4gIGRhdGE6IGZ1bmN0aW9uIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGdhbGxlcnk6IFtdXG4gICAgfTtcbiAgfSxcbiAgdGVtcGxhdGU6IFwiXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9fZ2VuZXJpY19maWVsZCB3cGNmdG9fZ2VuZXJpY19maWVsZF9nYWxsZXJ5XFxcIiB2LWJpbmQ6Y2xhc3M9XFxcImZpZWxkX2lkXFxcIj5cXG5cXG4gICAgICAgICAgICA8d3BjZnRvX2ZpZWxkc19hc2lkZV9iZWZvcmUgOmZpZWxkcz1cXFwiZmllbGRzXFxcIiA6ZmllbGRfbGFiZWw9XFxcImZpZWxkX2xhYmVsXFxcIiA6cHJldmlld190ZXh0PVxcXCJwcmV2aWV3X3RleHRcXFwiPjwvd3BjZnRvX2ZpZWxkc19hc2lkZV9iZWZvcmU+XFxuXFx0XFx0XFx0XFxuXFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwid3BjZnRvLWZpZWxkLWNvbnRlbnRcXFwiPlxcblxcdFxcdFxcdFxcblxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcIndwY2Z0b19nYWxsZXJ5XFxcIj5cXG5cXHRcXHRcXHRcXHRcXHQ8ZHJhZ2dhYmxlIGNsYXNzPVxcXCJ3cGNmdG9fZ2FsbGVyeV9faXRlbXNcXFwiXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0ICAgOmxpc3Q9XFxcImdhbGxlcnlcXFwiXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0ICAgZ3JvdXA9XFxcImdhbGxlcnlcXFwiPlxcblxcdFxcblxcdFxcdFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcIndwY2Z0b19nYWxsZXJ5X19pdGVtXFxcIlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdCB2LWZvcj1cXFwiKGltYWdlLCBpbWFnZV9rZXkpIGluIGdhbGxlcnlcXFwiXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0IDprZXk9XFxcImltYWdlX2tleVxcXCI+XFxuXFx0XFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0IDxpIGNsYXNzPVxcXCJ3cGNmdG9fZ2FsbGVyeV9faXRlbV9kZWxldGUgZmEgZmEtdGltZXNcXFwiIEBjbGljaz1cXFwiZ2FsbGVyeS5zcGxpY2UoaW1hZ2Vfa2V5LCAxKVxcXCI+PC9pPlxcblxcdFxcblxcdFxcdFxcdFxcdFxcdFxcdCAgPGltZyB2LWJpbmQ6c3JjPVxcXCJpbWFnZS51cmxcXFwiIC8+XFxuXFx0XFxuXFx0XFx0XFx0XFx0XFx0XFx0PC9kaXY+XFxuXFx0XFxuXFx0XFx0XFx0XFx0XFx0IDwvZHJhZ2dhYmxlPlxcblxcdFxcblxcdFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcImFjdGlvbnNcXFwiPlxcblxcdFxcdFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcImJ1dHRvblxcXCIgQGNsaWNrPVxcXCJhZGRJbWFnZXMoKVxcXCI+QWRkL0VkaXQgR2FsbGVyeTwvZGl2PlxcblxcdFxcdFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcImJ1dHRvbiBidXR0b24tcmVtb3ZlXFxcIiB2LWlmPVxcXCJnYWxsZXJ5Lmxlbmd0aCA+IDBcXFwiIEBjbGljaz1cXFwiZ2FsbGVyeSA9IFtdXFxcIj5DbGVhciBHYWxsZXJ5PC9kaXY+XFxuXFx0XFx0XFx0XFx0XFx0PC9kaXY+XFxuXFx0XFxuXFx0XFx0XFx0XFx0PC9kaXY+XFxuXFx0XFx0XFx0PC9kaXY+XFxuXFxuXFx0XFx0XFx0PHdwY2Z0b19maWVsZHNfYXNpZGVfYWZ0ZXIgOmZpZWxkcz1cXFwiZmllbGRzXFxcIj48L3dwY2Z0b19maWVsZHNfYXNpZGVfYWZ0ZXI+XFxuXFxuICAgICAgICA8L2Rpdj5cXG4gICAgXCIsXG4gIG1vdW50ZWQ6IGZ1bmN0aW9uIG1vdW50ZWQoKSB7XG4gICAgdGhpcy5nYWxsZXJ5ID0gdGhpcy5maWVsZF92YWx1ZTtcbiAgICBpZiAodHlwZW9mIHRoaXMuZmllbGRfdmFsdWUgPT09ICdzdHJpbmcnICYmIFdwY2Z0b0lzSnNvblN0cmluZyh0aGlzLmZpZWxkX3ZhbHVlKSkgdGhpcy5nYWxsZXJ5ID0gSlNPTi5wYXJzZSh0aGlzLmZpZWxkX3ZhbHVlKTtcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGFkZEltYWdlczogZnVuY3Rpb24gYWRkSW1hZ2VzKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgX3RoaXMubWVkaWFfbW9kYWwgPSB3cC5tZWRpYSh7XG4gICAgICAgIGZyYW1lOiAnc2VsZWN0JyxcbiAgICAgICAgbXVsdGlwbGU6IHRydWUsXG4gICAgICAgIGVkaXRpbmc6IHRydWUsXG4gICAgICAgIGxpYnJhcnk6IHtcbiAgICAgICAgICB0eXBlOiBbJ2ltYWdlJ11cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIF90aGlzLm1lZGlhX21vZGFsLm9uKCdzZWxlY3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhdHRhY2htZW50cyA9IF90aGlzLm1lZGlhX21vZGFsLnN0YXRlKCkuZ2V0KCdzZWxlY3Rpb24nKS50b0pTT04oKTtcblxuICAgICAgICBhdHRhY2htZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChhdHRhY2htZW50KSB7XG4gICAgICAgICAgX3RoaXMuZ2FsbGVyeS5wdXNoKHtcbiAgICAgICAgICAgIGlkOiBhdHRhY2htZW50LmlkLFxuICAgICAgICAgICAgdXJsOiBhdHRhY2htZW50LnNpemVzLnRodW1ibmFpbC51cmxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9LCBfdGhpcyk7XG5cbiAgICAgIF90aGlzLm1lZGlhX21vZGFsLm9wZW4oKTtcbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgZ2FsbGVyeToge1xuICAgICAgZGVlcDogdHJ1ZSxcbiAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoZ2FsbGVyeSkge1xuICAgICAgICB2YXIgZ2FsbGVyeV92YWx1ZSA9IFtdO1xuICAgICAgICBnYWxsZXJ5LmZvckVhY2goZnVuY3Rpb24gKGdhbGxlcnlfaXRlbSkge1xuICAgICAgICAgIGdhbGxlcnlfdmFsdWUucHVzaChnYWxsZXJ5X2l0ZW0uaWQpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy4kZW1pdCgnd3BjZnRvLWdldC12YWx1ZScsIGdhbGxlcnlfdmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufSk7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQUEsR0FBRyxDQUFDQyxTQUFKLENBQWMsZ0JBQWQsRUFBZ0M7RUFDOUJDLEtBQUssRUFBRSxDQUFDLFFBQUQsRUFBVyxhQUFYLEVBQTBCLFlBQTFCLEVBQXdDLFVBQXhDLEVBQW9ELGFBQXBELEVBQW1FLGNBQW5FLENBRHVCO0VBRTlCQyxJQUFJLEVBQUUsU0FBU0EsSUFBVCxHQUFnQjtJQUNwQixPQUFPO01BQ0xDLE9BQU8sRUFBRTtJQURKLENBQVA7RUFHRCxDQU42QjtFQU85QkMsUUFBUSxFQUFFLG11Q0FQb0I7RUFROUJDLE9BQU8sRUFBRSxTQUFTQSxPQUFULEdBQW1CO0lBQzFCLEtBQUtGLE9BQUwsR0FBZSxLQUFLRyxXQUFwQjtJQUNBLElBQUksT0FBTyxLQUFLQSxXQUFaLEtBQTRCLFFBQTVCLElBQXdDQyxrQkFBa0IsQ0FBQyxLQUFLRCxXQUFOLENBQTlELEVBQWtGLEtBQUtILE9BQUwsR0FBZUssSUFBSSxDQUFDQyxLQUFMLENBQVcsS0FBS0gsV0FBaEIsQ0FBZjtFQUNuRixDQVg2QjtFQVk5QkksT0FBTyxFQUFFO0lBQ1BDLFNBQVMsRUFBRSxTQUFTQSxTQUFULEdBQXFCO01BQzlCLElBQUlDLEtBQUssR0FBRyxJQUFaOztNQUVBQSxLQUFLLENBQUNDLFdBQU4sR0FBb0JDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO1FBQzNCQyxLQUFLLEVBQUUsUUFEb0I7UUFFM0JDLFFBQVEsRUFBRSxJQUZpQjtRQUczQkMsT0FBTyxFQUFFLElBSGtCO1FBSTNCQyxPQUFPLEVBQUU7VUFDUEMsSUFBSSxFQUFFLENBQUMsT0FBRDtRQURDO01BSmtCLENBQVQsQ0FBcEI7O01BU0FSLEtBQUssQ0FBQ0MsV0FBTixDQUFrQlEsRUFBbEIsQ0FBcUIsUUFBckIsRUFBK0IsWUFBWTtRQUN6QyxJQUFJQyxXQUFXLEdBQUdWLEtBQUssQ0FBQ0MsV0FBTixDQUFrQlUsS0FBbEIsR0FBMEJDLEdBQTFCLENBQThCLFdBQTlCLEVBQTJDQyxNQUEzQyxFQUFsQjs7UUFFQUgsV0FBVyxDQUFDSSxPQUFaLENBQW9CLFVBQVVDLFVBQVYsRUFBc0I7VUFDeENmLEtBQUssQ0FBQ1QsT0FBTixDQUFjeUIsSUFBZCxDQUFtQjtZQUNqQkMsRUFBRSxFQUFFRixVQUFVLENBQUNFLEVBREU7WUFFakJDLEdBQUcsRUFBRUgsVUFBVSxDQUFDSSxLQUFYLENBQWlCQyxTQUFqQixDQUEyQkY7VUFGZixDQUFuQjtRQUlELENBTEQ7TUFNRCxDQVRELEVBU0dsQixLQVRIOztNQVdBQSxLQUFLLENBQUNDLFdBQU4sQ0FBa0JvQixJQUFsQjtJQUNEO0VBekJNLENBWnFCO0VBdUM5QkMsS0FBSyxFQUFFO0lBQ0wvQixPQUFPLEVBQUU7TUFDUGdDLElBQUksRUFBRSxJQURDO01BRVBDLE9BQU8sRUFBRSxTQUFTQSxPQUFULENBQWlCakMsT0FBakIsRUFBMEI7UUFDakMsSUFBSWtDLGFBQWEsR0FBRyxFQUFwQjtRQUNBbEMsT0FBTyxDQUFDdUIsT0FBUixDQUFnQixVQUFVWSxZQUFWLEVBQXdCO1VBQ3RDRCxhQUFhLENBQUNULElBQWQsQ0FBbUJVLFlBQVksQ0FBQ1QsRUFBaEM7UUFDRCxDQUZEO1FBR0EsS0FBS1UsS0FBTCxDQUFXLGtCQUFYLEVBQStCRixhQUEvQjtNQUNEO0lBUk07RUFESjtBQXZDdUIsQ0FBaEMifQ==
},{}]},{},[1])
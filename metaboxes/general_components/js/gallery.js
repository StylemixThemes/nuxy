(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Vue.component('wpcfto_gallery', {
  props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value'],
  data: function data() {
    return {
      gallery: []
    };
  },
  template: "\n        <div class=\"wpcfto_generic_field wpcfto_generic_field_gallery\" v-bind:class=\"field_id\">\n\n            <wpcfto_fields_aside_before :fields=\"fields\" :field_label=\"field_label\"></wpcfto_fields_aside_before>\n\t\t\t\n\t\t\t<div class=\"wpcfto-field-content\">\n\t\t\t\n\t\t\t\t<div class=\"wpcfto_gallery\">\n\t\t\t\t\t<draggable class=\"wpcfto_gallery__items\"\n\t\t\t\t\t\t\t   :list=\"gallery\"\n\t\t\t\t\t\t\t   group=\"gallery\">\n\t\n\t\t\t\t\t\t<div class=\"wpcfto_gallery__item\"\n\t\t\t\t\t\t\t v-for=\"(image, image_key) in gallery\"\n\t\t\t\t\t\t\t :key=\"image_key\">\n\t\n\t\t\t\t\t\t\t <i class=\"wpcfto_gallery__item_delete fa fa-times\" @click=\"gallery.splice(image_key, 1)\"></i>\n\t\n\t\t\t\t\t\t  <img v-bind:src=\"image.url\" />\n\t\n\t\t\t\t\t\t</div>\n\t\n\t\t\t\t\t </draggable>\n\t\n\t\t\t\t\t<div class=\"actions\">\n\t\t\t\t\t\t<div class=\"button\" @click=\"addImages()\">Add/Edit Gallery</div>\n\t\t\t\t\t\t<div class=\"button button-remove\" v-if=\"gallery.length > 0\" @click=\"gallery = []\">Clear Gallery</div>\n\t\t\t\t\t</div>\n\t\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<wpcfto_fields_aside_after :fields=\"fields\"></wpcfto_fields_aside_after>\n\n        </div>\n    ",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJnYWxsZXJ5IiwidGVtcGxhdGUiLCJtb3VudGVkIiwiZmllbGRfdmFsdWUiLCJXcGNmdG9Jc0pzb25TdHJpbmciLCJKU09OIiwicGFyc2UiLCJtZXRob2RzIiwiYWRkSW1hZ2VzIiwiX3RoaXMiLCJtZWRpYV9tb2RhbCIsIndwIiwibWVkaWEiLCJmcmFtZSIsIm11bHRpcGxlIiwiZWRpdGluZyIsImxpYnJhcnkiLCJ0eXBlIiwib24iLCJhdHRhY2htZW50cyIsInN0YXRlIiwiZ2V0IiwidG9KU09OIiwiZm9yRWFjaCIsImF0dGFjaG1lbnQiLCJwdXNoIiwiaWQiLCJ1cmwiLCJzaXplcyIsInRodW1ibmFpbCIsIm9wZW4iLCJ3YXRjaCIsImRlZXAiLCJoYW5kbGVyIiwiZ2FsbGVyeV92YWx1ZSIsImdhbGxlcnlfaXRlbSIsIiRlbWl0Il0sInNvdXJjZXMiOlsiZmFrZV82NTFjNjJiZi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuVnVlLmNvbXBvbmVudCgnd3BjZnRvX2dhbGxlcnknLCB7XG4gIHByb3BzOiBbJ2ZpZWxkcycsICdmaWVsZF9sYWJlbCcsICdmaWVsZF9uYW1lJywgJ2ZpZWxkX2lkJywgJ2ZpZWxkX3ZhbHVlJ10sXG4gIGRhdGE6IGZ1bmN0aW9uIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGdhbGxlcnk6IFtdXG4gICAgfTtcbiAgfSxcbiAgdGVtcGxhdGU6IFwiXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9fZ2VuZXJpY19maWVsZCB3cGNmdG9fZ2VuZXJpY19maWVsZF9nYWxsZXJ5XFxcIiB2LWJpbmQ6Y2xhc3M9XFxcImZpZWxkX2lkXFxcIj5cXG5cXG4gICAgICAgICAgICA8d3BjZnRvX2ZpZWxkc19hc2lkZV9iZWZvcmUgOmZpZWxkcz1cXFwiZmllbGRzXFxcIiA6ZmllbGRfbGFiZWw9XFxcImZpZWxkX2xhYmVsXFxcIj48L3dwY2Z0b19maWVsZHNfYXNpZGVfYmVmb3JlPlxcblxcdFxcdFxcdFxcblxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcIndwY2Z0by1maWVsZC1jb250ZW50XFxcIj5cXG5cXHRcXHRcXHRcXG5cXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9fZ2FsbGVyeVxcXCI+XFxuXFx0XFx0XFx0XFx0XFx0PGRyYWdnYWJsZSBjbGFzcz1cXFwid3BjZnRvX2dhbGxlcnlfX2l0ZW1zXFxcIlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdCAgIDpsaXN0PVxcXCJnYWxsZXJ5XFxcIlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdCAgIGdyb3VwPVxcXCJnYWxsZXJ5XFxcIj5cXG5cXHRcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9fZ2FsbGVyeV9faXRlbVxcXCJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQgdi1mb3I9XFxcIihpbWFnZSwgaW1hZ2Vfa2V5KSBpbiBnYWxsZXJ5XFxcIlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdCA6a2V5PVxcXCJpbWFnZV9rZXlcXFwiPlxcblxcdFxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdCA8aSBjbGFzcz1cXFwid3BjZnRvX2dhbGxlcnlfX2l0ZW1fZGVsZXRlIGZhIGZhLXRpbWVzXFxcIiBAY2xpY2s9XFxcImdhbGxlcnkuc3BsaWNlKGltYWdlX2tleSwgMSlcXFwiPjwvaT5cXG5cXHRcXG5cXHRcXHRcXHRcXHRcXHRcXHQgIDxpbWcgdi1iaW5kOnNyYz1cXFwiaW1hZ2UudXJsXFxcIiAvPlxcblxcdFxcblxcdFxcdFxcdFxcdFxcdFxcdDwvZGl2PlxcblxcdFxcblxcdFxcdFxcdFxcdFxcdCA8L2RyYWdnYWJsZT5cXG5cXHRcXG5cXHRcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJhY3Rpb25zXFxcIj5cXG5cXHRcXHRcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJidXR0b25cXFwiIEBjbGljaz1cXFwiYWRkSW1hZ2VzKClcXFwiPkFkZC9FZGl0IEdhbGxlcnk8L2Rpdj5cXG5cXHRcXHRcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJidXR0b24gYnV0dG9uLXJlbW92ZVxcXCIgdi1pZj1cXFwiZ2FsbGVyeS5sZW5ndGggPiAwXFxcIiBAY2xpY2s9XFxcImdhbGxlcnkgPSBbXVxcXCI+Q2xlYXIgR2FsbGVyeTwvZGl2PlxcblxcdFxcdFxcdFxcdFxcdDwvZGl2PlxcblxcdFxcblxcdFxcdFxcdFxcdDwvZGl2PlxcblxcdFxcdFxcdDwvZGl2PlxcblxcblxcdFxcdFxcdDx3cGNmdG9fZmllbGRzX2FzaWRlX2FmdGVyIDpmaWVsZHM9XFxcImZpZWxkc1xcXCI+PC93cGNmdG9fZmllbGRzX2FzaWRlX2FmdGVyPlxcblxcbiAgICAgICAgPC9kaXY+XFxuICAgIFwiLFxuICBtb3VudGVkOiBmdW5jdGlvbiBtb3VudGVkKCkge1xuICAgIHRoaXMuZ2FsbGVyeSA9IHRoaXMuZmllbGRfdmFsdWU7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmZpZWxkX3ZhbHVlID09PSAnc3RyaW5nJyAmJiBXcGNmdG9Jc0pzb25TdHJpbmcodGhpcy5maWVsZF92YWx1ZSkpIHRoaXMuZ2FsbGVyeSA9IEpTT04ucGFyc2UodGhpcy5maWVsZF92YWx1ZSk7XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBhZGRJbWFnZXM6IGZ1bmN0aW9uIGFkZEltYWdlcygpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICBfdGhpcy5tZWRpYV9tb2RhbCA9IHdwLm1lZGlhKHtcbiAgICAgICAgZnJhbWU6ICdzZWxlY3QnLFxuICAgICAgICBtdWx0aXBsZTogdHJ1ZSxcbiAgICAgICAgZWRpdGluZzogdHJ1ZSxcbiAgICAgICAgbGlicmFyeToge1xuICAgICAgICAgIHR5cGU6IFsnaW1hZ2UnXVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIF90aGlzLm1lZGlhX21vZGFsLm9uKCdzZWxlY3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhdHRhY2htZW50cyA9IF90aGlzLm1lZGlhX21vZGFsLnN0YXRlKCkuZ2V0KCdzZWxlY3Rpb24nKS50b0pTT04oKTtcbiAgICAgICAgYXR0YWNobWVudHMuZm9yRWFjaChmdW5jdGlvbiAoYXR0YWNobWVudCkge1xuICAgICAgICAgIF90aGlzLmdhbGxlcnkucHVzaCh7XG4gICAgICAgICAgICBpZDogYXR0YWNobWVudC5pZCxcbiAgICAgICAgICAgIHVybDogYXR0YWNobWVudC5zaXplcy50aHVtYm5haWwudXJsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSwgX3RoaXMpO1xuICAgICAgX3RoaXMubWVkaWFfbW9kYWwub3BlbigpO1xuICAgIH1cbiAgfSxcbiAgd2F0Y2g6IHtcbiAgICBnYWxsZXJ5OiB7XG4gICAgICBkZWVwOiB0cnVlLFxuICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihnYWxsZXJ5KSB7XG4gICAgICAgIHZhciBnYWxsZXJ5X3ZhbHVlID0gW107XG4gICAgICAgIGdhbGxlcnkuZm9yRWFjaChmdW5jdGlvbiAoZ2FsbGVyeV9pdGVtKSB7XG4gICAgICAgICAgZ2FsbGVyeV92YWx1ZS5wdXNoKGdhbGxlcnlfaXRlbS5pZCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLiRlbWl0KCd3cGNmdG8tZ2V0LXZhbHVlJywgZ2FsbGVyeV92YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59KTsiXSwibWFwcGluZ3MiOiJBQUFBLFlBQVk7O0FBRVpBLEdBQUcsQ0FBQ0MsU0FBUyxDQUFDLGdCQUFnQixFQUFFO0VBQzlCQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsYUFBYSxDQUFDO0VBQ3pFQyxJQUFJLEVBQUUsU0FBU0EsSUFBSUEsQ0FBQSxFQUFHO0lBQ3BCLE9BQU87TUFDTEMsT0FBTyxFQUFFO0lBQ1gsQ0FBQztFQUNILENBQUM7RUFDREMsUUFBUSxFQUFFLG9zQ0FBb3NDO0VBQzlzQ0MsT0FBTyxFQUFFLFNBQVNBLE9BQU9BLENBQUEsRUFBRztJQUMxQixJQUFJLENBQUNGLE9BQU8sR0FBRyxJQUFJLENBQUNHLFdBQVc7SUFDL0IsSUFBSSxPQUFPLElBQUksQ0FBQ0EsV0FBVyxLQUFLLFFBQVEsSUFBSUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDRCxXQUFXLENBQUMsRUFBRSxJQUFJLENBQUNILE9BQU8sR0FBR0ssSUFBSSxDQUFDQyxLQUFLLENBQUMsSUFBSSxDQUFDSCxXQUFXLENBQUM7RUFDL0gsQ0FBQztFQUNESSxPQUFPLEVBQUU7SUFDUEMsU0FBUyxFQUFFLFNBQVNBLFNBQVNBLENBQUEsRUFBRztNQUM5QixJQUFJQyxLQUFLLEdBQUcsSUFBSTtNQUNoQkEsS0FBSyxDQUFDQyxXQUFXLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSyxDQUFDO1FBQzNCQyxLQUFLLEVBQUUsUUFBUTtRQUNmQyxRQUFRLEVBQUUsSUFBSTtRQUNkQyxPQUFPLEVBQUUsSUFBSTtRQUNiQyxPQUFPLEVBQUU7VUFDUEMsSUFBSSxFQUFFLENBQUMsT0FBTztRQUNoQjtNQUNGLENBQUMsQ0FBQztNQUNGUixLQUFLLENBQUNDLFdBQVcsQ0FBQ1EsRUFBRSxDQUFDLFFBQVEsRUFBRSxZQUFZO1FBQ3pDLElBQUlDLFdBQVcsR0FBR1YsS0FBSyxDQUFDQyxXQUFXLENBQUNVLEtBQUssQ0FBQyxDQUFDLENBQUNDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQ0MsTUFBTSxDQUFDLENBQUM7UUFDckVILFdBQVcsQ0FBQ0ksT0FBTyxDQUFDLFVBQVVDLFVBQVUsRUFBRTtVQUN4Q2YsS0FBSyxDQUFDVCxPQUFPLENBQUN5QixJQUFJLENBQUM7WUFDakJDLEVBQUUsRUFBRUYsVUFBVSxDQUFDRSxFQUFFO1lBQ2pCQyxHQUFHLEVBQUVILFVBQVUsQ0FBQ0ksS0FBSyxDQUFDQyxTQUFTLENBQUNGO1VBQ2xDLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQztNQUNKLENBQUMsRUFBRWxCLEtBQUssQ0FBQztNQUNUQSxLQUFLLENBQUNDLFdBQVcsQ0FBQ29CLElBQUksQ0FBQyxDQUFDO0lBQzFCO0VBQ0YsQ0FBQztFQUNEQyxLQUFLLEVBQUU7SUFDTC9CLE9BQU8sRUFBRTtNQUNQZ0MsSUFBSSxFQUFFLElBQUk7TUFDVkMsT0FBTyxFQUFFLFNBQVNBLE9BQU9BLENBQUNqQyxPQUFPLEVBQUU7UUFDakMsSUFBSWtDLGFBQWEsR0FBRyxFQUFFO1FBQ3RCbEMsT0FBTyxDQUFDdUIsT0FBTyxDQUFDLFVBQVVZLFlBQVksRUFBRTtVQUN0Q0QsYUFBYSxDQUFDVCxJQUFJLENBQUNVLFlBQVksQ0FBQ1QsRUFBRSxDQUFDO1FBQ3JDLENBQUMsQ0FBQztRQUNGLElBQUksQ0FBQ1UsS0FBSyxDQUFDLGtCQUFrQixFQUFFRixhQUFhLENBQUM7TUFDL0M7SUFDRjtFQUNGO0FBQ0YsQ0FBQyxDQUFDIiwiaWdub3JlTGlzdCI6W119
},{}]},{},[1])
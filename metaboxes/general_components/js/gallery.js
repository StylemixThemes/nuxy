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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfZDBiMzc0ZGYuanMiXSwibmFtZXMiOlsiVnVlIiwiY29tcG9uZW50IiwicHJvcHMiLCJkYXRhIiwiZ2FsbGVyeSIsInRlbXBsYXRlIiwibW91bnRlZCIsImZpZWxkX3ZhbHVlIiwiV3BjZnRvSXNKc29uU3RyaW5nIiwiSlNPTiIsInBhcnNlIiwibWV0aG9kcyIsImFkZEltYWdlcyIsIl90aGlzIiwibWVkaWFfbW9kYWwiLCJ3cCIsIm1lZGlhIiwiZnJhbWUiLCJtdWx0aXBsZSIsImVkaXRpbmciLCJsaWJyYXJ5IiwidHlwZSIsIm9uIiwiYXR0YWNobWVudHMiLCJzdGF0ZSIsImdldCIsInRvSlNPTiIsImZvckVhY2giLCJhdHRhY2htZW50IiwicHVzaCIsImlkIiwidXJsIiwic2l6ZXMiLCJ0aHVtYm5haWwiLCJvcGVuIiwid2F0Y2giLCJkZWVwIiwiaGFuZGxlciIsImdhbGxlcnlfdmFsdWUiLCJnYWxsZXJ5X2l0ZW0iLCIkZW1pdCJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUFBLEdBQUcsQ0FBQ0MsU0FBSixDQUFjLGdCQUFkLEVBQWdDO0FBQzlCQyxFQUFBQSxLQUFLLEVBQUUsQ0FBQyxRQUFELEVBQVcsYUFBWCxFQUEwQixZQUExQixFQUF3QyxVQUF4QyxFQUFvRCxhQUFwRCxDQUR1QjtBQUU5QkMsRUFBQUEsSUFBSSxFQUFFLFNBQVNBLElBQVQsR0FBZ0I7QUFDcEIsV0FBTztBQUNMQyxNQUFBQSxPQUFPLEVBQUU7QUFESixLQUFQO0FBR0QsR0FONkI7QUFPOUJDLEVBQUFBLFFBQVEsRUFBRSxvc0NBUG9CO0FBUTlCQyxFQUFBQSxPQUFPLEVBQUUsU0FBU0EsT0FBVCxHQUFtQjtBQUMxQixTQUFLRixPQUFMLEdBQWUsS0FBS0csV0FBcEI7QUFDQSxRQUFJLE9BQU8sS0FBS0EsV0FBWixLQUE0QixRQUE1QixJQUF3Q0Msa0JBQWtCLENBQUMsS0FBS0QsV0FBTixDQUE5RCxFQUFrRixLQUFLSCxPQUFMLEdBQWVLLElBQUksQ0FBQ0MsS0FBTCxDQUFXLEtBQUtILFdBQWhCLENBQWY7QUFDbkYsR0FYNkI7QUFZOUJJLEVBQUFBLE9BQU8sRUFBRTtBQUNQQyxJQUFBQSxTQUFTLEVBQUUsU0FBU0EsU0FBVCxHQUFxQjtBQUM5QixVQUFJQyxLQUFLLEdBQUcsSUFBWjs7QUFFQUEsTUFBQUEsS0FBSyxDQUFDQyxXQUFOLEdBQW9CQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUMzQkMsUUFBQUEsS0FBSyxFQUFFLFFBRG9CO0FBRTNCQyxRQUFBQSxRQUFRLEVBQUUsSUFGaUI7QUFHM0JDLFFBQUFBLE9BQU8sRUFBRSxJQUhrQjtBQUkzQkMsUUFBQUEsT0FBTyxFQUFFO0FBQ1BDLFVBQUFBLElBQUksRUFBRSxDQUFDLE9BQUQ7QUFEQztBQUprQixPQUFULENBQXBCOztBQVNBUixNQUFBQSxLQUFLLENBQUNDLFdBQU4sQ0FBa0JRLEVBQWxCLENBQXFCLFFBQXJCLEVBQStCLFlBQVk7QUFDekMsWUFBSUMsV0FBVyxHQUFHVixLQUFLLENBQUNDLFdBQU4sQ0FBa0JVLEtBQWxCLEdBQTBCQyxHQUExQixDQUE4QixXQUE5QixFQUEyQ0MsTUFBM0MsRUFBbEI7O0FBRUFILFFBQUFBLFdBQVcsQ0FBQ0ksT0FBWixDQUFvQixVQUFVQyxVQUFWLEVBQXNCO0FBQ3hDZixVQUFBQSxLQUFLLENBQUNULE9BQU4sQ0FBY3lCLElBQWQsQ0FBbUI7QUFDakJDLFlBQUFBLEVBQUUsRUFBRUYsVUFBVSxDQUFDRSxFQURFO0FBRWpCQyxZQUFBQSxHQUFHLEVBQUVILFVBQVUsQ0FBQ0ksS0FBWCxDQUFpQkMsU0FBakIsQ0FBMkJGO0FBRmYsV0FBbkI7QUFJRCxTQUxEO0FBTUQsT0FURCxFQVNHbEIsS0FUSDs7QUFXQUEsTUFBQUEsS0FBSyxDQUFDQyxXQUFOLENBQWtCb0IsSUFBbEI7QUFDRDtBQXpCTSxHQVpxQjtBQXVDOUJDLEVBQUFBLEtBQUssRUFBRTtBQUNML0IsSUFBQUEsT0FBTyxFQUFFO0FBQ1BnQyxNQUFBQSxJQUFJLEVBQUUsSUFEQztBQUVQQyxNQUFBQSxPQUFPLEVBQUUsU0FBU0EsT0FBVCxDQUFpQmpDLE9BQWpCLEVBQTBCO0FBQ2pDLFlBQUlrQyxhQUFhLEdBQUcsRUFBcEI7QUFDQWxDLFFBQUFBLE9BQU8sQ0FBQ3VCLE9BQVIsQ0FBZ0IsVUFBVVksWUFBVixFQUF3QjtBQUN0Q0QsVUFBQUEsYUFBYSxDQUFDVCxJQUFkLENBQW1CVSxZQUFZLENBQUNULEVBQWhDO0FBQ0QsU0FGRDtBQUdBLGFBQUtVLEtBQUwsQ0FBVyxrQkFBWCxFQUErQkYsYUFBL0I7QUFDRDtBQVJNO0FBREo7QUF2Q3VCLENBQWhDIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cblZ1ZS5jb21wb25lbnQoJ3dwY2Z0b19nYWxsZXJ5Jywge1xuICBwcm9wczogWydmaWVsZHMnLCAnZmllbGRfbGFiZWwnLCAnZmllbGRfbmFtZScsICdmaWVsZF9pZCcsICdmaWVsZF92YWx1ZSddLFxuICBkYXRhOiBmdW5jdGlvbiBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBnYWxsZXJ5OiBbXVxuICAgIH07XG4gIH0sXG4gIHRlbXBsYXRlOiBcIlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvX2dlbmVyaWNfZmllbGQgd3BjZnRvX2dlbmVyaWNfZmllbGRfZ2FsbGVyeVxcXCIgdi1iaW5kOmNsYXNzPVxcXCJmaWVsZF9pZFxcXCI+XFxuXFxuICAgICAgICAgICAgPHdwY2Z0b19maWVsZHNfYXNpZGVfYmVmb3JlIDpmaWVsZHM9XFxcImZpZWxkc1xcXCIgOmZpZWxkX2xhYmVsPVxcXCJmaWVsZF9sYWJlbFxcXCI+PC93cGNmdG9fZmllbGRzX2FzaWRlX2JlZm9yZT5cXG5cXHRcXHRcXHRcXG5cXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJ3cGNmdG8tZmllbGQtY29udGVudFxcXCI+XFxuXFx0XFx0XFx0XFxuXFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwid3BjZnRvX2dhbGxlcnlcXFwiPlxcblxcdFxcdFxcdFxcdFxcdDxkcmFnZ2FibGUgY2xhc3M9XFxcIndwY2Z0b19nYWxsZXJ5X19pdGVtc1xcXCJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQgICA6bGlzdD1cXFwiZ2FsbGVyeVxcXCJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQgICBncm91cD1cXFwiZ2FsbGVyeVxcXCI+XFxuXFx0XFxuXFx0XFx0XFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwid3BjZnRvX2dhbGxlcnlfX2l0ZW1cXFwiXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0IHYtZm9yPVxcXCIoaW1hZ2UsIGltYWdlX2tleSkgaW4gZ2FsbGVyeVxcXCJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQgOmtleT1cXFwiaW1hZ2Vfa2V5XFxcIj5cXG5cXHRcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQgPGkgY2xhc3M9XFxcIndwY2Z0b19nYWxsZXJ5X19pdGVtX2RlbGV0ZSBmYSBmYS10aW1lc1xcXCIgQGNsaWNrPVxcXCJnYWxsZXJ5LnNwbGljZShpbWFnZV9rZXksIDEpXFxcIj48L2k+XFxuXFx0XFxuXFx0XFx0XFx0XFx0XFx0XFx0ICA8aW1nIHYtYmluZDpzcmM9XFxcImltYWdlLnVybFxcXCIgLz5cXG5cXHRcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8L2Rpdj5cXG5cXHRcXG5cXHRcXHRcXHRcXHRcXHQgPC9kcmFnZ2FibGU+XFxuXFx0XFxuXFx0XFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwiYWN0aW9uc1xcXCI+XFxuXFx0XFx0XFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwiYnV0dG9uXFxcIiBAY2xpY2s9XFxcImFkZEltYWdlcygpXFxcIj5BZGQvRWRpdCBHYWxsZXJ5PC9kaXY+XFxuXFx0XFx0XFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwiYnV0dG9uIGJ1dHRvbi1yZW1vdmVcXFwiIHYtaWY9XFxcImdhbGxlcnkubGVuZ3RoID4gMFxcXCIgQGNsaWNrPVxcXCJnYWxsZXJ5ID0gW11cXFwiPkNsZWFyIEdhbGxlcnk8L2Rpdj5cXG5cXHRcXHRcXHRcXHRcXHQ8L2Rpdj5cXG5cXHRcXG5cXHRcXHRcXHRcXHQ8L2Rpdj5cXG5cXHRcXHRcXHQ8L2Rpdj5cXG5cXG5cXHRcXHRcXHQ8d3BjZnRvX2ZpZWxkc19hc2lkZV9hZnRlciA6ZmllbGRzPVxcXCJmaWVsZHNcXFwiPjwvd3BjZnRvX2ZpZWxkc19hc2lkZV9hZnRlcj5cXG5cXG4gICAgICAgIDwvZGl2PlxcbiAgICBcIixcbiAgbW91bnRlZDogZnVuY3Rpb24gbW91bnRlZCgpIHtcbiAgICB0aGlzLmdhbGxlcnkgPSB0aGlzLmZpZWxkX3ZhbHVlO1xuICAgIGlmICh0eXBlb2YgdGhpcy5maWVsZF92YWx1ZSA9PT0gJ3N0cmluZycgJiYgV3BjZnRvSXNKc29uU3RyaW5nKHRoaXMuZmllbGRfdmFsdWUpKSB0aGlzLmdhbGxlcnkgPSBKU09OLnBhcnNlKHRoaXMuZmllbGRfdmFsdWUpO1xuICB9LFxuICBtZXRob2RzOiB7XG4gICAgYWRkSW1hZ2VzOiBmdW5jdGlvbiBhZGRJbWFnZXMoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICBfdGhpcy5tZWRpYV9tb2RhbCA9IHdwLm1lZGlhKHtcbiAgICAgICAgZnJhbWU6ICdzZWxlY3QnLFxuICAgICAgICBtdWx0aXBsZTogdHJ1ZSxcbiAgICAgICAgZWRpdGluZzogdHJ1ZSxcbiAgICAgICAgbGlicmFyeToge1xuICAgICAgICAgIHR5cGU6IFsnaW1hZ2UnXVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgX3RoaXMubWVkaWFfbW9kYWwub24oJ3NlbGVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGF0dGFjaG1lbnRzID0gX3RoaXMubWVkaWFfbW9kYWwuc3RhdGUoKS5nZXQoJ3NlbGVjdGlvbicpLnRvSlNPTigpO1xuXG4gICAgICAgIGF0dGFjaG1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGF0dGFjaG1lbnQpIHtcbiAgICAgICAgICBfdGhpcy5nYWxsZXJ5LnB1c2goe1xuICAgICAgICAgICAgaWQ6IGF0dGFjaG1lbnQuaWQsXG4gICAgICAgICAgICB1cmw6IGF0dGFjaG1lbnQuc2l6ZXMudGh1bWJuYWlsLnVybFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0sIF90aGlzKTtcblxuICAgICAgX3RoaXMubWVkaWFfbW9kYWwub3BlbigpO1xuICAgIH1cbiAgfSxcbiAgd2F0Y2g6IHtcbiAgICBnYWxsZXJ5OiB7XG4gICAgICBkZWVwOiB0cnVlLFxuICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihnYWxsZXJ5KSB7XG4gICAgICAgIHZhciBnYWxsZXJ5X3ZhbHVlID0gW107XG4gICAgICAgIGdhbGxlcnkuZm9yRWFjaChmdW5jdGlvbiAoZ2FsbGVyeV9pdGVtKSB7XG4gICAgICAgICAgZ2FsbGVyeV92YWx1ZS5wdXNoKGdhbGxlcnlfaXRlbS5pZCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLiRlbWl0KCd3cGNmdG8tZ2V0LXZhbHVlJywgZ2FsbGVyeV92YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59KTsiXX0=
},{}]},{},[1])
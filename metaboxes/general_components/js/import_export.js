(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Vue.component('wpcfto_import_export', {
  props: ['data', 'id'],
  data: function data() {
    return {
      translations: wpcfto_global_settings['translations'],
      userData: [],
      importData: '',
      loading: false
    };
  },
  template: "\n\n        <div class=\"wpcfto_import_export\">\n        \n            <div class=\"wpcfto_import_export__export\">\n            \n                <input id=\"wpcfto_export_data\" type=\"hidden\" v-model=\"exportData\" />\n                <h3 v-html=\"translations.export_data_label\"></h3>\n                <a href=\"#\" class=\"button\" @click.prevent=\"copyExportData\">{{translations.export}}</a>\n                \n            </div>\n            \n            <div class=\"wpcfto_import_export__import\">\n            \n                <h3 v-html=\"translations.import_data_label\"></h3>\n                <textarea v-model=\"importData\"></textarea>\n                <div class=\"wpcfto_import_export__import_notice\" v-html=\"translations.import_notice\"></div>\n                <a href=\"#\" class=\"button\" :disabled=\"Object.keys(importData).length === 0\" @click.prevent=\"proceedData\">{{translations.import}}</a>\n                <span class=\"loading_import\" v-if=\"loading\">\n                    <i class=\"loading_v2\"></i>\n                </span>\n                \n            </div>\n            \n        </div>\n    ",
  mounted: function mounted() {
    this.userData = this.data;
  },
  methods: {
    copyExportData: function copyExportData() {
      var wpcftoExportData = document.querySelector('#wpcfto_export_data');
      wpcftoExportData.setAttribute('type', 'text');
      wpcftoExportData.select();

      try {
        var successful = document.execCommand('copy');
        alert(this.translations['exported_data']);
      } catch (err) {
        alert(this.translations['exported_data_error']);
      }
      /* unselect the range */


      wpcftoExportData.setAttribute('type', 'hidden');
      window.getSelection().removeAllRanges();
    },
    proceedData: function proceedData() {
      var vm = this;
      if (Object.keys(vm.importData).length === 0) return false;
      vm.loading = true;
      var url = stm_wpcfto_ajaxurl + '?action=wpcfto_save_settings&nonce=' + stm_wpcfto_nonces['wpcfto_save_settings'] + '&name=' + vm.id;
      this.$http.post(url, vm.importData).then(function (response) {
        vm.loading = false;
        location.reload();
      });
    }
  },
  computed: {
    exportData: function exportData() {
      return JSON.stringify(this.userData);
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJ0cmFuc2xhdGlvbnMiLCJ3cGNmdG9fZ2xvYmFsX3NldHRpbmdzIiwidXNlckRhdGEiLCJpbXBvcnREYXRhIiwibG9hZGluZyIsInRlbXBsYXRlIiwibW91bnRlZCIsIm1ldGhvZHMiLCJjb3B5RXhwb3J0RGF0YSIsIndwY2Z0b0V4cG9ydERhdGEiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJzZXRBdHRyaWJ1dGUiLCJzZWxlY3QiLCJzdWNjZXNzZnVsIiwiZXhlY0NvbW1hbmQiLCJhbGVydCIsImVyciIsIndpbmRvdyIsImdldFNlbGVjdGlvbiIsInJlbW92ZUFsbFJhbmdlcyIsInByb2NlZWREYXRhIiwidm0iLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwidXJsIiwic3RtX3dwY2Z0b19hamF4dXJsIiwic3RtX3dwY2Z0b19ub25jZXMiLCJpZCIsIiRodHRwIiwicG9zdCIsInRoZW4iLCJyZXNwb25zZSIsImxvY2F0aW9uIiwicmVsb2FkIiwiY29tcHV0ZWQiLCJleHBvcnREYXRhIiwiSlNPTiIsInN0cmluZ2lmeSJdLCJzb3VyY2VzIjpbImZha2VfMTk1MWQwNmEuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cblZ1ZS5jb21wb25lbnQoJ3dwY2Z0b19pbXBvcnRfZXhwb3J0Jywge1xuICBwcm9wczogWydkYXRhJywgJ2lkJ10sXG4gIGRhdGE6IGZ1bmN0aW9uIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRyYW5zbGF0aW9uczogd3BjZnRvX2dsb2JhbF9zZXR0aW5nc1sndHJhbnNsYXRpb25zJ10sXG4gICAgICB1c2VyRGF0YTogW10sXG4gICAgICBpbXBvcnREYXRhOiAnJyxcbiAgICAgIGxvYWRpbmc6IGZhbHNlXG4gICAgfTtcbiAgfSxcbiAgdGVtcGxhdGU6IFwiXFxuXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9faW1wb3J0X2V4cG9ydFxcXCI+XFxuICAgICAgICBcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9faW1wb3J0X2V4cG9ydF9fZXhwb3J0XFxcIj5cXG4gICAgICAgICAgICBcXG4gICAgICAgICAgICAgICAgPGlucHV0IGlkPVxcXCJ3cGNmdG9fZXhwb3J0X2RhdGFcXFwiIHR5cGU9XFxcImhpZGRlblxcXCIgdi1tb2RlbD1cXFwiZXhwb3J0RGF0YVxcXCIgLz5cXG4gICAgICAgICAgICAgICAgPGgzIHYtaHRtbD1cXFwidHJhbnNsYXRpb25zLmV4cG9ydF9kYXRhX2xhYmVsXFxcIj48L2gzPlxcbiAgICAgICAgICAgICAgICA8YSBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwiYnV0dG9uXFxcIiBAY2xpY2sucHJldmVudD1cXFwiY29weUV4cG9ydERhdGFcXFwiPnt7dHJhbnNsYXRpb25zLmV4cG9ydH19PC9hPlxcbiAgICAgICAgICAgICAgICBcXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICBcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9faW1wb3J0X2V4cG9ydF9faW1wb3J0XFxcIj5cXG4gICAgICAgICAgICBcXG4gICAgICAgICAgICAgICAgPGgzIHYtaHRtbD1cXFwidHJhbnNsYXRpb25zLmltcG9ydF9kYXRhX2xhYmVsXFxcIj48L2gzPlxcbiAgICAgICAgICAgICAgICA8dGV4dGFyZWEgdi1tb2RlbD1cXFwiaW1wb3J0RGF0YVxcXCI+PC90ZXh0YXJlYT5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvX2ltcG9ydF9leHBvcnRfX2ltcG9ydF9ub3RpY2VcXFwiIHYtaHRtbD1cXFwidHJhbnNsYXRpb25zLmltcG9ydF9ub3RpY2VcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICA8YSBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwiYnV0dG9uXFxcIiA6ZGlzYWJsZWQ9XFxcIk9iamVjdC5rZXlzKGltcG9ydERhdGEpLmxlbmd0aCA9PT0gMFxcXCIgQGNsaWNrLnByZXZlbnQ9XFxcInByb2NlZWREYXRhXFxcIj57e3RyYW5zbGF0aW9ucy5pbXBvcnR9fTwvYT5cXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcImxvYWRpbmdfaW1wb3J0XFxcIiB2LWlmPVxcXCJsb2FkaW5nXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJsb2FkaW5nX3YyXFxcIj48L2k+XFxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgXFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgXFxuICAgICAgICA8L2Rpdj5cXG4gICAgXCIsXG4gIG1vdW50ZWQ6IGZ1bmN0aW9uIG1vdW50ZWQoKSB7XG4gICAgdGhpcy51c2VyRGF0YSA9IHRoaXMuZGF0YTtcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGNvcHlFeHBvcnREYXRhOiBmdW5jdGlvbiBjb3B5RXhwb3J0RGF0YSgpIHtcbiAgICAgIHZhciB3cGNmdG9FeHBvcnREYXRhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dwY2Z0b19leHBvcnRfZGF0YScpO1xuICAgICAgd3BjZnRvRXhwb3J0RGF0YS5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xuICAgICAgd3BjZnRvRXhwb3J0RGF0YS5zZWxlY3QoKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIHN1Y2Nlc3NmdWwgPSBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xuICAgICAgICBhbGVydCh0aGlzLnRyYW5zbGF0aW9uc1snZXhwb3J0ZWRfZGF0YSddKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBhbGVydCh0aGlzLnRyYW5zbGF0aW9uc1snZXhwb3J0ZWRfZGF0YV9lcnJvciddKTtcbiAgICAgIH1cbiAgICAgIC8qIHVuc2VsZWN0IHRoZSByYW5nZSAqL1xuXG5cbiAgICAgIHdwY2Z0b0V4cG9ydERhdGEuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2hpZGRlbicpO1xuICAgICAgd2luZG93LmdldFNlbGVjdGlvbigpLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgIH0sXG4gICAgcHJvY2VlZERhdGE6IGZ1bmN0aW9uIHByb2NlZWREYXRhKCkge1xuICAgICAgdmFyIHZtID0gdGhpcztcbiAgICAgIGlmIChPYmplY3Qua2V5cyh2bS5pbXBvcnREYXRhKS5sZW5ndGggPT09IDApIHJldHVybiBmYWxzZTtcbiAgICAgIHZtLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgdmFyIHVybCA9IHN0bV93cGNmdG9fYWpheHVybCArICc/YWN0aW9uPXdwY2Z0b19zYXZlX3NldHRpbmdzJm5vbmNlPScgKyBzdG1fd3BjZnRvX25vbmNlc1snd3BjZnRvX3NhdmVfc2V0dGluZ3MnXSArICcmbmFtZT0nICsgdm0uaWQ7XG4gICAgICB0aGlzLiRodHRwLnBvc3QodXJsLCB2bS5pbXBvcnREYXRhKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICB2bS5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIGV4cG9ydERhdGE6IGZ1bmN0aW9uIGV4cG9ydERhdGEoKSB7XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy51c2VyRGF0YSk7XG4gICAgfVxuICB9XG59KTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBQSxHQUFHLENBQUNDLFNBQUosQ0FBYyxzQkFBZCxFQUFzQztFQUNwQ0MsS0FBSyxFQUFFLENBQUMsTUFBRCxFQUFTLElBQVQsQ0FENkI7RUFFcENDLElBQUksRUFBRSxTQUFTQSxJQUFULEdBQWdCO0lBQ3BCLE9BQU87TUFDTEMsWUFBWSxFQUFFQyxzQkFBc0IsQ0FBQyxjQUFELENBRC9CO01BRUxDLFFBQVEsRUFBRSxFQUZMO01BR0xDLFVBQVUsRUFBRSxFQUhQO01BSUxDLE9BQU8sRUFBRTtJQUpKLENBQVA7RUFNRCxDQVRtQztFQVVwQ0MsUUFBUSxFQUFFLHduQ0FWMEI7RUFXcENDLE9BQU8sRUFBRSxTQUFTQSxPQUFULEdBQW1CO0lBQzFCLEtBQUtKLFFBQUwsR0FBZ0IsS0FBS0gsSUFBckI7RUFDRCxDQWJtQztFQWNwQ1EsT0FBTyxFQUFFO0lBQ1BDLGNBQWMsRUFBRSxTQUFTQSxjQUFULEdBQTBCO01BQ3hDLElBQUlDLGdCQUFnQixHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIscUJBQXZCLENBQXZCO01BQ0FGLGdCQUFnQixDQUFDRyxZQUFqQixDQUE4QixNQUE5QixFQUFzQyxNQUF0QztNQUNBSCxnQkFBZ0IsQ0FBQ0ksTUFBakI7O01BRUEsSUFBSTtRQUNGLElBQUlDLFVBQVUsR0FBR0osUUFBUSxDQUFDSyxXQUFULENBQXFCLE1BQXJCLENBQWpCO1FBQ0FDLEtBQUssQ0FBQyxLQUFLaEIsWUFBTCxDQUFrQixlQUFsQixDQUFELENBQUw7TUFDRCxDQUhELENBR0UsT0FBT2lCLEdBQVAsRUFBWTtRQUNaRCxLQUFLLENBQUMsS0FBS2hCLFlBQUwsQ0FBa0IscUJBQWxCLENBQUQsQ0FBTDtNQUNEO01BQ0Q7OztNQUdBUyxnQkFBZ0IsQ0FBQ0csWUFBakIsQ0FBOEIsTUFBOUIsRUFBc0MsUUFBdEM7TUFDQU0sTUFBTSxDQUFDQyxZQUFQLEdBQXNCQyxlQUF0QjtJQUNELENBakJNO0lBa0JQQyxXQUFXLEVBQUUsU0FBU0EsV0FBVCxHQUF1QjtNQUNsQyxJQUFJQyxFQUFFLEdBQUcsSUFBVDtNQUNBLElBQUlDLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZRixFQUFFLENBQUNuQixVQUFmLEVBQTJCc0IsTUFBM0IsS0FBc0MsQ0FBMUMsRUFBNkMsT0FBTyxLQUFQO01BQzdDSCxFQUFFLENBQUNsQixPQUFILEdBQWEsSUFBYjtNQUNBLElBQUlzQixHQUFHLEdBQUdDLGtCQUFrQixHQUFHLHFDQUFyQixHQUE2REMsaUJBQWlCLENBQUMsc0JBQUQsQ0FBOUUsR0FBeUcsUUFBekcsR0FBb0hOLEVBQUUsQ0FBQ08sRUFBakk7TUFDQSxLQUFLQyxLQUFMLENBQVdDLElBQVgsQ0FBZ0JMLEdBQWhCLEVBQXFCSixFQUFFLENBQUNuQixVQUF4QixFQUFvQzZCLElBQXBDLENBQXlDLFVBQVVDLFFBQVYsRUFBb0I7UUFDM0RYLEVBQUUsQ0FBQ2xCLE9BQUgsR0FBYSxLQUFiO1FBQ0E4QixRQUFRLENBQUNDLE1BQVQ7TUFDRCxDQUhEO0lBSUQ7RUEzQk0sQ0FkMkI7RUEyQ3BDQyxRQUFRLEVBQUU7SUFDUkMsVUFBVSxFQUFFLFNBQVNBLFVBQVQsR0FBc0I7TUFDaEMsT0FBT0MsSUFBSSxDQUFDQyxTQUFMLENBQWUsS0FBS3JDLFFBQXBCLENBQVA7SUFDRDtFQUhPO0FBM0MwQixDQUF0QyJ9
},{}]},{},[1])
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJ0cmFuc2xhdGlvbnMiLCJ3cGNmdG9fZ2xvYmFsX3NldHRpbmdzIiwidXNlckRhdGEiLCJpbXBvcnREYXRhIiwibG9hZGluZyIsInRlbXBsYXRlIiwibW91bnRlZCIsIm1ldGhvZHMiLCJjb3B5RXhwb3J0RGF0YSIsIndwY2Z0b0V4cG9ydERhdGEiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJzZXRBdHRyaWJ1dGUiLCJzZWxlY3QiLCJzdWNjZXNzZnVsIiwiZXhlY0NvbW1hbmQiLCJhbGVydCIsImVyciIsIndpbmRvdyIsImdldFNlbGVjdGlvbiIsInJlbW92ZUFsbFJhbmdlcyIsInByb2NlZWREYXRhIiwidm0iLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwidXJsIiwic3RtX3dwY2Z0b19hamF4dXJsIiwic3RtX3dwY2Z0b19ub25jZXMiLCJpZCIsIiRodHRwIiwicG9zdCIsInRoZW4iLCJyZXNwb25zZSIsImxvY2F0aW9uIiwicmVsb2FkIiwiY29tcHV0ZWQiLCJleHBvcnREYXRhIiwiSlNPTiIsInN0cmluZ2lmeSJdLCJzb3VyY2VzIjpbImZha2VfYjg5NWY3N2QuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cblZ1ZS5jb21wb25lbnQoJ3dwY2Z0b19pbXBvcnRfZXhwb3J0Jywge1xuICBwcm9wczogWydkYXRhJywgJ2lkJ10sXG4gIGRhdGE6IGZ1bmN0aW9uIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRyYW5zbGF0aW9uczogd3BjZnRvX2dsb2JhbF9zZXR0aW5nc1sndHJhbnNsYXRpb25zJ10sXG4gICAgICB1c2VyRGF0YTogW10sXG4gICAgICBpbXBvcnREYXRhOiAnJyxcbiAgICAgIGxvYWRpbmc6IGZhbHNlXG4gICAgfTtcbiAgfSxcbiAgdGVtcGxhdGU6IFwiXFxuXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9faW1wb3J0X2V4cG9ydFxcXCI+XFxuICAgICAgICBcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9faW1wb3J0X2V4cG9ydF9fZXhwb3J0XFxcIj5cXG4gICAgICAgICAgICBcXG4gICAgICAgICAgICAgICAgPGlucHV0IGlkPVxcXCJ3cGNmdG9fZXhwb3J0X2RhdGFcXFwiIHR5cGU9XFxcImhpZGRlblxcXCIgdi1tb2RlbD1cXFwiZXhwb3J0RGF0YVxcXCIgLz5cXG4gICAgICAgICAgICAgICAgPGgzIHYtaHRtbD1cXFwidHJhbnNsYXRpb25zLmV4cG9ydF9kYXRhX2xhYmVsXFxcIj48L2gzPlxcbiAgICAgICAgICAgICAgICA8YSBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwiYnV0dG9uXFxcIiBAY2xpY2sucHJldmVudD1cXFwiY29weUV4cG9ydERhdGFcXFwiPnt7dHJhbnNsYXRpb25zLmV4cG9ydH19PC9hPlxcbiAgICAgICAgICAgICAgICBcXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICBcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9faW1wb3J0X2V4cG9ydF9faW1wb3J0XFxcIj5cXG4gICAgICAgICAgICBcXG4gICAgICAgICAgICAgICAgPGgzIHYtaHRtbD1cXFwidHJhbnNsYXRpb25zLmltcG9ydF9kYXRhX2xhYmVsXFxcIj48L2gzPlxcbiAgICAgICAgICAgICAgICA8dGV4dGFyZWEgdi1tb2RlbD1cXFwiaW1wb3J0RGF0YVxcXCI+PC90ZXh0YXJlYT5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvX2ltcG9ydF9leHBvcnRfX2ltcG9ydF9ub3RpY2VcXFwiIHYtaHRtbD1cXFwidHJhbnNsYXRpb25zLmltcG9ydF9ub3RpY2VcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICA8YSBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwiYnV0dG9uXFxcIiA6ZGlzYWJsZWQ9XFxcIk9iamVjdC5rZXlzKGltcG9ydERhdGEpLmxlbmd0aCA9PT0gMFxcXCIgQGNsaWNrLnByZXZlbnQ9XFxcInByb2NlZWREYXRhXFxcIj57e3RyYW5zbGF0aW9ucy5pbXBvcnR9fTwvYT5cXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcImxvYWRpbmdfaW1wb3J0XFxcIiB2LWlmPVxcXCJsb2FkaW5nXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJsb2FkaW5nX3YyXFxcIj48L2k+XFxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgXFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgXFxuICAgICAgICA8L2Rpdj5cXG4gICAgXCIsXG4gIG1vdW50ZWQ6IGZ1bmN0aW9uIG1vdW50ZWQoKSB7XG4gICAgdGhpcy51c2VyRGF0YSA9IHRoaXMuZGF0YTtcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGNvcHlFeHBvcnREYXRhOiBmdW5jdGlvbiBjb3B5RXhwb3J0RGF0YSgpIHtcbiAgICAgIHZhciB3cGNmdG9FeHBvcnREYXRhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dwY2Z0b19leHBvcnRfZGF0YScpO1xuICAgICAgd3BjZnRvRXhwb3J0RGF0YS5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xuICAgICAgd3BjZnRvRXhwb3J0RGF0YS5zZWxlY3QoKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciBzdWNjZXNzZnVsID0gZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKTtcbiAgICAgICAgYWxlcnQodGhpcy50cmFuc2xhdGlvbnNbJ2V4cG9ydGVkX2RhdGEnXSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgYWxlcnQodGhpcy50cmFuc2xhdGlvbnNbJ2V4cG9ydGVkX2RhdGFfZXJyb3InXSk7XG4gICAgICB9XG5cbiAgICAgIC8qIHVuc2VsZWN0IHRoZSByYW5nZSAqL1xuICAgICAgd3BjZnRvRXhwb3J0RGF0YS5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnaGlkZGVuJyk7XG4gICAgICB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgfSxcbiAgICBwcm9jZWVkRGF0YTogZnVuY3Rpb24gcHJvY2VlZERhdGEoKSB7XG4gICAgICB2YXIgdm0gPSB0aGlzO1xuICAgICAgaWYgKE9iamVjdC5rZXlzKHZtLmltcG9ydERhdGEpLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlO1xuICAgICAgdm0ubG9hZGluZyA9IHRydWU7XG4gICAgICB2YXIgdXJsID0gc3RtX3dwY2Z0b19hamF4dXJsICsgJz9hY3Rpb249d3BjZnRvX3NhdmVfc2V0dGluZ3Mmbm9uY2U9JyArIHN0bV93cGNmdG9fbm9uY2VzWyd3cGNmdG9fc2F2ZV9zZXR0aW5ncyddICsgJyZuYW1lPScgKyB2bS5pZDtcbiAgICAgIHRoaXMuJGh0dHAucG9zdCh1cmwsIHZtLmltcG9ydERhdGEpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHZtLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgZXhwb3J0RGF0YTogZnVuY3Rpb24gZXhwb3J0RGF0YSgpIHtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLnVzZXJEYXRhKTtcbiAgICB9XG4gIH1cbn0pOyJdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWTs7QUFFWkEsR0FBRyxDQUFDQyxTQUFTLENBQUMsc0JBQXNCLEVBQUU7RUFDcENDLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUM7RUFDckJDLElBQUksRUFBRSxTQUFTQSxJQUFJQSxDQUFBLEVBQUc7SUFDcEIsT0FBTztNQUNMQyxZQUFZLEVBQUVDLHNCQUFzQixDQUFDLGNBQWMsQ0FBQztNQUNwREMsUUFBUSxFQUFFLEVBQUU7TUFDWkMsVUFBVSxFQUFFLEVBQUU7TUFDZEMsT0FBTyxFQUFFO0lBQ1gsQ0FBQztFQUNILENBQUM7RUFDREMsUUFBUSxFQUFFLHduQ0FBd25DO0VBQ2xvQ0MsT0FBTyxFQUFFLFNBQVNBLE9BQU9BLENBQUEsRUFBRztJQUMxQixJQUFJLENBQUNKLFFBQVEsR0FBRyxJQUFJLENBQUNILElBQUk7RUFDM0IsQ0FBQztFQUNEUSxPQUFPLEVBQUU7SUFDUEMsY0FBYyxFQUFFLFNBQVNBLGNBQWNBLENBQUEsRUFBRztNQUN4QyxJQUFJQyxnQkFBZ0IsR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUMscUJBQXFCLENBQUM7TUFDcEVGLGdCQUFnQixDQUFDRyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztNQUM3Q0gsZ0JBQWdCLENBQUNJLE1BQU0sQ0FBQyxDQUFDO01BQ3pCLElBQUk7UUFDRixJQUFJQyxVQUFVLEdBQUdKLFFBQVEsQ0FBQ0ssV0FBVyxDQUFDLE1BQU0sQ0FBQztRQUM3Q0MsS0FBSyxDQUFDLElBQUksQ0FBQ2hCLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQztNQUMzQyxDQUFDLENBQUMsT0FBT2lCLEdBQUcsRUFBRTtRQUNaRCxLQUFLLENBQUMsSUFBSSxDQUFDaEIsWUFBWSxDQUFDLHFCQUFxQixDQUFDLENBQUM7TUFDakQ7O01BRUE7TUFDQVMsZ0JBQWdCLENBQUNHLFlBQVksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDO01BQy9DTSxNQUFNLENBQUNDLFlBQVksQ0FBQyxDQUFDLENBQUNDLGVBQWUsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFDREMsV0FBVyxFQUFFLFNBQVNBLFdBQVdBLENBQUEsRUFBRztNQUNsQyxJQUFJQyxFQUFFLEdBQUcsSUFBSTtNQUNiLElBQUlDLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDRixFQUFFLENBQUNuQixVQUFVLENBQUMsQ0FBQ3NCLE1BQU0sS0FBSyxDQUFDLEVBQUUsT0FBTyxLQUFLO01BQ3pESCxFQUFFLENBQUNsQixPQUFPLEdBQUcsSUFBSTtNQUNqQixJQUFJc0IsR0FBRyxHQUFHQyxrQkFBa0IsR0FBRyxxQ0FBcUMsR0FBR0MsaUJBQWlCLENBQUMsc0JBQXNCLENBQUMsR0FBRyxRQUFRLEdBQUdOLEVBQUUsQ0FBQ08sRUFBRTtNQUNuSSxJQUFJLENBQUNDLEtBQUssQ0FBQ0MsSUFBSSxDQUFDTCxHQUFHLEVBQUVKLEVBQUUsQ0FBQ25CLFVBQVUsQ0FBQyxDQUFDNkIsSUFBSSxDQUFDLFVBQVVDLFFBQVEsRUFBRTtRQUMzRFgsRUFBRSxDQUFDbEIsT0FBTyxHQUFHLEtBQUs7UUFDbEI4QixRQUFRLENBQUNDLE1BQU0sQ0FBQyxDQUFDO01BQ25CLENBQUMsQ0FBQztJQUNKO0VBQ0YsQ0FBQztFQUNEQyxRQUFRLEVBQUU7SUFDUkMsVUFBVSxFQUFFLFNBQVNBLFVBQVVBLENBQUEsRUFBRztNQUNoQyxPQUFPQyxJQUFJLENBQUNDLFNBQVMsQ0FBQyxJQUFJLENBQUNyQyxRQUFRLENBQUM7SUFDdEM7RUFDRjtBQUNGLENBQUMsQ0FBQyIsImlnbm9yZUxpc3QiOltdfQ==
},{}]},{},[1])
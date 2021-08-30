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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfMzJiNjE2YmIuanMiXSwibmFtZXMiOlsiVnVlIiwiY29tcG9uZW50IiwicHJvcHMiLCJkYXRhIiwidHJhbnNsYXRpb25zIiwid3BjZnRvX2dsb2JhbF9zZXR0aW5ncyIsInVzZXJEYXRhIiwiaW1wb3J0RGF0YSIsImxvYWRpbmciLCJ0ZW1wbGF0ZSIsIm1vdW50ZWQiLCJtZXRob2RzIiwiY29weUV4cG9ydERhdGEiLCJ3cGNmdG9FeHBvcnREYXRhIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwic2V0QXR0cmlidXRlIiwic2VsZWN0Iiwic3VjY2Vzc2Z1bCIsImV4ZWNDb21tYW5kIiwiYWxlcnQiLCJlcnIiLCJ3aW5kb3ciLCJnZXRTZWxlY3Rpb24iLCJyZW1vdmVBbGxSYW5nZXMiLCJwcm9jZWVkRGF0YSIsInZtIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsInVybCIsInN0bV93cGNmdG9fYWpheHVybCIsInN0bV93cGNmdG9fbm9uY2VzIiwiaWQiLCIkaHR0cCIsInBvc3QiLCJ0aGVuIiwicmVzcG9uc2UiLCJsb2NhdGlvbiIsInJlbG9hZCIsImNvbXB1dGVkIiwiZXhwb3J0RGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBQSxHQUFHLENBQUNDLFNBQUosQ0FBYyxzQkFBZCxFQUFzQztBQUNwQ0MsRUFBQUEsS0FBSyxFQUFFLENBQUMsTUFBRCxFQUFTLElBQVQsQ0FENkI7QUFFcENDLEVBQUFBLElBQUksRUFBRSxTQUFTQSxJQUFULEdBQWdCO0FBQ3BCLFdBQU87QUFDTEMsTUFBQUEsWUFBWSxFQUFFQyxzQkFBc0IsQ0FBQyxjQUFELENBRC9CO0FBRUxDLE1BQUFBLFFBQVEsRUFBRSxFQUZMO0FBR0xDLE1BQUFBLFVBQVUsRUFBRSxFQUhQO0FBSUxDLE1BQUFBLE9BQU8sRUFBRTtBQUpKLEtBQVA7QUFNRCxHQVRtQztBQVVwQ0MsRUFBQUEsUUFBUSxFQUFFLHduQ0FWMEI7QUFXcENDLEVBQUFBLE9BQU8sRUFBRSxTQUFTQSxPQUFULEdBQW1CO0FBQzFCLFNBQUtKLFFBQUwsR0FBZ0IsS0FBS0gsSUFBckI7QUFDRCxHQWJtQztBQWNwQ1EsRUFBQUEsT0FBTyxFQUFFO0FBQ1BDLElBQUFBLGNBQWMsRUFBRSxTQUFTQSxjQUFULEdBQTBCO0FBQ3hDLFVBQUlDLGdCQUFnQixHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIscUJBQXZCLENBQXZCO0FBQ0FGLE1BQUFBLGdCQUFnQixDQUFDRyxZQUFqQixDQUE4QixNQUE5QixFQUFzQyxNQUF0QztBQUNBSCxNQUFBQSxnQkFBZ0IsQ0FBQ0ksTUFBakI7O0FBRUEsVUFBSTtBQUNGLFlBQUlDLFVBQVUsR0FBR0osUUFBUSxDQUFDSyxXQUFULENBQXFCLE1BQXJCLENBQWpCO0FBQ0FDLFFBQUFBLEtBQUssQ0FBQyxLQUFLaEIsWUFBTCxDQUFrQixlQUFsQixDQUFELENBQUw7QUFDRCxPQUhELENBR0UsT0FBT2lCLEdBQVAsRUFBWTtBQUNaRCxRQUFBQSxLQUFLLENBQUMsS0FBS2hCLFlBQUwsQ0FBa0IscUJBQWxCLENBQUQsQ0FBTDtBQUNEO0FBQ0Q7OztBQUdBUyxNQUFBQSxnQkFBZ0IsQ0FBQ0csWUFBakIsQ0FBOEIsTUFBOUIsRUFBc0MsUUFBdEM7QUFDQU0sTUFBQUEsTUFBTSxDQUFDQyxZQUFQLEdBQXNCQyxlQUF0QjtBQUNELEtBakJNO0FBa0JQQyxJQUFBQSxXQUFXLEVBQUUsU0FBU0EsV0FBVCxHQUF1QjtBQUNsQyxVQUFJQyxFQUFFLEdBQUcsSUFBVDtBQUNBLFVBQUlDLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZRixFQUFFLENBQUNuQixVQUFmLEVBQTJCc0IsTUFBM0IsS0FBc0MsQ0FBMUMsRUFBNkMsT0FBTyxLQUFQO0FBQzdDSCxNQUFBQSxFQUFFLENBQUNsQixPQUFILEdBQWEsSUFBYjtBQUNBLFVBQUlzQixHQUFHLEdBQUdDLGtCQUFrQixHQUFHLHFDQUFyQixHQUE2REMsaUJBQWlCLENBQUMsc0JBQUQsQ0FBOUUsR0FBeUcsUUFBekcsR0FBb0hOLEVBQUUsQ0FBQ08sRUFBakk7QUFDQSxXQUFLQyxLQUFMLENBQVdDLElBQVgsQ0FBZ0JMLEdBQWhCLEVBQXFCSixFQUFFLENBQUNuQixVQUF4QixFQUFvQzZCLElBQXBDLENBQXlDLFVBQVVDLFFBQVYsRUFBb0I7QUFDM0RYLFFBQUFBLEVBQUUsQ0FBQ2xCLE9BQUgsR0FBYSxLQUFiO0FBQ0E4QixRQUFBQSxRQUFRLENBQUNDLE1BQVQ7QUFDRCxPQUhEO0FBSUQ7QUEzQk0sR0FkMkI7QUEyQ3BDQyxFQUFBQSxRQUFRLEVBQUU7QUFDUkMsSUFBQUEsVUFBVSxFQUFFLFNBQVNBLFVBQVQsR0FBc0I7QUFDaEMsYUFBT0MsSUFBSSxDQUFDQyxTQUFMLENBQWUsS0FBS3JDLFFBQXBCLENBQVA7QUFDRDtBQUhPO0FBM0MwQixDQUF0QyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5WdWUuY29tcG9uZW50KCd3cGNmdG9faW1wb3J0X2V4cG9ydCcsIHtcbiAgcHJvcHM6IFsnZGF0YScsICdpZCddLFxuICBkYXRhOiBmdW5jdGlvbiBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0cmFuc2xhdGlvbnM6IHdwY2Z0b19nbG9iYWxfc2V0dGluZ3NbJ3RyYW5zbGF0aW9ucyddLFxuICAgICAgdXNlckRhdGE6IFtdLFxuICAgICAgaW1wb3J0RGF0YTogJycsXG4gICAgICBsb2FkaW5nOiBmYWxzZVxuICAgIH07XG4gIH0sXG4gIHRlbXBsYXRlOiBcIlxcblxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvX2ltcG9ydF9leHBvcnRcXFwiPlxcbiAgICAgICAgXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvX2ltcG9ydF9leHBvcnRfX2V4cG9ydFxcXCI+XFxuICAgICAgICAgICAgXFxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cXFwid3BjZnRvX2V4cG9ydF9kYXRhXFxcIiB0eXBlPVxcXCJoaWRkZW5cXFwiIHYtbW9kZWw9XFxcImV4cG9ydERhdGFcXFwiIC8+XFxuICAgICAgICAgICAgICAgIDxoMyB2LWh0bWw9XFxcInRyYW5zbGF0aW9ucy5leHBvcnRfZGF0YV9sYWJlbFxcXCI+PC9oMz5cXG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcImJ1dHRvblxcXCIgQGNsaWNrLnByZXZlbnQ9XFxcImNvcHlFeHBvcnREYXRhXFxcIj57e3RyYW5zbGF0aW9ucy5leHBvcnR9fTwvYT5cXG4gICAgICAgICAgICAgICAgXFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvX2ltcG9ydF9leHBvcnRfX2ltcG9ydFxcXCI+XFxuICAgICAgICAgICAgXFxuICAgICAgICAgICAgICAgIDxoMyB2LWh0bWw9XFxcInRyYW5zbGF0aW9ucy5pbXBvcnRfZGF0YV9sYWJlbFxcXCI+PC9oMz5cXG4gICAgICAgICAgICAgICAgPHRleHRhcmVhIHYtbW9kZWw9XFxcImltcG9ydERhdGFcXFwiPjwvdGV4dGFyZWE+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0b19pbXBvcnRfZXhwb3J0X19pbXBvcnRfbm90aWNlXFxcIiB2LWh0bWw9XFxcInRyYW5zbGF0aW9ucy5pbXBvcnRfbm90aWNlXFxcIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcImJ1dHRvblxcXCIgOmRpc2FibGVkPVxcXCJPYmplY3Qua2V5cyhpbXBvcnREYXRhKS5sZW5ndGggPT09IDBcXFwiIEBjbGljay5wcmV2ZW50PVxcXCJwcm9jZWVkRGF0YVxcXCI+e3t0cmFuc2xhdGlvbnMuaW1wb3J0fX08L2E+XFxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJsb2FkaW5nX2ltcG9ydFxcXCIgdi1pZj1cXFwibG9hZGluZ1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cXFwibG9hZGluZ192MlxcXCI+PC9pPlxcbiAgICAgICAgICAgICAgICA8L3NwYW4+XFxuICAgICAgICAgICAgICAgIFxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIFxcbiAgICAgICAgPC9kaXY+XFxuICAgIFwiLFxuICBtb3VudGVkOiBmdW5jdGlvbiBtb3VudGVkKCkge1xuICAgIHRoaXMudXNlckRhdGEgPSB0aGlzLmRhdGE7XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBjb3B5RXhwb3J0RGF0YTogZnVuY3Rpb24gY29weUV4cG9ydERhdGEoKSB7XG4gICAgICB2YXIgd3BjZnRvRXhwb3J0RGF0YSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3cGNmdG9fZXhwb3J0X2RhdGEnKTtcbiAgICAgIHdwY2Z0b0V4cG9ydERhdGEuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcbiAgICAgIHdwY2Z0b0V4cG9ydERhdGEuc2VsZWN0KCk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciBzdWNjZXNzZnVsID0gZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKTtcbiAgICAgICAgYWxlcnQodGhpcy50cmFuc2xhdGlvbnNbJ2V4cG9ydGVkX2RhdGEnXSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgYWxlcnQodGhpcy50cmFuc2xhdGlvbnNbJ2V4cG9ydGVkX2RhdGFfZXJyb3InXSk7XG4gICAgICB9XG4gICAgICAvKiB1bnNlbGVjdCB0aGUgcmFuZ2UgKi9cblxuXG4gICAgICB3cGNmdG9FeHBvcnREYXRhLnNldEF0dHJpYnV0ZSgndHlwZScsICdoaWRkZW4nKTtcbiAgICAgIHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICB9LFxuICAgIHByb2NlZWREYXRhOiBmdW5jdGlvbiBwcm9jZWVkRGF0YSgpIHtcbiAgICAgIHZhciB2bSA9IHRoaXM7XG4gICAgICBpZiAoT2JqZWN0LmtleXModm0uaW1wb3J0RGF0YSkubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2U7XG4gICAgICB2bS5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgIHZhciB1cmwgPSBzdG1fd3BjZnRvX2FqYXh1cmwgKyAnP2FjdGlvbj13cGNmdG9fc2F2ZV9zZXR0aW5ncyZub25jZT0nICsgc3RtX3dwY2Z0b19ub25jZXNbJ3dwY2Z0b19zYXZlX3NldHRpbmdzJ10gKyAnJm5hbWU9JyArIHZtLmlkO1xuICAgICAgdGhpcy4kaHR0cC5wb3N0KHVybCwgdm0uaW1wb3J0RGF0YSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgdm0ubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBleHBvcnREYXRhOiBmdW5jdGlvbiBleHBvcnREYXRhKCkge1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMudXNlckRhdGEpO1xuICAgIH1cbiAgfVxufSk7Il19
},{}]},{},[1])
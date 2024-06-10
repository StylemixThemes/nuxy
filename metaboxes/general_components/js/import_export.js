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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJ0cmFuc2xhdGlvbnMiLCJ3cGNmdG9fZ2xvYmFsX3NldHRpbmdzIiwidXNlckRhdGEiLCJpbXBvcnREYXRhIiwibG9hZGluZyIsInRlbXBsYXRlIiwibW91bnRlZCIsIm1ldGhvZHMiLCJjb3B5RXhwb3J0RGF0YSIsIndwY2Z0b0V4cG9ydERhdGEiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJzZXRBdHRyaWJ1dGUiLCJzZWxlY3QiLCJzdWNjZXNzZnVsIiwiZXhlY0NvbW1hbmQiLCJhbGVydCIsImVyciIsIndpbmRvdyIsImdldFNlbGVjdGlvbiIsInJlbW92ZUFsbFJhbmdlcyIsInByb2NlZWREYXRhIiwidm0iLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwidXJsIiwic3RtX3dwY2Z0b19hamF4dXJsIiwic3RtX3dwY2Z0b19ub25jZXMiLCJpZCIsIiRodHRwIiwicG9zdCIsInRoZW4iLCJyZXNwb25zZSIsImxvY2F0aW9uIiwicmVsb2FkIiwiY29tcHV0ZWQiLCJleHBvcnREYXRhIiwiSlNPTiIsInN0cmluZ2lmeSJdLCJzb3VyY2VzIjpbImZha2VfYjZiZDg0Ny5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuVnVlLmNvbXBvbmVudCgnd3BjZnRvX2ltcG9ydF9leHBvcnQnLCB7XG4gIHByb3BzOiBbJ2RhdGEnLCAnaWQnXSxcbiAgZGF0YTogZnVuY3Rpb24gZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHJhbnNsYXRpb25zOiB3cGNmdG9fZ2xvYmFsX3NldHRpbmdzWyd0cmFuc2xhdGlvbnMnXSxcbiAgICAgIHVzZXJEYXRhOiBbXSxcbiAgICAgIGltcG9ydERhdGE6ICcnLFxuICAgICAgbG9hZGluZzogZmFsc2VcbiAgICB9O1xuICB9LFxuICB0ZW1wbGF0ZTogXCJcXG5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0b19pbXBvcnRfZXhwb3J0XFxcIj5cXG4gICAgICAgIFxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0b19pbXBvcnRfZXhwb3J0X19leHBvcnRcXFwiPlxcbiAgICAgICAgICAgIFxcbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XFxcIndwY2Z0b19leHBvcnRfZGF0YVxcXCIgdHlwZT1cXFwiaGlkZGVuXFxcIiB2LW1vZGVsPVxcXCJleHBvcnREYXRhXFxcIiAvPlxcbiAgICAgICAgICAgICAgICA8aDMgdi1odG1sPVxcXCJ0cmFuc2xhdGlvbnMuZXhwb3J0X2RhdGFfbGFiZWxcXFwiPjwvaDM+XFxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJidXR0b25cXFwiIEBjbGljay5wcmV2ZW50PVxcXCJjb3B5RXhwb3J0RGF0YVxcXCI+e3t0cmFuc2xhdGlvbnMuZXhwb3J0fX08L2E+XFxuICAgICAgICAgICAgICAgIFxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIFxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0b19pbXBvcnRfZXhwb3J0X19pbXBvcnRcXFwiPlxcbiAgICAgICAgICAgIFxcbiAgICAgICAgICAgICAgICA8aDMgdi1odG1sPVxcXCJ0cmFuc2xhdGlvbnMuaW1wb3J0X2RhdGFfbGFiZWxcXFwiPjwvaDM+XFxuICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSB2LW1vZGVsPVxcXCJpbXBvcnREYXRhXFxcIj48L3RleHRhcmVhPlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9faW1wb3J0X2V4cG9ydF9faW1wb3J0X25vdGljZVxcXCIgdi1odG1sPVxcXCJ0cmFuc2xhdGlvbnMuaW1wb3J0X25vdGljZVxcXCI+PC9kaXY+XFxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJidXR0b25cXFwiIDpkaXNhYmxlZD1cXFwiT2JqZWN0LmtleXMoaW1wb3J0RGF0YSkubGVuZ3RoID09PSAwXFxcIiBAY2xpY2sucHJldmVudD1cXFwicHJvY2VlZERhdGFcXFwiPnt7dHJhbnNsYXRpb25zLmltcG9ydH19PC9hPlxcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwibG9hZGluZ19pbXBvcnRcXFwiIHYtaWY9XFxcImxvYWRpbmdcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XFxcImxvYWRpbmdfdjJcXFwiPjwvaT5cXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxcbiAgICAgICAgICAgICAgICBcXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICBcXG4gICAgICAgIDwvZGl2PlxcbiAgICBcIixcbiAgbW91bnRlZDogZnVuY3Rpb24gbW91bnRlZCgpIHtcbiAgICB0aGlzLnVzZXJEYXRhID0gdGhpcy5kYXRhO1xuICB9LFxuICBtZXRob2RzOiB7XG4gICAgY29weUV4cG9ydERhdGE6IGZ1bmN0aW9uIGNvcHlFeHBvcnREYXRhKCkge1xuICAgICAgdmFyIHdwY2Z0b0V4cG9ydERhdGEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd3BjZnRvX2V4cG9ydF9kYXRhJyk7XG4gICAgICB3cGNmdG9FeHBvcnREYXRhLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XG4gICAgICB3cGNmdG9FeHBvcnREYXRhLnNlbGVjdCgpO1xuXG4gICAgICB0cnkge1xuICAgICAgICB2YXIgc3VjY2Vzc2Z1bCA9IGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jyk7XG4gICAgICAgIGFsZXJ0KHRoaXMudHJhbnNsYXRpb25zWydleHBvcnRlZF9kYXRhJ10pO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGFsZXJ0KHRoaXMudHJhbnNsYXRpb25zWydleHBvcnRlZF9kYXRhX2Vycm9yJ10pO1xuICAgICAgfVxuICAgICAgLyogdW5zZWxlY3QgdGhlIHJhbmdlICovXG5cblxuICAgICAgd3BjZnRvRXhwb3J0RGF0YS5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnaGlkZGVuJyk7XG4gICAgICB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgfSxcbiAgICBwcm9jZWVkRGF0YTogZnVuY3Rpb24gcHJvY2VlZERhdGEoKSB7XG4gICAgICB2YXIgdm0gPSB0aGlzO1xuICAgICAgaWYgKE9iamVjdC5rZXlzKHZtLmltcG9ydERhdGEpLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlO1xuICAgICAgdm0ubG9hZGluZyA9IHRydWU7XG4gICAgICB2YXIgdXJsID0gc3RtX3dwY2Z0b19hamF4dXJsICsgJz9hY3Rpb249d3BjZnRvX3NhdmVfc2V0dGluZ3Mmbm9uY2U9JyArIHN0bV93cGNmdG9fbm9uY2VzWyd3cGNmdG9fc2F2ZV9zZXR0aW5ncyddICsgJyZuYW1lPScgKyB2bS5pZDtcbiAgICAgIHRoaXMuJGh0dHAucG9zdCh1cmwsIHZtLmltcG9ydERhdGEpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHZtLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgZXhwb3J0RGF0YTogZnVuY3Rpb24gZXhwb3J0RGF0YSgpIHtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLnVzZXJEYXRhKTtcbiAgICB9XG4gIH1cbn0pOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUFBLEdBQUcsQ0FBQ0MsU0FBSixDQUFjLHNCQUFkLEVBQXNDO0VBQ3BDQyxLQUFLLEVBQUUsQ0FBQyxNQUFELEVBQVMsSUFBVCxDQUQ2QjtFQUVwQ0MsSUFBSSxFQUFFLFNBQVNBLElBQVQsR0FBZ0I7SUFDcEIsT0FBTztNQUNMQyxZQUFZLEVBQUVDLHNCQUFzQixDQUFDLGNBQUQsQ0FEL0I7TUFFTEMsUUFBUSxFQUFFLEVBRkw7TUFHTEMsVUFBVSxFQUFFLEVBSFA7TUFJTEMsT0FBTyxFQUFFO0lBSkosQ0FBUDtFQU1ELENBVG1DO0VBVXBDQyxRQUFRLEVBQUUsd25DQVYwQjtFQVdwQ0MsT0FBTyxFQUFFLFNBQVNBLE9BQVQsR0FBbUI7SUFDMUIsS0FBS0osUUFBTCxHQUFnQixLQUFLSCxJQUFyQjtFQUNELENBYm1DO0VBY3BDUSxPQUFPLEVBQUU7SUFDUEMsY0FBYyxFQUFFLFNBQVNBLGNBQVQsR0FBMEI7TUFDeEMsSUFBSUMsZ0JBQWdCLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixxQkFBdkIsQ0FBdkI7TUFDQUYsZ0JBQWdCLENBQUNHLFlBQWpCLENBQThCLE1BQTlCLEVBQXNDLE1BQXRDO01BQ0FILGdCQUFnQixDQUFDSSxNQUFqQjs7TUFFQSxJQUFJO1FBQ0YsSUFBSUMsVUFBVSxHQUFHSixRQUFRLENBQUNLLFdBQVQsQ0FBcUIsTUFBckIsQ0FBakI7UUFDQUMsS0FBSyxDQUFDLEtBQUtoQixZQUFMLENBQWtCLGVBQWxCLENBQUQsQ0FBTDtNQUNELENBSEQsQ0FHRSxPQUFPaUIsR0FBUCxFQUFZO1FBQ1pELEtBQUssQ0FBQyxLQUFLaEIsWUFBTCxDQUFrQixxQkFBbEIsQ0FBRCxDQUFMO01BQ0Q7TUFDRDs7O01BR0FTLGdCQUFnQixDQUFDRyxZQUFqQixDQUE4QixNQUE5QixFQUFzQyxRQUF0QztNQUNBTSxNQUFNLENBQUNDLFlBQVAsR0FBc0JDLGVBQXRCO0lBQ0QsQ0FqQk07SUFrQlBDLFdBQVcsRUFBRSxTQUFTQSxXQUFULEdBQXVCO01BQ2xDLElBQUlDLEVBQUUsR0FBRyxJQUFUO01BQ0EsSUFBSUMsTUFBTSxDQUFDQyxJQUFQLENBQVlGLEVBQUUsQ0FBQ25CLFVBQWYsRUFBMkJzQixNQUEzQixLQUFzQyxDQUExQyxFQUE2QyxPQUFPLEtBQVA7TUFDN0NILEVBQUUsQ0FBQ2xCLE9BQUgsR0FBYSxJQUFiO01BQ0EsSUFBSXNCLEdBQUcsR0FBR0Msa0JBQWtCLEdBQUcscUNBQXJCLEdBQTZEQyxpQkFBaUIsQ0FBQyxzQkFBRCxDQUE5RSxHQUF5RyxRQUF6RyxHQUFvSE4sRUFBRSxDQUFDTyxFQUFqSTtNQUNBLEtBQUtDLEtBQUwsQ0FBV0MsSUFBWCxDQUFnQkwsR0FBaEIsRUFBcUJKLEVBQUUsQ0FBQ25CLFVBQXhCLEVBQW9DNkIsSUFBcEMsQ0FBeUMsVUFBVUMsUUFBVixFQUFvQjtRQUMzRFgsRUFBRSxDQUFDbEIsT0FBSCxHQUFhLEtBQWI7UUFDQThCLFFBQVEsQ0FBQ0MsTUFBVDtNQUNELENBSEQ7SUFJRDtFQTNCTSxDQWQyQjtFQTJDcENDLFFBQVEsRUFBRTtJQUNSQyxVQUFVLEVBQUUsU0FBU0EsVUFBVCxHQUFzQjtNQUNoQyxPQUFPQyxJQUFJLENBQUNDLFNBQUwsQ0FBZSxLQUFLckMsUUFBcEIsQ0FBUDtJQUNEO0VBSE87QUEzQzBCLENBQXRDIn0=
},{}]},{},[1])
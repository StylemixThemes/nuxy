(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Vue.component('v-select', VueSelect.VueSelect);
Vue.component('wpcfto_autocomplete', {
  props: ['fields', 'field_label', 'field_name', 'field_id', 'field_value', 'field_data'],
  data: function data() {
    return {
      ids: [],
      items: [],
      search: '',
      options: [],
      loading: true,
      itemHovered: null,
      value: '',
      limit: 0,
      translations: wpcfto_global_settings['translations']
    };
  },
  template: "\n        <div class=\"wpcfto_generic_field wpcfto_generic_field_autocomplete\">\n\n            <wpcfto_fields_aside_before :fields=\"fields\" :field_label=\"field_label\"></wpcfto_fields_aside_before>\n\n            <div class=\"wpcfto-field-content\">\n\n                <div class=\"wpcfto-autocomplete-search\" v-bind:class=\"{'loading': loading}\">\n                  \n                    <div class=\"v-select-search\" v-if=\"underLimit()\">\n\n                        <i class=\"fa fa-plus-circle\"></i>\n\n                        <v-select label=\"title\"\n                                  v-model=\"search\"\n                                  @input=\"setSelected($event)\"\n                                  :options=\"options\"\n                                  @search=\"onSearch($event)\">\n                                  <span slot=\"no-options\" v-html=\"translations['vue_select_notice']\"></span>\n                        </v-select>\n\n                    </div>\n\n                    <ul class=\"wpcfto-autocomplete\" v-bind:class=\"{'limited' : !underLimit()}\">\n                        <li v-for=\"(item, index) in items\" v-if=\"typeof item !== 'string'\" :class=\"{ 'hovered' : itemHovered == index }\">\n                            <div class=\"item-wrapper\">\n                                <img v-bind:src=\"item.image\" v-if=\"item.image\" class=\"item-image\">\n                                <div class=\"item-data\">\n                                    <span v-html=\"item.title\" class=\"item-title\"></span>\n                                    <span v-html=\"item.excerpt\" class=\"item-excerpt\" v-if=\"item.excerpt\"></span>\n                                </div>\n                            </div>\n                            <i class=\"fa fa-trash-alt\" @click=\"removeItem(index)\" @mouseover=\"itemHovered = index\" @mouseleave=\"itemHovered = null\"></i>\n                        </li>\n                    </ul>\n\n                    <input type=\"hidden\"\n                           v-bind:name=\"field_name\"\n                           v-model=\"value\"/>\n\n                </div>\n            \n            </div>\n\n            <wpcfto_fields_aside_after :fields=\"fields\"></wpcfto_fields_aside_after>\n\n        </div>\n    ",
  created: function created() {
    if (this.field_value) {
      this.getPosts(stm_wpcfto_ajaxurl + '?action=wpcfto_search_posts&nonce=' + stm_wpcfto_nonces['wpcfto_search_posts'] + '&posts_per_page=-1&orderby=post__in&ids=' + this.field_value + '&post_types=' + this.fields.post_type.join(','), 'items');
    } else {
      this.clearItems();
      this.isLoading(false);
    }
    if (typeof this.field_data !== 'undefined' && typeof this.field_data.limit !== 'undefined') {
      this.limit = this.field_data.limit;
    }
  },
  methods: {
    isLoading: function isLoading(_isLoading) {
      this.loading = _isLoading;
    },
    setSelected: function setSelected(value) {
      if (value) this.items.push(value);

      /*Reset options*/
      this.$set(this, 'options', []);
      this.$set(this, 'search', '');
    },
    clearItems: function clearItems() {
      var vm = this;
      var filtered = vm['items'].filter(function (el) {
        return el != null || el !== '';
      });
      vm.$set(vm, 'items', filtered);
    },
    underLimit: function underLimit() {
      if (this.limit === 0) return true;
      return this.items.length < this.limit;
    },
    onSearch: function onSearch(search) {
      var _this = this;
      var exclude = _this.ids.join(',');
      var post_types = _this.fields['post_type'].join(',');
      _this.getPosts(stm_wpcfto_ajaxurl + '?action=wpcfto_search_posts&nonce=' + stm_wpcfto_nonces['wpcfto_search_posts'] + '&exclude_ids=' + exclude + '&s=' + search + '&post_types=' + post_types, 'options');
    },
    getPosts: function getPosts(url, variable) {
      var vm = this;
      vm.isLoading(true);

      /*Adding field ID to filters then*/

      url += '&name=' + vm.field_name;
      this.$http.get(url).then(function (response) {
        vm[variable] = response.body;
        vm.clearItems();
        vm.isLoading(false);
      });
    },
    updateIds: function updateIds() {
      var vm = this;
      vm.ids = [];
      this.items.forEach(function (value, key) {
        vm.ids.push(value.id);
      });
      vm.$set(this, 'value', vm.ids);
      vm.$emit('wpcfto-get-value', vm.ids);
    },
    callFunction: function callFunction(functionName, item, model) {
      functionName(item, model);
    },
    containsObject: function containsObject(obj, list) {
      var i;
      for (i = 0; i < list.length; i++) {
        if (list[i]['id'] === obj['id']) {
          return true;
        }
      }
      return false;
    },
    removeItem: function removeItem(index) {
      this.items.splice(index, 1);
    }
  },
  watch: {
    items: function items() {
      this.updateIds();
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWdWUiLCJjb21wb25lbnQiLCJWdWVTZWxlY3QiLCJwcm9wcyIsImRhdGEiLCJpZHMiLCJpdGVtcyIsInNlYXJjaCIsIm9wdGlvbnMiLCJsb2FkaW5nIiwiaXRlbUhvdmVyZWQiLCJ2YWx1ZSIsImxpbWl0IiwidHJhbnNsYXRpb25zIiwid3BjZnRvX2dsb2JhbF9zZXR0aW5ncyIsInRlbXBsYXRlIiwiY3JlYXRlZCIsImZpZWxkX3ZhbHVlIiwiZ2V0UG9zdHMiLCJzdG1fd3BjZnRvX2FqYXh1cmwiLCJzdG1fd3BjZnRvX25vbmNlcyIsImZpZWxkcyIsInBvc3RfdHlwZSIsImpvaW4iLCJjbGVhckl0ZW1zIiwiaXNMb2FkaW5nIiwiZmllbGRfZGF0YSIsIm1ldGhvZHMiLCJfaXNMb2FkaW5nIiwic2V0U2VsZWN0ZWQiLCJwdXNoIiwiJHNldCIsInZtIiwiZmlsdGVyZWQiLCJmaWx0ZXIiLCJlbCIsInVuZGVyTGltaXQiLCJsZW5ndGgiLCJvblNlYXJjaCIsIl90aGlzIiwiZXhjbHVkZSIsInBvc3RfdHlwZXMiLCJ1cmwiLCJ2YXJpYWJsZSIsImZpZWxkX25hbWUiLCIkaHR0cCIsImdldCIsInRoZW4iLCJyZXNwb25zZSIsImJvZHkiLCJ1cGRhdGVJZHMiLCJmb3JFYWNoIiwia2V5IiwiaWQiLCIkZW1pdCIsImNhbGxGdW5jdGlvbiIsImZ1bmN0aW9uTmFtZSIsIml0ZW0iLCJtb2RlbCIsImNvbnRhaW5zT2JqZWN0Iiwib2JqIiwibGlzdCIsImkiLCJyZW1vdmVJdGVtIiwiaW5kZXgiLCJzcGxpY2UiLCJ3YXRjaCJdLCJzb3VyY2VzIjpbImZha2VfY2I2ZDY3NzguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cblZ1ZS5jb21wb25lbnQoJ3Ytc2VsZWN0JywgVnVlU2VsZWN0LlZ1ZVNlbGVjdCk7XG5WdWUuY29tcG9uZW50KCd3cGNmdG9fYXV0b2NvbXBsZXRlJywge1xuICBwcm9wczogWydmaWVsZHMnLCAnZmllbGRfbGFiZWwnLCAnZmllbGRfbmFtZScsICdmaWVsZF9pZCcsICdmaWVsZF92YWx1ZScsICdmaWVsZF9kYXRhJ10sXG4gIGRhdGE6IGZ1bmN0aW9uIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkczogW10sXG4gICAgICBpdGVtczogW10sXG4gICAgICBzZWFyY2g6ICcnLFxuICAgICAgb3B0aW9uczogW10sXG4gICAgICBsb2FkaW5nOiB0cnVlLFxuICAgICAgaXRlbUhvdmVyZWQ6IG51bGwsXG4gICAgICB2YWx1ZTogJycsXG4gICAgICBsaW1pdDogMCxcbiAgICAgIHRyYW5zbGF0aW9uczogd3BjZnRvX2dsb2JhbF9zZXR0aW5nc1sndHJhbnNsYXRpb25zJ11cbiAgICB9O1xuICB9LFxuICB0ZW1wbGF0ZTogXCJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0b19nZW5lcmljX2ZpZWxkIHdwY2Z0b19nZW5lcmljX2ZpZWxkX2F1dG9jb21wbGV0ZVxcXCI+XFxuXFxuICAgICAgICAgICAgPHdwY2Z0b19maWVsZHNfYXNpZGVfYmVmb3JlIDpmaWVsZHM9XFxcImZpZWxkc1xcXCIgOmZpZWxkX2xhYmVsPVxcXCJmaWVsZF9sYWJlbFxcXCI+PC93cGNmdG9fZmllbGRzX2FzaWRlX2JlZm9yZT5cXG5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG8tZmllbGQtY29udGVudFxcXCI+XFxuXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0by1hdXRvY29tcGxldGUtc2VhcmNoXFxcIiB2LWJpbmQ6Y2xhc3M9XFxcInsnbG9hZGluZyc6IGxvYWRpbmd9XFxcIj5cXG4gICAgICAgICAgICAgICAgICBcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInYtc2VsZWN0LXNlYXJjaFxcXCIgdi1pZj1cXFwidW5kZXJMaW1pdCgpXFxcIj5cXG5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cXFwiZmEgZmEtcGx1cy1jaXJjbGVcXFwiPjwvaT5cXG5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8di1zZWxlY3QgbGFiZWw9XFxcInRpdGxlXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVxcXCJzZWFyY2hcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBpbnB1dD1cXFwic2V0U2VsZWN0ZWQoJGV2ZW50KVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOm9wdGlvbnM9XFxcIm9wdGlvbnNcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBzZWFyY2g9XFxcIm9uU2VhcmNoKCRldmVudClcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzbG90PVxcXCJuby1vcHRpb25zXFxcIiB2LWh0bWw9XFxcInRyYW5zbGF0aW9uc1sndnVlX3NlbGVjdF9ub3RpY2UnXVxcXCI+PC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1zZWxlY3Q+XFxuXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG5cXG4gICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cXFwid3BjZnRvLWF1dG9jb21wbGV0ZVxcXCIgdi1iaW5kOmNsYXNzPVxcXCJ7J2xpbWl0ZWQnIDogIXVuZGVyTGltaXQoKX1cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSB2LWZvcj1cXFwiKGl0ZW0sIGluZGV4KSBpbiBpdGVtc1xcXCIgdi1pZj1cXFwidHlwZW9mIGl0ZW0gIT09ICdzdHJpbmcnXFxcIiA6Y2xhc3M9XFxcInsgJ2hvdmVyZWQnIDogaXRlbUhvdmVyZWQgPT0gaW5kZXggfVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIml0ZW0td3JhcHBlclxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHYtYmluZDpzcmM9XFxcIml0ZW0uaW1hZ2VcXFwiIHYtaWY9XFxcIml0ZW0uaW1hZ2VcXFwiIGNsYXNzPVxcXCJpdGVtLWltYWdlXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIml0ZW0tZGF0YVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gdi1odG1sPVxcXCJpdGVtLnRpdGxlXFxcIiBjbGFzcz1cXFwiaXRlbS10aXRsZVxcXCI+PC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHYtaHRtbD1cXFwiaXRlbS5leGNlcnB0XFxcIiBjbGFzcz1cXFwiaXRlbS1leGNlcnB0XFxcIiB2LWlmPVxcXCJpdGVtLmV4Y2VycHRcXFwiPjwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XFxcImZhIGZhLXRyYXNoLWFsdFxcXCIgQGNsaWNrPVxcXCJyZW1vdmVJdGVtKGluZGV4KVxcXCIgQG1vdXNlb3Zlcj1cXFwiaXRlbUhvdmVyZWQgPSBpbmRleFxcXCIgQG1vdXNlbGVhdmU9XFxcIml0ZW1Ib3ZlcmVkID0gbnVsbFxcXCI+PC9pPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XFxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxcblxcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6bmFtZT1cXFwiZmllbGRfbmFtZVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVxcXCJ2YWx1ZVxcXCIvPlxcblxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICBcXG4gICAgICAgICAgICA8L2Rpdj5cXG5cXG4gICAgICAgICAgICA8d3BjZnRvX2ZpZWxkc19hc2lkZV9hZnRlciA6ZmllbGRzPVxcXCJmaWVsZHNcXFwiPjwvd3BjZnRvX2ZpZWxkc19hc2lkZV9hZnRlcj5cXG5cXG4gICAgICAgIDwvZGl2PlxcbiAgICBcIixcbiAgY3JlYXRlZDogZnVuY3Rpb24gY3JlYXRlZCgpIHtcbiAgICBpZiAodGhpcy5maWVsZF92YWx1ZSkge1xuICAgICAgdGhpcy5nZXRQb3N0cyhzdG1fd3BjZnRvX2FqYXh1cmwgKyAnP2FjdGlvbj13cGNmdG9fc2VhcmNoX3Bvc3RzJm5vbmNlPScgKyBzdG1fd3BjZnRvX25vbmNlc1snd3BjZnRvX3NlYXJjaF9wb3N0cyddICsgJyZwb3N0c19wZXJfcGFnZT0tMSZvcmRlcmJ5PXBvc3RfX2luJmlkcz0nICsgdGhpcy5maWVsZF92YWx1ZSArICcmcG9zdF90eXBlcz0nICsgdGhpcy5maWVsZHMucG9zdF90eXBlLmpvaW4oJywnKSwgJ2l0ZW1zJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2xlYXJJdGVtcygpO1xuICAgICAgdGhpcy5pc0xvYWRpbmcoZmFsc2UpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHRoaXMuZmllbGRfZGF0YSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHRoaXMuZmllbGRfZGF0YS5saW1pdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMubGltaXQgPSB0aGlzLmZpZWxkX2RhdGEubGltaXQ7XG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgaXNMb2FkaW5nOiBmdW5jdGlvbiBpc0xvYWRpbmcoX2lzTG9hZGluZykge1xuICAgICAgdGhpcy5sb2FkaW5nID0gX2lzTG9hZGluZztcbiAgICB9LFxuICAgIHNldFNlbGVjdGVkOiBmdW5jdGlvbiBzZXRTZWxlY3RlZCh2YWx1ZSkge1xuICAgICAgaWYgKHZhbHVlKSB0aGlzLml0ZW1zLnB1c2godmFsdWUpO1xuXG4gICAgICAvKlJlc2V0IG9wdGlvbnMqL1xuICAgICAgdGhpcy4kc2V0KHRoaXMsICdvcHRpb25zJywgW10pO1xuICAgICAgdGhpcy4kc2V0KHRoaXMsICdzZWFyY2gnLCAnJyk7XG4gICAgfSxcbiAgICBjbGVhckl0ZW1zOiBmdW5jdGlvbiBjbGVhckl0ZW1zKCkge1xuICAgICAgdmFyIHZtID0gdGhpcztcbiAgICAgIHZhciBmaWx0ZXJlZCA9IHZtWydpdGVtcyddLmZpbHRlcihmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgcmV0dXJuIGVsICE9IG51bGwgfHwgZWwgIT09ICcnO1xuICAgICAgfSk7XG4gICAgICB2bS4kc2V0KHZtLCAnaXRlbXMnLCBmaWx0ZXJlZCk7XG4gICAgfSxcbiAgICB1bmRlckxpbWl0OiBmdW5jdGlvbiB1bmRlckxpbWl0KCkge1xuICAgICAgaWYgKHRoaXMubGltaXQgPT09IDApIHJldHVybiB0cnVlO1xuICAgICAgcmV0dXJuIHRoaXMuaXRlbXMubGVuZ3RoIDwgdGhpcy5saW1pdDtcbiAgICB9LFxuICAgIG9uU2VhcmNoOiBmdW5jdGlvbiBvblNlYXJjaChzZWFyY2gpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICB2YXIgZXhjbHVkZSA9IF90aGlzLmlkcy5qb2luKCcsJyk7XG4gICAgICB2YXIgcG9zdF90eXBlcyA9IF90aGlzLmZpZWxkc1sncG9zdF90eXBlJ10uam9pbignLCcpO1xuICAgICAgX3RoaXMuZ2V0UG9zdHMoc3RtX3dwY2Z0b19hamF4dXJsICsgJz9hY3Rpb249d3BjZnRvX3NlYXJjaF9wb3N0cyZub25jZT0nICsgc3RtX3dwY2Z0b19ub25jZXNbJ3dwY2Z0b19zZWFyY2hfcG9zdHMnXSArICcmZXhjbHVkZV9pZHM9JyArIGV4Y2x1ZGUgKyAnJnM9JyArIHNlYXJjaCArICcmcG9zdF90eXBlcz0nICsgcG9zdF90eXBlcywgJ29wdGlvbnMnKTtcbiAgICB9LFxuICAgIGdldFBvc3RzOiBmdW5jdGlvbiBnZXRQb3N0cyh1cmwsIHZhcmlhYmxlKSB7XG4gICAgICB2YXIgdm0gPSB0aGlzO1xuICAgICAgdm0uaXNMb2FkaW5nKHRydWUpO1xuXG4gICAgICAvKkFkZGluZyBmaWVsZCBJRCB0byBmaWx0ZXJzIHRoZW4qL1xuXG4gICAgICB1cmwgKz0gJyZuYW1lPScgKyB2bS5maWVsZF9uYW1lO1xuICAgICAgdGhpcy4kaHR0cC5nZXQodXJsKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICB2bVt2YXJpYWJsZV0gPSByZXNwb25zZS5ib2R5O1xuICAgICAgICB2bS5jbGVhckl0ZW1zKCk7XG4gICAgICAgIHZtLmlzTG9hZGluZyhmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIHVwZGF0ZUlkczogZnVuY3Rpb24gdXBkYXRlSWRzKCkge1xuICAgICAgdmFyIHZtID0gdGhpcztcbiAgICAgIHZtLmlkcyA9IFtdO1xuICAgICAgdGhpcy5pdGVtcy5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgIHZtLmlkcy5wdXNoKHZhbHVlLmlkKTtcbiAgICAgIH0pO1xuICAgICAgdm0uJHNldCh0aGlzLCAndmFsdWUnLCB2bS5pZHMpO1xuICAgICAgdm0uJGVtaXQoJ3dwY2Z0by1nZXQtdmFsdWUnLCB2bS5pZHMpO1xuICAgIH0sXG4gICAgY2FsbEZ1bmN0aW9uOiBmdW5jdGlvbiBjYWxsRnVuY3Rpb24oZnVuY3Rpb25OYW1lLCBpdGVtLCBtb2RlbCkge1xuICAgICAgZnVuY3Rpb25OYW1lKGl0ZW0sIG1vZGVsKTtcbiAgICB9LFxuICAgIGNvbnRhaW5zT2JqZWN0OiBmdW5jdGlvbiBjb250YWluc09iamVjdChvYmosIGxpc3QpIHtcbiAgICAgIHZhciBpO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGxpc3RbaV1bJ2lkJ10gPT09IG9ialsnaWQnXSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgICByZW1vdmVJdGVtOiBmdW5jdGlvbiByZW1vdmVJdGVtKGluZGV4KSB7XG4gICAgICB0aGlzLml0ZW1zLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9LFxuICB3YXRjaDoge1xuICAgIGl0ZW1zOiBmdW5jdGlvbiBpdGVtcygpIHtcbiAgICAgIHRoaXMudXBkYXRlSWRzKCk7XG4gICAgfVxuICB9XG59KTsiXSwibWFwcGluZ3MiOiJBQUFBLFlBQVk7O0FBRVpBLEdBQUcsQ0FBQ0MsU0FBUyxDQUFDLFVBQVUsRUFBRUMsU0FBUyxDQUFDQSxTQUFTLENBQUM7QUFDOUNGLEdBQUcsQ0FBQ0MsU0FBUyxDQUFDLHFCQUFxQixFQUFFO0VBQ25DRSxLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLFlBQVksQ0FBQztFQUN2RkMsSUFBSSxFQUFFLFNBQVNBLElBQUlBLENBQUEsRUFBRztJQUNwQixPQUFPO01BQ0xDLEdBQUcsRUFBRSxFQUFFO01BQ1BDLEtBQUssRUFBRSxFQUFFO01BQ1RDLE1BQU0sRUFBRSxFQUFFO01BQ1ZDLE9BQU8sRUFBRSxFQUFFO01BQ1hDLE9BQU8sRUFBRSxJQUFJO01BQ2JDLFdBQVcsRUFBRSxJQUFJO01BQ2pCQyxLQUFLLEVBQUUsRUFBRTtNQUNUQyxLQUFLLEVBQUUsQ0FBQztNQUNSQyxZQUFZLEVBQUVDLHNCQUFzQixDQUFDLGNBQWM7SUFDckQsQ0FBQztFQUNILENBQUM7RUFDREMsUUFBUSxFQUFFLG92RUFBb3ZFO0VBQzl2RUMsT0FBTyxFQUFFLFNBQVNBLE9BQU9BLENBQUEsRUFBRztJQUMxQixJQUFJLElBQUksQ0FBQ0MsV0FBVyxFQUFFO01BQ3BCLElBQUksQ0FBQ0MsUUFBUSxDQUFDQyxrQkFBa0IsR0FBRyxvQ0FBb0MsR0FBR0MsaUJBQWlCLENBQUMscUJBQXFCLENBQUMsR0FBRywwQ0FBMEMsR0FBRyxJQUFJLENBQUNILFdBQVcsR0FBRyxjQUFjLEdBQUcsSUFBSSxDQUFDSSxNQUFNLENBQUND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QUFDUixVQUFVLENBQUMsQ0FBQztRQUNmUSxFQUFFLENBQUNQLFNBQVMsQ0FBQyxLQUFLLENBQUM7TUFDckIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUNEeUIsU0FBUyxFQUFFLFNBQVNBLFNBQVNBLENBQUEsRUFBRztNQUM5QixJQUFJbEIsRUFBRSxHQUFHLElBQUk7TUFDYkEsRUFBRSxDQUFDM0IsR0FBRyxHQUFHLEVBQUU7TUFDWCxJQUFJLENBQUNDLEtBQUssQ0FBQzZDLE9BQU8sQ0FBQyxVQUFVeEMsS0FBSyxFQUFFeUMsR0FBRyxFQUFFO1FBQ3ZDcEIsRUFBRSxDQUFDM0IsR0FBRyxDQUFDeUIsSUFBSSxDQUFDbkIsS0FBSyxDQUFDMEMsRUFBRSxDQUFDO01BQ3ZCLENBQUMsQ0FBQztNQUNGckIsRUFBRSxDQUFDRCxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRUMsRUFBRSxDQUFDM0IsR0FBRyxDQUFDO01BQzlCMkIsRUFBRSxDQUFDc0IsS0FBSyxDQUFDLGtCQUFrQixFQUFFdEIsRUFBRSxDQUFDM0IsR0FBRyxDQUFDO0lBQ3RDLENBQUM7SUFDRGtELFlBQVksRUFBRSxTQUFTQSxZQUFZQSxDQUFDQyxZQUFZLEVBQUVDLElBQUksRUFBRUMsS0FBSyxFQUFFO01BQzdERixZQUFZLENBQUNDLElBQUksRUFBRUMsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFDREMsY0FBYyxFQUFFLFNBQVNBLGNBQWNBLENBQUNDLEdBQUcsRUFBRUMsSUFBSSxFQUFFO01BQ2pELElBQUlDLENBQUM7TUFDTCxLQUFLQSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdELElBQUksQ0FBQ3hCLE1BQU0sRUFBRXlCLENBQUMsRUFBRSxFQUFFO1FBQ2hDLElBQUlELElBQUksQ0FBQ0MsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUtGLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtVQUMvQixPQUFPLElBQUk7UUFDYjtNQUNGO01BQ0EsT0FBTyxLQUFLO0lBQ2QsQ0FBQztJQUNERyxVQUFVLEVBQUUsU0FBU0EsVUFBVUEsQ0FBQ0MsS0FBSyxFQUFFO01BQ3JDLElBQUksQ0FBQzFELEtBQUssQ0FBQzJELE1BQU0sQ0FBQ0QsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUM3QjtFQUNGLENBQUM7RUFDREUsS0FBSyxFQUFFO0lBQ0w1RCxLQUFLLEVBQUUsU0FBU0EsS0FBS0EsQ0FBQSxFQUFHO01BQ3RCLElBQUksQ0FBQzRDLFNBQVMsQ0FBQyxDQUFDO0lBQ2xCO0VBQ0Y7QUFDRixDQUFDLENBQUMiLCJpZ25vcmVMaXN0IjpbXX0=
},{}]},{},[1])
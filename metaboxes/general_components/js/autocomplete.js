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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWdWUiLCJjb21wb25lbnQiLCJWdWVTZWxlY3QiLCJwcm9wcyIsImRhdGEiLCJpZHMiLCJpdGVtcyIsInNlYXJjaCIsIm9wdGlvbnMiLCJsb2FkaW5nIiwiaXRlbUhvdmVyZWQiLCJ2YWx1ZSIsImxpbWl0IiwidHJhbnNsYXRpb25zIiwid3BjZnRvX2dsb2JhbF9zZXR0aW5ncyIsInRlbXBsYXRlIiwiY3JlYXRlZCIsImZpZWxkX3ZhbHVlIiwiZ2V0UG9zdHMiLCJzdG1fd3BjZnRvX2FqYXh1cmwiLCJzdG1fd3BjZnRvX25vbmNlcyIsImZpZWxkcyIsInBvc3RfdHlwZSIsImpvaW4iLCJjbGVhckl0ZW1zIiwiaXNMb2FkaW5nIiwiZmllbGRfZGF0YSIsIm1ldGhvZHMiLCJfaXNMb2FkaW5nIiwic2V0U2VsZWN0ZWQiLCJwdXNoIiwiJHNldCIsInZtIiwiZmlsdGVyZWQiLCJmaWx0ZXIiLCJlbCIsInVuZGVyTGltaXQiLCJsZW5ndGgiLCJvblNlYXJjaCIsIl90aGlzIiwiZXhjbHVkZSIsInBvc3RfdHlwZXMiLCJ1cmwiLCJ2YXJpYWJsZSIsImZpZWxkX25hbWUiLCIkaHR0cCIsImdldCIsInRoZW4iLCJyZXNwb25zZSIsImJvZHkiLCJ1cGRhdGVJZHMiLCJmb3JFYWNoIiwia2V5IiwiaWQiLCIkZW1pdCIsImNhbGxGdW5jdGlvbiIsImZ1bmN0aW9uTmFtZSIsIml0ZW0iLCJtb2RlbCIsImNvbnRhaW5zT2JqZWN0Iiwib2JqIiwibGlzdCIsImkiLCJyZW1vdmVJdGVtIiwiaW5kZXgiLCJzcGxpY2UiLCJ3YXRjaCJdLCJzb3VyY2VzIjpbImZha2VfYTdlMjU3MmEuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cblZ1ZS5jb21wb25lbnQoJ3Ytc2VsZWN0JywgVnVlU2VsZWN0LlZ1ZVNlbGVjdCk7XG5WdWUuY29tcG9uZW50KCd3cGNmdG9fYXV0b2NvbXBsZXRlJywge1xuICBwcm9wczogWydmaWVsZHMnLCAnZmllbGRfbGFiZWwnLCAnZmllbGRfbmFtZScsICdmaWVsZF9pZCcsICdmaWVsZF92YWx1ZScsICdmaWVsZF9kYXRhJ10sXG4gIGRhdGE6IGZ1bmN0aW9uIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkczogW10sXG4gICAgICBpdGVtczogW10sXG4gICAgICBzZWFyY2g6ICcnLFxuICAgICAgb3B0aW9uczogW10sXG4gICAgICBsb2FkaW5nOiB0cnVlLFxuICAgICAgaXRlbUhvdmVyZWQ6IG51bGwsXG4gICAgICB2YWx1ZTogJycsXG4gICAgICBsaW1pdDogMCxcbiAgICAgIHRyYW5zbGF0aW9uczogd3BjZnRvX2dsb2JhbF9zZXR0aW5nc1sndHJhbnNsYXRpb25zJ11cbiAgICB9O1xuICB9LFxuICB0ZW1wbGF0ZTogXCJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0b19nZW5lcmljX2ZpZWxkIHdwY2Z0b19nZW5lcmljX2ZpZWxkX2F1dG9jb21wbGV0ZVxcXCI+XFxuXFxuICAgICAgICAgICAgPHdwY2Z0b19maWVsZHNfYXNpZGVfYmVmb3JlIDpmaWVsZHM9XFxcImZpZWxkc1xcXCIgOmZpZWxkX2xhYmVsPVxcXCJmaWVsZF9sYWJlbFxcXCI+PC93cGNmdG9fZmllbGRzX2FzaWRlX2JlZm9yZT5cXG5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG8tZmllbGQtY29udGVudFxcXCI+XFxuXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0by1hdXRvY29tcGxldGUtc2VhcmNoXFxcIiB2LWJpbmQ6Y2xhc3M9XFxcInsnbG9hZGluZyc6IGxvYWRpbmd9XFxcIj5cXG4gICAgICAgICAgICAgICAgICBcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInYtc2VsZWN0LXNlYXJjaFxcXCIgdi1pZj1cXFwidW5kZXJMaW1pdCgpXFxcIj5cXG5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cXFwiZmEgZmEtcGx1cy1jaXJjbGVcXFwiPjwvaT5cXG5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8di1zZWxlY3QgbGFiZWw9XFxcInRpdGxlXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVxcXCJzZWFyY2hcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBpbnB1dD1cXFwic2V0U2VsZWN0ZWQoJGV2ZW50KVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOm9wdGlvbnM9XFxcIm9wdGlvbnNcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBzZWFyY2g9XFxcIm9uU2VhcmNoKCRldmVudClcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzbG90PVxcXCJuby1vcHRpb25zXFxcIiB2LWh0bWw9XFxcInRyYW5zbGF0aW9uc1sndnVlX3NlbGVjdF9ub3RpY2UnXVxcXCI+PC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdi1zZWxlY3Q+XFxuXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG5cXG4gICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cXFwid3BjZnRvLWF1dG9jb21wbGV0ZVxcXCIgdi1iaW5kOmNsYXNzPVxcXCJ7J2xpbWl0ZWQnIDogIXVuZGVyTGltaXQoKX1cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSB2LWZvcj1cXFwiKGl0ZW0sIGluZGV4KSBpbiBpdGVtc1xcXCIgdi1pZj1cXFwidHlwZW9mIGl0ZW0gIT09ICdzdHJpbmcnXFxcIiA6Y2xhc3M9XFxcInsgJ2hvdmVyZWQnIDogaXRlbUhvdmVyZWQgPT0gaW5kZXggfVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIml0ZW0td3JhcHBlclxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHYtYmluZDpzcmM9XFxcIml0ZW0uaW1hZ2VcXFwiIHYtaWY9XFxcIml0ZW0uaW1hZ2VcXFwiIGNsYXNzPVxcXCJpdGVtLWltYWdlXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIml0ZW0tZGF0YVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gdi1odG1sPVxcXCJpdGVtLnRpdGxlXFxcIiBjbGFzcz1cXFwiaXRlbS10aXRsZVxcXCI+PC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHYtaHRtbD1cXFwiaXRlbS5leGNlcnB0XFxcIiBjbGFzcz1cXFwiaXRlbS1leGNlcnB0XFxcIiB2LWlmPVxcXCJpdGVtLmV4Y2VycHRcXFwiPjwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XFxcImZhIGZhLXRyYXNoLWFsdFxcXCIgQGNsaWNrPVxcXCJyZW1vdmVJdGVtKGluZGV4KVxcXCIgQG1vdXNlb3Zlcj1cXFwiaXRlbUhvdmVyZWQgPSBpbmRleFxcXCIgQG1vdXNlbGVhdmU9XFxcIml0ZW1Ib3ZlcmVkID0gbnVsbFxcXCI+PC9pPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XFxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxcblxcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6bmFtZT1cXFwiZmllbGRfbmFtZVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVxcXCJ2YWx1ZVxcXCIvPlxcblxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICBcXG4gICAgICAgICAgICA8L2Rpdj5cXG5cXG4gICAgICAgICAgICA8d3BjZnRvX2ZpZWxkc19hc2lkZV9hZnRlciA6ZmllbGRzPVxcXCJmaWVsZHNcXFwiPjwvd3BjZnRvX2ZpZWxkc19hc2lkZV9hZnRlcj5cXG5cXG4gICAgICAgIDwvZGl2PlxcbiAgICBcIixcbiAgY3JlYXRlZDogZnVuY3Rpb24gY3JlYXRlZCgpIHtcbiAgICBpZiAodGhpcy5maWVsZF92YWx1ZSkge1xuICAgICAgdGhpcy5nZXRQb3N0cyhzdG1fd3BjZnRvX2FqYXh1cmwgKyAnP2FjdGlvbj13cGNmdG9fc2VhcmNoX3Bvc3RzJm5vbmNlPScgKyBzdG1fd3BjZnRvX25vbmNlc1snd3BjZnRvX3NlYXJjaF9wb3N0cyddICsgJyZwb3N0c19wZXJfcGFnZT0tMSZvcmRlcmJ5PXBvc3RfX2luJmlkcz0nICsgdGhpcy5maWVsZF92YWx1ZSArICcmcG9zdF90eXBlcz0nICsgdGhpcy5maWVsZHMucG9zdF90eXBlLmpvaW4oJywnKSwgJ2l0ZW1zJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2xlYXJJdGVtcygpO1xuICAgICAgdGhpcy5pc0xvYWRpbmcoZmFsc2UpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdGhpcy5maWVsZF9kYXRhICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgdGhpcy5maWVsZF9kYXRhLmxpbWl0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5saW1pdCA9IHRoaXMuZmllbGRfZGF0YS5saW1pdDtcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBpc0xvYWRpbmc6IGZ1bmN0aW9uIGlzTG9hZGluZyhfaXNMb2FkaW5nKSB7XG4gICAgICB0aGlzLmxvYWRpbmcgPSBfaXNMb2FkaW5nO1xuICAgIH0sXG4gICAgc2V0U2VsZWN0ZWQ6IGZ1bmN0aW9uIHNldFNlbGVjdGVkKHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWUpIHRoaXMuaXRlbXMucHVzaCh2YWx1ZSk7XG4gICAgICAvKlJlc2V0IG9wdGlvbnMqL1xuXG4gICAgICB0aGlzLiRzZXQodGhpcywgJ29wdGlvbnMnLCBbXSk7XG4gICAgICB0aGlzLiRzZXQodGhpcywgJ3NlYXJjaCcsICcnKTtcbiAgICB9LFxuICAgIGNsZWFySXRlbXM6IGZ1bmN0aW9uIGNsZWFySXRlbXMoKSB7XG4gICAgICB2YXIgdm0gPSB0aGlzO1xuICAgICAgdmFyIGZpbHRlcmVkID0gdm1bJ2l0ZW1zJ10uZmlsdGVyKGZ1bmN0aW9uIChlbCkge1xuICAgICAgICByZXR1cm4gZWwgIT0gbnVsbCB8fCBlbCAhPT0gJyc7XG4gICAgICB9KTtcbiAgICAgIHZtLiRzZXQodm0sICdpdGVtcycsIGZpbHRlcmVkKTtcbiAgICB9LFxuICAgIHVuZGVyTGltaXQ6IGZ1bmN0aW9uIHVuZGVyTGltaXQoKSB7XG4gICAgICBpZiAodGhpcy5saW1pdCA9PT0gMCkgcmV0dXJuIHRydWU7XG4gICAgICByZXR1cm4gdGhpcy5pdGVtcy5sZW5ndGggPCB0aGlzLmxpbWl0O1xuICAgIH0sXG4gICAgb25TZWFyY2g6IGZ1bmN0aW9uIG9uU2VhcmNoKHNlYXJjaCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgdmFyIGV4Y2x1ZGUgPSBfdGhpcy5pZHMuam9pbignLCcpO1xuXG4gICAgICB2YXIgcG9zdF90eXBlcyA9IF90aGlzLmZpZWxkc1sncG9zdF90eXBlJ10uam9pbignLCcpO1xuXG4gICAgICBfdGhpcy5nZXRQb3N0cyhzdG1fd3BjZnRvX2FqYXh1cmwgKyAnP2FjdGlvbj13cGNmdG9fc2VhcmNoX3Bvc3RzJm5vbmNlPScgKyBzdG1fd3BjZnRvX25vbmNlc1snd3BjZnRvX3NlYXJjaF9wb3N0cyddICsgJyZleGNsdWRlX2lkcz0nICsgZXhjbHVkZSArICcmcz0nICsgc2VhcmNoICsgJyZwb3N0X3R5cGVzPScgKyBwb3N0X3R5cGVzLCAnb3B0aW9ucycpO1xuICAgIH0sXG4gICAgZ2V0UG9zdHM6IGZ1bmN0aW9uIGdldFBvc3RzKHVybCwgdmFyaWFibGUpIHtcbiAgICAgIHZhciB2bSA9IHRoaXM7XG4gICAgICB2bS5pc0xvYWRpbmcodHJ1ZSk7XG4gICAgICAvKkFkZGluZyBmaWVsZCBJRCB0byBmaWx0ZXJzIHRoZW4qL1xuXG4gICAgICB1cmwgKz0gJyZuYW1lPScgKyB2bS5maWVsZF9uYW1lO1xuICAgICAgdGhpcy4kaHR0cC5nZXQodXJsKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICB2bVt2YXJpYWJsZV0gPSByZXNwb25zZS5ib2R5O1xuICAgICAgICB2bS5jbGVhckl0ZW1zKCk7XG4gICAgICAgIHZtLmlzTG9hZGluZyhmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIHVwZGF0ZUlkczogZnVuY3Rpb24gdXBkYXRlSWRzKCkge1xuICAgICAgdmFyIHZtID0gdGhpcztcbiAgICAgIHZtLmlkcyA9IFtdO1xuICAgICAgdGhpcy5pdGVtcy5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgIHZtLmlkcy5wdXNoKHZhbHVlLmlkKTtcbiAgICAgIH0pO1xuICAgICAgdm0uJHNldCh0aGlzLCAndmFsdWUnLCB2bS5pZHMpO1xuICAgICAgdm0uJGVtaXQoJ3dwY2Z0by1nZXQtdmFsdWUnLCB2bS5pZHMpO1xuICAgIH0sXG4gICAgY2FsbEZ1bmN0aW9uOiBmdW5jdGlvbiBjYWxsRnVuY3Rpb24oZnVuY3Rpb25OYW1lLCBpdGVtLCBtb2RlbCkge1xuICAgICAgZnVuY3Rpb25OYW1lKGl0ZW0sIG1vZGVsKTtcbiAgICB9LFxuICAgIGNvbnRhaW5zT2JqZWN0OiBmdW5jdGlvbiBjb250YWluc09iamVjdChvYmosIGxpc3QpIHtcbiAgICAgIHZhciBpO1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAobGlzdFtpXVsnaWQnXSA9PT0gb2JqWydpZCddKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG4gICAgcmVtb3ZlSXRlbTogZnVuY3Rpb24gcmVtb3ZlSXRlbShpbmRleCkge1xuICAgICAgdGhpcy5pdGVtcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfSxcbiAgd2F0Y2g6IHtcbiAgICBpdGVtczogZnVuY3Rpb24gaXRlbXMoKSB7XG4gICAgICB0aGlzLnVwZGF0ZUlkcygpO1xuICAgIH1cbiAgfVxufSk7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQUEsR0FBRyxDQUFDQyxTQUFKLENBQWMsVUFBZCxFQUEwQkMsU0FBUyxDQUFDQSxTQUFwQztBQUNBRixHQUFHLENBQUNDLFNBQUosQ0FBYyxxQkFBZCxFQUFxQztFQUNuQ0UsS0FBSyxFQUFFLENBQUMsUUFBRCxFQUFXLGFBQVgsRUFBMEIsWUFBMUIsRUFBd0MsVUFBeEMsRUFBb0QsYUFBcEQsRUFBbUUsWUFBbkUsQ0FENEI7RUFFbkNDLElBQUksRUFBRSxTQUFTQSxJQUFULEdBQWdCO0lBQ3BCLE9BQU87TUFDTEMsR0FBRyxFQUFFLEVBREE7TUFFTEMsS0FBSyxFQUFFLEVBRkY7TUFHTEMsTUFBTSxFQUFFLEVBSEg7TUFJTEMsT0FBTyxFQUFFLEVBSko7TUFLTEMsT0FBTyxFQUFFLElBTEo7TUFNTEMsV0FBVyxFQUFFLElBTlI7TUFPTEMsS0FBSyxFQUFFLEVBUEY7TUFRTEMsS0FBSyxFQUFFLENBUkY7TUFTTEMsWUFBWSxFQUFFQyxzQkFBc0IsQ0FBQyxjQUFEO0lBVC9CLENBQVA7RUFXRCxDQWRrQztFQWVuQ0MsUUFBUSxFQUFFLG92RUFmeUI7RUFnQm5DQyxPQUFPLEVBQUUsU0FBU0EsT0FBVCxHQUFtQjtJQUMxQixJQUFJLEtBQUtDLFdBQVQsRUFBc0I7TUFDcEIsS0FBS0MsUUFBTCxDQUFjQyxrQkFBa0IsR0FBRyxvQ0FBckIsR0FBNERDLGlCQUFpQixDQUFDLHFCQUFELENBQTdFLEdBQXVHLDBDQUF2RyxHQUFvSixLQUFLSCxXQUF6SixHQUF1SyxjQUF2SyxHQUF3TCxLQUFLSSxNQUFMLENBQVlDLFNBQVosQ0FBc0JD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
},{}]},{},[1])
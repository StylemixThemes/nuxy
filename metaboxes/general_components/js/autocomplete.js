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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWdWUiLCJjb21wb25lbnQiLCJWdWVTZWxlY3QiLCJwcm9wcyIsImRhdGEiLCJpZHMiLCJpdGVtcyIsInNlYXJjaCIsIm9wdGlvbnMiLCJsb2FkaW5nIiwiaXRlbUhvdmVyZWQiLCJ2YWx1ZSIsImxpbWl0IiwidHJhbnNsYXRpb25zIiwid3BjZnRvX2dsb2JhbF9zZXR0aW5ncyIsInRlbXBsYXRlIiwiY3JlYXRlZCIsImZpZWxkX3ZhbHVlIiwiZ2V0UG9zdHMiLCJzdG1fd3BjZnRvX2FqYXh1cmwiLCJzdG1fd3BjZnRvX25vbmNlcyIsImZpZWxkcyIsInBvc3RfdHlwZSIsImpvaW4iLCJjbGVhckl0ZW1zIiwiaXNMb2FkaW5nIiwiZmllbGRfZGF0YSIsIm1ldGhvZHMiLCJfaXNMb2FkaW5nIiwic2V0U2VsZWN0ZWQiLCJwdXNoIiwiJHNldCIsInZtIiwiZmlsdGVyZWQiLCJmaWx0ZXIiLCJlbCIsInVuZGVyTGltaXQiLCJsZW5ndGgiLCJvblNlYXJjaCIsIl90aGlzIiwiZXhjbHVkZSIsInBvc3RfdHlwZXMiLCJ1cmwiLCJ2YXJpYWJsZSIsImZpZWxkX25hbWUiLCIkaHR0cCIsImdldCIsInRoZW4iLCJyZXNwb25zZSIsImJvZHkiLCJ1cGRhdGVJZHMiLCJmb3JFYWNoIiwia2V5IiwiaWQiLCIkZW1pdCIsImNhbGxGdW5jdGlvbiIsImZ1bmN0aW9uTmFtZSIsIml0ZW0iLCJtb2RlbCIsImNvbnRhaW5zT2JqZWN0Iiwib2JqIiwibGlzdCIsImkiLCJyZW1vdmVJdGVtIiwiaW5kZXgiLCJzcGxpY2UiLCJ3YXRjaCJdLCJzb3VyY2VzIjpbImZha2VfNzAwNzcxZi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuVnVlLmNvbXBvbmVudCgndi1zZWxlY3QnLCBWdWVTZWxlY3QuVnVlU2VsZWN0KTtcblZ1ZS5jb21wb25lbnQoJ3dwY2Z0b19hdXRvY29tcGxldGUnLCB7XG4gIHByb3BzOiBbJ2ZpZWxkcycsICdmaWVsZF9sYWJlbCcsICdmaWVsZF9uYW1lJywgJ2ZpZWxkX2lkJywgJ2ZpZWxkX3ZhbHVlJywgJ2ZpZWxkX2RhdGEnXSxcbiAgZGF0YTogZnVuY3Rpb24gZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaWRzOiBbXSxcbiAgICAgIGl0ZW1zOiBbXSxcbiAgICAgIHNlYXJjaDogJycsXG4gICAgICBvcHRpb25zOiBbXSxcbiAgICAgIGxvYWRpbmc6IHRydWUsXG4gICAgICBpdGVtSG92ZXJlZDogbnVsbCxcbiAgICAgIHZhbHVlOiAnJyxcbiAgICAgIGxpbWl0OiAwLFxuICAgICAgdHJhbnNsYXRpb25zOiB3cGNmdG9fZ2xvYmFsX3NldHRpbmdzWyd0cmFuc2xhdGlvbnMnXVxuICAgIH07XG4gIH0sXG4gIHRlbXBsYXRlOiBcIlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvX2dlbmVyaWNfZmllbGQgd3BjZnRvX2dlbmVyaWNfZmllbGRfYXV0b2NvbXBsZXRlXFxcIj5cXG5cXG4gICAgICAgICAgICA8d3BjZnRvX2ZpZWxkc19hc2lkZV9iZWZvcmUgOmZpZWxkcz1cXFwiZmllbGRzXFxcIiA6ZmllbGRfbGFiZWw9XFxcImZpZWxkX2xhYmVsXFxcIj48L3dwY2Z0b19maWVsZHNfYXNpZGVfYmVmb3JlPlxcblxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0by1maWVsZC1jb250ZW50XFxcIj5cXG5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvLWF1dG9jb21wbGV0ZS1zZWFyY2hcXFwiIHYtYmluZDpjbGFzcz1cXFwieydsb2FkaW5nJzogbG9hZGluZ31cXFwiPlxcbiAgICAgICAgICAgICAgICAgIFxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidi1zZWxlY3Qtc2VhcmNoXFxcIiB2LWlmPVxcXCJ1bmRlckxpbWl0KClcXFwiPlxcblxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJmYSBmYS1wbHVzLWNpcmNsZVxcXCI+PC9pPlxcblxcbiAgICAgICAgICAgICAgICAgICAgICAgIDx2LXNlbGVjdCBsYWJlbD1cXFwidGl0bGVcXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XFxcInNlYXJjaFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGlucHV0PVxcXCJzZXRTZWxlY3RlZCgkZXZlbnQpXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6b3B0aW9ucz1cXFwib3B0aW9uc1xcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQHNlYXJjaD1cXFwib25TZWFyY2goJGV2ZW50KVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHNsb3Q9XFxcIm5vLW9wdGlvbnNcXFwiIHYtaHRtbD1cXFwidHJhbnNsYXRpb25zWyd2dWVfc2VsZWN0X25vdGljZSddXFxcIj48L3NwYW4+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC92LXNlbGVjdD5cXG5cXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcblxcbiAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzPVxcXCJ3cGNmdG8tYXV0b2NvbXBsZXRlXFxcIiB2LWJpbmQ6Y2xhc3M9XFxcInsnbGltaXRlZCcgOiAhdW5kZXJMaW1pdCgpfVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIHYtZm9yPVxcXCIoaXRlbSwgaW5kZXgpIGluIGl0ZW1zXFxcIiB2LWlmPVxcXCJ0eXBlb2YgaXRlbSAhPT0gJ3N0cmluZydcXFwiIDpjbGFzcz1cXFwieyAnaG92ZXJlZCcgOiBpdGVtSG92ZXJlZCA9PSBpbmRleCB9XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiaXRlbS13cmFwcGVyXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgdi1iaW5kOnNyYz1cXFwiaXRlbS5pbWFnZVxcXCIgdi1pZj1cXFwiaXRlbS5pbWFnZVxcXCIgY2xhc3M9XFxcIml0ZW0taW1hZ2VcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiaXRlbS1kYXRhXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiB2LWh0bWw9XFxcIml0ZW0udGl0bGVcXFwiIGNsYXNzPVxcXCJpdGVtLXRpdGxlXFxcIj48L3NwYW4+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gdi1odG1sPVxcXCJpdGVtLmV4Y2VycHRcXFwiIGNsYXNzPVxcXCJpdGVtLWV4Y2VycHRcXFwiIHYtaWY9XFxcIml0ZW0uZXhjZXJwdFxcXCI+PC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cXFwiZmEgZmEtdHJhc2gtYWx0XFxcIiBAY2xpY2s9XFxcInJlbW92ZUl0ZW0oaW5kZXgpXFxcIiBAbW91c2VvdmVyPVxcXCJpdGVtSG92ZXJlZCA9IGluZGV4XFxcIiBAbW91c2VsZWF2ZT1cXFwiaXRlbUhvdmVyZWQgPSBudWxsXFxcIj48L2k+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cXG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XFxuXFxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtYmluZDpuYW1lPVxcXCJmaWVsZF9uYW1lXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XFxcInZhbHVlXFxcIi8+XFxuXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIFxcbiAgICAgICAgICAgIDwvZGl2PlxcblxcbiAgICAgICAgICAgIDx3cGNmdG9fZmllbGRzX2FzaWRlX2FmdGVyIDpmaWVsZHM9XFxcImZpZWxkc1xcXCI+PC93cGNmdG9fZmllbGRzX2FzaWRlX2FmdGVyPlxcblxcbiAgICAgICAgPC9kaXY+XFxuICAgIFwiLFxuICBjcmVhdGVkOiBmdW5jdGlvbiBjcmVhdGVkKCkge1xuICAgIGlmICh0aGlzLmZpZWxkX3ZhbHVlKSB7XG4gICAgICB0aGlzLmdldFBvc3RzKHN0bV93cGNmdG9fYWpheHVybCArICc/YWN0aW9uPXdwY2Z0b19zZWFyY2hfcG9zdHMmbm9uY2U9JyArIHN0bV93cGNmdG9fbm9uY2VzWyd3cGNmdG9fc2VhcmNoX3Bvc3RzJ10gKyAnJnBvc3RzX3Blcl9wYWdlPS0xJm9yZGVyYnk9cG9zdF9faW4maWRzPScgKyB0aGlzLmZpZWxkX3ZhbHVlICsgJyZwb3N0X3R5cGVzPScgKyB0aGlzLmZpZWxkcy5wb3N0X3R5cGUuam9pbignLCcpLCAnaXRlbXMnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jbGVhckl0ZW1zKCk7XG4gICAgICB0aGlzLmlzTG9hZGluZyhmYWxzZSk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB0aGlzLmZpZWxkX2RhdGEgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB0aGlzLmZpZWxkX2RhdGEubGltaXQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLmxpbWl0ID0gdGhpcy5maWVsZF9kYXRhLmxpbWl0O1xuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGlzTG9hZGluZzogZnVuY3Rpb24gaXNMb2FkaW5nKF9pc0xvYWRpbmcpIHtcbiAgICAgIHRoaXMubG9hZGluZyA9IF9pc0xvYWRpbmc7XG4gICAgfSxcbiAgICBzZXRTZWxlY3RlZDogZnVuY3Rpb24gc2V0U2VsZWN0ZWQodmFsdWUpIHtcbiAgICAgIGlmICh2YWx1ZSkgdGhpcy5pdGVtcy5wdXNoKHZhbHVlKTtcbiAgICAgIC8qUmVzZXQgb3B0aW9ucyovXG5cbiAgICAgIHRoaXMuJHNldCh0aGlzLCAnb3B0aW9ucycsIFtdKTtcbiAgICAgIHRoaXMuJHNldCh0aGlzLCAnc2VhcmNoJywgJycpO1xuICAgIH0sXG4gICAgY2xlYXJJdGVtczogZnVuY3Rpb24gY2xlYXJJdGVtcygpIHtcbiAgICAgIHZhciB2bSA9IHRoaXM7XG4gICAgICB2YXIgZmlsdGVyZWQgPSB2bVsnaXRlbXMnXS5maWx0ZXIoZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIHJldHVybiBlbCAhPSBudWxsIHx8IGVsICE9PSAnJztcbiAgICAgIH0pO1xuICAgICAgdm0uJHNldCh2bSwgJ2l0ZW1zJywgZmlsdGVyZWQpO1xuICAgIH0sXG4gICAgdW5kZXJMaW1pdDogZnVuY3Rpb24gdW5kZXJMaW1pdCgpIHtcbiAgICAgIGlmICh0aGlzLmxpbWl0ID09PSAwKSByZXR1cm4gdHJ1ZTtcbiAgICAgIHJldHVybiB0aGlzLml0ZW1zLmxlbmd0aCA8IHRoaXMubGltaXQ7XG4gICAgfSxcbiAgICBvblNlYXJjaDogZnVuY3Rpb24gb25TZWFyY2goc2VhcmNoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICB2YXIgZXhjbHVkZSA9IF90aGlzLmlkcy5qb2luKCcsJyk7XG5cbiAgICAgIHZhciBwb3N0X3R5cGVzID0gX3RoaXMuZmllbGRzWydwb3N0X3R5cGUnXS5qb2luKCcsJyk7XG5cbiAgICAgIF90aGlzLmdldFBvc3RzKHN0bV93cGNmdG9fYWpheHVybCArICc/YWN0aW9uPXdwY2Z0b19zZWFyY2hfcG9zdHMmbm9uY2U9JyArIHN0bV93cGNmdG9fbm9uY2VzWyd3cGNmdG9fc2VhcmNoX3Bvc3RzJ10gKyAnJmV4Y2x1ZGVfaWRzPScgKyBleGNsdWRlICsgJyZzPScgKyBzZWFyY2ggKyAnJnBvc3RfdHlwZXM9JyArIHBvc3RfdHlwZXMsICdvcHRpb25zJyk7XG4gICAgfSxcbiAgICBnZXRQb3N0czogZnVuY3Rpb24gZ2V0UG9zdHModXJsLCB2YXJpYWJsZSkge1xuICAgICAgdmFyIHZtID0gdGhpcztcbiAgICAgIHZtLmlzTG9hZGluZyh0cnVlKTtcbiAgICAgIC8qQWRkaW5nIGZpZWxkIElEIHRvIGZpbHRlcnMgdGhlbiovXG5cbiAgICAgIHVybCArPSAnJm5hbWU9JyArIHZtLmZpZWxkX25hbWU7XG4gICAgICB0aGlzLiRodHRwLmdldCh1cmwpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHZtW3ZhcmlhYmxlXSA9IHJlc3BvbnNlLmJvZHk7XG4gICAgICAgIHZtLmNsZWFySXRlbXMoKTtcbiAgICAgICAgdm0uaXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgdXBkYXRlSWRzOiBmdW5jdGlvbiB1cGRhdGVJZHMoKSB7XG4gICAgICB2YXIgdm0gPSB0aGlzO1xuICAgICAgdm0uaWRzID0gW107XG4gICAgICB0aGlzLml0ZW1zLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgdm0uaWRzLnB1c2godmFsdWUuaWQpO1xuICAgICAgfSk7XG4gICAgICB2bS4kc2V0KHRoaXMsICd2YWx1ZScsIHZtLmlkcyk7XG4gICAgICB2bS4kZW1pdCgnd3BjZnRvLWdldC12YWx1ZScsIHZtLmlkcyk7XG4gICAgfSxcbiAgICBjYWxsRnVuY3Rpb246IGZ1bmN0aW9uIGNhbGxGdW5jdGlvbihmdW5jdGlvbk5hbWUsIGl0ZW0sIG1vZGVsKSB7XG4gICAgICBmdW5jdGlvbk5hbWUoaXRlbSwgbW9kZWwpO1xuICAgIH0sXG4gICAgY29udGFpbnNPYmplY3Q6IGZ1bmN0aW9uIGNvbnRhaW5zT2JqZWN0KG9iaiwgbGlzdCkge1xuICAgICAgdmFyIGk7XG5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChsaXN0W2ldWydpZCddID09PSBvYmpbJ2lkJ10pIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgICByZW1vdmVJdGVtOiBmdW5jdGlvbiByZW1vdmVJdGVtKGluZGV4KSB7XG4gICAgICB0aGlzLml0ZW1zLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9LFxuICB3YXRjaDoge1xuICAgIGl0ZW1zOiBmdW5jdGlvbiBpdGVtcygpIHtcbiAgICAgIHRoaXMudXBkYXRlSWRzKCk7XG4gICAgfVxuICB9XG59KTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBQSxHQUFHLENBQUNDLFNBQUosQ0FBYyxVQUFkLEVBQTBCQyxTQUFTLENBQUNBLFNBQXBDO0FBQ0FGLEdBQUcsQ0FBQ0MsU0FBSixDQUFjLHFCQUFkLEVBQXFDO0VBQ25DRSxLQUFLLEVBQUUsQ0FBQyxRQUFELEVBQVcsYUFBWCxFQUEwQixZQUExQixFQUF3QyxVQUF4QyxFQUFvRCxhQUFwRCxFQUFtRSxZQUFuRSxDQUQ0QjtFQUVuQ0MsSUFBSSxFQUFFLFNBQVNBLElBQVQsR0FBZ0I7SUFDcEIsT0FBTztNQUNMQyxHQUFHLEVBQUUsRUFEQTtNQUVMQyxLQUFLLEVBQUUsRUFGRjtNQUdMQyxNQUFNLEVBQUUsRUFISDtNQUlMQyxPQUFPLEVBQUUsRUFKSjtNQUtMQyxPQUFPLEVBQUUsSUFMSjtNQU1MQyxXQUFXLEVBQUUsSUFOUjtNQU9MQyxLQUFLLEVBQUUsRUFQRjtNQVFMQyxLQUFLLEVBQUUsQ0FSRjtNQVNMQyxZQUFZLEVBQUVDLHNCQUFzQixDQUFDLGNBQUQ7SUFUL0IsQ0FBUDtFQVdELENBZGtDO0VBZW5DQyxRQUFRLEVBQUUsb3ZFQWZ5QjtFQWdCbkNDLE9BQU8sRUFBRSxTQUFTQSxPQUFULEdBQW1CO0lBQzFCLElBQUksS0FBS0MsV0FBVCxFQUFzQjtNQUNwQixLQUFLQyxRQUFMLENBQWNDLGtCQUFrQixHQUFHLG9DQUFyQixHQUE0REMsaUJBQWlCLENBQUMscUJBQUQsQ0FBN0UsR0FBdUcsMENBQXZHLEdBQW9KLEtBQUtILFdBQXpKLEdBQXVLLGNBQXZLLEdBQXdMLEtBQUtJLE1BQUwsQ0FBWUMsU0FBWixDQUFzQkMs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
},{}]},{},[1])
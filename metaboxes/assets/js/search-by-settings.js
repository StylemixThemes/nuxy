(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function F() {};

      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

Vue.component('search-by-settings', {
  props: ['settings', 'placeholder', 'notfound'],
  data: function data() {
    return {
      data: {},
      found: {},
      value: '',
      selected: {},
      inFocus: false,
      selectedBlinkTimeout: false,
      hoverOnResults: false,
      searchTimeout: false,
      searchDone: false
    };
  },
  template: "\n        <div class=\"wpcfto_search_group\">\n\t\t\t<input @focus=\"focusIn\" @focusout=\"focusOut\" @input=\"search\" type=\"text\" name=\"\" v-model=\"value\" class=\"wpcfto-search-field\" :placeholder=\"placeholder\"/>\n            <div @mouseenter=\"resultsHover\" @mouseleave=\"resultsHoverOut\" v-if=\"value.length && Object.keys(found).length && inFocus\" class=\"wpcfto-search-results\">\n                <div @click=\"goToOption\" class=\"wpcfto-search-result\" v-for=\"(item, key) in found\" :data-key=\"key\">\n                    <div class=\"wpcfto-search-result-name\" :data-key=\"key\">{{ item.label_begin }}<span :data-key=\"key\">{{ item.label_match }}</span>{{ item.label_end }}</div>\n                    <div class=\"wpcfto-search-result-section\" :data-key=\"key\">\n                        {{ settings[item.section_id].name }}\n                        <span :data-key=\"key\" v-if=\"settings[item.section_id].fields[item.field_id] && settings[item.section_id].fields[item.field_id].submenu\">{{ settings[item.section_id].fields[item.field_id].submenu }}</span>\n                    </div>\n                </div>\n            </div>\n            <div v-if=\"value.length\" @click=\"removeSearchValue\" class=\"wpcfto-remove-search-value\"></div>\n            <div @mouseenter=\"resultsHover\" @mouseleave=\"resultsHoverOut\" v-if=\"value.length && searchDone === true && Object.keys(found).length === 0 && inFocus\" class=\"wpcfto-search-results not-found\">\n                <div class=\"wpcfto-search-result\">\n                    <div class=\"wpcfto-search-result-name\"><i class=\"nuxy-notfound-icon\"></i>{{ notfound }}</div>\n                </div>\n            </div>\n        </div>\n    ",
  methods: {
    search: function search(e) {
      var _this = this;

      this.searchDone = false;

      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }

      this.searchTimeout = setTimeout(function () {
        var doc = new DOMParser().parseFromString(_this.value, 'text/html');
        var search = doc.body.textContent.trim().toLowerCase() || '';
        _this.found = {};

        if (search) {
          for (var sectionID in _this.settings) {
            var section = _this.settings[sectionID];

            for (var fieldID in section.fields) {
              var field = section.fields[fieldID];

              if (field.label && field.type !== 'group_title') {
                if (!isNaN(fieldID.charAt(0))) {
                  fieldID = 'a' + fieldID;
                }

                var fieldLabel = field.label.toLowerCase();
                var searchIndex = fieldLabel.indexOf(search);
                var fieldNode = document.querySelector('.wpcfto-box-child.' + fieldID + ', .wpcfto-box.' + fieldID);

                if (fieldNode && searchIndex !== -1 && !fieldNode.classList.contains('notice_banner')) {
                  _this.found[sectionID + '_' + fieldID] = {
                    section_id: sectionID,
                    field_id: fieldID,
                    label_begin: field.label.slice(0, searchIndex),
                    label_match: field.label.slice(searchIndex, searchIndex + search.length),
                    label_end: field.label.slice(searchIndex + search.length)
                  };
                }
              }
            }
          }
        }

        _this.searchDone = true;
      }, 300);
    },
    goToOption: function goToOption(e) {
      var _this2 = this;

      var ths = this;
      Vue.nextTick().then(function () {
        var optionKey = e.target.getAttribute('data-key');
        var selected = _this2.found[optionKey];
        var tabTitle = document.querySelector('[data-section="' + selected.section_id + '"].wpcfto-nav-title');
        var activeTabs = document.querySelectorAll('.wpcfto-nav.active, .wpcfto-submenus > .active');
        var selectedSubmenu = _this2.settings[selected.section_id].fields[selected.field_id] ? _this2.settings[selected.section_id].fields[selected.field_id].submenu : false;
        var activeTabsContent = document.querySelectorAll('.wpcfto-tab.active');
        var selectedTabContent = document.querySelector('.wpcfto-tab#' + selected.section_id);
        var activeSubmenu;
        var selectedField = document.querySelector('.wpcfto-box.' + selected.field_id + ', .wpcfto-box-child.' + selected.field_id);
        var previousSelectedFields = document.querySelectorAll('.wpcfto-box.selected-field, .wpcfto-box-child.selected-field');

        var _iterator = _createForOfIteratorHelper(previousSelectedFields),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _field2 = _step.value;

            if (_field2.classList.contains('selected-field')) {
              _field2.classList.remove('selected-field');
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        var _iterator2 = _createForOfIteratorHelper(activeTabs),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var activeTab = _step2.value;
            activeTab.classList.remove('active');
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        var _iterator3 = _createForOfIteratorHelper(activeTabsContent),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var tabContent = _step3.value;
            tabContent.classList.remove('active');

            if (tabContent.classList.contains('has-submenu')) {
              var activeSubMenuFields = tabContent.querySelectorAll('.wpcfto-box');

              var _iterator7 = _createForOfIteratorHelper(activeSubMenuFields),
                  _step7;

              try {
                for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                  var _field3 = _step7.value;

                  _field3.setAttribute('style', 'display:none');
                }
              } catch (err) {
                _iterator7.e(err);
              } finally {
                _iterator7.f();
              }
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        tabTitle.closest('.wpcfto-nav').classList.add('active');
        selectedTabContent.classList.add('active');

        if (selectedSubmenu) {
          var submenus = document.querySelectorAll('.wpcfto-submenus > div');

          var _iterator4 = _createForOfIteratorHelper(submenus),
              _step4;

          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var submenu = _step4.value;

              if (submenu.textContent.trim() === selectedSubmenu.trim()) {
                activeSubmenu = submenu;
                submenu.classList.add('active');
                break;
              }
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }

          var fields = selectedTabContent.querySelectorAll('.wpcfto-box.' + activeSubmenu.getAttribute('data-submenu') + ', .wpcfto-box.' + activeSubmenu.getAttribute('data-submenu') + ' .wpcfto-box-child');

          var _iterator5 = _createForOfIteratorHelper(fields),
              _step5;

          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              var field = _step5.value;
              field.removeAttribute('style');
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }
        } else {
          var _fields = selectedTabContent.querySelectorAll('.wpcfto-box, .wpcfto-box-child');

          var _iterator6 = _createForOfIteratorHelper(_fields),
              _step6;

          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var _field = _step6.value;

              _field.removeAttribute('style');
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }
        }

        clearTimeout(ths.selectedBlinkTimeout);
        selectedField.classList.add('selected-field');
        window.scrollTo({
          top: selectedField.getBoundingClientRect().top + window.scrollY - 180,
          behavior: 'smooth'
        });
        ths.inFocus = false;
        ths.selectedBlinkTimeout = setTimeout(function () {
          if (selectedField.classList.contains('selected-field')) {
            selectedField.classList.remove('selected-field');
          }
        }, 5000);
      });
    },
    focusIn: function focusIn(e) {
      this.inFocus = true;
    },
    focusOut: function focusOut(e) {
      if (!this.hoverOnResults || !Object.keys(this.found).length) {
        this.inFocus = false;
      }
    },
    removeSearchValue: function removeSearchValue() {
      this.value = '';
      document.querySelector('.wpcfto-search-field').focus();
    },
    resultsHover: function resultsHover() {
      this.hoverOnResults = true;
    },
    resultsHoverOut: function resultsHoverOut() {
      this.hoverOnResults = false;
    }
  },
  watch: {
    value: function value(_value) {
      this.value = _value;
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsIm8iLCJhbGxvd0FycmF5TGlrZSIsIml0IiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJBcnJheSIsImlzQXJyYXkiLCJfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkiLCJsZW5ndGgiLCJpIiwiRiIsInMiLCJuIiwiZG9uZSIsInZhbHVlIiwiZSIsIl9lIiwiZiIsIlR5cGVFcnJvciIsIm5vcm1hbENvbXBsZXRpb24iLCJkaWRFcnIiLCJlcnIiLCJjYWxsIiwic3RlcCIsIm5leHQiLCJfZTIiLCJtaW5MZW4iLCJfYXJyYXlMaWtlVG9BcnJheSIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwic2xpY2UiLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJmcm9tIiwidGVzdCIsImFyciIsImxlbiIsImFycjIiLCJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJmb3VuZCIsInNlbGVjdGVkIiwiaW5Gb2N1cyIsInNlbGVjdGVkQmxpbmtUaW1lb3V0IiwiaG92ZXJPblJlc3VsdHMiLCJzZWFyY2hUaW1lb3V0Iiwic2VhcmNoRG9uZSIsInRlbXBsYXRlIiwibWV0aG9kcyIsInNlYXJjaCIsIl90aGlzIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsImRvYyIsIkRPTVBhcnNlciIsInBhcnNlRnJvbVN0cmluZyIsImJvZHkiLCJ0ZXh0Q29udGVudCIsInRyaW0iLCJ0b0xvd2VyQ2FzZSIsInNlY3Rpb25JRCIsInNldHRpbmdzIiwic2VjdGlvbiIsImZpZWxkSUQiLCJmaWVsZHMiLCJmaWVsZCIsImxhYmVsIiwidHlwZSIsImlzTmFOIiwiY2hhckF0IiwiZmllbGRMYWJlbCIsInNlYXJjaEluZGV4IiwiaW5kZXhPZiIsImZpZWxkTm9kZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwic2VjdGlvbl9pZCIsImZpZWxkX2lkIiwibGFiZWxfYmVnaW4iLCJsYWJlbF9tYXRjaCIsImxhYmVsX2VuZCIsImdvVG9PcHRpb24iLCJfdGhpczIiLCJ0aHMiLCJuZXh0VGljayIsInRoZW4iLCJvcHRpb25LZXkiLCJ0YXJnZXQiLCJnZXRBdHRyaWJ1dGUiLCJ0YWJUaXRsZSIsImFjdGl2ZVRhYnMiLCJxdWVyeVNlbGVjdG9yQWxsIiwic2VsZWN0ZWRTdWJtZW51Iiwic3VibWVudSIsImFjdGl2ZVRhYnNDb250ZW50Iiwic2VsZWN0ZWRUYWJDb250ZW50IiwiYWN0aXZlU3VibWVudSIsInNlbGVjdGVkRmllbGQiLCJwcmV2aW91c1NlbGVjdGVkRmllbGRzIiwiX2l0ZXJhdG9yIiwiX3N0ZXAiLCJfZmllbGQyIiwicmVtb3ZlIiwiX2l0ZXJhdG9yMiIsIl9zdGVwMiIsImFjdGl2ZVRhYiIsIl9pdGVyYXRvcjMiLCJfc3RlcDMiLCJ0YWJDb250ZW50IiwiYWN0aXZlU3ViTWVudUZpZWxkcyIsIl9pdGVyYXRvcjciLCJfc3RlcDciLCJfZmllbGQzIiwic2V0QXR0cmlidXRlIiwiY2xvc2VzdCIsImFkZCIsInN1Ym1lbnVzIiwiX2l0ZXJhdG9yNCIsIl9zdGVwNCIsIl9pdGVyYXRvcjUiLCJfc3RlcDUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJfZmllbGRzIiwiX2l0ZXJhdG9yNiIsIl9zdGVwNiIsIl9maWVsZCIsIndpbmRvdyIsInNjcm9sbFRvIiwidG9wIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwic2Nyb2xsWSIsImJlaGF2aW9yIiwiZm9jdXNJbiIsImZvY3VzT3V0Iiwia2V5cyIsInJlbW92ZVNlYXJjaFZhbHVlIiwiZm9jdXMiLCJyZXN1bHRzSG92ZXIiLCJyZXN1bHRzSG92ZXJPdXQiLCJ3YXRjaCIsIl92YWx1ZSJdLCJzb3VyY2VzIjpbImZha2VfY2FiYmQ0ZTIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyKG8sIGFsbG93QXJyYXlMaWtlKSB7IHZhciBpdCA9IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdIHx8IG9bXCJAQGl0ZXJhdG9yXCJdOyBpZiAoIWl0KSB7IGlmIChBcnJheS5pc0FycmF5KG8pIHx8IChpdCA9IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvKSkgfHwgYWxsb3dBcnJheUxpa2UgJiYgbyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHsgaWYgKGl0KSBvID0gaXQ7IHZhciBpID0gMDsgdmFyIEYgPSBmdW5jdGlvbiBGKCkge307IHJldHVybiB7IHM6IEYsIG46IGZ1bmN0aW9uIG4oKSB7IGlmIChpID49IG8ubGVuZ3RoKSByZXR1cm4geyBkb25lOiB0cnVlIH07IHJldHVybiB7IGRvbmU6IGZhbHNlLCB2YWx1ZTogb1tpKytdIH07IH0sIGU6IGZ1bmN0aW9uIGUoX2UpIHsgdGhyb3cgX2U7IH0sIGY6IEYgfTsgfSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGl0ZXJhdGUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH0gdmFyIG5vcm1hbENvbXBsZXRpb24gPSB0cnVlLCBkaWRFcnIgPSBmYWxzZSwgZXJyOyByZXR1cm4geyBzOiBmdW5jdGlvbiBzKCkgeyBpdCA9IGl0LmNhbGwobyk7IH0sIG46IGZ1bmN0aW9uIG4oKSB7IHZhciBzdGVwID0gaXQubmV4dCgpOyBub3JtYWxDb21wbGV0aW9uID0gc3RlcC5kb25lOyByZXR1cm4gc3RlcDsgfSwgZTogZnVuY3Rpb24gZShfZTIpIHsgZGlkRXJyID0gdHJ1ZTsgZXJyID0gX2UyOyB9LCBmOiBmdW5jdGlvbiBmKCkgeyB0cnkgeyBpZiAoIW5vcm1hbENvbXBsZXRpb24gJiYgaXRbXCJyZXR1cm5cIl0gIT0gbnVsbCkgaXRbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKGRpZEVycikgdGhyb3cgZXJyOyB9IH0gfTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cblZ1ZS5jb21wb25lbnQoJ3NlYXJjaC1ieS1zZXR0aW5ncycsIHtcbiAgcHJvcHM6IFsnc2V0dGluZ3MnLCAncGxhY2Vob2xkZXInLCAnbm90Zm91bmQnXSxcbiAgZGF0YTogZnVuY3Rpb24gZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZGF0YToge30sXG4gICAgICBmb3VuZDoge30sXG4gICAgICB2YWx1ZTogJycsXG4gICAgICBzZWxlY3RlZDoge30sXG4gICAgICBpbkZvY3VzOiBmYWxzZSxcbiAgICAgIHNlbGVjdGVkQmxpbmtUaW1lb3V0OiBmYWxzZSxcbiAgICAgIGhvdmVyT25SZXN1bHRzOiBmYWxzZSxcbiAgICAgIHNlYXJjaFRpbWVvdXQ6IGZhbHNlLFxuICAgICAgc2VhcmNoRG9uZTogZmFsc2VcbiAgICB9O1xuICB9LFxuICB0ZW1wbGF0ZTogXCJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0b19zZWFyY2hfZ3JvdXBcXFwiPlxcblxcdFxcdFxcdDxpbnB1dCBAZm9jdXM9XFxcImZvY3VzSW5cXFwiIEBmb2N1c291dD1cXFwiZm9jdXNPdXRcXFwiIEBpbnB1dD1cXFwic2VhcmNoXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBuYW1lPVxcXCJcXFwiIHYtbW9kZWw9XFxcInZhbHVlXFxcIiBjbGFzcz1cXFwid3BjZnRvLXNlYXJjaC1maWVsZFxcXCIgOnBsYWNlaG9sZGVyPVxcXCJwbGFjZWhvbGRlclxcXCIvPlxcbiAgICAgICAgICAgIDxkaXYgQG1vdXNlZW50ZXI9XFxcInJlc3VsdHNIb3ZlclxcXCIgQG1vdXNlbGVhdmU9XFxcInJlc3VsdHNIb3Zlck91dFxcXCIgdi1pZj1cXFwidmFsdWUubGVuZ3RoICYmIE9iamVjdC5rZXlzKGZvdW5kKS5sZW5ndGggJiYgaW5Gb2N1c1xcXCIgY2xhc3M9XFxcIndwY2Z0by1zZWFyY2gtcmVzdWx0c1xcXCI+XFxuICAgICAgICAgICAgICAgIDxkaXYgQGNsaWNrPVxcXCJnb1RvT3B0aW9uXFxcIiBjbGFzcz1cXFwid3BjZnRvLXNlYXJjaC1yZXN1bHRcXFwiIHYtZm9yPVxcXCIoaXRlbSwga2V5KSBpbiBmb3VuZFxcXCIgOmRhdGEta2V5PVxcXCJrZXlcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvLXNlYXJjaC1yZXN1bHQtbmFtZVxcXCIgOmRhdGEta2V5PVxcXCJrZXlcXFwiPnt7IGl0ZW0ubGFiZWxfYmVnaW4gfX08c3BhbiA6ZGF0YS1rZXk9XFxcImtleVxcXCI+e3sgaXRlbS5sYWJlbF9tYXRjaCB9fTwvc3Bhbj57eyBpdGVtLmxhYmVsX2VuZCB9fTwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvLXNlYXJjaC1yZXN1bHQtc2VjdGlvblxcXCIgOmRhdGEta2V5PVxcXCJrZXlcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt7IHNldHRpbmdzW2l0ZW0uc2VjdGlvbl9pZF0ubmFtZSB9fVxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIDpkYXRhLWtleT1cXFwia2V5XFxcIiB2LWlmPVxcXCJzZXR0aW5nc1tpdGVtLnNlY3Rpb25faWRdLmZpZWxkc1tpdGVtLmZpZWxkX2lkXSAmJiBzZXR0aW5nc1tpdGVtLnNlY3Rpb25faWRdLmZpZWxkc1tpdGVtLmZpZWxkX2lkXS5zdWJtZW51XFxcIj57eyBzZXR0aW5nc1tpdGVtLnNlY3Rpb25faWRdLmZpZWxkc1tpdGVtLmZpZWxkX2lkXS5zdWJtZW51IH19PC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgdi1pZj1cXFwidmFsdWUubGVuZ3RoXFxcIiBAY2xpY2s9XFxcInJlbW92ZVNlYXJjaFZhbHVlXFxcIiBjbGFzcz1cXFwid3BjZnRvLXJlbW92ZS1zZWFyY2gtdmFsdWVcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgQG1vdXNlZW50ZXI9XFxcInJlc3VsdHNIb3ZlclxcXCIgQG1vdXNlbGVhdmU9XFxcInJlc3VsdHNIb3Zlck91dFxcXCIgdi1pZj1cXFwidmFsdWUubGVuZ3RoICYmIHNlYXJjaERvbmUgPT09IHRydWUgJiYgT2JqZWN0LmtleXMoZm91bmQpLmxlbmd0aCA9PT0gMCAmJiBpbkZvY3VzXFxcIiBjbGFzcz1cXFwid3BjZnRvLXNlYXJjaC1yZXN1bHRzIG5vdC1mb3VuZFxcXCI+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0by1zZWFyY2gtcmVzdWx0XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0by1zZWFyY2gtcmVzdWx0LW5hbWVcXFwiPjxpIGNsYXNzPVxcXCJudXh5LW5vdGZvdW5kLWljb25cXFwiPjwvaT57eyBub3Rmb3VuZCB9fTwvZGl2PlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICBcIixcbiAgbWV0aG9kczoge1xuICAgIHNlYXJjaDogZnVuY3Rpb24gc2VhcmNoKGUpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHRoaXMuc2VhcmNoRG9uZSA9IGZhbHNlO1xuXG4gICAgICBpZiAodGhpcy5zZWFyY2hUaW1lb3V0KSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnNlYXJjaFRpbWVvdXQpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNlYXJjaFRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRvYyA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoX3RoaXMudmFsdWUsICd0ZXh0L2h0bWwnKTtcbiAgICAgICAgdmFyIHNlYXJjaCA9IGRvYy5ib2R5LnRleHRDb250ZW50LnRyaW0oKS50b0xvd2VyQ2FzZSgpIHx8ICcnO1xuICAgICAgICBfdGhpcy5mb3VuZCA9IHt9O1xuXG4gICAgICAgIGlmIChzZWFyY2gpIHtcbiAgICAgICAgICBmb3IgKHZhciBzZWN0aW9uSUQgaW4gX3RoaXMuc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIHZhciBzZWN0aW9uID0gX3RoaXMuc2V0dGluZ3Nbc2VjdGlvbklEXTtcblxuICAgICAgICAgICAgZm9yICh2YXIgZmllbGRJRCBpbiBzZWN0aW9uLmZpZWxkcykge1xuICAgICAgICAgICAgICB2YXIgZmllbGQgPSBzZWN0aW9uLmZpZWxkc1tmaWVsZElEXTtcblxuICAgICAgICAgICAgICBpZiAoZmllbGQubGFiZWwgJiYgZmllbGQudHlwZSAhPT0gJ2dyb3VwX3RpdGxlJykge1xuICAgICAgICAgICAgICAgIGlmICghaXNOYU4oZmllbGRJRC5jaGFyQXQoMCkpKSB7XG4gICAgICAgICAgICAgICAgICBmaWVsZElEID0gJ2EnICsgZmllbGRJRDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgZmllbGRMYWJlbCA9IGZpZWxkLmxhYmVsLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgdmFyIHNlYXJjaEluZGV4ID0gZmllbGRMYWJlbC5pbmRleE9mKHNlYXJjaCk7XG4gICAgICAgICAgICAgICAgdmFyIGZpZWxkTm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cGNmdG8tYm94LWNoaWxkLicgKyBmaWVsZElEICsgJywgLndwY2Z0by1ib3guJyArIGZpZWxkSUQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZpZWxkTm9kZSAmJiBzZWFyY2hJbmRleCAhPT0gLTEgJiYgIWZpZWxkTm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ25vdGljZV9iYW5uZXInKSkge1xuICAgICAgICAgICAgICAgICAgX3RoaXMuZm91bmRbc2VjdGlvbklEICsgJ18nICsgZmllbGRJRF0gPSB7XG4gICAgICAgICAgICAgICAgICAgIHNlY3Rpb25faWQ6IHNlY3Rpb25JRCxcbiAgICAgICAgICAgICAgICAgICAgZmllbGRfaWQ6IGZpZWxkSUQsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsX2JlZ2luOiBmaWVsZC5sYWJlbC5zbGljZSgwLCBzZWFyY2hJbmRleCksXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsX21hdGNoOiBmaWVsZC5sYWJlbC5zbGljZShzZWFyY2hJbmRleCwgc2VhcmNoSW5kZXggKyBzZWFyY2gubGVuZ3RoKSxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxfZW5kOiBmaWVsZC5sYWJlbC5zbGljZShzZWFyY2hJbmRleCArIHNlYXJjaC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIF90aGlzLnNlYXJjaERvbmUgPSB0cnVlO1xuICAgICAgfSwgMzAwKTtcbiAgICB9LFxuICAgIGdvVG9PcHRpb246IGZ1bmN0aW9uIGdvVG9PcHRpb24oZSkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHZhciB0aHMgPSB0aGlzO1xuICAgICAgVnVlLm5leHRUaWNrKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvcHRpb25LZXkgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEta2V5Jyk7XG4gICAgICAgIHZhciBzZWxlY3RlZCA9IF90aGlzMi5mb3VuZFtvcHRpb25LZXldO1xuICAgICAgICB2YXIgdGFiVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zZWN0aW9uPVwiJyArIHNlbGVjdGVkLnNlY3Rpb25faWQgKyAnXCJdLndwY2Z0by1uYXYtdGl0bGUnKTtcbiAgICAgICAgdmFyIGFjdGl2ZVRhYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud3BjZnRvLW5hdi5hY3RpdmUsIC53cGNmdG8tc3VibWVudXMgPiAuYWN0aXZlJyk7XG4gICAgICAgIHZhciBzZWxlY3RlZFN1Ym1lbnUgPSBfdGhpczIuc2V0dGluZ3Nbc2VsZWN0ZWQuc2VjdGlvbl9pZF0uZmllbGRzW3NlbGVjdGVkLmZpZWxkX2lkXSA/IF90aGlzMi5zZXR0aW5nc1tzZWxlY3RlZC5zZWN0aW9uX2lkXS5maWVsZHNbc2VsZWN0ZWQuZmllbGRfaWRdLnN1Ym1lbnUgOiBmYWxzZTtcbiAgICAgICAgdmFyIGFjdGl2ZVRhYnNDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndwY2Z0by10YWIuYWN0aXZlJyk7XG4gICAgICAgIHZhciBzZWxlY3RlZFRhYkNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3BjZnRvLXRhYiMnICsgc2VsZWN0ZWQuc2VjdGlvbl9pZCk7XG4gICAgICAgIHZhciBhY3RpdmVTdWJtZW51O1xuICAgICAgICB2YXIgc2VsZWN0ZWRGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cGNmdG8tYm94LicgKyBzZWxlY3RlZC5maWVsZF9pZCArICcsIC53cGNmdG8tYm94LWNoaWxkLicgKyBzZWxlY3RlZC5maWVsZF9pZCk7XG4gICAgICAgIHZhciBwcmV2aW91c1NlbGVjdGVkRmllbGRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndwY2Z0by1ib3guc2VsZWN0ZWQtZmllbGQsIC53cGNmdG8tYm94LWNoaWxkLnNlbGVjdGVkLWZpZWxkJyk7XG5cbiAgICAgICAgdmFyIF9pdGVyYXRvciA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyKHByZXZpb3VzU2VsZWN0ZWRGaWVsZHMpLFxuICAgICAgICAgICAgX3N0ZXA7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBmb3IgKF9pdGVyYXRvci5zKCk7ICEoX3N0ZXAgPSBfaXRlcmF0b3IubigpKS5kb25lOykge1xuICAgICAgICAgICAgdmFyIF9maWVsZDIgPSBfc3RlcC52YWx1ZTtcblxuICAgICAgICAgICAgaWYgKF9maWVsZDIuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3RlZC1maWVsZCcpKSB7XG4gICAgICAgICAgICAgIF9maWVsZDIuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQtZmllbGQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIF9pdGVyYXRvci5lKGVycik7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgX2l0ZXJhdG9yLmYoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBfaXRlcmF0b3IyID0gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIoYWN0aXZlVGFicyksXG4gICAgICAgICAgICBfc3RlcDI7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBmb3IgKF9pdGVyYXRvcjIucygpOyAhKF9zdGVwMiA9IF9pdGVyYXRvcjIubigpKS5kb25lOykge1xuICAgICAgICAgICAgdmFyIGFjdGl2ZVRhYiA9IF9zdGVwMi52YWx1ZTtcbiAgICAgICAgICAgIGFjdGl2ZVRhYi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIF9pdGVyYXRvcjIuZShlcnIpO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIF9pdGVyYXRvcjIuZigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIF9pdGVyYXRvcjMgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlcihhY3RpdmVUYWJzQ29udGVudCksXG4gICAgICAgICAgICBfc3RlcDM7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBmb3IgKF9pdGVyYXRvcjMucygpOyAhKF9zdGVwMyA9IF9pdGVyYXRvcjMubigpKS5kb25lOykge1xuICAgICAgICAgICAgdmFyIHRhYkNvbnRlbnQgPSBfc3RlcDMudmFsdWU7XG4gICAgICAgICAgICB0YWJDb250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICBpZiAodGFiQ29udGVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2hhcy1zdWJtZW51JykpIHtcbiAgICAgICAgICAgICAgdmFyIGFjdGl2ZVN1Yk1lbnVGaWVsZHMgPSB0YWJDb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53cGNmdG8tYm94Jyk7XG5cbiAgICAgICAgICAgICAgdmFyIF9pdGVyYXRvcjcgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlcihhY3RpdmVTdWJNZW51RmllbGRzKSxcbiAgICAgICAgICAgICAgICAgIF9zdGVwNztcblxuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGZvciAoX2l0ZXJhdG9yNy5zKCk7ICEoX3N0ZXA3ID0gX2l0ZXJhdG9yNy5uKCkpLmRvbmU7KSB7XG4gICAgICAgICAgICAgICAgICB2YXIgX2ZpZWxkMyA9IF9zdGVwNy52YWx1ZTtcblxuICAgICAgICAgICAgICAgICAgX2ZpZWxkMy5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2Rpc3BsYXk6bm9uZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgX2l0ZXJhdG9yNy5lKGVycik7XG4gICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgX2l0ZXJhdG9yNy5mKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIF9pdGVyYXRvcjMuZShlcnIpO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIF9pdGVyYXRvcjMuZigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGFiVGl0bGUuY2xvc2VzdCgnLndwY2Z0by1uYXYnKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgc2VsZWN0ZWRUYWJDb250ZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuXG4gICAgICAgIGlmIChzZWxlY3RlZFN1Ym1lbnUpIHtcbiAgICAgICAgICB2YXIgc3VibWVudXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud3BjZnRvLXN1Ym1lbnVzID4gZGl2Jyk7XG5cbiAgICAgICAgICB2YXIgX2l0ZXJhdG9yNCA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyKHN1Ym1lbnVzKSxcbiAgICAgICAgICAgICAgX3N0ZXA0O1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAoX2l0ZXJhdG9yNC5zKCk7ICEoX3N0ZXA0ID0gX2l0ZXJhdG9yNC5uKCkpLmRvbmU7KSB7XG4gICAgICAgICAgICAgIHZhciBzdWJtZW51ID0gX3N0ZXA0LnZhbHVlO1xuXG4gICAgICAgICAgICAgIGlmIChzdWJtZW51LnRleHRDb250ZW50LnRyaW0oKSA9PT0gc2VsZWN0ZWRTdWJtZW51LnRyaW0oKSkge1xuICAgICAgICAgICAgICAgIGFjdGl2ZVN1Ym1lbnUgPSBzdWJtZW51O1xuICAgICAgICAgICAgICAgIHN1Ym1lbnUuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIF9pdGVyYXRvcjQuZShlcnIpO1xuICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICBfaXRlcmF0b3I0LmYoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgZmllbGRzID0gc2VsZWN0ZWRUYWJDb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53cGNmdG8tYm94LicgKyBhY3RpdmVTdWJtZW51LmdldEF0dHJpYnV0ZSgnZGF0YS1zdWJtZW51JykgKyAnLCAud3BjZnRvLWJveC4nICsgYWN0aXZlU3VibWVudS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3VibWVudScpICsgJyAud3BjZnRvLWJveC1jaGlsZCcpO1xuXG4gICAgICAgICAgdmFyIF9pdGVyYXRvcjUgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlcihmaWVsZHMpLFxuICAgICAgICAgICAgICBfc3RlcDU7XG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yIChfaXRlcmF0b3I1LnMoKTsgIShfc3RlcDUgPSBfaXRlcmF0b3I1Lm4oKSkuZG9uZTspIHtcbiAgICAgICAgICAgICAgdmFyIGZpZWxkID0gX3N0ZXA1LnZhbHVlO1xuICAgICAgICAgICAgICBmaWVsZC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBfaXRlcmF0b3I1LmUoZXJyKTtcbiAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgX2l0ZXJhdG9yNS5mKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBfZmllbGRzID0gc2VsZWN0ZWRUYWJDb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53cGNmdG8tYm94LCAud3BjZnRvLWJveC1jaGlsZCcpO1xuXG4gICAgICAgICAgdmFyIF9pdGVyYXRvcjYgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlcihfZmllbGRzKSxcbiAgICAgICAgICAgICAgX3N0ZXA2O1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAoX2l0ZXJhdG9yNi5zKCk7ICEoX3N0ZXA2ID0gX2l0ZXJhdG9yNi5uKCkpLmRvbmU7KSB7XG4gICAgICAgICAgICAgIHZhciBfZmllbGQgPSBfc3RlcDYudmFsdWU7XG5cbiAgICAgICAgICAgICAgX2ZpZWxkLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIF9pdGVyYXRvcjYuZShlcnIpO1xuICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICBfaXRlcmF0b3I2LmYoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjbGVhclRpbWVvdXQodGhzLnNlbGVjdGVkQmxpbmtUaW1lb3V0KTtcbiAgICAgICAgc2VsZWN0ZWRGaWVsZC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZC1maWVsZCcpO1xuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xuICAgICAgICAgIHRvcDogc2VsZWN0ZWRGaWVsZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyB3aW5kb3cuc2Nyb2xsWSAtIDE4MCxcbiAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCdcbiAgICAgICAgfSk7XG4gICAgICAgIHRocy5pbkZvY3VzID0gZmFsc2U7XG4gICAgICAgIHRocy5zZWxlY3RlZEJsaW5rVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChzZWxlY3RlZEZpZWxkLmNsYXNzTGlzdC5jb250YWlucygnc2VsZWN0ZWQtZmllbGQnKSkge1xuICAgICAgICAgICAgc2VsZWN0ZWRGaWVsZC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZC1maWVsZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgNTAwMCk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGZvY3VzSW46IGZ1bmN0aW9uIGZvY3VzSW4oZSkge1xuICAgICAgdGhpcy5pbkZvY3VzID0gdHJ1ZTtcbiAgICB9LFxuICAgIGZvY3VzT3V0OiBmdW5jdGlvbiBmb2N1c091dChlKSB7XG4gICAgICBpZiAoIXRoaXMuaG92ZXJPblJlc3VsdHMgfHwgIU9iamVjdC5rZXlzKHRoaXMuZm91bmQpLmxlbmd0aCkge1xuICAgICAgICB0aGlzLmluRm9jdXMgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHJlbW92ZVNlYXJjaFZhbHVlOiBmdW5jdGlvbiByZW1vdmVTZWFyY2hWYWx1ZSgpIHtcbiAgICAgIHRoaXMudmFsdWUgPSAnJztcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cGNmdG8tc2VhcmNoLWZpZWxkJykuZm9jdXMoKTtcbiAgICB9LFxuICAgIHJlc3VsdHNIb3ZlcjogZnVuY3Rpb24gcmVzdWx0c0hvdmVyKCkge1xuICAgICAgdGhpcy5ob3Zlck9uUmVzdWx0cyA9IHRydWU7XG4gICAgfSxcbiAgICByZXN1bHRzSG92ZXJPdXQ6IGZ1bmN0aW9uIHJlc3VsdHNIb3Zlck91dCgpIHtcbiAgICAgIHRoaXMuaG92ZXJPblJlc3VsdHMgPSBmYWxzZTtcbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZh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
},{}]},{},[1])
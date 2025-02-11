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
      hoverOnResults: false
    };
  },
  template: "\n        <div class=\"wpcfto_search_group\">\n\t\t\t<input @focus=\"focusIn\" @focusout=\"focusOut\" @input=\"search\" type=\"text\" name=\"\" v-model=\"value\" class=\"wpcfto-search-field\" :placeholder=\"placeholder\"/>\n            <div @mouseenter=\"resultsHover\" @mouseleave=\"resultsHoverOut\" v-if=\"value.length && Object.keys(found).length && inFocus\" class=\"wpcfto-search-results\">\n                <div @click=\"goToOption\" class=\"wpcfto-search-result\" v-for=\"(item, key) in found\" :data-key=\"key\">\n                    <div class=\"wpcfto-search-result-name\" :data-key=\"key\">{{ item.label_begin }}<span :data-key=\"key\">{{ item.label_match }}</span>{{ item.label_end }}</div>\n                    <div class=\"wpcfto-search-result-section\" :data-key=\"key\">\n                        {{ settings[item.section_id].name }}\n                        <span :data-key=\"key\" v-if=\"settings[item.section_id].fields[item.field_id].submenu\">{{ settings[item.section_id].fields[item.field_id].submenu }}</span>\n                    </div>\n                </div>\n            </div>\n            <div v-if=\"value.length\" @click=\"removeSearchValue\" class=\"wpcfto-remove-search-value\"></div>\n            <div @mouseenter=\"resultsHover\" @mouseleave=\"resultsHoverOut\" v-if=\"value.length && Object.keys(found).length === 0 && inFocus\" class=\"wpcfto-search-results not-found\">\n                <div class=\"wpcfto-search-result\">\n                    <div class=\"wpcfto-search-result-name\"><i class=\"nuxy-notfound-icon\"></i>{{ notfound }}</div>\n                </div>\n            </div>\n        </div>\n    ",
  methods: {
    search: function search(e) {
      var doc = new DOMParser().parseFromString(this.value, 'text/html');
      var search = doc.body.textContent.trim().toLowerCase() || '';
      this.found = {};

      if (search) {
        for (var sectionID in this.settings) {
          var section = this.settings[sectionID];

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
                this.found[sectionID + '_' + fieldID] = {
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
    },
    goToOption: function goToOption(e) {
      var _this = this;

      var ths = this;
      Vue.nextTick().then(function () {
        var optionKey = e.target.getAttribute('data-key');
        var selected = _this.found[optionKey];
        var tabTitle = document.querySelector('[data-section="' + selected.section_id + '"].wpcfto-nav-title');
        var activeTabs = document.querySelectorAll('.wpcfto-nav.active, .wpcfto-submenus > .active');
        var selectedSubmenu = _this.settings[selected.section_id].fields[selected.field_id].submenu;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsIm8iLCJhbGxvd0FycmF5TGlrZSIsIml0IiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJBcnJheSIsImlzQXJyYXkiLCJfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkiLCJsZW5ndGgiLCJpIiwiRiIsInMiLCJuIiwiZG9uZSIsInZhbHVlIiwiZSIsIl9lIiwiZiIsIlR5cGVFcnJvciIsIm5vcm1hbENvbXBsZXRpb24iLCJkaWRFcnIiLCJlcnIiLCJjYWxsIiwic3RlcCIsIm5leHQiLCJfZTIiLCJtaW5MZW4iLCJfYXJyYXlMaWtlVG9BcnJheSIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwic2xpY2UiLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJmcm9tIiwidGVzdCIsImFyciIsImxlbiIsImFycjIiLCJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJmb3VuZCIsInNlbGVjdGVkIiwiaW5Gb2N1cyIsInNlbGVjdGVkQmxpbmtUaW1lb3V0IiwiaG92ZXJPblJlc3VsdHMiLCJ0ZW1wbGF0ZSIsIm1ldGhvZHMiLCJzZWFyY2giLCJkb2MiLCJET01QYXJzZXIiLCJwYXJzZUZyb21TdHJpbmciLCJib2R5IiwidGV4dENvbnRlbnQiLCJ0cmltIiwidG9Mb3dlckNhc2UiLCJzZWN0aW9uSUQiLCJzZXR0aW5ncyIsInNlY3Rpb24iLCJmaWVsZElEIiwiZmllbGRzIiwiZmllbGQiLCJsYWJlbCIsInR5cGUiLCJpc05hTiIsImNoYXJBdCIsImZpZWxkTGFiZWwiLCJzZWFyY2hJbmRleCIsImluZGV4T2YiLCJmaWVsZE5vZGUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInNlY3Rpb25faWQiLCJmaWVsZF9pZCIsImxhYmVsX2JlZ2luIiwibGFiZWxfbWF0Y2giLCJsYWJlbF9lbmQiLCJnb1RvT3B0aW9uIiwiX3RoaXMiLCJ0aHMiLCJuZXh0VGljayIsInRoZW4iLCJvcHRpb25LZXkiLCJ0YXJnZXQiLCJnZXRBdHRyaWJ1dGUiLCJ0YWJUaXRsZSIsImFjdGl2ZVRhYnMiLCJxdWVyeVNlbGVjdG9yQWxsIiwic2VsZWN0ZWRTdWJtZW51Iiwic3VibWVudSIsImFjdGl2ZVRhYnNDb250ZW50Iiwic2VsZWN0ZWRUYWJDb250ZW50IiwiYWN0aXZlU3VibWVudSIsInNlbGVjdGVkRmllbGQiLCJwcmV2aW91c1NlbGVjdGVkRmllbGRzIiwiX2l0ZXJhdG9yIiwiX3N0ZXAiLCJfZmllbGQyIiwicmVtb3ZlIiwiX2l0ZXJhdG9yMiIsIl9zdGVwMiIsImFjdGl2ZVRhYiIsIl9pdGVyYXRvcjMiLCJfc3RlcDMiLCJ0YWJDb250ZW50IiwiYWN0aXZlU3ViTWVudUZpZWxkcyIsIl9pdGVyYXRvcjciLCJfc3RlcDciLCJfZmllbGQzIiwic2V0QXR0cmlidXRlIiwiY2xvc2VzdCIsImFkZCIsInN1Ym1lbnVzIiwiX2l0ZXJhdG9yNCIsIl9zdGVwNCIsIl9pdGVyYXRvcjUiLCJfc3RlcDUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJfZmllbGRzIiwiX2l0ZXJhdG9yNiIsIl9zdGVwNiIsIl9maWVsZCIsImNsZWFyVGltZW91dCIsIndpbmRvdyIsInNjcm9sbFRvIiwidG9wIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwic2Nyb2xsWSIsImJlaGF2aW9yIiwic2V0VGltZW91dCIsImZvY3VzSW4iLCJmb2N1c091dCIsImtleXMiLCJyZW1vdmVTZWFyY2hWYWx1ZSIsImZvY3VzIiwicmVzdWx0c0hvdmVyIiwicmVzdWx0c0hvdmVyT3V0Iiwid2F0Y2giLCJfdmFsdWUiXSwic291cmNlcyI6WyJmYWtlX2Q0ZDNlYmIzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlcihvLCBhbGxvd0FycmF5TGlrZSkgeyB2YXIgaXQgPSB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSB8fCBvW1wiQEBpdGVyYXRvclwiXTsgaWYgKCFpdCkgeyBpZiAoQXJyYXkuaXNBcnJheShvKSB8fCAoaXQgPSBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobykpIHx8IGFsbG93QXJyYXlMaWtlICYmIG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSB7IGlmIChpdCkgbyA9IGl0OyB2YXIgaSA9IDA7IHZhciBGID0gZnVuY3Rpb24gRigpIHt9OyByZXR1cm4geyBzOiBGLCBuOiBmdW5jdGlvbiBuKCkgeyBpZiAoaSA+PSBvLmxlbmd0aCkgcmV0dXJuIHsgZG9uZTogdHJ1ZSB9OyByZXR1cm4geyBkb25lOiBmYWxzZSwgdmFsdWU6IG9baSsrXSB9OyB9LCBlOiBmdW5jdGlvbiBlKF9lKSB7IHRocm93IF9lOyB9LCBmOiBGIH07IH0gdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBpdGVyYXRlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9IHZhciBub3JtYWxDb21wbGV0aW9uID0gdHJ1ZSwgZGlkRXJyID0gZmFsc2UsIGVycjsgcmV0dXJuIHsgczogZnVuY3Rpb24gcygpIHsgaXQgPSBpdC5jYWxsKG8pOyB9LCBuOiBmdW5jdGlvbiBuKCkgeyB2YXIgc3RlcCA9IGl0Lm5leHQoKTsgbm9ybWFsQ29tcGxldGlvbiA9IHN0ZXAuZG9uZTsgcmV0dXJuIHN0ZXA7IH0sIGU6IGZ1bmN0aW9uIGUoX2UyKSB7IGRpZEVyciA9IHRydWU7IGVyciA9IF9lMjsgfSwgZjogZnVuY3Rpb24gZigpIHsgdHJ5IHsgaWYgKCFub3JtYWxDb21wbGV0aW9uICYmIGl0W1wicmV0dXJuXCJdICE9IG51bGwpIGl0W1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChkaWRFcnIpIHRocm93IGVycjsgfSB9IH07IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5WdWUuY29tcG9uZW50KCdzZWFyY2gtYnktc2V0dGluZ3MnLCB7XG4gIHByb3BzOiBbJ3NldHRpbmdzJywgJ3BsYWNlaG9sZGVyJywgJ25vdGZvdW5kJ10sXG4gIGRhdGE6IGZ1bmN0aW9uIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGE6IHt9LFxuICAgICAgZm91bmQ6IHt9LFxuICAgICAgdmFsdWU6ICcnLFxuICAgICAgc2VsZWN0ZWQ6IHt9LFxuICAgICAgaW5Gb2N1czogZmFsc2UsXG4gICAgICBzZWxlY3RlZEJsaW5rVGltZW91dDogZmFsc2UsXG4gICAgICBob3Zlck9uUmVzdWx0czogZmFsc2VcbiAgICB9O1xuICB9LFxuICB0ZW1wbGF0ZTogXCJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0b19zZWFyY2hfZ3JvdXBcXFwiPlxcblxcdFxcdFxcdDxpbnB1dCBAZm9jdXM9XFxcImZvY3VzSW5cXFwiIEBmb2N1c291dD1cXFwiZm9jdXNPdXRcXFwiIEBpbnB1dD1cXFwic2VhcmNoXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBuYW1lPVxcXCJcXFwiIHYtbW9kZWw9XFxcInZhbHVlXFxcIiBjbGFzcz1cXFwid3BjZnRvLXNlYXJjaC1maWVsZFxcXCIgOnBsYWNlaG9sZGVyPVxcXCJwbGFjZWhvbGRlclxcXCIvPlxcbiAgICAgICAgICAgIDxkaXYgQG1vdXNlZW50ZXI9XFxcInJlc3VsdHNIb3ZlclxcXCIgQG1vdXNlbGVhdmU9XFxcInJlc3VsdHNIb3Zlck91dFxcXCIgdi1pZj1cXFwidmFsdWUubGVuZ3RoICYmIE9iamVjdC5rZXlzKGZvdW5kKS5sZW5ndGggJiYgaW5Gb2N1c1xcXCIgY2xhc3M9XFxcIndwY2Z0by1zZWFyY2gtcmVzdWx0c1xcXCI+XFxuICAgICAgICAgICAgICAgIDxkaXYgQGNsaWNrPVxcXCJnb1RvT3B0aW9uXFxcIiBjbGFzcz1cXFwid3BjZnRvLXNlYXJjaC1yZXN1bHRcXFwiIHYtZm9yPVxcXCIoaXRlbSwga2V5KSBpbiBmb3VuZFxcXCIgOmRhdGEta2V5PVxcXCJrZXlcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvLXNlYXJjaC1yZXN1bHQtbmFtZVxcXCIgOmRhdGEta2V5PVxcXCJrZXlcXFwiPnt7IGl0ZW0ubGFiZWxfYmVnaW4gfX08c3BhbiA6ZGF0YS1rZXk9XFxcImtleVxcXCI+e3sgaXRlbS5sYWJlbF9tYXRjaCB9fTwvc3Bhbj57eyBpdGVtLmxhYmVsX2VuZCB9fTwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvLXNlYXJjaC1yZXN1bHQtc2VjdGlvblxcXCIgOmRhdGEta2V5PVxcXCJrZXlcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt7IHNldHRpbmdzW2l0ZW0uc2VjdGlvbl9pZF0ubmFtZSB9fVxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIDpkYXRhLWtleT1cXFwia2V5XFxcIiB2LWlmPVxcXCJzZXR0aW5nc1tpdGVtLnNlY3Rpb25faWRdLmZpZWxkc1tpdGVtLmZpZWxkX2lkXS5zdWJtZW51XFxcIj57eyBzZXR0aW5nc1tpdGVtLnNlY3Rpb25faWRdLmZpZWxkc1tpdGVtLmZpZWxkX2lkXS5zdWJtZW51IH19PC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgdi1pZj1cXFwidmFsdWUubGVuZ3RoXFxcIiBAY2xpY2s9XFxcInJlbW92ZVNlYXJjaFZhbHVlXFxcIiBjbGFzcz1cXFwid3BjZnRvLXJlbW92ZS1zZWFyY2gtdmFsdWVcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgQG1vdXNlZW50ZXI9XFxcInJlc3VsdHNIb3ZlclxcXCIgQG1vdXNlbGVhdmU9XFxcInJlc3VsdHNIb3Zlck91dFxcXCIgdi1pZj1cXFwidmFsdWUubGVuZ3RoICYmIE9iamVjdC5rZXlzKGZvdW5kKS5sZW5ndGggPT09IDAgJiYgaW5Gb2N1c1xcXCIgY2xhc3M9XFxcIndwY2Z0by1zZWFyY2gtcmVzdWx0cyBub3QtZm91bmRcXFwiPlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG8tc2VhcmNoLXJlc3VsdFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG8tc2VhcmNoLXJlc3VsdC1uYW1lXFxcIj48aSBjbGFzcz1cXFwibnV4eS1ub3Rmb3VuZC1pY29uXFxcIj48L2k+e3sgbm90Zm91bmQgfX08L2Rpdj5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgXCIsXG4gIG1ldGhvZHM6IHtcbiAgICBzZWFyY2g6IGZ1bmN0aW9uIHNlYXJjaChlKSB7XG4gICAgICB2YXIgZG9jID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyh0aGlzLnZhbHVlLCAndGV4dC9odG1sJyk7XG4gICAgICB2YXIgc2VhcmNoID0gZG9jLmJvZHkudGV4dENvbnRlbnQudHJpbSgpLnRvTG93ZXJDYXNlKCkgfHwgJyc7XG4gICAgICB0aGlzLmZvdW5kID0ge307XG5cbiAgICAgIGlmIChzZWFyY2gpIHtcbiAgICAgICAgZm9yICh2YXIgc2VjdGlvbklEIGluIHRoaXMuc2V0dGluZ3MpIHtcbiAgICAgICAgICB2YXIgc2VjdGlvbiA9IHRoaXMuc2V0dGluZ3Nbc2VjdGlvbklEXTtcblxuICAgICAgICAgIGZvciAodmFyIGZpZWxkSUQgaW4gc2VjdGlvbi5maWVsZHMpIHtcbiAgICAgICAgICAgIHZhciBmaWVsZCA9IHNlY3Rpb24uZmllbGRzW2ZpZWxkSURdO1xuXG4gICAgICAgICAgICBpZiAoZmllbGQubGFiZWwgJiYgZmllbGQudHlwZSAhPT0gJ2dyb3VwX3RpdGxlJykge1xuICAgICAgICAgICAgICBpZiAoIWlzTmFOKGZpZWxkSUQuY2hhckF0KDApKSkge1xuICAgICAgICAgICAgICAgIGZpZWxkSUQgPSAnYScgKyBmaWVsZElEO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdmFyIGZpZWxkTGFiZWwgPSBmaWVsZC5sYWJlbC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICB2YXIgc2VhcmNoSW5kZXggPSBmaWVsZExhYmVsLmluZGV4T2Yoc2VhcmNoKTtcbiAgICAgICAgICAgICAgdmFyIGZpZWxkTm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cGNmdG8tYm94LWNoaWxkLicgKyBmaWVsZElEICsgJywgLndwY2Z0by1ib3guJyArIGZpZWxkSUQpO1xuXG4gICAgICAgICAgICAgIGlmIChmaWVsZE5vZGUgJiYgc2VhcmNoSW5kZXggIT09IC0xICYmICFmaWVsZE5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdub3RpY2VfYmFubmVyJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvdW5kW3NlY3Rpb25JRCArICdfJyArIGZpZWxkSURdID0ge1xuICAgICAgICAgICAgICAgICAgc2VjdGlvbl9pZDogc2VjdGlvbklELFxuICAgICAgICAgICAgICAgICAgZmllbGRfaWQ6IGZpZWxkSUQsXG4gICAgICAgICAgICAgICAgICBsYWJlbF9iZWdpbjogZmllbGQubGFiZWwuc2xpY2UoMCwgc2VhcmNoSW5kZXgpLFxuICAgICAgICAgICAgICAgICAgbGFiZWxfbWF0Y2g6IGZpZWxkLmxhYmVsLnNsaWNlKHNlYXJjaEluZGV4LCBzZWFyY2hJbmRleCArIHNlYXJjaC5sZW5ndGgpLFxuICAgICAgICAgICAgICAgICAgbGFiZWxfZW5kOiBmaWVsZC5sYWJlbC5zbGljZShzZWFyY2hJbmRleCArIHNlYXJjaC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgZ29Ub09wdGlvbjogZnVuY3Rpb24gZ29Ub09wdGlvbihlKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICB2YXIgdGhzID0gdGhpcztcbiAgICAgIFZ1ZS5uZXh0VGljaygpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb3B0aW9uS2V5ID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWtleScpO1xuICAgICAgICB2YXIgc2VsZWN0ZWQgPSBfdGhpcy5mb3VuZFtvcHRpb25LZXldO1xuICAgICAgICB2YXIgdGFiVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zZWN0aW9uPVwiJyArIHNlbGVjdGVkLnNlY3Rpb25faWQgKyAnXCJdLndwY2Z0by1uYXYtdGl0bGUnKTtcbiAgICAgICAgdmFyIGFjdGl2ZVRhYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud3BjZnRvLW5hdi5hY3RpdmUsIC53cGNmdG8tc3VibWVudXMgPiAuYWN0aXZlJyk7XG4gICAgICAgIHZhciBzZWxlY3RlZFN1Ym1lbnUgPSBfdGhpcy5zZXR0aW5nc1tzZWxlY3RlZC5zZWN0aW9uX2lkXS5maWVsZHNbc2VsZWN0ZWQuZmllbGRfaWRdLnN1Ym1lbnU7XG4gICAgICAgIHZhciBhY3RpdmVUYWJzQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53cGNmdG8tdGFiLmFjdGl2ZScpO1xuICAgICAgICB2YXIgc2VsZWN0ZWRUYWJDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndwY2Z0by10YWIjJyArIHNlbGVjdGVkLnNlY3Rpb25faWQpO1xuICAgICAgICB2YXIgYWN0aXZlU3VibWVudTtcbiAgICAgICAgdmFyIHNlbGVjdGVkRmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3BjZnRvLWJveC4nICsgc2VsZWN0ZWQuZmllbGRfaWQgKyAnLCAud3BjZnRvLWJveC1jaGlsZC4nICsgc2VsZWN0ZWQuZmllbGRfaWQpO1xuICAgICAgICB2YXIgcHJldmlvdXNTZWxlY3RlZEZpZWxkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53cGNmdG8tYm94LnNlbGVjdGVkLWZpZWxkLCAud3BjZnRvLWJveC1jaGlsZC5zZWxlY3RlZC1maWVsZCcpO1xuXG4gICAgICAgIHZhciBfaXRlcmF0b3IgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlcihwcmV2aW91c1NlbGVjdGVkRmllbGRzKSxcbiAgICAgICAgICAgIF9zdGVwO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZm9yIChfaXRlcmF0b3IucygpOyAhKF9zdGVwID0gX2l0ZXJhdG9yLm4oKSkuZG9uZTspIHtcbiAgICAgICAgICAgIHZhciBfZmllbGQyID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgICAgICAgIGlmIChfZmllbGQyLmNsYXNzTGlzdC5jb250YWlucygnc2VsZWN0ZWQtZmllbGQnKSkge1xuICAgICAgICAgICAgICBfZmllbGQyLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkLWZpZWxkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBfaXRlcmF0b3IuZShlcnIpO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIF9pdGVyYXRvci5mKCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgX2l0ZXJhdG9yMiA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyKGFjdGl2ZVRhYnMpLFxuICAgICAgICAgICAgX3N0ZXAyO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZm9yIChfaXRlcmF0b3IyLnMoKTsgIShfc3RlcDIgPSBfaXRlcmF0b3IyLm4oKSkuZG9uZTspIHtcbiAgICAgICAgICAgIHZhciBhY3RpdmVUYWIgPSBfc3RlcDIudmFsdWU7XG4gICAgICAgICAgICBhY3RpdmVUYWIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBfaXRlcmF0b3IyLmUoZXJyKTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBfaXRlcmF0b3IyLmYoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBfaXRlcmF0b3IzID0gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIoYWN0aXZlVGFic0NvbnRlbnQpLFxuICAgICAgICAgICAgX3N0ZXAzO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZm9yIChfaXRlcmF0b3IzLnMoKTsgIShfc3RlcDMgPSBfaXRlcmF0b3IzLm4oKSkuZG9uZTspIHtcbiAgICAgICAgICAgIHZhciB0YWJDb250ZW50ID0gX3N0ZXAzLnZhbHVlO1xuICAgICAgICAgICAgdGFiQ29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgaWYgKHRhYkNvbnRlbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdoYXMtc3VibWVudScpKSB7XG4gICAgICAgICAgICAgIHZhciBhY3RpdmVTdWJNZW51RmllbGRzID0gdGFiQ29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCcud3BjZnRvLWJveCcpO1xuXG4gICAgICAgICAgICAgIHZhciBfaXRlcmF0b3I3ID0gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIoYWN0aXZlU3ViTWVudUZpZWxkcyksXG4gICAgICAgICAgICAgICAgICBfc3RlcDc7XG5cbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBmb3IgKF9pdGVyYXRvcjcucygpOyAhKF9zdGVwNyA9IF9pdGVyYXRvcjcubigpKS5kb25lOykge1xuICAgICAgICAgICAgICAgICAgdmFyIF9maWVsZDMgPSBfc3RlcDcudmFsdWU7XG5cbiAgICAgICAgICAgICAgICAgIF9maWVsZDMuc2V0QXR0cmlidXRlKCdzdHlsZScsICdkaXNwbGF5Om5vbmUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIF9pdGVyYXRvcjcuZShlcnIpO1xuICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIF9pdGVyYXRvcjcuZigpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBfaXRlcmF0b3IzLmUoZXJyKTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBfaXRlcmF0b3IzLmYoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRhYlRpdGxlLmNsb3Nlc3QoJy53cGNmdG8tbmF2JykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgIHNlbGVjdGVkVGFiQ29udGVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblxuICAgICAgICBpZiAoc2VsZWN0ZWRTdWJtZW51KSB7XG4gICAgICAgICAgdmFyIHN1Ym1lbnVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndwY2Z0by1zdWJtZW51cyA+IGRpdicpO1xuXG4gICAgICAgICAgdmFyIF9pdGVyYXRvcjQgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlcihzdWJtZW51cyksXG4gICAgICAgICAgICAgIF9zdGVwNDtcblxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKF9pdGVyYXRvcjQucygpOyAhKF9zdGVwNCA9IF9pdGVyYXRvcjQubigpKS5kb25lOykge1xuICAgICAgICAgICAgICB2YXIgc3VibWVudSA9IF9zdGVwNC52YWx1ZTtcblxuICAgICAgICAgICAgICBpZiAoc3VibWVudS50ZXh0Q29udGVudC50cmltKCkgPT09IHNlbGVjdGVkU3VibWVudS50cmltKCkpIHtcbiAgICAgICAgICAgICAgICBhY3RpdmVTdWJtZW51ID0gc3VibWVudTtcbiAgICAgICAgICAgICAgICBzdWJtZW51LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBfaXRlcmF0b3I0LmUoZXJyKTtcbiAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgX2l0ZXJhdG9yNC5mKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGZpZWxkcyA9IHNlbGVjdGVkVGFiQ29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCcud3BjZnRvLWJveC4nICsgYWN0aXZlU3VibWVudS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3VibWVudScpICsgJywgLndwY2Z0by1ib3guJyArIGFjdGl2ZVN1Ym1lbnUuZ2V0QXR0cmlidXRlKCdkYXRhLXN1Ym1lbnUnKSArICcgLndwY2Z0by1ib3gtY2hpbGQnKTtcblxuICAgICAgICAgIHZhciBfaXRlcmF0b3I1ID0gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIoZmllbGRzKSxcbiAgICAgICAgICAgICAgX3N0ZXA1O1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAoX2l0ZXJhdG9yNS5zKCk7ICEoX3N0ZXA1ID0gX2l0ZXJhdG9yNS5uKCkpLmRvbmU7KSB7XG4gICAgICAgICAgICAgIHZhciBmaWVsZCA9IF9zdGVwNS52YWx1ZTtcbiAgICAgICAgICAgICAgZmllbGQucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgX2l0ZXJhdG9yNS5lKGVycik7XG4gICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIF9pdGVyYXRvcjUuZigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgX2ZpZWxkcyA9IHNlbGVjdGVkVGFiQ29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCcud3BjZnRvLWJveCwgLndwY2Z0by1ib3gtY2hpbGQnKTtcblxuICAgICAgICAgIHZhciBfaXRlcmF0b3I2ID0gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIoX2ZpZWxkcyksXG4gICAgICAgICAgICAgIF9zdGVwNjtcblxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKF9pdGVyYXRvcjYucygpOyAhKF9zdGVwNiA9IF9pdGVyYXRvcjYubigpKS5kb25lOykge1xuICAgICAgICAgICAgICB2YXIgX2ZpZWxkID0gX3N0ZXA2LnZhbHVlO1xuXG4gICAgICAgICAgICAgIF9maWVsZC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBfaXRlcmF0b3I2LmUoZXJyKTtcbiAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgX2l0ZXJhdG9yNi5mKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY2xlYXJUaW1lb3V0KHRocy5zZWxlY3RlZEJsaW5rVGltZW91dCk7XG4gICAgICAgIHNlbGVjdGVkRmllbGQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtZmllbGQnKTtcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKHtcbiAgICAgICAgICB0b3A6IHNlbGVjdGVkRmllbGQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgd2luZG93LnNjcm9sbFkgLSAxODAsXG4gICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXG4gICAgICAgIH0pO1xuICAgICAgICB0aHMuaW5Gb2N1cyA9IGZhbHNlO1xuICAgICAgICB0aHMuc2VsZWN0ZWRCbGlua1RpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoc2VsZWN0ZWRGaWVsZC5jbGFzc0xpc3QuY29udGFpbnMoJ3NlbGVjdGVkLWZpZWxkJykpIHtcbiAgICAgICAgICAgIHNlbGVjdGVkRmllbGQuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQtZmllbGQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDUwMDApO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBmb2N1c0luOiBmdW5jdGlvbiBmb2N1c0luKGUpIHtcbiAgICAgIHRoaXMuaW5Gb2N1cyA9IHRydWU7XG4gICAgfSxcbiAgICBmb2N1c091dDogZnVuY3Rpb24gZm9jdXNPdXQoZSkge1xuICAgICAgaWYgKCF0aGlzLmhvdmVyT25SZXN1bHRzIHx8ICFPYmplY3Qua2V5cyh0aGlzLmZvdW5kKS5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5pbkZvY3VzID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSxcbiAgICByZW1vdmVTZWFyY2hWYWx1ZTogZnVuY3Rpb24gcmVtb3ZlU2VhcmNoVmFsdWUoKSB7XG4gICAgICB0aGlzLnZhbHVlID0gJyc7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3BjZnRvLXNlYXJjaC1maWVsZCcpLmZvY3VzKCk7XG4gICAgfSxcbiAgICByZXN1bHRzSG92ZXI6IGZ1bmN0aW9uIHJlc3VsdHNIb3ZlcigpIHtcbiAgICAgIHRoaXMuaG92ZXJPblJlc3VsdHMgPSB0cnVlO1xuICAgIH0sXG4gICAgcmVzdWx0c0hvdmVyT3V0OiBmdW5jdGlvbiByZXN1bHRzSG92ZXJPdXQoKSB7XG4gICAgICB0aGlzLmhvdmVyT25SZXN1bHRzID0gZmFsc2U7XG4gICAgfVxuICB9LFxuICB3YXRjaDoge1xuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShfdmFsdWUpIHtcbiAgICAgIHRoaXMudmFsdWUgPSBfdmFsdWU7XG4gICAgfVxuICB9XG59KTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBLFNBQVNBLDBCQUFULENBQW9DQyxDQUFwQyxFQUF1Q0MsY0FBdkMsRUFBdUQ7RUFBRSxJQUFJQyxFQUFFLEdBQUcsT0FBT0MsTUFBUCxLQUFrQixXQUFsQixJQUFpQ0gsQ0FBQyxDQUFDRyxNQUFNLENBQUNDLFFBQVIsQ0FBbEMsSUFBdURKLENBQUMsQ0FBQyxZQUFELENBQWpFOztFQUFpRixJQUFJLENBQUNFLEVBQUwsRUFBUztJQUFFLElBQUlHLEtBQUssQ0FBQ0MsT0FBTixDQUFjTixDQUFkLE1BQXFCRSxFQUFFLEdBQUdLLDJCQUEyQixDQUFDUCxDQUFELENBQXJELEtBQTZEQyxjQUFjLElBQUlELENBQWxCLElBQXVCLE9BQU9BLENBQUMsQ0FBQ1EsTUFBVCxLQUFvQixRQUE1RyxFQUFzSDtNQUFFLElBQUlOLEVBQUosRUFBUUYsQ0FBQyxHQUFHRSxFQUFKO01BQVEsSUFBSU8sQ0FBQyxHQUFHLENBQVI7O01BQVcsSUFBSUMsQ0FBQyxHQUFHLFNBQVNBLENBQVQsR0FBYSxDQUFFLENBQXZCOztNQUF5QixPQUFPO1FBQUVDLENBQUMsRUFB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
},{}]},{},[1])
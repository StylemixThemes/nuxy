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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsIm8iLCJhbGxvd0FycmF5TGlrZSIsIml0IiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJBcnJheSIsImlzQXJyYXkiLCJfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkiLCJsZW5ndGgiLCJpIiwiRiIsInMiLCJuIiwiZG9uZSIsInZhbHVlIiwiZSIsIl9lIiwiZiIsIlR5cGVFcnJvciIsIm5vcm1hbENvbXBsZXRpb24iLCJkaWRFcnIiLCJlcnIiLCJjYWxsIiwic3RlcCIsIm5leHQiLCJfZTIiLCJtaW5MZW4iLCJfYXJyYXlMaWtlVG9BcnJheSIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwic2xpY2UiLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJmcm9tIiwidGVzdCIsImFyciIsImxlbiIsImFycjIiLCJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJmb3VuZCIsInNlbGVjdGVkIiwiaW5Gb2N1cyIsInNlbGVjdGVkQmxpbmtUaW1lb3V0IiwiaG92ZXJPblJlc3VsdHMiLCJ0ZW1wbGF0ZSIsIm1ldGhvZHMiLCJzZWFyY2giLCJkb2MiLCJET01QYXJzZXIiLCJwYXJzZUZyb21TdHJpbmciLCJib2R5IiwidGV4dENvbnRlbnQiLCJ0cmltIiwidG9Mb3dlckNhc2UiLCJzZWN0aW9uSUQiLCJzZXR0aW5ncyIsInNlY3Rpb24iLCJmaWVsZElEIiwiZmllbGRzIiwiZmllbGQiLCJsYWJlbCIsInR5cGUiLCJmaWVsZExhYmVsIiwic2VhcmNoSW5kZXgiLCJpbmRleE9mIiwiZmllbGROb2RlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJzZWN0aW9uX2lkIiwiZmllbGRfaWQiLCJsYWJlbF9iZWdpbiIsImxhYmVsX21hdGNoIiwibGFiZWxfZW5kIiwiZ29Ub09wdGlvbiIsIl90aGlzIiwidGhzIiwibmV4dFRpY2siLCJ0aGVuIiwib3B0aW9uS2V5IiwidGFyZ2V0IiwiZ2V0QXR0cmlidXRlIiwidGFiVGl0bGUiLCJhY3RpdmVUYWJzIiwicXVlcnlTZWxlY3RvckFsbCIsInNlbGVjdGVkU3VibWVudSIsInN1Ym1lbnUiLCJhY3RpdmVUYWJzQ29udGVudCIsInNlbGVjdGVkVGFiQ29udGVudCIsImFjdGl2ZVN1Ym1lbnUiLCJzZWxlY3RlZEZpZWxkIiwicHJldmlvdXNTZWxlY3RlZEZpZWxkcyIsIl9pdGVyYXRvciIsIl9zdGVwIiwiX2ZpZWxkMiIsInJlbW92ZSIsIl9pdGVyYXRvcjIiLCJfc3RlcDIiLCJhY3RpdmVUYWIiLCJfaXRlcmF0b3IzIiwiX3N0ZXAzIiwidGFiQ29udGVudCIsImFjdGl2ZVN1Yk1lbnVGaWVsZHMiLCJfaXRlcmF0b3I3IiwiX3N0ZXA3IiwiX2ZpZWxkMyIsInNldEF0dHJpYnV0ZSIsImNsb3Nlc3QiLCJhZGQiLCJzdWJtZW51cyIsIl9pdGVyYXRvcjQiLCJfc3RlcDQiLCJfaXRlcmF0b3I1IiwiX3N0ZXA1IiwicmVtb3ZlQXR0cmlidXRlIiwiX2ZpZWxkcyIsIl9pdGVyYXRvcjYiLCJfc3RlcDYiLCJfZmllbGQiLCJjbGVhclRpbWVvdXQiLCJ3aW5kb3ciLCJzY3JvbGxUbyIsInRvcCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInNjcm9sbFkiLCJiZWhhdmlvciIsInNldFRpbWVvdXQiLCJmb2N1c0luIiwiZm9jdXNPdXQiLCJrZXlzIiwicmVtb3ZlU2VhcmNoVmFsdWUiLCJmb2N1cyIsInJlc3VsdHNIb3ZlciIsInJlc3VsdHNIb3Zlck91dCIsIndhdGNoIiwiX3ZhbHVlIl0sInNvdXJjZXMiOlsiZmFrZV9lOWNjOGIwOC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIobywgYWxsb3dBcnJheUxpa2UpIHsgdmFyIGl0ID0gdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0gfHwgb1tcIkBAaXRlcmF0b3JcIl07IGlmICghaXQpIHsgaWYgKEFycmF5LmlzQXJyYXkobykgfHwgKGl0ID0gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8pKSB8fCBhbGxvd0FycmF5TGlrZSAmJiBvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgeyBpZiAoaXQpIG8gPSBpdDsgdmFyIGkgPSAwOyB2YXIgRiA9IGZ1bmN0aW9uIEYoKSB7fTsgcmV0dXJuIHsgczogRiwgbjogZnVuY3Rpb24gbigpIHsgaWYgKGkgPj0gby5sZW5ndGgpIHJldHVybiB7IGRvbmU6IHRydWUgfTsgcmV0dXJuIHsgZG9uZTogZmFsc2UsIHZhbHVlOiBvW2krK10gfTsgfSwgZTogZnVuY3Rpb24gZShfZSkgeyB0aHJvdyBfZTsgfSwgZjogRiB9OyB9IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gaXRlcmF0ZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfSB2YXIgbm9ybWFsQ29tcGxldGlvbiA9IHRydWUsIGRpZEVyciA9IGZhbHNlLCBlcnI7IHJldHVybiB7IHM6IGZ1bmN0aW9uIHMoKSB7IGl0ID0gaXQuY2FsbChvKTsgfSwgbjogZnVuY3Rpb24gbigpIHsgdmFyIHN0ZXAgPSBpdC5uZXh0KCk7IG5vcm1hbENvbXBsZXRpb24gPSBzdGVwLmRvbmU7IHJldHVybiBzdGVwOyB9LCBlOiBmdW5jdGlvbiBlKF9lMikgeyBkaWRFcnIgPSB0cnVlOyBlcnIgPSBfZTI7IH0sIGY6IGZ1bmN0aW9uIGYoKSB7IHRyeSB7IGlmICghbm9ybWFsQ29tcGxldGlvbiAmJiBpdFtcInJldHVyblwiXSAhPSBudWxsKSBpdFtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoZGlkRXJyKSB0aHJvdyBlcnI7IH0gfSB9OyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuVnVlLmNvbXBvbmVudCgnc2VhcmNoLWJ5LXNldHRpbmdzJywge1xuICBwcm9wczogWydzZXR0aW5ncycsICdwbGFjZWhvbGRlcicsICdub3Rmb3VuZCddLFxuICBkYXRhOiBmdW5jdGlvbiBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiB7fSxcbiAgICAgIGZvdW5kOiB7fSxcbiAgICAgIHZhbHVlOiAnJyxcbiAgICAgIHNlbGVjdGVkOiB7fSxcbiAgICAgIGluRm9jdXM6IGZhbHNlLFxuICAgICAgc2VsZWN0ZWRCbGlua1RpbWVvdXQ6IGZhbHNlLFxuICAgICAgaG92ZXJPblJlc3VsdHM6IGZhbHNlXG4gICAgfTtcbiAgfSxcbiAgdGVtcGxhdGU6IFwiXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9fc2VhcmNoX2dyb3VwXFxcIj5cXG5cXHRcXHRcXHQ8aW5wdXQgQGZvY3VzPVxcXCJmb2N1c0luXFxcIiBAZm9jdXNvdXQ9XFxcImZvY3VzT3V0XFxcIiBAaW5wdXQ9XFxcInNlYXJjaFxcXCIgdHlwZT1cXFwidGV4dFxcXCIgbmFtZT1cXFwiXFxcIiB2LW1vZGVsPVxcXCJ2YWx1ZVxcXCIgY2xhc3M9XFxcIndwY2Z0by1zZWFyY2gtZmllbGRcXFwiIDpwbGFjZWhvbGRlcj1cXFwicGxhY2Vob2xkZXJcXFwiLz5cXG4gICAgICAgICAgICA8ZGl2IEBtb3VzZWVudGVyPVxcXCJyZXN1bHRzSG92ZXJcXFwiIEBtb3VzZWxlYXZlPVxcXCJyZXN1bHRzSG92ZXJPdXRcXFwiIHYtaWY9XFxcInZhbHVlLmxlbmd0aCAmJiBPYmplY3Qua2V5cyhmb3VuZCkubGVuZ3RoICYmIGluRm9jdXNcXFwiIGNsYXNzPVxcXCJ3cGNmdG8tc2VhcmNoLXJlc3VsdHNcXFwiPlxcbiAgICAgICAgICAgICAgICA8ZGl2IEBjbGljaz1cXFwiZ29Ub09wdGlvblxcXCIgY2xhc3M9XFxcIndwY2Z0by1zZWFyY2gtcmVzdWx0XFxcIiB2LWZvcj1cXFwiKGl0ZW0sIGtleSkgaW4gZm91bmRcXFwiIDpkYXRhLWtleT1cXFwia2V5XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0by1zZWFyY2gtcmVzdWx0LW5hbWVcXFwiIDpkYXRhLWtleT1cXFwia2V5XFxcIj57eyBpdGVtLmxhYmVsX2JlZ2luIH19PHNwYW4gOmRhdGEta2V5PVxcXCJrZXlcXFwiPnt7IGl0ZW0ubGFiZWxfbWF0Y2ggfX08L3NwYW4+e3sgaXRlbS5sYWJlbF9lbmQgfX08L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0by1zZWFyY2gtcmVzdWx0LXNlY3Rpb25cXFwiIDpkYXRhLWtleT1cXFwia2V5XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICB7eyBzZXR0aW5nc1tpdGVtLnNlY3Rpb25faWRdLm5hbWUgfX1cXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiA6ZGF0YS1rZXk9XFxcImtleVxcXCIgdi1pZj1cXFwic2V0dGluZ3NbaXRlbS5zZWN0aW9uX2lkXS5maWVsZHNbaXRlbS5maWVsZF9pZF0uc3VibWVudVxcXCI+e3sgc2V0dGluZ3NbaXRlbS5zZWN0aW9uX2lkXS5maWVsZHNbaXRlbS5maWVsZF9pZF0uc3VibWVudSB9fTwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IHYtaWY9XFxcInZhbHVlLmxlbmd0aFxcXCIgQGNsaWNrPVxcXCJyZW1vdmVTZWFyY2hWYWx1ZVxcXCIgY2xhc3M9XFxcIndwY2Z0by1yZW1vdmUtc2VhcmNoLXZhbHVlXFxcIj48L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IEBtb3VzZWVudGVyPVxcXCJyZXN1bHRzSG92ZXJcXFwiIEBtb3VzZWxlYXZlPVxcXCJyZXN1bHRzSG92ZXJPdXRcXFwiIHYtaWY9XFxcInZhbHVlLmxlbmd0aCAmJiBPYmplY3Qua2V5cyhmb3VuZCkubGVuZ3RoID09PSAwICYmIGluRm9jdXNcXFwiIGNsYXNzPVxcXCJ3cGNmdG8tc2VhcmNoLXJlc3VsdHMgbm90LWZvdW5kXFxcIj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvLXNlYXJjaC1yZXN1bHRcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvLXNlYXJjaC1yZXN1bHQtbmFtZVxcXCI+PGkgY2xhc3M9XFxcIm51eHktbm90Zm91bmQtaWNvblxcXCI+PC9pPnt7IG5vdGZvdW5kIH19PC9kaXY+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9kaXY+XFxuICAgIFwiLFxuICBtZXRob2RzOiB7XG4gICAgc2VhcmNoOiBmdW5jdGlvbiBzZWFyY2goZSkge1xuICAgICAgdmFyIGRvYyA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcodGhpcy52YWx1ZSwgJ3RleHQvaHRtbCcpO1xuICAgICAgdmFyIHNlYXJjaCA9IGRvYy5ib2R5LnRleHRDb250ZW50LnRyaW0oKS50b0xvd2VyQ2FzZSgpIHx8ICcnO1xuICAgICAgdGhpcy5mb3VuZCA9IHt9O1xuXG4gICAgICBpZiAoc2VhcmNoKSB7XG4gICAgICAgIGZvciAodmFyIHNlY3Rpb25JRCBpbiB0aGlzLnNldHRpbmdzKSB7XG4gICAgICAgICAgdmFyIHNlY3Rpb24gPSB0aGlzLnNldHRpbmdzW3NlY3Rpb25JRF07XG5cbiAgICAgICAgICBmb3IgKHZhciBmaWVsZElEIGluIHNlY3Rpb24uZmllbGRzKSB7XG4gICAgICAgICAgICB2YXIgZmllbGQgPSBzZWN0aW9uLmZpZWxkc1tmaWVsZElEXTtcblxuICAgICAgICAgICAgaWYgKGZpZWxkLmxhYmVsICYmIGZpZWxkLnR5cGUgIT09ICdncm91cF90aXRsZScpIHtcbiAgICAgICAgICAgICAgdmFyIGZpZWxkTGFiZWwgPSBmaWVsZC5sYWJlbC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICB2YXIgc2VhcmNoSW5kZXggPSBmaWVsZExhYmVsLmluZGV4T2Yoc2VhcmNoKTtcbiAgICAgICAgICAgICAgdmFyIGZpZWxkTm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cGNmdG8tYm94LWNoaWxkLicgKyBmaWVsZElEICsgJywgLndwY2Z0by1ib3guJyArIGZpZWxkSUQpO1xuXG4gICAgICAgICAgICAgIGlmIChmaWVsZE5vZGUgJiYgc2VhcmNoSW5kZXggIT09IC0xICYmICFmaWVsZE5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdub3RpY2VfYmFubmVyJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvdW5kW3NlY3Rpb25JRCArICdfJyArIGZpZWxkSURdID0ge1xuICAgICAgICAgICAgICAgICAgc2VjdGlvbl9pZDogc2VjdGlvbklELFxuICAgICAgICAgICAgICAgICAgZmllbGRfaWQ6IGZpZWxkSUQsXG4gICAgICAgICAgICAgICAgICBsYWJlbF9iZWdpbjogZmllbGQubGFiZWwuc2xpY2UoMCwgc2VhcmNoSW5kZXgpLFxuICAgICAgICAgICAgICAgICAgbGFiZWxfbWF0Y2g6IGZpZWxkLmxhYmVsLnNsaWNlKHNlYXJjaEluZGV4LCBzZWFyY2hJbmRleCArIHNlYXJjaC5sZW5ndGgpLFxuICAgICAgICAgICAgICAgICAgbGFiZWxfZW5kOiBmaWVsZC5sYWJlbC5zbGljZShzZWFyY2hJbmRleCArIHNlYXJjaC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgZ29Ub09wdGlvbjogZnVuY3Rpb24gZ29Ub09wdGlvbihlKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICB2YXIgdGhzID0gdGhpcztcbiAgICAgIFZ1ZS5uZXh0VGljaygpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb3B0aW9uS2V5ID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWtleScpO1xuICAgICAgICB2YXIgc2VsZWN0ZWQgPSBfdGhpcy5mb3VuZFtvcHRpb25LZXldO1xuICAgICAgICB2YXIgdGFiVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zZWN0aW9uPVwiJyArIHNlbGVjdGVkLnNlY3Rpb25faWQgKyAnXCJdLndwY2Z0by1uYXYtdGl0bGUnKTtcbiAgICAgICAgdmFyIGFjdGl2ZVRhYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud3BjZnRvLW5hdi5hY3RpdmUsIC53cGNmdG8tc3VibWVudXMgPiAuYWN0aXZlJyk7XG4gICAgICAgIHZhciBzZWxlY3RlZFN1Ym1lbnUgPSBfdGhpcy5zZXR0aW5nc1tzZWxlY3RlZC5zZWN0aW9uX2lkXS5maWVsZHNbc2VsZWN0ZWQuZmllbGRfaWRdLnN1Ym1lbnU7XG4gICAgICAgIHZhciBhY3RpdmVUYWJzQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53cGNmdG8tdGFiLmFjdGl2ZScpO1xuICAgICAgICB2YXIgc2VsZWN0ZWRUYWJDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndwY2Z0by10YWIjJyArIHNlbGVjdGVkLnNlY3Rpb25faWQpO1xuICAgICAgICB2YXIgYWN0aXZlU3VibWVudTtcbiAgICAgICAgdmFyIHNlbGVjdGVkRmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3BjZnRvLWJveC4nICsgc2VsZWN0ZWQuZmllbGRfaWQgKyAnLCAud3BjZnRvLWJveC1jaGlsZC4nICsgc2VsZWN0ZWQuZmllbGRfaWQpO1xuICAgICAgICB2YXIgcHJldmlvdXNTZWxlY3RlZEZpZWxkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53cGNmdG8tYm94LnNlbGVjdGVkLWZpZWxkLCAud3BjZnRvLWJveC1jaGlsZC5zZWxlY3RlZC1maWVsZCcpO1xuXG4gICAgICAgIHZhciBfaXRlcmF0b3IgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlcihwcmV2aW91c1NlbGVjdGVkRmllbGRzKSxcbiAgICAgICAgICAgIF9zdGVwO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZm9yIChfaXRlcmF0b3IucygpOyAhKF9zdGVwID0gX2l0ZXJhdG9yLm4oKSkuZG9uZTspIHtcbiAgICAgICAgICAgIHZhciBfZmllbGQyID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgICAgICAgIGlmIChfZmllbGQyLmNsYXNzTGlzdC5jb250YWlucygnc2VsZWN0ZWQtZmllbGQnKSkge1xuICAgICAgICAgICAgICBfZmllbGQyLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkLWZpZWxkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBfaXRlcmF0b3IuZShlcnIpO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIF9pdGVyYXRvci5mKCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgX2l0ZXJhdG9yMiA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyKGFjdGl2ZVRhYnMpLFxuICAgICAgICAgICAgX3N0ZXAyO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZm9yIChfaXRlcmF0b3IyLnMoKTsgIShfc3RlcDIgPSBfaXRlcmF0b3IyLm4oKSkuZG9uZTspIHtcbiAgICAgICAgICAgIHZhciBhY3RpdmVUYWIgPSBfc3RlcDIudmFsdWU7XG4gICAgICAgICAgICBhY3RpdmVUYWIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBfaXRlcmF0b3IyLmUoZXJyKTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBfaXRlcmF0b3IyLmYoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBfaXRlcmF0b3IzID0gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIoYWN0aXZlVGFic0NvbnRlbnQpLFxuICAgICAgICAgICAgX3N0ZXAzO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZm9yIChfaXRlcmF0b3IzLnMoKTsgIShfc3RlcDMgPSBfaXRlcmF0b3IzLm4oKSkuZG9uZTspIHtcbiAgICAgICAgICAgIHZhciB0YWJDb250ZW50ID0gX3N0ZXAzLnZhbHVlO1xuICAgICAgICAgICAgdGFiQ29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgaWYgKHRhYkNvbnRlbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdoYXMtc3VibWVudScpKSB7XG4gICAgICAgICAgICAgIHZhciBhY3RpdmVTdWJNZW51RmllbGRzID0gdGFiQ29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCcud3BjZnRvLWJveCcpO1xuXG4gICAgICAgICAgICAgIHZhciBfaXRlcmF0b3I3ID0gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIoYWN0aXZlU3ViTWVudUZpZWxkcyksXG4gICAgICAgICAgICAgICAgICBfc3RlcDc7XG5cbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBmb3IgKF9pdGVyYXRvcjcucygpOyAhKF9zdGVwNyA9IF9pdGVyYXRvcjcubigpKS5kb25lOykge1xuICAgICAgICAgICAgICAgICAgdmFyIF9maWVsZDMgPSBfc3RlcDcudmFsdWU7XG5cbiAgICAgICAgICAgICAgICAgIF9maWVsZDMuc2V0QXR0cmlidXRlKCdzdHlsZScsICdkaXNwbGF5Om5vbmUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIF9pdGVyYXRvcjcuZShlcnIpO1xuICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIF9pdGVyYXRvcjcuZigpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBfaXRlcmF0b3IzLmUoZXJyKTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBfaXRlcmF0b3IzLmYoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRhYlRpdGxlLmNsb3Nlc3QoJy53cGNmdG8tbmF2JykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgIHNlbGVjdGVkVGFiQ29udGVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblxuICAgICAgICBpZiAoc2VsZWN0ZWRTdWJtZW51KSB7XG4gICAgICAgICAgdmFyIHN1Ym1lbnVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndwY2Z0by1zdWJtZW51cyA+IGRpdicpO1xuXG4gICAgICAgICAgdmFyIF9pdGVyYXRvcjQgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlcihzdWJtZW51cyksXG4gICAgICAgICAgICAgIF9zdGVwNDtcblxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKF9pdGVyYXRvcjQucygpOyAhKF9zdGVwNCA9IF9pdGVyYXRvcjQubigpKS5kb25lOykge1xuICAgICAgICAgICAgICB2YXIgc3VibWVudSA9IF9zdGVwNC52YWx1ZTtcblxuICAgICAgICAgICAgICBpZiAoc3VibWVudS50ZXh0Q29udGVudC50cmltKCkgPT09IHNlbGVjdGVkU3VibWVudS50cmltKCkpIHtcbiAgICAgICAgICAgICAgICBhY3RpdmVTdWJtZW51ID0gc3VibWVudTtcbiAgICAgICAgICAgICAgICBzdWJtZW51LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBfaXRlcmF0b3I0LmUoZXJyKTtcbiAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgX2l0ZXJhdG9yNC5mKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGZpZWxkcyA9IHNlbGVjdGVkVGFiQ29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCcud3BjZnRvLWJveC4nICsgYWN0aXZlU3VibWVudS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3VibWVudScpICsgJywgLndwY2Z0by1ib3guJyArIGFjdGl2ZVN1Ym1lbnUuZ2V0QXR0cmlidXRlKCdkYXRhLXN1Ym1lbnUnKSArICcgLndwY2Z0by1ib3gtY2hpbGQnKTtcblxuICAgICAgICAgIHZhciBfaXRlcmF0b3I1ID0gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIoZmllbGRzKSxcbiAgICAgICAgICAgICAgX3N0ZXA1O1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAoX2l0ZXJhdG9yNS5zKCk7ICEoX3N0ZXA1ID0gX2l0ZXJhdG9yNS5uKCkpLmRvbmU7KSB7XG4gICAgICAgICAgICAgIHZhciBmaWVsZCA9IF9zdGVwNS52YWx1ZTtcbiAgICAgICAgICAgICAgZmllbGQucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgX2l0ZXJhdG9yNS5lKGVycik7XG4gICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIF9pdGVyYXRvcjUuZigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgX2ZpZWxkcyA9IHNlbGVjdGVkVGFiQ29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCcud3BjZnRvLWJveCwgLndwY2Z0by1ib3gtY2hpbGQnKTtcblxuICAgICAgICAgIHZhciBfaXRlcmF0b3I2ID0gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIoX2ZpZWxkcyksXG4gICAgICAgICAgICAgIF9zdGVwNjtcblxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKF9pdGVyYXRvcjYucygpOyAhKF9zdGVwNiA9IF9pdGVyYXRvcjYubigpKS5kb25lOykge1xuICAgICAgICAgICAgICB2YXIgX2ZpZWxkID0gX3N0ZXA2LnZhbHVlO1xuXG4gICAgICAgICAgICAgIF9maWVsZC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBfaXRlcmF0b3I2LmUoZXJyKTtcbiAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgX2l0ZXJhdG9yNi5mKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY2xlYXJUaW1lb3V0KHRocy5zZWxlY3RlZEJsaW5rVGltZW91dCk7XG4gICAgICAgIHNlbGVjdGVkRmllbGQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtZmllbGQnKTtcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKHtcbiAgICAgICAgICB0b3A6IHNlbGVjdGVkRmllbGQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgd2luZG93LnNjcm9sbFkgLSAxODAsXG4gICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXG4gICAgICAgIH0pO1xuICAgICAgICB0aHMuaW5Gb2N1cyA9IGZhbHNlO1xuICAgICAgICB0aHMuc2VsZWN0ZWRCbGlua1RpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoc2VsZWN0ZWRGaWVsZC5jbGFzc0xpc3QuY29udGFpbnMoJ3NlbGVjdGVkLWZpZWxkJykpIHtcbiAgICAgICAgICAgIHNlbGVjdGVkRmllbGQuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQtZmllbGQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDUwMDApO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBmb2N1c0luOiBmdW5jdGlvbiBmb2N1c0luKGUpIHtcbiAgICAgIHRoaXMuaW5Gb2N1cyA9IHRydWU7XG4gICAgfSxcbiAgICBmb2N1c091dDogZnVuY3Rpb24gZm9jdXNPdXQoZSkge1xuICAgICAgaWYgKCF0aGlzLmhvdmVyT25SZXN1bHRzIHx8ICFPYmplY3Qua2V5cyh0aGlzLmZvdW5kKS5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5pbkZvY3VzID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSxcbiAgICByZW1vdmVTZWFyY2hWYWx1ZTogZnVuY3Rpb24gcmVtb3ZlU2VhcmNoVmFsdWUoKSB7XG4gICAgICB0aGlzLnZhbHVlID0gJyc7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3BjZnRvLXNlYXJjaC1maWVsZCcpLmZvY3VzKCk7XG4gICAgfSxcbiAgICByZXN1bHRzSG92ZXI6IGZ1bmN0aW9uIHJlc3VsdHNIb3ZlcigpIHtcbiAgICAgIHRoaXMuaG92ZXJPblJlc3VsdHMgPSB0cnVlO1xuICAgIH0sXG4gICAgcmVzdWx0c0hvdmVyT3V0OiBmdW5jdGlvbiByZXN1bHRzSG92ZXJPdXQoKSB7XG4gICAgICB0aGlzLmhvdmVyT25SZXN1bHRzID0gZmFsc2U7XG4gICAgfVxuICB9LFxuICB3YXRjaDoge1xuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShfdmFsdWUpIHtcbiAgICAgIHRoaXMudmFsdWUgPSBfdmFsdWU7XG4gICAgfVxuICB9XG59KTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBLFNBQVNBLDBCQUFULENBQW9DQyxDQUFwQyxFQUF1Q0MsY0FBdkMsRUFBdUQ7RUFBRSxJQUFJQyxFQUFFLEdBQUcsT0FBT0MsTUFBUCxLQUFrQixXQUFsQixJQUFpQ0gsQ0FBQyxDQUFDRyxNQUFNLENBQUNDLFFBQVIsQ0FBbEMsSUFBdURKLENBQUMsQ0FBQyxZQUFELENBQWpFOztFQUFpRixJQUFJLENBQUNFLEVBQUwsRUFBUztJQUFFLElBQUlHLEtBQUssQ0FBQ0MsT0FBTixDQUFjTixDQUFkLE1BQXFCRSxFQUFFLEdBQUdLLDJCQUEyQixDQUFDUCxDQUFELENBQXJELEtBQTZEQyxjQUFjLElBQUlELENBQWxCLElBQXVCLE9BQU9BLENBQUMsQ0FBQ1EsTUFBVCxLQUFvQixRQUE1RyxFQUFzSDtNQUFFLElBQUlOLEVBQUosRUFBUUYsQ0FBQyxHQUFHRSxFQUFKO01BQVEsSUFBSU8sQ0FBQyxHQUFHLENBQVI7O01BQVcsSUFBSUMsQ0FBQyxHQUFHLFNBQVNBLENBQVQsR0FBYSxDQUFFLENBQXZCOztNQUF5QixPQUFPO1FBQUVDLENBQUMsRUFBRUQsQ0FBTDtRQUFRRSxDQUFDLEVBQUUsU0FBU0EsQ0FBVCxHQUFhO1VBQUUsSUFBSUgsQ0FBQyxJQUFJVCxDQUFDLENBQUNRLE1BQVgsRUFBbUIsT0FBTztZQUFFSyxJQUFJLEVBQUU7VUFBUixDQUFQO1VBQXVCLE9BQU87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
},{}]},{},[1])
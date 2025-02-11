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
      searchTimeout: false
    };
  },
  template: "\n        <div class=\"wpcfto_search_group\">\n\t\t\t<input @focus=\"focusIn\" @focusout=\"focusOut\" @input=\"search\" type=\"text\" name=\"\" v-model=\"value\" class=\"wpcfto-search-field\" :placeholder=\"placeholder\"/>\n            <div @mouseenter=\"resultsHover\" @mouseleave=\"resultsHoverOut\" v-if=\"value.length && Object.keys(found).length && inFocus\" class=\"wpcfto-search-results\">\n                <div @click=\"goToOption\" class=\"wpcfto-search-result\" v-for=\"(item, key) in found\" :data-key=\"key\">\n                    <div class=\"wpcfto-search-result-name\" :data-key=\"key\">{{ item.label_begin }}<span :data-key=\"key\">{{ item.label_match }}</span>{{ item.label_end }}</div>\n                    <div class=\"wpcfto-search-result-section\" :data-key=\"key\">\n                        {{ settings[item.section_id].name }}\n                        <span :data-key=\"key\" v-if=\"settings[item.section_id].fields[item.field_id].submenu\">{{ settings[item.section_id].fields[item.field_id].submenu }}</span>\n                    </div>\n                </div>\n            </div>\n            <div v-if=\"value.length\" @click=\"removeSearchValue\" class=\"wpcfto-remove-search-value\"></div>\n            <div @mouseenter=\"resultsHover\" @mouseleave=\"resultsHoverOut\" v-if=\"value.length && Object.keys(found).length === 0 && inFocus\" class=\"wpcfto-search-results not-found\">\n                <div class=\"wpcfto-search-result\">\n                    <div class=\"wpcfto-search-result-name\"><i class=\"nuxy-notfound-icon\"></i>{{ notfound }}</div>\n                </div>\n            </div>\n        </div>\n    ",
  methods: {
    search: function search(e) {
      var _this = this;

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
      }, 500);
    },
    goToOption: function goToOption(e) {
      var _this2 = this;

      var ths = this;
      Vue.nextTick().then(function () {
        var optionKey = e.target.getAttribute('data-key');
        var selected = _this2.found[optionKey];
        var tabTitle = document.querySelector('[data-section="' + selected.section_id + '"].wpcfto-nav-title');
        var activeTabs = document.querySelectorAll('.wpcfto-nav.active, .wpcfto-submenus > .active');
        var selectedSubmenu = _this2.settings[selected.section_id].fields[selected.field_id].submenu;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsIm8iLCJhbGxvd0FycmF5TGlrZSIsIml0IiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJBcnJheSIsImlzQXJyYXkiLCJfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkiLCJsZW5ndGgiLCJpIiwiRiIsInMiLCJuIiwiZG9uZSIsInZhbHVlIiwiZSIsIl9lIiwiZiIsIlR5cGVFcnJvciIsIm5vcm1hbENvbXBsZXRpb24iLCJkaWRFcnIiLCJlcnIiLCJjYWxsIiwic3RlcCIsIm5leHQiLCJfZTIiLCJtaW5MZW4iLCJfYXJyYXlMaWtlVG9BcnJheSIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwic2xpY2UiLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJmcm9tIiwidGVzdCIsImFyciIsImxlbiIsImFycjIiLCJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJmb3VuZCIsInNlbGVjdGVkIiwiaW5Gb2N1cyIsInNlbGVjdGVkQmxpbmtUaW1lb3V0IiwiaG92ZXJPblJlc3VsdHMiLCJzZWFyY2hUaW1lb3V0IiwidGVtcGxhdGUiLCJtZXRob2RzIiwic2VhcmNoIiwiX3RoaXMiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiZG9jIiwiRE9NUGFyc2VyIiwicGFyc2VGcm9tU3RyaW5nIiwiYm9keSIsInRleHRDb250ZW50IiwidHJpbSIsInRvTG93ZXJDYXNlIiwic2VjdGlvbklEIiwic2V0dGluZ3MiLCJzZWN0aW9uIiwiZmllbGRJRCIsImZpZWxkcyIsImZpZWxkIiwibGFiZWwiLCJ0eXBlIiwiaXNOYU4iLCJjaGFyQXQiLCJmaWVsZExhYmVsIiwic2VhcmNoSW5kZXgiLCJpbmRleE9mIiwiZmllbGROb2RlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJzZWN0aW9uX2lkIiwiZmllbGRfaWQiLCJsYWJlbF9iZWdpbiIsImxhYmVsX21hdGNoIiwibGFiZWxfZW5kIiwiZ29Ub09wdGlvbiIsIl90aGlzMiIsInRocyIsIm5leHRUaWNrIiwidGhlbiIsIm9wdGlvbktleSIsInRhcmdldCIsImdldEF0dHJpYnV0ZSIsInRhYlRpdGxlIiwiYWN0aXZlVGFicyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJzZWxlY3RlZFN1Ym1lbnUiLCJzdWJtZW51IiwiYWN0aXZlVGFic0NvbnRlbnQiLCJzZWxlY3RlZFRhYkNvbnRlbnQiLCJhY3RpdmVTdWJtZW51Iiwic2VsZWN0ZWRGaWVsZCIsInByZXZpb3VzU2VsZWN0ZWRGaWVsZHMiLCJfaXRlcmF0b3IiLCJfc3RlcCIsIl9maWVsZDIiLCJyZW1vdmUiLCJfaXRlcmF0b3IyIiwiX3N0ZXAyIiwiYWN0aXZlVGFiIiwiX2l0ZXJhdG9yMyIsIl9zdGVwMyIsInRhYkNvbnRlbnQiLCJhY3RpdmVTdWJNZW51RmllbGRzIiwiX2l0ZXJhdG9yNyIsIl9zdGVwNyIsIl9maWVsZDMiLCJzZXRBdHRyaWJ1dGUiLCJjbG9zZXN0IiwiYWRkIiwic3VibWVudXMiLCJfaXRlcmF0b3I0IiwiX3N0ZXA0IiwiX2l0ZXJhdG9yNSIsIl9zdGVwNSIsInJlbW92ZUF0dHJpYnV0ZSIsIl9maWVsZHMiLCJfaXRlcmF0b3I2IiwiX3N0ZXA2IiwiX2ZpZWxkIiwid2luZG93Iiwic2Nyb2xsVG8iLCJ0b3AiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJzY3JvbGxZIiwiYmVoYXZpb3IiLCJmb2N1c0luIiwiZm9jdXNPdXQiLCJrZXlzIiwicmVtb3ZlU2VhcmNoVmFsdWUiLCJmb2N1cyIsInJlc3VsdHNIb3ZlciIsInJlc3VsdHNIb3Zlck91dCIsIndhdGNoIiwiX3ZhbHVlIl0sInNvdXJjZXMiOlsiZmFrZV9hMmE2ZDM0Yy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIobywgYWxsb3dBcnJheUxpa2UpIHsgdmFyIGl0ID0gdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0gfHwgb1tcIkBAaXRlcmF0b3JcIl07IGlmICghaXQpIHsgaWYgKEFycmF5LmlzQXJyYXkobykgfHwgKGl0ID0gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8pKSB8fCBhbGxvd0FycmF5TGlrZSAmJiBvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgeyBpZiAoaXQpIG8gPSBpdDsgdmFyIGkgPSAwOyB2YXIgRiA9IGZ1bmN0aW9uIEYoKSB7fTsgcmV0dXJuIHsgczogRiwgbjogZnVuY3Rpb24gbigpIHsgaWYgKGkgPj0gby5sZW5ndGgpIHJldHVybiB7IGRvbmU6IHRydWUgfTsgcmV0dXJuIHsgZG9uZTogZmFsc2UsIHZhbHVlOiBvW2krK10gfTsgfSwgZTogZnVuY3Rpb24gZShfZSkgeyB0aHJvdyBfZTsgfSwgZjogRiB9OyB9IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gaXRlcmF0ZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfSB2YXIgbm9ybWFsQ29tcGxldGlvbiA9IHRydWUsIGRpZEVyciA9IGZhbHNlLCBlcnI7IHJldHVybiB7IHM6IGZ1bmN0aW9uIHMoKSB7IGl0ID0gaXQuY2FsbChvKTsgfSwgbjogZnVuY3Rpb24gbigpIHsgdmFyIHN0ZXAgPSBpdC5uZXh0KCk7IG5vcm1hbENvbXBsZXRpb24gPSBzdGVwLmRvbmU7IHJldHVybiBzdGVwOyB9LCBlOiBmdW5jdGlvbiBlKF9lMikgeyBkaWRFcnIgPSB0cnVlOyBlcnIgPSBfZTI7IH0sIGY6IGZ1bmN0aW9uIGYoKSB7IHRyeSB7IGlmICghbm9ybWFsQ29tcGxldGlvbiAmJiBpdFtcInJldHVyblwiXSAhPSBudWxsKSBpdFtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoZGlkRXJyKSB0aHJvdyBlcnI7IH0gfSB9OyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuVnVlLmNvbXBvbmVudCgnc2VhcmNoLWJ5LXNldHRpbmdzJywge1xuICBwcm9wczogWydzZXR0aW5ncycsICdwbGFjZWhvbGRlcicsICdub3Rmb3VuZCddLFxuICBkYXRhOiBmdW5jdGlvbiBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiB7fSxcbiAgICAgIGZvdW5kOiB7fSxcbiAgICAgIHZhbHVlOiAnJyxcbiAgICAgIHNlbGVjdGVkOiB7fSxcbiAgICAgIGluRm9jdXM6IGZhbHNlLFxuICAgICAgc2VsZWN0ZWRCbGlua1RpbWVvdXQ6IGZhbHNlLFxuICAgICAgaG92ZXJPblJlc3VsdHM6IGZhbHNlLFxuICAgICAgc2VhcmNoVGltZW91dDogZmFsc2VcbiAgICB9O1xuICB9LFxuICB0ZW1wbGF0ZTogXCJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0b19zZWFyY2hfZ3JvdXBcXFwiPlxcblxcdFxcdFxcdDxpbnB1dCBAZm9jdXM9XFxcImZvY3VzSW5cXFwiIEBmb2N1c291dD1cXFwiZm9jdXNPdXRcXFwiIEBpbnB1dD1cXFwic2VhcmNoXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBuYW1lPVxcXCJcXFwiIHYtbW9kZWw9XFxcInZhbHVlXFxcIiBjbGFzcz1cXFwid3BjZnRvLXNlYXJjaC1maWVsZFxcXCIgOnBsYWNlaG9sZGVyPVxcXCJwbGFjZWhvbGRlclxcXCIvPlxcbiAgICAgICAgICAgIDxkaXYgQG1vdXNlZW50ZXI9XFxcInJlc3VsdHNIb3ZlclxcXCIgQG1vdXNlbGVhdmU9XFxcInJlc3VsdHNIb3Zlck91dFxcXCIgdi1pZj1cXFwidmFsdWUubGVuZ3RoICYmIE9iamVjdC5rZXlzKGZvdW5kKS5sZW5ndGggJiYgaW5Gb2N1c1xcXCIgY2xhc3M9XFxcIndwY2Z0by1zZWFyY2gtcmVzdWx0c1xcXCI+XFxuICAgICAgICAgICAgICAgIDxkaXYgQGNsaWNrPVxcXCJnb1RvT3B0aW9uXFxcIiBjbGFzcz1cXFwid3BjZnRvLXNlYXJjaC1yZXN1bHRcXFwiIHYtZm9yPVxcXCIoaXRlbSwga2V5KSBpbiBmb3VuZFxcXCIgOmRhdGEta2V5PVxcXCJrZXlcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvLXNlYXJjaC1yZXN1bHQtbmFtZVxcXCIgOmRhdGEta2V5PVxcXCJrZXlcXFwiPnt7IGl0ZW0ubGFiZWxfYmVnaW4gfX08c3BhbiA6ZGF0YS1rZXk9XFxcImtleVxcXCI+e3sgaXRlbS5sYWJlbF9tYXRjaCB9fTwvc3Bhbj57eyBpdGVtLmxhYmVsX2VuZCB9fTwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvLXNlYXJjaC1yZXN1bHQtc2VjdGlvblxcXCIgOmRhdGEta2V5PVxcXCJrZXlcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt7IHNldHRpbmdzW2l0ZW0uc2VjdGlvbl9pZF0ubmFtZSB9fVxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIDpkYXRhLWtleT1cXFwia2V5XFxcIiB2LWlmPVxcXCJzZXR0aW5nc1tpdGVtLnNlY3Rpb25faWRdLmZpZWxkc1tpdGVtLmZpZWxkX2lkXS5zdWJtZW51XFxcIj57eyBzZXR0aW5nc1tpdGVtLnNlY3Rpb25faWRdLmZpZWxkc1tpdGVtLmZpZWxkX2lkXS5zdWJtZW51IH19PC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgdi1pZj1cXFwidmFsdWUubGVuZ3RoXFxcIiBAY2xpY2s9XFxcInJlbW92ZVNlYXJjaFZhbHVlXFxcIiBjbGFzcz1cXFwid3BjZnRvLXJlbW92ZS1zZWFyY2gtdmFsdWVcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgQG1vdXNlZW50ZXI9XFxcInJlc3VsdHNIb3ZlclxcXCIgQG1vdXNlbGVhdmU9XFxcInJlc3VsdHNIb3Zlck91dFxcXCIgdi1pZj1cXFwidmFsdWUubGVuZ3RoICYmIE9iamVjdC5rZXlzKGZvdW5kKS5sZW5ndGggPT09IDAgJiYgaW5Gb2N1c1xcXCIgY2xhc3M9XFxcIndwY2Z0by1zZWFyY2gtcmVzdWx0cyBub3QtZm91bmRcXFwiPlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG8tc2VhcmNoLXJlc3VsdFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG8tc2VhcmNoLXJlc3VsdC1uYW1lXFxcIj48aSBjbGFzcz1cXFwibnV4eS1ub3Rmb3VuZC1pY29uXFxcIj48L2k+e3sgbm90Zm91bmQgfX08L2Rpdj5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgXCIsXG4gIG1ldGhvZHM6IHtcbiAgICBzZWFyY2g6IGZ1bmN0aW9uIHNlYXJjaChlKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICBpZiAodGhpcy5zZWFyY2hUaW1lb3V0KSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnNlYXJjaFRpbWVvdXQpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNlYXJjaFRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRvYyA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoX3RoaXMudmFsdWUsICd0ZXh0L2h0bWwnKTtcbiAgICAgICAgdmFyIHNlYXJjaCA9IGRvYy5ib2R5LnRleHRDb250ZW50LnRyaW0oKS50b0xvd2VyQ2FzZSgpIHx8ICcnO1xuICAgICAgICBfdGhpcy5mb3VuZCA9IHt9O1xuXG4gICAgICAgIGlmIChzZWFyY2gpIHtcbiAgICAgICAgICBmb3IgKHZhciBzZWN0aW9uSUQgaW4gX3RoaXMuc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIHZhciBzZWN0aW9uID0gX3RoaXMuc2V0dGluZ3Nbc2VjdGlvbklEXTtcblxuICAgICAgICAgICAgZm9yICh2YXIgZmllbGRJRCBpbiBzZWN0aW9uLmZpZWxkcykge1xuICAgICAgICAgICAgICB2YXIgZmllbGQgPSBzZWN0aW9uLmZpZWxkc1tmaWVsZElEXTtcblxuICAgICAgICAgICAgICBpZiAoZmllbGQubGFiZWwgJiYgZmllbGQudHlwZSAhPT0gJ2dyb3VwX3RpdGxlJykge1xuICAgICAgICAgICAgICAgIGlmICghaXNOYU4oZmllbGRJRC5jaGFyQXQoMCkpKSB7XG4gICAgICAgICAgICAgICAgICBmaWVsZElEID0gJ2EnICsgZmllbGRJRDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgZmllbGRMYWJlbCA9IGZpZWxkLmxhYmVsLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgdmFyIHNlYXJjaEluZGV4ID0gZmllbGRMYWJlbC5pbmRleE9mKHNlYXJjaCk7XG4gICAgICAgICAgICAgICAgdmFyIGZpZWxkTm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cGNmdG8tYm94LWNoaWxkLicgKyBmaWVsZElEICsgJywgLndwY2Z0by1ib3guJyArIGZpZWxkSUQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZpZWxkTm9kZSAmJiBzZWFyY2hJbmRleCAhPT0gLTEgJiYgIWZpZWxkTm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ25vdGljZV9iYW5uZXInKSkge1xuICAgICAgICAgICAgICAgICAgX3RoaXMuZm91bmRbc2VjdGlvbklEICsgJ18nICsgZmllbGRJRF0gPSB7XG4gICAgICAgICAgICAgICAgICAgIHNlY3Rpb25faWQ6IHNlY3Rpb25JRCxcbiAgICAgICAgICAgICAgICAgICAgZmllbGRfaWQ6IGZpZWxkSUQsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsX2JlZ2luOiBmaWVsZC5sYWJlbC5zbGljZSgwLCBzZWFyY2hJbmRleCksXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsX21hdGNoOiBmaWVsZC5sYWJlbC5zbGljZShzZWFyY2hJbmRleCwgc2VhcmNoSW5kZXggKyBzZWFyY2gubGVuZ3RoKSxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxfZW5kOiBmaWVsZC5sYWJlbC5zbGljZShzZWFyY2hJbmRleCArIHNlYXJjaC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwgNTAwKTtcbiAgICB9LFxuICAgIGdvVG9PcHRpb246IGZ1bmN0aW9uIGdvVG9PcHRpb24oZSkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHZhciB0aHMgPSB0aGlzO1xuICAgICAgVnVlLm5leHRUaWNrKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvcHRpb25LZXkgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEta2V5Jyk7XG4gICAgICAgIHZhciBzZWxlY3RlZCA9IF90aGlzMi5mb3VuZFtvcHRpb25LZXldO1xuICAgICAgICB2YXIgdGFiVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zZWN0aW9uPVwiJyArIHNlbGVjdGVkLnNlY3Rpb25faWQgKyAnXCJdLndwY2Z0by1uYXYtdGl0bGUnKTtcbiAgICAgICAgdmFyIGFjdGl2ZVRhYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud3BjZnRvLW5hdi5hY3RpdmUsIC53cGNmdG8tc3VibWVudXMgPiAuYWN0aXZlJyk7XG4gICAgICAgIHZhciBzZWxlY3RlZFN1Ym1lbnUgPSBfdGhpczIuc2V0dGluZ3Nbc2VsZWN0ZWQuc2VjdGlvbl9pZF0uZmllbGRzW3NlbGVjdGVkLmZpZWxkX2lkXS5zdWJtZW51O1xuICAgICAgICB2YXIgYWN0aXZlVGFic0NvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud3BjZnRvLXRhYi5hY3RpdmUnKTtcbiAgICAgICAgdmFyIHNlbGVjdGVkVGFiQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cGNmdG8tdGFiIycgKyBzZWxlY3RlZC5zZWN0aW9uX2lkKTtcbiAgICAgICAgdmFyIGFjdGl2ZVN1Ym1lbnU7XG4gICAgICAgIHZhciBzZWxlY3RlZEZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndwY2Z0by1ib3guJyArIHNlbGVjdGVkLmZpZWxkX2lkICsgJywgLndwY2Z0by1ib3gtY2hpbGQuJyArIHNlbGVjdGVkLmZpZWxkX2lkKTtcbiAgICAgICAgdmFyIHByZXZpb3VzU2VsZWN0ZWRGaWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud3BjZnRvLWJveC5zZWxlY3RlZC1maWVsZCwgLndwY2Z0by1ib3gtY2hpbGQuc2VsZWN0ZWQtZmllbGQnKTtcblxuICAgICAgICB2YXIgX2l0ZXJhdG9yID0gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIocHJldmlvdXNTZWxlY3RlZEZpZWxkcyksXG4gICAgICAgICAgICBfc3RlcDtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIGZvciAoX2l0ZXJhdG9yLnMoKTsgIShfc3RlcCA9IF9pdGVyYXRvci5uKCkpLmRvbmU7KSB7XG4gICAgICAgICAgICB2YXIgX2ZpZWxkMiA9IF9zdGVwLnZhbHVlO1xuXG4gICAgICAgICAgICBpZiAoX2ZpZWxkMi5jbGFzc0xpc3QuY29udGFpbnMoJ3NlbGVjdGVkLWZpZWxkJykpIHtcbiAgICAgICAgICAgICAgX2ZpZWxkMi5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZC1maWVsZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgX2l0ZXJhdG9yLmUoZXJyKTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBfaXRlcmF0b3IuZigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIF9pdGVyYXRvcjIgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlcihhY3RpdmVUYWJzKSxcbiAgICAgICAgICAgIF9zdGVwMjtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIGZvciAoX2l0ZXJhdG9yMi5zKCk7ICEoX3N0ZXAyID0gX2l0ZXJhdG9yMi5uKCkpLmRvbmU7KSB7XG4gICAgICAgICAgICB2YXIgYWN0aXZlVGFiID0gX3N0ZXAyLnZhbHVlO1xuICAgICAgICAgICAgYWN0aXZlVGFiLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgX2l0ZXJhdG9yMi5lKGVycik7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgX2l0ZXJhdG9yMi5mKCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgX2l0ZXJhdG9yMyA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyKGFjdGl2ZVRhYnNDb250ZW50KSxcbiAgICAgICAgICAgIF9zdGVwMztcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIGZvciAoX2l0ZXJhdG9yMy5zKCk7ICEoX3N0ZXAzID0gX2l0ZXJhdG9yMy5uKCkpLmRvbmU7KSB7XG4gICAgICAgICAgICB2YXIgdGFiQ29udGVudCA9IF9zdGVwMy52YWx1ZTtcbiAgICAgICAgICAgIHRhYkNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG5cbiAgICAgICAgICAgIGlmICh0YWJDb250ZW50LmNsYXNzTGlzdC5jb250YWlucygnaGFzLXN1Ym1lbnUnKSkge1xuICAgICAgICAgICAgICB2YXIgYWN0aXZlU3ViTWVudUZpZWxkcyA9IHRhYkNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnLndwY2Z0by1ib3gnKTtcblxuICAgICAgICAgICAgICB2YXIgX2l0ZXJhdG9yNyA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyKGFjdGl2ZVN1Yk1lbnVGaWVsZHMpLFxuICAgICAgICAgICAgICAgICAgX3N0ZXA3O1xuXG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZm9yIChfaXRlcmF0b3I3LnMoKTsgIShfc3RlcDcgPSBfaXRlcmF0b3I3Lm4oKSkuZG9uZTspIHtcbiAgICAgICAgICAgICAgICAgIHZhciBfZmllbGQzID0gX3N0ZXA3LnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICBfZmllbGQzLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnZGlzcGxheTpub25lJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICBfaXRlcmF0b3I3LmUoZXJyKTtcbiAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICBfaXRlcmF0b3I3LmYoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgX2l0ZXJhdG9yMy5lKGVycik7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgX2l0ZXJhdG9yMy5mKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0YWJUaXRsZS5jbG9zZXN0KCcud3BjZnRvLW5hdicpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICBzZWxlY3RlZFRhYkNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkU3VibWVudSkge1xuICAgICAgICAgIHZhciBzdWJtZW51cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53cGNmdG8tc3VibWVudXMgPiBkaXYnKTtcblxuICAgICAgICAgIHZhciBfaXRlcmF0b3I0ID0gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIoc3VibWVudXMpLFxuICAgICAgICAgICAgICBfc3RlcDQ7XG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yIChfaXRlcmF0b3I0LnMoKTsgIShfc3RlcDQgPSBfaXRlcmF0b3I0Lm4oKSkuZG9uZTspIHtcbiAgICAgICAgICAgICAgdmFyIHN1Ym1lbnUgPSBfc3RlcDQudmFsdWU7XG5cbiAgICAgICAgICAgICAgaWYgKHN1Ym1lbnUudGV4dENvbnRlbnQudHJpbSgpID09PSBzZWxlY3RlZFN1Ym1lbnUudHJpbSgpKSB7XG4gICAgICAgICAgICAgICAgYWN0aXZlU3VibWVudSA9IHN1Ym1lbnU7XG4gICAgICAgICAgICAgICAgc3VibWVudS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgX2l0ZXJhdG9yNC5lKGVycik7XG4gICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIF9pdGVyYXRvcjQuZigpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBmaWVsZHMgPSBzZWxlY3RlZFRhYkNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnLndwY2Z0by1ib3guJyArIGFjdGl2ZVN1Ym1lbnUuZ2V0QXR0cmlidXRlKCdkYXRhLXN1Ym1lbnUnKSArICcsIC53cGNmdG8tYm94LicgKyBhY3RpdmVTdWJtZW51LmdldEF0dHJpYnV0ZSgnZGF0YS1zdWJtZW51JykgKyAnIC53cGNmdG8tYm94LWNoaWxkJyk7XG5cbiAgICAgICAgICB2YXIgX2l0ZXJhdG9yNSA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyKGZpZWxkcyksXG4gICAgICAgICAgICAgIF9zdGVwNTtcblxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKF9pdGVyYXRvcjUucygpOyAhKF9zdGVwNSA9IF9pdGVyYXRvcjUubigpKS5kb25lOykge1xuICAgICAgICAgICAgICB2YXIgZmllbGQgPSBfc3RlcDUudmFsdWU7XG4gICAgICAgICAgICAgIGZpZWxkLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIF9pdGVyYXRvcjUuZShlcnIpO1xuICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICBfaXRlcmF0b3I1LmYoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIF9maWVsZHMgPSBzZWxlY3RlZFRhYkNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnLndwY2Z0by1ib3gsIC53cGNmdG8tYm94LWNoaWxkJyk7XG5cbiAgICAgICAgICB2YXIgX2l0ZXJhdG9yNiA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyKF9maWVsZHMpLFxuICAgICAgICAgICAgICBfc3RlcDY7XG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yIChfaXRlcmF0b3I2LnMoKTsgIShfc3RlcDYgPSBfaXRlcmF0b3I2Lm4oKSkuZG9uZTspIHtcbiAgICAgICAgICAgICAgdmFyIF9maWVsZCA9IF9zdGVwNi52YWx1ZTtcblxuICAgICAgICAgICAgICBfZmllbGQucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgX2l0ZXJhdG9yNi5lKGVycik7XG4gICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIF9pdGVyYXRvcjYuZigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNsZWFyVGltZW91dCh0aHMuc2VsZWN0ZWRCbGlua1RpbWVvdXQpO1xuICAgICAgICBzZWxlY3RlZEZpZWxkLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkLWZpZWxkJyk7XG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XG4gICAgICAgICAgdG9wOiBzZWxlY3RlZEZpZWxkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHdpbmRvdy5zY3JvbGxZIC0gMTgwLFxuICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xuICAgICAgICB9KTtcbiAgICAgICAgdGhzLmluRm9jdXMgPSBmYWxzZTtcbiAgICAgICAgdGhzLnNlbGVjdGVkQmxpbmtUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKHNlbGVjdGVkRmllbGQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3RlZC1maWVsZCcpKSB7XG4gICAgICAgICAgICBzZWxlY3RlZEZpZWxkLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkLWZpZWxkJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCA1MDAwKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZm9jdXNJbjogZnVuY3Rpb24gZm9jdXNJbihlKSB7XG4gICAgICB0aGlzLmluRm9jdXMgPSB0cnVlO1xuICAgIH0sXG4gICAgZm9jdXNPdXQ6IGZ1bmN0aW9uIGZvY3VzT3V0KGUpIHtcbiAgICAgIGlmICghdGhpcy5ob3Zlck9uUmVzdWx0cyB8fCAhT2JqZWN0LmtleXModGhpcy5mb3VuZCkubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuaW5Gb2N1cyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0sXG4gICAgcmVtb3ZlU2VhcmNoVmFsdWU6IGZ1bmN0aW9uIHJlbW92ZVNlYXJjaFZhbHVlKCkge1xuICAgICAgdGhpcy52YWx1ZSA9ICcnO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndwY2Z0by1zZWFyY2gtZmllbGQnKS5mb2N1cygpO1xuICAgIH0sXG4gICAgcmVzdWx0c0hvdmVyOiBmdW5jdGlvbiByZXN1bHRzSG92ZXIoKSB7XG4gICAgICB0aGlzLmhvdmVyT25SZXN1bHRzID0gdHJ1ZTtcbiAgICB9LFxuICAgIHJlc3VsdHNIb3Zlck91dDogZnVuY3Rpb24gcmVzdWx0c0hvdmVyT3V0KCkge1xuICAgICAgdGhpcy5ob3Zlck9uUmVzdWx0cyA9IGZhbHNlO1xuICAgIH1cbiAgfSxcbiAgd2F0Y2g6IHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoX3ZhbHVlKSB7XG4gICAgICB0aGlzLnZhbHVlID0gX3ZhbHVlO1xuICAgIH1cbiAgfVxufSk7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQSxTQUFTQSwwQkFBVCxDQUFvQ0MsQ0FBcEMsRUFBdUNDLGNBQXZDLEVBQXVEO0VBQUUsSUFBSUMsRUFBRSxHQUFHLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsSUFBaUNILENBQUMsQ0FBQ0csTUFBTSxDQUFDQyxRQUFSLENBQWxDLElBQXVESixDQUFDLENBQUMsWUFBRCxDQUFqRTs7RUFBaUYsSUFBSSxDQUFD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
},{}]},{},[1])
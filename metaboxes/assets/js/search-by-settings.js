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
    template: "\n        <div class=\"wpcfto_search_group\">\n\t\t\t<input @focus=\"focusIn\" @focusout=\"focusOut\" @input=\"search\" type=\"text\" name=\"\" v-model=\"value\" class=\"wpcfto-search-field\" :placeholder=\"placeholder\"/>\n            <div @mouseenter=\"resultsHover\" @mouseleave=\"resultsHoverOut\" v-if=\"value.length && Object.keys(found).length && inFocus\" class=\"wpcfto-search-results\">\n                <div @click=\"goToOption\" class=\"wpcfto-search-result\" v-for=\"(item, key) in found\" :data-key=\"key\">\n                    <div class=\"wpcfto-search-result-name\" :data-key=\"key\">{{ item.label_begin }}<span :data-key=\"key\">{{ item.label_match }}</span>{{ item.label_end }}</div>\n                    <div class=\"wpcfto-search-result-section\" :data-key=\"key\">\n                        {{ decodeHTMLEntities(settings[item.section_id].name) }}\n                        <span :data-key=\"key\" v-if=\"settings[item.section_id].fields[item.field_id] && settings[item.section_id].fields[item.field_id].submenu\">{{ decodeHTMLEntities(settings[item.section_id].fields[item.field_id].submenu) }}</span>\n                    </div>\n                </div>\n            </div>\n            <div v-if=\"value.length\" @click=\"removeSearchValue\" class=\"wpcfto-remove-search-value\"></div>\n            <div @mouseenter=\"resultsHover\" @mouseleave=\"resultsHoverOut\" v-if=\"value.length && searchDone === true && Object.keys(found).length === 0 && inFocus\" class=\"wpcfto-search-results not-found\">\n                <div class=\"wpcfto-search-result\">\n                    <div class=\"wpcfto-search-result-name\"><i class=\"nuxy-notfound-icon\"></i>{{ notfound }}</div>\n                </div>\n            </div>\n        </div>\n    ",
    methods: {
      search: function search(e) {
        var _this = this;
  
        this.searchDone = false;
  
        if (this.searchTimeout) {
          clearTimeout(this.searchTimeout);
        }
  
        this.searchTimeout = setTimeout(function () {
          var doc = new DOMParser().parseFromString(_this.value, 'text/html');
          var search = _this.decodeHTMLEntities(doc.body.textContent.trim().toLowerCase()) || '';
          _this.found = {};
  
          if (search) {
            for (var sectionID in _this.settings) {
              var section = _this.settings[sectionID];
  
              for (var fieldID in section.fields) {
                var field = section.fields[fieldID];
  
                if (field.label && field.type !== 'group_title') {
                  var fieldLabelInResults = _this.decodeHTMLEntities(field.label);
  
                  var fieldLabel = fieldLabelInResults.toLowerCase();
                  var searchIndex = fieldLabel.indexOf(search);
                  var fieldNode = document.querySelector('.wpcfto-box-child.wpcfto-box-of-' + fieldID + ', .wpcfto-box.wpcfto-box-of-' + fieldID);
  
                  if (fieldNode && searchIndex !== -1 && !fieldNode.classList.contains('notice_banner') && !fieldNode.classList.contains('pro_banner')) {
                    _this.found[sectionID + '_' + fieldID] = {
                      section_id: sectionID,
                      field_id: fieldID,
                      label_begin: _this.decodeHTMLEntities(fieldLabelInResults.slice(0, searchIndex)),
                      label_match: _this.decodeHTMLEntities(fieldLabelInResults.slice(searchIndex, searchIndex + search.length)),
                      label_end: _this.decodeHTMLEntities(fieldLabelInResults.slice(searchIndex + search.length))
                    };
                  }
                }
              }
            }
          }
  
          _this.searchDone = true;
        }, 300);
      },
      decodeHTMLEntities: function decodeHTMLEntities(str) {
        var textarea = document.createElement("textarea");
        textarea.innerHTML = str;
        return textarea.value;
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
          var selectedField = document.querySelector('.wpcfto-box.wpcfto-box-of-' + selected.field_id + ', .wpcfto-box-child.wpcfto-box-of-' + selected.field_id);
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
          }, 4100);
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
  //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsIm8iLCJhbGxvd0FycmF5TGlrZSIsIml0IiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJBcnJheSIsImlzQXJyYXkiLCJfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkiLCJsZW5ndGgiLCJpIiwiRiIsInMiLCJuIiwiZG9uZSIsInZhbHVlIiwiZSIsIl9lIiwiZiIsIlR5cGVFcnJvciIsIm5vcm1hbENvbXBsZXRpb24iLCJkaWRFcnIiLCJlcnIiLCJjYWxsIiwic3RlcCIsIm5leHQiLCJfZTIiLCJtaW5MZW4iLCJfYXJyYXlMaWtlVG9BcnJheSIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwic2xpY2UiLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJmcm9tIiwidGVzdCIsImFyciIsImxlbiIsImFycjIiLCJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJmb3VuZCIsInNlbGVjdGVkIiwiaW5Gb2N1cyIsInNlbGVjdGVkQmxpbmtUaW1lb3V0IiwiaG92ZXJPblJlc3VsdHMiLCJzZWFyY2hUaW1lb3V0Iiwic2VhcmNoRG9uZSIsInRlbXBsYXRlIiwibWV0aG9kcyIsInNlYXJjaCIsIl90aGlzIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsImRvYyIsIkRPTVBhcnNlciIsInBhcnNlRnJvbVN0cmluZyIsImRlY29kZUhUTUxFbnRpdGllcyIsImJvZHkiLCJ0ZXh0Q29udGVudCIsInRyaW0iLCJ0b0xvd2VyQ2FzZSIsInNlY3Rpb25JRCIsInNldHRpbmdzIiwic2VjdGlvbiIsImZpZWxkSUQiLCJmaWVsZHMiLCJmaWVsZCIsImxhYmVsIiwidHlwZSIsImZpZWxkTGFiZWxJblJlc3VsdHMiLCJmaWVsZExhYmVsIiwic2VhcmNoSW5kZXgiLCJpbmRleE9mIiwiZmllbGROb2RlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJzZWN0aW9uX2lkIiwiZmllbGRfaWQiLCJsYWJlbF9iZWdpbiIsImxhYmVsX21hdGNoIiwibGFiZWxfZW5kIiwic3RyIiwidGV4dGFyZWEiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwiZ29Ub09wdGlvbiIsIl90aGlzMiIsInRocyIsIm5leHRUaWNrIiwidGhlbiIsIm9wdGlvbktleSIsInRhcmdldCIsImdldEF0dHJpYnV0ZSIsInRhYlRpdGxlIiwiYWN0aXZlVGFicyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJzZWxlY3RlZFN1Ym1lbnUiLCJzdWJtZW51IiwiYWN0aXZlVGFic0NvbnRlbnQiLCJzZWxlY3RlZFRhYkNvbnRlbnQiLCJhY3RpdmVTdWJtZW51Iiwic2VsZWN0ZWRGaWVsZCIsInByZXZpb3VzU2VsZWN0ZWRGaWVsZHMiLCJfaXRlcmF0b3IiLCJfc3RlcCIsIl9maWVsZDIiLCJyZW1vdmUiLCJfaXRlcmF0b3IyIiwiX3N0ZXAyIiwiYWN0aXZlVGFiIiwiX2l0ZXJhdG9yMyIsIl9zdGVwMyIsInRhYkNvbnRlbnQiLCJhY3RpdmVTdWJNZW51RmllbGRzIiwiX2l0ZXJhdG9yNyIsIl9zdGVwNyIsIl9maWVsZDMiLCJzZXRBdHRyaWJ1dGUiLCJjbG9zZXN0IiwiYWRkIiwic3VibWVudXMiLCJfaXRlcmF0b3I0IiwiX3N0ZXA0IiwiX2l0ZXJhdG9yNSIsIl9zdGVwNSIsInJlbW92ZUF0dHJpYnV0ZSIsIl9maWVsZHMiLCJfaXRlcmF0b3I2IiwiX3N0ZXA2IiwiX2ZpZWxkIiwid2luZG93Iiwic2Nyb2xsVG8iLCJ0b3AiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJzY3JvbGxZIiwiYmVoYXZpb3IiLCJmb2N1c0luIiwiZm9jdXNPdXQiLCJrZXlzIiwicmVtb3ZlU2VhcmNoVmFsdWUiLCJmb2N1cyIsInJlc3VsdHNIb3ZlciIsInJlc3VsdHNIb3Zlck91dCIsIndhdGNoIiwiX3ZhbHVlIl0sInNvdXJjZXMiOlsiZmFrZV85ZWE1ZmQ2Mi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIobywgYWxsb3dBcnJheUxpa2UpIHsgdmFyIGl0ID0gdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0gfHwgb1tcIkBAaXRlcmF0b3JcIl07IGlmICghaXQpIHsgaWYgKEFycmF5LmlzQXJyYXkobykgfHwgKGl0ID0gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8pKSB8fCBhbGxvd0FycmF5TGlrZSAmJiBvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgeyBpZiAoaXQpIG8gPSBpdDsgdmFyIGkgPSAwOyB2YXIgRiA9IGZ1bmN0aW9uIEYoKSB7fTsgcmV0dXJuIHsgczogRiwgbjogZnVuY3Rpb24gbigpIHsgaWYgKGkgPj0gby5sZW5ndGgpIHJldHVybiB7IGRvbmU6IHRydWUgfTsgcmV0dXJuIHsgZG9uZTogZmFsc2UsIHZhbHVlOiBvW2krK10gfTsgfSwgZTogZnVuY3Rpb24gZShfZSkgeyB0aHJvdyBfZTsgfSwgZjogRiB9OyB9IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gaXRlcmF0ZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfSB2YXIgbm9ybWFsQ29tcGxldGlvbiA9IHRydWUsIGRpZEVyciA9IGZhbHNlLCBlcnI7IHJldHVybiB7IHM6IGZ1bmN0aW9uIHMoKSB7IGl0ID0gaXQuY2FsbChvKTsgfSwgbjogZnVuY3Rpb24gbigpIHsgdmFyIHN0ZXAgPSBpdC5uZXh0KCk7IG5vcm1hbENvbXBsZXRpb24gPSBzdGVwLmRvbmU7IHJldHVybiBzdGVwOyB9LCBlOiBmdW5jdGlvbiBlKF9lMikgeyBkaWRFcnIgPSB0cnVlOyBlcnIgPSBfZTI7IH0sIGY6IGZ1bmN0aW9uIGYoKSB7IHRyeSB7IGlmICghbm9ybWFsQ29tcGxldGlvbiAmJiBpdFtcInJldHVyblwiXSAhPSBudWxsKSBpdFtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoZGlkRXJyKSB0aHJvdyBlcnI7IH0gfSB9OyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuVnVlLmNvbXBvbmVudCgnc2VhcmNoLWJ5LXNldHRpbmdzJywge1xuICBwcm9wczogWydzZXR0aW5ncycsICdwbGFjZWhvbGRlcicsICdub3Rmb3VuZCddLFxuICBkYXRhOiBmdW5jdGlvbiBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiB7fSxcbiAgICAgIGZvdW5kOiB7fSxcbiAgICAgIHZhbHVlOiAnJyxcbiAgICAgIHNlbGVjdGVkOiB7fSxcbiAgICAgIGluRm9jdXM6IGZhbHNlLFxuICAgICAgc2VsZWN0ZWRCbGlua1RpbWVvdXQ6IGZhbHNlLFxuICAgICAgaG92ZXJPblJlc3VsdHM6IGZhbHNlLFxuICAgICAgc2VhcmNoVGltZW91dDogZmFsc2UsXG4gICAgICBzZWFyY2hEb25lOiBmYWxzZVxuICAgIH07XG4gIH0sXG4gIHRlbXBsYXRlOiBcIlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvX3NlYXJjaF9ncm91cFxcXCI+XFxuXFx0XFx0XFx0PGlucHV0IEBmb2N1cz1cXFwiZm9jdXNJblxcXCIgQGZvY3Vzb3V0PVxcXCJmb2N1c091dFxcXCIgQGlucHV0PVxcXCJzZWFyY2hcXFwiIHR5cGU9XFxcInRleHRcXFwiIG5hbWU9XFxcIlxcXCIgdi1tb2RlbD1cXFwidmFsdWVcXFwiIGNsYXNzPVxcXCJ3cGNmdG8tc2VhcmNoLWZpZWxkXFxcIiA6cGxhY2Vob2xkZXI9XFxcInBsYWNlaG9sZGVyXFxcIi8+XFxuICAgICAgICAgICAgPGRpdiBAbW91c2VlbnRlcj1cXFwicmVzdWx0c0hvdmVyXFxcIiBAbW91c2VsZWF2ZT1cXFwicmVzdWx0c0hvdmVyT3V0XFxcIiB2LWlmPVxcXCJ2YWx1ZS5sZW5ndGggJiYgT2JqZWN0LmtleXMoZm91bmQpLmxlbmd0aCAmJiBpbkZvY3VzXFxcIiBjbGFzcz1cXFwid3BjZnRvLXNlYXJjaC1yZXN1bHRzXFxcIj5cXG4gICAgICAgICAgICAgICAgPGRpdiBAY2xpY2s9XFxcImdvVG9PcHRpb25cXFwiIGNsYXNzPVxcXCJ3cGNmdG8tc2VhcmNoLXJlc3VsdFxcXCIgdi1mb3I9XFxcIihpdGVtLCBrZXkpIGluIGZvdW5kXFxcIiA6ZGF0YS1rZXk9XFxcImtleVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG8tc2VhcmNoLXJlc3VsdC1uYW1lXFxcIiA6ZGF0YS1rZXk9XFxcImtleVxcXCI+e3sgaXRlbS5sYWJlbF9iZWdpbiB9fTxzcGFuIDpkYXRhLWtleT1cXFwia2V5XFxcIj57eyBpdGVtLmxhYmVsX21hdGNoIH19PC9zcGFuPnt7IGl0ZW0ubGFiZWxfZW5kIH19PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG8tc2VhcmNoLXJlc3VsdC1zZWN0aW9uXFxcIiA6ZGF0YS1rZXk9XFxcImtleVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAge3sgZGVjb2RlSFRNTEVudGl0aWVzKHNldHRpbmdzW2l0ZW0uc2VjdGlvbl9pZF0ubmFtZSkgfX1cXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiA6ZGF0YS1rZXk9XFxcImtleVxcXCIgdi1pZj1cXFwic2V0dGluZ3NbaXRlbS5zZWN0aW9uX2lkXS5maWVsZHNbaXRlbS5maWVsZF9pZF0gJiYgc2V0dGluZ3NbaXRlbS5zZWN0aW9uX2lkXS5maWVsZHNbaXRlbS5maWVsZF9pZF0uc3VibWVudVxcXCI+e3sgZGVjb2RlSFRNTEVudGl0aWVzKHNldHRpbmdzW2l0ZW0uc2VjdGlvbl9pZF0uZmllbGRzW2l0ZW0uZmllbGRfaWRdLnN1Ym1lbnUpIH19PC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgdi1pZj1cXFwidmFsdWUubGVuZ3RoXFxcIiBAY2xpY2s9XFxcInJlbW92ZVNlYXJjaFZhbHVlXFxcIiBjbGFzcz1cXFwid3BjZnRvLXJlbW92ZS1zZWFyY2gtdmFsdWVcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgQG1vdXNlZW50ZXI9XFxcInJlc3VsdHNIb3ZlclxcXCIgQG1vdXNlbGVhdmU9XFxcInJlc3VsdHNIb3Zlck91dFxcXCIgdi1pZj1cXFwidmFsdWUubGVuZ3RoICYmIHNlYXJjaERvbmUgPT09IHRydWUgJiYgT2JqZWN0LmtleXMoZm91bmQpLmxlbmd0aCA9PT0gMCAmJiBpbkZvY3VzXFxcIiBjbGFzcz1cXFwid3BjZnRvLXNlYXJjaC1yZXN1bHRzIG5vdC1mb3VuZFxcXCI+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0by1zZWFyY2gtcmVzdWx0XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0by1zZWFyY2gtcmVzdWx0LW5hbWVcXFwiPjxpIGNsYXNzPVxcXCJudXh5LW5vdGZvdW5kLWljb25cXFwiPjwvaT57eyBub3Rmb3VuZCB9fTwvZGl2PlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICBcIixcbiAgbWV0aG9kczoge1xuICAgIHNlYXJjaDogZnVuY3Rpb24gc2VhcmNoKGUpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHRoaXMuc2VhcmNoRG9uZSA9IGZhbHNlO1xuXG4gICAgICBpZiAodGhpcy5zZWFyY2hUaW1lb3V0KSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnNlYXJjaFRpbWVvdXQpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNlYXJjaFRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRvYyA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoX3RoaXMudmFsdWUsICd0ZXh0L2h0bWwnKTtcbiAgICAgICAgdmFyIHNlYXJjaCA9IF90aGlzLmRlY29kZUhUTUxFbnRpdGllcyhkb2MuYm9keS50ZXh0Q29udGVudC50cmltKCkudG9Mb3dlckNhc2UoKSkgfHwgJyc7XG4gICAgICAgIF90aGlzLmZvdW5kID0ge307XG5cbiAgICAgICAgaWYgKHNlYXJjaCkge1xuICAgICAgICAgIGZvciAodmFyIHNlY3Rpb25JRCBpbiBfdGhpcy5zZXR0aW5ncykge1xuICAgICAgICAgICAgdmFyIHNlY3Rpb24gPSBfdGhpcy5zZXR0aW5nc1tzZWN0aW9uSURdO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBmaWVsZElEIGluIHNlY3Rpb24uZmllbGRzKSB7XG4gICAgICAgICAgICAgIHZhciBmaWVsZCA9IHNlY3Rpb24uZmllbGRzW2ZpZWxkSURdO1xuXG4gICAgICAgICAgICAgIGlmIChmaWVsZC5sYWJlbCAmJiBmaWVsZC50eXBlICE9PSAnZ3JvdXBfdGl0bGUnKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZpZWxkTGFiZWxJblJlc3VsdHMgPSBfdGhpcy5kZWNvZGVIVE1MRW50aXRpZXMoZmllbGQubGFiZWwpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGZpZWxkTGFiZWwgPSBmaWVsZExhYmVsSW5SZXN1bHRzLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgdmFyIHNlYXJjaEluZGV4ID0gZmllbGRMYWJlbC5pbmRleE9mKHNlYXJjaCk7XG4gICAgICAgICAgICAgICAgdmFyIGZpZWxkTm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cGNmdG8tYm94LWNoaWxkLndwY2Z0by1ib3gtb2YtJyArIGZpZWxkSUQgKyAnLCAud3BjZnRvLWJveC53cGNmdG8tYm94LW9mLScgKyBmaWVsZElEKTtcblxuICAgICAgICAgICAgICAgIGlmIChmaWVsZE5vZGUgJiYgc2VhcmNoSW5kZXggIT09IC0xICYmICFmaWVsZE5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdub3RpY2VfYmFubmVyJykgJiYgIWZpZWxkTm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb19iYW5uZXInKSkge1xuICAgICAgICAgICAgICAgICAgX3RoaXMuZm91bmRbc2VjdGlvbklEICsgJ18nICsgZmllbGRJRF0gPSB7XG4gICAgICAgICAgICAgICAgICAgIHNlY3Rpb25faWQ6IHNlY3Rpb25JRCxcbiAgICAgICAgICAgICAgICAgICAgZmllbGRfaWQ6IGZpZWxkSUQsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsX2JlZ2luOiBfdGhpcy5kZWNvZGVIVE1MRW50aXRpZXMoZmllbGRMYWJlbEluUmVzdWx0cy5zbGljZSgwLCBzZWFyY2hJbmRleCkpLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbF9tYXRjaDogX3RoaXMuZGVjb2RlSFRNTEVudGl0aWVzKGZpZWxkTGFiZWxJblJlc3VsdHMuc2xpY2Uoc2VhcmNoSW5kZXgsIHNlYXJjaEluZGV4ICsgc2VhcmNoLmxlbmd0aCkpLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbF9lbmQ6IF90aGlzLmRlY29kZUhUTUxFbnRpdGllcyhmaWVsZExhYmVsSW5SZXN1bHRzLnNsaWNlKHNlYXJjaEluZGV4ICsgc2VhcmNoLmxlbmd0aCkpXG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIF90aGlzLnNlYXJjaERvbmUgPSB0cnVlO1xuICAgICAgfSwgMzAwKTtcbiAgICB9LFxuICAgIGRlY29kZUhUTUxFbnRpdGllczogZnVuY3Rpb24gZGVjb2RlSFRNTEVudGl0aWVzKHN0cikge1xuICAgICAgdmFyIHRleHRhcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpO1xuICAgICAgdGV4dGFyZWEuaW5uZXJIVE1MID0gc3RyO1xuICAgICAgcmV0dXJuIHRleHRhcmVhLnZhbHVlO1xuICAgIH0sXG4gICAgZ29Ub09wdGlvbjogZnVuY3Rpb24gZ29Ub09wdGlvbihlKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgdmFyIHRocyA9IHRoaXM7XG4gICAgICBWdWUubmV4dFRpY2soKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG9wdGlvbktleSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1rZXknKTtcbiAgICAgICAgdmFyIHNlbGVjdGVkID0gX3RoaXMyLmZvdW5kW29wdGlvbktleV07XG4gICAgICAgIHZhciB0YWJUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNlY3Rpb249XCInICsgc2VsZWN0ZWQuc2VjdGlvbl9pZCArICdcIl0ud3BjZnRvLW5hdi10aXRsZScpO1xuICAgICAgICB2YXIgYWN0aXZlVGFicyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53cGNmdG8tbmF2LmFjdGl2ZSwgLndwY2Z0by1zdWJtZW51cyA+IC5hY3RpdmUnKTtcbiAgICAgICAgdmFyIHNlbGVjdGVkU3VibWVudSA9IF90aGlzMi5zZXR0aW5nc1tzZWxlY3RlZC5zZWN0aW9uX2lkXS5maWVsZHNbc2VsZWN0ZWQuZmllbGRfaWRdID8gX3RoaXMyLnNldHRpbmdzW3NlbGVjdGVkLnNlY3Rpb25faWRdLmZpZWxkc1tzZWxlY3RlZC5maWVsZF9pZF0uc3VibWVudSA6IGZhbHNlO1xuICAgICAgICB2YXIgYWN0aXZlVGFic0NvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud3BjZnRvLXRhYi5hY3RpdmUnKTtcbiAgICAgICAgdmFyIHNlbGVjdGVkVGFiQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cGNmdG8tdGFiIycgKyBzZWxlY3RlZC5zZWN0aW9uX2lkKTtcbiAgICAgICAgdmFyIGFjdGl2ZVN1Ym1lbnU7XG4gICAgICAgIHZhciBzZWxlY3RlZEZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndwY2Z0by1ib3gud3BjZnRvLWJveC1vZi0nICsgc2VsZWN0ZWQuZmllbGRfaWQgKyAnLCAud3BjZnRvLWJveC1jaGlsZC53cGNmdG8tYm94LW9mLScgKyBzZWxlY3RlZC5maWVsZF9pZCk7XG4gICAgICAgIHZhciBwcmV2aW91c1NlbGVjdGVkRmllbGRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndwY2Z0by1ib3guc2VsZWN0ZWQtZmllbGQsIC53cGNmdG8tYm94LWNoaWxkLnNlbGVjdGVkLWZpZWxkJyk7XG5cbiAgICAgICAgdmFyIF9pdGVyYXRvciA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyKHByZXZpb3VzU2VsZWN0ZWRGaWVsZHMpLFxuICAgICAgICAgICAgX3N0ZXA7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBmb3IgKF9pdGVyYXRvci5zKCk7ICEoX3N0ZXAgPSBfaXRlcmF0b3IubigpKS5kb25lOykge1xuICAgICAgICAgICAgdmFyIF9maWVsZDIgPSBfc3RlcC52YWx1ZTtcblxuICAgICAgICAgICAgaWYgKF9maWVsZDIuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3RlZC1maWVsZCcpKSB7XG4gICAgICAgICAgICAgIF9maWVsZDIuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQtZmllbGQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIF9pdGVyYXRvci5lKGVycik7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgX2l0ZXJhdG9yLmYoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBfaXRlcmF0b3IyID0gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIoYWN0aXZlVGFicyksXG4gICAgICAgICAgICBfc3RlcDI7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBmb3IgKF9pdGVyYXRvcjIucygpOyAhKF9zdGVwMiA9IF9pdGVyYXRvcjIubigpKS5kb25lOykge1xuICAgICAgICAgICAgdmFyIGFjdGl2ZVRhYiA9IF9zdGVwMi52YWx1ZTtcbiAgICAgICAgICAgIGFjdGl2ZVRhYi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIF9pdGVyYXRvcjIuZShlcnIpO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIF9pdGVyYXRvcjIuZigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIF9pdGVyYXRvcjMgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlcihhY3RpdmVUYWJzQ29udGVudCksXG4gICAgICAgICAgICBfc3RlcDM7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBmb3IgKF9pdGVyYXRvcjMucygpOyAhKF9zdGVwMyA9IF9pdGVyYXRvcjMubigpKS5kb25lOykge1xuICAgICAgICAgICAgdmFyIHRhYkNvbnRlbnQgPSBfc3RlcDMudmFsdWU7XG4gICAgICAgICAgICB0YWJDb250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICBpZiAodGFiQ29udGVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2hhcy1zdWJtZW51JykpIHtcbiAgICAgICAgICAgICAgdmFyIGFjdGl2ZVN1Yk1lbnVGaWVsZHMgPSB0YWJDb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53cGNmdG8tYm94Jyk7XG5cbiAgICAgICAgICAgICAgdmFyIF9pdGVyYXRvcjcgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlcihhY3RpdmVTdWJNZW51RmllbGRzKSxcbiAgICAgICAgICAgICAgICAgIF9zdGVwNztcblxuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGZvciAoX2l0ZXJhdG9yNy5zKCk7ICEoX3N0ZXA3ID0gX2l0ZXJhdG9yNy5uKCkpLmRvbmU7KSB7XG4gICAgICAgICAgICAgICAgICB2YXIgX2ZpZWxkMyA9IF9zdGVwNy52YWx1ZTtcblxuICAgICAgICAgICAgICAgICAgX2ZpZWxkMy5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2Rpc3BsYXk6bm9uZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgX2l0ZXJhdG9yNy5lKGVycik7XG4gICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgX2l0ZXJhdG9yNy5mKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIF9pdGVyYXRvcjMuZShlcnIpO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIF9pdGVyYXRvcjMuZigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGFiVGl0bGUuY2xvc2VzdCgnLndwY2Z0by1uYXYnKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgc2VsZWN0ZWRUYWJDb250ZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuXG4gICAgICAgIGlmIChzZWxlY3RlZFN1Ym1lbnUpIHtcbiAgICAgICAgICB2YXIgc3VibWVudXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud3BjZnRvLXN1Ym1lbnVzID4gZGl2Jyk7XG5cbiAgICAgICAgICB2YXIgX2l0ZXJhdG9yNCA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyKHN1Ym1lbnVzKSxcbiAgICAgICAgICAgICAgX3N0ZXA0O1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAoX2l0ZXJhdG9yNC5zKCk7ICEoX3N0ZXA0ID0gX2l0ZXJhdG9yNC5uKCkpLmRvbmU7KSB7XG4gICAgICAgICAgICAgIHZhciBzdWJtZW51ID0gX3N0ZXA0LnZhbHVlO1xuXG4gICAgICAgICAgICAgIGlmIChzdWJtZW51LnRleHRDb250ZW50LnRyaW0oKSA9PT0gc2VsZWN0ZWRTdWJtZW51LnRyaW0oKSkge1xuICAgICAgICAgICAgICAgIGFjdGl2ZVN1Ym1lbnUgPSBzdWJtZW51O1xuICAgICAgICAgICAgICAgIHN1Ym1lbnUuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIF9pdGVyYXRvcjQuZShlcnIpO1xuICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICBfaXRlcmF0b3I0LmYoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgZmllbGRzID0gc2VsZWN0ZWRUYWJDb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53cGNmdG8tYm94LicgKyBhY3RpdmVTdWJtZW51LmdldEF0dHJpYnV0ZSgnZGF0YS1zdWJtZW51JykgKyAnLCAud3BjZnRvLWJveC4nICsgYWN0aXZlU3VibWVudS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3VibWVudScpICsgJyAud3BjZnRvLWJveC1jaGlsZCcpO1xuXG4gICAgICAgICAgdmFyIF9pdGVyYXRvcjUgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlcihmaWVsZHMpLFxuICAgICAgICAgICAgICBfc3RlcDU7XG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yIChfaXRlcmF0b3I1LnMoKTsgIShfc3RlcDUgPSBfaXRlcmF0b3I1Lm4oKSkuZG9uZTspIHtcbiAgICAgICAgICAgICAgdmFyIGZpZWxkID0gX3N0ZXA1LnZhbHVlO1xuICAgICAgICAgICAgICBmaWVsZC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBfaXRlcmF0b3I1LmUoZXJyKTtcbiAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgX2l0ZXJhdG9yNS5mKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBfZmllbGRzID0gc2VsZWN0ZWRUYWJDb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53cGNmdG8tYm94LCAud3BjZnRvLWJveC1jaGlsZCcpO1xuXG4gICAgICAgICAgdmFyIF9pdGVyYXRvcjYgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlcihfZmllbGRzKSxcbiAgICAgICAgICAgICAgX3N0ZXA2O1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAoX2l0ZXJhdG9yNi5zKCk7ICEoX3N0ZXA2ID0gX2l0ZXJhdG9yNi5uKCkpLmRvbmU7KSB7XG4gICAgICAgICAgICAgIHZhciBfZmllbGQgPSBfc3RlcDYudmFsdWU7XG5cbiAgICAgICAgICAgICAgX2ZpZWxkLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIF9pdGVyYXRvcjYuZShlcnIpO1xuICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICBfaXRlcmF0b3I2LmYoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjbGVhclRpbWVvdXQodGhzLnNlbGVjdGVkQmxpbmtUaW1lb3V0KTtcbiAgICAgICAgc2VsZWN0ZWRGaWVsZC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZC1maWVsZCcpO1xuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xuICAgICAgICAgIHRvcDogc2VsZWN0ZWRGaWVsZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyB3aW5kb3cuc2Nyb2xsWSAtIDE4MCxcbiAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCdcbiAgICAgICAgfSk7XG4gICAgICAgIHRocy5pbkZvY3VzID0gZmFsc2U7XG4gICAgICAgIHRocy5zZWxlY3RlZEJsaW5rVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChzZWxlY3RlZEZpZWxkLmNsYXNzTGlzdC5jb250YWlucygnc2VsZWN0ZWQtZmllbGQnKSkge1xuICAgICAgICAgICAgc2VsZWN0ZWRGaWVsZC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZC1maWVsZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgNDEwMCk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGZvY3VzSW46IGZ1bmN0aW9uIGZvY3VzSW4oZSkge1xuICAgICAgdGhpcy5pbkZvY3VzID0gdHJ1ZTtcbiAgICB9LFxuICAgIGZvY3VzT3V0OiBmdW5jdGlvbiBmb2N1c091dChlKSB7XG4gICAgICBpZiAoIXRoaXMuaG92ZXJPblJlc3VsdHMgfHwgIU9iamVjdC5rZXlzKHRoaXMuZm91bmQpLmxlbmd0aCkge1xuICAgICAgICB0aGlzLmluRm9jdXMgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHJlbW92ZVNlYXJjaFZhbHVlOiBmdW5jdGlvbiByZW1vdmVTZWFyY2hWYWx1ZSgpIHtcbiAgICAgIHRoaXMudmFsdWUgPSAnJztcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cGNmdG8tc2VhcmNoLWZpZWxkJykuZm9jdXMoKTtcbiAgICB9LFxuICAgIHJlc3VsdHNIb3ZlcjogZnVuY3Rpb24gcmVzdWx0c0hvdmVyKCkge1xuICAgICAgdGhpcy5ob3Zlck9uUmVzdWx0cyA9IHRydWU7XG4gICAgfSxcbiAgICByZXN1bHRzSG92ZXJPdXQ6IGZ1bmN0aW9uIHJlc3VsdHNIb3Zlck91dCgpIHtcbiAgICAgIHRoaXMuaG92ZXJPblJlc3VsdHMgPSBmYWxzZTtcbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKF92YWx1ZSkge1xuICAgICAgdGhpcy52YWx1ZSA9IF92YWx1ZTtcbiAgICB9XG4gIH1cbn0pOyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUEsU0FBU0EsMEJBQVQsQ0FBb0NDLENBQXBDLEVBQXVDQyxjQUF2QyxFQUF1RDtFQUFFLElBQUlDLEVBQUUsR0FBRyxPQUFPQyxNQUFQLEtBQWtCLFdBQWxCLElBQWlDSCxDQUFDLENBQUNHLE1BQU0sQ0FBQ0MsUUFBUixDQUFsQyxJQUF1REosQ0FBQyxDQUFDLFlBQUQsQ0FBakU7O0VBQWlGLElBQUksQ0FBQ0UsRUFBTCxFQUFTO0lBQUUsSUFBSUcsS0FBSyxDQUFDQyxPQUFOLENBQWNOLENBQWQsTUFBcUJFLEVBQUUsR0FBR0ssMkJBQTJCLENBQUNQLENBQUQsQ0FBckQsS0FBNkRDLGNBQWMsSUFBSUQsQ0FBbEIsSUFBdUIsT0FBT0EsQ0FBQyxD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
  },{}]},{},[1])
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
              console.log(sectionID);
              console.log(section);
  
              for (var fieldID in section.fields) {
                var field = section.fields[fieldID];
  
                if (field.label && field.type !== 'group_title') {
                  if (!isNaN(fieldID.charAt(0))) {
                    fieldID = 'a' + fieldID;
                  }
  
                  var fieldLabelInResults = _this.decodeHTMLEntities(field.label);
  
                  var fieldLabel = fieldLabelInResults.toLowerCase();
                  var searchIndex = fieldLabel.indexOf(search);
                  var fieldNode = document.querySelector('.wpcfto-box-child.' + fieldID + ', .wpcfto-box.' + fieldID);
  
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
  //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsIm8iLCJhbGxvd0FycmF5TGlrZSIsIml0IiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJBcnJheSIsImlzQXJyYXkiLCJfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkiLCJsZW5ndGgiLCJpIiwiRiIsInMiLCJuIiwiZG9uZSIsInZhbHVlIiwiZSIsIl9lIiwiZiIsIlR5cGVFcnJvciIsIm5vcm1hbENvbXBsZXRpb24iLCJkaWRFcnIiLCJlcnIiLCJjYWxsIiwic3RlcCIsIm5leHQiLCJfZTIiLCJtaW5MZW4iLCJfYXJyYXlMaWtlVG9BcnJheSIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwic2xpY2UiLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJmcm9tIiwidGVzdCIsImFyciIsImxlbiIsImFycjIiLCJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJmb3VuZCIsInNlbGVjdGVkIiwiaW5Gb2N1cyIsInNlbGVjdGVkQmxpbmtUaW1lb3V0IiwiaG92ZXJPblJlc3VsdHMiLCJzZWFyY2hUaW1lb3V0Iiwic2VhcmNoRG9uZSIsInRlbXBsYXRlIiwibWV0aG9kcyIsInNlYXJjaCIsIl90aGlzIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsImRvYyIsIkRPTVBhcnNlciIsInBhcnNlRnJvbVN0cmluZyIsImRlY29kZUhUTUxFbnRpdGllcyIsImJvZHkiLCJ0ZXh0Q29udGVudCIsInRyaW0iLCJ0b0xvd2VyQ2FzZSIsInNlY3Rpb25JRCIsInNldHRpbmdzIiwic2VjdGlvbiIsImNvbnNvbGUiLCJsb2ciLCJmaWVsZElEIiwiZmllbGRzIiwiZmllbGQiLCJsYWJlbCIsInR5cGUiLCJpc05hTiIsImNoYXJBdCIsImZpZWxkTGFiZWxJblJlc3VsdHMiLCJmaWVsZExhYmVsIiwic2VhcmNoSW5kZXgiLCJpbmRleE9mIiwiZmllbGROb2RlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJzZWN0aW9uX2lkIiwiZmllbGRfaWQiLCJsYWJlbF9iZWdpbiIsImxhYmVsX21hdGNoIiwibGFiZWxfZW5kIiwic3RyIiwidGV4dGFyZWEiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwiZ29Ub09wdGlvbiIsIl90aGlzMiIsInRocyIsIm5leHRUaWNrIiwidGhlbiIsIm9wdGlvbktleSIsInRhcmdldCIsImdldEF0dHJpYnV0ZSIsInRhYlRpdGxlIiwiYWN0aXZlVGFicyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJzZWxlY3RlZFN1Ym1lbnUiLCJzdWJtZW51IiwiYWN0aXZlVGFic0NvbnRlbnQiLCJzZWxlY3RlZFRhYkNvbnRlbnQiLCJhY3RpdmVTdWJtZW51Iiwic2VsZWN0ZWRGaWVsZCIsInByZXZpb3VzU2VsZWN0ZWRGaWVsZHMiLCJfaXRlcmF0b3IiLCJfc3RlcCIsIl9maWVsZDIiLCJyZW1vdmUiLCJfaXRlcmF0b3IyIiwiX3N0ZXAyIiwiYWN0aXZlVGFiIiwiX2l0ZXJhdG9yMyIsIl9zdGVwMyIsInRhYkNvbnRlbnQiLCJhY3RpdmVTdWJNZW51RmllbGRzIiwiX2l0ZXJhdG9yNyIsIl9zdGVwNyIsIl9maWVsZDMiLCJzZXRBdHRyaWJ1dGUiLCJjbG9zZXN0IiwiYWRkIiwic3VibWVudXMiLCJfaXRlcmF0b3I0IiwiX3N0ZXA0IiwiX2l0ZXJhdG9yNSIsIl9zdGVwNSIsInJlbW92ZUF0dHJpYnV0ZSIsIl9maWVsZHMiLCJfaXRlcmF0b3I2IiwiX3N0ZXA2IiwiX2ZpZWxkIiwid2luZG93Iiwic2Nyb2xsVG8iLCJ0b3AiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJzY3JvbGxZIiwiYmVoYXZpb3IiLCJmb2N1c0luIiwiZm9jdXNPdXQiLCJrZXlzIiwicmVtb3ZlU2VhcmNoVmFsdWUiLCJmb2N1cyIsInJlc3VsdHNIb3ZlciIsInJlc3VsdHNIb3Zlck91dCIsIndhdGNoIiwiX3ZhbHVlIl0sInNvdXJjZXMiOlsiZmFrZV85MDNlZjdiZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIobywgYWxsb3dBcnJheUxpa2UpIHsgdmFyIGl0ID0gdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0gfHwgb1tcIkBAaXRlcmF0b3JcIl07IGlmICghaXQpIHsgaWYgKEFycmF5LmlzQXJyYXkobykgfHwgKGl0ID0gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8pKSB8fCBhbGxvd0FycmF5TGlrZSAmJiBvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgeyBpZiAoaXQpIG8gPSBpdDsgdmFyIGkgPSAwOyB2YXIgRiA9IGZ1bmN0aW9uIEYoKSB7fTsgcmV0dXJuIHsgczogRiwgbjogZnVuY3Rpb24gbigpIHsgaWYgKGkgPj0gby5sZW5ndGgpIHJldHVybiB7IGRvbmU6IHRydWUgfTsgcmV0dXJuIHsgZG9uZTogZmFsc2UsIHZhbHVlOiBvW2krK10gfTsgfSwgZTogZnVuY3Rpb24gZShfZSkgeyB0aHJvdyBfZTsgfSwgZjogRiB9OyB9IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gaXRlcmF0ZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfSB2YXIgbm9ybWFsQ29tcGxldGlvbiA9IHRydWUsIGRpZEVyciA9IGZhbHNlLCBlcnI7IHJldHVybiB7IHM6IGZ1bmN0aW9uIHMoKSB7IGl0ID0gaXQuY2FsbChvKTsgfSwgbjogZnVuY3Rpb24gbigpIHsgdmFyIHN0ZXAgPSBpdC5uZXh0KCk7IG5vcm1hbENvbXBsZXRpb24gPSBzdGVwLmRvbmU7IHJldHVybiBzdGVwOyB9LCBlOiBmdW5jdGlvbiBlKF9lMikgeyBkaWRFcnIgPSB0cnVlOyBlcnIgPSBfZTI7IH0sIGY6IGZ1bmN0aW9uIGYoKSB7IHRyeSB7IGlmICghbm9ybWFsQ29tcGxldGlvbiAmJiBpdFtcInJldHVyblwiXSAhPSBudWxsKSBpdFtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoZGlkRXJyKSB0aHJvdyBlcnI7IH0gfSB9OyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuVnVlLmNvbXBvbmVudCgnc2VhcmNoLWJ5LXNldHRpbmdzJywge1xuICBwcm9wczogWydzZXR0aW5ncycsICdwbGFjZWhvbGRlcicsICdub3Rmb3VuZCddLFxuICBkYXRhOiBmdW5jdGlvbiBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiB7fSxcbiAgICAgIGZvdW5kOiB7fSxcbiAgICAgIHZhbHVlOiAnJyxcbiAgICAgIHNlbGVjdGVkOiB7fSxcbiAgICAgIGluRm9jdXM6IGZhbHNlLFxuICAgICAgc2VsZWN0ZWRCbGlua1RpbWVvdXQ6IGZhbHNlLFxuICAgICAgaG92ZXJPblJlc3VsdHM6IGZhbHNlLFxuICAgICAgc2VhcmNoVGltZW91dDogZmFsc2UsXG4gICAgICBzZWFyY2hEb25lOiBmYWxzZVxuICAgIH07XG4gIH0sXG4gIHRlbXBsYXRlOiBcIlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvX3NlYXJjaF9ncm91cFxcXCI+XFxuXFx0XFx0XFx0PGlucHV0IEBmb2N1cz1cXFwiZm9jdXNJblxcXCIgQGZvY3Vzb3V0PVxcXCJmb2N1c091dFxcXCIgQGlucHV0PVxcXCJzZWFyY2hcXFwiIHR5cGU9XFxcInRleHRcXFwiIG5hbWU9XFxcIlxcXCIgdi1tb2RlbD1cXFwidmFsdWVcXFwiIGNsYXNzPVxcXCJ3cGNmdG8tc2VhcmNoLWZpZWxkXFxcIiA6cGxhY2Vob2xkZXI9XFxcInBsYWNlaG9sZGVyXFxcIi8+XFxuICAgICAgICAgICAgPGRpdiBAbW91c2VlbnRlcj1cXFwicmVzdWx0c0hvdmVyXFxcIiBAbW91c2VsZWF2ZT1cXFwicmVzdWx0c0hvdmVyT3V0XFxcIiB2LWlmPVxcXCJ2YWx1ZS5sZW5ndGggJiYgT2JqZWN0LmtleXMoZm91bmQpLmxlbmd0aCAmJiBpbkZvY3VzXFxcIiBjbGFzcz1cXFwid3BjZnRvLXNlYXJjaC1yZXN1bHRzXFxcIj5cXG4gICAgICAgICAgICAgICAgPGRpdiBAY2xpY2s9XFxcImdvVG9PcHRpb25cXFwiIGNsYXNzPVxcXCJ3cGNmdG8tc2VhcmNoLXJlc3VsdFxcXCIgdi1mb3I9XFxcIihpdGVtLCBrZXkpIGluIGZvdW5kXFxcIiA6ZGF0YS1rZXk9XFxcImtleVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG8tc2VhcmNoLXJlc3VsdC1uYW1lXFxcIiA6ZGF0YS1rZXk9XFxcImtleVxcXCI+e3sgaXRlbS5sYWJlbF9iZWdpbiB9fTxzcGFuIDpkYXRhLWtleT1cXFwia2V5XFxcIj57eyBpdGVtLmxhYmVsX21hdGNoIH19PC9zcGFuPnt7IGl0ZW0ubGFiZWxfZW5kIH19PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG8tc2VhcmNoLXJlc3VsdC1zZWN0aW9uXFxcIiA6ZGF0YS1rZXk9XFxcImtleVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAge3sgZGVjb2RlSFRNTEVudGl0aWVzKHNldHRpbmdzW2l0ZW0uc2VjdGlvbl9pZF0ubmFtZSkgfX1cXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiA6ZGF0YS1rZXk9XFxcImtleVxcXCIgdi1pZj1cXFwic2V0dGluZ3NbaXRlbS5zZWN0aW9uX2lkXS5maWVsZHNbaXRlbS5maWVsZF9pZF0gJiYgc2V0dGluZ3NbaXRlbS5zZWN0aW9uX2lkXS5maWVsZHNbaXRlbS5maWVsZF9pZF0uc3VibWVudVxcXCI+e3sgZGVjb2RlSFRNTEVudGl0aWVzKHNldHRpbmdzW2l0ZW0uc2VjdGlvbl9pZF0uZmllbGRzW2l0ZW0uZmllbGRfaWRdLnN1Ym1lbnUpIH19PC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgdi1pZj1cXFwidmFsdWUubGVuZ3RoXFxcIiBAY2xpY2s9XFxcInJlbW92ZVNlYXJjaFZhbHVlXFxcIiBjbGFzcz1cXFwid3BjZnRvLXJlbW92ZS1zZWFyY2gtdmFsdWVcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgQG1vdXNlZW50ZXI9XFxcInJlc3VsdHNIb3ZlclxcXCIgQG1vdXNlbGVhdmU9XFxcInJlc3VsdHNIb3Zlck91dFxcXCIgdi1pZj1cXFwidmFsdWUubGVuZ3RoICYmIHNlYXJjaERvbmUgPT09IHRydWUgJiYgT2JqZWN0LmtleXMoZm91bmQpLmxlbmd0aCA9PT0gMCAmJiBpbkZvY3VzXFxcIiBjbGFzcz1cXFwid3BjZnRvLXNlYXJjaC1yZXN1bHRzIG5vdC1mb3VuZFxcXCI+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0by1zZWFyY2gtcmVzdWx0XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0by1zZWFyY2gtcmVzdWx0LW5hbWVcXFwiPjxpIGNsYXNzPVxcXCJudXh5LW5vdGZvdW5kLWljb25cXFwiPjwvaT57eyBub3Rmb3VuZCB9fTwvZGl2PlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICBcIixcbiAgbWV0aG9kczoge1xuICAgIHNlYXJjaDogZnVuY3Rpb24gc2VhcmNoKGUpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHRoaXMuc2VhcmNoRG9uZSA9IGZhbHNlO1xuXG4gICAgICBpZiAodGhpcy5zZWFyY2hUaW1lb3V0KSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnNlYXJjaFRpbWVvdXQpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNlYXJjaFRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRvYyA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoX3RoaXMudmFsdWUsICd0ZXh0L2h0bWwnKTtcbiAgICAgICAgdmFyIHNlYXJjaCA9IF90aGlzLmRlY29kZUhUTUxFbnRpdGllcyhkb2MuYm9keS50ZXh0Q29udGVudC50cmltKCkudG9Mb3dlckNhc2UoKSkgfHwgJyc7XG4gICAgICAgIF90aGlzLmZvdW5kID0ge307XG5cbiAgICAgICAgaWYgKHNlYXJjaCkge1xuICAgICAgICAgIGZvciAodmFyIHNlY3Rpb25JRCBpbiBfdGhpcy5zZXR0aW5ncykge1xuICAgICAgICAgICAgdmFyIHNlY3Rpb24gPSBfdGhpcy5zZXR0aW5nc1tzZWN0aW9uSURdO1xuICAgICAgICAgICAgY29uc29sZS5sb2coc2VjdGlvbklEKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlY3Rpb24pO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBmaWVsZElEIGluIHNlY3Rpb24uZmllbGRzKSB7XG4gICAgICAgICAgICAgIHZhciBmaWVsZCA9IHNlY3Rpb24uZmllbGRzW2ZpZWxkSURdO1xuXG4gICAgICAgICAgICAgIGlmIChmaWVsZC5sYWJlbCAmJiBmaWVsZC50eXBlICE9PSAnZ3JvdXBfdGl0bGUnKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc05hTihmaWVsZElELmNoYXJBdCgwKSkpIHtcbiAgICAgICAgICAgICAgICAgIGZpZWxkSUQgPSAnYScgKyBmaWVsZElEO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBmaWVsZExhYmVsSW5SZXN1bHRzID0gX3RoaXMuZGVjb2RlSFRNTEVudGl0aWVzKGZpZWxkLmxhYmVsKTtcblxuICAgICAgICAgICAgICAgIHZhciBmaWVsZExhYmVsID0gZmllbGRMYWJlbEluUmVzdWx0cy50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIHZhciBzZWFyY2hJbmRleCA9IGZpZWxkTGFiZWwuaW5kZXhPZihzZWFyY2gpO1xuICAgICAgICAgICAgICAgIHZhciBmaWVsZE5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3BjZnRvLWJveC1jaGlsZC4nICsgZmllbGRJRCArICcsIC53cGNmdG8tYm94LicgKyBmaWVsZElEKTtcblxuICAgICAgICAgICAgICAgIGlmIChmaWVsZE5vZGUgJiYgc2VhcmNoSW5kZXggIT09IC0xICYmICFmaWVsZE5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdub3RpY2VfYmFubmVyJykgJiYgIWZpZWxkTm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb19iYW5uZXInKSkge1xuICAgICAgICAgICAgICAgICAgX3RoaXMuZm91bmRbc2VjdGlvbklEICsgJ18nICsgZmllbGRJRF0gPSB7XG4gICAgICAgICAgICAgICAgICAgIHNlY3Rpb25faWQ6IHNlY3Rpb25JRCxcbiAgICAgICAgICAgICAgICAgICAgZmllbGRfaWQ6IGZpZWxkSUQsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsX2JlZ2luOiBfdGhpcy5kZWNvZGVIVE1MRW50aXRpZXMoZmllbGRMYWJlbEluUmVzdWx0cy5zbGljZSgwLCBzZWFyY2hJbmRleCkpLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbF9tYXRjaDogX3RoaXMuZGVjb2RlSFRNTEVudGl0aWVzKGZpZWxkTGFiZWxJblJlc3VsdHMuc2xpY2Uoc2VhcmNoSW5kZXgsIHNlYXJjaEluZGV4ICsgc2VhcmNoLmxlbmd0aCkpLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbF9lbmQ6IF90aGlzLmRlY29kZUhUTUxFbnRpdGllcyhmaWVsZExhYmVsSW5SZXN1bHRzLnNsaWNlKHNlYXJjaEluZGV4ICsgc2VhcmNoLmxlbmd0aCkpXG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIF90aGlzLnNlYXJjaERvbmUgPSB0cnVlO1xuICAgICAgfSwgMzAwKTtcbiAgICB9LFxuICAgIGRlY29kZUhUTUxFbnRpdGllczogZnVuY3Rpb24gZGVjb2RlSFRNTEVudGl0aWVzKHN0cikge1xuICAgICAgdmFyIHRleHRhcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpO1xuICAgICAgdGV4dGFyZWEuaW5uZXJIVE1MID0gc3RyO1xuICAgICAgcmV0dXJuIHRleHRhcmVhLnZhbHVlO1xuICAgIH0sXG4gICAgZ29Ub09wdGlvbjogZnVuY3Rpb24gZ29Ub09wdGlvbihlKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgdmFyIHRocyA9IHRoaXM7XG4gICAgICBWdWUubmV4dFRpY2soKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG9wdGlvbktleSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1rZXknKTtcbiAgICAgICAgdmFyIHNlbGVjdGVkID0gX3RoaXMyLmZvdW5kW29wdGlvbktleV07XG4gICAgICAgIHZhciB0YWJUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNlY3Rpb249XCInICsgc2VsZWN0ZWQuc2VjdGlvbl9pZCArICdcIl0ud3BjZnRvLW5hdi10aXRsZScpO1xuICAgICAgICB2YXIgYWN0aXZlVGFicyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53cGNmdG8tbmF2LmFjdGl2ZSwgLndwY2Z0by1zdWJtZW51cyA+IC5hY3RpdmUnKTtcbiAgICAgICAgdmFyIHNlbGVjdGVkU3VibWVudSA9IF90aGlzMi5zZXR0aW5nc1tzZWxlY3RlZC5zZWN0aW9uX2lkXS5maWVsZHNbc2VsZWN0ZWQuZmllbGRfaWRdID8gX3RoaXMyLnNldHRpbmdzW3NlbGVjdGVkLnNlY3Rpb25faWRdLmZpZWxkc1tzZWxlY3RlZC5maWVsZF9pZF0uc3VibWVudSA6IGZhbHNlO1xuICAgICAgICB2YXIgYWN0aXZlVGFic0NvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud3BjZnRvLXRhYi5hY3RpdmUnKTtcbiAgICAgICAgdmFyIHNlbGVjdGVkVGFiQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cGNmdG8tdGFiIycgKyBzZWxlY3RlZC5zZWN0aW9uX2lkKTtcbiAgICAgICAgdmFyIGFjdGl2ZVN1Ym1lbnU7XG4gICAgICAgIHZhciBzZWxlY3RlZEZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndwY2Z0by1ib3guJyArIHNlbGVjdGVkLmZpZWxkX2lkICsgJywgLndwY2Z0by1ib3gtY2hpbGQuJyArIHNlbGVjdGVkLmZpZWxkX2lkKTtcbiAgICAgICAgdmFyIHByZXZpb3VzU2VsZWN0ZWRGaWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud3BjZnRvLWJveC5zZWxlY3RlZC1maWVsZCwgLndwY2Z0by1ib3gtY2hpbGQuc2VsZWN0ZWQtZmllbGQnKTtcblxuICAgICAgICB2YXIgX2l0ZXJhdG9yID0gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIocHJldmlvdXNTZWxlY3RlZEZpZWxkcyksXG4gICAgICAgICAgICBfc3RlcDtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIGZvciAoX2l0ZXJhdG9yLnMoKTsgIShfc3RlcCA9IF9pdGVyYXRvci5uKCkpLmRvbmU7KSB7XG4gICAgICAgICAgICB2YXIgX2ZpZWxkMiA9IF9zdGVwLnZhbHVlO1xuXG4gICAgICAgICAgICBpZiAoX2ZpZWxkMi5jbGFzc0xpc3QuY29udGFpbnMoJ3NlbGVjdGVkLWZpZWxkJykpIHtcbiAgICAgICAgICAgICAgX2ZpZWxkMi5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZC1maWVsZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgX2l0ZXJhdG9yLmUoZXJyKTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBfaXRlcmF0b3IuZigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIF9pdGVyYXRvcjIgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlcihhY3RpdmVUYWJzKSxcbiAgICAgICAgICAgIF9zdGVwMjtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIGZvciAoX2l0ZXJhdG9yMi5zKCk7ICEoX3N0ZXAyID0gX2l0ZXJhdG9yMi5uKCkpLmRvbmU7KSB7XG4gICAgICAgICAgICB2YXIgYWN0aXZlVGFiID0gX3N0ZXAyLnZhbHVlO1xuICAgICAgICAgICAgYWN0aXZlVGFiLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgX2l0ZXJhdG9yMi5lKGVycik7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgX2l0ZXJhdG9yMi5mKCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgX2l0ZXJhdG9yMyA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyKGFjdGl2ZVRhYnNDb250ZW50KSxcbiAgICAgICAgICAgIF9zdGVwMztcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIGZvciAoX2l0ZXJhdG9yMy5zKCk7ICEoX3N0ZXAzID0gX2l0ZXJhdG9yMy5uKCkpLmRvbmU7KSB7XG4gICAgICAgICAgICB2YXIgdGFiQ29udGVudCA9IF9zdGVwMy52YWx1ZTtcbiAgICAgICAgICAgIHRhYkNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG5cbiAgICAgICAgICAgIGlmICh0YWJDb250ZW50LmNsYXNzTGlzdC5jb250YWlucygnaGFzLXN1Ym1lbnUnKSkge1xuICAgICAgICAgICAgICB2YXIgYWN0aXZlU3ViTWVudUZpZWxkcyA9IHRhYkNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnLndwY2Z0by1ib3gnKTtcblxuICAgICAgICAgICAgICB2YXIgX2l0ZXJhdG9yNyA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyKGFjdGl2ZVN1Yk1lbnVGaWVsZHMpLFxuICAgICAgICAgICAgICAgICAgX3N0ZXA3O1xuXG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZm9yIChfaXRlcmF0b3I3LnMoKTsgIShfc3RlcDcgPSBfaXRlcmF0b3I3Lm4oKSkuZG9uZTspIHtcbiAgICAgICAgICAgICAgICAgIHZhciBfZmllbGQzID0gX3N0ZXA3LnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICBfZmllbGQzLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnZGlzcGxheTpub25lJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICBfaXRlcmF0b3I3LmUoZXJyKTtcbiAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICBfaXRlcmF0b3I3LmYoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgX2l0ZXJhdG9yMy5lKGVycik7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgX2l0ZXJhdG9yMy5mKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0YWJUaXRsZS5jbG9zZXN0KCcud3BjZnRvLW5hdicpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICBzZWxlY3RlZFRhYkNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkU3VibWVudSkge1xuICAgICAgICAgIHZhciBzdWJtZW51cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53cGNmdG8tc3VibWVudXMgPiBkaXYnKTtcblxuICAgICAgICAgIHZhciBfaXRlcmF0b3I0ID0gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIoc3VibWVudXMpLFxuICAgICAgICAgICAgICBfc3RlcDQ7XG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yIChfaXRlcmF0b3I0LnMoKTsgIShfc3RlcDQgPSBfaXRlcmF0b3I0Lm4oKSkuZG9uZTspIHtcbiAgICAgICAgICAgICAgdmFyIHN1Ym1lbnUgPSBfc3RlcDQudmFsdWU7XG5cbiAgICAgICAgICAgICAgaWYgKHN1Ym1lbnUudGV4dENvbnRlbnQudHJpbSgpID09PSBzZWxlY3RlZFN1Ym1lbnUudHJpbSgpKSB7XG4gICAgICAgICAgICAgICAgYWN0aXZlU3VibWVudSA9IHN1Ym1lbnU7XG4gICAgICAgICAgICAgICAgc3VibWVudS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgX2l0ZXJhdG9yNC5lKGVycik7XG4gICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIF9pdGVyYXRvcjQuZigpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBmaWVsZHMgPSBzZWxlY3RlZFRhYkNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnLndwY2Z0by1ib3guJyArIGFjdGl2ZVN1Ym1lbnUuZ2V0QXR0cmlidXRlKCdkYXRhLXN1Ym1lbnUnKSArICcsIC53cGNmdG8tYm94LicgKyBhY3RpdmVTdWJtZW51LmdldEF0dHJpYnV0ZSgnZGF0YS1zdWJtZW51JykgKyAnIC53cGNmdG8tYm94LWNoaWxkJyk7XG5cbiAgICAgICAgICB2YXIgX2l0ZXJhdG9yNSA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyKGZpZWxkcyksXG4gICAgICAgICAgICAgIF9zdGVwNTtcblxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKF9pdGVyYXRvcjUucygpOyAhKF9zdGVwNSA9IF9pdGVyYXRvcjUubigpKS5kb25lOykge1xuICAgICAgICAgICAgICB2YXIgZmllbGQgPSBfc3RlcDUudmFsdWU7XG4gICAgICAgICAgICAgIGZpZWxkLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIF9pdGVyYXRvcjUuZShlcnIpO1xuICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICBfaXRlcmF0b3I1LmYoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIF9maWVsZHMgPSBzZWxlY3RlZFRhYkNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnLndwY2Z0by1ib3gsIC53cGNmdG8tYm94LWNoaWxkJyk7XG5cbiAgICAgICAgICB2YXIgX2l0ZXJhdG9yNiA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyKF9maWVsZHMpLFxuICAgICAgICAgICAgICBfc3RlcDY7XG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yIChfaXRlcmF0b3I2LnMoKTsgIShfc3RlcDYgPSBfaXRlcmF0b3I2Lm4oKSkuZG9uZTspIHtcbiAgICAgICAgICAgICAgdmFyIF9maWVsZCA9IF9zdGVwNi52YWx1ZTtcblxuICAgICAgICAgICAgICBfZmllbGQucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgX2l0ZXJhdG9yNi5lKGVycik7XG4gICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIF9pdGVyYXRvcjYuZigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNsZWFyVGltZW91dCh0aHMuc2VsZWN0ZWRCbGlua1RpbWVvdXQpO1xuICAgICAgICBzZWxlY3RlZEZpZWxkLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkLWZpZWxkJyk7XG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XG4gICAgICAgICAgdG9wOiBzZWxlY3RlZEZpZWxkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHdpbmRvdy5zY3JvbGxZIC0gMTgwLFxuICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xuICAgICAgICB9KTtcbiAgICAgICAgdGhzLmluRm9jdXMgPSBmYWxzZTtcbiAgICAgICAgdGhzLnNlbGVjdGVkQmxpbmtUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKHNlbGVjdGVkRmllbGQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3RlZC1maWVsZCcpKSB7XG4gICAgICAgICAgICBzZWxlY3RlZEZpZWxkLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkLWZpZWxkJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCA0MTAwKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZm9jdXNJbjogZnVuY3Rpb24gZm9jdXNJbihlKSB7XG4gICAgICB0aGlzLmluRm9jdXMgPSB0cnVlO1xuICAgIH0sXG4gICAgZm9jdXNPdXQ6IGZ1bmN0aW9uIGZvY3VzT3V0KGUpIHtcbiAgICAgIGlmICghdGhpcy5ob3Zlck9uUmVzdWx0cyB8fCAhT2JqZWN0LmtleXModGhpcy5mb3VuZCkubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuaW5Gb2N1cyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0sXG4gICAgcmVtb3ZlU2VhcmNoVmFsdWU6IGZ1bmN0aW9uIHJlbW92ZVNlYXJjaFZhbHVlKCkge1xuICAgICAgdGhpcy52YWx1ZSA9ICcnO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndwY2Z0by1zZWFyY2gtZmllbGQnKS5mb2N1cygpO1xuICAgIH0sXG4gICAgcmVzdWx0c0hvdmVyOiBmdW5jdGlvbiByZXN1bHRzSG92ZXIoKSB7XG4gICAgICB0aGlzLmhvdmVyT25SZXN1bHRzID0gdHJ1ZTtcbiAgICB9LFxuICAgIHJlc3VsdHNIb3Zlck91dDogZnVuY3Rpb24gcmVzdWx0c0hvdmVyT3V0KCkge1xuICAgICAgdGhpcy5ob3Zlck9uUmVzdWx0cyA9IGZhbHNlO1xuICAgIH1cbiAgfSxcbiAgd2F0Y2g6IHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUoX3ZhbHVlKSB7XG4gICAgICB0aGlzLnZhbHVlID0gX3ZhbHVlO1xuICAgIH1cbiAgfVxufSk7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQSxTQUFTQSwwQkFBVCxDQUFvQ0MsQ0FBcEMsRUFBdUNDLGNBQXZDLEVBQXVEO0VBQUUsSUFBSUMsRUFBRSxHQUFHLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsSUFBaUNILENBQUMsQ0FBQ0csTUFBTSxDQUFDQyxRQUFSLENBQWxDLElBQXVESixDQUFDLENB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
  },{}]},{},[1])
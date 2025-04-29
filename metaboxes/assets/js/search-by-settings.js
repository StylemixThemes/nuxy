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
        searchDone: false,
        container: false
      };
    },
    mounted: function mounted() {
      var settingsContainer = this.$el.closest('.wpcfto-settings');
      this.container = settingsContainer ? settingsContainer : document;
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
  
                  var fieldNode = _this.container.querySelector('.wpcfto-box-child.wpcfto-box-of-' + fieldID + ', .wpcfto-box.wpcfto-box-of-' + fieldID);
  
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
  
          var tabTitle = _this2.container.querySelector('[data-section="' + selected.section_id + '"].wpcfto-nav-title');
  
          var activeTabs = _this2.container.querySelectorAll('.wpcfto-nav.active, .wpcfto-submenus > .active');
  
          var selectedSubmenu = _this2.settings[selected.section_id].fields[selected.field_id] ? _this2.settings[selected.section_id].fields[selected.field_id].submenu : false;
  
          var activeTabsContent = _this2.container.querySelectorAll('.wpcfto-tab.active');
  
          var selectedTabContent = _this2.container.querySelector('.wpcfto-tab#' + selected.section_id);
  
          var activeSubmenu;
  
          var selectedField = _this2.container.querySelector('.wpcfto-box.wpcfto-box-of-' + selected.field_id + ', .wpcfto-box-child.wpcfto-box-of-' + selected.field_id);
  
          var previousSelectedFields = _this2.container.querySelectorAll('.wpcfto-box.selected-field, .wpcfto-box-child.selected-field');
  
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
  
              if (tabContent.classList.contains('has-submenu') || tabContent.classList.contains('has-submenu-items')) {
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
            var selectedMenuItem = _this2.container.querySelector('[data-section="' + selected.section_id + '"].wpcfto-nav-title');
  
            if (selectedMenuItem) {
              selectedMenuItem = selectedMenuItem.closest('.wpcfto-nav');
              var submenus = selectedMenuItem.querySelectorAll('.wpcfto-submenus > div');
  
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
        this.container.querySelector('.wpcfto-search-field').focus();
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
  //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsIm8iLCJhbGxvd0FycmF5TGlrZSIsIml0IiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJBcnJheSIsImlzQXJyYXkiLCJfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkiLCJsZW5ndGgiLCJpIiwiRiIsInMiLCJuIiwiZG9uZSIsInZhbHVlIiwiZSIsIl9lIiwiZiIsIlR5cGVFcnJvciIsIm5vcm1hbENvbXBsZXRpb24iLCJkaWRFcnIiLCJlcnIiLCJjYWxsIiwic3RlcCIsIm5leHQiLCJfZTIiLCJtaW5MZW4iLCJfYXJyYXlMaWtlVG9BcnJheSIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwic2xpY2UiLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJmcm9tIiwidGVzdCIsImFyciIsImxlbiIsImFycjIiLCJWdWUiLCJjb21wb25lbnQiLCJwcm9wcyIsImRhdGEiLCJmb3VuZCIsInNlbGVjdGVkIiwiaW5Gb2N1cyIsInNlbGVjdGVkQmxpbmtUaW1lb3V0IiwiaG92ZXJPblJlc3VsdHMiLCJzZWFyY2hUaW1lb3V0Iiwic2VhcmNoRG9uZSIsImNvbnRhaW5lciIsIm1vdW50ZWQiLCJzZXR0aW5nc0NvbnRhaW5lciIsIiRlbCIsImNsb3Nlc3QiLCJkb2N1bWVudCIsInRlbXBsYXRlIiwibWV0aG9kcyIsInNlYXJjaCIsIl90aGlzIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsImRvYyIsIkRPTVBhcnNlciIsInBhcnNlRnJvbVN0cmluZyIsImRlY29kZUhUTUxFbnRpdGllcyIsImJvZHkiLCJ0ZXh0Q29udGVudCIsInRyaW0iLCJ0b0xvd2VyQ2FzZSIsInNlY3Rpb25JRCIsInNldHRpbmdzIiwic2VjdGlvbiIsImZpZWxkSUQiLCJmaWVsZHMiLCJmaWVsZCIsImxhYmVsIiwidHlwZSIsImZpZWxkTGFiZWxJblJlc3VsdHMiLCJmaWVsZExhYmVsIiwic2VhcmNoSW5kZXgiLCJpbmRleE9mIiwiZmllbGROb2RlIiwicXVlcnlTZWxlY3RvciIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwic2VjdGlvbl9pZCIsImZpZWxkX2lkIiwibGFiZWxfYmVnaW4iLCJsYWJlbF9tYXRjaCIsImxhYmVsX2VuZCIsInN0ciIsInRleHRhcmVhIiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsImdvVG9PcHRpb24iLCJfdGhpczIiLCJ0aHMiLCJuZXh0VGljayIsInRoZW4iLCJvcHRpb25LZXkiLCJ0YXJnZXQiLCJnZXRBdHRyaWJ1dGUiLCJ0YWJUaXRsZSIsImFjdGl2ZVRhYnMiLCJxdWVyeVNlbGVjdG9yQWxsIiwic2VsZWN0ZWRTdWJtZW51Iiwic3VibWVudSIsImFjdGl2ZVRhYnNDb250ZW50Iiwic2VsZWN0ZWRUYWJDb250ZW50IiwiYWN0aXZlU3VibWVudSIsInNlbGVjdGVkRmllbGQiLCJwcmV2aW91c1NlbGVjdGVkRmllbGRzIiwiX2l0ZXJhdG9yIiwiX3N0ZXAiLCJfZmllbGQyIiwicmVtb3ZlIiwiX2l0ZXJhdG9yMiIsIl9zdGVwMiIsImFjdGl2ZVRhYiIsIl9pdGVyYXRvcjMiLCJfc3RlcDMiLCJ0YWJDb250ZW50IiwiYWN0aXZlU3ViTWVudUZpZWxkcyIsIl9pdGVyYXRvcjciLCJfc3RlcDciLCJfZmllbGQzIiwic2V0QXR0cmlidXRlIiwiYWRkIiwic2VsZWN0ZWRNZW51SXRlbSIsInN1Ym1lbnVzIiwiX2l0ZXJhdG9yNCIsIl9zdGVwNCIsIl9pdGVyYXRvcjUiLCJfc3RlcDUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJfZmllbGRzIiwiX2l0ZXJhdG9yNiIsIl9zdGVwNiIsIl9maWVsZCIsIndpbmRvdyIsInNjcm9sbFRvIiwidG9wIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwic2Nyb2xsWSIsImJlaGF2aW9yIiwiZm9jdXNJbiIsImZvY3VzT3V0Iiwia2V5cyIsInJlbW92ZVNlYXJjaFZhbHVlIiwiZm9jdXMiLCJyZXN1bHRzSG92ZXIiLCJyZXN1bHRzSG92ZXJPdXQiLCJ3YXRjaCIsIl92YWx1ZSJdLCJzb3VyY2VzIjpbImZha2VfMTljNTBiMmQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyKG8sIGFsbG93QXJyYXlMaWtlKSB7IHZhciBpdCA9IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdIHx8IG9bXCJAQGl0ZXJhdG9yXCJdOyBpZiAoIWl0KSB7IGlmIChBcnJheS5pc0FycmF5KG8pIHx8IChpdCA9IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvKSkgfHwgYWxsb3dBcnJheUxpa2UgJiYgbyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHsgaWYgKGl0KSBvID0gaXQ7IHZhciBpID0gMDsgdmFyIEYgPSBmdW5jdGlvbiBGKCkge307IHJldHVybiB7IHM6IEYsIG46IGZ1bmN0aW9uIG4oKSB7IGlmIChpID49IG8ubGVuZ3RoKSByZXR1cm4geyBkb25lOiB0cnVlIH07IHJldHVybiB7IGRvbmU6IGZhbHNlLCB2YWx1ZTogb1tpKytdIH07IH0sIGU6IGZ1bmN0aW9uIGUoX2UpIHsgdGhyb3cgX2U7IH0sIGY6IEYgfTsgfSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGl0ZXJhdGUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH0gdmFyIG5vcm1hbENvbXBsZXRpb24gPSB0cnVlLCBkaWRFcnIgPSBmYWxzZSwgZXJyOyByZXR1cm4geyBzOiBmdW5jdGlvbiBzKCkgeyBpdCA9IGl0LmNhbGwobyk7IH0sIG46IGZ1bmN0aW9uIG4oKSB7IHZhciBzdGVwID0gaXQubmV4dCgpOyBub3JtYWxDb21wbGV0aW9uID0gc3RlcC5kb25lOyByZXR1cm4gc3RlcDsgfSwgZTogZnVuY3Rpb24gZShfZTIpIHsgZGlkRXJyID0gdHJ1ZTsgZXJyID0gX2UyOyB9LCBmOiBmdW5jdGlvbiBmKCkgeyB0cnkgeyBpZiAoIW5vcm1hbENvbXBsZXRpb24gJiYgaXRbXCJyZXR1cm5cIl0gIT0gbnVsbCkgaXRbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKGRpZEVycikgdGhyb3cgZXJyOyB9IH0gfTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cblZ1ZS5jb21wb25lbnQoJ3NlYXJjaC1ieS1zZXR0aW5ncycsIHtcbiAgcHJvcHM6IFsnc2V0dGluZ3MnLCAncGxhY2Vob2xkZXInLCAnbm90Zm91bmQnXSxcbiAgZGF0YTogZnVuY3Rpb24gZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZGF0YToge30sXG4gICAgICBmb3VuZDoge30sXG4gICAgICB2YWx1ZTogJycsXG4gICAgICBzZWxlY3RlZDoge30sXG4gICAgICBpbkZvY3VzOiBmYWxzZSxcbiAgICAgIHNlbGVjdGVkQmxpbmtUaW1lb3V0OiBmYWxzZSxcbiAgICAgIGhvdmVyT25SZXN1bHRzOiBmYWxzZSxcbiAgICAgIHNlYXJjaFRpbWVvdXQ6IGZhbHNlLFxuICAgICAgc2VhcmNoRG9uZTogZmFsc2UsXG4gICAgICBjb250YWluZXI6IGZhbHNlXG4gICAgfTtcbiAgfSxcbiAgbW91bnRlZDogZnVuY3Rpb24gbW91bnRlZCgpIHtcbiAgICB2YXIgc2V0dGluZ3NDb250YWluZXIgPSB0aGlzLiRlbC5jbG9zZXN0KCcud3BjZnRvLXNldHRpbmdzJyk7XG4gICAgdGhpcy5jb250YWluZXIgPSBzZXR0aW5nc0NvbnRhaW5lciA/IHNldHRpbmdzQ29udGFpbmVyIDogZG9jdW1lbnQ7XG4gIH0sXG4gIHRlbXBsYXRlOiBcIlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwid3BjZnRvX3NlYXJjaF9ncm91cFxcXCI+XFxuXFx0XFx0XFx0PGlucHV0IEBmb2N1cz1cXFwiZm9jdXNJblxcXCIgQGZvY3Vzb3V0PVxcXCJmb2N1c091dFxcXCIgQGlucHV0PVxcXCJzZWFyY2hcXFwiIHR5cGU9XFxcInRleHRcXFwiIG5hbWU9XFxcIlxcXCIgdi1tb2RlbD1cXFwidmFsdWVcXFwiIGNsYXNzPVxcXCJ3cGNmdG8tc2VhcmNoLWZpZWxkXFxcIiA6cGxhY2Vob2xkZXI9XFxcInBsYWNlaG9sZGVyXFxcIi8+XFxuICAgICAgICAgICAgPGRpdiBAbW91c2VlbnRlcj1cXFwicmVzdWx0c0hvdmVyXFxcIiBAbW91c2VsZWF2ZT1cXFwicmVzdWx0c0hvdmVyT3V0XFxcIiB2LWlmPVxcXCJ2YWx1ZS5sZW5ndGggJiYgT2JqZWN0LmtleXMoZm91bmQpLmxlbmd0aCAmJiBpbkZvY3VzXFxcIiBjbGFzcz1cXFwid3BjZnRvLXNlYXJjaC1yZXN1bHRzXFxcIj5cXG4gICAgICAgICAgICAgICAgPGRpdiBAY2xpY2s9XFxcImdvVG9PcHRpb25cXFwiIGNsYXNzPVxcXCJ3cGNmdG8tc2VhcmNoLXJlc3VsdFxcXCIgdi1mb3I9XFxcIihpdGVtLCBrZXkpIGluIGZvdW5kXFxcIiA6ZGF0YS1rZXk9XFxcImtleVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG8tc2VhcmNoLXJlc3VsdC1uYW1lXFxcIiA6ZGF0YS1rZXk9XFxcImtleVxcXCI+e3sgaXRlbS5sYWJlbF9iZWdpbiB9fTxzcGFuIDpkYXRhLWtleT1cXFwia2V5XFxcIj57eyBpdGVtLmxhYmVsX21hdGNoIH19PC9zcGFuPnt7IGl0ZW0ubGFiZWxfZW5kIH19PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cGNmdG8tc2VhcmNoLXJlc3VsdC1zZWN0aW9uXFxcIiA6ZGF0YS1rZXk9XFxcImtleVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAge3sgZGVjb2RlSFRNTEVudGl0aWVzKHNldHRpbmdzW2l0ZW0uc2VjdGlvbl9pZF0ubmFtZSkgfX1cXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiA6ZGF0YS1rZXk9XFxcImtleVxcXCIgdi1pZj1cXFwic2V0dGluZ3NbaXRlbS5zZWN0aW9uX2lkXS5maWVsZHNbaXRlbS5maWVsZF9pZF0gJiYgc2V0dGluZ3NbaXRlbS5zZWN0aW9uX2lkXS5maWVsZHNbaXRlbS5maWVsZF9pZF0uc3VibWVudVxcXCI+e3sgZGVjb2RlSFRNTEVudGl0aWVzKHNldHRpbmdzW2l0ZW0uc2VjdGlvbl9pZF0uZmllbGRzW2l0ZW0uZmllbGRfaWRdLnN1Ym1lbnUpIH19PC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgdi1pZj1cXFwidmFsdWUubGVuZ3RoXFxcIiBAY2xpY2s9XFxcInJlbW92ZVNlYXJjaFZhbHVlXFxcIiBjbGFzcz1cXFwid3BjZnRvLXJlbW92ZS1zZWFyY2gtdmFsdWVcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgQG1vdXNlZW50ZXI9XFxcInJlc3VsdHNIb3ZlclxcXCIgQG1vdXNlbGVhdmU9XFxcInJlc3VsdHNIb3Zlck91dFxcXCIgdi1pZj1cXFwidmFsdWUubGVuZ3RoICYmIHNlYXJjaERvbmUgPT09IHRydWUgJiYgT2JqZWN0LmtleXMoZm91bmQpLmxlbmd0aCA9PT0gMCAmJiBpbkZvY3VzXFxcIiBjbGFzcz1cXFwid3BjZnRvLXNlYXJjaC1yZXN1bHRzIG5vdC1mb3VuZFxcXCI+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0by1zZWFyY2gtcmVzdWx0XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIndwY2Z0by1zZWFyY2gtcmVzdWx0LW5hbWVcXFwiPjxpIGNsYXNzPVxcXCJudXh5LW5vdGZvdW5kLWljb25cXFwiPjwvaT57eyBub3Rmb3VuZCB9fTwvZGl2PlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICBcIixcbiAgbWV0aG9kczoge1xuICAgIHNlYXJjaDogZnVuY3Rpb24gc2VhcmNoKGUpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHRoaXMuc2VhcmNoRG9uZSA9IGZhbHNlO1xuXG4gICAgICBpZiAodGhpcy5zZWFyY2hUaW1lb3V0KSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnNlYXJjaFRpbWVvdXQpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNlYXJjaFRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRvYyA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoX3RoaXMudmFsdWUsICd0ZXh0L2h0bWwnKTtcbiAgICAgICAgdmFyIHNlYXJjaCA9IF90aGlzLmRlY29kZUhUTUxFbnRpdGllcyhkb2MuYm9keS50ZXh0Q29udGVudC50cmltKCkudG9Mb3dlckNhc2UoKSkgfHwgJyc7XG4gICAgICAgIF90aGlzLmZvdW5kID0ge307XG5cbiAgICAgICAgaWYgKHNlYXJjaCkge1xuICAgICAgICAgIGZvciAodmFyIHNlY3Rpb25JRCBpbiBfdGhpcy5zZXR0aW5ncykge1xuICAgICAgICAgICAgdmFyIHNlY3Rpb24gPSBfdGhpcy5zZXR0aW5nc1tzZWN0aW9uSURdO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBmaWVsZElEIGluIHNlY3Rpb24uZmllbGRzKSB7XG4gICAgICAgICAgICAgIHZhciBmaWVsZCA9IHNlY3Rpb24uZmllbGRzW2ZpZWxkSURdO1xuXG4gICAgICAgICAgICAgIGlmIChmaWVsZC5sYWJlbCAmJiBmaWVsZC50eXBlICE9PSAnZ3JvdXBfdGl0bGUnKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZpZWxkTGFiZWxJblJlc3VsdHMgPSBfdGhpcy5kZWNvZGVIVE1MRW50aXRpZXMoZmllbGQubGFiZWwpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGZpZWxkTGFiZWwgPSBmaWVsZExhYmVsSW5SZXN1bHRzLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgdmFyIHNlYXJjaEluZGV4ID0gZmllbGRMYWJlbC5pbmRleE9mKHNlYXJjaCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgZmllbGROb2RlID0gX3RoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy53cGNmdG8tYm94LWNoaWxkLndwY2Z0by1ib3gtb2YtJyArIGZpZWxkSUQgKyAnLCAud3BjZnRvLWJveC53cGNmdG8tYm94LW9mLScgKyBmaWVsZElEKTtcblxuICAgICAgICAgICAgICAgIGlmIChmaWVsZE5vZGUgJiYgc2VhcmNoSW5kZXggIT09IC0xICYmICFmaWVsZE5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdub3RpY2VfYmFubmVyJykgJiYgIWZpZWxkTm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb19iYW5uZXInKSkge1xuICAgICAgICAgICAgICAgICAgX3RoaXMuZm91bmRbc2VjdGlvbklEICsgJ18nICsgZmllbGRJRF0gPSB7XG4gICAgICAgICAgICAgICAgICAgIHNlY3Rpb25faWQ6IHNlY3Rpb25JRCxcbiAgICAgICAgICAgICAgICAgICAgZmllbGRfaWQ6IGZpZWxkSUQsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsX2JlZ2luOiBfdGhpcy5kZWNvZGVIVE1MRW50aXRpZXMoZmllbGRMYWJlbEluUmVzdWx0cy5zbGljZSgwLCBzZWFyY2hJbmRleCkpLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbF9tYXRjaDogX3RoaXMuZGVjb2RlSFRNTEVudGl0aWVzKGZpZWxkTGFiZWxJblJlc3VsdHMuc2xpY2Uoc2VhcmNoSW5kZXgsIHNlYXJjaEluZGV4ICsgc2VhcmNoLmxlbmd0aCkpLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbF9lbmQ6IF90aGlzLmRlY29kZUhUTUxFbnRpdGllcyhmaWVsZExhYmVsSW5SZXN1bHRzLnNsaWNlKHNlYXJjaEluZGV4ICsgc2VhcmNoLmxlbmd0aCkpXG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIF90aGlzLnNlYXJjaERvbmUgPSB0cnVlO1xuICAgICAgfSwgMzAwKTtcbiAgICB9LFxuICAgIGRlY29kZUhUTUxFbnRpdGllczogZnVuY3Rpb24gZGVjb2RlSFRNTEVudGl0aWVzKHN0cikge1xuICAgICAgdmFyIHRleHRhcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpO1xuICAgICAgdGV4dGFyZWEuaW5uZXJIVE1MID0gc3RyO1xuICAgICAgcmV0dXJuIHRleHRhcmVhLnZhbHVlO1xuICAgIH0sXG4gICAgZ29Ub09wdGlvbjogZnVuY3Rpb24gZ29Ub09wdGlvbihlKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgdmFyIHRocyA9IHRoaXM7XG4gICAgICBWdWUubmV4dFRpY2soKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG9wdGlvbktleSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1rZXknKTtcbiAgICAgICAgdmFyIHNlbGVjdGVkID0gX3RoaXMyLmZvdW5kW29wdGlvbktleV07XG5cbiAgICAgICAgdmFyIHRhYlRpdGxlID0gX3RoaXMyLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zZWN0aW9uPVwiJyArIHNlbGVjdGVkLnNlY3Rpb25faWQgKyAnXCJdLndwY2Z0by1uYXYtdGl0bGUnKTtcblxuICAgICAgICB2YXIgYWN0aXZlVGFicyA9IF90aGlzMi5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLndwY2Z0by1uYXYuYWN0aXZlLCAud3BjZnRvLXN1Ym1lbnVzID4gLmFjdGl2ZScpO1xuXG4gICAgICAgIHZhciBzZWxlY3RlZFN1Ym1lbnUgPSBfdGhpczIuc2V0dGluZ3Nbc2VsZWN0ZWQuc2VjdGlvbl9pZF0uZmllbGRzW3NlbGVjdGVkLmZpZWxkX2lkXSA/IF90aGlzMi5zZXR0aW5nc1tzZWxlY3RlZC5zZWN0aW9uX2lkXS5maWVsZHNbc2VsZWN0ZWQuZmllbGRfaWRdLnN1Ym1lbnUgOiBmYWxzZTtcblxuICAgICAgICB2YXIgYWN0aXZlVGFic0NvbnRlbnQgPSBfdGhpczIuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy53cGNmdG8tdGFiLmFjdGl2ZScpO1xuXG4gICAgICAgIHZhciBzZWxlY3RlZFRhYkNvbnRlbnQgPSBfdGhpczIuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy53cGNmdG8tdGFiIycgKyBzZWxlY3RlZC5zZWN0aW9uX2lkKTtcblxuICAgICAgICB2YXIgYWN0aXZlU3VibWVudTtcblxuICAgICAgICB2YXIgc2VsZWN0ZWRGaWVsZCA9IF90aGlzMi5jb250YWluZXIucXVlcnlTZWxlY3RvcignLndwY2Z0by1ib3gud3BjZnRvLWJveC1vZi0nICsgc2VsZWN0ZWQuZmllbGRfaWQgKyAnLCAud3BjZnRvLWJveC1jaGlsZC53cGNmdG8tYm94LW9mLScgKyBzZWxlY3RlZC5maWVsZF9pZCk7XG5cbiAgICAgICAgdmFyIHByZXZpb3VzU2VsZWN0ZWRGaWVsZHMgPSBfdGhpczIuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy53cGNmdG8tYm94LnNlbGVjdGVkLWZpZWxkLCAud3BjZnRvLWJveC1jaGlsZC5zZWxlY3RlZC1maWVsZCcpO1xuXG4gICAgICAgIHZhciBfaXRlcmF0b3IgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlcihwcmV2aW91c1NlbGVjdGVkRmllbGRzKSxcbiAgICAgICAgICAgIF9zdGVwO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZm9yIChfaXRlcmF0b3IucygpOyAhKF9zdGVwID0gX2l0ZXJhdG9yLm4oKSkuZG9uZTspIHtcbiAgICAgICAgICAgIHZhciBfZmllbGQyID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgICAgICAgIGlmIChfZmllbGQyLmNsYXNzTGlzdC5jb250YWlucygnc2VsZWN0ZWQtZmllbGQnKSkge1xuICAgICAgICAgICAgICBfZmllbGQyLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkLWZpZWxkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBfaXRlcmF0b3IuZShlcnIpO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIF9pdGVyYXRvci5mKCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgX2l0ZXJhdG9yMiA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyKGFjdGl2ZVRhYnMpLFxuICAgICAgICAgICAgX3N0ZXAyO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZm9yIChfaXRlcmF0b3IyLnMoKTsgIShfc3RlcDIgPSBfaXRlcmF0b3IyLm4oKSkuZG9uZTspIHtcbiAgICAgICAgICAgIHZhciBhY3RpdmVUYWIgPSBfc3RlcDIudmFsdWU7XG4gICAgICAgICAgICBhY3RpdmVUYWIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBfaXRlcmF0b3IyLmUoZXJyKTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBfaXRlcmF0b3IyLmYoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBfaXRlcmF0b3IzID0gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIoYWN0aXZlVGFic0NvbnRlbnQpLFxuICAgICAgICAgICAgX3N0ZXAzO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZm9yIChfaXRlcmF0b3IzLnMoKTsgIShfc3RlcDMgPSBfaXRlcmF0b3IzLm4oKSkuZG9uZTspIHtcbiAgICAgICAgICAgIHZhciB0YWJDb250ZW50ID0gX3N0ZXAzLnZhbHVlO1xuICAgICAgICAgICAgdGFiQ29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgaWYgKHRhYkNvbnRlbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdoYXMtc3VibWVudScpIHx8IHRhYkNvbnRlbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdoYXMtc3VibWVudS1pdGVtcycpKSB7XG4gICAgICAgICAgICAgIHZhciBhY3RpdmVTdWJNZW51RmllbGRzID0gdGFiQ29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCcud3BjZnRvLWJveCcpO1xuXG4gICAgICAgICAgICAgIHZhciBfaXRlcmF0b3I3ID0gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIoYWN0aXZlU3ViTWVudUZpZWxkcyksXG4gICAgICAgICAgICAgICAgICBfc3RlcDc7XG5cbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBmb3IgKF9pdGVyYXRvcjcucygpOyAhKF9zdGVwNyA9IF9pdGVyYXRvcjcubigpKS5kb25lOykge1xuICAgICAgICAgICAgICAgICAgdmFyIF9maWVsZDMgPSBfc3RlcDcudmFsdWU7XG5cbiAgICAgICAgICAgICAgICAgIF9maWVsZDMuc2V0QXR0cmlidXRlKCdzdHlsZScsICdkaXNwbGF5Om5vbmUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIF9pdGVyYXRvcjcuZShlcnIpO1xuICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIF9pdGVyYXRvcjcuZigpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBfaXRlcmF0b3IzLmUoZXJyKTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBfaXRlcmF0b3IzLmYoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRhYlRpdGxlLmNsb3Nlc3QoJy53cGNmdG8tbmF2JykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgIHNlbGVjdGVkVGFiQ29udGVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblxuICAgICAgICBpZiAoc2VsZWN0ZWRTdWJtZW51KSB7XG4gICAgICAgICAgdmFyIHNlbGVjdGVkTWVudUl0ZW0gPSBfdGhpczIuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNlY3Rpb249XCInICsgc2VsZWN0ZWQuc2VjdGlvbl9pZCArICdcIl0ud3BjZnRvLW5hdi10aXRsZScpO1xuXG4gICAgICAgICAgaWYgKHNlbGVjdGVkTWVudUl0ZW0pIHtcbiAgICAgICAgICAgIHNlbGVjdGVkTWVudUl0ZW0gPSBzZWxlY3RlZE1lbnVJdGVtLmNsb3Nlc3QoJy53cGNmdG8tbmF2Jyk7XG4gICAgICAgICAgICB2YXIgc3VibWVudXMgPSBzZWxlY3RlZE1lbnVJdGVtLnF1ZXJ5U2VsZWN0b3JBbGwoJy53cGNmdG8tc3VibWVudXMgPiBkaXYnKTtcblxuICAgICAgICAgICAgdmFyIF9pdGVyYXRvcjQgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlcihzdWJtZW51cyksXG4gICAgICAgICAgICAgICAgX3N0ZXA0O1xuXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBmb3IgKF9pdGVyYXRvcjQucygpOyAhKF9zdGVwNCA9IF9pdGVyYXRvcjQubigpKS5kb25lOykge1xuICAgICAgICAgICAgICAgIHZhciBzdWJtZW51ID0gX3N0ZXA0LnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKHN1Ym1lbnUudGV4dENvbnRlbnQudHJpbSgpID09PSBzZWxlY3RlZFN1Ym1lbnUudHJpbSgpKSB7XG4gICAgICAgICAgICAgICAgICBhY3RpdmVTdWJtZW51ID0gc3VibWVudTtcbiAgICAgICAgICAgICAgICAgIHN1Ym1lbnUuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICBfaXRlcmF0b3I0LmUoZXJyKTtcbiAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgIF9pdGVyYXRvcjQuZigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZmllbGRzID0gc2VsZWN0ZWRUYWJDb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53cGNmdG8tYm94LicgKyBhY3RpdmVTdWJtZW51LmdldEF0dHJpYnV0ZSgnZGF0YS1zdWJtZW51JykgKyAnLCAud3BjZnRvLWJveC4nICsgYWN0aXZlU3VibWVudS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3VibWVudScpICsgJyAud3BjZnRvLWJveC1jaGlsZCcpO1xuXG4gICAgICAgICAgICB2YXIgX2l0ZXJhdG9yNSA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyKGZpZWxkcyksXG4gICAgICAgICAgICAgICAgX3N0ZXA1O1xuXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBmb3IgKF9pdGVyYXRvcjUucygpOyAhKF9zdGVwNSA9IF9pdGVyYXRvcjUubigpKS5kb25lOykge1xuICAgICAgICAgICAgICAgIHZhciBmaWVsZCA9IF9zdGVwNS52YWx1ZTtcbiAgICAgICAgICAgICAgICBmaWVsZC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICBfaXRlcmF0b3I1LmUoZXJyKTtcbiAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgIF9pdGVyYXRvcjUuZigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgX2ZpZWxkcyA9IHNlbGVjdGVkVGFiQ29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCcud3BjZnRvLWJveCwgLndwY2Z0by1ib3gtY2hpbGQnKTtcblxuICAgICAgICAgIHZhciBfaXRlcmF0b3I2ID0gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIoX2ZpZWxkcyksXG4gICAgICAgICAgICAgIF9zdGVwNjtcblxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKF9pdGVyYXRvcjYucygpOyAhKF9zdGVwNiA9IF9pdGVyYXRvcjYubigpKS5kb25lOykge1xuICAgICAgICAgICAgICB2YXIgX2ZpZWxkID0gX3N0ZXA2LnZhbHVlO1xuXG4gICAgICAgICAgICAgIF9maWVsZC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBfaXRlcmF0b3I2LmUoZXJyKTtcbiAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgX2l0ZXJhdG9yNi5mKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY2xlYXJUaW1lb3V0KHRocy5zZWxlY3RlZEJsaW5rVGltZW91dCk7XG4gICAgICAgIHNlbGVjdGVkRmllbGQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtZmllbGQnKTtcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKHtcbiAgICAgICAgICB0b3A6IHNlbGVjdGVkRmllbGQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgd2luZG93LnNjcm9sbFkgLSAxODAsXG4gICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXG4gICAgICAgIH0pO1xuICAgICAgICB0aHMuaW5Gb2N1cyA9IGZhbHNlO1xuICAgICAgICB0aHMuc2VsZWN0ZWRCbGlua1RpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoc2VsZWN0ZWRGaWVsZC5jbGFzc0xpc3QuY29udGFpbnMoJ3NlbGVjdGVkLWZpZWxkJykpIHtcbiAgICAgICAgICAgIHNlbGVjdGVkRmllbGQuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQtZmllbGQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDQxMDApO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBmb2N1c0luOiBmdW5jdGlvbiBmb2N1c0luKGUpIHtcbiAgICAgIHRoaXMuaW5Gb2N1cyA9IHRydWU7XG4gICAgfSxcbiAgICBmb2N1c091dDogZnVuY3Rpb24gZm9jdXNPdXQoZSkge1xuICAgICAgaWYgKCF0aGlzLmhvdmVyT25SZXN1bHRzIHx8ICFPYmplY3Qua2V5cyh0aGlzLmZvdW5kKS5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5pbkZvY3VzID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSxcbiAgICByZW1vdmVTZWFyY2hWYWx1ZTogZnVuY3Rpb24gcmVtb3ZlU2VhcmNoVmFsdWUoKSB7XG4gICAgICB0aGlzLnZhbHVlID0gJyc7XG4gICAgICB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcud3BjZnRvLXNlYXJjaC1maWVsZCcpLmZvY3VzKCk7XG4gICAgfSxcbiAgICByZXN1bHRzSG92ZXI6IGZ1bmN0aW9uIHJlc3VsdHNIb3ZlcigpIHtcbiAgICAgIHRoaXMuaG92ZXJPblJlc3VsdHMgPSB0cnVlO1xuICAgIH0sXG4gICAgcmVzdWx0c0hvdmVyT3V0OiBmdW5jdGlvbiByZXN1bHRzSG92ZXJPdXQoKSB7XG4gICAgICB0aGlzLmhvdmVyT25SZXN1bHRzID0gZmFsc2U7XG4gICAgfVxuICB9LFxuICB3YXRjaDoge1xuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShfdmFsdWUpIHtcbiAgICAgIHRoaXMudmFsdWUgPSBfdmFsdWU7XG4gICAgfVxuICB9XG59KTsiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBLFNBQVNBLDBCQUFULENBQW9DQyxDQUFwQyxFQUF1Q0MsY0FBdkMsRUFBdUQ7RUFBRSxJQUFJQyxFQUFFLEdBQUcsT0FBT0MsTUFBUCxLQUFrQixXQUFsQixJQUFpQ0gsQ0FBQyxDQUFDRyxNQUFNLENBQUNDLFFBQVIsQ0FBbEMsSUFBdURKLENBQUMsQ0FBQyxZQUFELENBQWpFOztFQUFpRixJQUFJLENBQUNFLEVBQUwsRUFBUztJQUFFLElBQUlHLEtBQUssQ0FBQ0MsT0FBTixDQUFjTixDQUFkLE1BQXFCRSxFQUFFLEdBQUdLLDJCQUEyQixDQUFDUCxDQUFELENBQXJELEtBQTZEQyxjQUFjLElBQUlELENBQWxCLElBQXVCLE9BQU9BLENBQUMsQ0FBQ1EsTUFBVCxLQUFvQixRQUE1RyxFQUFzSDtNQUFFLElBQUlOLEVBQUosRUFBUUYsQ0FBQyxHQUFHRSxFQUFKO01BQVEsSUFBSU8sQ0FBQyxHQUFHLENBQVI7O01BQVcsSUFBSUMsQ0FBQyxHQUFHLFNBQVNBLENBQVQsR0FBYSxDQUFFLENBQXZCOztNQUF5QixPQUFPO1FBQUVDLENBQUMsRUFBRUQsQ0FB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
  },{}]},{},[1])
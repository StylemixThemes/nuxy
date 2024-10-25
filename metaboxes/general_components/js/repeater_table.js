(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

Vue.component('wpcfto_repeater_table', {
  props: ['fields', 'popup_text', 'popup_confirm_button', 'popup_cancel_button', 'fields_error', 'fields_range_error'],
  components: {
    'slider-picker': VueColor.Chrome
  },
  data: function data() {
    return {
      newRow: this.initializeNewRow(),
      colorValue: {
        r: 255,
        g: 255,
        b: 255,
        a: 1
      },
      colorInputValue: 'rgba(255, 255, 255, 1)',
      showConfirmDelete: false,
      validationErrors: {}
    };
  },
  created: function created() {
    if (typeof this.newRow.color === 'string') {
      this.colorInputValue = this.newRow.color;
      var colors = this.newRow.color.replace('rgba(', '').slice(0, -1).split(',');
      this.colorValue.r = parseInt(colors[0]);
      this.colorValue.g = parseInt(colors[1]);
      this.colorValue.b = parseInt(colors[2]);
      this.colorValue.a = parseFloat(colors[3]);
    }
  },
  template: "\n\t\t<div class=\"wpcfto_generic_field\" v-if=\"fields.options && Object.keys(fields.options).length\">\n\t\t\t<div class=\"wpcfto_repeater_table\">\n\t\t\t\t<div class=\"wpcfto_repeater_table__title\">{{ fields.label }}</div>\n\t\t\t\t<div class=\"wpcfto_repeater_table__wrapper\">\n\t\t\t\t\t<div class=\"wpcfto_repeater_table__header\">\n\t\t\t\t\t\t<div v-for=\"(column, key) in fields.options\" \n\t\t\t\t\t\t\tv-if=\"key !== 'color'\" \n\t\t\t\t\t\t\t:key=\"key\"\n\t\t\t\t\t\t\t:style=\"{ width: column.width }\"\n\t\t\t\t\t\t\t:class=\"'wpcfto_repeater_table__column wpcfto_repeater_table__column_' + column.type\"\n\t\t\t\t\t\t>\n\t\t\t\t\t\t\t{{ column.title }}\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"wpcfto_repeater_table__body\">\n\t\t\t\t\t\t<div v-for=\"(row, rowIndex) in fields.value\" :key=\"rowIndex\" class=\"wpcfto_repeater_table__row\">\n\t\t\t\t\t\t\t<div v-for=\"(column, key) in fields.options\" \n\t\t\t\t\t\t\t\tv-if=\"key !== 'color'\"\n\t\t\t\t\t\t\t\t:key=\"key\"\n\t\t\t\t\t\t\t\t:style=\"{ width: column.width }\"\n\t\t\t\t\t\t\t\t:class=\"'wpcfto_repeater_table__item wpcfto_repeater_table__item_' + column.type\"\n\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t<span v-if=\"key === 'badge'\" class=\"wpcfto_repeater_table__item-badge\" :style=\"{ background: row.color }\">\n\t\t\t\t\t\t\t\t\t{{ row[key] }}\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t<span v-else-if=\"Array.isArray(row[key])\" class=\"wpcfto_repeater_table__item-value\">\n\t\t\t\t\t\t\t\t\t{{ row[key].map(val => val + '%').join(' - ') }}\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t<span v-else class=\"wpcfto_repeater_table__item-value\">\n\t\t\t\t\t\t\t\t\t{{ row[key] || '' }}\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<span v-if=\"rowIndex === fields.value.length - 1\" @click=\"confirmDelete\" class=\"wpcfto_repeater_table__row-delete\">\n\t\t\t\t\t\t\t\t<i class=\"fa fa-trash\"></i>\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"wpcfto_repeater_table__add-row\">\n\t\t\t\t\t<div v-for=\"(column, key) in fields.options\" :key=\"key\" class=\"wpcfto_repeater_table__input-wrapper\">\n\t\t\t\t\t\t<span class=\"wpcfto_repeater_table__input-title\">\n\t\t\t\t\t\t\t{{ column.title }}{{ column.type === 'range' ? ' min, %' : '' }}\n\t\t\t\t\t\t</span>\n\t\t\t\t\t\t<input v-if=\"column.type === 'text' || column.type === 'badge'\"\n\t\t\t\t\t\t\ttype=\"text\"\n\t\t\t\t\t\t\tv-model=\"newRow[key]\"\n\t\t\t\t\t\t\tclass=\"wpcfto_repeater_table__input\"\n\t\t\t\t\t\t\t:class=\"{'wpcfto_repeater_table__input_error': validationErrors[key]}\"\n\t\t\t\t\t\t\t@input=\"clearValidationError(key)\"\n\t\t\t\t\t\t/>\n\t\t\t\t\t\t<input v-else-if=\"column.type === 'number'\"\n\t\t\t\t\t\t\ttype=\"number\"\n\t\t\t\t\t\t\tmin=\"0\"\n\t\t\t\t\t\t\tv-model=\"newRow[key]\"\n\t\t\t\t\t\t\tclass=\"wpcfto_repeater_table__input\"\n\t\t\t\t\t\t\t:class=\"{'wpcfto_repeater_table__input_error': validationErrors[key]}\"\n\t\t\t\t\t\t\t@input=\"clearValidationError(key)\"\n\t\t\t\t\t\t/>\n\t\t\t\t\t\t<input v-else-if=\"column.type === 'range'\"\n\t\t\t\t\t\t\ttype=\"number\"\n\t\t\t\t\t\t\tmin=\"0\"\n\t\t\t\t\t\t\tv-model=\"newRow[key]\"\n\t\t\t\t\t\t\tclass=\"wpcfto_repeater_table__input\"\n\t\t\t\t\t\t\t:class=\"{'wpcfto_repeater_table__input_error': validationErrors[key]}\"\n\t\t\t\t\t\t\t@input=\"handleRangeInput(key)\"\n\t\t\t\t\t\t/>\n\t\t\t\t\t\t<div v-else-if=\"column.type === 'color'\" class=\"stm_colorpicker_wrapper\">\n\t\t\t\t\t\t\t<span :style=\"{'background-color': colorInputValue}\" @click=\"focusNextInput\"></span>\n\t\t\t\t\t\t\t<input\n\t\t\t\t\t\t\t\ttype=\"text\"\n\t\t\t\t\t\t\t\tv-model=\"colorInputValue\"\n\t\t\t\t\t\t\t\tclass=\"wpcfto_repeater_table__input\"\n\t\t\t\t\t\t\t\t:class=\"{'wpcfto_repeater_table__input_error': validationErrors[key] && colorInputValue === ''}\"\n\t\t\t\t\t\t\t\t@input=\"handleColorInput(key)\"\n\t\t\t\t\t\t\t/>\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<slider-picker v-model=\"colorValue\"></slider-picker>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div v-if=\"validationErrors[key] && (key !== 'color' || colorInputValue === '')\" class=\"wpcfto_repeater_table__error-message\">\n\t\t\t\t\t\t\t{{ validationErrors[key] }}\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<span class=\"wpcfto_repeater_table__add-button\" @click=\"addRow\">Add</span>\n\t\t\t\t</div>\n\t\t\t\t<div :class=\"{'wpcfto_repeater_table__popup': true, 'wpcfto_repeater_table__popup_show': showConfirmDelete}\">\n\t\t\t\t\t<div class=\"wpcfto_repeater_table__popup-content\">\n\t\t\t\t\t\t<div class=\"wpcfto_repeater_table__popup-text\">{{ popup_text }}</div>\n\t\t\t\t\t\t<div class=\"wpcfto_repeater_table__popup-actions\">\n\t\t\t\t\t\t\t<span @click=\"closeDeleteConfirm\" class=\"wpcfto_repeater_table__popup-cancel\">{{ popup_cancel_button }}</span>\n\t\t\t\t\t\t\t<span @click=\"deleteLastRow\" class=\"wpcfto_repeater_table__popup-confirm\">{{ popup_confirm_button }}</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t",
  methods: {
    updateColor: function updateColor(newColor) {
      this.newRow.color = newColor;
    },
    initializeNewRow: function initializeNewRow() {
      var row = {};

      for (var key in this.fields.options) {
        row[key] = '';
      }

      return row;
    },
    focusNextInput: function focusNextInput() {
      this.$nextTick(function () {
        var spanElement = event.target;
        var inputElement = spanElement.nextElementSibling;

        if (inputElement && inputElement.tagName === 'INPUT') {
          inputElement.focus();
        }
      });
    },
    addRow: function addRow() {
      var _this = this;

      var isValid = true;
      var maxRange = 100;
      this.validationErrors = {};

      for (var key in this.fields.options) {
        if (this.newRow[key] === null || this.newRow[key] === '') {
          isValid = false;
          this.$set(this.validationErrors, key, this.fields_error);
        }
      }

      var colorField = Object.keys(this.fields.options).find(function (key) {
        return _this.fields.options[key].type === 'color';
      });

      if (colorField && this.colorInputValue === '') {
        isValid = false;
        this.$set(this.validationErrors, 'color', this.fields_error);
      }

      if (this.fields.value.length > 0) {
        var previousRow = this.fields.value[this.fields.value.length - 1];
        maxRange = previousRow.range[0] - 1;

        if (this.newRow.range === undefined || this.newRow.range >= previousRow.range[0]) {
          isValid = false;
          this.$set(this.validationErrors, 'range', this.fields_range_error);
        }
      }

      if (this.newRow.range <= 0) {
        isValid = false;
        this.$set(this.validationErrors, 'range', this.fields_error);
      }

      if (isValid) {
        var newRow = _objectSpread(_objectSpread({}, this.newRow), {}, {
          range: [this.newRow.range, maxRange]
        });

        this.fields.value.push(newRow);
        this.newRow = this.initializeNewRow();
        this.resetColorFields();
      }
    },
    clearValidationError: function clearValidationError(key) {
      this.$delete(this.validationErrors, key);
    },
    handleColorInput: function handleColorInput(key) {
      if (this.colorInputValue === '') {
        this.resetColorFields();
        this.$set(this.validationErrors, key, this.fields_error);
      } else {
        this.clearValidationError(key);
      }
    },
    handleRangeInput: function handleRangeInput(key) {
      var value = Math.floor(this.newRow[key]);

      if (value <= 0) {
        this.newRow[key] = 1;
      } else {
        this.newRow[key] = value;
      }

      this.clearValidationError(key);
    },
    resetColorFields: function resetColorFields() {
      this.colorInputValue = '';
      this.colorValue = {
        r: '',
        g: '',
        b: '',
        a: ''
      };
    },
    confirmDelete: function confirmDelete() {
      this.showConfirmDelete = true;
    },
    closeDeleteConfirm: function closeDeleteConfirm() {
      this.showConfirmDelete = false;
    },
    deleteLastRow: function deleteLastRow() {
      if (this.fields.value.length > 0) {
        this.fields.value.pop();
      }

      this.showConfirmDelete = false;
    }
  },
  watch: {
    colorValue: function colorValue(value) {
      if (typeof value.rgba !== 'undefined') {
        var rgba_color = "rgba(".concat(value.rgba.r, ",").concat(value.rgba.g, ",").concat(value.rgba.b, ",").concat(value.rgba.a, ")");
        this.colorInputValue = rgba_color;
        this.newRow.color = rgba_color;
      }
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJvd25LZXlzIiwib2JqZWN0IiwiZW51bWVyYWJsZU9ubHkiLCJrZXlzIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwic3ltYm9scyIsImZpbHRlciIsInN5bSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImVudW1lcmFibGUiLCJwdXNoIiwiYXBwbHkiLCJfb2JqZWN0U3ByZWFkIiwidGFyZ2V0IiwiaSIsImFyZ3VtZW50cyIsImxlbmd0aCIsInNvdXJjZSIsImZvckVhY2giLCJrZXkiLCJfZGVmaW5lUHJvcGVydHkiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwiZGVmaW5lUHJvcGVydGllcyIsImRlZmluZVByb3BlcnR5Iiwib2JqIiwidmFsdWUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsIlZ1ZSIsImNvbXBvbmVudCIsInByb3BzIiwiY29tcG9uZW50cyIsIlZ1ZUNvbG9yIiwiQ2hyb21lIiwiZGF0YSIsIm5ld1JvdyIsImluaXRpYWxpemVOZXdSb3ciLCJjb2xvclZhbHVlIiwiciIsImciLCJiIiwiYSIsImNvbG9ySW5wdXRWYWx1ZSIsInNob3dDb25maXJtRGVsZXRlIiwidmFsaWRhdGlvbkVycm9ycyIsImNyZWF0ZWQiLCJjb2xvciIsImNvbG9ycyIsInJlcGxhY2UiLCJzbGljZSIsInNwbGl0IiwicGFyc2VJbnQiLCJwYXJzZUZsb2F0IiwidGVtcGxhdGUiLCJtZXRob2RzIiwidXBkYXRlQ29sb3IiLCJuZXdDb2xvciIsInJvdyIsImZpZWxkcyIsIm9wdGlvbnMiLCJmb2N1c05leHRJbnB1dCIsIiRuZXh0VGljayIsInNwYW5FbGVtZW50IiwiZXZlbnQiLCJpbnB1dEVsZW1lbnQiLCJuZXh0RWxlbWVudFNpYmxpbmciLCJ0YWdOYW1lIiwiZm9jdXMiLCJhZGRSb3ciLCJfdGhpcyIsImlzVmFsaWQiLCJtYXhSYW5nZSIsIiRzZXQiLCJmaWVsZHNfZXJyb3IiLCJjb2xvckZpZWxkIiwiZmluZCIsInR5cGUiLCJwcmV2aW91c1JvdyIsInJhbmdlIiwidW5kZWZpbmVkIiwiZmllbGRzX3JhbmdlX2Vycm9yIiwicmVzZXRDb2xvckZpZWxkcyIsImNsZWFyVmFsaWRhdGlvbkVycm9yIiwiJGRlbGV0ZSIsImhhbmRsZUNvbG9ySW5wdXQiLCJoYW5kbGVSYW5nZUlucHV0IiwiTWF0aCIsImZsb29yIiwiY29uZmlybURlbGV0ZSIsImNsb3NlRGVsZXRlQ29uZmlybSIsImRlbGV0ZUxhc3RSb3ciLCJwb3AiLCJ3YXRjaCIsInJnYmEiLCJyZ2JhX2NvbG9yIiwiY29uY2F0Il0sInNvdXJjZXMiOlsiZmFrZV85Yjc2ZWM2Zi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gb3duS2V5cyhvYmplY3QsIGVudW1lcmFibGVPbmx5KSB7IHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCk7IGVudW1lcmFibGVPbmx5ICYmIChzeW1ib2xzID0gc3ltYm9scy5maWx0ZXIoZnVuY3Rpb24gKHN5bSkgeyByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHN5bSkuZW51bWVyYWJsZTsgfSkpLCBrZXlzLnB1c2guYXBwbHkoa2V5cywgc3ltYm9scyk7IH0gcmV0dXJuIGtleXM7IH1cblxuZnVuY3Rpb24gX29iamVjdFNwcmVhZCh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IG51bGwgIT0gYXJndW1lbnRzW2ldID8gYXJndW1lbnRzW2ldIDoge307IGkgJSAyID8gb3duS2V5cyhPYmplY3Qoc291cmNlKSwgITApLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBfZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTsgfSkgOiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoc291cmNlKSkgOiBvd25LZXlzKE9iamVjdChzb3VyY2UpKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KSk7IH0pOyB9IHJldHVybiB0YXJnZXQ7IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cblxuVnVlLmNvbXBvbmVudCgnd3BjZnRvX3JlcGVhdGVyX3RhYmxlJywge1xuICBwcm9wczogWydmaWVsZHMnLCAncG9wdXBfdGV4dCcsICdwb3B1cF9jb25maXJtX2J1dHRvbicsICdwb3B1cF9jYW5jZWxfYnV0dG9uJywgJ2ZpZWxkc19lcnJvcicsICdmaWVsZHNfcmFuZ2VfZXJyb3InXSxcbiAgY29tcG9uZW50czoge1xuICAgICdzbGlkZXItcGlja2VyJzogVnVlQ29sb3IuQ2hyb21lXG4gIH0sXG4gIGRhdGE6IGZ1bmN0aW9uIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5ld1JvdzogdGhpcy5pbml0aWFsaXplTmV3Um93KCksXG4gICAgICBjb2xvclZhbHVlOiB7XG4gICAgICAgIHI6IDI1NSxcbiAgICAgICAgZzogMjU1LFxuICAgICAgICBiOiAyNTUsXG4gICAgICAgIGE6IDFcbiAgICAgIH0sXG4gICAgICBjb2xvcklucHV0VmFsdWU6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDEpJyxcbiAgICAgIHNob3dDb25maXJtRGVsZXRlOiBmYWxzZSxcbiAgICAgIHZhbGlkYXRpb25FcnJvcnM6IHt9XG4gICAgfTtcbiAgfSxcbiAgY3JlYXRlZDogZnVuY3Rpb24gY3JlYXRlZCgpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMubmV3Um93LmNvbG9yID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5jb2xvcklucHV0VmFsdWUgPSB0aGlzLm5ld1Jvdy5jb2xvcjtcbiAgICAgIHZhciBjb2xvcnMgPSB0aGlzLm5ld1Jvdy5jb2xvci5yZXBsYWNlKCdyZ2JhKCcsICcnKS5zbGljZSgwLCAtMSkuc3BsaXQoJywnKTtcbiAgICAgIHRoaXMuY29sb3JWYWx1ZS5yID0gcGFyc2VJbnQoY29sb3JzWzBdKTtcbiAgICAgIHRoaXMuY29sb3JWYWx1ZS5nID0gcGFyc2VJbnQoY29sb3JzWzFdKTtcbiAgICAgIHRoaXMuY29sb3JWYWx1ZS5iID0gcGFyc2VJbnQoY29sb3JzWzJdKTtcbiAgICAgIHRoaXMuY29sb3JWYWx1ZS5hID0gcGFyc2VGbG9hdChjb2xvcnNbM10pO1xuICAgIH1cbiAgfSxcbiAgdGVtcGxhdGU6IFwiXFxuXFx0XFx0PGRpdiBjbGFzcz1cXFwid3BjZnRvX2dlbmVyaWNfZmllbGRcXFwiIHYtaWY9XFxcImZpZWxkcy5vcHRpb25zICYmIE9iamVjdC5rZXlzKGZpZWxkcy5vcHRpb25zKS5sZW5ndGhcXFwiPlxcblxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcIndwY2Z0b19yZXBlYXRlcl90YWJsZVxcXCI+XFxuXFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwid3BjZnRvX3JlcGVhdGVyX3RhYmxlX190aXRsZVxcXCI+e3sgZmllbGRzLmxhYmVsIH19PC9kaXY+XFxuXFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwid3BjZnRvX3JlcGVhdGVyX3RhYmxlX193cmFwcGVyXFxcIj5cXG5cXHRcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9fcmVwZWF0ZXJfdGFibGVfX2hlYWRlclxcXCI+XFxuXFx0XFx0XFx0XFx0XFx0XFx0PGRpdiB2LWZvcj1cXFwiKGNvbHVtbiwga2V5KSBpbiBmaWVsZHMub3B0aW9uc1xcXCIgXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0di1pZj1cXFwia2V5ICE9PSAnY29sb3InXFxcIiBcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQ6a2V5PVxcXCJrZXlcXFwiXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0OnN0eWxlPVxcXCJ7IHdpZHRoOiBjb2x1bW4ud2lkdGggfVxcXCJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQ6Y2xhc3M9XFxcIid3cGNmdG9fcmVwZWF0ZXJfdGFibGVfX2NvbHVtbiB3cGNmdG9fcmVwZWF0ZXJfdGFibGVfX2NvbHVtbl8nICsgY29sdW1uLnR5cGVcXFwiXFxuXFx0XFx0XFx0XFx0XFx0XFx0PlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdHt7IGNvbHVtbi50aXRsZSB9fVxcblxcdFxcdFxcdFxcdFxcdFxcdDwvZGl2PlxcblxcdFxcdFxcdFxcdFxcdDwvZGl2PlxcblxcdFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcIndwY2Z0b19yZXBlYXRlcl90YWJsZV9fYm9keVxcXCI+XFxuXFx0XFx0XFx0XFx0XFx0XFx0PGRpdiB2LWZvcj1cXFwiKHJvdywgcm93SW5kZXgpIGluIGZpZWxkcy52YWx1ZVxcXCIgOmtleT1cXFwicm93SW5kZXhcXFwiIGNsYXNzPVxcXCJ3cGNmdG9fcmVwZWF0ZXJfdGFibGVfX3Jvd1xcXCI+XFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0PGRpdiB2LWZvcj1cXFwiKGNvbHVtbiwga2V5KSBpbiBmaWVsZHMub3B0aW9uc1xcXCIgXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0di1pZj1cXFwia2V5ICE9PSAnY29sb3InXFxcIlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdFxcdDprZXk9XFxcImtleVxcXCJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHQ6c3R5bGU9XFxcInsgd2lkdGg6IGNvbHVtbi53aWR0aCB9XFxcIlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdFxcdDpjbGFzcz1cXFwiJ3dwY2Z0b19yZXBlYXRlcl90YWJsZV9faXRlbSB3cGNmdG9fcmVwZWF0ZXJfdGFibGVfX2l0ZW1fJyArIGNvbHVtbi50eXBlXFxcIlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdD5cXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHQ8c3BhbiB2LWlmPVxcXCJrZXkgPT09ICdiYWRnZSdcXFwiIGNsYXNzPVxcXCJ3cGNmdG9fcmVwZWF0ZXJfdGFibGVfX2l0ZW0tYmFkZ2VcXFwiIDpzdHlsZT1cXFwieyBiYWNrZ3JvdW5kOiByb3cuY29sb3IgfVxcXCI+XFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0e3sgcm93W2tleV0gfX1cXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHQ8L3NwYW4+XFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0PHNwYW4gdi1lbHNlLWlmPVxcXCJBcnJheS5pc0FycmF5KHJvd1trZXldKVxcXCIgY2xhc3M9XFxcIndwY2Z0b19yZXBlYXRlcl90YWJsZV9faXRlbS12YWx1ZVxcXCI+XFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0e3sgcm93W2tleV0ubWFwKHZhbCA9PiB2YWwgKyAnJScpLmpvaW4oJyAtICcpIH19XFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0PC9zcGFuPlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdFxcdDxzcGFuIHYtZWxzZSBjbGFzcz1cXFwid3BjZnRvX3JlcGVhdGVyX3RhYmxlX19pdGVtLXZhbHVlXFxcIj5cXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHR7eyByb3dba2V5XSB8fCAnJyB9fVxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdFxcdDwvc3Bhbj5cXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQ8L2Rpdj5cXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQ8c3BhbiB2LWlmPVxcXCJyb3dJbmRleCA9PT0gZmllbGRzLnZhbHVlLmxlbmd0aCAtIDFcXFwiIEBjbGljaz1cXFwiY29uZmlybURlbGV0ZVxcXCIgY2xhc3M9XFxcIndwY2Z0b19yZXBlYXRlcl90YWJsZV9fcm93LWRlbGV0ZVxcXCI+XFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0PGkgY2xhc3M9XFxcImZhIGZhLXRyYXNoXFxcIj48L2k+XFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0PC9zcGFuPlxcblxcdFxcdFxcdFxcdFxcdFxcdDwvZGl2PlxcblxcdFxcdFxcdFxcdFxcdDwvZGl2PlxcblxcdFxcdFxcdFxcdDwvZGl2PlxcblxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcIndwY2Z0b19yZXBlYXRlcl90YWJsZV9fYWRkLXJvd1xcXCI+XFxuXFx0XFx0XFx0XFx0XFx0PGRpdiB2LWZvcj1cXFwiKGNvbHVtbiwga2V5KSBpbiBmaWVsZHMub3B0aW9uc1xcXCIgOmtleT1cXFwia2V5XFxcIiBjbGFzcz1cXFwid3BjZnRvX3JlcGVhdGVyX3RhYmxlX19pbnB1dC13cmFwcGVyXFxcIj5cXG5cXHRcXHRcXHRcXHRcXHRcXHQ8c3BhbiBjbGFzcz1cXFwid3BjZnRvX3JlcGVhdGVyX3RhYmxlX19pbnB1dC10aXRsZVxcXCI+XFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0e3sgY29sdW1uLnRpdGxlIH19e3sgY29sdW1uLnR5cGUgPT09ICdyYW5nZScgPyAnIG1pbiwgJScgOiAnJyB9fVxcblxcdFxcdFxcdFxcdFxcdFxcdDwvc3Bhbj5cXG5cXHRcXHRcXHRcXHRcXHRcXHQ8aW5wdXQgdi1pZj1cXFwiY29sdW1uLnR5cGUgPT09ICd0ZXh0JyB8fCBjb2x1bW4udHlwZSA9PT0gJ2JhZGdlJ1xcXCJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHR0eXBlPVxcXCJ0ZXh0XFxcIlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdHYtbW9kZWw9XFxcIm5ld1Jvd1trZXldXFxcIlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdGNsYXNzPVxcXCJ3cGNmdG9fcmVwZWF0ZXJfdGFibGVfX2lucHV0XFxcIlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdDpjbGFzcz1cXFwieyd3cGNmdG9fcmVwZWF0ZXJfdGFibGVfX2lucHV0X2Vycm9yJzogdmFsaWRhdGlvbkVycm9yc1trZXldfVxcXCJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRAaW5wdXQ9XFxcImNsZWFyVmFsaWRhdGlvbkVycm9yKGtleSlcXFwiXFxuXFx0XFx0XFx0XFx0XFx0XFx0Lz5cXG5cXHRcXHRcXHRcXHRcXHRcXHQ8aW5wdXQgdi1lbHNlLWlmPVxcXCJjb2x1bW4udHlwZSA9PT0gJ251bWJlcidcXFwiXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0dHlwZT1cXFwibnVtYmVyXFxcIlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdG1pbj1cXFwiMFxcXCJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHR2LW1vZGVsPVxcXCJuZXdSb3dba2V5XVxcXCJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRjbGFzcz1cXFwid3BjZnRvX3JlcGVhdGVyX3RhYmxlX19pbnB1dFxcXCJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQ6Y2xhc3M9XFxcInsnd3BjZnRvX3JlcGVhdGVyX3RhYmxlX19pbnB1dF9lcnJvcic6IHZhbGlkYXRpb25FcnJvcnNba2V5XX1cXFwiXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0QGlucHV0PVxcXCJjbGVhclZhbGlkYXRpb25FcnJvcihrZXkpXFxcIlxcblxcdFxcdFxcdFxcdFxcdFxcdC8+XFxuXFx0XFx0XFx0XFx0XFx0XFx0PGlucHV0IHYtZWxzZS1pZj1cXFwiY29sdW1uLnR5cGUgPT09ICdyYW5nZSdcXFwiXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0dHlwZT1cXFwibnVtYmVyXFxcIlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdG1pbj1cXFwiMFxcXCJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHR2LW1vZGVsPVxcXCJuZXdSb3dba2V5XVxcXCJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRjbGFzcz1cXFwid3BjZnRvX3JlcGVhdGVyX3RhYmxlX19pbnB1dFxcXCJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQ6Y2xhc3M9XFxcInsnd3BjZnRvX3JlcGVhdGVyX3RhYmxlX19pbnB1dF9lcnJvcic6IHZhbGlkYXRpb25FcnJvcnNba2V5XX1cXFwiXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0QGlucHV0PVxcXCJoYW5kbGVSYW5nZUlucHV0KGtleSlcXFwiXFxuXFx0XFx0XFx0XFx0XFx0XFx0Lz5cXG5cXHRcXHRcXHRcXHRcXHRcXHQ8ZGl2IHYtZWxzZS1pZj1cXFwiY29sdW1uLnR5cGUgPT09ICdjb2xvcidcXFwiIGNsYXNzPVxcXCJzdG1fY29sb3JwaWNrZXJfd3JhcHBlclxcXCI+XFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0PHNwYW4gOnN0eWxlPVxcXCJ7J2JhY2tncm91bmQtY29sb3InOiBjb2xvcklucHV0VmFsdWV9XFxcIiBAY2xpY2s9XFxcImZvY3VzTmV4dElucHV0XFxcIj48L3NwYW4+XFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0PGlucHV0XFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0dHlwZT1cXFwidGV4dFxcXCJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHR2LW1vZGVsPVxcXCJjb2xvcklucHV0VmFsdWVcXFwiXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0Y2xhc3M9XFxcIndwY2Z0b19yZXBlYXRlcl90YWJsZV9faW5wdXRcXFwiXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0OmNsYXNzPVxcXCJ7J3dwY2Z0b19yZXBlYXRlcl90YWJsZV9faW5wdXRfZXJyb3InOiB2YWxpZGF0aW9uRXJyb3JzW2tleV0gJiYgY29sb3JJbnB1dFZhbHVlID09PSAnJ31cXFwiXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0QGlucHV0PVxcXCJoYW5kbGVDb2xvcklucHV0KGtleSlcXFwiXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0Lz5cXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQ8ZGl2PlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdFxcdDxzbGlkZXItcGlja2VyIHYtbW9kZWw9XFxcImNvbG9yVmFsdWVcXFwiPjwvc2xpZGVyLXBpY2tlcj5cXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQ8L2Rpdj5cXG5cXHRcXHRcXHRcXHRcXHRcXHQ8L2Rpdj5cXG5cXHRcXHRcXHRcXHRcXHRcXHQ8ZGl2IHYtaWY9XFxcInZhbGlkYXRpb25FcnJvcnNba2V5XSAmJiAoa2V5ICE9PSAnY29sb3InIHx8IGNvbG9ySW5wdXRWYWx1ZSA9PT0gJycpXFxcIiBjbGFzcz1cXFwid3BjZnRvX3JlcGVhdGVyX3RhYmxlX19lcnJvci1tZXNzYWdlXFxcIj5cXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHR7eyB2YWxpZGF0aW9uRXJyb3JzW2tleV0gfX1cXG5cXHRcXHRcXHRcXHRcXHRcXHQ8L2Rpdj5cXG5cXHRcXHRcXHRcXHRcXHQ8L2Rpdj5cXG5cXHRcXHRcXHRcXHRcXHQ8c3BhbiBjbGFzcz1cXFwid3BjZnRvX3JlcGVhdGVyX3RhYmxlX19hZGQtYnV0dG9uXFxcIiBAY2xpY2s9XFxcImFkZFJvd1xcXCI+QWRkPC9zcGFuPlxcblxcdFxcdFxcdFxcdDwvZGl2PlxcblxcdFxcdFxcdFxcdDxkaXYgOmNsYXNzPVxcXCJ7J3dwY2Z0b19yZXBlYXRlcl90YWJsZV9fcG9wdXAnOiB0cnVlLCAnd3BjZnRvX3JlcGVhdGVyX3RhYmxlX19wb3B1cF9zaG93Jzogc2hvd0NvbmZpcm1EZWxldGV9XFxcIj5cXG5cXHRcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJ3cGNmdG9fcmVwZWF0ZXJfdGFibGVfX3BvcHVwLWNvbnRlbnRcXFwiPlxcblxcdFxcdFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcIndwY2Z0b19yZXBlYXRlcl90YWJsZV9fcG9wdXAtdGV4dFxcXCI+e3sgcG9wdXBfdGV4dCB9fTwvZGl2PlxcblxcdFxcdFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcIndwY2Z0b19yZXBlYXRlcl90YWJsZV9fcG9wdXAtYWN0aW9uc1xcXCI+XFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0PHNwYW4gQGNsaWNrPVxcXCJjbG9zZURlbGV0ZUNvbmZpcm1cXFwiIGNsYXNzPVxcXCJ3cGNmdG9fcmVwZWF0ZXJfdGFibGVfX3BvcHVwLWNhbmNlbFxcXCI+e3sgcG9wdXBfY2FuY2VsX2J1dHRvbiB9fTwvc3Bhbj5cXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQ8c3BhbiBAY2xpY2s9XFxcImRlbGV0ZUxhc3RSb3dcXFwiIGNsYXNzPVxcXCJ3cGNmdG9fcmVwZWF0ZXJfdGFibGVfX3BvcHVwLWNvbmZpcm1cXFwiPnt7IHBvcHVwX2NvbmZpcm1fYnV0dG9uIH19PC9zcGFuPlxcblxcdFxcdFxcdFxcdFxcdFxcdDwvZGl2PlxcblxcdFxcdFxcdFxcdFxcdDwvZGl2PlxcblxcdFxcdFxcdFxcdDwvZGl2PlxcblxcdFxcdFxcdDwvZGl2PlxcblxcdFxcdDwvZGl2PlxcblxcdFwiLFxuICBtZXRob2RzOiB7XG4gICAgdXBkYXRlQ29sb3I6IGZ1bmN0aW9uIHVwZGF0ZUNvbG9yKG5ld0NvbG9yKSB7XG4gICAgICB0aGlzLm5ld1Jvdy5jb2xvciA9IG5ld0NvbG9yO1xuICAgIH0sXG4gICAgaW5pdGlhbGl6ZU5ld1JvdzogZnVuY3Rpb24gaW5pdGlhbGl6ZU5ld1JvdygpIHtcbiAgICAgIHZhciByb3cgPSB7fTtcblxuICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMuZmllbGRzLm9wdGlvbnMpIHtcbiAgICAgICAgcm93W2tleV0gPSAnJztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJvdztcbiAgICB9LFxuICAgIGZvY3VzTmV4dElucHV0OiBmdW5jdGlvbiBmb2N1c05leHRJbnB1dCgpIHtcbiAgICAgIHRoaXMuJG5leHRUaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNwYW5FbGVtZW50ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICB2YXIgaW5wdXRFbGVtZW50ID0gc3BhbkVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nO1xuXG4gICAgICAgIGlmIChpbnB1dEVsZW1lbnQgJiYgaW5wdXRFbGVtZW50LnRhZ05hbWUgPT09ICdJTlBVVCcpIHtcbiAgICAgICAgICBpbnB1dEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSxcbiAgICBhZGRSb3c6IGZ1bmN0aW9uIGFkZFJvdygpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHZhciBpc1ZhbGlkID0gdHJ1ZTtcbiAgICAgIHZhciBtYXhSYW5nZSA9IDEwMDtcbiAgICAgIHRoaXMudmFsaWRhdGlvbkVycm9ycyA9IHt9O1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5maWVsZHMub3B0aW9ucykge1xuICAgICAgICBpZiAodGhpcy5uZXdSb3dba2V5XSA9PT0gbnVsbCB8fCB0aGlzLm5ld1Jvd1trZXldID09PSAnJykge1xuICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLiRzZXQodGhpcy52YWxpZGF0aW9uRXJyb3JzLCBrZXksIHRoaXMuZmllbGRzX2Vycm9yKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgY29sb3JGaWVsZCA9IE9iamVjdC5rZXlzKHRoaXMuZmllbGRzLm9wdGlvbnMpLmZpbmQoZnVuY3Rpb24gKGtleSkge1xuICAgICAgICByZXR1cm4gX3RoaXMuZmllbGRzLm9wdGlvbnNba2V5XS50eXBlID09PSAnY29sb3InO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChjb2xvckZpZWxkICYmIHRoaXMuY29sb3JJbnB1dFZhbHVlID09PSAnJykge1xuICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuJHNldCh0aGlzLnZhbGlkYXRpb25FcnJvcnMsICdjb2xvcicsIHRoaXMuZmllbGRzX2Vycm9yKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZmllbGRzLnZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIHByZXZpb3VzUm93ID0gdGhpcy5maWVsZHMudmFsdWVbdGhpcy5maWVsZHMudmFsdWUubGVuZ3RoIC0gMV07XG4gICAgICAgIG1heFJhbmdlID0gcHJldmlvdXNSb3cucmFuZ2VbMF0gLSAxO1xuXG4gICAgICAgIGlmICh0aGlzLm5ld1Jvdy5yYW5nZSA9PT0gdW5kZWZpbmVkIHx8IHRoaXMubmV3Um93LnJhbmdlID49IHByZXZpb3VzUm93LnJhbmdlWzBdKSB7XG4gICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuJHNldCh0aGlzLnZhbGlkYXRpb25FcnJvcnMsICdyYW5nZScsIHRoaXMuZmllbGRzX3JhbmdlX2Vycm9yKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5uZXdSb3cucmFuZ2UgPD0gMCkge1xuICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuJHNldCh0aGlzLnZhbGlkYXRpb25FcnJvcnMsICdyYW5nZScsIHRoaXMuZmllbGRzX2Vycm9yKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzVmFsaWQpIHtcbiAgICAgICAgdmFyIG5ld1JvdyA9IF9vYmplY3RTcHJlYWQoX29iamVjdFNwcmVhZCh7fSwgdGhpcy5uZXdSb3cpLCB7fSwge1xuICAgICAgICAgIHJhbmdlOiBbdGhpcy5uZXdSb3cucmFuZ2UsIG1heFJhbmdlXVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmZpZWxkcy52YWx1ZS5wdXNoKG5ld1Jvdyk7XG4gICAgICAgIHRoaXMubmV3Um93ID0gdGhpcy5pbml0aWFsaXplTmV3Um93KCk7XG4gICAgICAgIHRoaXMucmVzZXRDb2xvckZpZWxkcygpO1xuICAgICAgfVxuICAgIH0sXG4gICAgY2xlYXJWYWxpZGF0aW9uRXJyb3I6IGZ1bmN0aW9uIGNsZWFyVmFsaWRhdGlvbkVycm9yKGtleSkge1xuICAgICAgdGhpcy4kZGVsZXRlKHRoaXMudmFsaWRhdGlvbkVycm9ycywga2V5KTtcbiAgICB9LFxuICAgIGhhbmRsZUNvbG9ySW5wdXQ6IGZ1bmN0aW9uIGhhbmRsZUNvbG9ySW5wdXQoa2V5KSB7XG4gICAgICBpZiAodGhpcy5jb2xvcklucHV0VmFsdWUgPT09ICcnKSB7XG4gICAgICAgIHRoaXMucmVzZXRDb2xvckZpZWxkcygpO1xuICAgICAgICB0aGlzLiRzZXQodGhpcy52YWxpZGF0aW9uRXJyb3JzLCBrZXksIHRoaXMuZmllbGRzX2Vycm9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2xlYXJWYWxpZGF0aW9uRXJyb3Ioa2V5KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGhhbmRsZVJhbmdlSW5wdXQ6IGZ1bmN0aW9uIGhhbmRsZVJhbmdlSW5wdXQoa2V5KSB7XG4gICAgICB2YXIgdmFsdWUgPSBNYXRoLmZsb29yKHRoaXMubmV3Um93W2tleV0pO1xuXG4gICAgICBpZiAodmFsdWUgPD0gMCkge1xuICAgICAgICB0aGlzLm5ld1Jvd1trZXldID0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubmV3Um93W2tleV0gPSB2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jbGVhclZhbGlkYXRpb25FcnJvcihrZXkpO1xuICAgIH0sXG4gICAgcmVzZXRDb2xvckZpZWxkczogZnVuY3Rpb24gcmVzZXRDb2xvckZpZWxkcygpIHtcbiAgICAgIHRoaXMuY29sb3JJbnB1dFZhbHVlID0gJyc7XG4gICAgICB0aGlzLmNvbG9yVmFsdWUgPSB7XG4gICAgICAgIHI6ICcnLFxuICAgICAgICBnOiAnJyxcbiAgICAgICAgYjogJycsXG4gICAgICAgIGE6ICcnXG4gICAgICB9O1xuICAgIH0sXG4gICAgY29uZmlybURlbGV0ZTogZnVuY3Rpb24gY29uZmlybURlbGV0ZSgpIHtcbiAgICAgIHRoaXMuc2hvd0NvbmZpcm1EZWxldGUgPSB0cnVlO1xuICAgIH0sXG4gICAgY2xvc2VEZWxldGVDb25maXJtOiBmdW5jdGlvbiBjbG9zZURlbGV0ZUNvbmZpcm0oKSB7XG4gICAgICB0aGlzLnNob3dDb25maXJtRGVsZXRlID0gZmFsc2U7XG4gICAgfSxcbiAgICBkZWxldGVMYXN0Um93OiBmdW5jdGlvbiBkZWxldGVMYXN0Um93KCkge1xuICAgICAgaWYgKHRoaXMuZmllbGRzLnZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5maWVsZHMudmFsdWUucG9wKCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2hvd0NvbmZpcm1EZWxldGUgPSBmYWxzZTtcbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgY29sb3JWYWx1ZTogZnVuY3Rpb24gY29sb3JWYWx1ZSh2YWx1ZSkge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZS5yZ2JhICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgcmdiYV9jb2xvciA9IFwicmdiYShcIi5jb25jYXQodmFsdWUucmdiYS5yLCBcIixcIikuY29uY2F0KHZhbHVlLnJnYmEuZywgXCIsXCIpLmNvbmNhdCh2YWx1ZS5yZ2JhLmIsIFwiLFwiKS5jb25jYXQodmFsdWUucmdiYS5hLCBcIilcIik7XG4gICAgICAgIHRoaXMuY29sb3JJbnB1dFZhbHVlID0gcmdiYV9jb2xvcjtcbiAgICAgICAgdGhpcy5uZXdSb3cuY29sb3IgPSByZ2JhX2NvbG9yO1xuICAgICAgfVxuICAgIH1cbiAgfVxufSk7Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQSxTQUFTQSxPQUFULENBQWlCQyxNQUFqQixFQUF5QkMsY0FBekIsRUFBeUM7RUFBRSxJQUFJQyxJQUFJLEdBQUdDLE1BQU0sQ0FBQ0QsSUFBUCxDQUFZRixNQUFaLENBQVg7O0VBQWdDLElBQUlHLE1BQU0sQ0FBQ0MscUJBQVgsRUFBa0M7SUFBRSxJQUFJQyxPQUFPLEdBQUdGLE1BQU0sQ0FBQ0MscUJBQVAsQ0FBNkJKLE1BQTdCLENBQWQ7SUFBb0RDLGNBQWMsS0FBS0ksT0FBTyxHQUFHQSxPQUFPLENBQUNDLE1BQVIsQ0FBZSxVQUFVQyxHQUFWLEVBQWU7TUFBRSxPQUFPSixNQUFNLENBQUNLLHdCQUFQLENBQWdDUixNQUFoQyxFQUF3Q08sR0FBeEMsRUFBNkNFLFVBQXBEO0lBQWlFLENBQWpHLENBQWYsQ0FBZCxF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
},{}]},{},[1])
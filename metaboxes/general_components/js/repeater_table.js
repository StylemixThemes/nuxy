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
},{}]},{},[1])
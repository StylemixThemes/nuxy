(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Vue.component('wpcfto_repeater_table', {
  props: ['fields'],
  template: "\n\t\t<div class=\"wpcfto_generic_field\">\n\t\t\t<div class=\"wpcfto_repeater_table\">\n\t\t\t\t<div class=\"wpcfto_repeater_table__title\">{{ fields.label }}</div>\n\t\t\t\t<div class=\"wpcfto_repeater_table__wrapper\">\n\t\t\t\t\t<div class=\"wpcfto_repeater_table__header\">\n\t\t\t\t\t\t<div v-for=\"(column, key) in fields.options\" \n\t\t\t\t\t\t\tv-if=\"key !== 'color'\" \n\t\t\t\t\t\t\t:key=\"key\"\n\t\t\t\t\t\t\t:style=\"{ width: column.width }\"\n\t\t\t\t\t\t\t:class=\"'wpcfto_repeater_table__column wpcfto_repeater_table__column_' + column.type\"\n\t\t\t\t\t\t>\n\t\t\t\t\t\t\t{{ column.title }}\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"wpcfto_repeater_table__body\">\n\t\t\t\t\t\t<div v-for=\"(row, rowIndex) in fields.value\" :key=\"rowIndex\" class=\"wpcfto_repeater_table__row\">\n\t\t\t\t\t\t\t<div v-for=\"(column, key) in fields.options\" \n\t\t\t\t\t\t\t\tv-if=\"key !== 'color'\"\n\t\t\t\t\t\t\t\t:key=\"key\"\n\t\t\t\t\t\t\t\t:style=\"{ width: column.width }\"\n\t\t\t\t\t\t\t\t:class=\"'wpcfto_repeater_table__item wpcfto_repeater_table__item_' + column.type\"\n\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t<span v-if=\"key === 'badge'\" class=\"wpcfto_repeater_table__item-badge\" :style=\"{ background: row.color }\">\n\t\t\t\t\t\t\t\t\t{{ row[key] }}\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t<span v-else-if=\"Array.isArray(row[key])\" class=\"wpcfto_repeater_table__item-value\">\n\t\t\t\t\t\t\t\t\t{{ row[key].map(val => val + '%').join(' - ') }}\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t<span v-else class=\"wpcfto_repeater_table__item-value\">\n\t\t\t\t\t\t\t\t\t{{ row[key] || '' }}\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t",
  mounted: function mounted() {}
});
},{}]},{},[1])
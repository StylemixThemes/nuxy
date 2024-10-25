Vue.component('wpcfto_repeater_table', {
	props: [
		'fields',
		'popup_text',
		'popup_confirm_button',
		'popup_cancel_button',
		'fields_error',
		'fields_range_error',
	],
	components: {
		'slider-picker': VueColor.Chrome
	},
	data() {
		return {
			newRow: this.initializeNewRow(),
			colorValue: {
				r: 255,
				g: 255,
				b: 255,
				a: 1,
			},
			colorInputValue: 'rgba(255, 255, 255, 1)',
			showConfirmDelete: false,
			validationErrors: {},
		};
	},
	created: function () {
		if (typeof this.newRow.color === 'string') {
			this.colorInputValue = this.newRow.color;
			let colors = this.newRow.color.replace('rgba(', '').slice(0, -1).split(',');
			this.colorValue.r = parseInt(colors[0]);
			this.colorValue.g = parseInt(colors[1]);
			this.colorValue.b = parseInt(colors[2]);
			this.colorValue.a = parseFloat(colors[3]);
		}
	},
	template: `
		<div class="wpcfto_generic_field" v-if="fields.options && Object.keys(fields.options).length">
			<div class="wpcfto_repeater_table">
				<div class="wpcfto_repeater_table__title">{{ fields.label }}</div>
				<div class="wpcfto_repeater_table__wrapper">
					<div class="wpcfto_repeater_table__header">
						<div v-for="(column, key) in fields.options" 
							v-if="key !== 'color'" 
							:key="key"
							:style="{ width: column.width }"
							:class="'wpcfto_repeater_table__column wpcfto_repeater_table__column_' + column.type"
						>
							{{ column.title }}
						</div>
					</div>
					<div class="wpcfto_repeater_table__body">
						<div v-for="(row, rowIndex) in fields.value" :key="rowIndex" class="wpcfto_repeater_table__row">
							<div v-for="(column, key) in fields.options" 
								v-if="key !== 'color'"
								:key="key"
								:style="{ width: column.width }"
								:class="'wpcfto_repeater_table__item wpcfto_repeater_table__item_' + column.type"
							>
								<span v-if="key === 'badge'" class="wpcfto_repeater_table__item-badge" :style="{ background: row.color }">
									{{ row[key] }}
								</span>
								<span v-else-if="Array.isArray(row[key])" class="wpcfto_repeater_table__item-value">
									{{ row[key].map(val => val + '%').join(' - ') }}
								</span>
								<span v-else class="wpcfto_repeater_table__item-value">
									{{ row[key] || '' }}
								</span>
							</div>
							<span v-if="rowIndex === fields.value.length - 1" @click="confirmDelete" class="wpcfto_repeater_table__row-delete">
								<i class="fa fa-trash"></i>
							</span>
						</div>
					</div>
				</div>
				<div class="wpcfto_repeater_table__add-row">
					<div v-for="(column, key) in fields.options" :key="key" class="wpcfto_repeater_table__input-wrapper">
						<span class="wpcfto_repeater_table__input-title">
							{{ column.title }}{{ column.type === 'range' ? ' min, %' : '' }}
						</span>
						<input v-if="column.type === 'text' || column.type === 'badge'"
							type="text"
							v-model="newRow[key]"
							class="wpcfto_repeater_table__input"
							:class="{'wpcfto_repeater_table__input_error': validationErrors[key]}"
							@input="clearValidationError(key)"
						/>
						<input v-else-if="column.type === 'number'"
							type="number"
							min="0"
							v-model="newRow[key]"
							class="wpcfto_repeater_table__input"
							:class="{'wpcfto_repeater_table__input_error': validationErrors[key]}"
							@input="clearValidationError(key)"
						/>
						<input v-else-if="column.type === 'range'"
							type="number"
							min="0"
							v-model="newRow[key]"
							class="wpcfto_repeater_table__input"
							:class="{'wpcfto_repeater_table__input_error': validationErrors[key]}"
							@input="handleRangeInput(key)"
						/>
						<div v-else-if="column.type === 'color'" class="stm_colorpicker_wrapper">
							<span :style="{'background-color': colorInputValue}" @click="focusNextInput"></span>
							<input
								type="text"
								v-model="colorInputValue"
								class="wpcfto_repeater_table__input"
								:class="{'wpcfto_repeater_table__input_error': validationErrors[key] && colorInputValue === ''}"
								@input="handleColorInput(key)"
							/>
							<div>
								<slider-picker v-model="colorValue"></slider-picker>
							</div>
						</div>
						<div v-if="validationErrors[key] && (key !== 'color' || colorInputValue === '')" class="wpcfto_repeater_table__error-message">
							{{ validationErrors[key] }}
						</div>
					</div>
					<span class="wpcfto_repeater_table__add-button" @click="addRow">Add</span>
				</div>
				<div :class="{'wpcfto_repeater_table__popup': true, 'wpcfto_repeater_table__popup_show': showConfirmDelete}">
					<div class="wpcfto_repeater_table__popup-content">
						<div class="wpcfto_repeater_table__popup-text">{{ popup_text }}</div>
						<div class="wpcfto_repeater_table__popup-actions">
							<span @click="closeDeleteConfirm" class="wpcfto_repeater_table__popup-cancel">{{ popup_cancel_button }}</span>
							<span @click="deleteLastRow" class="wpcfto_repeater_table__popup-confirm">{{ popup_confirm_button }}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	`,
	methods: {
		updateColor(newColor) {
			this.newRow.color = newColor;
		},
		initializeNewRow() {
			let row = {};
			for (let key in this.fields.options) {
				row[key] = '';
			}
			return row;
		},
		focusNextInput() {
			this.$nextTick(() => {
				const spanElement = event.target;
				const inputElement = spanElement.nextElementSibling;

				if (inputElement && inputElement.tagName === 'INPUT') {
					inputElement.focus();
				}
			});
		},
		addRow() {
			let isValid = true;
			let maxRange = 100;

			this.validationErrors = {};

			for (let key in this.fields.options) {
				if (this.newRow[key] === null || this.newRow[key] === '') {
					isValid = false;
					this.$set(this.validationErrors, key, this.fields_error);
				}
			}

			const colorField = Object.keys(this.fields.options).find(key => this.fields.options[key].type === 'color');

			if (colorField && this.colorInputValue === '') {
				isValid = false;
				this.$set(this.validationErrors, 'color', this.fields_error);
			}

			if (this.fields.value.length > 0) {
				const previousRow = this.fields.value[this.fields.value.length - 1];
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
				const newRow = {
					...this.newRow,
					range: [this.newRow.range, maxRange],
				};
	
				this.fields.value.push(newRow);
				this.newRow = this.initializeNewRow();
				this.resetColorFields();
			}
		},
		clearValidationError(key) {
			this.$delete(this.validationErrors, key);
		},
		handleColorInput(key) {
			if (this.colorInputValue === '') {
				this.resetColorFields();
				this.$set(this.validationErrors, key, this.fields_error);
			} else {
				this.clearValidationError(key);
			}
		},
		handleRangeInput(key) {
			const value = Math.floor(this.newRow[key]);

			if (value <= 0) {
				this.newRow[key] = 1;
			} else {
				this.newRow[key] = value;
			}
	
			this.clearValidationError(key);
		},
		resetColorFields() {
			this.colorInputValue = '';
			this.colorValue = {
				r: '',
				g: '',
				b: '',
				a: '',
			};
		},
		confirmDelete() {
			this.showConfirmDelete = true;
		},
		closeDeleteConfirm() {
			this.showConfirmDelete = false;
		},
		deleteLastRow() {
			if (this.fields.value.length > 0) {
				this.fields.value.pop();
			}
			this.showConfirmDelete = false;
		}
	},
	watch: {
		colorValue: function (value) {
			if (typeof value.rgba !== 'undefined') {
				var rgba_color = `rgba(${value.rgba.r},${value.rgba.g},${value.rgba.b},${value.rgba.a})`;
				this.colorInputValue = rgba_color;
				this.newRow.color = rgba_color;
			}
		}
	}
})
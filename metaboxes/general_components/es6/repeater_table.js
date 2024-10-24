Vue.component('wpcfto_repeater_table', {
	props: [
		'fields',
	],
	components: {
		'slider-picker': VueColor.Chrome
	},
	data() {
		return {
			newRow: {
				badge: '',
				point: null,
				minRange: null,
				color: null,
			},
			colorValue: {
				r: 255,
				g: 255,
				b: 255,
				a: 1,
			},
			colorInputValue: 'rgba(255, 255, 255, 1)',
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
						</div>
					</div>
				</div>
				<div class="wpcfto_repeater_table__add-row">
					<div class="wpcfto_repeater_table__input">
						<input type="text" v-model="newRow.badge" />
					</div>
					<div class="wpcfto_repeater_table__input">
						<input type="number" min="0" v-model="newRow.point" />
					</div>
					<div class="wpcfto_repeater_table__input">
						<input type="number" min="0" v-model="newRow.minRange" />
					</div>
					<div class="wpcfto_repeater_table__input">
						<div class="stm_colorpicker_wrapper">
							<span v-bind:style="{'background-color': colorInputValue}" @click="$refs.color_input.focus()"></span>
							<input type="text" v-model="colorInputValue" ref="color_input" />
							<div>
								<slider-picker v-model="colorValue"></slider-picker>
							</div>
						</div>
					</div>
					<button @click="addRow">Add</button>
				</div>
			</div>
		</div>
	`,
	methods: {
		updateColor(newColor) {
			this.newRow.color = newColor;
		},
		addRow() {
			if (this.newRow.badge && this.newRow.point !== null && this.newRow.minRange !== null && this.newRow.color) {
				let maxRange = 100;

				if (this.fields.value.length > 0) {
					const previousRow = this.fields.value[this.fields.value.length - 1];
					maxRange = previousRow.range[0] - 1;

					if (this.newRow.minRange >= previousRow.range[0]) {
						return;
					}
				}

				if (this.newRow.minRange <= 0) {
					return;
				}

				this.fields.value.push({
					badge: this.newRow.badge,
					point: this.newRow.point,
					range: [this.newRow.minRange, maxRange],
					color: this.newRow.color,
				});

				this.newRow = {
					badge: '',
					point: null,
					minRange: null,
					color: '',
				};
			}
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
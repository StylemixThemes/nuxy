Vue.component('wpcfto_repeater_table', {
	props: [
		'fields',
	],
	template: `
		<div class="wpcfto_generic_field">
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
			</div>
		</div>
	`,
	mounted: function () {

	},
})
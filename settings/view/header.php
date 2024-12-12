<?php

/**
 * Header template.
 *
 * @var $metabox_id
 * @var $wpcfto_title
 * @var $wpcfto_sub_title
 * @var $wpcfto_logo
 * @var $wpcfto_settings_alert
 */

$only_logo = empty( $wpcfto_title ) && empty( $wpcfto_sub_title );

?>

<div v-cloak v-if="data !== ''" class="wpcfto_settings_head">

	<div class="wpcfto_settings_head__side">

		<div class="wpcfto_settings_head__logo <?php echo ( $only_logo ) ? esc_attr( 'wpcfto_settings_head__logo_only' ) : ''; ?>">
			<img src="<?php echo esc_url( $wpcfto_logo ); ?>" alt="Logo">
		</div>

		<div class="wpcfto_settings_head__label">
			<?php if ( ! empty( $wpcfto_title ) ) : ?>
				<div class="wpcfto_settings_head__title">
					<?php echo esc_attr( $wpcfto_title ); ?>
				</div>
			<?php endif; ?>

			<?php if ( ! empty( $wpcfto_sub_title ) ) : ?>
				<div class="wpcfto_settings_head__subtitle">
					<?php echo wp_kses_post( $wpcfto_sub_title ); ?>
				</div>
			<?php endif; ?>
		</div>

	</div>

	<div class="wpcfto_settings_head__content">

		<?php do_action( 'custom_content' ); ?>

		<div class="wpcfto_search_group">
			<input type="text" name="" value="" class="wpcfto-search-field"
					placeholder="<?php esc_html_e( 'Search', 'nuxy' ); ?>"/>
		</div>
		
		<div class="wpcfto_header_actions">
			<?php if ( ! empty( $wpcfto_link['url'] ) ) : ?>
				<a href="<?php echo esc_url( $wpcfto_link['url'] ); ?>" target="<?php echo ! empty( $wpcfto_link['target'] ) ? esc_attr( '_blank' ) : ''; ?>" class="wpcfto_header_actions_item wpcfto_settings_head__link wpcfto_settings_head__item_link">
					<i class="<?php echo esc_attr( $wpcfto_link['icon'] );?>"></i>
					<span><?php echo esc_html( $wpcfto_link['text'] ); ?></span>
				</a>
			<?php endif; ?>

			<?php if ( ! empty( $wpcfto_header_menu['menu']['text'] ) ) : ?>
				<div class="wpcfto_header_actions_menu wpcfto_header_actions_item wpcfto-menu-item">
					<a href="<?php echo ! empty($wpcfto_header_menu['menu']['url'] ) ? esc_url( $wpcfto_header_menu['menu']['url'] ) : '#'; ?>" class="wpcfto_settings_head__menu wpcfto_settings_head__item_link">
						<i class="<?php echo esc_attr( $wpcfto_header_menu['menu']['icon'] ); ?>"></i>
						<span><?php echo esc_html( $wpcfto_header_menu['menu']['text'] ); ?></span>
					</a>
					<ul сlass="wpcfto_header_actions_menu_submenu">
						<?php foreach ( $wpcfto_header_menu['menu']['header_submenu'] as $menu ) : ?>
							<li class="wpcfto_header_actions_menu_submenu_item">
								<a href="<?php echo esc_url( $menu['url'] ); ?>" target=<?php echo ! empty( $menu['target'] ) ? esc_attr( '_blank' ) : ''; ?>>
									<i class="<?php echo esc_attr( $menu['icon'] ); ?>"></i>
									<span><?php echo esc_html( $menu['text'] ); ?></span>
								</a>
							</li>
						<?php endforeach; ?>
					</ul>
				</div>
			<?php endif; ?>


			<a href="#"
			@click.prevent="saveSettings('<?php echo esc_attr( $metabox_id ); ?>')"
			v-bind:class="{'loading': loading}"
			class="button load_button">
				<span><?php esc_html_e( 'Save Settings', 'nuxy' ); ?></span>
				<i class="lnr lnr-sync"></i>
			</a>
		</div>

		<div class="wpcfto_settings_alert <?php echo esc_attr( $wpcfto_settings_alert['position'] ); ?>" :class="{ 'show': settings_alert.status, 'wpcfto_settings_alert_error': !settings_alert.success }">
			<div class="wpcfto_settings_alert__icon">
				<span v-if="settings_alert.success">
					<i class="fa fa-check"></i>
				</span>
				<span v-else>
					<i class="lnr lnricons-cross2"></i>
				</span>
			</div>
			<div class="wpcfto_settings_alert__text" v-if="settings_alert.success">
				<div class="wpcfto_settings_alert__title"><?php echo esc_html( $wpcfto_settings_alert['success_alert']['title'] ); ?></div>
				<div class="wpcfto_settings_alert__subtitle"><?php echo esc_html( $wpcfto_settings_alert['success_alert']['subtitle'] ); ?></div>
			</div>
			<div class="wpcfto_settings_alert__text" v-else>
				<div class="wpcfto_settings_alert__title"><?php echo esc_html( $wpcfto_settings_alert['error_alert']['title'] ); ?></div>
				<div class="wpcfto_settings_alert__subtitle"><?php echo esc_html( $wpcfto_settings_alert['error_alert']['subtitle'] ); ?></div>
			</div>
		</div>
	</div>

</div>

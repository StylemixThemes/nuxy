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

		<a href="#"
		   @click.prevent="saveSettings('<?php echo esc_attr( $metabox_id ); ?>')"
		   v-bind:class="{'loading': loading}"
		   class="button load_button">
			<span><?php esc_html_e( 'Save Settings', 'nuxy' ); ?></span>
			<i class="lnr lnr-sync"></i>
		</a>

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

<?php

/**
 * Header template.
 *
 * @var $metabox_id
 * @var $wpcfto_title
 * @var $wpcfto_sub_title
 * @var $wpcfto_logo
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
					<?php echo esc_attr( $wpcfto_sub_title ); ?>
				</div>
			<?php endif; ?>
		</div>

	</div>

	<div class="wpcfto_settings_head__content">

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

	</div>

</div>

<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
} //Exit if accessed directly


/**
 * Display Metabox.
 *
 * @var $post
 * @var $metabox
 * @var $args_id
 */

$vue_id = '';

if ( empty( $metabox_id ) ) {
	/*We are on a post*/
	$sections  = $metabox['args'][ $metabox['id'] ];
	$active    = '';
	$vue_id    = "data-vue='" . $metabox['id'] . "'";
	$source_id = "data-source='" . $post->ID . "'";
} else {
	if ( apply_filters( 'wpcfto_enable_export_import', true ) ) {
		$sections['wpcfto_import_export'] = array(
			'name'   => esc_html__( 'Import/Export', 'nuxy' ),
			'icon'   => 'fa fa-sync',
			'fields' => array(
				'wpcfto_import_export_field' => array(
					'type' => 'import_export',
					'id'   => $metabox['id'],
				),
			),
		);
	}
	if ( apply_filters( 'wpcfto_enable_regenerate_fonts', true ) && class_exists( 'WPCFTO_WebFont_Loader' ) ) {
		$sections['wpcfto_regenerate_fonts'] = array(
			'name'   => esc_html__( 'Generate fonts', 'nuxy' ),
			'icon'   => 'fa fa-sync',
			'fields' => array(
				'wpcfto_regenerate_fonts_field' => array(
					'type' => 'regenerate_fonts',
					'id'   => $metabox['id'],
				),
			),
		);
	}
}

?>

<div v-cloak
	class="stm_metaboxes_grid <?php echo esc_attr( 'sections_count_' . count( $sections ) ); ?>" <?php echo wp_kses( $vue_id . ' ' . $source_id, array() ); ?>>

	<div class="stm_metaboxes_grid__inner" v-if="data !== ''">

		<div class="container">

			<?php
			/* Hide Tab Nav if Menu Items == 1 */
			$hide_tab_nav = false;
			if ( count( $sections ) === 1 ) {
				foreach ( $sections as $section_name => $section ) {
					$submenus = array_unique( array_column( $section['fields'], 'submenu' ) );
					if ( count( $submenus ) <= 1 ) {
						$hide_tab_nav = true;
					}
				}
			}
			?>

			<div class="wpcfto-tab-nav <?php echo ( $hide_tab_nav ) ? 'hide' : ''; ?>">
				<div class="wpcfto-tab-nav--inner">
					<?php
					foreach ( $sections as $section_name => $section ) :

						$section_order = array_search( $section_name, array_keys( $sections ), true );

						if ( 0 === $section_order ) {
							$active = $section_name;
						}

						$submenus = array_column( $section['fields'], 'submenu' );

						$section_classes = array();
						if ( $active === $section_name ) {
							$section_classes[] = 'active';
						}
						if ( empty( $section['icon'] ) ) {
							$section_classes[] = 'no-icon';
						}
						if ( ! empty( $submenus ) ) {
							$section_classes[] = 'has-submenu';
						}

						$submenus = array_unique( $submenus );

						?>
						<div class="wpcfto-nav <?php echo esc_attr( implode( ' ', $section_classes ) ); ?>">

							<div class="wpcfto-nav-title"
								data-section="<?php echo esc_attr( $section_name ); ?>"
								@click="changeTab('<?php echo esc_attr( $section_name ); ?>')">
								<?php if ( ! empty( $section['icon'] ) ) : ?>
									<i class="<?php echo esc_attr( $section['icon'] ); ?>"></i>
								<?php endif; ?>

								<?php echo esc_html( $section['name'] ); ?>
							</div>

							<?php if ( ! empty( $submenus ) ) : ?>
								<div class="wpcfto-submenus">
									<?php
									foreach ( $submenus as $key => $_submenu ) :
										$submenu_classes = array();
										if ( in_array( 'active', $section_classes, true ) && empty( $key ) ) {
											$submenu_classes[] = 'active';
										}
										?>
										<div
											data-submenu="<?php echo esc_attr( $section_name . '_' . wpcfto_sanitize_string( $_submenu ) ); ?>"
											class="<?php echo esc_attr( implode( ' ', $submenu_classes ) ); ?>"
											@click="changeSubMenu('<?php echo esc_attr( $section_name . '_' . wpcfto_sanitize_string( $_submenu ) ); ?>')">
											<?php echo esc_attr( $_submenu ); ?>
											<i class="fa fa-chevron-right"></i>
										</div>
									<?php endforeach; ?>
								</div>
							<?php endif; ?>

						</div>
					<?php endforeach; ?>
					<?php do_action( 'wpcfto_after_tab_nav' ); ?>
				</div>
			</div>

			<?php
			foreach ( $sections as $section_name => $section ) :

				$submenus        = array_column( $section['fields'], 'submenu' );
				$section_classes = array();
				if ( $section_name === $active ) {
					$section_classes[] = 'active';
				}
				if ( ! empty( $submenus ) ) {
					$section_classes[] = 'has-submenu-items';
				}

				?>
				<div id="<?php echo esc_attr( $section_name ); ?>"
					class="wpcfto-tab <?php echo esc_attr( implode( ' ', $section_classes ) ); ?>">
					<div class="container container-constructed">
						<div class="row">

							<div class="column">

								<?php if ( ! empty( $section['label'] ) ) : ?>
									<div data-notice="enable_courses_filter_notice"
										class="wpcfto_generic_field wpcfto_generic_field__notice first opened">
										<label><?php echo esc_html( $section['label'] ); ?></label>
									</div>
								<?php endif; ?>

								<?php $is_group_item = false; ?>

								<?php
								foreach ( $section['fields'] as $field_name => $field ) {

									if ( isset( $field['group'] ) && 'started' === $field['group'] ) {
										$is_group_item = true;
									}

									$field['is_group_item'] = $is_group_item;

									if ( ! empty( $field['pre_open'] ) && $field['pre_open'] ) {
										wpcfto_metaboxes_preopen_field( $section, $section_name, $field, $field_name );
										continue;
									}

									if ( ! empty( $field['group'] ) ) {
										wpcfto_metaboxes_display_group_field( $section, $section_name, $field, $field_name );
										if ( 'ended' === $field['group'] ) {
											$is_group_item = false;
										}
										continue;
									}

									wpcfto_metaboxes_display_single_field( $section, $section_name, $field, $field_name );

								}
								?>

							</div>

						</div>
					</div>
				</div>
			<?php endforeach; ?>

		</div>

	</div>
</div>

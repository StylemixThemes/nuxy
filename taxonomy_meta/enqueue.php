<?php
function wpcfto_enqueue_taxonomy_ss() {
	$v      = time();
	$assets = STM_WPCFTO_URL . '/taxonomy_meta/assets';
	$base   = STM_WPCFTO_URL . '/taxonomy_meta/assets/';

	wp_enqueue_script('fonticonpicker', $base . 'js/jquery.fonticonpicker.min.js', array(), $v);
	wp_enqueue_style('fonticonpicker', $base . 'css/jquery.fonticonpicker.min.css', array(), $v);
	wp_enqueue_style('fonticonpicker-grey', $base . 'css/jquery.fonticonpicker.grey.min.css', array(), $v);
	wp_enqueue_style('linear', $assets . '/linearicons/linear.css', array(), $v);

}

add_action( 'admin_enqueue_scripts', 'wpcfto_enqueue_taxonomy_ss' );

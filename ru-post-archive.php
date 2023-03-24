<?php
/**
 * Plugin Name: TTT Post Archive
 * Description: Post or CPT archive via a shortcode
 * Version: 1.0
 */


function ru_post_archive_enqueue_script() {
  wp_enqueue_script( 'ru-post-archive-js', plugins_url( 'assets/dist/bundle.js', __FILE__ ), '', '1.0', true );
}
add_action( 'wp_enqueue_scripts', 'ru_post_archive_enqueue_script' );

function ru_post_archive_enqueue_style() {
  wp_enqueue_style( 'ru-post-archive-css', plugins_url( 'assets/dist/bundle.css', __FILE__ ), '', '1.0', 'all' );
}
add_action( 'wp_enqueue_scripts', 'ru_post_archive_enqueue_style' );

function ru_post_archive_shortcode() {
//  return '<div id="ru-post-archive"></div>';
  return '<div id="tips-container"></div>';
}
add_shortcode( 'ttt_post_archive', 'ru_post_archive_shortcode' );

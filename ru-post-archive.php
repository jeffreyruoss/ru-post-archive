<?php
/**
 * Plugin Name: TTT Post Archive
 * Description: Post or CPT archive via a shortcode
 * Version: 1.0
 */


function ru_post_archive_enqueue_scripts() {
  global $post;

  if ( is_a( $post, 'WP_Post' ) && has_shortcode( $post->post_content, 'ttt_post_archive' ) ) {
    // Enqueue the JS file
    wp_enqueue_script( 'ru-post-archive-js', plugins_url( 'assets/dist/bundle.js', __FILE__ ), '', '1.0', true );

    // Enqueue the CSS file
    wp_enqueue_style( 'ru-post-archive-css', plugins_url( 'assets/dist/bundle.css', __FILE__ ), '', '1.0', 'all' );
  }
}
add_action( 'wp_enqueue_scripts', 'ru_post_archive_enqueue_scripts' );

function ru_post_archive_shortcode() {
  return '<div id="ru-post-archive" class="ru-post-archive"></div>';
}
add_shortcode( 'ttt_post_archive', 'ru_post_archive_shortcode' );


<?php
// Load WordPress functions
require_once(defined('ABSPATH') ? ABSPATH . 'wp-load.php' : '../../../wp-load.php');

// Get the parameters from the AJAX request
$categories = isset($_GET['categories']) ? $_GET['categories'] : '';
$post_type = isset($_GET['post_type']) ? $_GET['post_type'] : 'post';
$taxonomy = isset($_GET['taxonomy']) ? $_GET['taxonomy'] : 'category';
$tips_per_page = isset($_GET['tips_per_page']) ? intval($_GET['tips_per_page']) : 10;
$current_page = isset($_GET['current_page']) ? intval($_GET['current_page']) : 1;
$image_size = isset($_GET['image_size']) ? $_GET['image_size'] : 'thumbnail';

// Set up the WP_Query arguments
$args = array(
  'post_type' => $post_type,
  'posts_per_page' => $tips_per_page,
  'paged' => $current_page,
);

// Check if the categories parameter is not empty
if (!empty($categories)) {
  // Convert the comma-separated category terms into an array
  $category_terms = explode(',', $categories);

  // Add the tax_query to the WP_Query arguments
  $args['tax_query'] = array(
    array(
      'taxonomy' => $taxonomy,
      'field'    => 'slug',
      'terms'    => $category_terms,
    ),
  );
}

// Execute the WP_Query
$query = new WP_Query($args);

// Check if the query has any results
if ($query->have_posts()) {
// Iterate through the query results
  while ($query->have_posts()) {
    $query->the_post();

    // Output the post title, content, and featured image
    echo '<h2>' . get_the_title() . '</h2>';

    // Check if the post has a featured image
    if (has_post_thumbnail()) {
      // Output the featured image with the specified size
      echo '<div class="featured-image">' . get_the_post_thumbnail(null, $image_size) . '</div>';
    }

    // Output the post's published date, followed by a pipe and a list of the post's categories
    echo '<div class="post-meta">';
    echo '<span class="post-date">' . get_the_date() . '</span>';
    echo ' | ';

    $categories = get_the_terms(get_the_ID(), $taxonomy);
    if ($categories && !is_wp_error($categories)) {
      $category_list = [];
      foreach ($categories as $category) {
        $category_list[] = '<span class="post-category">' . $category->name . '</span>';
      }
      echo implode(', ', $category_list);
    }
    echo '</div>';

    // Show the post's excerpt or content, depending on the value of the show_excerpt parameter
    if (isset($_GET['show_excerpt']) && $_GET['show_excerpt'] === 'true') {
      echo '<div>' . get_the_excerpt() . '</div>';
    } else {
      echo '<div>' . get_the_content() . '</div>';
    }
  }

  // Output pagination
  $total_pages = $query->max_num_pages;
  if ($total_pages > 1) {
    echo '<div class="pagination">';
    for ($i = 1; $i <= $total_pages; $i++) {
      echo '<a href="#" class="pagination-link" data-page="' . $i . '">' . $i . '</a> ';
    }
    echo '</div>';
  }
} else {
  // Output a message if no results found
  echo 'No results found for the given categories.';
}

// Reset the post data
wp_reset_postdata();



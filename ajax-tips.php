<?php
// Load WordPress functions
require_once(defined('ABSPATH') ? ABSPATH . 'wp-load.php' : '../../../wp-load.php');

// Get the category terms, tips_per_page, and current_page from the AJAX request
$categories = isset($_GET['categories']) ? $_GET['categories'] : '';
$tips_per_page = isset($_GET['tips_per_page']) ? intval($_GET['tips_per_page']) : 10;
$current_page = isset($_GET['current_page']) ? intval($_GET['current_page']) : 1;

// Set up the WP_Query arguments
$args = array(
  'post_type' => 'tips',
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
      'taxonomy' => 'tips_category',
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

    // Output the post title and content
    echo '<h2>' . get_the_title() . '</h2>';
    echo '<div>' . get_the_content() . '</div>';
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
  echo 'No tips found for the given categories.';
}

// Reset the post data
wp_reset_postdata();


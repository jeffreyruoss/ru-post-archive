<?php
// Load WordPress functions
require_once(defined('ABSPATH') ? ABSPATH . 'wp-load.php' : '../../../wp-load.php');

// Get the parameters from the AJAX request
$post_type = $_GET['post_type'] ?? 'post';
$taxonomy = $_GET['taxonomy'] ?? 'category';
$categories = $_GET['categories'] ?? '';
$per_page = intval($_GET['per_page'] ?? 10);
$current_page = intval($_GET['current_page'] ?? 1);
$image_size = $_GET['image_size'] ?? 'thumbnail';
$show_excerpt = $_GET['show_excerpt'] ?? 'false';


// Set up the WP_Query arguments
$args = array(
  'post_type' => $post_type,
  'posts_per_page' => $per_page,
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
      'operator' => 'AND',
    ),
  );
}

// Add tax term filter links
$terms = get_terms($taxonomy);
if ($terms && !is_wp_error($terms)) {
  $term_list = [];
  foreach ($terms as $term) {
    $term_list[] = '<a href="#" class="post-category" data-filter-multi="true" data-category-slug="' . $term->slug . '">' . $term->name . '</a>';
  }
  echo '<div class="post-categories">' . implode(', ', $term_list) . '</div>';
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
        $category_list[] = '<a href="#" class="post-category" data-category-slug="' . $category->slug . '">' . $category->name . '</a>';
      }
      echo implode(', ', $category_list);
    }
    echo '</div>';

    // Show the post's excerpt or content, depending on the value of the show_excerpt parameter
    if (isset($_GET['show_excerpt']) && $_GET['show_excerpt'] === 'true') {
      echo '<div>' . get_the_excerpt() . '</div>';
      echo '<div class="read-more"><a href="' . get_permalink() . '">Read more</a></div>';
    } else {
      echo '<div>' . get_the_content() . '</div>';
    }
  }

  $total_pages = $query->max_num_pages;
// Output pagination
  if ($total_pages > 1) {
    echo '<div class="pagination">';

    // Previous link
    if ($current_page > 1) {
      echo '<a href="#" class="pagination-link" data-page="' . ($current_page - 1) . '">&laquo; Previous</a>';
    }

    for ($i = 1; $i <= $total_pages; $i++) {
      if ($i == $current_page) {
        // Disable the current pagination link and give it a class of active-page
        echo '<span class="pagination-link active-page">' . $i . '</span>';
      } else {
        echo '<a href="#" class="pagination-link" data-page="' . $i . '">' . $i . '</a>';
      }
    }

    // Next link
    if ($current_page < $total_pages) {
      echo '<a href="#" class="pagination-link" data-page="' . ($current_page + 1) . '">Next &raquo;</a>';
    }

    echo '</div>';
  }


} else {
  // Output a message if no results found
  echo 'No results found for the given categories.';
}

// Reset the post data
wp_reset_postdata();



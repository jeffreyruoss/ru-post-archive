import Archive from './archive';
import Archive2 from './archive2';

/**
 * CONFIG
 */
// const config = {
//   postType: 'tips',
//   postsPerPage: 6,
//   featuredImgSize: 'thumbnail',
//   filterTaxonomy: 'tips_category',
// }


// const archive = new Archive(config);


{

  function ruGetPosts(args = {}) {
    // Set default values for the parameters
    const defaults = {
      post_type: 'post',
      taxonomy: 'category',
      categories: '',
      tips_per_page: 10,
      current_page: 1,
      image_size: 'thumbnail',
    };

    // Merge the default values with the provided arguments
    const options = { ...defaults, ...args };

    // Make an AJAX request to the PHP file
    jQuery.ajax({
      url: '/wp-content/plugins/ru-post-archive/ajax-tips.php',
      type: 'GET',
      data: options,
      success: function (response) {
        // Update the content of a DOM element with the response
        jQuery('#tips-container').html(response);

        // Add click event to pagination links
        jQuery('.pagination-link').on('click', function (e) {
          e.preventDefault();
          var page = jQuery(this).data('page');
          ruGetPosts({ ...options, current_page: page });
        });
      },
      error: function () {
        console.error('An error occurred while fetching the posts.');
      },
    });
  }


  ruGetPosts({
    post_type: 'tips',
    taxonomy: 'tips_category',
    tips_per_page: 5,
    image_size: 'thumbnail',
  });



}


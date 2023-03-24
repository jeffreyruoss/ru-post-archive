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

  function getTips(categories = '', tips_per_page = 10, current_page = 1) {
    // Make an AJAX request to the PHP file
    jQuery.ajax({
      url: '/wp-content/plugins/ru-post-archive/ajax-tips.php',
      type: 'GET',
      data: {
        categories: categories,
        tips_per_page: tips_per_page,
        current_page: current_page,
      },
      success: function(response) {
        // Update the content of a DOM element with the response
        jQuery('#tips-container').html(response);

        // Add click event to pagination links
        jQuery('.pagination-link').on('click', function(e) {
          e.preventDefault();
          var page = jQuery(this).data('page');
          getTips(categories, tips_per_page, page);
        });
      },
      error: function() {
        console.error('An error occurred while fetching the tips.');
      }
    });
  }

  getTips('test,Sketching', 3);

}


export default class PostFetcher {
  constructor(args = {}) {
    this.defaults = {
      post_type: 'post',
      taxonomy: 'category',
      categories: '', // comma separated list of category slugs: 'test,another-test'
      per_page: 10,
      current_page: 1,
      image_size: 'thumbnail',
      show_excerpt: false, // false shows full content
    };

    // Merge the default values with the provided arguments
    this.options = { ...this.defaults, ...args };

    this.bindCategoryEvents();
    this.bindPaginationEvents();
  }

  fetchPosts(args = {}) {
    // Update the options with any new arguments provided
    this.options = { ...this.options, ...args };
    console.log(this.options);

    // Make an AJAX request to the PHP file
    jQuery.ajax({
      url: '/wp-content/plugins/ru-post-archive/ajax-tips.php',
      type: 'GET',
      data: this.options,
      success: function(response) {
        // Update the content of a DOM element with the response
        jQuery('#ru-post-archive').html(response);

        // Add click event to pagination links
        jQuery('.pagination-link').on('click', function(e) {
          e.preventDefault();
          var page = jQuery(e.currentTarget).data('page');
          this.fetchPosts({ current_page: page });
        }.bind(this));
      }.bind(this),
      error: function() {
        console.error('An error occurred while fetching the posts.');
      },
    });
  }

  bindCategoryEvents() {
    jQuery('#ru-post-archive').on('click', '.post-category', (event) => {
      event.preventDefault();
      const categorySlug = jQuery(event.currentTarget).data('category-slug');
      this.options.categories = categorySlug;
      this.options.current_page = 1;
      this.fetchPosts();
    });
  }

  bindPaginationEvents() {
    jQuery('#ru-post-archive').on('click', '.pagination-link', (event) => {
      event.preventDefault();
      const pageNumber = jQuery(event.currentTarget).data('page');
      this.options.current_page = pageNumber;
      this.fetchPosts();
    });
  }


}

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

    this.taxListeners();
    this.paginationListners();
  }

  fetchPosts(args = {}) {
    // Update the options with any new arguments provided
    this.options = { ...this.options, ...args };

    console.log(this.options);

    // Create a URL object and append the search parameters
    const url = new URL('/wp-content/plugins/ru-post-archive/ajax-tips.php', window.location.origin);
    for (const key in this.options) {
      url.searchParams.append(key, this.options[key]);
    }

    // Make a Fetch request to the PHP file
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((html) => {
        // Update the content of a DOM element with the response
        document.querySelector('#ru-post-archive').innerHTML = html;

        // Add click event to pagination links
        document.querySelectorAll('.pagination-link').forEach((link) => {
          link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.currentTarget.getAttribute('data-page');
            this.fetchPosts({ current_page: page });
          });
        });
      })
      .catch((error) => {
        console.error('An error occurred while fetching the posts:', error);
      });
  }

  taxListeners() {
    jQuery('#ru-post-archive').on('click', '.post-category', (event) => {
      event.preventDefault();

      this.options.current_page = 1;

      // if data-filter-multi="true" add the category else replace the category
      if (jQuery(event.currentTarget).data('filter-multi') === true) {
        const previousCategories = this.options.categories ? this.options.categories + ',' : '';
        const newCategory = jQuery(event.currentTarget).data('category-slug');
        this.options.categories = previousCategories + newCategory;
      } else {
        this.options.categories = jQuery(event.currentTarget).data('category-slug');
      }

      this.fetchPosts();
    });
  }

  paginationListners() {
    jQuery('#ru-post-archive').on('click', '.pagination-link', (event) => {
      event.preventDefault();
      const pageNumber = jQuery(event.currentTarget).data('page');
      this.options.current_page = pageNumber;
      this.fetchPosts();
    });
  }


}

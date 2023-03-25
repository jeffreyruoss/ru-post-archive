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
      ajax_url: ''
    };

    // Merge the default values with the provided arguments
    this.options = { ...this.defaults, ...args };

    this.archiveListeners();
  }

  fetchPosts(args = {}) {
    // Update the options with any new arguments provided
    this.options = { ...this.options, ...args };

    // Check for query parameters in the URL
    const queryParams = new URLSearchParams(window.location.search);

    // Override options with query parameters if they exist
    if (queryParams.has('categories')) {
      this.options.categories = queryParams.get('categories');
    }
    if (queryParams.has('current_page')) {
      this.options.current_page = parseInt(queryParams.get('current_page'), 10);
    }

    // Create a URL object and append the search parameters
    const url = new URL(this.options.ajax_url, window.location.origin);
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
      })
      .catch((error) => {
        console.error('An error occurred while fetching the posts:', error);
      });
  }

  archiveListeners() {
    const postArchive = document.getElementById("ru-post-archive");

    postArchive.addEventListener("click", (event) => {
      const target = event.target;
      event.preventDefault();

      if (target.classList.contains("post-category")) {
        // Handle category click
        this.handleCategoryClick(target);
      } else if (target.classList.contains("pagination-link")) {
        // Handle pagination click
        this.handlePaginationClick(target);
      }
    });
  }

  handleCategoryClick(target) {
    if (target.classList.contains("post-category")) {
      event.preventDefault();

      this.options.current_page = 1;

      // if data-filter-multi="true" add the category else replace the category
      if (target.dataset.filterMulti === "true") {
        const newCategory = target.dataset.categorySlug;
        let categoriesArray = this.options.categories ? this.options.categories.split(",") : [];

        // Check if the category is already in the categories array
        const categoryIndex = categoriesArray.indexOf(newCategory);

        if (categoryIndex === -1) {
          // If it's not in the array, add it
          categoriesArray.push(newCategory);
        } else {
          // If it's already in the array, remove it
          categoriesArray.splice(categoryIndex, 1);
        }

        // Convert the array back to a comma-separated string
        this.options.categories = categoriesArray.join(",");
      } else {
        this.options.categories = target.dataset.categorySlug;
      }

      this.updateUrl();
      this.fetchPosts();
    }
  }

  handlePaginationClick(target) {
    if (target.classList.contains("pagination-link")) {
      event.preventDefault();
      const pageNumber = parseInt(target.dataset.page, 10);
      this.options.current_page = pageNumber;

      this.updateUrl();
      this.fetchPosts();
    }
  }

  updateUrl() {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.set('categories', this.options.categories);
    params.set('current_page', this.options.current_page);
    url.search = params.toString();
    window.history.pushState({}, '', url);
  }
}

export default class Archive {
  constructor(config) {
    this.config = config;
    const urlParams = new URLSearchParams(window.location.search);
    this.currentPage = parseInt(urlParams.get('page')) || 1;
    this.render();
  }

  getDomain() {
    const domain = window.location.hostname;
    const port = window.location.port;
    return domain + (port ? ':' + port : '');
  }

  async fetchData(endpoint, params = {}) {
    const domain = this.getDomain();
    const queryString = new URLSearchParams(params).toString();

    // console.log the query string
    console.log(queryString);


    const url = `https://${domain}/wp-json/wp/v2/${endpoint}${queryString ? '?' + queryString : ''}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const totalPages = parseInt(response.headers.get('X-WP-TotalPages'), 10);
      return { data, totalPages };
    } catch (error) {
      console.error(error);
    }
  }

  async filters() {
    try {
      const { data: categories } = await this.fetchData(this.config.filterTaxonomy);
      const filterList = categories
        .map(category => `<li><a href="#" data-filter="${category.slug}">${category.name}</a></li>`)
        .join('');

      return `
        <div class="ru-post-archive__filter">
          <ul>
            ${filterList}
          </ul>
        </div>
      `;
    } catch (error) {
      console.error(error);
    }
  }

  async filtersListeners() {
    const filterLinks = document.querySelectorAll('.ru-post-archive__filter a');
    filterLinks.forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault();
        const filter = event.target.dataset.filter;
        this.addFilterToUrl(filter);
        // const url = new URL(event.target.href);
        // const filter = url.searchParams.get('filter');
        this.currentPage = 1;
        this.updateUrl();
        this.render();
      });
    });
  }

  addFilterToUrl(filter) {
    const url = window.location.href;
    const [baseUrl, queryString] = url.split('?');
    const params = new URLSearchParams(queryString);

    const newValue = filter;

    if (params.has('filters')) {
      const existingValue = params.get('filters');
      const updatedValue = existingValue ? `${existingValue},${newValue}` : newValue;
      params.set('filters', updatedValue);
    } else {
      params.set('filters', newValue);
    }

    const updatedUrl = `${baseUrl}?${params.toString()}`;
    window.history.replaceState({}, '', updatedUrl);
  }

  async getFeaturedImageUrl(featuredMediaId) {
    try {
      const { data: media } = await this.fetchData(`media/${featuredMediaId}`);
      const featuredImgSize = this.config.featuredImgSize;
      return media.media_details.sizes[featuredImgSize].source_url;;
    } catch (error) {
      console.error(error);
    }
  }


  async grid() {
    try {
      const { data: posts, totalPages } = await this.fetchData(
        this.config.postType,
        {
          per_page: this.config.postsPerPage,
          page: this.currentPage
        }
      );

      const postList = await Promise.all(
        posts.map(async post => {
          const featuredImageUrl = await this.getFeaturedImageUrl(post.featured_media);
          const title = post.title.rendered;
          const publishedDate = new Date(post.date).toLocaleDateString();
          const categories = post.tips_category;
          const content = post.content.rendered;

          return `
            <div class="ru-post-archive__post">
              <div class="ru-post-archive__image">
                <img src="${featuredImageUrl}" loading="lazy" alt="${title}" />
              </div>
              <div class="ru-post-archive__info">
                <h3>${title}</h3>
                <p class="ru-post-archive__date">${publishedDate}</p>
                <p class="ru-post-archive__categories">${categories}</p>
                <div class="ru-post-archive__content">${content}</div>
              </div>
            </div>
          `;
        })
      );

      return `
        <div class="ru-post-archive__grid">
          ${postList.join('')}
        </div>
        <div class="ru-post-archive__pagination">
          <button id="previous-page" ${this.currentPage <= 1 ? 'disabled' : ''}>Previous</button>
          <span>Page ${this.currentPage}</span>
          <button id="next-page" ${this.currentPage >= totalPages ? 'disabled' : ''}>Next</button>
        </div>
      `;
    } catch (error) {
      console.error(error);
    }
  }

  async previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateUrl();
      await this.render();
    }
  }

  async nextPage() {
    this.currentPage++;
    this.updateUrl();
    await this.render();
  }

  addPaginationEventListeners() {
    const previousButton = document.querySelector('#previous-page');
    const nextButton = document.querySelector('#next-page');

    previousButton.addEventListener('click', () => this.previousPage());
    nextButton.addEventListener('click', () => this.nextPage());
  }

  updateUrl() {
    const url = new URL(window.location);
    url.searchParams.set('page', this.currentPage);
    window.history.replaceState(null, '', url.toString());
  }

  async render() {
    document.querySelector('#ru-post-archive').innerHTML = (await this.filters()) + (await this.grid());
    this.addPaginationEventListeners();
    this.filtersListeners();
  }
}

import PostFetcher from './PostFetcher';

const postFetcher = new PostFetcher({
  post_type: 'tips',
  taxonomy: 'tips_category',
  categories: '', // comma separated list of category slugs: 'test,another-test'
  per_page: 3,
  image_size: 'thumbnail',
  show_excerpt: false, // false shows full content
  ajax_url: '/wp-content/plugins/ru-post-archive/ajax-tips.php'
});

postFetcher.fetchPosts();

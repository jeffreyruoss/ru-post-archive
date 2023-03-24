import PostFetcher from './PostFetcher';

const postFetcher = new PostFetcher({
  post_type: 'tips',
  taxonomy: 'tips_category',
  categories: '', // comma separated list of category slugs: 'test,another-test'
  tips_per_page: 2,
  image_size: 'thumbnail',
  show_excerpt: false, // false shows full content
});

postFetcher.fetchPosts();

import PostFetcher from './PostFetcher';

const postFetcher = new PostFetcher({
  post_type: 'tips',
  taxonomy: 'tips_category',
  categories: '', // comma separated list of category slugs: 'test,another-test'
  per_page: 2,
  image_size: 'thumbnail',
  show_excerpt: true, // false shows full content
});

postFetcher.fetchPosts();

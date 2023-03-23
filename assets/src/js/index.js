import Archive from './archive';

/**
 * CONFIG
 */
const config = {
  postType: 'tips',
  postsPerPage: 6,
  featuredImgSize: 'thumbnail',
  filterTaxonomy: 'tips_category',
}


const archive = new Archive(config);

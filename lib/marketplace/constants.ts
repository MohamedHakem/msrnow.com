export type SortFilterItem = {
  title: string;
  slug: string | null;
  // sortKey: 'RELEVANCE' | 'BEST_SELLING' | 'CREATED_AT' | 'PRICE';
  sortKey: 'createdAt' | 'price';
  reverse: boolean;
};
export type FilterFilterItem = {
  title: string;
  slug: string | null;
  filterKey: 'size' | 'color';
};

export const defaultSort: SortFilterItem = {
  title: 'الأحدث',
  slug: null,
  sortKey: 'createdAt',
  reverse: true
};

export const sorting: SortFilterItem[] = [
  defaultSort,
  // { title: 'Trending', slug: 'trending-desc', sortKey: 'BEST_SELLING', reverse: false }, // asc
  // { title: 'Latest arrivals', slug: 'latest-desc', sortKey: 'CREATED_AT', reverse: true },
  // { title: 'Price: Low to high', slug: 'price-asc', sortKey: 'PRICE', reverse: false }, // asc
  // { title: 'Price: High to low', slug: 'price-desc', sortKey: 'PRICE', reverse: true },
  // { title: 'Price: Low to high', slug: 'price-asc', sortKey: 'PRICE', reverse: false }, // asc
  // { title: 'Price: High to low', slug: 'price-desc', sortKey: 'PRICE', reverse: true }
  { title: 'السعر: الأعلي الي الأقل', slug: 'price-desc', sortKey: 'price', reverse: true },
  { title: 'السعر: الأقل الي الأعلي', slug: 'price-asc', sortKey: 'price', reverse: false } // asc
];

export const filtering: FilterFilterItem[] = [
  { title: 'مقاس 40', slug: '1', filterKey: 'size' },
  { title: 'مقاس 41', slug: '', filterKey: 'size' } // asc
];

export const TAGS = {
  collections: 'collections',
  products: 'products'
};

export const HIDDEN_PRODUCT_TAG = 'nextjs-frontend-hidden';
export const DEFAULT_OPTION = 'Default Title';
export const SHOPIFY_GRAPHQL_API_ENDPOINT = '/api/2023-01/graphql.json';

import { OrderStatus } from '@prisma/client';

export type newArticlesType = {
  scraped_from: string;
  title: string;
  google_thumb: string | undefined;
  article_google_url: string;
  slug: string;
  published_at: string | undefined;
  sourceId: number;
  categoryId: number;
  short_slug: string;
}[];

export type singleArticleType = {
  title: string;
  slug: string;
  content: string | null;
  google_thumb: string;
  article_google_url: string;
  article_source_url: string | null;
  related_coverage_url: string | null;
  related_coverage_article: string | null;
  related_coverage_tweets: string | null;
  likes: number | null;
  shares: number | null;
  short_slug: string;
  published_at: Date;
  keywords: string | null;
  description: string | null;
  sourceId: number;
  categoryId: number;
};

export type relatedArticleType = {
  scraped_from: string;
  title: string;
  google_thumb: string;
  article_google_url: string;
  short_slug: string;
  slug: string;
  related_coverage_url: string | null;
  related_coverage_article: string | null;
  related_coverage_tweets: string | null;
  published_at: Date | number;
  categoryId: number;
  sourceId: number;
  likes: number | null;
  shares: number | null;
  article_source_url: string | null;
};

export type tweetsArrayType = {
  id: string;
  published_at: number;
};

export type timelineArrayType = relatedArticleType | tweetsArrayType;

export type sourceType = {
  id: number;
  name: string;
  url: string | null;
  scrapable: number | null;
  content_selector: string | null;
};

export type newsType = {
  title: string;
  slug: string;
  google_thumb: string;
  article_google_url: string;
  article_source_url: string | null;
  likes: number | null;
  shares: number | null;
  short_slug: string;
  published_at: Date;
};

export type featuredArticleType = {
  title: string;
  google_thumb: string;
  views: number | null;
  likes: number | null;
  short_slug: string;
  published_at: Date;
};

export type currentCategory = {
  id: number;
  name: string;
  google_news_url: string;
  source: { id: number; name: string; url: null; scrapable: number; content_selector: string | null }[];
};

export type Category = {
  id: number;
  name: string;
  google_news_url: string;
};

export type articleType = {
  scraped_from: string;
  title: string;
  google_thumb: string | undefined;
  article_google_url: string;
  related_coverage_url: string;
  slug: string;
  published_at: string | undefined;
  sourceId: string | number;
  categoryId: number;
  short_slug: string;
  top_headline: boolean;
};

export type topHeadlineType = {
  title: string;
  google_thumb: string;
  views: number | null;
  likes: number | null;
  short_slug: string;
  published_at: Date;
};

export type updatedArticleType = {
  article_source_url: string;
  keywords: string | null | undefined;
  description: string | null | undefined;
  content: string | null | undefined;
};

// marketplace tables types

// export type dataTableProductType = {
//   رمز: string;
//   العنوان: string;
//   السعر: number;
//   الكمية: number;
//   الفئة: productCategory;
//   الاوردرات: number;
//   التقييم: number;
//   الشحن: boolean;
//   الحالة: published_status;
//   slug: string;
// };

export type dataTableProductType = {
  رمز: number;
  العنوان: string;
  رابط: string;
  السعر: number;
  الكمية: number;
  الفئة: productCategory;
  الاوردرات: number;
  التقييم: string;
  الحالة: string;
};

enum productCategory {
  'أحذية'
}

// enum published_status {
//   'معروض',
//   'مؤرشف'
// }

export type dataTableOrderType = {
  رمز: number;
  المنتج: string;
  المقاس: string;
  اللون: string;
  رابط: string;
  الهاتف: string;
  العنوان: string;
  العميل: string;
  السعر: number;
  الحالة: OrderStatus;
  التاريخ: string; // created at
  // نشاط: string; // last status change at
};

export type AddProductType = {
  title: string;
  price: number;
  stockQuantity: number;
  productCategoryId: number;
  free_shipping: boolean;
  published_status: boolean;
  is_used: boolean;
};

export type marketplaceProductType = {
  id: number;
  title: string;
  price: number;
  stockQuantity: number;
  slug: string | null;
  description: string | null;
  rating: number | null;
  brand: string | null;
  sku: string | null;
  discountPrice: number | null;
  free_shipping: Boolean | null;
  published_status: Boolean | null;
  is_used: Boolean | null;
  is_exchangeable: Boolean | null;
  for_donation: Boolean | null;
  productCategoryId: number;
  images: marketPlaceProductImageType[];
  ProductSizes?: marketPlaceProductSizeType[];
  ProductColors?: marketPlaceProductColorType[];
  selectedSize?: string;
  selectedColor?: string;
};

export type marketplaceSingleProductType = {
  id: number;
  title: string;
  price: number;
  stockQuantity: number;
  slug: string | null;
  description: string | null;
  rating: number | null;
  brand: string | null;
  sku: string | null;
  discountPrice: number | null;
  free_shipping: Boolean | null;
  published_status: Boolean | null;
  is_used: Boolean | null;
  is_exchangeable: Boolean | null;
  for_donation: Boolean | null;
  productCategoryId: number;
  images: marketPlaceProductImageType[];
  ProductSizes?: marketPlaceProductSizeType[];
  ProductColors?: marketPlaceProductColorType[];
  selectedSize?: string;
  selectedColor?: string;
  reviews: productReviewType[];
};

export type productReviewType = { review_text: string };

type marketPlaceProductImageType = {
  url: string;
  alt?: string | null;
};
type marketPlaceProductSizeType = {
  name: string;
};
type marketPlaceProductColorType = {
  name: string;
  value: string;
};

// cart types
export type Cart = {
  id: string;
  totalAmount: Money;
  // lines: Connection<CartItem>;
  totalQuantity: number;
};

export type Money = {
  amount: string;
  currencyCode: string;
};

export type Connection<T> = {
  edges: Array<Edge<T>>;
};

export type Edge<T> = {
  node: T;
};

export type CartItem = {
  id: string;
  quantity: number;
  totalAmount: Money;
  product: marketplaceProductType;
  // merchandise: {
  //   id: string;
  //   title: string;
  //   selectedOptions: {
  //     name: string;
  //     value: string;
  //   }[];
  //   product: marketplaceProductType;
  // };
};

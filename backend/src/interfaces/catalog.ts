export type Catalog = {
  id: number;
  meta_title: string;
  meta_keyword: string;
  meta_description: string;
  url_key: string;
  name: string;
  categories: Category[];
  envio_gratis: number;
  contenido: string;
  stock: number;
  thumbnail: Thumbnail;
  description: Description;
  sku: string;
  media_gallery: MediaGallery[];
  price_range: PriceRange;
};

type Category = {
  name: string;
};

type Thumbnail = {
  url: string;
};

type Description = {
  html: string;
};

type MediaGallery = {
  label: string | undefined;
  url: string;
};

type PriceRange = {
  maximum_price: MaximumPrice;
};

type MaximumPrice = {
  final_price: Price;
  discount: Discount;
  regular_price: Price;
};

type Price = {
  currency: string;
  value: number;
};

type Discount = {
  amount_off: number;
  percent_off: number;
};


export interface Image {
  url: string;
  altText: string | null;
}

export interface Variant {
  id: string;
  title: string;
  price: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  variants: Variant[];
  image?: Image;  // facultatif
}

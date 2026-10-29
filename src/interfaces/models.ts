
export interface Category {
  id: number;
  name: string;
}

export interface ProductPost {
  title: string;
  description: string;
  price: number;
  category: number;
  mainPhoto: string;
}

export interface Product extends Omit<ProductPost, 'category'> {
  id: number;
  category: Category;
}

export interface CategoriesResponse {
  categories: Category[];
}

export interface ProductsResponse {
  products: Product[];
}
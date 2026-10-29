
import { Http } from './http.class';
import { SERVER } from '../constants';
import type { ProductPost, ProductsResponse, Product } from '../interfaces/models';

export class ProductsService {
  #http = new Http();

  getAll(): Promise<ProductsResponse | null> {
    return this.#http.get<ProductsResponse>(`${SERVER}/products`);
  }

  post(product: ProductPost): Promise<Product | null> {
    return this.#http.post<Product>(`${SERVER}/products`, product);
  }

  delete(id: number): Promise<null> {
    return this.#http.delete(`${SERVER}/products/${id}`);
  }
}
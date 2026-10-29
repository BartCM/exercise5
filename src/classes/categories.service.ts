

import { Http } from './http.class';
import { SERVER } from '../constants';
import type { CategoriesResponse } from '../interfaces/models';

export class CategoriesService {
  #http = new Http();

  getAll(): Promise<CategoriesResponse | null> {
    return this.#http.get<CategoriesResponse>(`${SERVER}/categories`);
  }
}
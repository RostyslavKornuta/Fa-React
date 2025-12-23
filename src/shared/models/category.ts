export interface CategoryResponse {
  data: Category[];
  total: number;
}

export interface Category {
  id: string;
  domain: string;
  name: string;
  path: string;
  favorite: boolean;
}

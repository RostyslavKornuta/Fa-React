export interface AuthorResponse {
  data: Author[];
  total: number;
}

export interface Author {
  id: string;
  userId?: string;
  name: string;
  path: string;
  image?: string;
  domain: string;
  description: string;
  deleted: boolean;
}

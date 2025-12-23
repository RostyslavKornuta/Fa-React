export interface ContentSearchRequest {
  domainId: string;
  order: string;
  page: number;
  searchQuery: string;
  size: number;
  sort: string[];
}

export interface Content {
  article: ContentArticle;
  details: ContentDetails;
}

export interface ContentArticle {
  id: string;
  domain: string;
  title: string;
  path: string;
  type: string;
  status: ContentStatus;
  category?: string;
  favoriteImage?: string;
  author: string;
  createdAt: string;
  modifiedAt: string;
  publishedAt: string;
  trending: boolean;
  publicPage: boolean;
  description: string;
}

export interface ContentDetails {
  type: string;
  elements: ContentDetailsElement[];
}

interface ContentDetailsElement {
  type: string;
  text: string;
}

export type ContentStatus = {
  ACTIVE: "ACTIVE";
  PENDING: "PENDING";
  DRAFT: "DRAFT";
  DELETED: "DELETED";
};

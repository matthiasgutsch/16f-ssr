export interface Book {
  isbn: string;
  title: string;
  page_title?: string;
  authors: string[];
  published?: string;
  subtitle?: string;
  thumbnailUrl?: string;
  description?: string;
}

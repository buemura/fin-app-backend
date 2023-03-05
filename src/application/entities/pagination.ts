export interface PaginationMetadataProps {
  page: number;
  items: number;
}

export interface PaginationMetadataResponse {
  page: number;
  items: number;
  totalPages: number;
  totalItems: number;
}

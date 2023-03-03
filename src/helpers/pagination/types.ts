export interface PaginationMetadataProps {
  data: any[];
  page: number;
  items: number;
}

export interface SliceParamsProps {
  page: number;
  items: number;
}

export interface SliceParamsResponse {
  start: number;
  end: number;
}

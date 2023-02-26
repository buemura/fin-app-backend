import { PaginationMetadataResponse } from "../interfaces/pagination";

interface PaginationMetadataProps {
  data: any[];
  page: number;
  items: number;
}

interface SliceParamsProps {
  page: number;
  items: number;
}

interface SliceParamsResponse {
  start: number;
  end: number;
}

export function paginationMetada({
  data,
  page,
  items,
}: PaginationMetadataProps): PaginationMetadataResponse {
  return {
    page,
    items,
    totalPages: Math.ceil(data.length / items),
    totalItems: data.length,
  };
}

export function sliceParams({
  page,
  items,
}: SliceParamsProps): SliceParamsResponse {
  return {
    start: (page - 1) * items,
    end: page * items,
  };
}

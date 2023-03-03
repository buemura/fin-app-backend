import { PaginationMetadataResponse } from '@core/dtos/pagination.dto';
import {
  PaginationMetadataProps,
  SliceParamsProps,
  SliceParamsResponse,
} from './types';

export function paginationMetadata({
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

export function paginationSliceParams({
  page,
  items,
}: SliceParamsProps): SliceParamsResponse {
  return {
    start: (page - 1) * items,
    end: page * items,
  };
}

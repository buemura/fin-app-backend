import { PaginationMetadataResponse } from "./pagination-dto";

export interface ResponseDto {
  metadata?: PaginationMetadataResponse | null;
  data: any | null;
}

import { IsOptional } from 'class-validator';

export class PaginationQueryParams {
  @IsOptional()
  page: number;

  @IsOptional()
  items: number;
}

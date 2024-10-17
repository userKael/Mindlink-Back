export interface Pagination {
  page: number;
  pageSize: number;
  sort: PaginationSort;
}

export enum PaginationSort {
  ASC = 'ASC',
  DESC = 'DESC',
}

export default class Paginated<T> {
  readonly items: T[];

  readonly page?: number;

  readonly pageSize?: number;

  readonly total?: number;

  readonly sort?: PaginationSort;

  constructor(
    items: T[],
    page?: number,
    pageSize?: number,
    total?: number,
    sort?: PaginationSort,
  ) {
    this.page = page;
    this.pageSize = pageSize;
    this.total = total;
    this.items = items;
    this.sort = sort;
  }
}

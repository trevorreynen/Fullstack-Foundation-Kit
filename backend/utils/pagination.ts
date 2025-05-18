// ./backend/utils/pagination.ts
// import { buildPaginatedResponse } from '../utils/pagination'


/**
 * Builds a paginated response payload from a list of items.
 *
 * @param items - The current page of items.
 * @param total - The total number of matching items.
 * @param page - The current page number.
 * @param pageSize - The number of items per page.
 * @returns An object containing the items and pagination metadata.
 */
export const buildPaginatedResponse = (items: any[], total: number, page: number, pageSize: number) => ({
  items,
  meta: {
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize)
  }
})

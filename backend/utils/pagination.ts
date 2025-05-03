// ./backend/utils/pagination.ts


export const buildPaginatedResponse = (items: any[], total: number, page: number, pageSize: number) => ({
  items,
  meta: {
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize)
  }
})

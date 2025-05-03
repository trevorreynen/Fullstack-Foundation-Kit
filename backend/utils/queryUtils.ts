// ./backend/utils/queryUtils.ts

// Imports
import { Op, WhereOptions, FindAndCountOptions } from 'sequelize'
import { Request } from 'express'


export function buildQueryOptions(req: Request, searchableFields: string[] = []): { page: number, pageSize: number, options: FindAndCountOptions, where?: WhereOptions } {
  const page = Math.max(parseInt(req.query.page as string) || 1, 1)
  const rawPageSize = parseInt(req.query.pageSize as string)
  const pageSize = Math.min(Math.max(rawPageSize || 15, 1), 100)
  const offset = (page - 1) * pageSize
  const limit = pageSize

  const sortDir = (req.query.sort as string)?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC' as 'ASC' | 'DESC'
  const rawSortBy = req.query.sortBy as string | undefined
  const allowedSortFields = ['createdAt', 'likeCount', 'commentCount']
  const sortBy = allowedSortFields.includes(rawSortBy ?? '') ? rawSortBy! : 'createdAt'

  const order: [string, 'ASC' | 'DESC'][] =
    sortBy === 'likeCount'
      ? [['likeCount', sortDir], ['createdAt', 'DESC']]
      : sortBy === 'commentCount'
      ? [['commentCount', sortDir], ['createdAt', 'DESC']]
      : [[sortBy, sortDir]]


  const search = req.query.search as string
  let where: WhereOptions | undefined = undefined

  if (search && searchableFields.length > 0) {
    const resolvedFields = searchableFields.includes('combined') ? ['title', 'content'] : searchableFields
    where = {
      [Op.or]: resolvedFields.map((field) => ({
        [field]: { [Op.like]: `%${search}%` },
      })),
    }
  }

  return {
    page,
    pageSize,
    options: {
      offset,
      limit,
      order,
      ...(where ? { where } : {}),
    },
    ...(where ? { where } : {})
  }
}


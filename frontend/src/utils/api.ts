// import { api } from '@/utils/api'

const API_BASE = `${process.env.API_BASE}`

type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE'

interface ApiOptions {
  method?: Method
  body?: any
  headers?: Record<string, string>
  queryParams?: Record<string, string | number | boolean>
  query?: Record<string, string | number | boolean> // alias for queryParams for consistency
}


export async function api(endpoint: string, { method, body, headers = {}, queryParams, query }: ApiOptions = {}) {
  const url = new URL(`${API_BASE}${endpoint}`)
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')

  // Merge query and queryParams if both exist
  const combinedQuery = { ...queryParams, ...query }
  if (combinedQuery) {
    Object.entries(combinedQuery).forEach(([key, value]) => {
      url.searchParams.append(key, String(value))
    })
  }

  if (!method) {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(`Missing method in api() call to: ${endpoint}`)
    }
  }

  const response = await fetch(url.toString(), {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include',
  })

  const contentType = response.headers.get('content-type')
  const isJson = contentType && contentType.includes('application/json')
  const data = isJson ? await response.json() : await response.text()

  if (!response.ok) {
    const errMsg = typeof data === 'string' ? data : data?.error || `Request failed: ${response.status}`
    throw new Error(errMsg)
  }

  return data
}


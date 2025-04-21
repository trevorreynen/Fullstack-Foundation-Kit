// import { api } from '@/utils/api'

const API_BASE = `${process.env.API_BASE}`

type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE'

interface ApiOptions {
  method?: Method
  body?: any
  headers?: Record<string, string>
  queryParams?: Record<string, any>
}


export async function api(endpoint: string, { method = 'GET', body, headers = {}, queryParams }: ApiOptions = {}) {
  const url = new URL(`${API_BASE}${endpoint}`)
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => url.searchParams.append(key, String(value)))
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
    throw new Error(data?.error || `Request failed: ${response.status}`)
  }

  return data
}


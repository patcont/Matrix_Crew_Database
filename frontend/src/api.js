const API = (import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api').replace(/\/$/, '')

async function request(path, { method = 'GET', body } = {}) {
  const res = await fetch(`${API}/${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  })
  if (res.status === 204) return null
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const msg = typeof data === 'object' ? Object.values(data).flat().join(' ') : String(data)
    throw new Error(msg || `Error ${res.status}`)
  }
  return data
}

export const resource = (name) => ({
  list: () => request(`${name}/`),
  create: (body) => request(`${name}/`, { method: 'POST', body }),
  update: (id, body) => request(`${name}/${id}/`, { method: 'PATCH', body }),
  remove: (id) => request(`${name}/${id}/`, { method: 'DELETE' }),
})

export const naves = resource('naves')
export const tripulantes = resource('tripulantes')

import { useCallback, useEffect, useMemo, useState } from 'react'
import DigitalRain from './components/DigitalRain'
import EditDialog from './components/EditDialog'
import { naves as navesApi, tripulantes as tripApi } from './api'

export default function App() {
  const [tab, setTab] = useState('tripulantes')
  const [naves, setNaves] = useState([])
  const [crew, setCrew] = useState([])
  const [query, setQuery] = useState('')
  const [editing, setEditing] = useState(null) // { kind, item }
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    try {
      const [n, t] = await Promise.all([navesApi.list(), tripApi.list()])
      setNaves(n)
      setCrew(t)
      setError(null)
    } catch (e) {
      setError(e.message)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const q = query.trim().toLowerCase()
  const rows = useMemo(() => {
    const list = tab === 'naves' ? naves : crew
    return list.filter((r) =>
      [r.nombre, r.rol, r.nave_nombre].some((v) => v?.toLowerCase().includes(q)),
    )
  }, [tab, naves, crew, q])

  const remove = async (item) => {
    if (!window.confirm(`¿Borrar a ${item.nombre}?`)) return
    await (tab === 'naves' ? navesApi : tripApi).remove(item.id)
    load()
  }

  const save = async (values) => {
    const api = editing.kind === 'naves' ? navesApi : tripApi
    if (editing.item?.id) await api.update(editing.item.id, values)
    else await api.create(values)
    await load()
  }

  const fields =
    editing?.kind === 'naves'
      ? [{ name: 'nombre', label: 'Nombre de la nave', required: true }]
      : [
          { name: 'nombre', label: 'Nombre', required: true },
          { name: 'rol', label: 'Rol' },
          {
            name: 'nave',
            label: 'Nave',
            type: 'select',
            options: naves.map((n) => ({ value: n.id, label: n.nombre })),
          },
        ]

  return (
    <>
      <DigitalRain />
      <main className="panel">
        <header>
          <p className="prompt">&gt; wake up, operator_</p>
          <h1>Matrix Crew Database</h1>
          <div className="stats">
            <span><b>{crew.length}</b> tripulantes</span>
            <span><b>{naves.length}</b> naves</span>
          </div>
        </header>

        <nav className="tabs" role="tablist">
          {['tripulantes', 'naves'].map((t) => (
            <button key={t} role="tab" aria-selected={tab === t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>
              {t === 'naves' ? 'Naves' : 'Tripulantes'}
            </button>
          ))}
        </nav>

        <div className="toolbar">
          <input
            type="search"
            placeholder="Buscar…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Buscar"
          />
          <button className="primary" onClick={() => setEditing({ kind: tab, item: null })}>
            + Agregar {tab === 'naves' ? 'nave' : 'tripulante'}
          </button>
        </div>

        {error ? (
          <div className="error-box">
            <p>Sin conexión con la API ({error}).</p>
            <p>Levanta el backend Django con <code>python manage.py runserver</code>.</p>
            <button onClick={load}>Reintentar</button>
          </div>
        ) : (
          <table>
            <thead>
              {tab === 'naves' ? (
                <tr><th>Nave</th><th>Tripulantes</th><th /></tr>
              ) : (
                <tr><th>Nombre</th><th>Rol</th><th>Nave</th><th /></tr>
              )}
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td className="name">{r.nombre}</td>
                  {tab === 'naves' ? (
                    <td>{r.tripulantes}</td>
                  ) : (
                    <>
                      <td>{r.rol || '—'}</td>
                      <td>{r.nave_nombre ?? <span className="muted">sin nave</span>}</td>
                    </>
                  )}
                  <td className="actions">
                    <button onClick={() => setEditing({ kind: tab, item: r })}>Editar</button>
                    <button className="danger" onClick={() => remove(r)}>Borrar</button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={4} className="muted">No hay registros.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </main>

      <EditDialog
        open={!!editing}
        title={`${editing?.item ? 'Editar' : 'Agregar'} ${editing?.kind === 'naves' ? 'nave' : 'tripulante'}`}
        fields={fields}
        initial={editing?.item}
        onSave={save}
        onClose={() => setEditing(null)}
      />
    </>
  )
}

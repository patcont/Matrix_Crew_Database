import { useEffect, useRef, useState } from 'react'

/**
 * Generic create/edit dialog.
 * fields: [{ name, label, type?: 'text' | 'select', options?: [{value, label}], required? }]
 */
export default function EditDialog({ open, title, fields, initial, onSave, onClose }) {
  const ref = useRef(null)
  const [values, setValues] = useState({})
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const d = ref.current
    if (open) {
      setValues(initial ?? {})
      setError(null)
      if (!d.open) d.showModal()
    } else if (d.open) {
      d.close()
    }
  }, [open, initial])

  const submit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await onSave(values)
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <dialog ref={ref} onClose={onClose}>
      <form onSubmit={submit}>
        <h3>{title}</h3>
        {fields.map((f) => (
          <label key={f.name}>
            {f.label}
            {f.type === 'select' ? (
              <select
                value={values[f.name] ?? ''}
                onChange={(e) => setValues({ ...values, [f.name]: e.target.value ? Number(e.target.value) : null })}
              >
                <option value="">— Sin asignar —</option>
                {f.options.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            ) : (
              <input
                value={values[f.name] ?? ''}
                required={f.required}
                onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}
              />
            )}
          </label>
        ))}
        {error && <p className="error">{error}</p>}
        <div className="row">
          <button type="button" onClick={onClose}>Cancelar</button>
          <button className="primary" disabled={saving}>{saving ? 'Guardando…' : 'Guardar'}</button>
        </div>
      </form>
    </dialog>
  )
}

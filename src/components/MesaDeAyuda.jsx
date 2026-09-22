import { useState, useEffect } from 'react'
import Ticket from './Ticket'
import { TICKETS_INICIALES } from '../data/tickets'

function MesaDeAyuda() {
  const [tickets, setTickets] = useState(TICKETS_INICIALES)
  const [titulo, setTitulo] = useState('')
  const [prioridad, setPrioridad] = useState('Alta')
  const [errorTitulo, setErrorTitulo] = useState('')
  const [filtroPrioridad, setFiltroPrioridad] = useState('Todas')

  useEffect(() => {
    console.log(`Cantidad actual de tickets: ${tickets.length}`)
  }, [tickets])

  const agregarTicket = (e) => {
    e.preventDefault()

    if (titulo.trim().length < 5) {
      setErrorTitulo('El título debe tener al menos cinco caracteres')
      return
    }

    setErrorTitulo('')

    const nuevoTicket = {
      id: Date.now(),
      titulo: titulo.trim(),
      prioridad,
      estado: 'Abierto'
    }

    setTickets((ticketsActuales) => [...ticketsActuales, nuevoTicket])
    setTitulo('')
    setPrioridad('Alta')
  }

  const avanzarTicket = (id) => {
    setTickets((ticketsActuales) =>
      ticketsActuales.map((ticket) => {
        if (ticket.id !== id) return ticket

        if (ticket.estado === 'Abierto') {
          return { ...ticket, estado: 'En proceso' }
        }

        if (ticket.estado === 'En proceso') {
          return { ...ticket, estado: 'Cerrado' }
        }

        return ticket
      })
    )
  }

  const ticketsVisibles = tickets.filter((ticket) => {
    if (filtroPrioridad === 'Todas') return true
    return ticket.prioridad === filtroPrioridad
  })

  const abiertos = tickets.filter((ticket) => ticket.estado === 'Abierto').length
  const enProceso = tickets.filter((ticket) => ticket.estado === 'En proceso').length
  const cerrados = tickets.filter((ticket) => ticket.estado === 'Cerrado').length

  return (
    <div className="container mt-4">
      <h1 className="h3 mb-1">Mesa de ayuda</h1>
      <p className="text-muted small mb-4">Soporte Técnico · Universidad Técnica Latinoamericana</p>

      <form onSubmit={agregarTicket} className="mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Título del ticket"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <select
            className="form-select"
            style={{ maxWidth: 140 }}
            value={prioridad}
            onChange={(e) => setPrioridad(e.target.value)}
          >
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>
          <button type="submit" className="btn btn-primary">
            Agregar
          </button>
        </div>

        {errorTitulo && <div className="text-danger small mt-1">{errorTitulo}</div>}
      </form>

      <div className="d-flex align-items-center gap-2 mt-4 mb-2">
        <label className="small text-muted mb-0">Filtrar por prioridad</label>
        <select
          className="form-select form-select-sm"
          style={{ maxWidth: 140 }}
          value={filtroPrioridad}
          onChange={(e) => setFiltroPrioridad(e.target.value)}
        >
          <option value="Todas">Todas</option>
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Baja">Baja</option>
        </select>
      </div>

      <ul className="list-group mb-3">
        {ticketsVisibles.map((ticket) => (
          <Ticket
            key={ticket.id}
            titulo={ticket.titulo}
            prioridad={ticket.prioridad}
            estado={ticket.estado}
            onAvanzar={() => avanzarTicket(ticket.id)}
          />
        ))}
      </ul>

      <div className="text-muted small">
        Abiertos: <strong>{abiertos}</strong> · En proceso: <strong>{enProceso}</strong> · Cerrados:{' '}
        <strong>{cerrados}</strong>
      </div>
    </div>
  )
}

export default MesaDeAyuda

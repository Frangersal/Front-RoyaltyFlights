import React, { useState, useRef, useEffect } from 'react'
import '../assets/styles/Hero.css'

import logoSrc from '../assets/images/franksflights-logo-darkmode.png'
import cities from '../data/json/cities.json'

export default function Hero() {
    const [tab, setTab] = useState('redondo')
    // Manejadores y clases computadas para las pestañas
    // (se colocan fuera del JSX retornado para mantener el render limpio)
    const handleSelect = (name) => (e) => { e.preventDefault(); setTab(name) }
    // Clases computadas para las pestañas (Redondo / Sencillo):
    // - Si `tab` coincide con la pestaña, se aplica la clase `active` para resaltarla.
    // - Si no, se aplica `nav-link-ff-off` para el estado inactivo.
    const classSencillo = `nav-link ${tab === 'sencillo' ? 'active' : 'nav-link-ff-off'}`
    const classRedondo = `nav-link ${tab === 'redondo' ? 'active' : 'nav-link-ff-off'}`
    // Refs para los inputs de fecha y función para abrir el selector nativo.
    // Resumen de `openDatePicker(which)`:
    // - Devuelve un manejador que previene el comportamiento por defecto del enlace.
    // - Selecciona el ref objetivo: `salidaRef` o `regresoRef` según `which`.
    // - Intenta usar la API moderna `showPicker()` si está disponible (mejor experiencia móvil/desktop).
    // - Si showPicker no existe o falla, aplica un fallback que hace focus y simula un click en el input.
    const salidaDateRef = useRef(null)
    const salidaTimeRef = useRef(null)
    const regresoDateRef = useRef(null)
    const regresoTimeRef = useRef(null)
    const openDatePicker = (which) => (e) => {
        // evitar el comportamiento por defecto del enlace
        if (e && e.preventDefault) e.preventDefault()
        const ref = which === 'salida' ? salidaDateRef : regresoDateRef
        if (ref && ref.current) {
            try {
                if (typeof ref.current.showPicker === 'function') {
                    ref.current.showPicker()
                    return
                }
            } catch (err) {
            }
            ref.current.focus()
            try { ref.current.click() } catch (e) { /* ignorar */ }
        }
    }
    // Abrir selector específico para inputs de tiempo (usa showPicker() cuando esté disponible).
    const openTimePicker = (ref) => (e) => {
        if (e && e.stopPropagation) e.stopPropagation()
        if (ref && ref.current) {
            try {
                if (typeof ref.current.showPicker === 'function') {
                    ref.current.showPicker()
                    return
                }
            } catch (err) {
                // ignorar
            }
            ref.current.focus()
            try { ref.current.click() } catch (err) { /* ignorar */ }
        }
    }
    const isSencillo = tab === 'sencillo'
    const arrowNode = !isSencillo ? (
        <div className="col-auto arrow-col d-flex justify-content-center">
            <i className="fa-solid fa-arrow-right arrow-icon" aria-hidden="true"></i>
        </div>
    ) : null
    // Fecha/hora por defecto: ahora (datetime-local). Usamos un solo input por campo.
    const formatDateTimeLocal = (d) => {
        const yy = d.getFullYear()
        const mm = String(d.getMonth() + 1).padStart(2, '0')
        const dd = String(d.getDate()).padStart(2, '0')
        const hh = String(d.getHours()).padStart(2, '0')
        const min = String(d.getMinutes()).padStart(2, '0')
        return `${yy}-${mm}-${dd}T${hh}:${min}`
    }

    const now = new Date()
    now.setSeconds(0, 0)
    const defaultSalidaDateTime = formatDateTimeLocal(now)
    const [salidaDateTime, setSalidaDateTime] = useState(defaultSalidaDateTime)

    // Helper: sumar días a una fecha ISO (YYYY-MM-DD)
    const addDaysISO = (iso, days) => {
        const [y, m, d] = iso.split('-').map(Number)
        const dt = new Date(y, m - 1, d)
        dt.setDate(dt.getDate() + days)
        const yy = dt.getFullYear()
        const mm = String(dt.getMonth() + 1).padStart(2, '0')
        const dd = String(dt.getDate()).padStart(2, '0')
        return `${yy}-${mm}-${dd}`
    }

    // Añade días a un ISO datetime-local (YYYY-MM-DDTHH:MM) y devuelve formato datetime-local
    const addDaysDateTime = (isoDateTime, days) => {
        const dt = new Date(isoDateTime)
        dt.setDate(dt.getDate() + days)
        return formatDateTimeLocal(dt)
    }

    // Normaliza una hora 'HH:MM' a la media hora más cercana (00 o 30 minutos).
    // Si la entrada está vacía o no válida devuelve cadena vacía.
    const snapToHalfHour = (timeStr) => {
        if (!timeStr) return ''
        const parts = timeStr.split(':')
        if (parts.length < 2) return ''
        let hh = parseInt(parts[0], 10)
        let mm = parseInt(parts[1], 10)
        if (Number.isNaN(hh) || Number.isNaN(mm)) return ''
        // Redondear a 00/30
        if (mm < 15) mm = 0
        else if (mm < 45) mm = 30
        else { mm = 0; hh = (hh + 1) % 24 }
        const HH = String(hh).padStart(2, '0')
        const MM = String(mm).padStart(2, '0')
        return `${HH}:${MM}`
    }

    // Helpers para separar y componer hora 'HH:MM'
    const splitTime = (timeStr) => {
        if (!timeStr) return ['', '']
        const parts = timeStr.split(':')
        return [parts[0] || '', parts[1] || '']
    }
    const buildTime = (hh, mm) => {
        if (hh === '' || mm === '') return ''
        return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`
    }

    const [regresoDateTime, setRegresoDateTime] = useState(formatDateTimeLocal(new Date(now.getTime() + 24 * 60 * 60 * 1000)))
    // Mensajes informativos temporales (por ejemplo, cuando redondeamos minutos)
    const [infoMessage, setInfoMessage] = useState('')
    const infoTimerRef = useRef(null)

    const showInfo = (msg, ms = 7000) => {
        if (infoTimerRef.current) clearTimeout(infoTimerRef.current)
        setInfoMessage(msg)
        infoTimerRef.current = setTimeout(() => setInfoMessage(''), ms)
    }

    const closeInfo = () => {
        if (infoTimerRef.current) { clearTimeout(infoTimerRef.current); infoTimerRef.current = null }
        setInfoMessage('')
    }

    // limpiar timer al desmontar
    useEffect(() => {
        return () => { if (infoTimerRef.current) clearTimeout(infoTimerRef.current) }
    }, [])

    // Ajusta un valor datetime-local según la regla solicitada:
    // - minutos 1..30 => se fijan a 30 (misma hora)
    // - minutos 31..59 => se fijan a 00 y se avanza a la siguiente hora
    // - minuto 0 queda como 00 (sin cambio)
    // Devuelve { rounded, changed }
    const snapDateTimeToHalfHour = (isoDateTime) => {
        if (!isoDateTime) return { rounded: isoDateTime, changed: false }
        const dt = new Date(isoDateTime)
        if (Number.isNaN(dt.getTime())) return { rounded: isoDateTime, changed: false }
        const mm = dt.getMinutes()
        let changed = false
        if (mm === 0) {
            // nada que hacer
        } else if (mm >= 1 && mm <= 30) {
            if (mm !== 30) { dt.setMinutes(30); changed = true }
        } else if (mm >= 31 && mm <= 59) {
            // fijar a 00 y avanzar hora
            dt.setMinutes(0)
            dt.setHours((dt.getHours() + 1) % 24)
            changed = true
        }
        dt.setSeconds(0, 0)
        const rounded = formatDateTimeLocal(dt)
        return { rounded, changed }
    }

    // Extrae 'HH:MM' de un datetime-local (YYYY-MM-DDTHH:MM)
    const timeFromDateTimeLocal = (isoDateTime) => {
        if (!isoDateTime) return ''
        // si viene en formato Date.stringify, convertir
        try {
            if (isoDateTime.includes && isoDateTime.includes('T')) {
                return isoDateTime.split('T')[1].slice(0,5)
            }
        } catch (err) { }
        // fallback
        const dt = new Date(isoDateTime)
        if (Number.isNaN(dt.getTime())) return ''
        const hh = String(dt.getHours()).padStart(2, '0')
        const mm = String(dt.getMinutes()).padStart(2, '0')
        return `${hh}:${mm}`
    }

    // Formatea a 12h con am/pm en minúsculas: '4:30 pm'
    const formatTo12Hour = (isoDateTime) => {
        if (!isoDateTime) return ''
        const dt = new Date(isoDateTime)
        if (Number.isNaN(dt.getTime())) return ''
        let hh = dt.getHours()
        const mm = String(dt.getMinutes()).padStart(2, '0')
        const ampm = hh >= 12 ? 'pm' : 'am'
        hh = hh % 12
        if (hh === 0) hh = 12
        return `${hh}:${mm} ${ampm}`
    }

    // Garantiza que la fecha de regreso sea al menos un día después de la fecha de salida.
    // - Calcula `minRegreso` como `salidaDate + 1 día`.
    // - Si `regresoDate` está vacío o es anterior a `minRegreso`, lo actualiza automáticamente.
    // - Se ejecuta cada vez que `salidaDate` cambia (por eso está en la dependencia).
    // Garantiza que la fecha/hora de regreso sea al menos un día después de la salida.
    useEffect(() => {
        const addDaysDateTime = (isoDateTime, days) => {
            const dt = new Date(isoDateTime)
            dt.setDate(dt.getDate() + days)
            return formatDateTimeLocal(dt)
        }
        const minRegreso = addDaysDateTime(salidaDateTime, 1)
        if (!regresoDateTime || regresoDateTime < minRegreso) setRegresoDateTime(minRegreso)
    }, [salidaDateTime])

    // Handlers que aplican el redondeo a 00/30 y muestran mensaje cuando ocurre
    const handleSalidaChange = (e) => {
        const val = e.target.value
        const { rounded, changed } = snapDateTimeToHalfHour(val)
        setSalidaDateTime(rounded)
        if (changed) {
            const hhmm = formatTo12Hour(rounded)
            const node = (
                <span>La hora se redondeó a <span style={{ textDecoration: 'underline', fontWeight: 700 }}>{hhmm}</span></span>
            )
            showInfo(node, 7000)
        }
    }

    const handleRegresoChange = (e) => {
        const val = e.target.value
        const { rounded, changed } = snapDateTimeToHalfHour(val)
        setRegresoDateTime(rounded)
        if (changed) {
            const hhmm = formatTo12Hour(rounded)
            const node = (
                <span>La hora se redondeó a <span style={{ textDecoration: 'underline', fontWeight: 700 }}>{hhmm}</span></span>
            )
            showInfo(node, 7000)
        }
    }

    // Extrae la fecha 'YYYY-MM-DD' de un datetime-local (o Date string)
    const dateFromDateTimeLocal = (isoDateTime) => {
        if (!isoDateTime) return null
        try {
            if (typeof isoDateTime === 'string' && isoDateTime.includes('T')) return isoDateTime.split('T')[0]
        } catch (err) { }
        const dt = new Date(isoDateTime)
        if (Number.isNaN(dt.getTime())) return null
        const yy = dt.getFullYear()
        const mm = String(dt.getMonth() + 1).padStart(2, '0')
        const dd = String(dt.getDate()).padStart(2, '0')
        return `${yy}-${mm}-${dd}`
    }

    // Maneja el clic en Reservar: construye un objeto con la info y lo guarda en localStorage
    const handleReservar = () => {
        // Validación mínima
        if (!selectedOrigin) { showInfo('Selecciona el origen antes de reservar', 5000); return }
        if (!selectedDestino) { showInfo('Selecciona el destino antes de reservar', 5000); return }

        const tipo = isSencillo ? 'sencillo' : 'redondo'
        const fechaSalida = dateFromDateTimeLocal(salidaDateTime)
        const horaSalida = timeFromDateTimeLocal(salidaDateTime)

        let fechaRegreso = null
        let horaRegreso = null
        if (!isSencillo && regresoDateTime) {
            fechaRegreso = dateFromDateTimeLocal(regresoDateTime)
            horaRegreso = timeFromDateTimeLocal(regresoDateTime)
        }

        const reserva = {
            tipo,
            origen: selectedOrigin,
            destino: selectedDestino,
            fechaSalida, // YYYY-MM-DD
            horaSalida,   // HH:MM
            fechaRegreso, // null si no aplica
            horaRegreso,  // null si no aplica
            personas: persons
        }

        try {
            const key = 'franksflights_appointment'
            const existing = JSON.parse(localStorage.getItem(key) || '[]')
            existing.push(reserva)
            localStorage.setItem(key, JSON.stringify(existing))
            // También guardar la última reserva por conveniencia
            localStorage.setItem('franksflights_last_appointment', JSON.stringify(reserva))
            showInfo('Reserva guardada en localStorage', 5000)
        } catch (err) {
            showInfo('No se pudo guardar la reserva en localStorage', 5000)
        }
    }

    // Nodo de 'Regreso':
    // - Se renderiza solo cuando no es 'sencillo' (es decir, para viajes redondos).
    // - El contenedor tiene un manejador `onClick` que abre el selector de fecha (openDatePicker).
    // - El input está ligado a `regresoDate` y su `min` se sincroniza con `salidaDate`
    //   para impedir seleccionar una fecha de regreso anterior a la salida.
    const regresoNode = !isSencillo ? (
        <div className="col">
            <div className="date-input-wrapper" onClick={openDatePicker('regreso')}>
                <input
                    ref={regresoDateRef}
                    value={regresoDateTime}
                    onChange={handleRegresoChange}
                    type="datetime-local"
                    id="regreso"
                    className="form-control date-input"
                    aria-label="Regreso"
                    min={addDaysDateTime(salidaDateTime, 1)}
                />
                <span className="date-placeholder">Regreso:</span>
            </div>
        </div>
    ) : null

    // Estado y lógica del modal de selección de ciudad (simula una "base de datos" local)
    const [showModal, setShowModal] = useState(false)
    const [modalTarget, setModalTarget] = useState(null) // 'origen' | 'destino'
    const [selectedOrigin, setSelectedOrigin] = useState('')
    const [selectedDestino, setSelectedDestino] = useState('')
    // Estado y lógica del spinner de personas (control visual con - y +, límite 1..10)
    const [persons, setPersons] = useState(2)
    const PERSONS_MIN = 1
    const PERSONS_MAX = 10
    const incrementPersons = () => setPersons(p => Math.min(PERSONS_MAX, p + 1))
    const decrementPersons = () => setPersons(p => Math.max(PERSONS_MIN, p - 1))
    const personsLabel = `${persons} ${persons === 1 ? 'persona' : 'personas'}`
    

    // Estilos inline del modal: overlay y caja (usados por el modal simple)
    const modalOverlayStyle = {
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', zIndex: 1050
    }
    const modalStyle = { background: '#fff', padding: '1rem', borderRadius: '6px', width: '320px', maxWidth: '90%' }

    // Abrir modal para elegir origen o destino
    const openModalFor = (target) => (e) => {
        if (e && e.preventDefault) e.preventDefault()
        setModalTarget(target)
        setShowModal(true)
    }

    // Resumen: Maneja la selección de una ciudad desde el modal.
    // - Si el modal estaba abierto para 'origen', asigna la ciudad a selectedOrigin.
    // - Si el modal estaba abierto para 'destino', asigna la ciudad a selectedDestino.
    // - Cierra el modal y limpia el target del modal.
    // Este bloque coordina el estado de la UI (origen/destino) con la selección del usuario.
    const selectCity = (city) => {
        if (modalTarget === 'origen') {
            setSelectedOrigin(city)
        } else if (modalTarget === 'destino') {
            setSelectedDestino(city)
        }
        setShowModal(false)
        setModalTarget(null)
    }

    return (
        <section className="bg-FranksFlights-index  yellow-section row">
            <div className="col-12 main-RF">
                <img className="img-logo-grande" src={logoSrc} alt="" />
                <h1 className="center h1-sobrevuela">SOBREVUELA
                </h1>
                <h1 className="center h1-sobrevuela"> GUERRERO </h1>
                <h2 className="center h2-reserva"> ¡RESERVA YA! </h2>
                <div className="center box-h3-telefono">
                    <h3 className="center h3-telefono">
                        <b> (+52) 744-123-4567 </b>
                    </h3>
                </div>

                <div className="nav-flights-box">
                    <div className="nav-flights-box-son">
                        <div className="card card-ff text-center">
                            <div className="card-header card-header-ff">
                                <ul className="nav nav-tabs card-header-tabs">
                                    <li className="nav-item">
                                        <a href="#" className={classRedondo} onClick={handleSelect('redondo')}>Redondo</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className={classSencillo} onClick={handleSelect('sencillo')}>Sencillo</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="card-body ">
                                <div className="row g-3 align-items-center">
                                    <div className="col">
                                        <a href="#" className="form-control origin-input" onClick={openModalFor('origen')}
                                            aria-label="Origen">{selectedOrigin || 'Origen'}</a>
                                    </div>
                                    <div className="col-auto arrow-col d-flex justify-content-center">
                                        <i className="fa-solid fa-arrow-right arrow-icon" aria-hidden="true"></i>
                                    </div>

                                    <div className="col">
                                        {selectedOrigin ? (
                                            <a href="#" className="form-control destination-input" onClick={openModalFor('destino')} aria-label="Destino">{selectedDestino || 'Destino'}</a>
                                        ) : (
                                            <input type="text" className="form-control" placeholder="Destino" aria-label="Destino" disabled />
                                        )}
                                    </div>
                                </div>
                                <br />
                                <div className="row g-3 align-items-center">
                                    <div className="col">
                                        <div className="date-input-wrapper" onClick={openDatePicker('salida')}>
                                            <input
                                                ref={salidaDateRef}
                                                value={salidaDateTime}
                                                onChange={handleSalidaChange}
                                                type="datetime-local"
                                                id="salida"
                                                className="form-control date-input"
                                                aria-label="Salida"
                                                min={formatDateTimeLocal(new Date())}
                                            />
                                            <span className="date-placeholder">Salida:</span>
                                        </div>
                                    </div>
                                    {arrowNode}
                                    {regresoNode}
                                </div>
                                <hr />
                                <div className="row g-3">
                                    <div className="col">
                                        <div className="input-group">
                                            <button type="button" className="btn btn-dark" aria-label="Disminuir personas" onClick={decrementPersons} disabled={persons <= PERSONS_MIN}>-</button>
                                            <input type="text" readOnly className="form-control text-center" value={personsLabel} aria-label="Personas" />
                                            <button type="button" className="btn btn-dark" aria-label="Aumentar personas" onClick={incrementPersons} disabled={persons >= PERSONS_MAX}>+</button>
                                        </div>
                                        {/* mensaje moved to toast container */}
                                    </div>
                                    <div className="col">
                                        <button type="button" className="btn btn-dark w-100" onClick={handleReservar}>Reservar</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal simple para seleccionar ciudad (3 ciudades de Guerrero) */}
                {showModal && (
                    <div style={modalOverlayStyle} onClick={() => setShowModal(false)}>
                        <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                            <h5>Selecciona {modalTarget === 'origen' ? 'origen' : 'destino'}</h5>
                            <ul className="list-unstyled">
                                {cities.map((c) => (
                                    <li key={c} style={{ margin: '0.5rem 0' }}>
                                        <button type="button" className="btn btn-outline-primary w-100" onClick={() => selectCity(c)}>{c}</button>
                                    </li>
                                ))}
                            </ul>
                            <div className="text-end">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Toast container bottom-right (fuera del card) */}
                <div aria-live="polite" aria-atomic="true" style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1060 }}>
                    {infoMessage && (
                        <div className="toast show" role="status" style={{ backgroundColor: '#198754', color: '#fff', padding: '0.75rem 1rem', borderRadius: '8px', minWidth: '220px' }}>
                            <div style={{ position: 'relative' }}>
                                <button aria-label="Cerrar" onClick={closeInfo} style={{ position: 'absolute', top: -6, right: -6, background: 'transparent', border: 'none', color: '#fff', fontSize: '1.25rem', lineHeight: 1, cursor: 'pointer' }}>×</button>
                                <div style={{ fontSize: '1.1rem' }}>
                                    {infoMessage}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </section>
    )
}

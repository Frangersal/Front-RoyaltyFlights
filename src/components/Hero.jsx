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
    const salidaRef = useRef(null)
    const regresoRef = useRef(null)
    const openDatePicker = (which) => (e) => {
        // evitar el comportamiento por defecto del enlace
        if (e && e.preventDefault) e.preventDefault()
        const ref = which === 'salida' ? salidaRef : regresoRef
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
    const isSencillo = tab === 'sencillo'
    const arrowNode = !isSencillo ? (
        <div className="col-auto arrow-col d-flex justify-content-center">
            <i className="fa-solid fa-arrow-right arrow-icon" aria-hidden="true"></i>
        </div>
    ) : null
    // Fecha por defecto para salida: hoy (YYYY-MM-DD)
    const todayStr = (() => {
        const d = new Date()
        const y = d.getFullYear()
        const m = String(d.getMonth() + 1).padStart(2, '0')
        const day = String(d.getDate()).padStart(2, '0')
        return `${y}-${m}-${day}`
    })()
    const [salidaDate, setSalidaDate] = useState(todayStr)

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

    const [regresoDate, setRegresoDate] = useState(addDaysISO(todayStr, 1))

    // Garantiza que la fecha de regreso sea al menos un día después de la fecha de salida.
    // - Calcula `minRegreso` como `salidaDate + 1 día`.
    // - Si `regresoDate` está vacío o es anterior a `minRegreso`, lo actualiza automáticamente.
    // - Se ejecuta cada vez que `salidaDate` cambia (por eso está en la dependencia).
    useEffect(() => {
        const minRegreso = addDaysISO(salidaDate, 1)
        if (!regresoDate || regresoDate < minRegreso) setRegresoDate(minRegreso)
    }, [salidaDate])

    // Nodo de 'Regreso':
    // - Se renderiza solo cuando no es 'sencillo' (es decir, para viajes redondos).
    // - El contenedor tiene un manejador `onClick` que abre el selector de fecha (openDatePicker).
    // - El input está ligado a `regresoDate` y su `min` se sincroniza con `salidaDate`
    //   para impedir seleccionar una fecha de regreso anterior a la salida.
    const regresoNode = !isSencillo ? (
        <div className="col">
            <div className="date-input-wrapper" onClick={openDatePicker('regreso')}>
                <input ref={regresoRef} value={regresoDate} onChange={(e) => setRegresoDate(e.target.value)} type="date" id="regreso" className="form-control date-input"
                    aria-label="Regreso" min={salidaDate} />
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
                                            <input ref={salidaRef} value={salidaDate} onChange={(e) => setSalidaDate(e.target.value)} type="date" id="salida" className="form-control date-input"
                                                aria-label="Salida" min={todayStr} />
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
                                    </div>
                                    <div className="col">
                                        <button type="button" className="btn btn-dark w-100">Buscar</button>
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

            </div>
        </section>
    )
}

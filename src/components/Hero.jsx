import React from 'react'
import '../assets/styles/Hero.css'

import logoSrc from '../assets/images/franksflights-logo-darkmode.png'

export default function Hero() {
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
                                        <a className="nav-link active" aria-current="true" href="#">Sencillo</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link nav-link-ff-off" href="#">Redondo</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="card-body ">
                                {/* Formulario */}
                                <div className="row g-3 align-items-center">
                                    <div className="col">
                                        <input type="text" className="form-control" placeholder="Origen"
                                            aria-label="Origen" />
                                    </div>
                                    <div className="col-auto arrow-col d-flex justify-content-center">
                                        <i className="fa-solid fa-arrow-right arrow-icon" aria-hidden="true"></i>
                                    </div>

                                    <div className="col">
                                        <input type="text" className="form-control" placeholder="Destino"
                                            aria-label="Destino" />
                                    </div>
                                </div>
                                <br />
                                <div className="row g-3 align-items-center">
                                    <div className="col">
                                        <div className="date-input-wrapper">
                                            <input type="date" id="salida" className="form-control date-input"
                                                aria-label="Salida" />
                                            <span className="date-placeholder">Salida: dd/mm/aaaa</span>
                                        </div>
                                    </div>
                                    <div className="col-auto arrow-col d-flex justify-content-center">
                                        <i className="fa-solid fa-arrow-right arrow-icon" aria-hidden="true"></i>
                                    </div>
                                    <div className="col">
                                        <div className="date-input-wrapper">
                                            <input type="date" id="regreso" className="form-control date-input"
                                                aria-label="Regreso" />
                                            <span className="date-placeholder">Regreso: dd/mm/aaaa</span>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="row g-3">
                                    <div className="col">
                                        <input type="text" className="form-control" placeholder="Personas"
                                            aria-label="Personas" />
                                    </div>
                                    <div className="col">
                                        <button type="button" className="btn btn-dark w-100">Buscar</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

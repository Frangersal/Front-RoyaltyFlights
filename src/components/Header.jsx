import React from 'react'

import logoSrc from '../assets/images/franksflights-grologo-darkmode.png'

export default function Header() {
    return (
        <header className="container-fluid">
            <nav className="navbar navbar-expand-sm navbar-dark fixed-top" id="myNavbar">

                <a className="navbar-brand logo-container" style={{ width: '80px', marginLeft: '4rem' }} href="#">

                    <img src={logoSrc} className="img-nav" alt="Logotipo de Frank's Flights" />
                </a>
                <button className="navbar-toggler d-lg-none d-xl-none d-xxl-none" style={{ marginRight: '4rem' }} type="button"
                    data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fa-solid fa-bars" style={{ color: '#ffffff' }}></i>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <ul className="navbar-nav me-auto mt-2 mt-lg-0 neo-sm">
                        <li className="nav-item bar-item center">
                            <a className="nav-link bar-link active" href="#inicio" aria-current="page">Inicio </a>
                        </li>
                        <li className="nav-item bar-item center">
                            <a className="nav-link bar-link" href="#servicios">Quienes somos</a>
                        </li>
                        <li className="nav-item bar-item center">
                            <a className="nav-link bar-link" href="#">Apartar vuelo</a>
                        </li>
                        {/* <li className="nav-item bar-item center">
                            <a className="nav-link bar-link" href="#">Preguntas</a>
                        </li> */}
                        <li className="nav-item bar-item center">
                            <a className="nav-link bar-link" href="#blog">Blog</a>
                        </li>
                        <li className="nav-item bar-item center">
                            <a className="nav-link bar-link" href="#contacto">Contacto</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

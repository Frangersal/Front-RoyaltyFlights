import React from 'react'
import '../assets/styles/Footer.css'

export default function Footer() {
    return (
        <footer className="cbg-mapa row">
            <div className="row center">
                <div className=" col-sm-12 col-md-6">
                    <h1 id="contacto">Contactate con nosotros</h1>
                    <p>
                        Nuestros servicios son para todo Guerrero
                    </p>
                    <span><b>Aeródromo: </b> <br />Central América 9 Avenida 14-75 <br /> Guerrero, 01013, Guerrero</span>
                    <br />
                    <span><b>Telefono: </b>(+52)744-123-4567</span> <br />
                    <span><b>Email: </b>franksflights502@gmail.com</span>
                    <br /><br />
                    <h2>Nuestras redes</h2>
                    <i className="fa-brands fa-facebook " style={{ color: '#000000', fontSize: '20px', marginRight: '20px' }}></i>
                    <i className="fa-brands fa-instagram " style={{ color: '#000000', fontSize: '20px' }}></i>
                </div>
                <div className=" col-sm-12 col-md-6 ">
                    <form>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="nombre">Nombre:</label>
                                    <input type="text" className="form-control" id="nombre" placeholder="Ingrese su nombre" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="apellido">Apellido:</label>
                                    <input type="text" className="form-control" id="apellido"
                                        placeholder="Ingrese su apellido" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="correo">Correo:</label>
                                    <input type="email" className="form-control" id="correo"
                                        placeholder="Ingrese su correo electrónico" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <hr />
                                    <label htmlFor="mensaje">Mensaje:</label>
                                    <textarea className="form-control" id="mensaje" rows="5"
                                        placeholder="Ingrese su mensaje"></textarea>
                                </div>
                            </div>
                        </div>
                        <br />
                        <button type="submit" className="btn btn-dark btn-RF-contacto">Enviar</button>
                        <br /><br />
                    </form>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 center">
                    <span>Frank's Flights © 2025</span>
                </div>
            </div>
        </footer>
    )
}

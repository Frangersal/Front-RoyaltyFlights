import React from 'react'
import '../assets/styles/Services.css'

export default function Services() {
    return (
        <section className="bg-FranksFlights-service red-section nuestros-servicios row ">
            <div className=" row">
                <h1 className="titulo-1_h1 pt-2" id="servicios">
                    Nuestros servicios
                </h1>
                <p className="subtexto-blog">
                    Atrévete a vivir experiencias únicas que solo nosotros te podemos ofrecer!
                </p>
                <div className="row center-top">
                    <div className=" col-sm-12  col-md-3 ">
                        <div className="row">
                            <div className="col-2 ">
                                <div className="icon-service">
                                    <i className=" fa-solid fa-plane" style={{ color: '#000000' }}></i>
                                </div>
                            </div>
                            <div className="col-10 ">
                                <h2>
                                    Sobre vuelos en avionetas
                                </h2>
                                <p>
                                    30 minutos como mínimo - A partir de Q329 Vuelos desde 30 min, hasta 5 personas. Se
                                    realiza él sobrevueló por la ciudad, el Lago Amatilán ll+an y otros.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className=" col-sm-12  col-md-3 ">
                        <div className="row">
                            <div className="col-2 ">
                                <div className="icon-service">
                                    <i className=" fa-solid fa-moon" style={{ color: '#000000' }}></i>
                                </div>
                            </div>
                            <div className="col-10 ">
                                <h2>
                                    Sobre vuelos nocturnos
                                </h2>
                                <p>
                                    1 hora como mínimo - A partir de Q2,249 Vuelos desde 1 hora, hasta 5 personas. Se
                                    realiza él sobre vuelo por la ciudad, el Lago Amatilán y otros.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className=" col-sm-12  col-md-3 ">
                        <div className="row">
                            <div className="col-2 ">
                                <div className="icon-service">
                                    <i className="fa-solid fa-helicopter" style={{ color: '#000000' }}></i>
                                </div>
                            </div>
                            <div className="col-10 ">
                                <h2>
                                    Sobre vuelos nocturnos
                                </h2>
                                <p>
                                    1 hora como mínimo - A partir de Q699 Un viaje de 20 min, onde sobrevolamos la
                                    ciudad y el Lago Amatilán. EL viaje debe ser mínimo 3 personas.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row  center-top">
                    <div className=" col-sm-12  col-md-3 ">
                        <div className="row">
                            <div className="col-2 ">
                                <div className="icon-service">
                                    <i className="fa-solid fa-plane-arrival" style={{ color: '#000000' }}></i>
                                </div>
                            </div>
                            <div className="col-10 ">
                                <h2>
                                    Vuelos al interior
                                </h2>
                                <p>
                                    45 minutos como mínimo - Precio variable El precio puede variar por el número de
                                    personas, si es de ida y vuelta, el tiempo de estadía y lugar
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className=" col-sm-12  col-md-3 ">
                        <div className="row">
                            <div className="col-2 ">
                                <div className="icon-service">
                                    <i className="fa-solid fa-heart" style={{ color: '#000000' }}></i>
                                </div>
                            </div>
                            <div className="col-10 ">
                                <h2>
                                    Citas con sobrecuelo
                                </h2>
                                <p>
                                    45 minutos como mínimo - A partir de Q2,449 Una cita muy especial con sobre vuelo
                                    por la ciudad y el Lago Amatilán, que incluye fotos profesionales digitales,
                                    botella.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className=" col-sm-12  col-md-3 ">
                        <div className="row">
                            <div className="col-2 ">
                                <div className="icon-service">
                                    <i className="fa-solid fa-venus-mars" style={{ color: '#000000' }}></i>
                                </div>
                            </div>
                            <div className=" col-10 ">
                                <h2>
                                    Revelación del sexo
                                </h2>
                                <p>
                                    Sobrevolamos la zona donde se encuentra la fiesta, para soltar un polvo según el
                                    género del bebé.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

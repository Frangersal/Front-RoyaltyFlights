import { useState } from 'react'
import './assets/styles/App.css'
import logoSrc from './assets/images/franksflights-grologo-darkmode.png'
import cardImage from './assets/images/computadora.webp'
import './assets/styles/style.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* header adaptado a JSX */}
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
              <li className="nav-item bar-item center">
                <a className="nav-link bar-link" href="#">Preguntas</a>
              </li>
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
      <main className="container-fluid">
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
            {/* 
                <button type="button" className="btn btn-dark btn-RF">
                    <b>
                        Reserva tu vuelo
                    </b>
                </button> 
                */}

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


            {/* 
                ...sección comentada originalmente...
                */}
          </div>
        </section>
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
        <section className="nuestros-servicios bg-blog row ">
          <div className=" row">
            <h1 className="titulo-1_h1 pt-2" id="blog">
              Nuestro Blog
            </h1>
            <p className="subtexto-blog">
              ¡Leé y descubre nuestras formas de vivir aventuras, te invitamos a explorar desde el dia a dia de
              los pilotos, hasta los viajes de nuestros clientes con cada uno de nuestros servicios que tenemos
              para ti!
            </p>
            <div className="row center">

              <div className=" col-sm-12  col-md-3 ">
                <div className="row center">
                  <div className="col-9 ">
                    <div className="card" style={{ width: '18rem', marginBottom: '1rem' }}>
                      <span className="badge rounded-pill bg-primary"
                        style={{ width: '9rem', margin: '0.5rem 0.5rem 0.5rem 8rem' }}>Primary</span>
                      <img src={cardImage} className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make
                          up the bulk of the card's content.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" col-sm-12  col-md-3 ">
                <div className="row center">
                  <div className="col-9 ">
                    <div className="card" style={{ width: '18rem', marginBottom: '1rem' }}>
                      <span className="badge rounded-pill bg-primary"
                        style={{ width: '9rem', margin: '0.5rem 0.5rem 0.5rem 8rem' }}>Primary</span>
                      <img src={cardImage} className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make
                          up the bulk of the card's content.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" col-sm-12  col-md-3 ">
                <div className="row center">
                  <div className="col-9 ">
                    <div className="card" style={{ width: '18rem', marginBottom: '1rem' }}>
                      <span className="badge rounded-pill bg-primary"
                        style={{ width: '9rem', margin: '0.5rem 0.5rem 0.5rem 8rem' }}>Primary</span>
                      <img src={cardImage} className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make
                          up the bulk of the card's content.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="nuestros-servicios bg-mapa row" id="mapa">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1487.711971683413!2d-99.87136284767318!3d16.8593191020477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ca59997564c917%3A0x28c0d290e97afcad!2sAv%20Costera%20Miguel%20Alem%C3%A1n%20220%2C%20Fracc%20Magallanes%2C%20Las%20Playas%2C%2039340%20Acapulco%20de%20Ju%C3%A1rez%2C%20Gro.!5e0!3m2!1ses-419!2smx!4v1756771853935!5m2!1ses-419!2smx"
            width="600" height="450" style={{ border: 0, marginTop: '9rem' }} allowFullScreen loading="lazy"
            referrerPolicy="no-referrer-when-downgrade" />
        </section>
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
      </main>

    </>
  )
}

export default App
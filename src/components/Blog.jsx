import React from 'react'
import '../assets/styles/Blog.css'
import cardImage from '../assets/images/computadora.webp'

export default function Blog() {
    return (
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
    )
}

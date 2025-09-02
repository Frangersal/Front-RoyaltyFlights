import React from 'react'
import '../assets/styles/Map.css'

export default function Map() {
    return (
        <section className="nuestros-servicios bg-mapa row" id="mapa">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1487.711971683413!2d-99.87136284767318!3d16.8593191020477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ca59997564c917%3A0x28c0d290e97afcad!2sAv%20Costera%20Miguel%20Alem%C3%A1n%20220%2C%20Fracc%20Magallanes%2C%20Las%20Playas%2C%2039340%20Acapulco%20de%20Ju%C3%A1rez%2C%20Gro.!5e0!3m2!1ses-419!2smx!4v1756771853935!5m2!1ses-419!2smx"
                width="600" height="450" style={{ border: 0, marginTop: '9rem' }} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" />
        </section>
    )
}

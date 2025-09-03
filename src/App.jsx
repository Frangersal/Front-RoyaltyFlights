import { useState } from 'react'
import './assets/styles/App.css'
import cardImage from './assets/images/computadora.webp'
import './assets/styles/style.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Blog from './components/Blog'
import Map from './components/Map'
import Footer from './components/Footer'

function App() {
  
  return (
    <>
      <Header />

      <main className="container-fluid">
        <Hero />
        <Services />
        <Blog />
        <Map />
        <Footer />

      </main>

    </>
  )
}

export default App
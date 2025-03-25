import './App.css';
import React from 'react';
import Hero from './components/sections/Hero';
import Portfolio from './components/sections/Portfolio';
import AboutUs from './components/sections/AboutUs';
import BuildingJourney from './components/sections/BuildingJourney';
import Contact from './components/sections/Contact';
import Navbar from './components/layout/Navbar';

function App() {
  return (
    <div id="outer-container" className="relative overflow-x-hidden">
      <main id="page-wrap" className="relative">
        <Navbar />
        <Hero />
        <AboutUs />
        <Portfolio />
        <BuildingJourney />
        <Contact />
      </main>
    </div>
  );
}

export default App;
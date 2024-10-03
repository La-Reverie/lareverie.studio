import React from 'react';
import Header from './components/Header';
import Frame from './components/Frame';
import Hero from './components/Hero';
import About from './components/About';
import Expertise from './components/Expertise';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Spline from '@splinetool/react-spline';
import './global.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Frame />
      <Hero />
      <About />
      <Expertise />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;

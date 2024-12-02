import React from 'react';
import Header from './components/Header';
import Frame from './components/Frame';
import Hero from './components/Hero';
import ScrollIndicator from './components/ScrollIndicator';
import Home from './components/Home';
import WhoWeAre from './components/WhoWeAre';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
// import Spline from '@splinetool/react-spline';
import './global.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Frame />
      <Hero />
      <ScrollIndicator />
      <Home />
      <WhoWeAre />
      <Team />
      {/* <Contact /> */}
      <Footer />
    </div>
  );
}

export default App;

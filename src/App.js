import React from 'react';
import Header from './components/Header';
import Frame from './components/Frame';
import Hero from './components/Hero';
import ScrollIndicator from './components/ScrollIndicator';
import Home from './components/Home';
import WhoWeAre from './components/WhoWeAre';
import Team from './components/Team';
// import Contact from './components/Contact';
import Footer from './components/Footer';
// import Spline from '@splinetool/react-spline';
import './global.css';
import './App.css';

function App() {

    const images = [
        
        '/img/pic2.jpg',
        '/img/video.mp4'
    ];
    
    const uniforms = {
        radius: { value: 0.9, min: 0.1, max: 2 },
        width: { value: 0.35, min: 0, max: 1 },
    };

  return (
    <div className="App">
      <Header />
      <Frame />
      <Hero images={images} uniforms={uniforms} />  {/* Pass images and uniforms */}
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
import React from 'react';
import Header from './components/Header';
import Frame from './components/Frame';
import Hero from './components/Hero';
// import Pseudo3DBackground from './components/Pseudo3DBackground';
import Home from './components/Home';
import Sales from './components/Sales';
import TheStudio from './components/TheStudio';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
// import FeaturedWork from './components/FeaturedWork';
import './global.css';
import './App.css';

function App() {
    
    return (
        <div className="App">
            {/* <Pseudo3DBackground 
                image="/img/woman.jpeg"
                depthMap="/img/woman.png"
            /> */}
            <Header />
            <Frame />
            <Hero />
            <Home />
            <Sales />
            {/* <FeaturedWork /> */}
            <TheStudio />
            <Team />
            <Contact />
            <Footer />
        </div>
    );
}

export default App;
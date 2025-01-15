import React from 'react';
import Header from './components/Header';
import Frame from './components/Frame';
import Hero from './components/Hero';
import Pseudo3DBackground from './components/Pseudo3DBackground';
import ScrollIndicator from './components/ScrollIndicator';
import Home from './components/Home';
import TheStudio from './components/TheStudio';
import Team from './components/Team';
import Footer from './components/Footer';
import FeaturedWork from './components/FeaturedWork';
import './global.css';
import './App.css';

function App() {
    const images = [
        '/img/ideas.jpg',
        '/img/video.mp4'
    ];
    
    const uniforms = {
        radius: { value: 0.9, min: 0.1, max: 2 },
        width: { value: 0.35, min: 0, max: 1 },
    };

    return (
        <div className="App">
            <Pseudo3DBackground 
                image="/img/woman.jpeg"
                depthMap="/img/woman.png"
            />
            <Header />
            <Frame />
            <Hero images={images} uniforms={uniforms} />
            <ScrollIndicator />
            <Home />
            <FeaturedWork />
            <TheStudio />
            <Team />
            <Footer />
        </div>
    );
}

export default App;
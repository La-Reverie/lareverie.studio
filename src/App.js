import React from 'react';
import Header from './components/Header';
import Frame from './components/Frame';
import Hero from './components/Hero';
// import Pseudo3DBackground from './components/Pseudo3DBackground';
import Home from './components/Home';
import DynamicSceneLoader from './components/DynamicSceneLoader';
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
            <div className="w-full h-screen">
                <DynamicSceneLoader />
            </div>
            {/* <Pseudo3DBackground 
                image="/img/woman.jpeg"
                depthMap="/img/woman.png"
            /> */}
            <Frame />
            <Header />
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
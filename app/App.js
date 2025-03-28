import React from 'react';
import Header from '../app/components/Header';
import Frame from '../app/components/Frame';
import Hero from '../app/components/Hero';
// import Pseudo3DBackground from './components/Pseudo3DBackground';
import Home from '../app/components/Home';
// import DynamicSceneLoader from '../app/components/DynamicSceneLoader';
import Sales from '../app/components/Sales';
import TheStudio from '../app/components/TheStudio';
import Team from '../app/components/Team';
import Contact from '../app/components/Contact';
import Footer from '../app/components/Footer';
// import FeaturedWork from './components/FeaturedWork';
import './global.css';
import './App.css';

function App() {
    return (
        <div className="App">
            <div className="w-full h-screen">
                {/* <DynamicSceneLoader /> */}
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
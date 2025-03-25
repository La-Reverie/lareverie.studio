'use client'

import React from 'react';
import Header from './components/Header';
import Frame from './components/Frame';
import Hero from './components/Hero';
import Home from './components/Home';
// import DynamicSceneLoader from './components/DynamicSceneLoader';
import Sales from './components/Sales';
import TheStudio from './components/TheStudio';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Page() {
  return (
    <div className="App">
      <div className="w-full h-screen">
        {/* <DynamicSceneLoader /> */}
      </div>
      <Frame />
      <Header />
      <Hero />
      <Home />
      <Sales />
      <TheStudio />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
}
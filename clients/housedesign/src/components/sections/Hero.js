import React from 'react';
import Fake3D from '../ui/Fake3D';

const Hero = () => {
  return (
    <section className="relative h-screen overflow-hidden">
      <div className="absolute inset-0">
        <Fake3D 
          image="/images/hero.jpg"
          depthMap="/images/hero-depth.png"
        />
      </div>
            
      <div className="relative z-1 h-full flex items-center justify-center text-white pointer-events-none">
        <div className="text-center">
          <h1 className="text-8xl md:text-9xl mb-4 font-extrabold text-red-500">
            HOUSE DESIGN
          </h1>
          <p className="text-lg md:text-2xl font-extralight">
            <span className="bg-red-500 px-2 py-1.5 uppercase">Creating Exceptional Living Spaces</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
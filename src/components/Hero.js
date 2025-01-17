import React, { useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const Hero = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative w-full h-screen">
      {/* Background Video */}
      <video
        src="./img/video.mp4"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-70"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/path-to-your-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay and Centered Content */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center px-6 sm:px-12 md:px-16">
        <div className="text-left md:text-center">
          <h1 className="text-white text-5xl sm:text-5xl md:text-8xl 2xl:text-9xl font-bold leading-tight">
            Let’s Build What Matters.  
            <br />  
            From Vision to Reality.  
          </h1>
          <p className="text-white text-2xl sm:text-4xl md:text-6xl mt-4">
            Innovation. Execution. Impact.
            <br />
            We make things happen.
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      {!scrolled && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <FaChevronDown className="text-white text-3xl" />
        </div>
      )}
    </div>
  );
};

export default Hero;
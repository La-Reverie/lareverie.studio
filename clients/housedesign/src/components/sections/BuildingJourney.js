import React, { useEffect, useRef, useState } from 'react';


const BuildingJourney = () => {
  // Declarar todos los estados primero
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSticky, setIsSticky] = useState(false); // Movido arriba
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showTransition, setShowTransition] = useState(false);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  
  // Efecto para mostrar la animación y cambiar el video con delay
  useEffect(() => {
    if (isSticky) {
      setShowTransition(true);
      
      // Delay para el cambio de video
      const videoTimer = setTimeout(() => {
        setCurrentVideoIndex(activeIndex);
      }, 400);
      
      // Timer para ocultar la transición
      const transitionTimer = setTimeout(() => {
        setShowTransition(false);
      }, 800);
      
      return () => {
        clearTimeout(videoTimer);
        clearTimeout(transitionTimer);
      };
    } else {
      setCurrentVideoIndex(activeIndex);
    }
  }, [activeIndex, isSticky]);
  
  // Eliminar este efecto duplicado ya que ahora tenemos uno combinado arriba
  // useEffect(() => {
  //   // Solo mostrar la transición si isSticky es true
  //   if (isSticky) {
  //     setShowTransition(true);
  //     const timer = setTimeout(() => {
  //       setShowTransition(false);
  //     }, 800);
  //     
  //     return () => clearTimeout(timer);
  //   }
  // }, [activeIndex, isSticky]);
  
  const timelineItems = [
    {
      title: "Planning and Roadmap",
      description: "Initial meeting to gather requirements, discuss budget options, and create a comprehensive roadmap for your dream home.",
      video: "../videos/video1.mp4"
    },
    {
      title: "Design Phase",
      description: "Our in-house team of designers and architects work with you to create the perfect design that matches your vision.",
      video: "../videos/video2.mp4"
    },
    {
      title: "Permitting Process",
      description: "We handle all necessary permits and documentation, coordinating with city officials to ensure compliance.",
      video: "../videos/video1.mp4"
    },
    {
      title: "Construction",
      description: "Expert execution of your design with regular updates and quality control throughout the building process.",
      video: "../videos/video2.mp4"
    }
  ];

  // Add this function to handle content scroll
  const handleContentScroll = () => {
    if (isSticky && contentRef.current) {
      const scrollPosition = contentRef.current.scrollTop;
      const index = Math.floor(scrollPosition / window.innerHeight);
      setActiveIndex(Math.min(Math.max(index, 0), timelineItems.length - 1));
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!isSticky) {
        const scrollPosition = window.scrollY - containerRef.current.offsetTop;
        const index = Math.floor(scrollPosition / window.innerHeight);
        setActiveIndex(Math.min(Math.max(index, 0), timelineItems.length - 1));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSticky]);

  // Add effect to control body scroll
  useEffect(() => {
    if (isSticky) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSticky]);

  // Add this effect to reset scroll position when isSticky changes
  useEffect(() => {
    if (isSticky && contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [isSticky]);

  const toggleSticky = () => {
    setIsSticky(!isSticky);
  };

  return (
    <section 
      id="journey"
      ref={containerRef}
      className={`h-screen z-1 relative bg-red-500 ${isSticky ? 'overflow-y-auto' : 'overflow-y-hidden'}`}
      onClick={toggleSticky}
    >
      {/* Video Background */}
      <div 
        className={`${
          isSticky ? 'fixed' : 'relative'
        } top-0 h-screen z-0 flex items-center justify-center transition-transform duration-500`}
      >
        {/* Transition overlay - solo visible cuando showTransition es true */}
        <div 
          className={`bg-red-500 w-screen h-screen fixed top-0 left-0 z-10 overflow-hidden ${showTransition ? '' : 'hidden'}`}
          style={{
            animation: 'slideRightRotate 0.8s ease-in-out forwards',
          }}
        />
        <style jsx>{`
          @keyframes slideRightRotate {
            0% {
              transform: translateX(-100%) rotate(110deg);
            }
            100% {
              transform: translateX(100%) rotate(110deg);
            }
          }
        `}</style>
        
        <video 
          key={timelineItems[currentVideoIndex].video} // Usar currentVideoIndex en lugar de activeIndex
          autoPlay
          loop
          muted
          playsInline
          className={`transform ${isSticky ? 'scale-100' : 'scale-75'} transition-transform duration-500 w-screen h-screen`}
          style={{ objectFit: 'cover' }}
        >
          <source src={timelineItems[currentVideoIndex].video} />
        </video>
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content Sections */}
      <div 
        ref={contentRef}
        className={`${isSticky ? 'border-red-500 border-8 top-0' : ''} fixed h-full w-full overflow-auto snap-y snap-mandatory`}
        onScroll={handleContentScroll}
      >
        {timelineItems.map((item, index) => (
          <div 
            key={index}
            className="h-screen flex items-center justify-center snap-start"
          >
            <div className="container mx-auto px-4 max-w-3xl relative z-10 text-center">
              <h2 className="text-4xl font-bold text-white mb-8">{item.title}</h2>
              <p className="text-gray-200 text-lg">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BuildingJourney;
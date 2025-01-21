import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaGlobe,
  FaGoogle,
  FaFacebook,
  FaSearch,
  FaShareAlt,
  FaEnvelope,
} from "react-icons/fa";

function Home() {
  const services = [
    {
      title: "Website Development",
      description:
        "Crafting bespoke web solutions tailored to your brand’s unique identity and objectives.",
      icon: FaGlobe,
    },
    {
      title: "Google Ads",
      description:
        "Implement strategic SEM campaigns to attract high-quality traffic and achieve your business objectives",
      icon: FaGoogle,
    },
    {
      title: "Meta Ads",
      description:
        "Creating and running advertising campaigns across Instagram and Facebook to reach a wider audience and drive conversions",
      icon: FaFacebook,
    },
    {
      title: "SEO",
      description:
        "Improving your website’s search engine visibility through expert SEO strategies.",
      icon: FaSearch,
    },
    {
      title: "Social Media Management",
      description:
        "Developing and executing tailored content strategies to engage with your audience.",
      icon: FaShareAlt,
    },
    {
      title: "Email Marketing",
      description:
        "Utilizing automated email marketing tools to nurture leads and drive sales.",
      icon: FaEnvelope,
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const benefits = [
    {
      title: "In-depth research and analysis",
      description:
        "We'll thoroughly analyze your business, your target audience, and your competitors to develop a customized strategy.",
    },
    {
      title: "Goal setting and optimization",
      description:
        "We'll work with you to define clear objectives and continuously monitor and optimize your campaigns to ensure they're delivering results.",
    },
    {
      title: "Implementation and support",
      description:
        "Our team will handle all aspects of your digital marketing campaigns, from setup to ongoing management.",
    },
  ];

  const [currentBenefitIndex, setCurrentBenefitIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [carouselVisible, setCarouselVisible] = useState(false);
  const servicesRef = useRef(null);
  const carouselRef = useRef(null);
    const timerRef = useRef(null)


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCarouselVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 } // Adjust threshold as needed
    );

    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }

    return () => {
      if (servicesRef.current) {
        observer.unobserve(servicesRef.current);
      }
    };
  }, []);

    useEffect(() => {
      if (carouselVisible) {
          startTimer()
      }
      return () => clearTimeout(timerRef.current);
    }, [carouselVisible]);

     const startTimer = () => {
       timerRef.current = setInterval(() => {
            setCurrentBenefitIndex((prevIndex) => prevIndex + 1 );
            setRotation((prevRotation) => prevRotation - 120 ); // Increment for rotation direction
       }, 5000);
    };


  const handleCarouselClick = () => {
        setCurrentBenefitIndex((prevIndex) => prevIndex + 1 );
        setRotation((prevRotation) => prevRotation - 120);
  };

    const handleMouseEnter = () => {
        clearInterval(timerRef.current)
    }
    const handleMouseLeave = () => {
        startTimer()
    }
    

  return (
    <section id="home" className="relative w-full min-h-screen bg-gray-900 text-white overflow-hidden">
      <a
        id="home"
        className="anchor"
        href="#home"
        aria-label="Home section"
        aria-hidden="true"
      ></a>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] lg:w-[1000px] lg:h-[1000px] rounded-full bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 blur-3xl opacity-40"></div>
      </div>
      <div className="relative container mx-auto px-6 py-16 sm:px-12 sm:py-24 lg:py-32 z-10">
        <motion.div
          className="flex flex-col md:flex-row md:justify-between mt-10"
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: false,
            amount: window.innerWidth < 640 ? 0.1 : 0.2,
          }}
        >
          <motion.div
            className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left"
            variants={cardVariants}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-4">
              Elevating Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-blue-300 to-indigo-300">Digital Presence</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto md:mx-0 mb-12">
              Strategic solutions to help you achieve your business goals
              online.
            </p>

              <div className="relative w-full max-w-[650px]  h-[310px] md:mr-16 transform-style: preserve-3d">
                <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    ref={carouselRef}
                    className="benefits-carousel"
                    style={{ transform: `rotateY(${rotation}deg)` }}
                >
                  {benefits.map((benefit, index) => (
                      <div
                          key={index}
                          className="benefit-card"

                          onClick={handleCarouselClick}
                           style={{transform: `rotateY(${index * 120}deg) translateZ(150px)`}}
                           >
                          <h3 className="text-2xl md:text-xl text-yellow-400 font-semibold mb-2">
                                {benefit.title}
                            </h3>
                         <p className="text-gray-200 text-md md:text-2xl text-center">
                                {benefit.description}
                            </p>
                      </div>
                  ))}
                  </div>
              </div>
          </motion.div>
          <motion.div
            className="md:w-1/2"
            variants={cardVariants}
            ref={servicesRef}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.6, // Incrementamos el delay entre elementos
                }}
              >
                <div className="p-2 rounded-full bg-gray-700 flex items-center justify-center text-gray-400">
                  <service.icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 text-lg">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Home;
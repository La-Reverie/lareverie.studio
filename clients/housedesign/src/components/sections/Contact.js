import React, { useState, useEffect } from 'react';

const Contact = () => {
  const [showForm, setShowForm] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const contactSection = document.getElementById('contact');
      const rect = contactSection.getBoundingClientRect();
      
      // If section is completely out of view
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        setShowForm(false);
        setIsAnimating(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setShowForm(true);
      setIsAnimating(false);
    }, 200); // Match the duration of blinkFade animation
  };

  return (
    <section id="contact" className="relative min-h-screen bg-brown-900 flex items-center justify-center">
      <div className="w-full flex items-center justify-center">
        {!showForm ? (
          <div 
            className={`text-6xl md:text-8xl text-red-500 cursor-pointer ${
              isAnimating ? 'animate-blink-fade' : ''
            }`}
            onClick={handleClick}
          >
            sayhi@housedesign.com
          </div>
        ) : (
          <div className="w-[75%] animate-fade-in">
            <div className=" p-8 shadow-xl mx-4">
              <div className="flex items-end">
                <h1 className="text-9xl text-right font-bold text-white w-[50%] pr-8">
                  We Bring Your Vision to Life
                </h1>

                <form className="w-[50%] space-y-6 ">
                <div 
                  id="divForm" 
                  className="group bg-brown-800 border-4 ml-12 border-red-500 p-12 space-y-6 transition-all duration-300 hover:scale-110 hover:bg-red-500"
                >
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full p-4 bg-brown-900 text-white focus:bg-white focus:text-black focus:border-none focus:ring-0 transition-all focus:outline-none placeholder-red-200 focus:placeholder-gray-300"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full p-4 bg-brown-900 text-white focus:bg-white focus:text-black focus:border-none focus:ring-0 transition-all focus:outline-none placeholder-red-200 focus:placeholder-gray-300"
                    />
                  </div>
                  <div className="relative">
                    <textarea
                      placeholder="Your Message"
                      rows="4"
                      className="w-full p-4 bg-brown-900 text-white  focus:bg-white focus:text-black focus:border-none focus:ring-0 transition-all focus:outline-none placeholder-red-200 focus:placeholder-gray-300"
                    ></textarea>
                  </div>
                  <button 
                    className="w-full bg-red-500 group-hover:bg-brown-800 text-white py-4 px-8 font-semibold transition-colors duration-300 focus:outline-none"
                    type="button"
                    onClick={() => setShowForm(false)}
                  >
                    Send Message
                  </button>
                </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes blinkFade {
          0% { opacity: 1; color: white; }
          20% { color: red; }
          40% { color: white; }
          60% { color: red; }
          80% { color: white; }
          100% { opacity: 0; color: red; }
        }
        .animate-blink-fade {
          animation: blinkFade 0.2s ease-in-out forwards;
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default Contact;
import React from 'react';

const AboutUs = () => {
  return (
    <section id="about" className="py-20 bg-brown-800">
      <div className="container mx-auto px-8 md:px-4 text-left">
        <h2 className="text-4xl font-bold text-white mb-8">About Us</h2>
        <div className="text-gray-200 space-y-6 text-xl md:text-5xl leading-relaxed md:leading-tight">
          <p>
            We specialize in creating exceptional custom homes with unparalleled attention to detail.
            Our expertise spans across various architectural styles including Modern and Spanish designs.
          </p>
          <p>
            With years of experience in luxury home construction, we bring your vision to life
            through innovative design and superior craftsmanship.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
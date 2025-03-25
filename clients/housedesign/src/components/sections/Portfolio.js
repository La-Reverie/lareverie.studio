import React from 'react';
import HighlightCard from '../ui/HighlightCard';

const Portfolio = () => {
  const highlights = [
    {
      title: 'Luxury Ceiling Showerheads',
      description: 'Experience the ultimate in relaxation with our premium rainfall shower systems',
      image: '/images/1.jpg'
    },
    {
      title: 'Designer Countertops',
      description: 'Elegant surfaces crafted from high-end materials, combining beauty with functionality',
      image: '/images/3.jpg'
    },
    {
      title: 'Contemporary Lighting',
      description: 'Innovative lighting solutions that enhance your space with style and sophistication',
      image: '/images/5.jpg'
    },
  ];

  return (
    <section className="py-20 bg-brown-900 text-white text-left">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12">Portfolio Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <HighlightCard key={index} {...highlight} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
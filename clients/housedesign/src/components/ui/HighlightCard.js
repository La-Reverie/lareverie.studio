import React from 'react';

const HighlightCard = ({ image, title, description }) => {
  return (
    <div className="bg-brown-800 overflow-hidden transition-transform hover:scale-105">
      <div className="relative h-64">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export default HighlightCard;
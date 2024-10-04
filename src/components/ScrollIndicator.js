import React, { useEffect } from 'react';
import './ScrollIndicator.css';

function ScrollIndicator() {
  let ticking = false;
  let anchorEls;

  const hideArrowAtOffset = () => {
    const yPos = document.documentElement.scrollTop || document.body.scrollTop;
    if (yPos > 150) {
      document.querySelector('.scroll-down-indicator').style.display = 'none';
    }
  };

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        hideArrowAtOffset();
        ticking = false;
      });
  
      ticking = true;
    }
  };

  useEffect(() => {
    anchorEls =  document.querySelectorAll('.anchor');
    hideArrowAtOffset();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
  
  const arrowWasClicked = (e) => {
    anchorEls[0].scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <div onClick={arrowWasClicked} className="scroll-down-indicator" aria-label="Scroll down for content">
        <div className="arrow">&#x2193;</div>
    </div>
  );
}

export default ScrollIndicator;
import React, { useEffect } from 'react';
import './ScrollIndicator.css';

function ScrollIndicator() {
  let ticking = false;
  let anchorEls;
  let headerEl;
  let scrollIndicatorEl;

  const hideArrowAtOffset = () => {
    const yPos = document.documentElement.scrollTop || document.body.scrollTop;
    if (yPos > 150) {
      scrollIndicatorEl.style.display = 'none';
    }
  };

  const shrinkHeaderAtOffset = () => {
    const yPos = document.documentElement.scrollTop || document.body.scrollTop;
    if (yPos > 150) {
      headerEl.classList.add('shrink');
    } else {
      headerEl.classList.remove('shrink');
    }
  };

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        hideArrowAtOffset();
        shrinkHeaderAtOffset();
        ticking = false;
      });
  
      ticking = true;
    }
  };

  useEffect(() => {
    anchorEls =  document.querySelectorAll('.anchor');
    headerEl = document.querySelector('header');
    scrollIndicatorEl = document.querySelector('.scroll-down-indicator');
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
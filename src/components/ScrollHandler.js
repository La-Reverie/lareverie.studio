import React, { useState, useEffect, useRef } from 'react';

const ScrollHandler = ({ onScroll, children, setHeroClicked, heroClicked }) => {
   const [clicked, setClicked] = useState(false);
     const scrollRef = useRef(0);

    useEffect(() => {
        let scrollCount = 0;

        const preventScroll = (e) => {
            e.preventDefault();
            scrollCount += 1;
            scrollRef.current = scrollCount;
             if (scrollCount >= 2 && clicked) {
                releaseScroll();
                if (onScroll) {
                     setTimeout(() => {
                            onScroll();
                        }, 0);
                 }
            }
        };

        const releaseScroll = () => {
           window.removeEventListener('wheel', preventScroll);
            window.removeEventListener('touchmove', preventScroll);
            window.removeEventListener('keydown', preventScroll);
        };

        if (!clicked) {
            window.addEventListener('wheel', preventScroll, { passive: false });
             window.addEventListener('touchmove', preventScroll, { passive: false });
             window.addEventListener('keydown', preventScroll, { passive: false });
       }


         return () => releaseScroll();
    }, [clicked, onScroll]);

      useEffect(() => {
        if(heroClicked) {
            setClicked(true)
        }
    }, [heroClicked, setClicked])


      return React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                 setClicked: setHeroClicked,
                 clicked: clicked
            })
        }
       return child
    })
};

export default ScrollHandler;
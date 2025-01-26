import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';

const ScrollHandler = ({ onScroll, children, setHeroClicked, heroClicked }) => {
    const [clicked, setClicked] = useState(false);
    const scrollRef = useRef(0);

    useEffect(() => {
        // Scroll to the top on initial render
        window.scrollTo(0, 0);

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
        if (heroClicked) {
            setClicked(true);
        }
    }, [heroClicked, setClicked]);

    return React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            if (child.type === Canvas) {
                return React.cloneElement(child, {
                    children: React.Children.map(child.props.children, (innerChild) => {
                        if (innerChild.type?.name === 'TransitionPlane') {
                            return React.cloneElement(innerChild, {
                                setClicked: setHeroClicked,
                                clicked: clicked,
                            });
                        }
                        return innerChild;
                    }),
                });
            }
            return child;
        }
        return child;
    });
};

export default ScrollHandler;
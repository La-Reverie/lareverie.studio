import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { shaderMaterial, Plane, useTexture } from '@react-three/drei';
import './Pseudo3DBackground.css';

const Pseudo3DMaterial = shaderMaterial(
    {
        uMouse: [0, 0],
        uImage: null,
        uDepthMap: null,
        resolution: [1, 1],
    },
    `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    `
        uniform vec2 uMouse;
        uniform sampler2D uImage;
        uniform sampler2D uDepthMap;
        uniform vec2 resolution;
        varying vec2 vUv;

        void main() {
            vec4 depthDistortion = texture2D(uDepthMap, vUv);
            float parallaxMult = depthDistortion.r;

            vec2 parallax = (uMouse - 0.5) * parallaxMult * 0.008;
            vec2 newUV = vUv + parallax;

            vec4 color = texture2D(uImage, newUV);

            gl_FragColor = color;
        }
    `
);

extend({ Pseudo3DMaterial });

const Scene = ({ image, depthMap }) => {
    const planeRef = useRef();
    const pseudoMaterial = useRef();
    const { viewport, size } = useThree();

    const [colorTexture, depthTexture] = useTexture([image, depthMap]);

    useFrame(({ mouse }) => {
        if (pseudoMaterial.current) {
            pseudoMaterial.current.uMouse = [mouse.x, mouse.y];
        }
    });

    useEffect(() => {
        if (!planeRef.current || !colorTexture || !size) return;

        const imageAspect = colorTexture.image.width / colorTexture.image.height;
        const viewportAspect = viewport.width / viewport.height;

        let scaleX, scaleY;

        if (imageAspect > viewportAspect) {
            scaleX = viewport.height * imageAspect;
            scaleY = viewport.height;

        } else {
            scaleX = viewport.width;
            scaleY = viewport.width / imageAspect;
        }

        planeRef.current.scale.set(scaleX, scaleY, 1);

        if (pseudoMaterial.current) {
            pseudoMaterial.current.resolution = [size.width, size.height];
        }
    }, [viewport, size, colorTexture]);

    return (
        <Plane ref={planeRef}>
            <pseudo3DMaterial
                ref={pseudoMaterial}
                uImage={colorTexture}
                uDepthMap={depthTexture}
                resolution={[size.width, size.height]}
            />
        </Plane>
    );
};

export default function Pseudo3DBackground({ image, depthMap }) {
    const [maskActive, setMaskActive] = useState(false);
    const canvasRef = useRef();
    const maskRef = useRef();
    const animationEndRef = useRef(null);
    const [displayText, setDisplayText] = useState('');
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const phrases = [
        "PUSHING LIMITS",
        "WE DO SEO",
        "WE CODE JAVA",
        "WE BREATHE PYTHON",
        "WE CODE REACT",
        "WE DO UX",
        "WE CODE AI",
        "WE ARE CREATIVES",
        "WE DO MVPs"
    ];

    const handleCanvasClick = () => {
        setMaskActive(true);
    };

    useEffect(() => {
        let timeoutId;
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            if (displayText.length === 0) {
                setIsDeleting(false);
                setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
                timeoutId = setTimeout(() => {
                    setDisplayText(currentPhrase[0] || '');
                }, 50);
            } else {
                timeoutId = setTimeout(() => {
                    setDisplayText(displayText.slice(0, -1));
                }, 50);
            }
        } else {
            if (displayText.length === currentPhrase.length) {
                timeoutId = setTimeout(() => {
                    setIsDeleting(true);
                }, 2000); // Mantiene el texto por 2 segundos
            } else {
                timeoutId = setTimeout(() => {
                    setDisplayText(currentPhrase.slice(0, displayText.length + 1));
                }, 50);
            }
        }

        return () => clearTimeout(timeoutId);
    }, [displayText, isDeleting, phraseIndex, phrases]);

    useEffect(() => {
        if (maskRef.current) {
            const handleFadeOutEnd = () => {
                maskRef.current.style.display = 'none';
                setMaskActive(false);
            };

            animationEndRef.current = () => {
                const canvasElement = document.getElementById('CanvasPseudo3D');
                const pushing = document.getElementById('pushing');
                if (canvasElement) {
                    canvasElement.style.display = 'none';
                    pushing.style.display = 'none';
                }
                maskRef.current.style.animation = 'fadeOut 1s ease-in-out forwards';
                maskRef.current.addEventListener('animationend', handleFadeOutEnd, { once: true });
            };

            maskRef.current.addEventListener('animationend', animationEndRef.current, { once: true });
        }

        return () => {
            if (maskRef.current && animationEndRef.current) {
                maskRef.current.removeEventListener('animationend', animationEndRef.current);
            }
        };
    }, [maskActive]);

    return (
        <>
            <h1 id="pushing" className="z-[3] fixed font-bold text-white uppercase flex items-center pointer-events-none justify-center w-full h-full">
                <span className="shadow-big whitespace-pre">{displayText}</span>
            </h1>
            <Canvas
                ref={canvasRef}
                id="CanvasPseudo3D"
                style={{
                    width: '100vw',
                    height: '100vh',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: 2,
                    cursor: 'pointer',
                }}
                camera={{ position: [0, 0, 1], fov: 75 }}
                onClick={handleCanvasClick}
            >
                <Scene image={image} depthMap={depthMap} />
            </Canvas>

            {maskActive && (
                <div
                    ref={maskRef}
                    className="brown-overlay"
                />
            )}
        </>
    );
}
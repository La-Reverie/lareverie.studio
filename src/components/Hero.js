import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { gsap } from 'gsap';
import ScrollHandler from './ScrollHandler';

const TransitionPlane = React.forwardRef(({ images, duration = 0.7, easing = 'easeOut', uniformsProp, setclicked, clicked, setCurrent }, ref) => {
    const planeRef = useRef();
    const [textures, setTextures] = useState([]);
    const [current, setLocalCurrent] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const material = useRef();
    const videoRef = useRef();
    const displacementTexture = useLoader(THREE.TextureLoader, '/img/disp1.jpg');
    const isFirstRender = useRef(true);
    const [isClickBlocked, setIsClickBlocked] = useState(false);


    const vertexShader = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
    `;

    const fragmentShader = `
        precision mediump float;
        uniform float time;
        uniform float progress;
        uniform float width;
        uniform float radius;
        uniform sampler2D texture1;
        uniform sampler2D texture2;
         uniform sampler2D displacement;
        uniform vec4 resolution;
        varying vec2 vUv;
        
        float parabola(float x, float k) {
            return pow(4. * x * (1. - x), k);
        }

        void main() {
           vec2 newUV = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);
            vec4 noise = texture2D(displacement, fract(vUv + time * 0.04));
            float prog = progress * 0.66 + noise.g * 0.04;
            vec2 aspect = resolution.wz;
            float circ = 1. - smoothstep(-width, 0.0, radius * distance(vec2(0.5, 0.5) * aspect, newUV * aspect) - prog);
            vec4 t1 = texture2D(texture1, (newUV - 0.5) * (1.0 - circ) + 0.5);
            vec4 t2 = texture2D(texture2, (newUV - 0.5) * circ + 0.5);
             gl_FragColor = mix(t1, t2, progress);
        }
    `;

    useEffect(() => {
         if(!images || !Array.isArray(images)) {
            console.error('images is not an array or is null', images)
            return;
        }
        const loader = new TextureLoader();
        const loadTextures = async () => {
            try {
                const loadedTextures = await Promise.all(images.slice(0, -1).map(url => loader.loadAsync(url)));
                 const video = document.createElement('video');
                video.src = images[images.length - 1];
                video.loop = true;
                video.muted = true;
             
             const videoTexture = new THREE.VideoTexture(video);
                 await video.play();
                videoRef.current = video
                 setTextures([...loadedTextures, videoTexture]);

            } catch (error) {
                console.error('Error loading textures:', error);
            }
        };
        loadTextures();
    }, [images]);

 const { viewport } = useThree();
    const { width, height } = viewport;


    useEffect(() => {
        if (textures.length < 2 || !material.current) return;
          const imageAspect = textures[0].image ? textures[0].image.height / textures[0].image.width : 1;
        const a1 = height / width > imageAspect ? (width / height) * imageAspect : 1;
        const a2 = height / width > imageAspect ? 1 : (height / width) / imageAspect;
         material.current.uniforms.resolution.value = new THREE.Vector4(width, height, a1, a2);
         material.current.uniforms.texture1.value = textures[0];
           material.current.uniforms.texture2.value = textures[1];
            material.current.uniforms.displacement.value = displacementTexture;
       planeRef.current.scale.x = width * 1;
        planeRef.current.scale.y = height * 1;
    }, [textures, width, height, displacementTexture]);


    useFrame(({ clock }) => {
        if (material.current) material.current.uniforms.time.value = clock.getElapsedTime();
           
    });

    const next = useCallback(() => {
        if (isRunning || textures.length < 2) return;
        setIsRunning(true);
        const nextIndex = (current + 1) % textures.length;
        const nextTexture = textures[nextIndex];
        if (material.current && planeRef.current) {
            material.current.uniforms.texture2.value = nextTexture;
            
            // Crear un timeline de GSAP para animaciones paralelas
            const tl = gsap.timeline({
                onComplete: () => {
                    setLocalCurrent(nextIndex)
                    setCurrent(nextIndex); //Se agrego esta linea
                    material.current.uniforms.texture1.value = nextTexture;
                    material.current.uniforms.progress.value = 0;
                    setIsRunning(false);
                },
            });

            // Animación de progreso
            tl.to(material.current.uniforms.progress, {
                duration: duration,
                value: 1,
                ease: `power2.${easing}`,
            });

             tl.to(planeRef.current.scale, {
                x: width * 1.45,
                y: height * 1.45,
                duration: 0.7,
                ease: `power2.${easing}`,
            }, 0);
            
            tl.to(material.current.uniforms.swipe, {
                value: 1,
                duration: duration,
                ease: `power2.${easing}`,
            }, 0);
        }
    },[current, duration, easing, isRunning, textures, width, height, setCurrent])

  const handleClick = () => {
          if (isClickBlocked) return;
          setIsClickBlocked(true);
          next();
          setclicked(true)
  
          setTimeout(() => {
              setIsClickBlocked(false);
             
          }, 1000);
      };

    React.useImperativeHandle(ref, () => ({
        next
      }),[next])


    return textures.length >= 2 ? (
        <mesh ref={planeRef} onClick={handleClick}>
            <planeGeometry args={[1, 1]} />
            <shaderMaterial
                ref={material}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={{
                    time: { value: 0 },
                    progress: { value: 0 },
                    width: { value: uniformsProp?.width?.value || 0 },
                    radius: { value: uniformsProp?.radius?.value || 0 },
                    scaleX: { value: 40 },
                    scaleY: { value: 40 },
                    transition: { value: 40 },
                    swipe: { value: 0 },
                    texture1: { value: null },
                    texture2: { value: null },
                     displacement: { value: null },
                    resolution: { value: new THREE.Vector4() },
                }}
            />
        </mesh>
    ) : null;
});

const Hero = ({ images, uniforms }) => {
    const canvasContainer = useRef();
    const transitionPlaneRef = useRef(null);
    const [clicked, setclicked] = useState(false);
    const [current, setCurrent] = useState(0);

    // Actualización dinámica del tamaño al redimensionar
    const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => {
            setSize({ width: window.innerWidth, height: window.innerHeight });
            window.location.reload();
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleScroll = () => {
        if (transitionPlaneRef.current) {
                 transitionPlaneRef.current.next();
        }
    };

    useEffect(() => {
       setclicked(false)
    }, [current])

    return (
        <div
            ref={canvasContainer}
            style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}
        >
            <ScrollHandler  onScroll={handleScroll} setHeroClicked={setclicked} heroClicked={clicked} >
                <Canvas
                    style={{ position: 'absolute', top: 0, left: 0 }}
                    camera={{ position: [0, 0, 1.5], fov: 75 }}
                    onCreated={({ gl, camera }) => {
                        camera.aspect = size.width / size.height;
                        camera.updateProjectionMatrix();
                        gl.setSize(size.width, size.height);
                    }}
                >
                    <ambientLight intensity={0.5} />
                    <TransitionPlane
                        images={images}
                        uniformsProp={uniforms}
                        ref={transitionPlaneRef}
                        setclicked={setclicked}
                        clicked={clicked}
                         setCurrent={setCurrent}
                    />
                </Canvas>
           </ScrollHandler>
        </div>
    );
};

export default Hero;
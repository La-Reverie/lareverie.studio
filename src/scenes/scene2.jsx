import React, { useRef, useEffect, useState, useMemo } from 'react';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { TubeGeometry, Vector3, CatmullRomCurve3, MeshBasicMaterial, ShaderMaterial, TextureLoader, RepeatWrapping, DoubleSide, AudioListener, Audio, AudioLoader } from 'three';
import { PerspectiveCamera, useGLTF, useAnimations } from '@react-three/drei';

// Extend any necessary objects
extend({ TubeGeometry, MeshBasicMaterial });

const Astronaut = () => {
    const { scene, animations } = useGLTF('/webgl/astronaut.glb');
    const { actions } = useAnimations(animations, scene);
    const { viewport } = useThree();
    const [rotationY, setRotationY] = useState(0.4);
    const targetRotation = useRef(0.4);

    useEffect(() => {
        const actionKeys = Object.keys(actions);
        if (actionKeys.length > 0) {
            actions[actionKeys[0]].play();
        }
    }, [actions, scene]);

    // Suscribirse a los eventos del mouse
    useEffect(() => {
        const handleMouseMove = (e) => {
            const centerX = window.innerWidth / 2;
            const distanceFromCenter = (e.clientX - centerX) / (window.innerWidth / 2);
            targetRotation.current = distanceFromCenter > 0 ? 0.4 : -0.4;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Interpolación suave de la rotación
    useFrame(() => {
        setRotationY(prev => prev + (targetRotation.current - prev) * 0.1);
    });

    const scale = Math.min(viewport.width, viewport.height) * 0.03;

    return (
        <primitive 
            object={scene} 
            position={[0.003, 0, 0.35]}
            scale={scale}
            rotation={[-0.9, rotationY, 0]}
        />
    );
};

const Tunnel = () => {
    const meshRef = useRef();
    const tubeGeometryRef = useRef();
    const [texture, setTexture] = useState(null);
    const mouse = useRef({
        position: new Vector3(0, 0, 0),
        target: new Vector3(0, 0, 0)
    });
    const cameraRef = useRef();
        // Agregar este estado para la rotación
    // Al inicio del componente, junto a los otros refs
    const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
    const targetRotation = useRef({ x: 0, y: 0, z: 0 });


    useEffect(() => {
        const splinePath = [];
        for (let i = 0; i < 5; i++) {
            splinePath.push(
                new Vector3(
                   0, 0, 3 * (i / 4)
                )
            );
        }
        splinePath[4].y = -0.06;


        const curve = new CatmullRomCurve3(splinePath);
        curve.type = 'catmullrom';

        const geometry = new TubeGeometry(curve, 70, 0.02, 30, false);
        
          // Modified UV mapping
        const uvs = geometry.attributes.uv.array;
        for (let i = 0; i < uvs.length; i += 2) {
            const u = uvs[i];
            const v = uvs[i + 1];
            uvs[i] = v * 8;     // Aumentado para más "estiramiento" horizontal
            uvs[i + 1] = u * 1;
        }


        tubeGeometryRef.current = geometry;
    }, []);

    useEffect(() => {
        const loader = new TextureLoader();
        loader.load('/webgl/galaxy.jpg', (loadedTexture) => {
            loadedTexture.wrapS = loadedTexture.wrapT = RepeatWrapping;
            setTexture(loadedTexture);
        });
    }, []);


    const vertexShader = `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

    const fragmentShader = `
        uniform float time;
        uniform sampler2D tunnelTexture;
        varying vec2 vUv;

        void main() {
            vec2 uv = vUv;
             uv.x = uv.x;
             uv.y = uv.y  + time;
            vec4 color = texture2D(tunnelTexture, uv);
            gl_FragColor = color;
        }
    `;

    const material = useMemo(() => {
      if (!texture) {
        return null;
      }
      return new ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            tunnelTexture: { value: texture },
          },
          vertexShader,
          fragmentShader,
          transparent: true,
          side: DoubleSide // Eliminar esta línea o cambiar a FrontSide
      })
  
    }, [texture, fragmentShader, vertexShader])


    useFrame((state) => {
        if (material) {
            material.uniforms.time.value = state.clock.getElapsedTime() * 1.5;
        }
    });

   // Handle Mouse movement
   useEffect(() => {
        const handleMouseMove = (e) => {
            const ww = window.innerWidth;
            const wh = window.innerHeight;
            const ww2 = ww * 0.5;
            const wh2 = wh * 0.5;
            
            // Limitar el rango de movimiento a ±0.3 (ajusta este valor según necesites)
            const limitedX = Math.max(-0.6, Math.min(0.6, (e.clientX - ww2) / ww2));
            const limitedY = Math.max(-0.3, Math.min(0.3, (wh2 - e.clientY) / wh2));
            
            mouse.current.target.x = limitedX;
            mouse.current.target.y = limitedY;
        };
    
        document.body.addEventListener('mousemove', handleMouseMove, false);
        return () => {
            document.body.removeEventListener('mousemove', handleMouseMove, false);
        };
    }, []);
   
    // Handle Device Orientation
     useEffect(() => {
         const handleDeviceOrientation = (event) => {
            if (event.alpha > 0 && event.beta < 90) {
                mouse.current.target.y = (Math.max(-1, Math.min(1, ((event.beta - 20) / 30))));
              mouse.current.target.x = -(Math.max(-1, Math.min(1, ((event.gamma) / 30))));
            }
          };

          window.addEventListener('deviceorientation', handleDeviceOrientation, true);

          return () => {
            window.removeEventListener('deviceorientation', handleDeviceOrientation, true);
        }

    }, []);

     //Update Camera Position
    useFrame(() => {
        if(cameraRef.current){
           mouse.current.position.x += (mouse.current.target.x - mouse.current.position.x) / 30;
           mouse.current.position.y += (mouse.current.target.y - mouse.current.position.y) / 30;

            // Rotate Z & Y axis
            cameraRef.current.rotation.z = mouse.current.position.x * 0.2;
            cameraRef.current.rotation.y = Math.PI - (mouse.current.position.x * 0.06);
           // Move a bit the camera horizontally & vertically
           cameraRef.current.position.x = mouse.current.position.x * 0.015;
           cameraRef.current.position.y = -mouse.current.position.y * 0.015;
        }
     });

    // Un solo useFrame que maneje todo
    useFrame((state) => {
        // Material update
        if (material) {
            material.uniforms.time.value = state.clock.getElapsedTime() * 1.5;
        }

        // Camera and mouse updates
        if(cameraRef.current){
            // Update mouse position with interpolation
            mouse.current.position.x += (mouse.current.target.x - mouse.current.position.x) / 30;
            mouse.current.position.y += (mouse.current.target.y - mouse.current.position.y) / 30;

            // Update camera rotation and position
            cameraRef.current.rotation.z = mouse.current.position.x * 0.2;
            cameraRef.current.rotation.y = Math.PI - (mouse.current.position.x * 0.06);
            cameraRef.current.position.x = mouse.current.position.x * 0.015;
            cameraRef.current.position.y = -mouse.current.position.y * 0.015;

            // Rotation interpolation
            setRotation(prev => ({
                x: prev.x + (targetRotation.current.x - prev.x) * 0.005,
                y: prev.y + (targetRotation.current.y - prev.y) * 0.005,
                z: prev.z + (targetRotation.current.z - prev.z) * 0.005
            }));
        }
    });


        // Agregar este useFrame para la interpolación suave
    useFrame(() => {
      if(cameraRef.current){
        // Rotate Z & Y axis
        cameraRef.current.rotation.z = mouse.current.position.x * 0.2;
        cameraRef.current.rotation.y = Math.PI - (mouse.current.position.x * 0.06);
       // Move a bit the camera horizontally & vertically
       cameraRef.current.position.x = mouse.current.position.x * 0.015;
       cameraRef.current.position.y = -mouse.current.position.y * 0.015;
    }
  });

    useEffect(() => {
        const rotate = () => {
            const randomAxis = Math.floor(Math.random() * 3);
            const newRotation = { ...rotation };

            switch (randomAxis) {
                case 0:
                    console.log("case 0");
                    newRotation.z = Math.PI * (Math.random() * 3);
                    break;
                case 1:
                    console.log("case 1");
                    newRotation.z = Math.PI * (Math.random() * 2);
                    break;
                case 2:
                    console.log("case 2");
                    newRotation.z = Math.PI * (Math.random() * 1);
                    break;
                 default:
                    console.log("case default");
                        newRotation.z = Math.PI * (Math.random() * 2);
                break;
            }
            targetRotation.current = newRotation;
          };

        const interval = setInterval(rotate, 5000);
        rotate()

      return () => clearInterval(interval);
    }, []);
    
        // Modificar el return para incluir la rotación
      return (
            <>
                <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 0.22]} fov={6}  />
                <ambientLight intensity={3} /> {/* Luz ambiente suave */}
                {tubeGeometryRef.current && material && (
                    <mesh 
                    ref={meshRef}
                    rotation={[rotation.x, rotation.y, rotation.z]}
                    >
                        <primitive object={tubeGeometryRef.current} attach="geometry" />
                        <primitive object={material} attach="material" />
                    </mesh>
                )}
                <Astronaut /> 
                
            </>
        );
};

const Scene2 = () => {
    useEffect(() => {
        const listener = new AudioListener();
        const audioLoader = new AudioLoader();
        
        // Primer audio (astronaut.mp3)
        const sound1 = new Audio(listener);
        audioLoader.load('/webgl/astronaut.mp3', (buffer) => {
            sound1.setBuffer(buffer);
            sound1.setVolume(0.5);
            sound1.play();
        });

        // Segundo audio (falling.mp3) después de 3 segundos
        setTimeout(() => {
            const sound2 = new Audio(listener);
            audioLoader.load('/webgl/falling.mp3', (buffer) => {
                sound2.setBuffer(buffer);
                sound2.setVolume(0.5);
                sound2.play();
            });
        }, 3000);

        return () => {
            sound1?.stop();
            sound1?.disconnect();
        };
    }, []);

    return (
        <>
            <color attach="background" args={['#000000']} />
            <Tunnel />
        </>
    );
};

// Add preload method
Scene2.preload = async (onProgress) => {
    const textureLoader = new TextureLoader();
    return new Promise((resolve) => {
        textureLoader.load('/webgl/galaxy.jpg', () => {
            resolve();
        });
    });
};

// Agregar preload para el astronauta
// Combinar los preloads en uno solo
Scene2.preload = async (onProgress) => {
    const [gltf] = await Promise.all([
        useGLTF.preload('/webgl/astronaut.glb'),
        new Promise((resolve) => {
            new TextureLoader().load('/webgl/galaxy.jpg', () => resolve());
        })
    ]);
    return gltf;
};

export default Scene2;
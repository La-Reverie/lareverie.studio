import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame, useThree, useLoader } from '@react-three/fiber';
import { PerspectiveCamera, useGLTF, useAnimations } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { TextureLoader, ShaderMaterial, AdditiveBlending, Mesh } from 'three';

// Shader Code
const lensFlareVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const lensFlareFragmentShader = `
  varying vec2 vUv;
  
  void main() {
    vec2 center = vec2(0.5, 0.5);
    float dist = distance(vUv, center);
    
    // Brillo central más intenso
    float brightness = 1.0 - smoothstep(0.0, 0.3, dist);
    
    // Anillos estáticos
    brightness += 0.8 * exp(-dist * 2.0);
    
    // Color más brillante
    vec3 color = vec3(1.0, 0.9, 0.7) * 2.0;
    
    gl_FragColor = vec4(color * brightness, brightness);
  }
`;

const LensFlareShader = () => {
    const meshRef = useRef();
    const materialRef = useRef();
    const { camera } = useThree();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.lookAt(camera.position);
        }
    });

    const shaderMaterial = useMemo(() => {
        return new ShaderMaterial({
            vertexShader: lensFlareVertexShader,
            fragmentShader: lensFlareFragmentShader,
            transparent: true,
            blending: AdditiveBlending,
            depthWrite: false
        });
    }, []);

    return (
        <mesh ref={meshRef} position={[0, 7, -15]} scale={[120, 120, 10]}>
            <planeGeometry args={[1, 1]} />
            <primitive object={shaderMaterial} ref={materialRef} />
        </mesh>
    );
};
// Star Particles
const Space = ({initialState}) => {
  const starRef = useRef();


  useFrame(() => {
    if (starRef.current) {
      initialState.angle -= 0.001;
      const x = Math.cos(initialState.angle) * initialState.radius;
      const z = Math.sin(initialState.angle) * initialState.radius + 48;
      starRef.current.position.set(x, initialState.position[1], z);
    }
  });

  return (
    <mesh ref={starRef} position={initialState.position}>
      <circleGeometry args={[0.025]} />
      <meshBasicMaterial color="#ffffff" side={2} transparent opacity={0.6} />
    </mesh>
  );
};


const Scene3 = () => {
    const meshRef = useRef();
    const cameraRef = useRef();
    const lightRef = useRef();
    const composerRef = useRef();
    const { gl, scene: threeScene } = useThree();
    const { scene, animations } = useGLTF('/webgl/principito.glb');
    const { actions } = useAnimations(animations, scene);
    const sunTexture = useLoader(TextureLoader, '/webgl/eso0932a.jpg');
    const isMobile = window.innerWidth < 768;

    useEffect(() => {
        if (scene && actions) {
            scene.rotation.set(0, 0, 0);
            scene.position.set(0, -0.4, 0);
            scene.scale.set(0.5, 0.5, 0.5);

            // Play all animations
            Object.values(actions).forEach(action => {
                if (action) action.play();
            });
        }

        return () => {
            // Detener animaciones en cleanup
            if (actions) {
                Object.values(actions).forEach(action => {
                    action.stop();
                });
            }
            // Clear the renderer
            gl.clear();
            gl.dispose();
            
            // Force a black frame
            gl.setClearColor(0x000000, 0);
            gl.clearColor();
            
            if (composerRef.current) {
                composerRef.current.dispose();
            }
        };
    }, [scene, actions, sunTexture, threeScene]);

    const initialStarStates = useMemo(() => {
      return Array.from({ length: 300 }, () => ({
        position: [
          (Math.random() - 0.5) * (isMobile ? 11 : 5),
          (Math.random() - 0.5) * (isMobile ? 11 : 5),
          (Math.random() - 0.5) * 2 + (isMobile ? 50 : 48)
        ],
        radius: 3 + Math.random() * (isMobile ? 8 : 2),
        angle: Math.random() * Math.PI * 2
      }));
    }, [isMobile]);


    useEffect(() => {
        if (scene) {
            scene.rotation.set(0, 0, 0);
            scene.position.set(0, -0.4, 0);
            scene.scale.set(0.5, 0.5, 0.5);
        }

        return () => {
            // Cleanup main scene
            if (scene) {
                scene.traverse((child) => {
                    if (child.isMesh) {
                        child.geometry?.dispose();
                        if (Array.isArray(child.material)) {
                            child.material.forEach(material => material?.dispose());
                        } else {
                            child.material?.dispose();
                        }
                    }
                });
            }
            // Cleanup sun texture
            if (sunTexture) {
                sunTexture.dispose();
            }
            // Cleanup post-processing
            if (threeScene) {
                threeScene.traverse((child) => {
                    if (child.material) {
                        child.material.dispose();
                    }
                    if (child.geometry) {
                        child.geometry.dispose();
                    }
                });
            }
        };
    }, [scene, sunTexture, threeScene]);

    // Rotación del objeto
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.2;
        }
    });

    return (
        <>
            <PerspectiveCamera 
                ref={cameraRef} 
                makeDefault 
                position={isMobile ? [0, 0, 65] : [0, 0, 50]} 
                fov={isMobile ? 35 : 40}
            />
            
            <ambientLight intensity={0.5} />
            <directionalLight ref={lightRef} position={[0, 5, -5]} intensity={3} />

            {/* Shader Lens Flare */}
            <LensFlareShader />
            
            {/* Partículas espaciales */}
            {initialStarStates.map((state, i) => (
              <Space key={i} initialState={state} />
            ))}
            
            {/* Sol con textura */}
            <mesh position={[0, 0, -50]}>
                <planeGeometry args={[300, 200]} />
                <meshBasicMaterial map={sunTexture} transparent opacity={1} />
            </mesh>

            {/* Objeto GLB */}
            {scene && (
                <primitive 
                    ref={meshRef}
                    object={scene} 
                />
            )}

            {!isMobile && (
                <EffectComposer ref={composerRef}>
                    <Bloom 
                        intensity={0.3}
                        luminanceThreshold={0.4}
                        luminanceSmoothing={0.9}
                        height={300}
                        mipmapBlur={true}
                    />
                </EffectComposer>
            )}
        </>
    );
};


// Preload function (modified to work with useGLTF)
Scene3.preload = async (onProgress) => {
  const [gltf] = await Promise.all([
    useGLTF.preload('/webgl/principito.glb'),
    new Promise((resolve) => {
      const textureLoader = new TextureLoader();
      textureLoader.load('/webgl/eso0932a.jpg', () => {
        textureLoader.load('/webgl/flare.png', () => {
          resolve();
        });
      });
    })
  ]);
  return gltf;
};


export default Scene3;
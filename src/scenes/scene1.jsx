// Scene1.jsx
import { useRef, useEffect, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { AudioListener, Audio, AudioLoader } from 'three';

const MODEL_PATH = '/webgl/statue.glb';

const Butterfly = ({ centerPosition }) => {
    const wingRef = useRef();
    
    const initialState = useMemo(() => ({
        position: [
            (Math.random() - 0.5) * 5,
            (Math.random() - 0.5) * 5 - 3,
            (Math.random() - 0.5) * 5
        ],
        speed: 0.1 + Math.random() * 0.2,
        direction: Math.random() > 0.5 ? 1 : -1,
        phaseOffset: Math.random() * Math.PI * 2,
        opacityTimer: Math.random() * 1.5 // Random duration up to 1.5 seconds
    }), []);

    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime();
        
        const baseX = initialState.position[0] + Math.sin(time * initialState.speed + initialState.phaseOffset) * 1;
        const baseY = initialState.position[1] + Math.sin(time * initialState.speed * 2 + initialState.phaseOffset) * 0.5;
        const baseZ = initialState.position[2] + Math.cos(time * initialState.speed + initialState.phaseOffset) * 1;

        if (wingRef.current) {
            wingRef.current.position.set(baseX, baseY, baseZ);

            // Smooth opacity transition
            const opacityPhase = (time % initialState.opacityTimer) / initialState.opacityTimer;
            const smoothOpacity = Math.sin(opacityPhase * Math.PI) * 0.6; // Smooth transition using sine
            wingRef.current.material.opacity = opacityPhase < 0.5 ? 0 : smoothOpacity;
        }
    });

    return (
        <mesh ref={wingRef}>
            <circleGeometry args={[0.03, 32]} />
            <meshBasicMaterial color="#ffd700" transparent opacity={0.6} side={2} />
        </mesh>
    );
};

const Scene1 = () => {
    const meshRef = useRef();
    const [isModelReady, setIsModelReady] = useState(false);
    const { scene, isLoading } = useGLTF(MODEL_PATH, true);

    useEffect(() => {
        // Audio setup
        const listener = new AudioListener();
        const sound = new Audio(listener);
        const audioLoader = new AudioLoader();

        audioLoader.load('/webgl/chant.mp3', (buffer) => {
            sound.setBuffer(buffer);
            sound.setVolume(1.0);
            sound.play();
        });

        return () => {
            sound.stop();
            sound.buffer = null;
        };
    }, []);

    useEffect(() => {
        if (scene && !isLoading) {
            scene.rotation.set(0, 0, 0);
            scene.position.set(0, 0, 0);
            scene.scale.set(50, 50, 50);
            setIsModelReady(true);
        }
        return () => {
            setIsModelReady(false)
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
        };
    }, [scene, isLoading]);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.1;
        }
    });

    if (!isModelReady) return null;

    return (
        <>
            <color attach="background" args={['#000000']} />
            
            
            <directionalLight position={[5, 5, 5]} intensity={4} color={'#cd7f32'} />
            <directionalLight position={[-5, 5, -5]} intensity={2} color={'#ffffff'} />
            

            <PerspectiveCamera makeDefault position={[0, -3, 5]} fov={70} />

            {/* Agregamos 20 mariposas */}
            {Array.from({ length: 105 }).map((_, i) => (
                <Butterfly key={i} centerPosition={[0, 0, 0]} />
            ))}

            <group ref={meshRef} position={[0, 0, 0]}>
                <primitive object={scene} dispose={null} />
            </group>
        </>
    );
};

// Método estático para precargar
// En el método preload
Scene1.preload = (onProgress) => {
    return new Promise((resolve) => {
        const loader = new GLTFLoader();
        
        loader.load(
            MODEL_PATH,
            (gltf) => {
                useGLTF.preload(MODEL_PATH);
                resolve();
            },
            (xhr) => {
                if (onProgress) {
                    // xhr.loaded representa los bytes cargados
                    // xhr.total representa el total de bytes
                    const progress = xhr.loaded / xhr.total;
                    onProgress(progress);
                }
            },
            (error) => {
                console.error('Error loading model:', error);
                resolve(); // Resolvemos igual para no bloquear la carga
            }
        );
    });
};

export default Scene1;
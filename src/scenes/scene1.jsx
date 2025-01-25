// Scene1.jsx
import { useRef, useEffect, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { AudioListener, Audio, AudioLoader } from 'three';

const MODEL_PATH = '/webgl/statue.glb';

const Butterfly = () => {
    const wingRef = useRef();
    
    const position = useMemo(() => [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
    ], []);

    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime();
        
        // Movimiento base de la mariposa
        const baseX = position[0] + Math.sin(time + position[0]) * 2;
        const baseY = position[1] + Math.cos(time + position[1]) * 2;
        const baseZ = position[2] + Math.sin(time + position[2]) * 2;

        if (wingRef.current) {
            // Posición del círculo
            wingRef.current.position.set(baseX, baseY, baseZ);
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
            
            <ambientLight intensity={1.5} />
            <directionalLight position={[5, 5, 5]} intensity={3} />
            <spotLight position={[0, 5, 0]} intensity={40} angle={0.5} penumbra={1} />

            <PerspectiveCamera makeDefault position={[0, -3, 5]} fov={70} />

            {/* Agregamos 20 mariposas */}
            {Array.from({ length: 80 }).map((_, i) => (
                <Butterfly key={i} />
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
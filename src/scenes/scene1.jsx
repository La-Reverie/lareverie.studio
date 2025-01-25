// Scene1.jsx
import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Scene1 = () => {
    const meshRef = useRef();
    const [isModelReady, setIsModelReady] = useState(false);
    const { scene, isLoading } = useGLTF('/wegbl/statue.glb', true);

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
            meshRef.current.rotation.y += delta * 0.5;
        }
    });

    if (!isModelReady) return null;

    return (
        <>
            <color attach="background" args={['#000000']} />
            
            <ambientLight intensity={1.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <spotLight position={[0, 5, 0]} intensity={10} angle={0.5} penumbra={1} />

            <PerspectiveCamera makeDefault position={[0, -3, 5]} fov={70} />

            <group ref={meshRef} position={[0, 0, 0]}>
                <primitive object={scene} dispose={null} />
            </group>
        </>
    );
};

// Método estático para precargar
Scene1.preload = (onProgress) => {
    return new Promise((resolve) => {
        const loader = new GLTFLoader();
        
        loader.load(
            '/img/statue.glb',
            (gltf) => {
                useGLTF.preload('/img/statue.glb');
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
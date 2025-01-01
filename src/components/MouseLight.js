import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function MouseLight({ camRef }) {
  const [globalCoords, setGlobalCoords] = useState({ x: 0, y: 0 });
  const ref = useRef();
  const [pos, setPos] = useState(new THREE.Vector3(0, 0, 0));

  // Track mouse coordinates
  useEffect(() => {
    const handleWindowMouseMove = (event) => {
      setGlobalCoords({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleWindowMouseMove);

    return () => window.removeEventListener('mousemove', handleWindowMouseMove);
  }, []);

  // Convert mouse coordinates to 3D position
  useEffect(() => {
    if (!camRef.current) return;
    const vector = new THREE.Vector3(
      (globalCoords.x / window.innerWidth) * 2 - 1,
      -(globalCoords.y / window.innerHeight) * 2 + 1,
      0.5
    );
    vector.unproject(camRef.current);
    const dir = vector.sub(camRef.current.position).normalize();
    const distance = -camRef.current.position.z / dir.z;
    const newPos = camRef.current.position.clone().add(dir.multiplyScalar(distance));
    setPos(newPos);
  }, [globalCoords, camRef]);

  useFrame(() => {
    if (ref.current) ref.current.position.set(pos.x, pos.y, pos.z);
  });

  return (
    <pointLight
      ref={ref}
      color="white"
      intensity={80} // Increased intensity for visibility
      distance={20} // Adjust to ensure it covers the scene
      decay={0}
      position={pos}
      castShadow
      shadow-bias={-0.001}
    />
  );
}

export default MouseLight;
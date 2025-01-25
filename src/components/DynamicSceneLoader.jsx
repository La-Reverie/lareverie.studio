import { useState, useRef, createElement } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';

const DynamicSceneLoader = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [currentScene, setCurrentScene] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const loadingTimeoutRef = useRef(null);

  const handlePressStart = () => {
    console.log('-------------------');
    console.log('Press Start');
    setIsPressed(true);
    const startTime = Date.now();
    const duration = 2000;

    const loadScene = async () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setLoadingProgress(progress);

      if (progress < 1) {
        loadingTimeoutRef.current = requestAnimationFrame(loadScene);
      } else {
        console.log('Loading Complete');
        setIsTransitioning(true);
        try {
          const randomSceneIndex = Math.floor(Math.random() * 1) + 1;
          console.log(`Attempting to preload Scene${randomSceneIndex}`);
          
          // Iniciamos la carga
          setLoadingProgress(0.2); // Indicamos inicio de carga
          
          const { default: RandomScene } = await import(`../scenes/scene${randomSceneIndex}`);
          setLoadingProgress(0.5); // Escena importada
          
          // Esperamos a que el modelo se precargue y actualizamos el progreso
          await RandomScene.preload?.((progress) => {
            setLoadingProgress(0.5 + progress * 0.5); // 50% a 100%
          });
          
          console.log(`Scene${randomSceneIndex} preloaded successfully`);
          setCurrentScene(() => RandomScene);
          setIsTransitioning(false);
          
        } catch (error) {
          console.error('Error loading scene:', error);
          setIsTransitioning(false);
        }
      }
    };

    loadingTimeoutRef.current = requestAnimationFrame(loadScene);
  };

  const handlePressEnd = () => {
    console.log('-------------------');
    console.log('Press End');
    setIsTransitioning(true);
    setTimeout(() => {
      setIsPressed(false);
      setLoadingProgress(0);
      
      if (currentScene) {
        console.log('Clearing current scene');
        setCurrentScene(null);
      }

      setTimeout(() => {
        console.log('Transition end');
        setIsTransitioning(false);
      }, 300);
    }, 300);

    if (loadingTimeoutRef.current) {
      console.log('Canceling animation frame');
      cancelAnimationFrame(loadingTimeoutRef.current);
    }
  };

  return (
    <div 
      className="relative w-full h-screen"
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
    >
      <div className={`absolute inset-0 bg-red-400 ${currentScene ? 'z-10' : 'z-0'}`}>
        <Canvas className="absolute inset-0">
          {currentScene && createElement(currentScene)}
        </Canvas>
      </div>

      <AnimatePresence>
        {isTransitioning && (
          <motion.div 
            className="absolute inset-0 bg-white pointer-events-none z-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {isPressed && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            className="h-1 bg-white"
            initial={{ width: "0%" }}
            animate={{ width: `${loadingProgress * 100}%` }}
            transition={{ duration: 0, ease: "linear" }}
            style={{
              maxWidth: "80vw",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DynamicSceneLoader;
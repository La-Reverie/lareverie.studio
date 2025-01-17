import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

function Frame() {
  const [currentText, setCurrentText] = useState("");
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const controls = useAnimation();
  const messagesRef = useRef(null);
  const throttleTimeout = useRef(null);
  const debounceTimeout = useRef(null);

  const messages = [
    { section: "#welcome", text: "Scroll down please." },
    { section: "#home", text: "Crafting digital magic." },
    { section: "#sales", text: "Your digital goals, our proven expertise." },
    { section: "#the-studio", text: "Where ideas take their digital form." },
    { section: "#team", text: "The passionate minds behind the code." },
    { section: "#contact", text: "Ready to create something amazing together?" },
    { section: "default", text: "Scroll down please" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (throttleTimeout.current) {
        return;
      }
      throttleTimeout.current = setTimeout(() => {
        if (debounceTimeout.current) {
          clearTimeout(debounceTimeout.current);
        }
        debounceTimeout.current = setTimeout(() => {
          const currentSection = getCurrentSection();
          const newMessageIndex = messages.findIndex(
            (m) => m.section === currentSection
          );

          if (newMessageIndex !== -1 && newMessageIndex !== currentMessageIndex) {
            setCurrentMessageIndex(newMessageIndex);
          }
          debounceTimeout.current = null;
        }, 200);

        throttleTimeout.current = null;
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll(); // Trigger on initial load
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentMessageIndex]);

  useEffect(() => {
    const typeMessage = async () => {
      await controls.start({ opacity: 1, transition: { duration: 0.1 } });
      setCurrentText(""); // Clear previous text
      const newMessage = messages[currentMessageIndex].text;
      for (let i = 0; i <= newMessage.length; i++) {
        setCurrentText(newMessage.slice(0, i));
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
    };

    if (currentMessageIndex !== -1) {
      typeMessage(); // Type the new message
    }
  }, [currentMessageIndex, controls]);

  const getCurrentSection = () => {
    let currentSection = "default";
    const sections = messages.map((m) => m.section);
    for (const section of sections) {
      if (section === "default") continue;
      const element = document.querySelector(section);
      if (element) {
        const elementTop = element.offsetTop;
        const elementHeight = element.offsetHeight;
        const scrollY = window.scrollY || window.pageYOffset;
  
        // Verificación mejorada para visibilidad, solo actualiza si la sección está estable en la vista
        const margin = window.innerHeight * 0.2; // 20% de la altura de la ventana como margen
  
        if (
          scrollY + window.innerHeight - margin >= elementTop &&
          scrollY + margin <= elementTop + elementHeight
        ) {
          // Solo actualiza si la sección está completamente dentro del campo de visión
          if (currentSection !== section) {
            currentSection = section;
            break;
          }
        }
      }
    }
    return currentSection;
  };

  return (
    <motion.div
      className="fixed bottom-0 min-h-[40px] left-0 w-full bg-gray-900 text-white text-center py-3 z-50"
      animate={controls}
    >
      <motion.span ref={messagesRef} className="text-lg md:text-xl font-medium">
        {currentText}
      </motion.span>
    </motion.div>
  );
}

export default Frame;
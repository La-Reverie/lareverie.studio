import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

function Frame() {
    const [currentText, setCurrentText] = useState("");
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const controls = useAnimation();
    const messagesRef = useRef(null);
    const throttleTimeout = useRef(null);
    const debounceTimeout = useRef(null);
    const scrollTimeout = useRef(null);

    const messages = [
        { section: "#welcome", text: "Scroll down please." },
        { section: "#home", text: "Crafting digital magic." },
        { section: "#sales", text: "Your digital goals, our proven expertise." },
        { section: "#the-studio", text: "Where ideas take their digital form." },
        { section: "#team", text: "The passionate minds behind the code." },
        { section: "#contact", text: "Let's work together!" },
        { section: "default", text: "Scroll down please" },
    ];

    const typeMessage = async () => {
            await controls.start({ opacity: 1, transition: { duration: 0.1 } });
            setCurrentText(""); // Clear previous text
            const newMessage = messages[currentMessageIndex].text;
            for (let i = 0; i <= newMessage.length; i++) {
                setCurrentText(newMessage.slice(0, i));
                await new Promise((resolve) => setTimeout(resolve, 50));
            }
            await new Promise((resolve) => setTimeout(resolve, 100));
           await controls.start({ opacity: 0, transition: { duration: 0.3 } });
            setCurrentText("");
        };


    useEffect(() => {
        const handleScroll = () => {
            if (throttleTimeout.current) {
                clearTimeout(throttleTimeout.current)
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
                 throttleTimeout.current = null
                 if (scrollTimeout.current) {
                    clearTimeout(scrollTimeout.current);
                }
                 scrollTimeout.current = setTimeout(() => {
                    if (currentMessageIndex !== -1) {
                        typeMessage()
                    }
                  }, 2000);
              }, 100);
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [currentMessageIndex]);



    useEffect(() => {

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

                if (
                    scrollY + window.innerHeight / 2 >= elementTop &&
                    scrollY + window.innerHeight / 2 < elementTop + elementHeight
                ) {
                     if(currentSection !== section){
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
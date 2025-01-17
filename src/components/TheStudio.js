import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2, duration: 0.8 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function TheStudio() {
  const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

  return (
    <section
      id="the-studio"
      className="bg-gradient-to-br from-blue-800 to-purple-900 py-20 relative overflow-hidden"
    >
      {/* Anchor for scrolling */}
      <div className="anchor absolute -top-24" aria-hidden="true"></div>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-10 right-10 bg-purple-500 rounded-full w-20 h-20 blur-3xl opacity-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
      <motion.div
        className="absolute bottom-20 left-10 bg-blue-500 rounded-full w-28 h-28 blur-2xl opacity-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 2, delay: 0.8 }}
      />

      {/* Content Container */}
      <motion.div
        className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center lg:items-start"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
      >
        <div className="lg:w-1/2 lg:pr-10 flex-1">
          <motion.h2
            className="text-4xl lg:text-5xl font-bold text-gray-100 mb-12 relative"
            variants={itemVariants}
          >
            <span className="relative z-10 pr-4 ">
              The Studio
            </span>
          </motion.h2>

          <motion.article
            className="text-gray-300 text-lg lg:text-xl font-normal leading-relaxed space-y-8"
            variants={itemVariants}
          >
            <motion.h3
              className="text-2xl lg:text-3xl font-bold text-gray-200 mb-6"
              variants={itemVariants}
            >
              Technical foundations. Unlimited ideas. Flawless execution.
            </motion.h3>

            <p>
              <span className="font-bold text-gray-100">La Reverie Studio</span> draws its spirit
              from “The Little Prince,” inviting us to see the world through the lens of childhood
              wonder – a time when everything was magical, creativity flowed effortlessly, and we
              were fully present without the need for explanations. At La Reverie Studio, we believe
              in tapping into that boundless curiosity. Each project is a fresh discovery and every
              design emerges from an open heart and imaginative mind.
            </p>

            <p>
              <span className="font-bold text-gray-100">La Reverie Studio</span> embraces this ethos by
              creating digital experiences that are authentic, playful, and deeply resonant. Whether
              it’s crafting a platform or designing a brand identity, we bring a touch of innocence
              and wonder to our work, celebrating creativity that feels pure, unfiltered, and
              genuinely engaging.
            </p>
          </motion.article>
        </div>
        <div className="lg:w-1/2 flex-1 lg:order-last relative max-h-[500px] order-2">
          <div
             className="relative"
            style={{
                backgroundImage: `url(/img/little-prince.png)`,
                backgroundSize: 'contain',
                backgroundPosition: isDesktop ? 'right bottom' : 'center bottom',
                backgroundRepeat: 'no-repeat',
                 width: isDesktop ? '100%' : '100vw',
                height: isDesktop ? '800px' : '400px',
                mixBlendMode: 'multiply',
                bottom: isDesktop ? '10px' : '-120px' 
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}

export default TheStudio;
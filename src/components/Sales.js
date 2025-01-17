import React from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaChartLine, FaHandshake, FaMoneyBillAlt } from 'react-icons/fa';

function Sales() {
    const salesPoints = [
        { text: "Increased brand visibility", icon: FaEye },
        { text: "Higher website traffic", icon: FaChartLine },
        { text: "Improved lead generation", icon: FaHandshake },
        { text: "Greater return on investment", icon: FaMoneyBillAlt }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
               staggerChildren: 0.2
           }
          }
        };

         const itemVariants = {
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
      };

  return (
    <section id="sales">
      <motion.div
        className="relative w-full py-16 sm:py-24 lg:py-32 bg-gray-100 text-gray-900 overflow-hidden"
         initial="hidden"
         whileInView="visible"
         viewport={{once: true, amount: 0.2}}
         variants={containerVariants}
      >
          <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] lg:w-[1000px] lg:h-[1000px] rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 blur-3xl opacity-40"></div>
           </div>
        <div className="relative container mx-auto px-6 sm:px-12 z-10">
         <h2 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-12">
             By partnering with us, you can expect:
            </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {salesPoints.map((point, index) => (
                     <motion.div
                        key={index}
                        className="bg-white p-6 rounded-md border-2 border-transparent hover:border-2 hover:border-amber-600 hover:shadow-2xl flex transition-all duration-300 items-center space-x-4"
                         variants={itemVariants}
                        >
                            <span className="text-3xl text-amber-600">
                              <point.icon />
                           </span>
                        <p className="text-xl font-semibold">
                            {point.text}
                       </p>
                    </motion.div>
                 ))}
              </div>
        </div>
    </motion.div>
    </section>
  );
}

export default Sales;
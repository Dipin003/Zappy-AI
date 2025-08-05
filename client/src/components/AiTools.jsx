import React from 'react';
import { AiToolsData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { motion } from 'framer-motion';

const AiTools = () => {
  const naviagate = useNavigate();
  const { user } = useUser();

  // Card animation variant
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.2,
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    }),
  };

  return (
    <div
      className="px-4 sm:px-20 xl:px-32 py-16 rounded-3xl"
      style={{
        background: 'linear-gradient(to right, #f0f4ff, #fdfcff)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h2 className="text-slate-700 font-semibold  text-[27px] sm:text-[40px]">
          PowerFull AI Tools
        </h2>
        <p className="text-gray-500 px-5 max-w-lg mx-auto">
          Transform your ideas into impactful content with our intelligent AI toolkit.
        </p>
      </motion.div>

      <div className="flex flex-wrap mt-10 justify-center">
        {AiToolsData.map((tool, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            variants={cardVariants}
            viewport={{ once: true, amount: 0.3 }}
            className="p-8 m-4 max-w-xs rounded-lg bg-[#FDFDFE] shadow-lg border border-gray-100 hover:-translate-y-1 hover:border-gray-400 transition-all duration-300 cursor-pointer"
            onClick={() => user && naviagate(tool.path)}
          >
            <tool.Icon
              className="w-12 h-12 p-3 text-white rounded-xl"
              style={{
                background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`,
              }}
            />
            <h3 className="mt-6 mb-3 text-lg font-semibold">{tool.title}</h3>
            <p className="text-gray-400 text-sm max-w-[95%]">{tool.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AiTools;

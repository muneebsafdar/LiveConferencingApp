'use client';

import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0C2B4E] text-[#F4F4F4]">
      {/* Animated Ring */}
      <motion.div
        className="relative w-20 h-20"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.4, ease: 'linear' }}
      >
        <div
          className="absolute inset-0 rounded-full border-4 border-t-[#1D546C] border-r-[#1A3D64] border-b-transparent border-l-transparent"
        ></div>
      </motion.div>

      {/* Subtle Pulse Text */}
      <motion.p
        className="mt-6 text-lg tracking-wide font-medium"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        Preparing your meeting...
      </motion.p>
    </div>
  );
};

export default Loader;

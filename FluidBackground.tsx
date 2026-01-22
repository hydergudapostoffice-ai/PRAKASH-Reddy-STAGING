/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { motion } from 'framer-motion';

const FluidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-900">
      
      {/* Premium Dark Gradient Base: Slate-900 to Red-950 to Slate-900 */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#2a0a0a] to-slate-900" />

      {/* Blob 1: Deep Red - Top Left */}
      <motion.div
        className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-[#7f1d1d] rounded-full mix-blend-screen filter blur-[120px] opacity-20 will-change-transform"
        animate={{
          x: [0, 50, -25, 0],
          y: [0, -25, 25, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Blob 2: Slate/Blueish - Bottom Right */}
      <motion.div
        className="absolute bottom-[-20%] right-[-10%] w-[90vw] h-[90vw] bg-[#1e293b] rounded-full mix-blend-screen filter blur-[100px] opacity-30 will-change-transform"
        animate={{
          x: [0, -50, 25, 0],
          y: [0, 50, -25, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transform: 'translateZ(0)' }}
      />
      
      {/* Blob 3: Center Red Glow */}
      <motion.div
        className="absolute top-[30%] left-[30%] w-[40vw] h-[40vw] bg-[#ef4444] rounded-full mix-blend-overlay filter blur-[150px] opacity-10 will-change-transform"
        animate={{
           scale: [1, 1.2, 1],
           opacity: [0.05, 0.1, 0.05]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Static Grain Overlay for Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
    </div>
  );
};

export default FluidBackground;
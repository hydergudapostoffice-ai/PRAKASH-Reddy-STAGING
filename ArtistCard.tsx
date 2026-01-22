/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { motion } from 'framer-motion';
import { Scheme } from '../types';
import { ArrowUpRight, Shield, Calculator } from 'lucide-react';

interface SchemeCardProps {
  scheme: Scheme;
  index: number;
  onCalcClick: (scheme: Scheme) => void;
}

const SchemeCard: React.FC<SchemeCardProps> = ({ scheme, index, onCalcClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 h-[420px] flex flex-col justify-between hover:bg-white/20 hover:border-red-500/40 hover:shadow-2xl hover:shadow-red-900/20 transition-all duration-500 cursor-pointer overflow-hidden"
      onClick={() => onCalcClick(scheme)}
      data-hover="true"
    >
      {/* Decorative gradient blob inside card */}
      <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-10 group-hover:opacity-30 transition-opacity ${scheme.color === 'red' ? 'bg-red-500' : scheme.color === 'green' ? 'bg-emerald-500' : 'bg-slate-500'}`} />

      <div>
        <div className="flex justify-between items-start mb-6">
           <span className={`text-[10px] font-bold uppercase tracking-widest py-1.5 px-3 rounded-full border ${
             scheme.color === 'red' ? 'bg-red-500/10 text-red-200 border-red-500/20' : 
             scheme.color === 'green' ? 'bg-emerald-500/10 text-emerald-200 border-emerald-500/20' : 
             'bg-slate-700/30 text-slate-300 border-slate-600/30'
           }`}>
             {scheme.badge}
           </span>
           <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-slate-300 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-500 transition-all duration-300">
             <ArrowUpRight className="w-5 h-5" />
           </div>
        </div>

        <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-red-300 transition-colors">
          {scheme.title}
        </h3>
        
        <div className="text-3xl font-black text-slate-100 mb-4 tracking-tight drop-shadow-md">
          {scheme.rate}
        </div>

        <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
          {scheme.description}
        </p>
      </div>

      <div>
         <div className="h-px w-full bg-white/10 mb-4" />
         <ul className="space-y-2">
           {scheme.benefits.map((benefit, i) => (
             <li key={i} className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wide">
               <Shield className="w-3 h-3 text-red-400" /> {benefit}
             </li>
           ))}
         </ul>
         
         <div className="mt-6 flex items-center gap-2 text-red-300 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
            <Calculator className="w-4 h-4" /> Calculate Returns
         </div>
      </div>
    </motion.div>
  );
};

export default SchemeCard;
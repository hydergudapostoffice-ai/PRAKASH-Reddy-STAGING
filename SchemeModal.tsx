/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Calculator, FileText, ArrowRight, Wallet, ShieldCheck } from 'lucide-react';
import { Scheme } from '../types';
import SchemeCalculator from './SchemeCalculator';

interface SchemeModalProps {
  scheme: Scheme | null;
  onClose: () => void;
}

const SchemeModal: React.FC<SchemeModalProps> = ({ scheme, onClose }) => {
  if (!scheme) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 overflow-y-auto py-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/90 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl shadow-2xl shadow-black/80 overflow-hidden my-auto"
        >
          {/* Header */}
          <div className="relative p-6 border-b border-white/5 bg-slate-900/50">
             <div className="flex justify-between items-start gap-4">
               <div>
                 <span className={`inline-block text-[10px] font-bold uppercase tracking-widest py-1.5 px-3 rounded-full border mb-3 ${
                   scheme.color === 'red' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                   scheme.color === 'green' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                   'bg-slate-700/30 text-slate-300 border-slate-600/30'
                 }`}>
                   {scheme.badge}
                 </span>
                 <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">{scheme.title}</h3>
                 <p className="text-slate-400 text-sm mt-2 font-light leading-relaxed max-w-lg">{scheme.description}</p>
               </div>
               <button 
                 onClick={onClose}
                 className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
               >
                 <X className="w-5 h-5" />
               </button>
             </div>
          </div>

          <div className="p-6 space-y-8 overflow-y-auto max-h-[75vh] md:max-h-auto">
            
            {/* Dynamic Calculator Section (replaces static example if config exists) */}
            {scheme.calculatorConfig ? (
               <SchemeCalculator scheme={scheme} />
            ) : (
              // Fallback to static if no calculator (e.g. PLI)
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-5 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-3 opacity-10">
                   <Calculator className="w-24 h-24 text-white" />
                 </div>
                 <div className="relative z-10">
                   <h4 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                     <Wallet className="w-4 h-4 text-emerald-400" /> Calculation Example
                   </h4>
                   <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-center pb-3 border-b border-white/5">
                         <span className="text-slate-400 text-sm">Investment</span>
                         <span className="text-white font-bold">{scheme.calculation.label}</span>
                      </div>
                      <div className="flex justify-between items-center">
                         <span className="text-slate-400 text-sm">Returns</span>
                         <span className={`text-xl font-black ${scheme.color === 'red' ? 'text-red-400' : scheme.color === 'green' ? 'text-emerald-400' : 'text-slate-200'}`}>
                           {scheme.calculation.value}
                         </span>
                      </div>
                   </div>
                 </div>
              </div>
            )}

            {/* Documents Section */}
            <div>
               <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                 <FileText className="w-4 h-4" /> Required Documents
               </h4>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                 {scheme.documents.map((doc, idx) => (
                   <div key={idx} className="flex items-center gap-3 bg-white/[0.03] p-3 rounded-xl border border-white/5 hover:bg-white/[0.05] transition-colors">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <span className="text-slate-300 text-sm font-medium">{doc}</span>
                   </div>
                 ))}
               </div>
            </div>

            {/* Action Button - DISABLED */}
            <div className="pt-2">
              <button
                disabled
                className="w-full py-4 bg-slate-700 text-white/50 rounded-xl font-bold uppercase tracking-widest shadow-lg flex items-center justify-center gap-3 cursor-not-allowed opacity-50 grayscale pointer-events-none"
              >
                <span>WhatsApp Service Unavailable</span>
                <ArrowRight className="w-5 h-5 opacity-50" />
              </button>
              <p className="text-center text-[10px] text-slate-500 mt-3">
                *The online chat feature is temporarily unavailable. Please visit the branch for assistance.
              </p>
            </div>

          </div>
          
          {/* Decorative Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-red-500/5 blur-[100px] pointer-events-none -z-10" />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SchemeModal;
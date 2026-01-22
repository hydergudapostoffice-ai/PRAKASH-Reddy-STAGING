/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Sparkles, PieChart } from 'lucide-react';
import { Scheme } from '../types';

interface SchemeCalculatorProps {
  scheme: Scheme;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatShortCurrency = (amount: number) => {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)} L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)} K`;
  return `₹${amount}`;
};

const SchemeCalculator: React.FC<SchemeCalculatorProps> = ({ scheme }) => {
  const config = scheme.calculatorConfig;
  
  // If no config or PLI (except specifically handled), return null
  if (!config || config.type === 'PLI') return null;

  const [inputValue, setInputValue] = useState(config.defaultValue);

  // --- CALCULATION LOGIC ---
  const result = useMemo(() => {
    let invested = 0;
    let maturity = 0;
    let tenureText = '';

    switch (config.type) {
      case 'SSY':
        // Logic: Yearly Input. Invested = Input * 15 years. Maturity ≈ Invested * 3 (Approx based on 8.2% for 21 yrs)
        invested = inputValue * 15;
        maturity = inputValue * 21 * 1.5; 
        tenureText = '21 Years';
        break;
        
      case 'KVP':
        // Logic: Lumpsum. Invested = Input. Maturity = Input * 2
        invested = inputValue;
        maturity = inputValue * 2;
        tenureText = '115 Months';
        break;

      case 'RD':
        // Logic: Monthly. Invested = Input * 60 (5 yrs). Maturity = Invested * 1.18
        invested = inputValue * 60;
        maturity = invested * 1.18; // Approx 6.7% compounded
        tenureText = '5 Years';
        break;

      case 'SCSS':
      case 'MIS':
        // Logic: Income Schemes. Invested = Input. Total Benefit = Input + Interest over 5 years
        invested = inputValue;
        const rate = config.type === 'SCSS' ? 0.082 : 0.074;
        const totalInterest = inputValue * rate * 5;
        maturity = inputValue + totalInterest; // Principal + Total Interest Payouts
        tenureText = '5 Years';
        break;

      case 'NSC':
      case 'FD':
        // Logic: 5 Year Growth. 
        invested = inputValue;
        const multiplier = config.type === 'NSC' ? 1.449 : 1.44; // Approx for 7.7% and 7.5%
        maturity = inputValue * multiplier;
        tenureText = '5 Years';
        break;
        
      default:
        invested = inputValue;
        maturity = inputValue;
    }

    const gain = maturity - invested;
    // Calculate percentages for Donut Chart
    // Total is Maturity (100%)
    // Interest %
    const interestPercent = (gain / maturity) * 100;
    
    return { invested, maturity, tenureText, gain, interestPercent };
  }, [inputValue, config.type]);

  return (
    <div className="bg-slate-800/50 rounded-2xl p-5 border border-white/10 shadow-inner">
      <div className="flex items-center gap-2 mb-6">
        <PieChart className="w-5 h-5 text-emerald-400" />
        <h4 className="text-sm font-bold text-white uppercase tracking-wider">
          Smart Growth Calculator
        </h4>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* INPUT SECTION */}
        <div className="flex-1 w-full space-y-6">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2 block">
              {config.inputLabel}
            </label>
            <div className="text-3xl font-bold text-white mb-4">
              {config.prefix}{inputValue.toLocaleString('en-IN')}{config.suffix}
            </div>
            <input 
              type="range"
              min={config.min}
              max={config.max}
              step={config.step}
              value={inputValue}
              onChange={(e) => setInputValue(Number(e.target.value))}
              className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-[#D8232A]"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-mono">
              <span>{formatShortCurrency(config.min)}</span>
              <span>{formatShortCurrency(config.max)}</span>
            </div>
          </div>
          
          <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-emerald-400 uppercase">Total Profit</span>
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl font-black text-white">
              +{formatShortCurrency(result.gain)}
            </div>
            <div className="text-[10px] text-emerald-300 mt-1">
              Interest Earned over {result.tenureText}
            </div>
          </div>
        </div>

        {/* DONUT CHART SECTION */}
        <div className="flex-1 flex flex-col items-center justify-center">
           
           <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full shadow-[0_0_40px_rgba(16,185,129,0.1)] flex items-center justify-center border-4 border-slate-800"
                style={{
                  background: `conic-gradient(#10B981 0% ${result.interestPercent}%, #334155 ${result.interestPercent}% 100%)`
                }}
           >
              {/* Inner Hole (creates donut) */}
              <div className="absolute w-[80%] h-[80%] bg-slate-900 rounded-full flex flex-col items-center justify-center z-10 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                 <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Maturity Amount</span>
                 <motion.span 
                   key={result.maturity}
                   initial={{ scale: 0.8, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   className="text-2xl md:text-3xl font-black text-white"
                 >
                   {formatShortCurrency(result.maturity)}
                 </motion.span>
              </div>
           </div>

           {/* Legend */}
           <div className="mt-6 w-full flex justify-center gap-6">
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                 <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">You Pay</span>
                    <span className="text-xs font-bold text-slate-300">{formatShortCurrency(result.invested)}</span>
                 </div>
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse"></div>
                 <div className="flex flex-col">
                    <span className="text-[10px] text-emerald-500 uppercase font-bold">You Get (Interest)</span>
                    <span className="text-xs font-bold text-emerald-400">+{formatShortCurrency(result.gain)}</span>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};

export default SchemeCalculator;
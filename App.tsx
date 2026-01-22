/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Landmark, Phone, ArrowRight, ShieldCheck, TrendingUp, Users, Menu, X, Calculator, MessageCircle, MapPin, Clock } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import CustomCursor from './components/CustomCursor';
import SchemeCard from './components/ArtistCard'; 
import AIChat from './components/AIChat';
import SchemeModal from './components/SchemeModal';
import { Scheme } from './types';

// Constants
const MOBILE = "919347133286";

const SCHEMES: Scheme[] = [
  { 
    id: '2', 
    title: 'Sukanya Samriddhi', 
    badge: 'GIRL CHILD', 
    rate: '8.2% Interest',
    description: 'Secure your daughter\'s future with the highest interest rate government scheme. Tax benefits under 80C.',
    benefits: ['Highest Rate', 'Tax Free', 'Secure Future'],
    color: 'green',
    calculation: { label: '', value: '' },
    calculatorConfig: {
      type: 'SSY',
      inputLabel: 'Yearly Investment',
      min: 10000,
      max: 150000,
      step: 5000,
      defaultValue: 50000,
      prefix: '₹'
    },
    documents: ['Aadhaar (Parent)', 'PAN Card', 'Birth Certificate', 'Photos'],
    whatsappText: 'I want to open a Sukanya Samriddhi Account for my daughter.'
  },
  { 
    id: '8', 
    title: 'Recurring Deposit', 
    badge: 'START SMALL', 
    rate: '6.7% Interest',
    description: 'Start saving with just ₹100/month. Build a big corpus systematically over 5 years.',
    benefits: ['Small Savings', 'Disciplined', 'Easy Withdrawal'],
    color: 'slate',
    calculation: { label: '', value: '' },
    calculatorConfig: {
      type: 'RD',
      inputLabel: 'Monthly Savings',
      min: 500,
      max: 20000,
      step: 500,
      defaultValue: 5000,
      prefix: '₹',
      suffix: '/mo'
    },
    documents: ['Aadhaar Card', 'PAN Card', '2 Passport Photos'],
    whatsappText: 'I want to start a Recurring Deposit account.'
  },
  { 
    id: '3', 
    title: 'Senior Citizen Savings', 
    badge: 'AGE 60+', 
    rate: '8.2% Interest',
    description: 'Regular quarterly income for peace of mind in retirement. Safe and secure investment for seniors.',
    benefits: ['Quarterly Payout', 'Tax Benefits', 'Safe'],
    color: 'slate',
    calculation: { label: '', value: '' },
    calculatorConfig: {
      type: 'SCSS',
      inputLabel: 'Lumpsum Investment',
      min: 100000,
      max: 3000000,
      step: 50000,
      defaultValue: 1000000,
      prefix: '₹'
    },
    documents: ['Aadhaar Card', 'PAN Card', '2 Passport Photos'],
    whatsappText: 'I want to invest in Senior Citizen Savings Scheme.'
  },
  { 
    id: '4', 
    title: 'Monthly Income Scheme', 
    badge: 'MONTHLY PAYOUT', 
    rate: '7.4% Interest',
    description: 'Guaranteed monthly income on your lump sum investment. Best for regular cash flow needs.',
    benefits: ['Monthly Income', 'No Risk', '5 Year Term'],
    color: 'slate',
    calculation: { label: '', value: '' },
    calculatorConfig: {
      type: 'MIS',
      inputLabel: 'Lumpsum Investment',
      min: 50000,
      max: 900000,
      step: 10000,
      defaultValue: 300000,
      prefix: '₹'
    },
    documents: ['Aadhaar Card', 'PAN Card', '2 Passport Photos'],
    whatsappText: 'I want to start a Monthly Income Scheme.'
  },
  { 
    id: '5', 
    title: 'Kisan Vikas Patra', 
    badge: 'DOUBLE MONEY', 
    rate: 'Double in 115 Mo',
    description: 'Watch your investment multiply. A safe and secure way to double your money with sovereign guarantee.',
    benefits: ['Double Returns', 'Transferable', 'Flexible Exit'],
    color: 'red',
    calculation: { label: '', value: '' },
    calculatorConfig: {
      type: 'KVP',
      inputLabel: 'Lumpsum Investment',
      min: 10000,
      max: 500000,
      step: 5000,
      defaultValue: 100000,
      prefix: '₹'
    },
    documents: ['Aadhaar Card', 'PAN Card', '2 Passport Photos'],
    whatsappText: 'I want to double my money in Kisan Vikas Patra.'
  },
  { 
    id: '6', 
    title: 'Nat. Savings Cert.', 
    badge: 'TAX SAVER', 
    rate: '7.7% Interest',
    description: 'Five year fixed investment with Section 80C tax deduction benefit. Compound interest coupled with safety.',
    benefits: ['Tax Deduction', 'Compounded', 'Loan Collateral'],
    color: 'green',
    calculation: { label: '', value: '' },
    calculatorConfig: {
      type: 'NSC',
      inputLabel: 'Investment Amount',
      min: 10000,
      max: 500000,
      step: 5000,
      defaultValue: 50000,
      prefix: '₹'
    },
    documents: ['Aadhaar Card', 'PAN Card', '2 Passport Photos'],
    whatsappText: 'I want to invest in NSC for Tax Saving.'
  },
  { 
    id: '7', 
    title: 'Time Deposit (FD)', 
    badge: '1-5 YEARS', 
    rate: '7.5% Interest',
    description: 'Fixed deposits for 1, 2, 3 or 5 years. Quarterly compounded interest with payout options.',
    benefits: ['Flexible Tenure', 'Better than Bank', 'Govt Safety'],
    color: 'slate',
    calculation: { label: '', value: '' },
    calculatorConfig: {
      type: 'FD',
      inputLabel: 'Fixed Deposit Amount',
      min: 20000,
      max: 1000000,
      step: 10000,
      defaultValue: 100000,
      prefix: '₹'
    },
    documents: ['Aadhaar Card', 'PAN Card', '2 Passport Photos'],
    whatsappText: 'I want to open a Post Office Fixed Deposit.'
  },
  { 
    id: '1', 
    title: 'Postal Life Insurance', 
    badge: 'GRADUATES ONLY', 
    rate: 'Low Premium',
    description: 'The most affordable life insurance with the highest bonus rates in the market. Exclusive for graduates and professionals.',
    benefits: ['High Bonus', 'Low Premium', 'Govt Guarantee'],
    color: 'red',
    calculation: {
      label: 'Invest ₹1,500/month',
      value: '~₹10 Lakhs (at Age 55)'
    },
    calculatorConfig: {
      type: 'PLI',
      inputLabel: 'Monthly Premium',
      min: 0, max: 0, step: 0, defaultValue: 0, prefix: ''
    },
    documents: ['Aadhaar Card', 'PAN Card', 'Degree/Diploma', '2 Passport Photos'],
    whatsappText: 'I saw the PLI calculation. I have the documents. Please help me start.'
  }
];

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="relative min-h-screen text-slate-300 selection:bg-red-500 selection:text-white cursor-auto md:cursor-none overflow-x-hidden font-sans bg-slate-900">
      <CustomCursor />
      <FluidBackground />
      <SchemeModal scheme={selectedScheme} onClose={() => setSelectedScheme(null)} />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-6 bg-slate-900/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-700 rounded-lg flex items-center justify-center text-white shadow-[0_0_15px_rgba(185,28,28,0.5)]">
            <Landmark className="w-6 h-6" />
          </div>
          <div>
            <div className="font-bold text-lg leading-none tracking-tight text-white">INDIA POST</div>
            <div className="text-xs font-medium text-slate-400 tracking-wider uppercase">Hyderguda S.O.</div>
          </div>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm font-bold tracking-widest uppercase items-center">
          {['Schemes', 'Calculators', 'Contact'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item.toLowerCase())}
              className="hover:text-red-500 transition-colors text-slate-400 cursor-pointer bg-transparent border-none"
              data-hover="true"
            >
              {item}
            </button>
          ))}
          <button 
            disabled
            className="bg-slate-700 text-white/50 px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase flex items-center gap-2 border border-white/10 opacity-50 grayscale cursor-not-allowed"
          >
            <Phone className="w-3 h-3" /> Connect (N/A)
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white z-50 relative w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
           {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-slate-900 flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {['Schemes', 'Calculators', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-3xl font-bold text-slate-200 hover:text-red-500 transition-colors uppercase bg-transparent border-none"
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header id="hero" className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4 pt-20">
        <motion.div style={{ y }} className="z-10 text-center flex flex-col items-center w-full max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-xs md:text-sm font-bold text-red-400 tracking-[0.2em] uppercase mb-8 bg-white/5 px-6 py-2 rounded-full backdrop-blur-md border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.3)]"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Sovereign Guarantee</span>
          </motion.div>

          <div className="relative w-full mb-6">
             <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[12vw] md:text-[7vw] leading-[0.9] font-black tracking-tighter text-center uppercase drop-shadow-2xl"
            >
              <span className="text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">GOVERNMENT</span><br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-slate-200 to-slate-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">GUARANTEED</span>
            </motion.h1>
          </div>
          
          <motion.div
             initial={{ scaleX: 0 }}
             animate={{ scaleX: 1 }}
             transition={{ duration: 1, delay: 0.4 }}
             className="w-32 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent mt-4 mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-2xl font-light text-slate-300 max-w-2xl mx-auto leading-relaxed px-4"
          >
            <span className="font-semibold text-white">Hyderguda S.O.</span>
            <br/>
            <span className="text-slate-400 text-base md:text-lg font-normal">Trusted wealth creation for generations.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex flex-col md:flex-row gap-5"
          >
             <button 
               onClick={() => scrollToSection('schemes')}
               className="bg-[#10B981] text-white px-8 py-4 rounded-xl text-sm font-bold tracking-widest uppercase hover:bg-[#059669] transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] flex items-center justify-center gap-3 group transform hover:-translate-y-1 border border-emerald-500/50"
               data-hover="true"
             >
               <Calculator className="w-5 h-5" />
               View Returns
               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </button>
             <button 
               onClick={() => scrollToSection('schemes')}
               className="bg-white/5 text-white backdrop-blur-md border border-white/10 px-8 py-4 rounded-xl text-sm font-bold tracking-widest uppercase hover:bg-white/10 transition-all flex items-center justify-center gap-3 hover:border-white/20"
               data-hover="true"
             >
               Browse Schemes
             </button>
          </motion.div>
        </motion.div>
      </header>

      {/* TICKER SECTION */}
      <div className="relative bg-black/40 py-4 overflow-hidden border-y border-white/5 backdrop-blur-sm">
        <motion.div 
          className="flex w-fit whitespace-nowrap"
          animate={{ x: "-50%" }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          {[0, 1, 2, 3].map((key) => (
             <div key={key} className="flex items-center gap-12 px-4">
                <span className="text-red-400 font-bold tracking-[0.2em] text-xs md:text-sm flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(220,38,38,1)]"></span>
                  TAX SEASON ALERT
                </span>
                <span className="text-slate-700 text-xs md:text-sm">/</span>
                <span className="text-white font-bold tracking-[0.2em] text-xs md:text-sm">SAVE ₹1.5 LAKH (SEC 80C)</span>
                <span className="text-slate-700 text-xs md:text-sm">/</span>
                <span className="text-emerald-400 font-bold tracking-[0.2em] text-xs md:text-sm">8.2% RETURNS</span>
                <span className="text-slate-700 text-xs md:text-sm">/</span>
                <span className="text-white font-bold tracking-[0.2em] text-xs md:text-sm">SECURE FUTURE</span>
                <span className="text-slate-700 text-xs md:text-sm">/</span>
             </div>
          ))}
        </motion.div>
      </div>

      {/* SCHEMES GRID */}
      <section id="schemes" className="relative z-10 py-32 px-4 md:px-8 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
              GROWTH <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">SCHEMES</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-md font-light">
              Government backed investment options tailored for your financial goals.
            </p>
          </div>
          <div className="flex gap-6">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 tracking-widest uppercase">
               <ShieldCheck className="w-4 h-4 text-emerald-500" /> 100% SECURE
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 tracking-widest uppercase">
               <TrendingUp className="w-4 h-4 text-emerald-500" /> HIGH RETURNS
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SCHEMES.map((scheme, index) => (
             <SchemeCard 
               key={scheme.id} 
               scheme={scheme} 
               index={index} 
               onCalcClick={(s) => setSelectedScheme(s)}
             />
          ))}
        </div>
      </section>

      {/* CONTACT CTA */}
      <section id="contact" className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto bg-slate-800/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] overflow-hidden relative shadow-2xl">
           <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600 rounded-full opacity-20 blur-[120px] -translate-y-1/2 translate-x-1/2" />
           
           <div className="relative z-10 p-10 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-xl">
                <div className="inline-block bg-red-600/20 text-red-400 border border-red-500/30 text-[10px] font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-8">
                  Official Support
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Have questions about <br/>
                  <span className="text-slate-500">Interest Rates?</span>
                </h2>
                <p className="text-slate-400 text-lg mb-10 leading-relaxed font-light">
                  Our team at <span className="text-white font-medium">Hyderguda S.O.</span> is ready to assist you. Visit us directly for instant calculations and scheme details.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-5">
                   <button 
                     disabled
                     className="bg-slate-700 text-white/50 px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 opacity-50 grayscale cursor-not-allowed pointer-events-none"
                   >
                     <MessageCircle className="w-5 h-5" /> Chat Unavailable
                   </button>
                   <div className="flex items-center gap-4 px-4 py-2 border border-white/5 rounded-xl bg-white/5 backdrop-blur-md">
                      <div className="flex -space-x-3">
                        {[1,2,3].map(i => (
                          <div key={i} className="w-8 h-8 rounded-full border border-slate-700 bg-slate-800 flex items-center justify-center text-[10px] text-white">
                             <Users className="w-3 h-3" />
                          </div>
                        ))}
                      </div>
                      <div className="text-xs text-slate-400">
                        <span className="text-white font-bold">500+</span> citizens
                      </div>
                   </div>
                </div>
              </div>
              
              <div className="relative">
                 <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-xl rounded-full border border-white/10 flex items-center justify-center p-8 text-center shadow-2xl">
                    <div>
                      <div className="text-5xl font-bold text-white mb-2 drop-shadow-lg">8.2%</div>
                      <div className="text-red-400 uppercase tracking-[0.2em] text-xs font-bold">Current Top Rate</div>
                      <div className="mt-4 text-[10px] text-slate-500 uppercase tracking-widest">Sukanya Samriddhi Yojana</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* VISIT US MAP SECTION */}
      <section id="visit" className="relative py-12 px-4 md:px-8 max-w-[1400px] mx-auto mb-12">
        <div className="bg-slate-800/40 backdrop-blur-md rounded-[2rem] shadow-2xl overflow-hidden border border-white/5 flex flex-col lg:flex-row h-auto lg:h-[500px]">
           <div className="p-10 lg:p-16 lg:w-2/5 flex flex-col justify-center relative z-10">
              <div className="inline-flex items-center gap-2 text-red-500 font-bold tracking-widest uppercase text-xs mb-6">
                <MapPin className="w-4 h-4" /> Locate Us
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8 leading-tight">
                Visit Hyderguda <br/> S.O.
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center flex-shrink-0 text-red-500 border border-white/5 group-hover:bg-red-500 group-hover:text-white transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <p className="text-slate-300 font-light leading-relaxed text-sm">
                    Opposite Pillar No. 150, <br/>
                    PVNR Expressway, Attapur, <br/>
                    Hyderabad - 500048.
                  </p>
                </div>
                
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center flex-shrink-0 text-red-500 border border-white/5 group-hover:bg-red-500 group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="text-white font-bold text-lg tracking-wide">
                    040-2956-1505
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                   <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center flex-shrink-0 text-red-500 border border-white/5 group-hover:bg-red-500 group-hover:text-white transition-colors">
                    <Clock className="w-5 h-5" />
                  </div>
                   <p className="text-slate-400 text-sm tracking-wide">
                     Mon-Sat: 09:00 AM - 05:00 PM
                   </p>
                </div>
              </div>
           </div>
           
           <div className="lg:w-3/5 bg-slate-900 relative h-[400px] lg:h-auto">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.726210214656!2d78.4326510759318!3d17.376916883508127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb97793d8e5783%3A0xe5452d3d922998a1!2sHyderguda%20Post%20Office!5e0!3m2!1sen!2sin!4v1709900000000!5m2!1sen!2sin" 
                width="100%" height="100%" 
                style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(0.83)' }} 
                allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full opacity-60 hover:opacity-100 transition-opacity duration-500"
              ></iframe>
              <div className="absolute inset-0 pointer-events-none border-l border-white/10 hidden lg:block shadow-[inset_10px_0_20px_rgba(0,0,0,0.5)]" />
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity">
            <Landmark className="w-5 h-5 text-red-600" />
            <span className="font-bold text-slate-300 tracking-widest text-sm">INDIA POST</span>
          </div>
          <div className="text-slate-600 text-xs font-medium tracking-wide">
            Hyderguda S.O. &copy; 2025
          </div>
          <div className="flex gap-6">
             <a href="#" className="text-slate-600 hover:text-red-500 transition-colors text-xs font-bold uppercase tracking-widest">Privacy</a>
             <a href="#" className="text-slate-600 hover:text-red-500 transition-colors text-xs font-bold uppercase tracking-widest">Terms</a>
          </div>
        </div>
      </footer>

      {/* Sticky FAB - DISABLED */}
      <motion.button
        disabled
        className="fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16 bg-slate-700 rounded-full flex items-center justify-center shadow-lg group border border-white/10 opacity-50 grayscale cursor-not-allowed pointer-events-none"
      >
        <Phone className="w-6 h-6 md:w-8 md:h-8 text-white fill-white opacity-50" />
      </motion.button>

      <AIChat />
    </div>
  );
};

export default App;
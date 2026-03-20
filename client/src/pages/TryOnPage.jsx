import React, { useState, Suspense } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronLeft, Info, HelpCircle, ShieldCheck, Upload, LayoutGrid, Layers, Sparkles } from 'lucide-react';
import ARFittingRoom from '../components/ar/fitting-room/ARFittingRoom';

/**
 * TryOnPage - Advanced AR Fitting Room Mirror
 */
export default function TryOn() {
  return (
    <div className="min-h-screen bg-surface-container-lowest font-manrope">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-outline-variant px-6 py-4 flex items-center justify-between">
        <Link 
          to="/products"
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-bold text-sm tracking-tight"
        >
          <ChevronLeft className="w-5 h-5" />
          BACK TO SHOWROOM
        </Link>
        
        <div className="flex items-center gap-4">
           <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">AR LIVE MIRROR ACTIVE</span>
           <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto flex flex-col gap-8">
        <div className="space-y-4 text-center">
            <h1 className="text-6xl font-black font-headline text-on-surface tracking-tighter leading-[0.9]">
              Virtual <span className="text-primary italic">Fitting</span> Room
            </h1>
            <p className="text-on-surface-variant text-lg max-w-2xl mx-auto font-medium leading-relaxed">
              Step in front of your camera. Layer clothes, switch styles, and see yourself in our 2026 collection instantly.
            </p>
        </div>
        
        <Suspense fallback={
          <div className="w-full aspect-video bg-black rounded-[40px] flex items-center justify-center border-8 border-surface-container">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <ARFittingRoom />
        </Suspense>

        {/* Pro Tips Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
           <div className="bg-white p-8 rounded-[2rem] border border-outline-variant flex flex-col items-center text-center gap-4 shadow-sm">
             <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
               <ShieldCheck className="w-6 h-6 text-primary" />
             </div>
             <div>
               <h3 className="font-bold text-on-surface">Biometric Fit</h3>
               <p className="text-xs text-on-surface-variant font-medium">Skeletal landmarks mapped with 98.4% accuracy.</p>
             </div>
           </div>
           
           <div className="bg-white p-8 rounded-[2rem] border border-outline-variant flex flex-col items-center text-center gap-4 shadow-sm">
             <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center">
               <Layers className="w-6 h-6 text-indigo-500" />
             </div>
             <div>
               <h3 className="font-bold text-on-surface">Multi-Layering</h3>
               <p className="text-xs text-on-surface-variant font-medium">Wear jackets over shirts seamlessly.</p>
             </div>
           </div>

           <div className="bg-white p-8 rounded-[2rem] border border-outline-variant flex flex-col items-center text-center gap-4 shadow-sm">
             <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center">
               <Sparkles className="w-6 h-6 text-green-500" />
             </div>
             <div>
               <h3 className="font-bold text-on-surface">Neural Shaders</h3>
               <p className="text-xs text-on-surface-variant font-medium">Real-time light and shadow simulation.</p>
             </div>
           </div>
        </div>
      </main>
    </div>
  );
}

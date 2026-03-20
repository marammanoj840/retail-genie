import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
      {/* TopAppBar */}
      <header className="sticky top-0 w-full z-50 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm dark:shadow-none">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400 text-3xl" style={{fontVariationSettings: "'FILL' 0"}}>magic_button</span>
            <span className="text-2xl font-bold bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent font-headline tracking-tight">Retail Genie</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 font-manrope">Home</Link>
            <Link to="/products" className="text-slate-600 dark:text-slate-400 hover:text-indigo-500 hover:scale-105 transition-transform duration-200 font-manrope">Search</Link>
            <Link to="/products" className="text-slate-600 dark:text-slate-400 hover:text-indigo-500 hover:scale-105 transition-transform duration-200 font-manrope">AI Assistant</Link>
            <Link to="/try-on" className="text-slate-600 dark:text-slate-400 hover:text-indigo-500 hover:scale-105 transition-transform duration-200 font-manrope">Virtual Try-On</Link>
          </nav>
          <Link to="/login" className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-semibold hover:scale-105 active:scale-95 transition-all shadow-md inline-block text-center">
            Profile
          </Link>
        </div>
      </header>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50">
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg shadow-[0_-10px_40px_rgba(25,28,30,0.06)] flex justify-around items-center px-4 pb-6 pt-2 rounded-t-[2rem]">
          <Link to="/" className="flex flex-col items-center justify-center bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-2xl px-3 py-2 scale-110 duration-300 ease-out">
            <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>home</span>
            <span className="font-manrope text-[10px] font-medium mt-1">Home</span>
          </Link>
          <Link to="/products" className="flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all">
            <span className="material-symbols-outlined">search</span>
            <span className="font-manrope text-[10px] font-medium mt-1">Search</span>
          </Link>
          <Link to="/products" className="flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all">
            <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-full -mt-8 shadow-lg shadow-primary/30">
              <span className="material-symbols-outlined text-white">smart_toy</span>
            </div>
            <span className="font-manrope text-[10px] font-medium mt-1">Assistant</span>
          </Link>
          <Link to="/try-on" className="flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all">
            <span className="material-symbols-outlined">filter_frames</span>
            <span className="font-manrope text-[10px] font-medium mt-1">Try-On</span>
          </Link>
          <Link to="/login" className="flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all">
            <span className="material-symbols-outlined">person</span>
            <span className="font-manrope text-[10px] font-medium mt-1">Profile</span>
          </Link>
        </div>
      </nav>
    </>
  );
}

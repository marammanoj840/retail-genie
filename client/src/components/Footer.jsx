import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full mt-20 bg-slate-50 dark:bg-slate-950">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-8 py-12 max-w-7xl mx-auto">
        <div className="md:col-span-1">
          <div className="text-lg font-bold text-slate-900 dark:text-white font-headline mb-4">Retail Genie</div>
          <p className="text-slate-500 font-manrope text-sm leading-relaxed">
            Personalizing the world's inventory for the individual shopper.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Discovery</h4>
          <ul className="space-y-3">
            <li><Link to="/products" className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-transform hover:translate-x-1 block font-manrope text-sm">New Arrivals</Link></li>
            <li><Link to="/products" className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-transform hover:translate-x-1 block font-manrope text-sm">Best Sellers</Link></li>
            <li><Link to="/products" className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-transform hover:translate-x-1 block font-manrope text-sm">AI Top Picks</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Genie AI</h4>
          <ul className="space-y-3">
            <li><Link to="#" className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-transform hover:translate-x-1 block font-manrope text-sm">AI Ethics</Link></li>
            <li><Link to="#" className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-transform hover:translate-x-1 block font-manrope text-sm">How it Works</Link></li>
            <li><Link to="#" className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-transform hover:translate-x-1 block font-manrope text-sm">Personalization</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Support</h4>
          <ul className="space-y-3">
            <li><Link to="#" className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-transform hover:translate-x-1 block font-manrope text-sm">Shipping</Link></li>
            <li><Link to="#" className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-transform hover:translate-x-1 block font-manrope text-sm">Support</Link></li>
            <li><Link to="#" className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-transform hover:translate-x-1 block font-manrope text-sm">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-outline-variant/10 px-8 py-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs text-slate-400">
        <p>© 2024 Retail Genie. Designed for Clarity.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link to="#">Terms of Service</Link>
          <Link to="#">Privacy</Link>
          <Link to="#">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}

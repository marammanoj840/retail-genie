import React, { useState, Suspense } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronLeft, Info, HelpCircle, ShieldCheck, Upload, LayoutGrid } from 'lucide-react';
import TryOnViewer from '../components/ar/TryOnViewer';
import ProductSelector, { REAL_PRODUCTS } from '../components/ar/ProductSelector';
import UploadProduct from '../components/ar/UploadProduct';

/**
 * TryOnPage - Universal AR Try-On with Custom Upload Support
 */
export default function TryOn() {
  const [selectedProduct, setSelectedProduct] = useState(REAL_PRODUCTS[0]);
  const [mode, setMode] = useState('catalog'); // 'catalog' | 'upload'
  
  const handleCustomUpload = (product) => {
    setSelectedProduct(product);
    setMode('catalog'); // Switch back to see it in action
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest font-manrope selection:bg-primary selection:text-white">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-outline-variant px-6 py-4 flex items-center justify-between">
        <Link 
          to="/products"
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-bold text-sm tracking-tight"
        >
          <ChevronLeft className="w-5 h-5" />
          BACK TO SHOWROOM
        </Link>
        
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-2">
              <button 
                onClick={() => setMode('catalog')}
                className={`p-2 rounded-xl transition-all ${mode === 'catalog' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-on-surface-variant hover:bg-surface-container'}`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setMode('upload')}
                className={`p-2 rounded-xl transition-all ${mode === 'upload' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-on-surface-variant hover:bg-surface-container'}`}
              >
                <Upload className="w-5 h-5" />
              </button>
           </div>
           <div className="w-px h-6 bg-outline-variant" />
           <HelpCircle className="w-5 h-5 text-on-surface-variant cursor-pointer hover:text-primary transition-colors" />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
        
        {/* Left Section: the AR Viewer */}
        <section className="flex-1 w-full space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
           <div className="space-y-4">
              <h1 className="text-5xl font-black font-headline text-on-surface tracking-tighter leading-[1.1]">
                {mode === 'catalog' ? 'Dynamic' : 'Custom'} <span className="text-primary italic px-2 bg-primary/5 rounded-2xl">Virtual</span> Fitting
              </h1>
              <p className="text-on-surface-variant text-lg max-w-xl font-medium leading-relaxed">
                {mode === 'catalog' 
                  ? 'Real-time accessory and apparel mapping using advanced neural landmarks.' 
                  : 'Bring your own transparent PNGs and see them mapped instantly to your body.'}
              </p>
           </div>
           
           <Suspense fallback={
             <div className="w-full aspect-[4/3] bg-black rounded-[40px] flex items-center justify-center border-8 border-surface-container">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
             </div>
           }>
             <TryOnViewer selectedProduct={selectedProduct} />
           </Suspense>

           <div className="flex items-center gap-4">
              <button 
                className="flex-1 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl border border-white/20 flex items-center justify-center gap-2 transition-all font-bold uppercase tracking-widest text-[10px]"
                onClick={() => setMode('upload')}
              >
                NEW CUSTOM UPLOAD
              </button>
              <button 
                className="flex-1 py-4 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] font-bold uppercase tracking-widest text-[10px]"
                onClick={() => alert("Capture saved to Gallery!")}
              >
                SAVE SNAPSHOT
              </button>
           </div>
        </section>

        {/* Right Section: Interactive Sidebar */}
        <aside className="w-full lg:w-96 space-y-8 lg:sticky lg:top-24 animate-in fade-in slide-in-from-right-4 duration-700 delay-200">
           {mode === 'catalog' ? (
             <div className="bg-white rounded-[32px] p-8 shadow-2xl shadow-indigo-500/5 border border-outline-variant">
                <ProductSelector 
                  selectedId={selectedProduct.id} 
                  onSelect={setSelectedProduct} 
                />
             </div>
           ) : (
             <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <UploadProduct onUpload={handleCustomUpload} />
                <button 
                  onClick={() => setMode('catalog')}
                  className="w-full mt-4 py-3 text-on-surface-variant hover:text-primary font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" /> Back to Catalog
                </button>
             </div>
           )}
           
           {/* Info Matrics Decoration */}
           <div className="bg-surface rounded-3xl p-6 border border-outline-variant border-dashed space-y-4">
              <h4 className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" /> Tracking Integrity
              </h4>
              <div className="grid grid-cols-2 gap-3 text-[10px] font-bold">
                 <div className="bg-surface-container p-3 rounded-xl">
                    <span className="text-on-surface-variant block mb-1">Scale</span>
                    <span className="text-primary truncate uppercase">Euclidean Biometrics</span>
                 </div>
                 <div className="bg-surface-container p-3 rounded-xl">
                    <span className="text-on-surface-variant block mb-1">Latency</span>
                    <span className="text-primary truncate uppercase">Neural 60FPS</span>
                 </div>
              </div>
           </div>
        </aside>
      </main>
    </div>
  );
}
